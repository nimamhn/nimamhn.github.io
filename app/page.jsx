"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import content from "../data/content.json";
import activityData from "../data/activity.json";
import statsData from "../data/stats.json";

function Reveal({ children, className, delay = 0, style }) {
  const ref = useRef(null);
  const ctrl = useAnimation();
  const inView = useInView(ref, { amount: 0.15, once: true });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { ctrl.set("visible"); return; }
    ctrl.start(inView ? "visible" : "hidden");
  }, [ctrl, inView, reduce]);
  return (
    <motion.div ref={ref} className={className} style={style}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      initial={reduce ? "visible" : "hidden"} animate={ctrl}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { setDisplayed(text); return; }
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, reduce]);
  return displayed;
}

function useClock() {
  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString("en-US", { hour12: false, timeZone: "Asia/Tehran" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return clock;
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [activity, setActivity] = useState(activityData);
  const [stats, setStats] = useState(statsData);
  const reduce = useReducedMotion();
  const t = useMemo(() => content[lang], [lang]);
  const clock = useClock();
  const typedTitle = useTypewriter(t.hero.title, 30);

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

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
    }
  }, []);

  const tagCloud = ["HTML5", "CSS3", "WordPress", "JavaScript", "Responsive Design", "SEO", "UI/UX", "Accounting", "Excel", "Business Operations"];

  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />

      <header className={`topbar${scrolled ? " scrolled" : ""}`}>
        <a href="#home" className="logo">N.Mehrani</a>
        <nav>
          {["about", "skills", "experience", "education", "projects", "certifications", "report", "contact"].map((s, i) => (
            <a key={s} href={`#${s}`}>{t.nav[i] || s}</a>
          ))}
        </nav>
        <div className="actions">
          <button onClick={() => setLang(v => v === "en" ? "fa" : "en")}>
            <i className="bi bi-translate" /> {lang === "en" ? "FA" : "EN"}
          </button>
          <button onClick={() => setTheme(v => v === "dark" ? "light" : "dark")}>
            <i className={`bi ${theme === "dark" ? "bi-sun" : "bi-moon"}`} />
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "40px" }}>
            <div style={{ flex: "1 1 60%", minWidth: 300 }}>
              <Reveal>
                <p className="eyebrow"><i className="bi bi-code-slash" /> {t.hero.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="display-title">
                  <span className="gradient-text">Nima Mehrani</span>
                  <br />{typedTitle}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lead">{t.hero.desc}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="hero-actions">
                  <a className="btn btn-accent" href="/pdf/N.Mehrani-CV.pdf" target="_blank">
                    <i className="bi bi-download" /> {t.hero.ctaResume}
                  </a>
                  <a className="btn btn-outline" href="#contact">{t.hero.ctaHire}</a>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="hero-meta">
                  <span><i className="bi bi-geo-alt" /> {t.hero.location}</span>
                  <span><i className="bi bi-translate" /> {t.hero.langs}</span>
                  <span><i className="bi bi-telephone" /> 09377798775</span>
                  <span><i className="bi bi-envelope" /> nimaxmehrani@gmail.com</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section id="about" className="section-pad">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ flex: "1 1 55%", minWidth: 280 }}>
              <Reveal>
                <div className="panel">
                  <h2>{t.about.title}</h2>
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </div>
              </Reveal>
            </div>
            <div style={{ flex: "1 1 35%", minWidth: 240 }}>
              <Reveal delay={0.1}>
                <div className="panel list-panel">
                  <h3>{t.about.quickTitle}</h3>
                  <ul>
                    {t.about.quick.map(([k, v]) => (
                      <li key={k}><span>{k}</span><strong>{v}</strong></li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.skills.title}</h2>
              <p>{t.skills.desc}</p>
            </div>
          </Reveal>
          <div className="skills-grid">
            {t.skills.items.map(([name, level], i) => (
              <Reveal key={name} delay={i * 0.08}>
                <div className="skill-card">
                  <div className="skill-head">
                    <span>{name}</span>
                    <strong>{level}%</strong>
                  </div>
                  <div className="meter">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div className="tag-cloud">
              {tagCloud.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </Reveal>
        </section>

        <section id="experience" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.experience.title}</h2>
              <p>{t.experience.desc}</p>
            </div>
          </Reveal>
          <div className="timeline-grid">
            {t.experience.items.map((item, i) => (
              <Reveal key={item[0] + item[1]} delay={i * 0.1}>
                <div className="timeline-card">
                  <div className="timeline-meta">
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                  <h3>{item[2]}</h3>
                  <p>{item[3]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="education" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.education.title}</h2>
              <p>{t.education.desc}</p>
            </div>
          </Reveal>
          <div className="timeline-grid">
            {t.education.items.map((item, i) => (
              <Reveal key={item[0] + item[1]} delay={i * 0.1}>
                <div className="timeline-card">
                  <div className="timeline-meta">
                    <span>{item[0]}</span>
                    <strong>{item[1]}</strong>
                  </div>
                  <h3>{item[2]}</h3>
                  <p>{item[3]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.projects.title}</h2>
              <p>{t.projects.desc}</p>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {t.projects.items.map((p, i) => (
              <Reveal key={p[1]} delay={i * 0.12} style={{ flex: "1 1 30%", minWidth: 260 }}>
                <div className="project-card">
                  <Image src={p[0]} alt={p[1]} width={960} height={600} loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  <div>
                    <h3>{p[1]}</h3>
                    <p>{p[2]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="certifications" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.certifications.title}</h2>
              <p>{t.certifications.desc}</p>
            </div>
          </Reveal>
          <div className="cert-grid">
            {t.certifications.images.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <Image src={src} alt={`Cert ${i + 1}`} width={900} height={675} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }} />
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stats" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.stats.title}</h2>
              <p>{t.stats.desc}</p>
            </div>
          </Reveal>
          <div className="stats-grid">
            <Reveal delay={0}><div className="stat-box"><strong>&#11088;</strong><span>{stats.stars ?? 0}</span><label>Stars</label></div></Reveal>
            <Reveal delay={0.08}><div className="stat-box"><strong>&#127832;</strong><span>{stats.forks ?? 0}</span><label>Forks</label></div></Reveal>
            <Reveal delay={0.16}><div className="stat-box"><strong>&#128203;</strong><span>{stats.open_issues ?? 0}</span><label>Issues</label></div></Reveal>
            <Reveal delay={0.24}><div className="stat-box"><strong>&#128065;</strong><span>{stats.watchers ?? 0}</span><label>Watchers</label></div></Reveal>
          </div>
        </section>

        <section id="report" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.report.title}</h2>
              <p>{t.report.desc}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16 }}>{t.report.overview}</h3>
            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              <div className="stat-box"><strong>&#11088;</strong><span>{stats.stars ?? 0}</span><label>{t.report.totalStars}</label></div>
              <div className="stat-box"><strong>&#127832;</strong><span>{stats.forks ?? 0}</span><label>{t.report.totalForks}</label></div>
              <div className="stat-box"><strong>&#128230;</strong><span>{stats.public_repos ?? 0}</span><label>{t.report.totalRepos}</label></div>
              <div className="stat-box"><strong>&#128101;</strong><span>{stats.followers ?? 0}</span><label>{t.report.followers}</label></div>
              <div className="stat-box"><strong>&#128260;</strong><span>{stats.following ?? 0}</span><label>{t.report.following}</label></div>
              <div className="stat-box"><strong>&#128257;</strong><span>{stats.pull_requests ?? 0}</span><label>{t.report.pullRequests}</label></div>
              <div className="stat-box"><strong>&#128203;</strong><span>{stats.open_issues ?? 0}</span><label>{t.report.issues}</label></div>
              <div className="stat-box"><strong>&#128200;</strong><span>{stats.year_contribs ?? 0}</span><label>{t.report.yearContribs}</label></div>
            </div>
          </Reveal>
          <Reveal delay={0.1} style={{ marginTop: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <img
                src={`/images/profile-solarized-${theme === "dark" ? "dark" : "light"}.svg`}
                alt="3D Contribution Graph"
                style={{ maxWidth: "100%", height: "auto", borderRadius: "var(--radius)", border: "1px solid var(--border)" }}
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} style={{ marginTop: 24 }}>
            <div className="activity-list">
              {activity.length === 0 ? (
                <p style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>{t.report.noData}</p>
              ) : (
                activity.slice(0, 6).map((a, i) => (
                  <div key={i} className="activity-item">
                    <span>{a.icon || "&#128279;"}</span>
                    <span>{a.message}</span>
                    <span className="date">{new Date(a.date).toLocaleDateString(lang === "fa" ? "fa-IR" : "en-US")}</span>
                  </div>
                ))
              )}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section-pad">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ flex: "1 1 48%", minWidth: 300 }}>
              <Reveal>
                <div className="panel contact-panel">
                  <h2>{t.contact.title}</h2>
                  <p>{t.contact.desc}</p>
                  <form className="contact-form" action="https://formspree.io/f/mwkyjjza" method="POST">
                    <label>
                      <span>{lang === "fa" ? "نام" : "Name"}</span>
                      <input name="name" placeholder={lang === "fa" ? "نام خود را وارد کنید" : "Your name"} required />
                    </label>
                    <label>
                      <span>{lang === "fa" ? "ایمیل" : "Email"}</span>
                      <input name="_replyto" type="email" placeholder={lang === "fa" ? "ایمیل خود را وارد کنید" : "Your email"} required />
                    </label>
                    <label>
                      <span>{lang === "fa" ? "موضوع" : "Subject"}</span>
                      <input name="subject" placeholder={lang === "fa" ? "موضوع پیام" : "Subject"} required />
                    </label>
                    <label>
                      <span>{lang === "fa" ? "پیام" : "Message"}</span>
                      <textarea name="message_body" rows="5" placeholder={lang === "fa" ? "پیام خود را بنویسید" : "Write your message"} required />
                    </label>
                    <button className="btn btn-accent" type="submit">
                      <i className="bi bi-send" /> {lang === "fa" ? "ارسال پیام" : "Send Message"}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
            <div style={{ flex: "1 1 38%", minWidth: 260 }}>
              <Reveal delay={0.1}>
                <div className="panel contact-side">
                  <h3><i className="bi bi-person-lines-fill" /> {t.contact.reach}</h3>
                  <ul className="contact-list">
                    <li><i className="bi bi-telephone" /><a href="tel:+989377798775">09377798775</a></li>
                    <li><i className="bi bi-envelope" /><a href="mailto:nimaxmehrani@gmail.com">nimaxmehrani@gmail.com</a></li>
                    <li><i className="bi bi-telegram" /><a href="https://t.me/nima4mehrani" target="_blank">Telegram: @nima4mehrani</a></li>
                    <li><i className="bi bi-github" /><a href="https://github.com/nimamhn" target="_blank">GitHub: nimamhn</a></li>
                  </ul>
                  <div className="socials">
                    <a href="https://github.com/nimamhn" target="_blank" aria-label="GitHub"><i className="bi bi-github" /></a>
                    <a href="https://t.me/nima4mehrani" target="_blank" aria-label="Telegram"><i className="bi bi-telegram" /></a>
                  </div>
                  <div className="donate-box">
                    <div className="donate-section">
                      <h4 className="donate-subtitle">{lang === "fa" ? "حمایت مالی" : "Support"}</h4>
                      <div className="wallet-usdt">
                        <div className="wallet-main">
                          <svg className="wallet-badge" viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
                            <defs><linearGradient id="usdtGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#26A17B"/><stop offset="100%" stopColor="#1d8b67"/></linearGradient></defs>
                            <circle cx="24" cy="24" r="22" fill="url(#usdtGrad)"/>
                            <text fontFamily="Arial,Helvetica,sans-serif" fill="#fff" fontSize="20" fontWeight="800" textAnchor="middle" x="24" y="32">{lang === "fa" ? "₮" : "$"}</text>
                          </svg>
                          <div className="wallet-body">
                            <span className="wallet-label">{lang === "fa" ? "ارسال تتر" : "SEND USDT"}</span>
                            <code>TM4uZRWBHDtzRQrYgdFhuiNrvDiaJgPFtS</code>
                          </div>
                        </div>
                        <div className="wallet-qr">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TM4uZRWBHDtzRQrYgdFhuiNrvDiaJgPFtS`} alt="USDT Wallet" width={120} height={120} loading="lazy" />
                        </div>
                      </div>
                    </div>
                    <div className="donate-section">
                      <h4 className="donate-subtitle">{lang === "fa" ? "وقت محلی (تهران)" : "Local Time (Tehran)"}</h4>
                      <div className="clock-face">
                        <span className="clock-tz">IRST (UTC+3:30)</span>
                        <span>{clock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="activity" className="section-pad">
          <Reveal>
            <div className="section-head">
              <h2>{t.activity.title}</h2>
              <p>{t.activity.desc}</p>
            </div>
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

      <button
        className={`scroll-top${scrolled ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      ><i className="bi bi-arrow-up" /></button>

      <footer className="footer">
        <div className="container footer-inner">
          <p>&copy; {new Date().getFullYear()} Nima Mehrani</p>
          <a href="#home" className="to-top" aria-label="Back to top"><i className="bi bi-arrow-up" /></a>
        </div>
      </footer>
    </>
  );
}
