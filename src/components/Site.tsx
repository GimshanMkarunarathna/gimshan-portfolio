"use client";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { IconType } from "react-icons";
import { FaJava, FaPenNib, FaEnvelope, FaLinkedin, FaGithub, FaTiktok, FaWhatsapp, FaLink, FaMobileAlt, FaDownload, FaPlay } from "react-icons/fa";
import { SiNodedotjs, SiJavascript, SiDotnet, SiThreedotjs, SiFlutter, SiReact, SiPython, SiMysql, SiKotlin, SiOpenai, SiPinterest, SiAdobeillustrator, SiFigma, SiBlender, SiCanva, SiGooglegemini, SiFirebase } from "react-icons/si";
import { me, devProjects, designProjects } from "@/data";

type Mode = "home" | "dev" | "design";
type Ic = { I: IconType; c: string; p: [number, number] };
const DEV: Ic[] = [
  { I: SiNodedotjs, c: "#6cc24a", p: [22, 22] }, { I: SiJavascript, c: "#f7df1e", p: [34, 18] }, { I: SiDotnet, c: "#512bd4", p: [9, 33] },
  { I: SiThreedotjs, c: "#ddd", p: [24, 33] }, { I: SiFlutter, c: "#3ab8f5", p: [34, 36] }, { I: SiReact, c: "#61dafb", p: [19, 47] },
  { I: FaJava, c: "#e76f00", p: [12, 56] }, { I: SiPython, c: "#ffd43b", p: [28, 52] }, { I: SiMysql, c: "#4aa3df", p: [8, 66] },
  { I: SiKotlin, c: "#a97bff", p: [20, 68] }, { I: SiOpenai, c: "#fff", p: [30, 70] },
];
const DES: Ic[] = [
  { I: SiPinterest, c: "#e60023", p: [66, 18] }, { I: SiAdobeillustrator, c: "#ff9a00", p: [78, 20] }, { I: FaGithub, c: "#fff", p: [90, 24] },
  { I: SiFigma, c: "#f24e1e", p: [66, 36] }, { I: SiBlender, c: "#f5792a", p: [75, 38] }, { I: FaPenNib, c: "#bba3ff", p: [92, 42] },
  { I: SiCanva, c: "#00c4cc", p: [80, 54] }, { I: SiGooglegemini, c: "#7aa7ff", p: [87, 68] },
];
const copy = { dev: { t: "FULL-STACK DEVELOPMENT SHOWCASE", cx: 25, side: "right" }, design: { t: "UI/UX DESIGN SHOWCASE", cx: 75, side: "left" } };

function Me({ cx }: { cx: number }) {
  const [bad, setBad] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="me" style={{ left: `${cx}%` }} alt="Gimshan" src={bad ? "/images/shan-placeholder.svg" : me.photo} onError={() => setBad(true)} />;
}
const Bolt = ({ cls }: { cls: string }) => (
  <svg className={`bolt ${cls}`} viewBox="0 0 100 160"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd27a" /><stop offset=".5" stopColor="#ff5a1f" /><stop offset="1" stopColor="#b3150a" /></linearGradient></defs>
    <path d="M62 4 8 90h34L30 156 92 64H56z" fill="url(#bg)" stroke="#ffe3b0" strokeWidth="3" strokeLinejoin="round" /></svg>
);
const Phone = ({ title, img }: { title: string; img: string }) => {
  const [bad, setBad] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return <div className="phone">{bad ? <div className="phone-ph"><FaMobileAlt /><span>{title}</span></div> : <img src={img} alt={title} onError={() => setBad(true)} />}</div>;
};

export default function Site() {
  const [mode, setMode] = useState<Mode>("home");
  const [pTab, setPTab] = useState<"dev" | "design">("dev");
  const [active, setActive] = useState("home");
  useEffect(() => { if (mode !== "home") setPTab(mode); }, [mode]);
  useEffect(() => {
    const on = () => {
      let cur = "home";
      ["home", "projects", "about", "contact"].forEach((id) => { const e = document.getElementById(id); if (e && e.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
      setActive(cur);
    };
    on(); addEventListener("scroll", on); return () => removeEventListener("scroll", on);
  }, []);
  const nav = mode !== "home" && active === "home" ? "projects" : active;
  const cx = mode === "home" ? 50 : copy[mode].cx;
  const place = (list: Ic[], cat: "dev" | "design") => list.map((ic, i) => {
    const on = mode === cat, hidden = mode !== "home" && !on;
    const ring = i % 2, a = ((i / list.length) * 360 + ring * 25) * Math.PI / 180;
    const left = on ? cx + (ring ? 21 : 14) * Math.cos(a) : ic.p[0], top = on ? 50 + (ring ? 42 : 28) * Math.sin(a) : ic.p[1];
    return <span key={cat + i} className="tico" style={{ left: `${left}%`, top: `${top}%`, color: ic.c, opacity: hidden ? 0 : 1, transform: `translate(-50%,-50%) scale(${hidden ? 0.3 : 1})` }}><ic.I /></span>;
  });
  const links = [[FaEnvelope, "Email", me.email, `mailto:${me.email}`], [FaLinkedin, "Linkedin", me.linkedin, me.linkedin], [FaGithub, "GitHub", me.github, me.github], [FaTiktok, "Tik Tok", me.tiktok, me.tiktok], [FaWhatsapp, "WhatsApp", me.phone, me.whatsapp]] as const;

  return (<>
    <nav className="nav">
      <a className="logo" href="#home" onClick={() => setMode("home")}>Shan.</a>
      <div className="pill">{[["home", "Home"], ["projects", "Projects"], ["about", "About Me"], ["contact", "Contact"]].map(([id, l]) =>
        <a key={id} href={`#${id}`} className={nav === id ? "on" : ""} onClick={() => id === "home" && setMode("home")}>{l}</a>)}</div>
      <a className="dl" href={me.resume} download><FaDownload /><span>Download<br />Resume</span></a>
    </nav>

    <section id="home" className="sec hero">
      {mode !== "home" && [28, 42].map((w) => <i key={w} className="ring" style={{ left: `${cx}%`, width: `${w}%`, height: `${w * 2}%`, maxHeight: "95%" }} />)}
      {place(DEV, "dev")}{place(DES, "design")}
      <Me cx={cx} />
      {mode !== "home" && <h1 className={`hl ${copy[mode].side}`} key={mode}><b>Gimshan:</b>{copy[mode].t}</h1>}
      {mode === "home" && <>
        <button className="tag l" onClick={() => setMode("dev")}><FaPlay /> Development</button>
        <button className="tag r" onClick={() => setMode("design")}>Design <FaPlay /></button></>}
    </section>

    <section id="projects" className="sec proj">
      <Bolt cls="b1" />
      <div className="tabs">{(["dev", "design"] as const).map((t) => <button key={t} className={pTab === t ? "on" : ""} onClick={() => setPTab(t)}>{t === "dev" ? "Development" : "UI/UX Design"}</button>)}</div>
      {pTab === "dev" ? <div className="glass grid2">{devProjects.map((p) => <div key={p.title} className="card"><Phone {...p} /><div className="snip glass">Code Snippet</div><h3>{p.title}</h3><p>{p.tags.map((t) => <em key={t}>#{t}</em>)}</p></div>)}</div>
        : <div className="glass grid3">{designProjects.map((p) => <div key={p.title} className="card"><Phone {...p} /><h3>{p.title}</h3><p><em>Figma</em><em>User Research</em><em>Prototype</em></p></div>)}</div>}
      <div className="cap">{pTab === "dev" ? "CODE WITH PURPOSE" : "LET’S DESIGN THE FUTURE"}</div>
    </section>

    <section id="about" className="sec about">
      <Bolt cls="b2" />
      <small>Hey , I am <span>Gimshan</span></small><h2>UI/UX designer</h2><p className="sub">I design intuitive, user-focused interfaces that deliver seamless digital experiences.</p>
      <div className="glass bio"><b className="q">“</b>
        <p>I am Gimshan, a designer-developer hybrid passionate about the point where design meets code. With strong foundational skills in UI/UX design (using Figma) and mobile app development (using Flutter &amp; Firebase), I specialize in translating complex ideas into seamless, high-performance digital products.</p><hr />
        <ul><li><SiFigma color="#f24e1e" /> UI/UX (Figma) Crafting intuitive and user-centric interfaces.</li><li><SiFlutter color="#3ab8f5" /> Flutter Building cross-platform mobile experiences.</li><li><SiFirebase color="#ffa000" /> Firebase Integrating backend services and real-time data.</li></ul><hr />
        <p className="c">Designer @ HackathonHub Spearheading design for high-energy tech events</p></div>
    </section>

    <section id="contact" className="sec contact">
      <Bolt cls="b3" />
      <div><small>Hey,let’s <span>connect!</span></small><h2 className="glow">Get in Touch</h2>
        <ul className="rows"><li><FaEnvelope /> {me.email}</li><li><FaLink /> {me.linkedin.replace("https://", "")}</li><li><FaMobileAlt /> {me.phone}</li></ul>
        <div className="glass cur"><span>Currently ; <b>Designer@ Hackathon Hub</b></span><span>I apply my design thinking to drive technology innovation</span>
          <a className="hire" href={`mailto:${me.email}`}>Hire me<FaEnvelope /></a></div>
        <small className="av">Available for freelance &amp; collaborations Based in Colombo, Sri Lanka</small></div>
      <div className="glass soc"><span className="at">@</span><ul>{links.map(([I, n, t, h]) => <li key={n}><a href={h} target="_blank" rel="noreferrer"><I /><span><b>{n}</b><small>{t}</small></span></a></li>)}</ul>
        <div className="qr"><QRCodeSVG value={me.site} size={64} bgColor="#fff" /></div></div>
    </section>
  </>);
}
