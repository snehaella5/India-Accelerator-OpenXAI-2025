import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json()
    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    const prompt = `Write a short, clear article (~150 words) on: "${topic}"`

    let article = ''

    try {
      // Fast generation using smaller model
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3', // your fast model
          prompt,
          stream: false,  // simple mode, faster than streaming for local CPU
        }),
      })

      if (!response.ok) throw new Error('Ollama server error')
      const data = await response.json()
      article = data.response || `⚠️ No response from model`
    } catch (err) {
      console.error('Ollama error, using demo fallback:', err)
      // Instant fallback demo for UI
      article = `📝 Example article on "${topic}" generated instantly!`
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to generate article' }, { status: 500 })
  }
}
