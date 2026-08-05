"use client";

import { useEffect, useRef, useState } from "react";

const I18N = {
  en: {
    barPlaceholder: "Ask Nima AI...",
    sidePlaceholder: "Type your message...",
    title: "Nima Assistant",
    status: "Online",
    welcome: "Hi! Welcome to Nima Mehrani's portfolio. How can I help you?",
    typing: "Typing",
    replies: [
      {
        match: /(web|site|websit|wordpress|design|سایت|طراحی|فروشگاه|صفحه)/i,
        text: "I build clean, modern websites — WordPress and custom-coded. You'll find my services and skills in the sections above. Want to know more? Ask about pricing or contact details.",
      },
      {
        match: /(contact|email|phone|telegram|call|تماس|ایمیل|شماره|تلگرام)/i,
        text: "You can reach me anytime:\n\u2022 Phone: 09377798775\n\u2022 Email: nimaxmehrani@gmail.com\n\u2022 Telegram: @nima4mehrani",
      },
      {
        match: /(price|cost|budget|قیمت|هزینه|پروژه)/i,
        text: "Pricing depends on the project type and scope. Send me a message via the contact form or Telegram and I'll get back to you with a quote.",
      },
      {
        match: /(hi|hello|hey|سلام|درود|salam)/i,
        text: "Hello! Thanks for stopping by. Ask me about my work, services, or just say hi — I'm here to help.",
      },
      {
        match: /(accounting|حسابداری|finance)/i,
        text: "Interesting fact: besides web design, I have an accounting background. I build practical sites for businesses — combining finance knowledge with modern design.",
      },
      {
        match: /.*/,
        text: "Thanks for your message! For anything about my services, pricing, or collaboration, contact me via email (nimaxmehrani@gmail.com), phone (09377798775) or Telegram (@nima4mehrani).",
      },
    ],
  },
  fa: {
    barPlaceholder: "از دستیار نیما بپرسید...",
    sidePlaceholder: "پیام خود را بنویسید...",
    title: "دستیار نیما",
    status: "آنلاین",
    welcome: "سلام! به پورتفولیوی نیما مهرانی خوش آمدید. چطور می‌توانم کمک کنم؟",
    typing: "در حال تایپ",
    replies: [
      {
        match: /(وب|سایت|طراحی|فروشگاه|wordpress|web|design)/i,
        text: "من وب‌سایت‌های تمیز و مدرن می‌سازم — وردپرس و کدنویسی اختصاصی. خدمات و مهارت‌های من در بخش‌های بالای همین صفحه است. اگر سوالی دارید درباره قیمت یا راه‌های تماس بپرسید.",
      },
      {
        match: /(تماس|ایمیل|شماره|تلفن|تلگرام|contact|phone|email)/i,
        text: "هر زمان که بخواهید می‌توانید با من در ارتباط باشید:\n\u2022 تلفن: 09377798775\n\u2022 ایمیل: nimaxmehrani@gmail.com\n\u2022 تلگرام: @nima4mehrani",
      },
      {
        match: /(قیمت|هزینه|بودجه|پروژه|price|cost)/i,
        text: "قیمت به نوع و وسعت پروژه بستگی دارد. از طریق فرم تماس یا تلگرام پیام بدهید تا در سریع‌ترین زمان برآورد هزینه را برایتان ارسال کنم.",
      },
      {
        match: /(سلام|درود|hi|hello|hey)/i,
        text: "درود! ممنون که سر زدید. درباره کارها، خدمات یا هر چیز دیگری بپرسید — در خدمتم.",
      },
      {
        match: /(حسابداری|finance|accounting)/i,
        text: "جالب است بدانید: علاوه بر طراحی وب، سابقه حسابداری هم دارم. وب‌سایت‌های کاربردی برای کسب‌وکارها می‌سازم — ترکیب دانش مالی با طراحی مدرن.",
      },
      {
        match: /.*/,
        text: "ممنون از پیام شما! برای هر سوالی درباره خدمات، قیمت یا همکاری از طریق ایمیل (nimaxmehrani@gmail.com)، تلفن (09377798775) یا تلگرام (@nima4mehrani) در ارتباط باشید.",
      },
    ],
  },
};

function getReply(lang, text) {
  const t = I18N[lang];
  const found = t.replies.find((r) => r.match.test(text));
  return found ? found.text : t.replies[t.replies.length - 1].text;
}

export default function ChatBox() {
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [barValue, setBarValue] = useState("");
  const [sideValue, setSideValue] = useState("");
  const [greeted, setGreeted] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const sync = () => setLang(localStorage.getItem("site_lang") === "fa" ? "fa" : "en");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    window.addEventListener("storage", sync);
    return () => {
      mo.disconnect();
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!open || greeted || messages.length > 0) return;
    setGreeted(true);
    setTyping(true);
    const id = setTimeout(() => {
      setTyping(false);
      setMessages((m) =>
        m.length === 0 ? [{ id: Date.now(), text: I18N[lang].welcome, user: false }] : m
      );
    }, 700);
    return () => clearTimeout(id);
  }, [open, greeted]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (sessionStorage.getItem("chat-auto-opened") !== "true" && !open) {
        sessionStorage.setItem("chat-auto-opened", "true");
        setOpen(true);
      }
    }, 3000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, typing, open]);

  const openSidebar = () => setOpen(true);
  const closeSidebar = () => setOpen(false);

  const send = (text) => {
    if (!text.trim()) return;
    const clean = text.trim();
    setBarValue("");
    setSideValue("");
    setMessages((m) => [...m, { id: Date.now(), text: clean, user: true }]);
    setTyping(true);
    openSidebar();
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, text: getReply(lang, clean), user: false }]);
    }, 900 + Math.random() * 600);
  };

  const t = I18N[lang];

  return (
    <>
      <div className="chat-bar">
        <div className="chat-bar-inner">
          <div className="chat-bar-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <input
            type="text"
            className="chat-bar-input"
            value={barValue}
            placeholder={t.barPlaceholder}
            autoComplete="off"
            onChange={(e) => setBarValue(e.target.value)}
            onFocus={openSidebar}
            onKeyDown={(e) => {
              if (e.key === "Enter" && barValue.trim()) send(barValue);
            }}
          />
          <button
            className="chat-bar-btn"
            aria-label="Send"
            onClick={() => (barValue.trim() ? send(barValue) : openSidebar())}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`chat-overlay${open ? " chat-overlay-visible" : ""}`} onClick={closeSidebar} />

      <div className={`chat-sidebar${open ? " chat-sidebar-open" : ""}`} aria-hidden={!open}>
        <div className="chat-sidebar-header">
          <div className="chat-sidebar-header-left">
            <div className="chat-sidebar-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
              </svg>
            </div>
            <div>
              <div className="chat-sidebar-title">{t.title}</div>
              <div className="chat-sidebar-status">{t.status}</div>
            </div>
          </div>
          <button className="chat-sidebar-close" aria-label="Close" onClick={closeSidebar}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="chat-sidebar-body" ref={bodyRef}>
          {messages.map((m) => (
            <div key={m.id} className={`chat-msg ${m.user ? "chat-msg-user" : "chat-msg-ai"}`}>
              <div className="chat-msg-content">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-msg chat-msg-ai">
              <div className="chat-msg-content chat-msg-typing">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
              </div>
            </div>
          )}
        </div>
        <div className="chat-sidebar-footer">
          <input
            type="text"
            className="chat-sidebar-input"
            value={sideValue}
            placeholder={t.sidePlaceholder}
            autoComplete="off"
            onChange={(e) => setSideValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && sideValue.trim()) send(sideValue);
            }}
          />
          <button
            className="chat-sidebar-send"
            aria-label="Send"
            onClick={() => sideValue.trim() && send(sideValue)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
