import { readdir, readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'public', 'projects')
    const files = await readdir(projectsDir)
    const txtFiles = files.filter(file => file.endsWith('.txt'))

    const projects = await Promise.all(
      txtFiles.map(async (file) => {
        const filePath = path.join(projectsDir, file)
        const content = await readFile(filePath, 'utf-8')
        const lines = content.split('\n').map(l => l.trim()).filter(Boolean)

        const data = {}
        for (const line of lines) {
          const idx = line.indexOf(' - ')
          if (idx === -1) continue
          const key = line.slice(0, idx).trim().toLowerCase()
          const value = line.slice(idx + 3).trim()
          data[key] = value
        }

        const position = parseInt(file, 10)

        return {
          position: Number.isFinite(position) ? position : 999,
          title: data.title || file.replace('.txt', ''),
          url: data.url || '#',
          description: data.description || ''
        }
      })
    )

    // Order by the leading number in the filename (1.txt shows first, etc).
    projects.sort((a, b) => a.position - b.position)

    return Response.json(projects)
  } catch (error) {
    console.error('Error reading projects:', error)
    return Response.json([], { status: 200 })
  }
}
