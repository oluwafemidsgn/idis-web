'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isAuthed, signIn, signOut } from '@/lib/auth'
import {
  deleteCaseStudy,
  deletePost,
  deleteTestimonial,
  moveCaseStudy,
  moveTestimonial,
  saveCaseStudy,
  savePost,
  saveTestimonial,
} from '@/lib/content'

/**
 * Server actions behind every admin form. Each one checks the session,
 * writes to the database and refreshes the public pages so changes show
 * on the site straight away.
 */

async function guard() {
  if (!(await isAuthed())) redirect('/admin/login')
}

const refreshSite = () => revalidatePath('/', 'layout')

const str = (fd, k) => String(fd.get(k) ?? '').trim()
const json = (fd, k, fallback) => {
  try {
    return JSON.parse(String(fd.get(k) ?? ''))
  } catch {
    return fallback
  }
}

export const slugify = async (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 90)

const friendly = (e) =>
  /UNIQUE/i.test(String(e?.message)) ? 'That URL slug is already used by another item. Please choose a different one.' : 'Something went wrong while saving. Please try again.'

/* ---------------------------------- Auth ---------------------------------- */

export async function loginAction(_prev, fd) {
  const result = await signIn(str(fd, 'password'))
  if (result === 'locked') return { error: 'Too many attempts. Please wait 15 minutes and try again.' }
  if (result === 'invalid') return { error: 'That password is not right.' }
  redirect('/admin')
}

export async function logoutAction() {
  await signOut()
  redirect('/admin/login')
}

/* ---------------------------------- Posts ---------------------------------- */

export async function savePostAction(_prev, fd) {
  await guard()
  const id = Number(fd.get('id')) || null
  const title = str(fd, 'title')
  const body = String(fd.get('body') ?? '')
  if (!title) return { error: 'Please give the post a title.' }
  const words = body.split(/\s+/).filter(Boolean).length
  const post = {
    title,
    slug: (await slugify(str(fd, 'slug') || title)) || `post-${Date.now()}`,
    excerpt: str(fd, 'excerpt'),
    category: str(fd, 'category') || 'Strategy',
    cover: str(fd, 'cover'),
    coverAlt: str(fd, 'coverAlt'),
    author: str(fd, 'author') || 'IDIS Digital',
    publishedAt: str(fd, 'publishedAt') || new Date().toISOString().slice(0, 10),
    readMins: Number(fd.get('readMins')) || Math.max(2, Math.round(words / 220)),
    body,
    featured: fd.get('featured') === 'on',
    published: fd.get('published') === 'on',
  }
  let saved
  try {
    saved = await savePost(id, post)
  } catch (e) {
    return { error: friendly(e) }
  }
  refreshSite()
  redirect(`/admin/blog/${saved}?saved=1`)
}

export async function deletePostAction(fd) {
  await guard()
  await deletePost(Number(fd.get('id')))
  refreshSite()
  redirect('/admin/blog')
}

/* ------------------------------ Case studies ------------------------------ */

export async function saveCaseStudyAction(_prev, fd) {
  await guard()
  const id = Number(fd.get('id')) || null
  const client = str(fd, 'client')
  if (!client) return { error: 'Please enter the client name.' }
  const data = {
    slug: (await slugify(str(fd, 'slug') || client)) || `work-${Date.now()}`,
    published: fd.get('published') === 'on',
    client,
    nav: str(fd, 'nav') || client,
    title: str(fd, 'title'),
    tags: json(fd, 'tags', []),
    meta: json(fd, 'meta', []),
    hero: { src: str(fd, 'hero.src'), alt: str(fd, 'hero.alt'), bg: str(fd, 'hero.bg') || 'bg-blush-200' },
    results: json(fd, 'results', []),
    labels: [str(fd, 'labels.0'), str(fd, 'labels.1'), str(fd, 'labels.2')],
    challenge: { lead: str(fd, 'challenge.lead'), body: str(fd, 'challenge.body') },
    approach: { lead: str(fd, 'approach.lead'), tactics: json(fd, 'tactics', []) },
    gallery: { src: str(fd, 'gallery.src'), alt: str(fd, 'gallery.alt'), bg: str(fd, 'gallery.bg') || 'bg-sun' },
    quoteFrom: str(fd, 'quoteFrom'),
    highlight: [str(fd, 'highlight.0'), str(fd, 'highlight.1')],
    impact: { lead: str(fd, 'impact.lead'), items: json(fd, 'impactItems', []) },
    card: {
      label: str(fd, 'card.label') || client.toUpperCase(),
      title: str(fd, 'card.title'),
      desc: str(fd, 'card.desc'),
      results: json(fd, 'cardResults', []),
      image: str(fd, 'card.image'),
      filterTag: str(fd, 'card.filterTag') || 'Brand',
      cta: str(fd, 'card.cta') || 'View case study',
    },
  }
  let saved
  try {
    saved = await saveCaseStudy(id, data)
  } catch (e) {
    return { error: friendly(e) }
  }
  refreshSite()
  redirect(`/admin/works/${saved}?saved=1`)
}

export async function deleteCaseStudyAction(fd) {
  await guard()
  await deleteCaseStudy(Number(fd.get('id')))
  refreshSite()
  redirect('/admin/works')
}

export async function moveCaseStudyAction(fd) {
  await guard()
  await moveCaseStudy(Number(fd.get('id')), Number(fd.get('dir')))
  refreshSite()
}

/* ------------------------------ Testimonials ------------------------------ */

export async function saveTestimonialAction(_prev, fd) {
  await guard()
  const id = Number(fd.get('id')) || null
  const t = { author: str(fd, 'author'), quote: str(fd, 'quote'), accent: str(fd, 'accent') || 'bg-sun', published: fd.get('published') === 'on' }
  if (!t.author || !t.quote) return { error: 'Please fill in both the client name and the quote.' }
  await saveTestimonial(id, t)
  refreshSite()
  return { ok: id ? 'Saved.' : 'Added.', at: Date.now() }
}

export async function deleteTestimonialAction(fd) {
  await guard()
  await deleteTestimonial(Number(fd.get('id')))
  refreshSite()
}

export async function moveTestimonialAction(fd) {
  await guard()
  await moveTestimonial(Number(fd.get('id')), Number(fd.get('dir')))
  refreshSite()
}
