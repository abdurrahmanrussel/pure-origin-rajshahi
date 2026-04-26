import { useScrollReveal } from '../hooks/useScrollReveal'

const REVIEWS = [
  {
    name: 'রাহেলা বেগম',
    location: 'ঢাকা',
    stars: 5,
    text: 'হিমসাগর আম পেয়ে সত্যিই অবাক হলাম! একদম বাগান থেকে তোলা তাজা আম। এর আগে এত সুন্দর হিমসাগর কখনো খাইনি। দাম একটু বেশি মনে হলেও মান দেখে সব মনে ভুলে গেলাম।',
    date: 'জুন ২০২৪',
  },
  {
    name: 'মো. কামাল হোসেন',
    location: 'চট্টগ্রাম',
    stars: 5,
    text: 'Pure Origin Rajshahi থেকে প্রথমবার অর্ডার করে ১০ কেজি হরিভাঙ্গা আম নিয়েছিলাম। ডেলিভারি সময়মতো, প্যাকেজিং ভালো এবং আমের মান অসাধারণ। পরিবার সবাই খুব খুশি!',
    date: 'জুলাই ২০২৪',
  },
  {
    name: 'সাবরিনা আক্তার',
    location: 'সিলেট',
    stars: 5,
    text: 'ল্যাংড়া আমের অর্ডার দিয়েছিলাম। পরের দিনই পেয়ে গেলাম। আমগুলো দেখতে যেমন সুন্দর, খেতেও তেমন। WhatsApp-এ যোগাযোগ করতেও কোনো সমস্যা হয়নি। রেকমেন্ড করব সবাইকে।',
    date: 'জুন ২০২৪',
  },
  {
    name: 'আবু তাহের',
    location: 'রাজশাহী',
    stars: 5,
    text: 'গোপালভোগ আমের মৌসুমে এদের কাছ থেকে ২০ কেজি নিলাম। অফিসের সহকর্মীদের দিলাম — সবাই জিজ্ঞেস করছে আবার দেব কিনা! সত্যিকারের খাঁটি রাজশাহীর আম।',
    date: 'মে ২০২৪',
  },
  {
    name: 'ফারহানা ইসলাম',
    location: 'খুলনা',
    stars: 5,
    text: 'আম্রপালি আমের বাক্স পেয়েছি। একটাও নষ্ট নেই, সব আম পাকা ও তাজা। প্যাকেজিং এত ভালো যে একটা আমেও চাপ লাগেনি। এবার আম্রপালির মৌসুম শেষে ফজলি নেব।',
    date: 'আগস্ট ২০২৪',
  },
  {
    name: 'মো. রিয়াজ উদ্দীন',
    location: 'ময়মনসিংহ',
    stars: 5,
    text: 'বিদেশে পাঠানোর জন্য ভালো মানের হিমসাগর খুঁজছিলাম। Pure Origin Rajshahi আমাকে একদম পারফেক্ট আম দিয়েছে। দাম-মান সব দিক দিয়ে সন্তুষ্ট।',
    date: 'মে ২০২৪',
  },
]

export default function Testimonials() {
  const ref = useScrollReveal()

  return (
    <section id="reviews" ref={ref} style={{ background: 'var(--c-950)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>Customer Reviews</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
          </div>
          <h2 className="reveal delay-2" style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            marginBottom: 12,
          }}>
            গ্রাহকদের কথা
          </h2>
          <p className="reveal delay-3" style={{ fontFamily: 'var(--font-bn)', fontSize: 15, color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto' }}>
            আমাদের হাজারো সন্তুষ্ট গ্রাহক আমাদের সাফল্যের মুখ
          </p>
        </div>

        {/* Reviews grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="reviews-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className={`reveal delay-${(i % 3) + 2} shine`}
              style={{
                padding: '28px',
                borderRadius: 18,
                border: '1px solid rgba(201,150,10,0.13)',
                background: 'linear-gradient(160deg, rgba(26,58,40,0.35) 0%, rgba(15,35,24,0.5) 100%)',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(201,150,10,0.13)' }}
            >
              {/* Stars */}
              <div style={{ marginBottom: 14 }}>
                {'★'.repeat(r.stars).split('').map((_, si) => (
                  <span key={si} style={{ color: 'var(--gold-400)', fontSize: 14 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-bn)',
                fontSize: 14,
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                marginBottom: 20,
                flex: 1,
              }}>
                "{r.text}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(201,150,10,0.1)', paddingTop: 16 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-bn)', fontSize: 14, fontWeight: 600, color: 'var(--cream)' }}>{r.name}</div>
                  <div style={{ fontFamily: 'var(--font-bn)', fontSize: 12, color: 'var(--text-dim)' }}>{r.location}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-bn)', fontSize: 12, color: 'var(--text-dim)' }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .reviews-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
