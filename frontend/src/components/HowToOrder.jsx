import { useScrollReveal } from '../hooks/useScrollReveal'

const WA = 'https://wa.me/8801931112866'

const STEPS = [
  {
    num: '০১',
    icon: '📲',
    titleBn: 'WhatsApp করুন',
    titleEn: 'Message on WhatsApp',
    desc: '01931-112866 নম্বরে WhatsApp-এ মেসেজ করুন। আমরা দ্রুত সাড়া দেব।',
  },
  {
    num: '০২',
    icon: '🥭',
    titleBn: 'আম বেছে নিন',
    titleEn: 'Choose Your Mango',
    desc: 'আপনার পছন্দের জাত, পরিমাণ ও ডেলিভারির তারিখ জানান।',
  },
  {
    num: '০৩',
    icon: '✅',
    titleBn: 'নিশ্চিত করুন',
    titleEn: 'Confirm Order',
    desc: 'মূল্য ও ডেলিভারি চার্জ জেনে অর্ডার নিশ্চিত করুন। অগ্রিম পেমেন্ট করুন।',
  },
  {
    num: '০৪',
    icon: '🏠',
    titleBn: 'দরজায় পান',
    titleEn: 'Receive at Home',
    desc: '২৪-৪৮ ঘণ্টার মধ্যে তাজা আম সরাসরি আপনার দরজায় পৌঁছে যাবে।',
  },
]

export default function HowToOrder() {
  const ref = useScrollReveal()

  return (
    <section id="how-to-order" ref={ref} style={{
      background: 'var(--c-900)',
      padding: '100px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative large mango */}
      <div style={{ position: 'absolute', right: -40, bottom: -20, fontSize: 280, opacity: 0.03, pointerEvents: 'none', transform: 'rotate(20deg)', userSelect: 'none' }}>🥭</div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="reveal delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>How It Works</span>
            <div style={{ width: 40, height: 1, background: 'var(--gold-500)' }} />
          </div>
          <h2 className="reveal delay-2" style={{
            fontFamily: 'var(--font-bn)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 400,
            color: 'var(--cream)',
            marginBottom: 12,
          }}>
            কিভাবে অর্ডার করবেন?
          </h2>
          <p className="reveal delay-3" style={{ fontFamily: 'var(--font-bn)', fontSize: 15, color: 'var(--text-muted)', maxWidth: 440, margin: '0 auto' }}>
            মাত্র চারটি সহজ ধাপে পেয়ে যান রাজশাহীর সেরা আম
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, alignItems: 'start', position: 'relative' }} className="steps-grid">

          {/* Connector line */}
          <div className="step-connector" style={{
            position: 'absolute',
            top: 52,
            left: '12.5%',
            right: '12.5%',
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(201,150,10,0.3), rgba(201,150,10,0.3), transparent)',
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal delay-${i + 2}`}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              {/* Circle number */}
              <div style={{
                width: 72, height: 72,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                border: '1px solid rgba(201,150,10,0.35)',
                background: 'linear-gradient(135deg, rgba(26,58,40,0.8), rgba(15,35,24,0.9))',
                fontSize: 28,
                boxShadow: '0 0 0 6px rgba(201,150,10,0.06)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}>
                {step.icon}
              </div>

              {/* Step number */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                letterSpacing: '0.2em',
                color: 'var(--gold-500)',
                marginBottom: 8,
                fontWeight: 600,
              }}>
                {step.num}
              </div>

              <h3 style={{ fontFamily: 'var(--font-bn)', fontSize: 17, fontWeight: 600, color: 'var(--cream)', marginBottom: 4 }}>
                {step.titleBn}
              </h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontStyle: 'italic', color: 'var(--text-dim)', marginBottom: 12 }}>
                {step.titleEn}
              </div>
              <p style={{ fontFamily: 'var(--font-bn)', fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.85 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal delay-6" style={{ textAlign: 'center', marginTop: 64 }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="pulse-gold"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 40px', borderRadius: 9999,
              background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
              color: 'var(--c-950)', fontFamily: 'var(--font-bn)', fontSize: 17, fontWeight: 700,
              textDecoration: 'none', transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            📲 এখনই অর্ডার শুরু করুন
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
          .step-connector { display: none !important; }
        }
        @media (max-width: 460px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
