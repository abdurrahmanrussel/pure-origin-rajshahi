import fetch from 'node-fetch'

const GROQ_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct'

/**
 * Handle AI chat requests
 * POST /api/chat
 */
export const handleChat = async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    // Read API key at runtime, not at module load time
    const GROQ_API_KEY = process.env.GROQ_API_KEY
    
    if (!GROQ_API_KEY) {
      console.error('[Chat] GROQ_API_KEY is not configured')
      return res.status(500).json({ error: 'AI service is not configured' })
    }

    // Make request to Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
          ...messages,
        ],
        temperature: 0.4,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Chat] Groq API error:', data)
      return res.status(response.status).json({ 
        error: data.error?.message || 'AI service error' 
      })
    }

    // Return the AI response
    res.json(data)

  } catch (error) {
    console.error('[Chat] Error:', error)
    res.status(500).json({ error: 'Failed to process chat request' })
  }
}

export default { handleChat }
