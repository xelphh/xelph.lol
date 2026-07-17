'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './guide.module.css'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default function GuidePage({ params }) {
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await fetch(`/api/guides/${params.slug}`)
        if (res.ok) {
          const data = await res.json()
          setGuide(data)
        }
      } catch (error) {
        console.error('Failed to fetch guide:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGuide()
  }, [params.slug])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.loading}>loading<span className={styles.blink}>_</span></div>
        </div>
      </div>
    )
  }

  if (!guide) {
    return (
      <div className={styles.container}>
        <div className={styles.terminal}>
          <div className={styles.error}>Guide not found</div>
          <Link href="/" className={styles.backLink}>← back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.terminal}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>← back</Link>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{guide.title}</h1>
          <div className={styles.meta}>
            <span className={styles.date}>
              {new Date(guide.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {guide.author && <span className={styles.author}>by {guide.author}</span>}
          </div>

          <div
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: md.render(guide.content) }}
          />
        </div>
      </div>
    </div>
  )
}
