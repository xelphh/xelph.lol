import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request, { params }) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), 'public', 'guides', `${slug}.md`)

    const content = await readFile(filePath, 'utf-8')
    const { data, content: body } = matter(content)

    return Response.json({
      slug,
      title: data.title || slug,
      date: data.date,
      content: body,
      ...data
    })
  } catch (error) {
    console.error('Error reading guide:', error)
    return Response.json({ error: 'Guide not found' }, { status: 404 })
  }
}
