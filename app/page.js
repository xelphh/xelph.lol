'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  const [activeTab, setActiveTab] = useState('about')
  const [skillTab, setSkillTab] = useState('languages')

  const tabs = ['about', 'skills', 'projects', 'guides']
  const skillTabs = ['languages', 'frameworks']
  const frameworks = ['minhook', 'opus', 'juce', 'vst', 'mp3', 'flac', 'imgui', 'webview2', 'wasapi/asio/jack/alsa']

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        {/* Terminal header */}
        <div className={styles.header}>
          <div className={styles.dot} style={{ backgroundColor: '#e2604a' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#e8c04a' }}></div>
          <div className={styles.dot} style={{ backgroundColor: '#39ff8c' }}></div>
          <div className={styles.title}>xelph@dev — zsh — 92×48</div>
        </div>

        {/* Navigation tabs */}
        <nav className={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.navBtn} ${activeTab === tab ? styles.active : ''}`}
            >
              ./{tab}
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

    fetchGuides()
  }, [])

  return (
    <>
      <div className={styles.about}>
        <div>
          <div className={styles.prompt}>visitor@web:~$ whoami</div>
          <h1 className={styles.title1}>
            Xelph<span className={styles.blink}>_</span>
          </h1>
          <p className={styles.bio}>A intellectual geek in era of LLMs.
Routine:
Code , Chill, Eat, Sleep.</p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>xelph@dev:~$ cat langstack.txt</div>
          <button onClick={() => setActiveTab('skills')} className={styles.viewAllBtn}>
            view all →
          </button>
        </div>
        <div className={styles.list}>
          <div><span className={styles.arrow}>▸</span>Python</div>
          <div><span className={styles.arrow}>▸</span>C++ / clang</div>
          <div><span className={styles.arrow}>▸</span>C#</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>xelph@dev:~$ ls projects/ --top</div>
          <button onClick={() => setActiveTab('projects')} className={styles.viewAllBtn}>
            view all →
          </button>
        </div>
        <a href="https://gitlab.com/xelphhcodes/librediscord" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
          <div className={styles.projectTitle}>
            <span>librediscord</span>
            <span className={styles.projectUrl}>gitlab.com/xelphhcodes/librediscord →</span>
          </div>
          <div className={styles.projectDesc}>Free/libre take on Discord tooling.</div>
        </a>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.prompt}>xelph@dev:~$ ls guides/ --recent</div>
          <button onClick={() => setActiveTab('guides')} className={styles.viewAllBtn}>
            view all →
          </button>
        </div>
        {recentGuides.length === 0 ? (
          <div className={styles.empty}>nothing published yet <span className={styles.blink}>_</span></div>
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
            ./{tab}
          </button>
        ))}
      </div>

      {skillTab === 'languages' && (
        <div>
          <div className={styles.prompt}>xelph@dev:~$ cat langstack.txt</div>
          <div className={styles.list}>
            <div><span className={styles.arrow}>▸</span>Python</div>
            <div><span className={styles.arrow}>▸</span>C++ / clang</div>
            <div><span className={styles.arrow}>▸</span>C#</div>
            <div><span className={styles.arrow}>▸</span>Js&Ts</div>
          </div>
          <div className={styles.comment}># more to come</div>
        </div>
      )}

      {skillTab === 'frameworks' && (
        <div>
          <div className={styles.prompt}>xelph@dev:~$ cat frameworks.txt</div>
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
  return (
    <div>
      <div className={styles.prompt}>xelph@dev:~$ ls projects/</div>
      <a href="https://gitlab.com/xelphhcodes/librediscord" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
        <div className={styles.projectTitle}>
          <span>librediscord</span>
          <span className={styles.projectUrl}>gitlab.com/xelphhcodes/librediscord →</span>
        </div>
        <div className={styles.projectDesc}>Free/libre take on Discord tooling.</div>
      </a>
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
        <div className={styles.prompt}>xelph@dev:~$ ls guides/ --writing</div>
        <div className={styles.empty}>loading<span className={styles.blink}>_</span></div>
      </div>
    )
  }

  if (guides.length === 0) {
    return (
      <div>
        <div className={styles.prompt}>xelph@dev:~$ ls guides/ --writing</div>
        <div className={styles.empty}>Nothing published yet <span className={styles.blink}>_</span></div>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.prompt}>xelph@dev:~$ ls guides/ --writing</div>
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
