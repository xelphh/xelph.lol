import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const guidesDir = path.join(process.cwd(), 'public', 'guides')

    // Read all .md files from guides folder
    const files = await readdir(guidesDir)
    const mdFiles = files.filter(file => file.endsWith('.md'))

    // Parse each file
    const guides = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(guidesDir, file)
        const content = await readFile(filePath, 'utf-8')
        const { data, content: body } = matter(content)

        return {
          slug: file.replace('.md', ''),
          title: data.title || file.replace('.md', ''),
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || body.slice(0, 150),
          content: body,
          ...data
        }
      })
    )

    // Sort by date (newest first)
    guides.sort((a, b) => new Date(b.date) - new Date(a.date))

    return Response.json(guides)
  } catch (error) {
    console.error('Error reading guides:', error)
    return Response.json([], { status: 200 })
  }
}
