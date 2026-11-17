'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const languages = ['Python', 'C++ (clang)', 'C#', 'JavaScript / TypeScript']

export default function Home() {
  const [activeTab, setActiveTab] = useState('about')
  const [skillTab, setSkillTab] = useState('languages')

  const tabs = ['about', 'skills', 'projects', 'guides']
  const frameworks = ['MinHook', 'Opus', 'JUCE', 'VST', 'MP3', 'FLAC', 'ImGui', 'WebView2', 'Qt 5/6', 'WASAPI / ASIO / JACK / ALSA']

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        {/* Terminal header */}
        <div className={styles.header}>
          <div className={styles.dot} style={{ backgroundColor: '#e2604a' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#e8c04a' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#39ff8c' }}></div>
          <div className={styles.title}>xelph.lol</div>
        </div>

        {/* Navigation tabs */}
        <nav className={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.navBtn} ${activeTab === tab ? styles.active : ''}`}
            >
              {tab}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <a href="https://gitlab.com/xelphhcodes" target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitLab
          </a>
          <a href="https://github.com/xelphh" target="_blank" rel="noopener noreferrer" className={styles.link}>
            GitHub
          </a>
          <a href="https://discord.com/users/696655567015510086" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Discord
          </a>
        </nav>

        {/* Content */}
        <section className={styles.content}>
          {activeTab === 'about' && <AboutSection skillTab={skillTab} setSkillTab={setSkillTab} setActiveTab={setActiveTab} />}
          {activeTab === 'skills' && <SkillsSection skillTab={skillTab} setSkillTab={setSkillTab} frameworks={frameworks} />}
          {activeTab === 'projects' && <ProjectsSection />}
          {activeTab === 'guides' && <GuidesSection />}
        </section>
      </div>
    </div>
  )
}

function AboutSection({ skillTab, setSkillTab, setActiveTab }) {
  const [recentGuides, setRecentGuides] = useState([])
  const [topProject, setTopProject] = useState(null)
  const [pfp, setPfp] = useState(null)

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch('/api/guides')
        const data = await res.json()
        setRecentGuides(data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch guides:', error)
      }
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setTopProject(data[0] || null)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    const fetchPfp = async () => {
      try {
        const res = await fetch('/api/pfp')
        const data = await res.json()
        setPfp(data.src)
      } catch (error) {
        console.error('Failed to fetch pfp:', error)
      }
    }

    fetchGuides()
    fetchProjects()
    fetchPfp()
  }, [])

  return (
    <>
      <div className={styles.about}>
        {pfp && (
          <div className={styles.pfp}>
            <Image src={pfp} alt="Xelph" fill sizes="128px" priority className={styles.pfpImg} />
          </div>
        )}
        <div>
          <div className={styles.prompt}>hi, i'm</div>
          <h1 className={styles.title1}>
            Xelph<span className={styles.blink}>_</span>
          </h1>
          <p className={styles.bio}>
            I write C++, Python and C#, and lately a lot of audio stuff.<br />
            When I'm not coding I'm usually chilling, eating or asleep.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>what i use</div>
          <button onClick={() => setActiveTab('skills')} className={styles.viewAllBtn}>
            see all →
          </button>
        </div>
        <div className={styles.list}>
          {languages.slice(0, 3).map(l => (
            <div key={l}><span className={styles.arrow}>▸</span>{l}</div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>latest project</div>
          <button onClick={() => setActiveTab('projects')} className={styles.viewAllBtn}>
            see all →
          </button>
        </div>
        {topProject ? (
          <a href={topProject.url} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <div className={styles.projectTitle}>
              <span>{topProject.title}</span>
              <span className={styles.projectUrl}>{topProject.url.replace(/^https?:\/\//, '')} →</span>
            </div>
            <div className={styles.projectDesc}>{topProject.description}</div>
          </a>
        ) : (
          <div className={styles.empty}>nothing here yet <span className={styles.blink}>_</span></div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>recent guides</div>
          <button onClick={() => setActiveTab('guides')} className={styles.viewAllBtn}>
            see all →
          </button>
        </div>
        {recentGuides.length === 0 ? (
          <div className={styles.empty}>nothing here yet <span className={styles.blink}>_</span></div>
        ) : (
          <div className={styles.guidePreviewList}>
            {recentGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className={styles.guidePreview}>
                <div className={styles.guidePreviewTitle}>{guide.title}</div>
                <div className={styles.guidePreviewDate}>{new Date(guide.date).toLocaleDateString()}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function SkillsSection({ skillTab, setSkillTab, frameworks }) {
  return (
    <>
      <div className={styles.skillTabs}>
        {['languages', 'frameworks'].map(tab => (
          <button
            key={tab}
            onClick={() => setSkillTab(tab)}
            className={`${styles.skillTab} ${skillTab === tab ? styles.active : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {skillTab === 'languages' && (
        <div>
          <div className={styles.prompt}>what i use</div>
          <div className={styles.list}>
            {languages.map(l => (
              <div key={l}><span className={styles.arrow}>▸</span>{l}</div>
            ))}
          </div>
          <div className={styles.comment}>that's the list for now</div>
        </div>
      )}

      {skillTab === 'frameworks' && (
        <div>
          <div className={styles.prompt}>libraries i work with</div>
          <div className={styles.list}>
            {frameworks.map((fw, i) => (
              <div key={i}><span className={styles.arrow}>▸</span>{fw}</div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div>
        <div className={styles.prompt}>projects</div>
        <div className={styles.empty}>loading…</div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div>
        <div className={styles.prompt}>projects</div>
        <div className={styles.empty}>nothing here yet <span className={styles.blink}>_</span></div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.prompt}>projects</div>
      <div className={styles.projectsList}>
        {projects.map((project, i) => (
          <a key={i} href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <div className={styles.projectTitle}>
              <span>{project.title}</span>
              <span className={styles.projectUrl}>{project.url.replace(/^https?:\/\//, '')} →</span>
            </div>
            <div className={styles.projectDesc}>{project.description}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

function GuidesSection() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await fetch('/api/guides')
        const data = await res.json()
        setGuides(data)
      } catch (error) {
        console.error('Failed to fetch guides:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGuides()
  }, [])

  if (loading) {
    return (
      <div>
        <div className={styles.prompt}>guides</div>
        <div className={styles.empty}>loading…</div>
      </div>
    )
  }

  if (guides.length === 0) {
    return (
      <div>
        <div className={styles.prompt}>guides</div>
        <div className={styles.empty}>nothing here yet <span className={styles.blink}>_</span></div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.prompt}>guides</div>
      <div className={styles.guidesList}>
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className={styles.guideCard}>
            <div className={styles.guideTitle}>{guide.title}</div>
            <div className={styles.guideDate}>{new Date(guide.date).toLocaleDateString()}</div>
            <div className={styles.guideExcerpt}>{guide.excerpt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
