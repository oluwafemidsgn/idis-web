import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Signs Cloudinary Upload Widget requests for logged-in admins.
 * Cloudinary's algorithm: sort params, join as key=value with &, append the
 * API secret, SHA-1 hex.
 */
function signParams(params, apiSecret) {
  const toSign = Object.keys(params)
    .filter((k) => params[k] !== undefined && params[k] !== null && params[k] !== '')
    .sort()
    .map((k) => `${k}=${Array.isArray(params[k]) ? params[k].join(',') : String(params[k])}`)
    .join('&')
  return createHash('sha1').update(toSign + apiSecret).digest('hex')
}

export async function POST(req) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!apiSecret) return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503 })
  const body = await req.json().catch(() => null)
  const paramsToSign = body?.paramsToSign
  if (!paramsToSign || typeof paramsToSign !== 'object' || Array.isArray(paramsToSign)) {
    return NextResponse.json({ error: 'Missing paramsToSign' }, { status: 400 })
  }
  return NextResponse.json({ signature: signParams(paramsToSign, apiSecret) })
}
