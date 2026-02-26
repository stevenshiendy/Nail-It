import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Entrance animation for form elements
            gsap.from(".form-elem", {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.1
            });

            // Subtle parallax on the background image
            gsap.to(".auth-bg", {
                scale: 1.05,
                duration: 10,
                ease: "none",
                repeat: -1,
                yoyo: true
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup attempting with:", formData);
        // Here you would normally integrate auth API logic
        // Redirect or show success
        navigate('/');
    };

    return (
        <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-primary flex flex-col justify-center">
            {/* Background with Noise & Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <img
                    src="/cloud_aesthetic_bg.png"
                    alt="Atmospheric dark organic texture"
                    className="w-full h-full object-cover opacity-60 auth-bg mix-blend-overlay grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark/95 via-dark/90 to-primary/40"></div>
            </div>

            {/* SVG Header / Back Link */}
            <div className="absolute top-8 left-6 lg:left-12 z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-background/60 hover:text-accent transition-colors font-mono text-xs uppercase tracking-wider group interactive">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Return Home</span>
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 w-full max-w-lg mx-auto px-6">
                <div className="bg-background/5 backdrop-blur-xl border border-background/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* subtle flare */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[80px]"></div>

                    <div className="text-center mb-10 form-elem">
                        <h1 className="font-sans font-bold text-3xl md:text-4xl text-background tracking-tight mb-2">
                            Nail It!
                        </h1>
                        <h2 className="font-drama italic text-xl md:text-2xl text-accent/90">
                            Initialize your protocol.
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="form-elem">
                            <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="biology@domain.com"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans"
                                required
                            />
                        </div>

                        <div className="form-elem">
                            <label className="block font-mono text-xs text-background/50 uppercase tracking-widest mb-3 pl-1">
                                Access Token (Password)
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-background/10 border border-background/20 rounded-2xl px-6 py-4 text-background placeholder:text-background/30 focus:outline-none focus:border-accent focus:bg-background/15 transition-all font-sans font-mono"
                                required
                            />
                        </div>

                        <button type="submit" className="form-elem w-full btn-magnetic bg-accent text-background rounded-2xl px-6 py-4 font-bold text-lg mt-4 font-sans group relative overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Establish Connection
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </form>

                    <div className="mt-8 text-center form-elem">
                        <p className="font-mono text-xs text-background/40">
                            By authenticating, you accept standard biological and aesthetic protocol agreements.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
