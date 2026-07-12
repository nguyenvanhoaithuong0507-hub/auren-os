export type Joke = {
  id: string
  joke?: string        // for icanhazdadjoke
  setup?: string       // for official-joke
  punchline?: string   // for official-joke
  source: 'icanhaz' | 'official' | 'unknown'
}

/**
 * Lấy một joke ngẫu nhiên từ icanhazdadjoke (primary) hoặc
 * fallback sang Official Joke API nếu icanhaz bị lỗi.
 */
export async function fetchRandomJoke(): Promise<Joke> {
  // Try icanhazdadjoke first
  try {
    const res = await fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json', 'User-Agent': 'random-joke-widget/1.0' },
    })
    if (res.ok) {
      const data = await res.json()
      // data: { id, joke }
      if (data?.id && (data?.joke || data?.joke === '')) {
        return {
          id: String(data.id),
          joke: String(data.joke),
          source: 'icanhaz',
        }
      }
    }
  } catch {
    // ignore and fallback
  }

  // Fallback: Official Joke API
  try {
    const res2 = await fetch('https://official-joke-api.appspot.com/random_joke')
    if (res2.ok) {
      const d2 = await res2.json()
      // d2: { id, type, setup, punchline }
      if (d2?.id && (d2?.setup || d2?.punchline)) {
        return {
          id: String(d2.id),
          setup: String(d2.setup),
          punchline: String(d2.punchline),
          source: 'official',
        }
      }
    }
  } catch {
    // ignore
  }

  throw new Error('Không lấy được joke từ server (cả hai API đều thất bại)')
}
