"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

function Section({ id, className = "", children }: { id: string, className?: string, children: React.ReactNode }) {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`min-h-[80vh] flex flex-col justify-center py-20 relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function StorySections() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col text-[var(--color-text-muted)] drop-shadow-md outline-white">
      
      {/* 1. HERO SECTION */}
      <Section id="hero" className="mb-[15vh]">
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-text-primary)] mb-4 outline-white">
            Raksh<span className="relative inline-block">
              <span className="absolute -top-[0.05em] left-[56%] -translate-x-1/2 w-[0.16em] h-[0.16em] bg-red-500 rounded-full drop-shadow-[0_0_12px_rgba(239,68,68,1)] animate-pulse" />
              ı
            </span>tha N.
          </h1>
          <h2 className="font-heading text-xl md:text-2xl text-[var(--color-text-primary)] mb-6 font-bold underline decoration-[var(--color-accent-cyan)] decoration-4 underline-offset-4">
            Electronics & Communication Engineer.
          </h2>
          <p className="text-base md:text-lg font-bold text-[var(--color-text-primary)]">
            I design and prototype embedded systems — from sensor to signal to something you can hold.
          </p>
        </div>
      </Section>

      {/* 2. ABOUT SECTION */}
      <Section id="about">
        <div className="max-w-2xl ml-auto">
          <div className="mb-4 text-xs font-mono tracking-[0.08em] uppercase text-[var(--color-accent-cyan)] font-bold outline-black">REV. 01 — ABOUT</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8 outline-white">
            Engineered for precision.
          </h2>
          <div className="space-y-6 text-base md:text-lg font-bold text-[var(--color-text-primary)]">
            <p>
              I'm an Electronics & Communication Engineering student who likes projects that start on a breadboard and end up doing something genuinely useful. My focus is embedded systems, signal processing, and the messy middle ground where hardware has to talk to software reliably.
            </p>
            <p>
              I care about the parts most people skip past — power budgets, noise margins, the difference between a demo and something that survives a semester of actual use.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. SKILLS SECTION */}
      <Section id="skills">
        <div className="max-w-2xl">
          <div className="mb-4 text-xs font-mono tracking-[0.08em] uppercase text-[var(--color-accent-cyan)] font-bold outline-black">REV. 02 — SKILLS</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-10 outline-white">
            A toolkit built for signal and systems.
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider font-sans outline-black">Embedded & Hardware</h3>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] md:text-xs">
                {["Embedded C/C++", "Arduino", "ESP32", "STM32", "PCB Design (KiCad)"].map(tag => <Tag key={tag} label={tag} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider font-sans outline-black">Signal & Systems</h3>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] md:text-xs">
                {["MATLAB/Simulink", "Digital Signal Processing", "VHDL", "Communication Systems"].map(tag => <Tag key={tag} label={tag} />)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider font-sans outline-black">Software & Data</h3>
              <div className="flex flex-wrap gap-2 font-mono text-[11px] md:text-xs">
                {["Python", "IoT Protocols (MQTT, LoRa)", "Basic ML (TensorFlow Lite Micro)"].map(tag => <Tag key={tag} label={tag} />)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. PROJECTS SECTION */}
      <Section id="projects">
        <div className="max-w-3xl ml-auto">
          <div className="mb-4 text-xs font-mono tracking-[0.08em] uppercase text-[var(--color-accent-cyan)] font-bold outline-black">REV. 03 — PROJECTS</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-10 outline-white">
            Ideas, prototyped.
          </h2>
          <div className="space-y-12">
            <ProjectItem 
              title="EchoLock"
              desc="A voice-activated smart door lock that runs entirely on-device. An ESP32 handles keyword-spotting with a lightweight TensorFlow Lite Micro model, so it recognizes an authorized voice command without ever sending audio off the board."
              tags={["ESP32", "TensorFlow Lite Micro", "Embedded C", "Custom PCB"]}
            />
            <ProjectItem 
              title="PulseNet"
              desc="A LoRa-based wireless sensor network built for small-scale precision agriculture — soil moisture and temperature nodes report back to a base station over kilometers on almost no power, feeding a live dashboard for irrigation decisions."
              tags={["LoRa", "Python", "Grafana", "Low-Power Sensor Design"]}
            />
            <ProjectItem 
              title="SigniFy"
              desc="A sign-language-to-speech glove: flex sensors and an IMU track hand shape and motion, an STM32 classifies the gesture in real time, and a text-to-speech module speaks the result aloud."
              tags={["STM32", "Flex Sensors", "IMU", "Real-Time Classification"]}
            />
            <ProjectItem 
              title="CampusWatt"
              desc="An IoT power-monitoring system for the ECE department's lab benches. Current-transformer sensors and ESP8266 nodes publish usage over MQTT, surfacing which equipment is idling and quietly wasting power."
              tags={["ESP8266", "MQTT", "Current Sensing", "Data Visualization"]}
            />
          </div>
        </div>
      </Section>

      {/* 5. EXPERIENCE SECTION */}
      <Section id="experience">
        <div className="max-w-2xl">
          <div className="mb-4 text-xs font-mono tracking-[0.08em] uppercase text-[var(--color-accent-cyan)] font-bold outline-black">REV. 04 — EXPERIENCE</div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8 outline-white">
            Time on the bench.
          </h2>
          <p className="text-base md:text-lg font-bold text-[var(--color-text-primary)]">
            Coursework and lab work in embedded systems, digital signal processing, and communication theory, alongside independent projects built outside the syllabus — because the best way to learn a datasheet is to misread it once and fix the board afterward.
          </p>
        </div>
      </Section>

      {/* 6. CONTACT SECTION */}
      {/* 6. CONTACT SECTION */}
      <Section id="contact">
        <div className="max-w-5xl mx-auto w-full">
          <div className="relative bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-4 border-[#020617] p-8 md:p-12 shadow-manga group -skew-x-3">
            
            {/* Decorative corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-accent-cyan)]/50 transition-colors group-hover:border-[var(--color-accent-cyan)]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-cyan)]/50 transition-colors group-hover:border-[var(--color-accent-cyan)]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent-cyan)]/50 transition-colors group-hover:border-[var(--color-accent-cyan)]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-cyan)]/50 transition-colors group-hover:border-[var(--color-accent-cyan)]" />
            
            <div className="flex flex-col md:flex-row gap-12 items-center justify-between relative z-10">
              
              {/* Left Column: Text */}
              <div className="flex-1 text-left space-y-6 skew-x-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-[pulse_1.5s_infinite] shadow-[0_0_8px_rgba(239,68,68,1)]" />
                  <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-accent-cyan)] font-bold outline-black">System Status: Ready for input</span>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] outline-white">
                  Let's build something that <span className="text-[var(--color-accent-cyan)] underline decoration-[var(--color-accent-cyan)] decoration-4 underline-offset-4">works.</span>
                </h2>
                <p className="text-base md:text-lg font-bold text-[var(--color-text-muted)] max-w-md">
                  Open to internships, collaborations, and roles in embedded systems & communications. Reach out directly — I read every message myself.
                </p>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-col gap-4 w-full md:w-auto min-w-[280px] skew-x-3">
                {/* Primary Action */}
                <a 
                  href="mailto:rakshithanatarajurakshu@gmail.com"
                  className="group/btn relative flex items-center justify-center gap-4 px-8 py-5 bg-[#020617] border-2 border-[#020617] text-[var(--color-bg-primary)] font-mono font-bold uppercase tracking-widest hover:bg-[var(--color-accent-cyan)] hover:text-[#020617] transition-all duration-300 shadow-manga shadow-manga-hover shadow-manga-active -skew-x-12"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 group-hover/btn:bg-[var(--color-bg-primary)]"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 group-hover/btn:bg-[var(--color-bg-primary)] shadow-[0_0_8px_rgba(239,68,68,1)] group-hover/btn:shadow-none"></span>
                  </span>
                  Initiate Contact
                </a>
                
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/Aru123-rak/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#020617] bg-[var(--color-bg-primary)]/80 text-[var(--color-text-primary)] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[var(--color-accent-cyan)] hover:text-[#020617] transition-all shadow-manga shadow-manga-hover shadow-manga-active -skew-x-12"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.5.1-.3.6-1.6-.1-3.5 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C6 2.7 4.8 3.1 4.8 3.1c-.8 1.9-.2 3.2-.1 3.5-1 1-1.5 2.1-1.5 3.5 0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href="#"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#020617] bg-[var(--color-bg-primary)]/80 text-[var(--color-text-primary)] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[var(--color-accent-cyan)] hover:text-[#020617] transition-all shadow-manga shadow-manga-hover shadow-manga-active -skew-x-12"
                  >
                    <Download size={16} />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 bg-[var(--color-bg-primary)] border-2 border-[#020617] text-[#020617] font-bold shadow-manga -skew-x-12">
      <span className="block skew-x-12">{label}</span>
    </span>
  );
}

function ProjectItem({ title, desc, tags }: { title: string, desc: string, tags: string[] }) {
  return (
    <div className="group block border-l-4 border-transparent hover:border-[var(--color-accent-cyan)] pl-4 -ml-4 transition-all">
      <h3 className="font-heading text-2xl font-bold text-[var(--color-text-primary)] mb-3 outline-black group-hover:text-[var(--color-accent-cyan)] transition-colors">{title}</h3>
      <p className="text-base mb-5 leading-relaxed font-bold text-[var(--color-text-muted)]">{desc}</p>
      <div className="flex flex-wrap gap-2 font-mono text-[10px] md:text-xs font-bold outline-black">
        {tags.map((tag, i) => (
          <span key={i} className="text-[var(--color-accent-cyan)] uppercase tracking-wider flex items-center gap-2">
            {tag}
            {i < tags.length - 1 && <span className="text-[var(--color-text-muted)] outline-none">/</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
