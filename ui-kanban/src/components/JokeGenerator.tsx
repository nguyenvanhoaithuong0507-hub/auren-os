import React, { useEffect, useState } from 'react'
import { fetchRandomJoke, Joke } from '../api/jokes'
import './joke.css'

export default function JokeGenerator() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function loadJoke() {
    setLoading(true)
    setError(null)
    try {
      const j = await fetchRandomJoke()
      setJoke(j)
    } catch (err: any) {
      setError(err?.message || 'Không thể lấy joke')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJoke()
  }, [])

  return (
    <div className="joke-widget">
      <h3>Random Joke</h3>

      {loading && <div className="joke-loading">Đang tải...</div>}

      {error && <div className="joke-error">Lỗi: {error}</div>}

      {joke && (
        <div className="joke-body">
          {joke.joke ? (
            <div className="joke-text">{joke.joke}</div>
          ) : (
            <>
              <div className="joke-setup">{joke.setup}</div>
              <div className="joke-punchline">{joke.punchline}</div>
            </>
          )}
          <div className="joke-meta">Nguồn: {joke.source}</div>
        </div>
      )}

      <div className="joke-actions">
        <button onClick={loadJoke} disabled={loading}>
          Hoạt tạo joke mới
        </button>
      </div>
    </div>
  )
}
