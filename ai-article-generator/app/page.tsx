'use client'

import { useState } from 'react'

export default function ArticleGenerator() {
  const [topic, setTopic] = useState('')
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setArticle('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      const data = await res.json()
      setArticle(data.article)
    } catch (err) {
      console.error(err)
      setArticle('❌ Error generating article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-black">
      <div className="max-w-2xl w-full bg-black/80 backdrop-blur-sm rounded-xl p-8 shadow-[0_0_30px_rgba(255,0,0,0.5)]">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-red-500 mb-4 text-center drop-shadow-lg">
          🪄 AI Article Generator
        </h1>
        <p className="text-red-400 text-center mb-8">
          Generate unique articles instantly using LLaMA3 (via Ollama)
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 rounded-lg border border-red-900 bg-black/60 text-red-300 placeholder-red-500 focus:ring-2 focus:ring-red-600 mb-4"
        />

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full px-6 py-3 bg-red-800 hover:bg-red-600 text-white rounded-lg font-bold shadow-[0_0_20px_rgba(255,0,0,0.7)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Article'}
        </button>

        {/* Result */}
        {article && (
          <div className="mt-6 p-4 bg-black/70 border border-red-900 rounded-lg text-red-300 whitespace-pre-line shadow-[0_0_15px_rgba(255,0,0,0.5)]">
            {article}
          </div>
        )}
      </div>
    </div>
  )
}
