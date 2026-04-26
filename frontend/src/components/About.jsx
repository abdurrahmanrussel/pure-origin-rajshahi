import { useScrollReveal } from '../hooks/useScrollReveal'

const STATS = [
  { num: '৬+', label: 'আমের জাত', sub: 'varieties' },
  { num: '৫+', label: 'বছরের অভিজ্ঞতা', sub: 'years experience' },
  { num: '১০০০+', label: 'সন্তুষ্ট গ্রাহক', sub: 'happy customers' },
  { num: '১০০%', label: 'প্রাকৃতিক', sub: 'all natural' },
]

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="about" ref={ref} style={{ background: 'var(--c-950)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            {/* Section label */}
            <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 1, background: 'var(--gold-500)' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
                Our Story
              </span>
            </div>

            <h2 className="reveal delay-2" style={{
              fontFamily: 'var(--font-bn)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: 'var(--cream)',
              lineHeight: 1.3,
              marginBottom: 24,
            }}>
              আমাদের গল্প
            </h2>

            <p className="reveal delay-3" style={{
              fontFamily: 'var(--font-bn)',
              fontSize: 16,
              color: 'var(--text-muted)',
              lineHeight: 2,
              marginBottom: 16,
            }}>
              রাজশাহীর উর্বর মাটি ও অনুকূল আবহাওয়ায় জন্ম নেওয়া আম বিশ্বের সেরা।
              <strong style={{ color: 'var(--gold-400)' }}> Pure Origin Rajshahi</strong> আপনার কাছে পৌঁছে দিচ্ছে
              একেবারে বাগান থেকে সংগ্রহ করা, রাসায়নিকমুক্ত, সতেজ আম।
            </p>
            <p className="reveal delay-4" style={{
              fontFamily: 'var(--font-bn)',
              fontSize: 16,
              color: 'var(--text-muted)',
              lineHeight: 2,
            }}>
              আমরা বিশ্বাস করি — সেরা স্বাদ পাওয়ার অধিকার সকলের আছে।
              তাই মৌসুমের প্রথম থেকেই আমরা সংগ্রহ করি হিমসাগর, ল্যাংড়া,
              আম্রপালি সহ রাজশাহীর সব বিখ্যাত জাতের আম।
            </p>

            <div className="reveal delay-5" style={{ marginTop: 36 }}>
              <a
                href="#products"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 9999,
                  border: '1px solid rgba(201,150,10,0.4)',
                  color: 'var(--gold-400)', fontFamily: 'var(--font-bn)', fontSize: 15,
                  textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,150,10,0.1)'; e.currentTarget.style.borderColor = 'var(--gold-400)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.4)' }}
              >
                আমাদের আম দেখুন →
              </a>
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="reveal delay-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`reveal delay-${i + 2}`}
                style={{
                  padding: '32px 24px',
                  borderRadius: 16,
                  border: '1px solid rgba(201,150,10,0.15)',
                  background: 'rgba(26,58,40,0.4)',
                  textAlign: 'center',
                  transition: 'transform 0.3s, border-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.15)' }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 42,
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  marginBottom: 8,
                }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'var(--font-bn)', fontSize: 14, color: 'var(--text-light)', marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
