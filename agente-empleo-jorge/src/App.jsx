import { useState, useCallback } from "react";

// ─── Paleta de colores ───────────────────────────────────────────────────────
const C = {
  bg: "#f5f4f1",
  card: "#ffffff",
  border: "#dedad4",
  borderHover: "#c4c2bc",
  text: "#1a1a1a",
  muted: "#6b6b68",
  hint: "#9c9a92",
  accent: "#1a1a2e",
  success: "#e8f5ee",
  successText: "#1a6640",
  warning: "#fef3e2",
  warningText: "#8a5a00",
  info: "#e8f0fb",
  infoText: "#1a4fa8",
};

// ─── Perfil completo ─────────────────────────────────────────────────────────
const PERFIL_GENERAL = `JORGE OROZCO — Cineasta · Director y Productor de Contenidos Multimedia
Ciudad de México | jorgeorozco.mx | toloache.tv | @toloachetv | IMDb: nm2459902

PERFIL: Cineasta, director y productor con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid, España) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv. Proyectos internacionales: The Sphere (Las Vegas), Tiffany Wonder (Tokyo), Celebrity Cruises Xcel.

RECONOCIMIENTOS:
- Premio Metropolitano de Teatro 2022 — Mejor Diseño de Video por "Network" (prot. Daniel Giménez Cacho).
- Cortometrajes premiados en festivales: Huellas (2014), Casa Capuchinas (2014).

PROYECTOS ACTUALES 2026:
- Celebrity Cruises Xcel: Director y Productor de Contenidos. Experiencias inmersivas a bordo. Rutas Caribe y Mediterráneo.
- "El Efecto" (dir. Paula Watson): Diseñador de Video Escénico. Contenido interactivo para pantallas escénicas.
- Pacífico Azul (Cocolab, Los Cabos): Director de contenidos para museo inmersivo.
- "La casa que habitamos" (Mucho Power): Primer largometraje. Cine-ensayo sobre la ruptura. En post-producción.
- "Cautiverio de las almas" (UNAM, abril 2026): Exposición inmersiva sobre la Inquisición.

CINE Y TELEVISIÓN:
- La sombra del Ángel: Escritor y director de los 13 capítulos (Estudios Churubusco, 2012).
- Los Mayas son eternos: Director de 3 capítulos, serie documental (Estudios Churubusco, 2012).
- Dany Who: Director de episodios (Headroom / Viacom / Paramount Channel).
- 13 Miedos: Director del capítulo "Se solicita ayudante" (Lemon Media).
- Cortometrajes: El vengador (2008), Huellas (2014, premiado), Casa Capuchinas (2014, premiado).

CONCIERTOS Y LIVE EVENTS (Switch It, 2020–presente):
- Lucero (abril 2026, música regional): Co-diseño concepto escénico y narrativo.
- Carin León y Benny Ibarra: Dirección de cámaras en conciertos de gran formato.
- Amazon Music: Dirección de contenido audiovisual.

VIDEO ESCÉNICO / TEATRO:
- Mamma Mía (Retro Lab / OCESA): Diseñador de Video y Productor Asociado.
- "Network" (prot. Daniel Giménez Cacho) — Premio Metropolitano de Teatro 2022.
- "Privacidad" con Diego Luna y Luis Gerardo Méndez (Tina Galindo & Claudio Carrera).
- Cirque Music: Querida · Peter Pan (OCESA Teatro).

EXPERIENCIAS INMERSIVAS:
- The Sphere Las Vegas (Josué Ibáñez Studio).
- Tiffany Wonder Tokyo (Tiffany & Co.).
- Re de Café Tacuba 30 aniversario.
- A Capite ad Calcem (Museo Medicina UNAM).
- Contenidos Egipto y Disney (Cocolab).

FORMACIÓN: Dirección de Cine, San Pablo CEU (Madrid) · Licenciatura en Mercadotecnia, UVM.
HERRAMIENTAS: Adobe Premiere, After Effects, DaVinci, Resolume, Notch, Disguise (xR), Final Draft, Movie Magic.
IDIOMAS: Español nativo, Inglés profesional.`;

const MODOS = {
  general: {
    label: "General",
    desc: "Cine, TV, multimedia, exposiciones",
    color: "#1a1a2e",
    terminos: ["director multimedia Ciudad de México 2026","cineasta director productor CDMX 2026","director creativo artes escénicas México","convocatoria director cine televisión México 2026","film director producer Mexico freelance 2026","stage32 director producer Latin America"],
    portales: ["OCC","LinkedIn MX","Indeed MX","Glassdoor MX","Mandy.com","Stage 32","Ibermedia","IMCINE/FONCA","EntertainmentCareers.net"],
  },
  live: {
    label: "Live Events",
    desc: "Conciertos, teatro, video escénico",
    color: "#c0392b",
    terminos: ["director cámaras conciertos México 2026","video designer live events CDMX","diseñador video escénico teatro México","scenic video designer theater 2026","camera director live concert freelance"],
    portales: ["ProductionHUB","Mandy.com","Staff Me Up","PLSN Jobs","Stage 32","LinkedIn MX","Media Match"],
  },
  inmersivo: {
    label: "Inmersivo",
    desc: "Museos, instalaciones, mapping",
    color: "#534AB7",
    terminos: ["director contenidos museo experiencia inmersiva México","video mapping director Mexico 2026","immersive experience director 2026","no proscenium immersive director","AVIXA immersive content director"],
    portales: ["No Proscenium","PLSN Jobs","AVIXA/InfoComm","Stage 32","ProductionHUB","LinkedIn MX","Media Match","Museos INBA/UNAM"],
  },
};

const SEMBLANZAS = {
  general: {
    label: "General",
    texto: `Jorge Orozco es un Cineasta, Director y Productor de Contenidos Multimedia con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv.

Proyectos actuales (2026): Celebrity Cruises Xcel (Director/Productor de Contenidos), "El Efecto" dir. Paula Watson (Diseñador de Video Escénico), Pacífico Azul (Cocolab/Los Cabos), largometraje "La casa que habitamos" (post-producción) y "Cautiverio de las almas" (UNAM, abril 2026).

Colabora con Switch It desde 2020: Lucero (abril 2026), Carin León, Benny Ibarra y Amazon Music.

Cine/TV: Escritor y director de "La sombra del Ángel" (13 capítulos, Estudios Churubusco 2012), "Dany Who" (Viacom/Paramount Channel), cortometrajes premiados Huellas y Casa Capuchinas (2014).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022 Mejor Diseño de Video, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Re de Café Tacuba 30 aniversario.

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv`,
  },
  live: {
    label: "Live Events",
    texto: `Jorge Orozco es un Cineasta, Director y Productor especializado en conciertos, video escénico y experiencias audiovisuales para eventos en vivo. Más de 25 años de trayectoria. Formado en Dirección de Cine (San Pablo CEU, Madrid) y Licenciado en Mercadotecnia (UVM).

Desde 2020 colabora con Switch It: Lucero (música regional, abril 2026), Carin León, Benny Ibarra y Amazon Music.

Director y Productor de Contenidos para Celebrity Cruises Xcel (Caribe y Mediterráneo). Diseñador de Video Escénico en "El Efecto" (dir. Paula Watson).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022 Mejor Diseño de Video, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Pacífico Azul (Cocolab).
Herramientas: Resolume · Notch · Disguise (xR) · After Effects · DaVinci

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv`,
  },
};

// ─── Componentes de UI ───────────────────────────────────────────────────────
const Tag = ({ children, bg, color }) => (
  <span style={{ fontSize: 11, background: bg, color, padding: "2px 8px", borderRadius: 20, fontWeight: 500 }}>
    {children}
  </span>
);

const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 12, padding: "1rem 1.25rem", ...style }}>
    {children}
  </div>
);

// ─── App principal ───────────────────────────────────────────────────────────
export default function App() {
  const [modo, setModo] = useState("general");
  const [trabajos, setTrabajos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [logs, setLogs] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [tab, setTab] = useState("busqueda");
  const [emailJob, setEmailJob] = useState(null);
  const [emailTxt, setEmailTxt] = useState("");
  const [emailCargando, setEmailCargando] = useState(false);
  const [semActiva, setSemActiva] = useState("general");
  const [copiado, setCopiado] = useState(null);

  const addLog = msg => setLogs(p => [...p, msg]);

  const buscar = useCallback(async () => {
    setCargando(true); setTrabajos([]); setLogs([]); setFecha(null);
    setEmailJob(null); setEmailTxt(""); setTab("busqueda");
    const m = MODOS[modo];
    addLog(`Modo: ${m.label} — ${m.desc}`);
    addLog(`Consultando ${m.portales.length} portales especializados...`);

    const system = `Eres un agente experto en búsqueda de empleo para la industria audiovisual, cine, teatro y live events en México y Latinoamérica. Busca ofertas REALES y ACTUALES (marzo 2026). Responde ÚNICAMENTE con JSON válido sin texto adicional ni backticks:
[{"titulo":"","empresa":"","ubicacion":"","tipo":"empleado|freelance|proyecto|convocatoria","descripcion":"2-3 oraciones","requisitos":"una línea","salario":null,"url":null,"portal":"","fechaPublicacion":"","match":0,"matchRazon":"","urgencia":"alta|media|baja"}]
Devuelve 7-12 oportunidades ordenadas por match descendente.`;

    const user = `PERFIL:\n${PERFIL_GENERAL}\n\nMODO: ${m.label}\nTérminos: ${m.terminos.join(" | ")}\nPortales: ${m.portales.join(", ")}\n\nBusca oportunidades concretas y actuales. Incluye trabajo formal, freelance, colaboraciones y convocatorias vigentes. Considera marcas de lujo, agencias creativas, festivales, streaming, productoras internacionales. El candidato tiene Premio Metropolitano de Teatro, ha trabajado con Diego Luna, Luis Gerardo Méndez, Daniel Giménez Cacho, Amazon Music, Tiffany & Co, Celebrity Cruises y The Sphere.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system,
          messages: [{ role: "user", content: user }],
          tools: [{ type: "web_search_20250305", name: "web_search" }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      let texto = "";
      for (const b of data.content) {
        if (b.type === "text") texto += b.text;
        if (b.type === "tool_use") addLog(`Buscando: "${b.input?.query || ''}"...`);
      }
      addLog("Clasificando resultados...");
      const clean = texto.replace(/```json|```/g, "").trim();
      let lista;
      try { lista = JSON.parse(clean); }
      catch { const mx = clean.match(/\[[\s\S]*\]/); if (mx) lista = JSON.parse(mx[0]); else throw new Error("Formato inesperado."); }
      if (!Array.isArray(lista)) throw new Error("Respuesta inválida.");
      lista.sort((a, b) => (b.match || 0) - (a.match || 0));
      setTrabajos(lista);
      setFecha(new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      addLog(`✓ ${lista.length} oportunidades encontradas`);
    } catch (e) {
      addLog(`Error: ${e.message}`);
    } finally {
      setCargando(false);
    }
  }, [modo]);

  const redactarEmail = useCallback(async (job) => {
    setEmailJob(job); setEmailTxt(""); setEmailCargando(true); setTab("email");
    const semb = SEMBLANZAS[modo === "live" ? "live" : "general"];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: `Redacta un correo breve y natural en español. Persona real escribiendo a otra persona real — cercano, directo, sin frases corporativas.

OFERTA:
Puesto: ${job.titulo}
Empresa: ${job.empresa}
Descripción: ${job.descripcion}

PERFIL:
${semb.texto}

ESTRUCTURA:
Línea 1: "ASUNTO: [una línea simple y concreta]"
[línea en blanco]
Saludo: "Hola," (o por nombre si hay alguien mencionado)
Párrafo 1 (2 oraciones): Vi/leí sobre esta oportunidad y me pareció muy interesante. Por qué le llama la atención específicamente ESTA empresa o proyecto.
Párrafo 2 (2 oraciones): Quién es Jorge en una frase y 1-2 proyectos puntuales relevantes para esta oferta.
Párrafo 3 (2 oraciones): Comparte links a su trabajo para que puedan conocer más. Si les interesa, con gusto agenda una videollamada.
Cierre: "Saludos, Jorge"
www.jorgeorozco.mx
www.toloache.tv
IMDb: imdb.com/name/nm2459902

Máximo 120 palabras · sin "espero su respuesta" · sin "me complace" · nada que suene a plantilla.`,
          }],
        }),
      });
      const data = await res.json();
      setEmailTxt(data.content?.find(b => b.type === "text")?.text || "Error generando el correo.");
    } catch {
      setEmailTxt("Error de conexión. Intenta de nuevo.");
    } finally {
      setEmailCargando(false);
    }
  }, [modo]);

  const copiar = (txt, key) => {
    navigator.clipboard.writeText(txt);
    setCopiado(key);
    setTimeout(() => setCopiado(null), 2000);
  };

  const mc = MODOS[modo].color;
  const altos = trabajos.filter(j => j.match >= 75).length;
  const hasTabs = trabajos.length > 0 || emailJob;

  const matchStyle = n => n >= 80
    ? { bg: C.success, color: C.successText }
    : n >= 60
    ? { bg: C.warning, color: C.warningText }
    : { bg: "#f1efe8", color: C.hint };

  const tipoStyle = {
    empleado: { bg: C.info, color: C.infoText },
    freelance: { bg: C.success, color: C.successText },
    proyecto: { bg: "#eeedfe", color: "#3C3489" },
    convocatoria: { bg: C.warning, color: C.warningText },
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "inherit" }}>
      {/* Top bar */}
      <div style={{ background: mc, padding: "0 2rem", height: 4 }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, letterSpacing: ".12em", color: C.hint, textTransform: "uppercase", marginBottom: 6 }}>
            Agente de búsqueda laboral
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 600, color: C.text, margin: "0 0 4px" }}>Jorge Orozco</h1>
              <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
                Cineasta · Director y Productor de Contenidos Multimedia · CDMX
              </p>
              <p style={{ fontSize: 11, color: C.hint, margin: "4px 0 0" }}>
                25 años de trayectoria · Premio Metropolitano de Teatro 2022
              </p>
            </div>
            <button
              onClick={buscar}
              disabled={cargando}
              style={{ fontSize: 13, padding: "10px 22px", background: mc, color: "white", border: "none", borderRadius: 8, fontWeight: 500 }}
            >
              {cargando ? "Buscando..." : fecha ? "↺ Actualizar" : "Buscar oportunidades"}
            </button>
          </div>
        </div>

        {/* Modo selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 11, color: C.hint, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".08em" }}>
            Tipo de búsqueda
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            {Object.entries(MODOS).map(([k, m]) => (
              <button
                key={k}
                onClick={() => { setModo(k); setTrabajos([]); setFecha(null); setLogs([]); }}
                style={{
                  fontSize: 13, padding: "8px 18px",
                  background: modo === k ? m.color : C.card,
                  color: modo === k ? "white" : C.muted,
                  border: `1px solid ${modo === k ? m.color : C.border}`,
                  borderRadius: 8, fontWeight: modo === k ? 500 : 400,
                }}
              >
                {m.label}
                <span style={{ fontSize: 11, opacity: .75, marginLeft: 6 }}>{m.desc}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {MODOS[modo].portales.map(p => (
              <span key={p} style={{ fontSize: 11, padding: "3px 10px", background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 20, color: C.hint }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Log */}
        {(cargando || logs.length > 0) && (
          <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: "1.5rem" }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, marginBottom: 4, color: i === logs.length - 1 && cargando ? C.text : C.hint }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0, display: "inline-block" }} />
                {l}
              </div>
            ))}
            {cargando && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: mc }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: mc, flexShrink: 0, display: "inline-block" }} />
                Procesando resultados...
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        {trabajos.length > 0 && !cargando && (
          <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ background: C.card, border: `0.5px solid ${C.border}`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.hint, marginBottom: 2 }}>Total</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: C.text }}>{trabajos.length}</div>
            </div>
            <div style={{ background: C.success, border: `0.5px solid #b8e0c8`, borderRadius: 10, padding: "10px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: C.successText, marginBottom: 2 }}>Alto match</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: C.successText }}>{altos}</div>
            </div>
            <div style={{ fontSize: 12, color: C.hint }}>{fecha}</div>
          </div>
        )}

        {/* Tabs */}
        {hasTabs && (
          <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: "1.5rem" }}>
            {[
              { k: "busqueda", l: `Oportunidades${trabajos.length ? ` (${trabajos.length})` : ""}` },
              { k: "email", l: emailJob ? `Correo — ${emailJob.titulo.slice(0, 22)}…` : "Correo" },
              { k: "semblanza", l: "Semblanzas" },
            ].map(t => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                style={{
                  fontSize: 13, padding: "10px 16px", background: "transparent",
                  border: "none", borderBottom: tab === t.k ? `2px solid ${mc}` : "2px solid transparent",
                  color: tab === t.k ? C.text : C.hint, fontWeight: tab === t.k ? 600 : 400,
                  borderRadius: 0, cursor: "pointer",
                }}
              >
                {t.l}
              </button>
            ))}
          </div>
        )}

        {/* Resultados */}
        {tab === "busqueda" && trabajos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {trabajos.map((job, i) => {
              const ms = matchStyle(job.match);
              const ts = tipoStyle[job.tipo] || tipoStyle.proyecto;
              return (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.text, marginBottom: 3 }}>{job.titulo}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{job.empresa}{job.ubicacion ? ` · ${job.ubicacion}` : ""}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                      {job.match && <Tag bg={ms.bg} color={ms.color}>{job.match}% match</Tag>}
                      <div style={{ display: "flex", gap: 4 }}>
                        {job.tipo && <Tag bg={ts.bg} color={ts.color}>{job.tipo}</Tag>}
                        {job.urgencia === "alta" && <Tag bg="#fde8e8" color="#c0392b">urgente</Tag>}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 8px" }}>{job.descripcion}</p>

                  {job.matchRazon && (
                    <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", paddingLeft: 12, borderLeft: `3px solid ${C.border}`, marginBottom: 12 }}>
                      {job.matchRazon}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", paddingTop: 8, borderTop: `0.5px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.hint }}>{job.portal}</span>
                    {job.fechaPublicacion && <span style={{ fontSize: 11, color: C.hint }}>{job.fechaPublicacion}</span>}
                    {job.salario && <span style={{ fontSize: 11, color: C.hint }}>{job.salario}</span>}
                    <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                      {job.url && <a href={job.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: mc }}>Ver oferta ↗</a>}
                      <button onClick={() => redactarEmail(job)} style={{ fontSize: 12, padding: "4px 12px", color: mc, border: `1px solid ${mc}` }}>
                        Redactar correo ↗
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Email */}
        {tab === "email" && (
          <div>
            {!emailJob && (
              <Card style={{ textAlign: "center", padding: "3rem" }}>
                <p style={{ color: C.hint, fontSize: 13 }}>Selecciona una oferta y haz clic en "Redactar correo".</p>
              </Card>
            )}
            {emailCargando && (
              <p style={{ fontSize: 13, color: C.muted, padding: "1rem 0" }}>
                Redactando para <strong>{emailJob?.titulo}</strong> en <strong>{emailJob?.empresa}</strong>…
              </p>
            )}
            {emailTxt && !emailCargando && (
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{emailJob?.titulo}</div>
                    <div style={{ fontSize: 12, color: C.hint }}>{emailJob?.empresa}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => copiar(emailTxt, "email")} style={{ fontSize: 12, padding: "5px 12px" }}>
                      {copiado === "email" ? "✓ Copiado" : "Copiar"}
                    </button>
                    <button onClick={() => setTab("busqueda")} style={{ fontSize: 12, padding: "5px 12px" }}>← Volver</button>
                  </div>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.8, color: C.muted, margin: 0, background: C.bg, borderRadius: 8, padding: "1rem" }}>
                  {emailTxt}
                </pre>
              </Card>
            )}
          </div>
        )}

        {/* Semblanzas */}
        {tab === "semblanza" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
              {Object.entries(SEMBLANZAS).map(([k, s]) => (
                <button
                  key={k}
                  onClick={() => setSemActiva(k)}
                  style={{ fontSize: 13, padding: "7px 16px", background: semActiva === k ? C.card : "transparent", border: `1px solid ${semActiva === k ? C.borderHover : C.border}`, borderRadius: 8, color: C.muted, fontWeight: semActiva === k ? 600 : 400 }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <Card>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                <button onClick={() => copiar(SEMBLANZAS[semActiva].texto, "sem")} style={{ fontSize: 12, padding: "5px 12px" }}>
                  {copiado === "sem" ? "✓ Copiado" : "Copiar texto"}
                </button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.75, color: C.muted, margin: 0 }}>
                {SEMBLANZAS[semActiva].texto}
              </pre>
            </Card>
          </div>
        )}

        {/* Empty state */}
        {!cargando && trabajos.length === 0 && tab === "busqueda" && logs.length === 0 && (
          <Card style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: C.text }}>Agente listo</h2>
            <p style={{ fontSize: 13, color: C.muted, maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}>
              Elige el tipo de búsqueda y presiona buscar. El agente usa web search en tiempo real con portales especializados. Luego puedes redactar un correo personalizado para cada oferta.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
