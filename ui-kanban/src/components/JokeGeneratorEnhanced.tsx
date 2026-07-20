import React, { useEffect, useState } from 'react'
import './joke-enhanced.css'

type Joke = {
  id: string
  joke?: string
  setup?: string
  delivery?: string
  source?: string
}

const HISTORY_KEY = 'ui-kanban:joke:history:v1'
const LIKES_KEY = 'ui-kanban:joke:likes:v1'

function loadHistory(): Joke[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveHistory(items: Joke[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
}

function loadLikes(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LIKES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLikes(m: Record<string, boolean>) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(m))
}

export default function JokeGeneratorEnhanced({ proxy = true }: { proxy?: boolean }) {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Joke[]>(() => loadHistory())
  const [likes, setLikes] = useState<Record<string, boolean>>(() => loadLikes())

  async function loadJoke() {
    setLoading(true)
    setError(null)
    try {
      const url = proxy ? '/api/joke' : 'https://icanhazdadjoke.com/'
      if (proxy) {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Server returned ' + res.status)
        const j = await res.json()
        setJoke(j)
        setHistory(prev => {
          const next = [j, ...prev].slice(0, 50)
          saveHistory(next)
          return next
        })
      } else {
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error('Upstream returned ' + res.status)
        const d = await res.json()
        const j = { id: d.id, joke: d.joke, source: 'icanhaz' }
        setJoke(j)
        setHistory(prev => {
          const next = [j, ...prev].slice(0, 50)
          saveHistory(next)
          return next
        })
      }
    } catch (e: any) {
      setError(e?.message || 'Không thể lấy joke')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // nothing on mount because we want to load on user action too
  }, [])

  function toggleLike(j: Joke) {
    setLikes(prev => {
      const next = { ...prev, [j.id]: !prev[j.id] }
      saveLikes(next)
      return next
    })
  }

  function clearHistory() {
    saveHistory([])
    setHistory([])
  }

  return (
    <div className="joke-enhanced">
      <div className="joke-panel">
        <h3>Random Joke</h3>

        {loading && <div className="muted">Đang tải...</div>}
        {error && <div className="error">Lỗi: {error}</div>}

        {joke ? (
          <div className="joke-card">
            {joke.joke ? (
              <div className="joke-text">{joke.joke}</div>
            ) : (
              <>
                <div className="joke-setup">{joke.setup}</div>
                <div className="joke-delivery">{joke.delivery}</div>
              </>
            )}
            <div className="meta">Nguồn: {joke.source || 'unknown'}</div>

            <div className="actions">
              <button onClick={() => loadJoke()} disabled={loading} className="primary">
                Lấy joke mới
              </button>
              <button onClick={() => joke && toggleLike(joke)} disabled={!joke}>
                {joke && likes[joke.id] ? '♥ Liked' : '♡ Like'}
              </button>
            </div>
          </div>
        ) : (
          <div className="placeholder">Ấn "Lấy joke mới" để bắt đầu</div>
        )}
      </div>

      <aside className="joke-side">
        <div className="side-header">
          <h4>Lịch sử ({history.length})</h4>
          <button onClick={clearHistory} className="small">Xóa</button>
        </div>
        <div className="history-list">
          {history.length === 0 && <div className="muted">Không có lịch sử</div>}
          {history.map(h => (
            <div key={h.id} className="history-item">
              <div className="history-text">{h.joke ? h.joke : `${h.setup} — ${h.delivery}`}</div>
              <div className="history-meta">
                <span className="small muted">{h.source}</span>
                <button onClick={() => { setJoke(h); }} className="small">Mở</button>
                <button onClick={() => { toggleLike(h); }} className="small">{likes[h.id] ? '♥' : '♡'}</button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
