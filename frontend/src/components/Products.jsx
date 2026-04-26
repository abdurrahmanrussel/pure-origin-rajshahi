import { useScrollReveal } from '../hooks/useScrollReveal'

const WA = 'https://wa.me/8801931112866'

const MANGOES = [
  {
    nameBn: 'হিমসাগর',
    nameEn: 'Himsagar',
    season: 'মে — জুন',
    desc: 'রাজশাহীর রাজকীয় আম। অসাধারণ মিষ্টি সুগন্ধ ও রসালো স্বাদের জন্য সুপরিচিত। ফাইবারমুক্ত এবং হলুদ মিষ্টি শাঁসের জন্য দারুণ জনপ্রিয়।',
    price: '১৮০–২৫০',
    tag: 'সেরা পছন্দ',
    tagColor: 'var(--gold-500)',
  },
  {
    nameBn: 'ল্যাংড়া',
    nameEn: 'Langra',
    season: 'জুন — জুলাই',
    desc: 'সুমিষ্ট ও সুগন্ধী ল্যাংড়া আম সবুজ-হলুদ রঙের এবং অতুলনীয় টক-মিষ্টি স্বাদের জন্য জনপ্রিয়।',
    price: '১৫০–২০০',
    tag: null,
    tagColor: null,
  },
  {
    nameBn: 'আম্রপালি',
    nameEn: 'Amrapali',
    season: 'জুলাই — আগস্ট',
    desc: 'হাইব্রিড জাতের এই আম দেখতে লাল-হলুদ এবং স্বাদে অত্যন্ত মিষ্টি। দীর্ঘ সময় সংরক্ষণযোগ্য।',
    price: '১২০–১৬০',
    tag: null,
    tagColor: null,
  },
  {
    nameBn: 'ফজলি',
    nameEn: 'Fazli',
    season: 'জুলাই — আগস্ট',
    desc: 'বৃহদাকার ও অত্যন্ত রসালো এই আম দেরী মৌসুমের সেরা উপহার। হলুদ-সবুজ রঙ ও পুরু শাঁস।',
    price: '১৩০–১৮০',
    tag: null,
    tagColor: null,
  },
  {
    nameBn: 'হরিভাঙ্গা',
    nameEn: 'Haribhanga',
    season: 'জুলাই — আগস্ট',
    desc: 'রাজশাহীর বিশেষ জাত। ফাইবারমুক্ত, মসৃণ ও অত্যন্ত সুস্বাদু। দেশের বাইরেও রপ্তানি হয়।',
    price: '১৬০–২২০',
    tag: 'রাজশাহী স্পেশাল',
    tagColor: '#3d7a55',
  },
  {
    nameBn: 'গোপালভোগ',
    nameEn: 'Gopalbhog',
    season: 'মে — জুন',
    desc: 'ছোট আকারের অথচ অতুলনীয় মিষ্টি এই আম মৌসুমের প্রথম উপহার। সুগন্ধ ও মিষ্টতায় অতুলনীয়।',
    price: '২০০–২৮০',
    tag: 'প্রিমিয়াম',
    tagColor: '#a87a08',
  },
]

export default function Products() {
  const ref = useScrollReveal()

  return (
    <section id="products" ref={ref} style={{ background: 'var(--c-900)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
              Our Selection
            </span>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
          </div>
          <h2 className="reveal delay-2" style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            marginBottom: 12,
          }}>
            আমাদের আমের সংগ্রহ
          </h2>
          <p className="reveal delay-3" style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 15,
            color: 'var(--text-muted)',
            maxWidth: 480,
            margin: '0 auto',
          }}>
            মৌসুম অনুযায়ী রাজশাহীর সেরা জাতের আম সরাসরি বাগান থেকে সংগ্রহ
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="products-grid">
          {MANGOES.map((m, i) => (
            <MangoCard key={m.nameEn} mango={m} delay={i + 2} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal delay-6" style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontFamily: 'var(--font-bn)', fontSize: 15, color: 'var(--text-muted)', marginBottom: 20 }}>
            আপনার পছন্দের আম পেতে সরাসরি WhatsApp-এ যোগাযোগ করুন
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px', borderRadius: 9999,
              background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
              color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 16, fontWeight: 700,
              textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,150,10,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            📲 WhatsApp-এ অর্ডার করুন
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .products-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .products-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

function MangoCard({ mango, delay }) {
  const waMsg = encodeURIComponent(`আমি ${mango.nameBn} (${mango.nameEn}) আম অর্ডার করতে চাই।`)
  const waLink = `https://wa.me/8801931112866?text=${waMsg}`

  return (
    <div
      className={`reveal delay-${delay} shine`}
      style={{
        borderRadius: 20,
        border: '1px solid rgba(201,150,10,0.15)',
        background: 'linear-gradient(160deg, rgba(26,58,40,0.6) 0%, rgba(15,35,24,0.8) 100%)',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.borderColor = 'rgba(201,150,10,0.42)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(201,150,10,0.15)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top row: emoji + tag */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <span style={{ fontSize: 48 }}>🥭</span>
        {mango.tag && (
          <span style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 11,
            padding: '4px 12px',
            borderRadius: 9999,
            background: mango.tagColor ? `${mango.tagColor}22` : 'rgba(201,150,10,0.15)',
            color: mango.tagColor || 'var(--gold-400)',
            border: `1px solid ${mango.tagColor || 'var(--gold-400)'}44`,
            whiteSpace: 'nowrap',
          }}>
            {mango.tag}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 style={{ fontFamily: 'var(--font-bn)', fontSize: 22, fontWeight: 500, color: 'var(--cream)', marginBottom: 4 }}>
        {mango.nameBn}
      </h3>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: 12 }}>
        {mango.nameEn}
      </div>

      {/* Season */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
        <span style={{ fontSize: 12 }}>🗓</span>
        <span style={{ fontFamily: 'var(--font-bn)', fontSize: 13, color: 'var(--gold-400)' }}>{mango.season}</span>
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-bn)', fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.85, flex: 1, marginBottom: 24 }}>
        {mango.desc}
      </p>

      {/* Price + Order */}
      <div style={{ borderTop: '1px solid rgba(201,150,10,0.14)', paddingTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 2 }}>Price</div>
            <div style={{ fontFamily: 'var(--font-bn)', fontSize: 16, fontWeight: 600, color: 'var(--gold-300)' }}>
              {mango.price} ৳/কেজি
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 18px', borderRadius: 9999,
              background: 'rgba(201,150,10,0.14)',
              border: '1px solid rgba(201,150,10,0.3)',
              color: 'var(--gold-400)', fontFamily: 'var(--font-bn)', fontSize: 13,
              textDecoration: 'none', transition: 'all 0.22s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,var(--gold-500),var(--gold-300))'; e.currentTarget.style.color = 'var(--c-950)'; e.currentTarget.style.borderColor = 'transparent' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,150,10,0.14)'; e.currentTarget.style.color = 'var(--gold-400)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.3)' }}
          >
            অর্ডার করুন
          </a>
        </div>
      </div>
    </div>
  )
}
