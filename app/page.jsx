"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import content from "../data/content.json";
import activityData from "../data/activity.json";
import statsData from "../data/stats.json";

function Reveal({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const ctrl = useAnimation();
  const inView = useInView(ref, { amount: 0.15, once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { ctrl.set("visible"); return; }
    ctrl.start(inView ? "visible" : "hidden");
  }, [ctrl, inView, reduce]);
  return (
    <motion.div ref={ref} className={className}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      initial={reduce ? "visible" : "hidden"} animate={ctrl}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [activity, setActivity] = useState(activityData);
  const [stats, setStats] = useState(statsData);
  const reduce = useReducedMotion();
  const t = useMemo(() => content[lang], [lang]);

  useEffect(() => {
    const sl = localStorage.getItem("site_lang");
    const st = localStorage.getItem("site_theme");
    if (sl === "fa") setLang("fa");
    if (st === "light") setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    localStorage.setItem("site_lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("site_theme", theme);
  }, [theme]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => navigator.serviceWorker.register("/nimamehrani/sw.js").catch(() => {}));
    }
  }, []);

  const floatingIcons = [{
    icon: "\u{1F310}", top: "10%", left: "5%", delay: "0s"
  }, {
    icon: "\u{2328}\uFE0F", top: "15%", right: "8%", delay: "1s"
  }, {
    icon: "\u{1F4BB}", bottom: "20%", left: "10%", delay: "2s"
  }, {
    icon: "\u{1F578}\uFE0F", bottom: "15%", right: "5%", delay: "0.5s"
  }, {
    icon: "\u{1F3A8}", top: "40%", left: "3%", delay: "1.5s"
  }, {
    icon: "\u{1F680}", top: "35%", right: "3%", delay: "2.5s"
  }];

  return (
    <>
      <div className="gradient-bg" />

      <header className="topbar">
        <a href="#home" className="logo">N.Mehrani</a>
        <nav>
          {["about", "skills", "experience", "education", "projects", "contact"].map((s) => (
            <a key={s} href={`#${s}`}>{t.nav[["About","Skills","Experience","Education","Projects","Certifications","Contact"].indexOf(s.charAt(0).toUpperCase() + s.slice(1))] || s}</a>
          ))}
        </nav>
        <div className="actions">
          <button onClick={() => setLang(v => v === "en" ? "fa" : "en")}>{lang === "en" ? "FA" : "EN"}</button>
          <button onClick={() => setTheme(v => v === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="floating-elements">
          {floatingIcons.map((el, i) => (
            <span key={i} style={{
              top: el.top, left: el.left, right: el.right, bottom: el.bottom,
              animationDelay: el.delay
            }}>{el.icon}</span>
          ))}
        </div>
        <div className="hero-content">
          <Reveal>
            <div className="hero-badge">
              <span>{t.hero.chip}</span>
              {t.hero.location}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1>
              {lang === "fa" ? "\u0647\u0645\u0648\u0646 \u0637\u0631\u0627\u062D\u06CC \u0648 \u0633\u0627\u062E\u062A" : "Hey, I'm"} <span className="gradient-text">Nima Mehrani</span>
              <br />{t.hero.title}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p>{t.hero.desc}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="hero-actions">
              <a className="btn btn-primary" href="/nimamehrani/pdf/N.Mehrani-CV.pdf" target="_blank">
                {t.hero.ctaResume}
              </a>
              <a className="btn btn-outline" href="#contact">{t.hero.ctaHire}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container">
        <section id="about">
          <Reveal>
            <span className="section-label">{t.about.title}</span>
            <h2 className="section-title">{t.about.quickTitle}</h2>
          </Reveal>
          <div className="about-card">
            <Reveal className="about-me-text" delay={0.1}>
              <div className="card">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="facts-list">
                {t.about.quick.map(([k, v]) => (
                  <div key={k} className="fact-item">
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills">
          <Reveal>
            <span className="section-label">{t.skills.title}</span>
            <h2 className="section-title">{t.skills.title}</h2>
            <p className="section-desc">{t.skills.desc}</p>
          </Reveal>
          <div className="skills-grid">
            {t.skills.items.map(([name, level], i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="skill-item">
                  <div className="skill-header">
                    <span>{name}</span>
                    <strong>{level}%</strong>
                  </div>
                  <div className="skill-bar">
                    <motion.div className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="skill-tags">
              {["WordPress", "PHP", "JavaScript", "React", "HTML5", "CSS3", "MySQL", "WooCommerce", "Elementor", "SEO", "Git", "UI/UX"].map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="experience">
          <Reveal>
            <span className="section-label">{t.experience.title}</span>
            <h2 className="section-title">{t.experience.title}</h2>
            <p className="section-desc">{t.experience.desc}</p>
          </Reveal>
          <div className="timeline">
            {t.experience.items.map((item, i) => (
              <Reveal key={item[0] + item[1]} delay={i * 0.12}>
                <div className="timeline-item">
                  <div className="meta">
                    <strong>{item[1]}</strong>
                    <span>{item[0]}</span>
                  </div>
                  <h4>{item[2]}</h4>
                  <p>{item[3]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education">
          <Reveal>
            <span className="section-label">{t.education.title}</span>
            <h2 className="section-title">{t.education.title}</h2>
            <p className="section-desc">{t.education.desc}</p>
          </Reveal>
          <div className="timeline">
            {t.education.items.map((item, i) => (
              <Reveal key={item[0] + item[1]} delay={i * 0.12}>
                <div className="timeline-item">
                  <div className="meta">
                    <strong>{item[1]}</strong>
                    <span>{item[0]}</span>
                  </div>
                  <h4>{item[2]}</h4>
                  <p>{item[3]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects">
          <Reveal>
            <span className="section-label">{t.projects.title}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-desc">{t.projects.desc}</p>
          </Reveal>
          <div className="grid-3">
            {t.projects.items.map((p, i) => (
              <Reveal key={p[1]} delay={i * 0.12}>
                <div className="project-card">
                  <div className="img-wrap">
                    <Image src={p[0]} alt={p[1]} width={960} height={600} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="body">
                    <h3>{p[1]}</h3>
                    <p>{p[2]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications">
          <Reveal>
            <span className="section-label">{t.certifications.title}</span>
            <h2 className="section-title">{t.certifications.title}</h2>
            <p className="section-desc">{t.certifications.desc}</p>
          </Reveal>
          <div className="cert-grid">
            {t.certifications.images.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <Image src={src} alt={`Cert ${i + 1}`} width={900} height={675} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: "10px", border: "1px solid var(--card-border)" }} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stats">
          <Reveal>
            <span className="section-label">{t.stats.title}</span>
            <h2 className="section-title">{t.stats.title}</h2>
            <p className="section-desc">{t.stats.desc}</p>
          </Reveal>
          <div className="stats-row">
            <Reveal delay={0}><div className="stat-box"><div className="num">{stats.stars ?? 0}</div><label>Stars</label></div></Reveal>
            <Reveal delay={0.1}><div className="stat-box"><div className="num">{stats.forks ?? 0}</div><label>Forks</label></div></Reveal>
            <Reveal delay={0.2}><div className="stat-box"><div className="num">{stats.open_issues ?? 0}</div><label>Issues</label></div></Reveal>
            <Reveal delay={0.3}><div className="stat-box"><div className="num">{stats.watchers ?? 0}</div><label>Watchers</label></div></Reveal>
          </div>
        </section>

        <section id="contact">
          <Reveal>
            <span className="section-label">{t.contact.title}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-desc">{t.contact.desc}</p>
          </Reveal>
          <div className="grid-2">
            <Reveal delay={0.1}>
              <div className="card card-gradient">
                <form className="contact-form" action="https://formspree.io/f/mwkyjjza" method="POST">
                  <input name="name" placeholder={lang === "fa" ? "\u0646\u0627\u0645" : "Your name"} required />
                  <input name="_replyto" type="email" placeholder={lang === "fa" ? "\u0627\u06CC\u0645\u06CC\u0644" : "Your email"} required />
                  <textarea name="message_body" rows="4" placeholder={lang === "fa" ? "\u067E\u06CC\u0627\u0645" : "Your message"} required />
                  <button className="btn btn-primary" type="submit">
                    {lang === "fa" ? "\u0627\u0631\u0633\u0627\u0644 \u067E\u06CC\u0627\u0645" : "Send Message"}
                  </button>
                </form>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="contact-info">
                <a href="tel:+989377798775">
                  <span className="icon icon-purple">{lang === "fa" ? "\uD83D\uDCDE" : "\uD83D\uDCDE"}</span>
                  <span>09377798775</span>
                </a>
                <a href="mailto:nima@nimamehrani.ir">
                  <span className="icon icon-pink">{"\u2709\uFE0F"}</span>
                  <span>nima@nimamehrani.ir</span>
                </a>
                <a href="https://t.me/Nima4mehrani" target="_blank">
                  <span className="icon icon-teal">{lang === "fa" ? "\uD83D\uDCE8" : "\uD83D\uDCE8"}</span>
                  <span>Telegram: @Nima4mehrani</span>
                </a>
                <a href="https://github.com/nimamehrani" target="_blank">
                  <span className="icon icon-yellow">{lang === "fa" ? "\uD83D\uDCBB" : "\uD83D\uDCBB"}</span>
                  <span>GitHub: nimamehrani</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="activity">
          <Reveal>
            <span className="section-label">{t.activity.title}</span>
            <h2 className="section-title">{t.activity.title}</h2>
            <p className="section-desc">{t.activity.desc}</p>
          </Reveal>
          <div className="activity-list">
            {activity.length === 0 ? (
              <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px" }}>{t.activity.empty}</p>
            ) : (
              activity.slice(0, 8).map((a, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="activity-item">
                    <span>{a.icon}</span>
                    <span>{a.message}</span>
                    <span className="date">{new Date(a.date).toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US")}</span>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Nima Mehrani</p>
      </footer>
    </>
  );
}
