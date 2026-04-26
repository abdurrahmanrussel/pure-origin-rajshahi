const WA = 'https://wa.me/8801931112866'
const FB = 'https://www.facebook.com/profile.php?id=61576547702023'

export default function Footer() {
  return (
    <footer id="contact" style={{
      background: 'var(--c-950)',
      borderTop: '1px solid rgba(201,150,10,0.18)',
      padding: '72px 0 0',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 60, marginBottom: 60 }} className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '0.12em', color: 'var(--gold-400)', lineHeight: 1.2 }}>
                Pure Origin
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 3 }}>
                Rajshahi
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-bn)', fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 2, maxWidth: 320, marginBottom: 24 }}>
              রাজশাহীর সেরা আম ও দেশীয় পণ্য, সরাসরি উৎস থেকে। আমরা বিশ্বাস করি সেরা স্বাদ পাওয়ার অধিকার সকলের আছে।
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 12 }}>
              <a href={FB} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 9999,
                  border: '1px solid rgba(201,150,10,0.25)',
                  color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 13,
                  textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,150,10,0.5)'; e.currentTarget.style.color = 'var(--gold-400)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,150,10,0.25)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                <FBIcon /> Facebook
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 9999,
                  border: '1px solid rgba(37,211,102,0.3)',
                  color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 13,
                  textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.6)'; e.currentTarget.style.color = '#25d366' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(37,211,102,0.3)'; e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                <WAIcon /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: 24 }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'আমাদের আম', href: '#products' },
                { label: 'কেন আমরা', href: '#why-us' },
                { label: 'অর্ডার প্রক্রিয়া', href: '#how-to-order' },
                { label: 'গ্রাহক রিভিউ', href: '#reviews' },
              ].map(l => (
                <a key={l.href} href={l.href}
                  style={{ fontFamily: 'var(--font-bn)', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--gold-400)' }}
                  onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold-500)', marginBottom: 24 }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 16, marginTop: 2 }}>📍</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-bn)', fontSize: 14, color: 'var(--text-light)', marginBottom: 2 }}>তালাইমারি, মতিহার</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)' }}>Rajshahi 6000, Bangladesh</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>📱</span>
                <a href="tel:+8801931112866" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--gold-400)' }}
                  onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
                >
                  01931-112866
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>✉️</span>
                <a href="mailto:abdurrahmanrussel77@gmail.com" style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s', wordBreak: 'break-all' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--gold-400)' }}
                  onMouseLeave={e => { e.target.style.color = 'var(--text-muted)' }}
                >
                  abdurrahmanrussel77@gmail.com
                </a>
              </div>

              {/* Order CTA */}
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 8, padding: '11px 24px', borderRadius: 9999,
                  background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
                  color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 14, fontWeight: 700,
                  textDecoration: 'none', width: 'fit-content', transition: 'transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <WAIcon /> অর্ডার করুন
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(201,150,10,0.12)',
          padding: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-dim)' }}>
            © {new Date().getFullYear()} Pure Origin Rajshahi. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-bn)', fontSize: 13, color: 'var(--text-dim)' }}>
            রাজশাহীর সেরা আম 🥭
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}

function FBIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
