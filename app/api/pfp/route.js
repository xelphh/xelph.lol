import { readdir } from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

// Looks for public/pfp.{png,jpg,jpeg,webp}. Any size works: the page crops it
// to a square and Next.js downscales it before sending it to the browser.
const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp']

export async function GET() {
  try {
    const files = await readdir(path.join(process.cwd(), 'public'))
    for (const ext of EXTENSIONS) {
      const match = files.find(f => f.toLowerCase() === `pfp.${ext}`)
      if (match) return Response.json({ src: `/${match}` })
    }
  } catch (error) {
    console.error('Error looking for pfp:', error)
  }
  return Response.json({ src: null })
}
