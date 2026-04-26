import { useScrollReveal } from '../hooks/useScrollReveal'

const FEATURES = [
  {
    icon: '🌱',
    titleBn: 'সরাসরি বাগান থেকে',
    titleEn: 'Direct from Orchard',
    desc: 'কোনো মধ্যস্থতাকারী ছাড়াই রাজশাহীর বাগান থেকে সরাসরি আপনার হাতে পৌঁছে দেওয়া হয়।',
  },
  {
    icon: '🌿',
    titleBn: '১০০% প্রাকৃতিক',
    titleEn: '100% Natural',
    desc: 'কোনো রাসায়নিক, কৃত্রিম পাকানো বা ক্ষতিকর পদার্থ ব্যবহার করা হয় না। সম্পূর্ণ প্রকৃতিক।',
  },
  {
    icon: '⚡',
    titleBn: 'দ্রুত ডেলিভারি',
    titleEn: 'Fast Delivery',
    desc: 'অর্ডার পাওয়ার ২৪-৪৮ ঘণ্টার মধ্যে বাংলাদেশের যেকোনো স্থানে পৌঁছে দেওয়া হয়।',
  },
  {
    icon: '✅',
    titleBn: 'মান নিশ্চিত',
    titleEn: 'Quality Assured',
    desc: 'প্রতিটি আম হাতে বাছাই করা। নষ্ট বা মানহীন আম পেলে সম্পূর্ণ রিফান্ড বা প্রতিস্থাপন।',
  },
  {
    icon: '💬',
    titleBn: 'সহজ যোগাযোগ',
    titleEn: 'Easy Communication',
    desc: 'WhatsApp-এ সরাসরি যোগাযোগ করুন। যেকোনো প্রশ্নে দ্রুত সাড়া পাবেন।',
  },
  {
    icon: '🏆',
    titleBn: 'সেরা মান',
    titleEn: 'Best Quality',
    desc: 'পাঁচ বছরের বেশি অভিজ্ঞতা নিয়ে রাজশাহীর সেরা বাগান থেকে প্রিমিয়াম আম সংগ্রহ করা হয়।',
  },
]

export default function WhyUs() {
  const ref = useScrollReveal()

  return (
    <section id="why-us" ref={ref} style={{
      background: 'var(--c-950)',
      padding: '100px 0',
      position: 'relative',
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(61,122,85,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,150,10,0.05) 0%, transparent 50%)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>Why Choose Us</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
          </div>
          <h2 className="reveal delay-2" style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            marginBottom: 12,
          }}>
            কেন আমাদের বেছে নেবেন?
          </h2>
          <p className="reveal delay-3" style={{ fontFamily: 'var(--font-bn)', fontSize: 15, color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto' }}>
            আমরা শুধু আম বিক্রি করি না — আপনার বিশ্বাস অর্জন করি
          </p>
        </div>

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="why-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.titleEn}
              className={`reveal delay-${(i % 3) + 2}`}
              style={{
                padding: '32px 28px',
                borderRadius: 18,
                border: '1px solid rgba(201,150,10,0.12)',
                background: 'rgba(26,58,40,0.25)',
                transition: 'transform 0.3s, border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = 'rgba(201,150,10,0.35)'
                e.currentTarget.style.background = 'rgba(26,58,40,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(201,150,10,0.12)'
                e.currentTarget.style.background = 'rgba(26,58,40,0.25)'
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-bn)', fontSize: 17, fontWeight: 600, color: 'var(--cream)', marginBottom: 4 }}>{f.titleBn}</h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontStyle: 'italic', color: 'var(--gold-500)', marginBottom: 12, letterSpacing: '0.05em' }}>{f.titleEn}</div>
              <p style={{ fontFamily: 'var(--font-bn)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.85 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
