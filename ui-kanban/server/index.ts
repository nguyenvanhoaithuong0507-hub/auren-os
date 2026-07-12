import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

type Joke = {
  id: string
  joke?: string
  setup?: string
  delivery?: string
  source: 'icanhaz' | 'jokeapi' | 'official' | 'unknown'
}

app.get('/api/joke', async (req, res) => {
  // Try icanhazdadjoke first
  try {
    const r = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json', 'User-Agent': 'random-joke-proxy/1.0' },
    })
    if (r.ok) {
      const j = await r.json()
      if (j?.id && (j?.joke || j?.joke === '')) {
        return res.json({ id: String(j.id), joke: String(j.joke), source: 'icanhaz' } as Joke)
      }
    }
  } catch (e) {
    // ignore and fallback
    console.error('icanhaz error', e)
  }

  // Fallback: JokeAPI (supports single or two-part jokes)
  try {
    const r2 = await fetch('https://v2.jokeapi.dev/joke/Any?type=single,twopart')
    if (r2.ok) {
      const d = await r2.json()
      if (d?.type === 'single' && d?.joke) {
        return res.json({ id: String(d.id || ''), joke: String(d.joke), source: 'jokeapi' } as Joke)
      } else if (d?.type === 'twopart' && d?.setup && d?.delivery) {
        return res.json({ id: String(d.id || ''), setup: String(d.setup), delivery: String(d.delivery), source: 'jokeapi' } as Joke)
      }
    }
  } catch (e) {
    console.error('jokeapi error', e)
  }

  res.status(502).json({ error: 'Unable to fetch joke from upstream APIs' })
})

app.listen(PORT, () => {
  console.log(`Joke proxy running on http://localhost:${PORT}`)
})
