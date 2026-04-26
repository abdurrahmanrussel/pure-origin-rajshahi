const ITEMS = [
  '🥭 হিমসাগর', '🌿 ল্যাংড়া', '🥭 আম্রপালি', '🌿 ফজলি',
  '🥭 হরিভাঙ্গা', '🌿 গোপালভোগ', '🥭 সরাসরি বাগান থেকে', '🌿 ১০০% প্রাকৃতিক',
  '🥭 রাজশাহীর সেরা আম', '🌿 দ্রুত ডেলিভারি',
]

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--c-950) 0%, var(--c-800) 50%, var(--c-950) 100%)',
      borderTop: '1px solid rgba(201,150,10,0.2)',
      borderBottom: '1px solid rgba(201,150,10,0.2)',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-block',
            padding: '0 28px',
            fontFamily: 'var(--font-bn)',
            fontSize: 14,
            color: 'var(--gold-400)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
