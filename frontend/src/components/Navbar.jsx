import { useState, useEffect } from 'react'

const WA = 'https://wa.me/8801931112866'

const LINKS = [
  { label: 'আমাদের আম', href: '#products' },
  { label: 'কেন আমরা', href: '#why-us' },
  { label: 'অর্ডার', href: '#how-to-order' },
  { label: 'রিভিউ', href: '#reviews' },
  { label: 'যোগাযোগ', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled
    ? 'rgba(15,35,24,0.96)'
    : 'transparent'

  return (
    <>
      <style>{`
        .nav-link { transition: color 0.25s; }
        .nav-link:hover { color: var(--gold-400) !important; }
        .nav-cta { transition: transform 0.2s, box-shadow 0.2s; }
        .nav-cta:hover { transform: scale(1.04); box-shadow: 0 4px 22px rgba(201,150,10,0.38); }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 861px) {
          .nav-mobile-menu { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 2px 28px rgba(0,0,0,0.32)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,150,10,0.14)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 500, letterSpacing: '0.14em', color: 'var(--gold-400)', lineHeight: 1.2 }}>
              Pure Origin
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 2 }}>
              Rajshahi
            </div>
          </a>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav-link"
                style={{ fontFamily: 'var(--font-bn)', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 20px',
                borderRadius: 9999, background: 'linear-gradient(135deg,var(--gold-500),var(--gold-300))',
                color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 13, fontWeight: 700, textDecoration: 'none',
              }}>
              <WAIcon /> অর্ডার করুন
            </a>
          </div>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, flexDirection: 'column', gap: 5 }}
            aria-label="Toggle menu">
            <span style={{ display: 'block', width: 24, height: 2, background: 'var(--gold-400)', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: 18, height: 2, background: 'var(--gold-400)', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: open ? 24 : 12, height: 2, background: 'var(--gold-400)', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="nav-mobile-menu" style={{
          overflow: 'hidden', maxHeight: open ? 380 : 0, transition: 'max-height 0.38s ease',
          borderTop: open ? '1px solid rgba(201,150,10,0.14)' : 'none',
          background: 'rgba(15,35,24,0.98)',
        }}>
          <div style={{ padding: '16px 28px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ fontFamily: 'var(--font-bn)', fontSize: 15, color: 'var(--text-muted)', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 22px',
                borderRadius: 9999, background: 'linear-gradient(135deg,var(--gold-500),var(--gold-300))',
                color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 14, fontWeight: 700,
                textDecoration: 'none', width: 'fit-content', marginTop: 4,
              }}>
              <WAIcon /> অর্ডার করুন
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

function WAIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
