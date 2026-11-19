/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The Duke of Shomolu case study used to live at /projects/awo-the-musical.
    return [{ source: '/projects/awo-the-musical', destination: '/projects/duke-of-shomolu-foundation', permanent: true }]
  },
}

export default nextConfig
