import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Activity, Clock, ShieldCheck, Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// --- NAV BAR --- //
const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 max-w-5xl w-[90%] ${scrolled
        ? 'bg-background/80 backdrop-blur-xl border border-primary/10 text-primary shadow-lg'
        : 'bg-transparent text-background border border-transparent'
        }`}
    >
      <div className="font-sans font-bold tracking-tight text-xl">Nail It!</div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider">
        <a href="#features" className="hover:text-accent transition-colors interactive">System</a>
        <a href="#philosophy" className="hover:text-accent transition-colors interactive">Philosophy</a>
        <a href="#protocol" className="hover:text-accent transition-colors interactive">Protocol</a>
      </div>
      <button onClick={() => navigate('/signup')} className={`btn-magnetic px-5 py-2 font-sans font-semibold text-sm rounded-full ${scrolled ? 'bg-accent text-background' : 'bg-background text-primary'
        }`}>
        <span className="relative z-10">Sign Up</span>
      </button>
    </nav>
  );
};

// --- HERO SECTION --- //
const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".hero-elem", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Parallax effect on scroll
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary">
      {/* Background Image - Organic/Laboratory Mood */}
      <div className="absolute inset-0">
        <img
          src="/cloud_aesthetic_bg.png"
          alt="Ethereal cloud aesthetic background"
          className="w-full h-full object-cover opacity-80 hero-bg mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24 md:pb-32">
        <div ref={textRef} className="max-w-4xl text-background">

          <h1 className="hero-elem font-sans font-bold text-6xl md:text-8xl lg:text-9xl leading-[1.1] tracking-tight mb-2">
            Nail It!
          </h1>
          <h1 className="hero-elem font-drama italic text-4xl md:text-6xl lg:text-[5rem] leading-[1] text-background/90 mb-8">
            Nail the look. Protect your health.
          </h1>
          <p className="hero-elem font-sans text-lg md:text-xl text-background/70 max-w-xl mb-10 leading-relaxed">
            Delivering premium, salon-quality aesthetics with "sticker-like flexibility" that keeps your natural nails healthy and perfectly adapts to your dynamic lifestyle.
          </p>
          <div className="hero-elem">
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-magnetic bg-accent text-background px-8 py-4 text-lg font-semibold flex items-center gap-3 group"
            >
              <span className="relative z-10">Claim Exclusive Access</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FEATURE CARDS --- //
// 1. Shuffler Content
const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Standard Hold", desc: "(Daily Wear)", color: "bg-background", textColor: "text-accent" },
    { id: 2, label: "Light Hold", desc: "(Wudhu-Friendly)", color: "bg-[#EAE8E0]", textColor: "text-accent" },
    { id: 3, label: "Max Hold", desc: "(Event/Weekend)", color: "bg-[#DFDCD4]", textColor: "text-accent" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const first = newCards.shift();
        newCards.push(first);
        return newCards;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background rounded-[2.5rem] p-8 h-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between overflow-hidden relative group">
      <div>
        <h3 className="font-sans font-bold text-2xl text-primary mb-2">Customizable Adhesion</h3>
        <p className="text-dark/60 font-sans leading-relaxed">Innovative glue options that let you adjust the hold based on your schedule.</p>
      </div>

      <div className="relative h-48 mt-auto flex items-end justify-center perspective-[1000px]">
        {cards.map((card, index) => {
          const isTop = index === 0;
          return (
            <div
              key={card.id}
              className={`absolute w-full p-5 rounded-2xl border border-primary/5 transition-all duration-[800ms] ${isTop ? 'bg-white' : card.color} shadow-sm`}
              style={{
                top: `${index * 15}px`,
                scale: 1 - (index * 0.05),
                zIndex: 10 - index,
                opacity: 1 - (index * 0.2),
                transformOrigin: 'top center',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-primary/60 mb-1">Setting {card.id}</div>
                  <div className={`font-sans font-bold ${card.textColor}`}>{card.label}</div>
                  <div className="font-sans text-sm text-dark/50">{card.desc}</div>
                </div>
                {isTop && <Activity className="w-5 h-5 text-accent" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 2. Typewriter Card
const TypewriterCard = () => {
  const fullText = "Analyzing nail bed... Biocompatibility confirmed. Cellular respiration optimal. Zero trapped moisture detected. Health status: 100%.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, Math.random() * 50 + 20); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      const reset = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 5000);
      return () => clearTimeout(reset);
    }
  }, [index, fullText]);

  return (
    <div className="bg-background rounded-[2.5rem] p-8 h-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between">
      <div>
        <h3 className="font-sans font-bold text-2xl text-primary mb-2">Health-First Materials</h3>
        <p className="text-dark/60 font-sans leading-relaxed">Protect your natural nails, prevent trapped moisture, and let your nail bed breathe.</p>
      </div>

      <div className="bg-dark text-background p-6 rounded-2xl font-mono text-sm leading-relaxed relative min-h-[160px] overflow-hidden flex flex-col border border-primary/20">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-background/10">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <span className="uppercase text-xs tracking-wider text-background/50">Live Telemetry</span>
        </div>
        <p className="flex-1 opacity-90">
          {'>'} {displayText}
          <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse translate-y-1"></span>
        </p>
      </div>
    </div>
  );
};

// 3. Scheduler Card
const SchedulerCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const svgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(".cursor", { x: 200, y: 150, opacity: 0, scale: 1 })
        .to(".cursor", { opacity: 1, duration: 0.3 })
        .to(".cursor", { x: 150, y: 85, duration: 1.2, ease: "power3.inOut" }) // Move specifically to 'W' cell
        .to(".cursor", { scale: 0.8, duration: 0.1 }) // Click down
        .to(".day-box-3", { backgroundColor: "#E0218A", color: "#F2F0E9", duration: 0.1 }, "<") // Highlight 'W'
        .to(".bg-flare", { scale: 1.5, opacity: 0, duration: 0.4 }, "<")
        .to(".cursor", { scale: 1, duration: 0.1 }) // Click up
        .to(".cursor", { x: 150, y: 125, duration: 1, ease: "power2.inOut", delay: 0.2 }) // Move straight down to 'Secure Week' text
        .to(".cursor", { scale: 0.8, duration: 0.1 }) // Click down
        .to(".save-btn", { scale: 0.95, duration: 0.1 }, "<")
        .to(".cursor", { scale: 1, duration: 0.1 }) // Click up
        .to(".save-btn", { scale: 1, duration: 0.1 }, "<")
        .to(".cursor", { opacity: 0, duration: 0.3, delay: 0.5 })
        .to(".day-box-3", { backgroundColor: "transparent", color: "#1A1A1A", duration: 0.3 }, "<") // Reset
        .set(".bg-flare", { scale: 0.5, opacity: 0.2, clearProps: "all" });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background rounded-[2.5rem] p-8 h-[420px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/5 flex flex-col justify-between" ref={svgRef}>
      <div>
        <h3 className="font-sans font-bold text-2xl text-primary mb-2">"No-Pop-Off" Warranty</h3>
        <p className="text-dark/60 font-sans leading-relaxed">Total peace of mind. Cure the social anxiety of random detached nails.</p>
      </div>

      <div className="bg-[#EAE8E0] rounded-2xl p-6 relative overflow-hidden h-48 border border-dark/5">
        <div className="flex justify-between mb-4">
          <div className="font-mono text-xs uppercase text-dark/40 font-semibold mb-2">Active Schedule</div>
          <Fingerprint className="w-4 h-4 text-dark/30" />
        </div>

        <div className="grid grid-cols-7 gap-1 mb-8">
          {days.map((d, i) => (
            <div key={i} className={`aspect-square rounded-lg flex items-center justify-center font-mono text-xs font-medium day-box-${i} ${i === 3 ? 'relative' : ''}`}>
              {i === 3 && <div className="absolute inset-0 rounded-lg bg-accent opacity-0 bg-flare"></div>}
              <span className="relative z-10">{d}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="save-btn bg-dark text-background px-6 py-2 rounded-full font-sans text-xs font-semibold">
            Secure Week
          </div>
        </div>

        {/* Custom SVG Cursor */}
        <div className="cursor absolute top-0 left-0 text-accent filter drop-shadow-md z-20 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            <path d="m13 13 6 6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 lg:px-12 bg-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-20">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark mb-6 tracking-tight">
            Engineered for <span className="font-drama italic text-accent">Resilience.</span>
          </h2>
          <p className="font-sans text-xl text-dark/60 leading-relaxed">
            The foundation of a great aesthetic is an unshakeable system. We’ve redesigned the press-on experience from the nail bed up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="feature-card"><ShufflerCard /></div>
          <div className="feature-card"><TypewriterCard /></div>
          <div className="feature-card"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY --- //
const Philosophy = () => {
  const compRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(".phil-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: compRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal
      const lines = gsap.utils.toArray(".reveal-text");
      lines.forEach((line) => {
        gsap.from(line, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
          }
        });
      });
    }, compRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={compRef} id="philosophy" className="relative py-40 overflow-hidden bg-dark text-background">
      {/* Subtle organic texture in background */}
      <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1629196914275-f12bd25eacb2?q=80&w=2864&auto=format&fit=crop"
          alt=""
          className="w-full h-[120%] object-cover phil-bg grayscale"
        />
        <div className="absolute inset-0 bg-dark/50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <div className="w-16 h-[1px] bg-accent mb-12 opacity-50 reveal-text"></div>
        <p className="font-sans text-xl md:text-2xl text-background/60 mb-8 max-w-2xl mx-auto reveal-text leading-relaxed">
          Most press-on nails focus on: <span className="text-background">temporary aesthetics with damaging adhesives.</span>
        </p>

        <p className="reveal-text font-serif italic text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-background">
          We focus on:<br />
          <span className="font-sans font-bold not-italic text-accent tracking-tight">biocompatible flexibility</span><br />
          that adapts to your life.
        </p>
      </div>
    </section>
  );
};

// --- NAIL STYLE SHOWCASE COMPONENT --- //
const NailShowcase = () => {
  const [current, setCurrent] = useState(0);

  const styles = [
    { image: '/design-1.jpg' },
    { image: '/design-2.jpg' },
    { image: '/design-3.jpg' },
    { image: '/design-4.jpg' },
    { image: '/design-5.jpg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev === styles.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [styles.length]);

  return (
    <div className="absolute top-4 right-4 bottom-4 w-1/2 rounded-[2.5rem] overflow-hidden hidden md:flex flex-col bg-dark border border-dark/10 group">
      {styles.map((style, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          <img
            src={style.image}
            alt={`Showcase Design ${index + 1}`}
            className={`w-full h-full object-cover transition-all duration-1000 delay-100 ${index === current ? 'scale-100 blur-none opacity-100' : 'scale-[1.05] blur-md opacity-0'}`}
          />
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-0 w-full px-8 md:px-12 z-20 flex gap-1.5">
        {styles.map((_, index) => (
          <div key={index} className="h-1 flex-1 bg-background/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full bg-accent transition-all duration-1000 origin-left ${index === current ? 'scale-x-100 w-full' : index < current ? 'scale-x-100 bg-background/60 w-full' : 'scale-x-0 w-full'}`}
              style={{ transitionDuration: index === current ? '4000ms' : '0ms', transitionTimingFunction: 'linear' }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- ADHESION SHOWCASE COMPONENT --- //
const AdhesionShowcase = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev === 3 ? 1 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const options = [
    { id: 1, name: 'Light Hold', duration: '1-3 Days', level: 'w-[30%]', color: 'bg-[#EAE8E0]', border: 'border-background', dot: 'bg-dark/20' },
    { id: 2, name: 'Standard Hold', duration: '7-14 Days', level: 'w-[65%]', color: 'bg-background', border: 'border-dark/5', dot: 'bg-dark/40' },
    { id: 3, name: 'Max Hold', duration: '2-4 Weeks', level: 'w-full', color: 'bg-dark', border: 'border-dark', dot: 'bg-accent' },
  ];

  return (
    <div className="absolute top-4 right-4 bottom-4 w-1/2 rounded-[2.5rem] overflow-hidden hidden md:flex flex-col justify-center bg-[#EAE8E0]/50 p-8 border border-dark/10">
      <div className="flex flex-col gap-4">
        {options.map((opt) => {
          const isActive = activeTab === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => setActiveTab(opt.id)}
              className={`p-5 rounded-3xl cursor-pointer transition-all duration-500 border ${isActive ? 'bg-dark border-dark shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-100 opacity-100' : 'bg-transparent border-transparent scale-[0.98] opacity-60 hover:opacity-80'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-accent animate-pulse' : opt.dot}`}></div>
                  <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${isActive ? 'text-background' : 'text-dark'}`}>
                    Setting {opt.id}
                  </span>
                </div>
                <span className={`font-mono text-xs ${isActive ? 'text-background/50' : 'text-dark/40'}`}>{opt.duration}</span>
              </div>

              <h4 className={`font-sans font-bold text-xl mb-4 ${isActive ? 'text-background' : 'text-dark'}`}>{opt.name}</h4>

              {/* Strength Meter */}
              <div className={`h-1.5 w-full rounded-full overflow-hidden ${isActive ? 'bg-background/20' : 'bg-dark/10'}`}>
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${isActive ? 'bg-accent' : 'bg-dark/20'}`}
                  style={{ width: isActive ? opt.level : '0%' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- INTEGRATION SHOWCASE COMPONENT --- //
const IntegrationShowcase = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      tl.set(".press-on", { y: -80, opacity: 0, rotation: -10 })
        .set(".snap-ring", { scale: 0, opacity: 0 })
        .set(".sparkle", { opacity: 0, scale: 0, rotation: 0 })

        // Floating down into frame
        .to(".press-on", { y: -20, opacity: 1, rotation: 0, duration: 1, ease: "power2.out" })

        // The press connection
        .to(".press-on", { y: 0, duration: 0.3, ease: "power4.in" })

        // The snap flash
        .to(".snap-ring", { scale: 2.5, opacity: 0.6, duration: 0.1 }, "-=0.1")
        .to(".snap-ring", { scale: 4, opacity: 0, duration: 0.5 }, ">")

        // Sparkles and lock
        .to(".sparkle", { opacity: 1, scale: 1, rotation: 180, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .to(".press-on", { scale: 0.96, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.6")

        // Hold, then fade
        .to(".press-on", { opacity: 0, duration: 0.5, delay: 1.5 })
        .to(".sparkle", { opacity: 0, scale: 0, duration: 0.3 }, "-=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute top-4 right-4 bottom-4 w-1/2 rounded-[2.5rem] overflow-hidden hidden md:flex items-center justify-center bg-dark/5 border border-dark/10" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none z-10"></div>

      <div className="relative w-48 h-64 flex flex-col items-center justify-center scale-[1.35] lg:scale-[1.5] origin-center translate-y-6">
        {/* Finger Base */}
        <div className="w-24 h-48 bg-[#EAE8E0] rounded-t-[3rem] shadow-inner relative border border-dark/10">
          {/* Natural Nail Bed */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[4.5rem] h-20 bg-[#D1CCC0] rounded-t-[2.5rem] rounded-b-[1rem] opacity-60"></div>
          {/* Cuticle curve */}
          <div className="absolute top-[5.5rem] left-1/2 -translate-x-1/2 w-20 h-4 border-b-2 border-dark/10 rounded-b-[100%] opacity-40"></div>

          {/* Snap Ring (Pulse effect) */}
          <div className="snap-ring absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[3px] border-accent opacity-0 pointer-events-none z-20"></div>

          {/* Sparkles */}
          <div className="sparkle absolute top-2 -left-6 w-4 h-4 text-accent z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>
          <div className="sparkle absolute top-12 -right-8 w-6 h-6 text-accent z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>
          <div className="sparkle absolute top-20 -left-3 w-3 h-3 text-accent/70 z-30">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" /></svg>
          </div>

          {/* The Premium Press-on Nail */}
          <div className="press-on absolute -top-2 left-1/2 -translate-x-1/2 w-[4.5rem] h-24 bg-gradient-to-b from-accent/80 via-accent to-accent/95 rounded-t-[2.5rem] rounded-b-[1rem] shadow-2xl border border-white/20 flex flex-col items-center justify-center pt-2 z-20 backdrop-blur-sm">
            {/* Highlight gleams */}
            <div className="w-8 h-[2px] bg-white/40 rounded-full blur-[0.5px] absolute top-2 left-1/2 -translate-x-1/2"></div>
            <div className="w-2 h-10 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-[1px] transform -rotate-3 absolute top-6 left-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PROTOCOL (STACKING ARCHIVE) --- //
const ArchiveCard = ({ step, title, desc, icon: Icon, image, isActive, isPast }) => {
  return (
    <div
      className={`protocol-card sticky top-32 w-full max-w-5xl mx-auto h-[75vh] rounded-[3rem] p-12 flex flex-col justify-between border border-dark/5 shadow-2xl transition-all duration-[800ms] overflow-hidden ${isPast ? 'scale-[0.95] opacity-50 blur-sm bg-background/50' : 'scale-100 opacity-100 bg-background'
        }`}
      style={{ zIndex: parseInt(step) }}
    >
      <div className="flex justify-between items-start relative z-10 w-full md:w-1/2 pr-8">
        <div className="bg-primary/5 px-4 py-2 rounded-full font-mono text-sm font-semibold text-primary">
          PHASE // {step}
        </div>
        <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="max-w-xl relative z-10 w-full md:w-1/2 pr-8 mt-auto">
        <h3 className="font-sans font-bold text-4xl md:text-5xl text-dark mb-6 tracking-tight">{title}</h3>
        <p className="text-xl text-dark/70 leading-relaxed">{desc}</p>
      </div>

      {/* Image Container / Showcase */}
      {step === '01' ? (
        <NailShowcase />
      ) : step === '02' ? (
        <AdhesionShowcase />
      ) : step === '03' ? (
        <IntegrationShowcase />
      ) : (
        <div className="absolute top-4 right-4 bottom-4 w-1/2 rounded-[2.5rem] overflow-hidden hidden md:block border border-dark/10">
          <img src={image} alt={`Phase ${step}`} className="w-full h-full object-cover mix-blend-multiply opacity-90 sepia-[20%] hue-rotate-[-30deg]" />
        </div>
      )}
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  // Simulated scroll state for the stacking effect
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 40%",
          end: "top 20%",
          onEnter: () => setActiveStep(i + 1),
          onEnterBack: () => setActiveStep(i + 1),
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      step: "01",
      title: "Choose Your Style",
      desc: "Explore varying lengths, silhouettes, and premium biological finishes. Our sizing intelligence ensures a tailored match for your natural nail curvature.",
      icon: ArrowRight,
      // Image handled by NailShowcase
    },
    {
      step: "02",
      title: "Adhesion Formulation",
      desc: "Select from our biocompatible adhesive range based on your intended wear-time—from light wudhu-ready hold to weekend security.",
      icon: Activity,
      // Image handled by AdhesionShowcase
    },
    {
      step: "03",
      title: "Active Integration",
      desc: "Apply with precision. Our memory-polymer architecture bounds to the natural curve of your nail bed, ensuring zero-gap adherence.",
      icon: Zap,
      // Image handled by IntegrationShowcase
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="py-32 px-6 lg:px-12 bg-[#EAE8E0] relative pb-64">
      <div className="max-w-7xl mx-auto mb-24 md:text-center">
        <h2 className="font-sans font-bold text-4xl md:text-5xl text-dark mb-6 tracking-tight">
          The <span className="font-drama italic text-accent tracking-widest">Integration</span> Process.
        </h2>
      </div>

      <div className="relative">
        {protocols.map((p, i) => (
          <ArchiveCard
            key={i}
            {...p}
            isActive={activeStep === i + 1}
            isPast={activeStep > i + 1}
          />
        ))}
      </div>
    </section>
  );
};

// --- ACTION / PRICING --- //
const Action = () => {
  return (
    <section id="waitlist" className="py-32 px-6 lg:px-12 bg-dark relative z-10 text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 pb-8">

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-dark/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="font-mono text-xs uppercase text-background/80 tracking-widest font-semibold">Early Access Waitlist</span>
          </div>

          <h2 className="font-sans font-bold text-4xl md:text-6xl text-background mb-8 tracking-tight">
            Experience Aesthetic <span className="font-drama italic font-normal text-accent">Perfection.</span>
          </h2>

          <p className="text-xl text-background/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our exclusive launch cohort. Sign up today and receive an exclusive introductory discount on your first bespoke nail system.
          </p>

          <form className="max-w-md mx-auto flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition-colors font-sans"
              required
            />
            <button type="submit" className="w-full btn-magnetic bg-accent text-background rounded-2xl px-6 py-4 font-bold text-lg mt-2 font-sans group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <p className="mt-8 text-sm font-mono text-background/40">Limited slots available. Secure your priority access.</p>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER --- //
const Footer = () => {
  return (
    <footer className="bg-dark text-background pt-24 pb-12 px-6 lg:px-12 rounded-t-[4rem] relative z-20 mt-[-4rem]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 pb-12 border-b border-background/10">
          <div className="col-span-1 md:col-span-2 text-left">
            <div className="font-sans font-bold tracking-tight text-3xl mb-4 text-accent">Nail It!</div>
            <p className="text-background/50 font-sans max-w-sm mb-8 leading-relaxed">Precision longevity medicine powered by biological data, applied to structural aesthetics.</p>

            <div className="inline-flex items-center gap-3 bg-background/5 border border-background/10 px-4 py-2 rounded-full font-mono text-xs text-background/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SYSTEM OPERATIONAL
            </div>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-background mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4 font-sans text-background/60">
              <li><a href="#features" className="hover:text-accent transition-colors">The System</a></li>
              <li><a href="#philosophy" className="hover:text-accent transition-colors">Philosophy</a></li>
              <li><a href="#protocol" className="hover:text-accent transition-colors">Protocol</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-semibold text-background mb-6">Legal</h4>
            <ul className="flex flex-col gap-4 font-sans text-background/60">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Warranty Details</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-mono text-background/40">
          <p>&copy; {new Date().getFullYear()} Nail It! System.</p>
          <p className="mt-4 md:mt-0">All protocols standardized.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <Action />
      <Footer />
    </React.Fragment>
  );
}

export default App;
