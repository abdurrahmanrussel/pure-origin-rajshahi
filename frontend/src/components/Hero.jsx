import { useEffect, useRef } from 'react'

const WA = 'https://wa.me/8801931112866'

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }
    }, 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(155deg, #060f09 0%, #1a3a28 45%, #0f2318 100%)',
    }}>
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', right: '15%',
        width: 440, height: 440, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,150,10,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', left: '10%',
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(61,122,85,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Decorative rings */}
      <div style={{ position: 'absolute', top: 40, right: 40, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(201,150,10,0.18)' }} />
      <div style={{ position: 'absolute', top: 60, right: 60, width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(201,150,10,0.10)' }} />
      <div style={{ position: 'absolute', bottom: 60, left: 40, width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(201,150,10,0.15)' }} />

      {/* Floating mangoes */}
      <span className="float-a" style={{ position: 'absolute', fontSize: 80, opacity: 0.18, top: '12%', right: '8%', pointerEvents: 'none' }}>🥭</span>
      <span className="float-b" style={{ position: 'absolute', fontSize: 52, opacity: 0.12, bottom: '22%', right: '4%', pointerEvents: 'none' }}>🥭</span>
      <span className="float-c" style={{ position: 'absolute', fontSize: 64, opacity: 0.09, top: '25%', left: '4%', pointerEvents: 'none' }}>🥭</span>
      <span className="float-a" style={{ position: 'absolute', fontSize: 36, opacity: 0.13, bottom: '28%', left: '18%', pointerEvents: 'none' }}>🍃</span>
      <span className="float-b" style={{ position: 'absolute', fontSize: 28, opacity: 0.10, top: '45%', left: '6%', pointerEvents: 'none' }}>🍃</span>

      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        opacity: 0.06,
      }} />

      {/* Main content */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 820, padding: '0 28px', marginTop: 72 }}>

        {/* Eyebrow */}
        <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to right, transparent, var(--gold-500))' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
            Rajshahi, Bangladesh
          </span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(to left, transparent, var(--gold-500))' }} />
        </div>

        {/* Main Bengali heading */}
        <h1 className="reveal delay-2" style={{
          fontFamily: 'var(--font-bn)',
          fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
          fontWeight: 400,
          lineHeight: 1.25,
          color: 'var(--cream)',
          marginBottom: 16,
          letterSpacing: '-0.01em',
        }}>
          রাজশাহীর সেরা আম
        </h1>

        {/* English subtitle */}
        <p className="reveal delay-3" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300), var(--gold-500))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 20,
        }}>
          Pure Origin Rajshahi
        </p>

        {/* Tagline */}
        <p className="reveal delay-4" style={{
          fontFamily: 'var(--font-bn)',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'var(--text-muted)',
          maxWidth: 540,
          margin: '0 auto 44px',
          lineHeight: 1.85,
        }}>
          সরাসরি বাগান থেকে আপনার দরজায়<br />
          ১০০% প্রাকৃতিক, তাজা ও সুমিষ্ট আম
        </p>

        {/* CTA buttons */}
        <div className="reveal delay-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-gold"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 9999,
              background: 'linear-gradient(135deg, var(--gold-500) 0%, var(--gold-300) 50%, var(--gold-500) 100%)',
              backgroundSize: '200% auto',
              color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 16, fontWeight: 700,
              textDecoration: 'none', transition: 'background-position 0.4s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundPosition = 'left center'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <WAIcon />
            এখনই অর্ডার করুন
          </a>

          <a
            href="#products"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 30px', borderRadius: 9999,
              border: '1px solid rgba(201,150,10,0.38)',
              color: 'var(--gold-400)', fontFamily: 'var(--font-bn)', fontSize: 16,
              textDecoration: 'none', transition: 'background 0.25s, border-color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,150,10,0.08)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.38)' }}
          >
            আমাদের আম দেখুন ↓
          </a>
        </div>

        {/* Stats strip */}
        <div className="reveal delay-6" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
          marginTop: 64, flexWrap: 'wrap',
        }}>
          {[
            { num: '৬+', label: 'জাতের আম' },
            { num: '১০০০+', label: 'সন্তুষ্ট গ্রাহক' },
            { num: '৫+', label: 'বছরের অভিজ্ঞতা' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: 'var(--gold-400)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: 'var(--font-bn)', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.35 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>scroll</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
      </div>
    </section>
  )
}

function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
