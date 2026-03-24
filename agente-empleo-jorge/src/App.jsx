import { useState, useCallback } from "react";

const PERFIL = `JORGE OROZCO — Cineasta · Director y Productor de Contenidos Multimedia
Ciudad de México | jorgeorozco.mx | toloache.tv | @toloachetv | IMDb: nm2459902

PERFIL: Cineasta, director y productor con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid, España) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv.

RECONOCIMIENTOS: Premio Metropolitano de Teatro 2022 — Mejor Diseño de Video por "Network" (prot. Daniel Giménez Cacho). Cortometrajes premiados: Huellas (2014), Casa Capuchinas (2014).

PROYECTOS ACTUALES (NO INCLUIR COMO VACANTES):
- Celebrity Cruises Xcel: Director y Productor de Contenidos.
- "El Efecto" (dir. Paula Watson): Diseñador de Video Escénico.
- Pacífico Azul (Cocolab, Los Cabos): Director de contenidos.
- "La casa que habitamos" (Mucho Power): Largometraje en post-producción.
- "Cautiverio de las almas" (UNAM): Exposición inmersiva.
- Switch It / Lucero (abril 2026): Concepto escénico.

CINE Y TV: La sombra del Ángel (escritor/director 13 caps, Estudios Churubusco 2012), Los Mayas son eternos (3 caps documental, Churubusco 2012), Dany Who (Viacom/Paramount Channel), 13 Miedos (Lemon Media).

TEATRO: Mamma Mía (OCESA, Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho (Premio Metropolitano 2022), "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

INMERSIVO: The Sphere Las Vegas (Josué Ibáñez Studio), Tiffany Wonder Tokyo (Tiffany & Co.), Re de Café Tacuba 30 aniversario, A Capite ad Calcem (UNAM), Egipto y Disney (Cocolab).

CONCIERTOS (Switch It 2020-presente): Carin León, Benny Ibarra, Amazon Music.

HERRAMIENTAS: Adobe Premiere, After Effects, DaVinci, Resolume, Notch, Disguise (xR), Final Draft, Movie Magic.
IDIOMAS: Español nativo, Inglés profesional.`;

const MODOS = {
  general: {
    label: "General", desc: "Cine · TV · Multimedia", color: "#0f0f1a",
    terminos: ["director multimedia Ciudad de México 2026","cineasta director productor México 2026","director creativo audiovisual CDMX","convocatoria director cine televisión México 2026","film director producer Latin America 2026","creative director immersive content 2026","director audiovisual Spain Europe 2026","film director streaming platform 2026"],
    portales: ["OCC","LinkedIn MX","Indeed MX","Glassdoor MX","Mandy.com","Stage 32","Ibermedia","IMCINE/FONCA","EntertainmentCareers.net","ProductionHUB","Media Match"],
  },
  live: {
    label: "Live Events", desc: "Conciertos · Teatro · Escena", color: "#8B1A1A",
    terminos: ["director cámaras conciertos México 2026","video designer live events CDMX","scenic video designer theater 2026","camera director live concert tour 2026","video content director music events international","live show director Latin America 2026","concert video director Europe USA 2026","theatrical video designer Broadway West End 2026"],
    portales: ["ProductionHUB","Mandy.com","Staff Me Up","PLSN Jobs","Stage 32","LinkedIn","Media Match","Backstage","Artsjobs UK"],
  },
  inmersivo: {
    label: "Inmersivo", desc: "Museos · Instalaciones · XR", color: "#1a0f3d",
    terminos: ["immersive experience director 2026","video mapping director museum 2026","multimedia director immersive installation international","no proscenium immersive director 2026","experiential content director luxury brand 2026","immersive art director Europe USA 2026","director contenidos museo experiencia inmersiva México","XR creative director 2026"],
    portales: ["No Proscenium","PLSN Jobs","AVIXA/InfoComm","Stage 32","ProductionHUB","LinkedIn","Media Match","Museos INBA/UNAM","Creative Review Jobs"],
  },
  internacional: {
    label: "Internacional", desc: "USA · Europa · Asia", color: "#0a3d2e",
    terminos: ["film director producer remote international 2026","multimedia director cruise ship entertainment 2026","creative director luxury brand experiential 2026","immersive show director Las Vegas Dubai 2026","theatrical video designer West End Broadway 2026","director of photography live events touring 2026","content director theme park attraction 2026","creative director museum exhibition international 2026"],
    portales: ["Mandy.com","ProductionHUB","Stage 32","EntertainmentCareers.net","Media Match","LinkedIn","No Proscenium","Indeed USA","Indeed UK","PLSN Jobs"],
  },
};

const SEMBLANZAS = {
  general: { label: "General", texto: `Jorge Orozco es un Cineasta, Director y Productor de Contenidos Multimedia con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv.

Proyectos actuales (2026): Celebrity Cruises Xcel (Director/Productor de Contenidos), "El Efecto" dir. Paula Watson (Diseñador de Video Escénico), Pacífico Azul (Cocolab/Los Cabos), largometraje "La casa que habitamos" y "Cautiverio de las almas" (UNAM, abril 2026).

Colabora con Switch It desde 2020: Lucero (abril 2026), Carin León, Benny Ibarra y Amazon Music.

Cine/TV: Escritor y director de "La sombra del Ángel" (13 capítulos, Estudios Churubusco 2012), "Dany Who" (Viacom/Paramount Channel), cortometrajes premiados Huellas y Casa Capuchinas (2014).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022 Mejor Diseño de Video, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Re de Café Tacuba 30 aniversario.

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv` },
  live: { label: "Live Events", texto: `Jorge Orozco es un Cineasta, Director y Productor especializado en conciertos, video escénico y experiencias audiovisuales para eventos en vivo. Más de 25 años de trayectoria. Formado en Dirección de Cine (San Pablo CEU, Madrid) y Licenciado en Mercadotecnia (UVM).

Desde 2020 colabora con Switch It: Lucero (música regional, abril 2026), Carin León, Benny Ibarra y Amazon Music.

Director y Productor de Contenidos para Celebrity Cruises Xcel (Caribe y Mediterráneo). Diseñador de Video Escénico en "El Efecto" (dir. Paula Watson).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Pacífico Azul (Cocolab).
Herramientas: Resolume · Notch · Disguise (xR) · After Effects · DaVinci

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv` },
};

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
  const [expandido, setExpandido] = useState(null);

  const addLog = m => setLogs(p => [...p, m]);

  const buscar = useCallback(async () => {
    setCargando(true); setTrabajos([]); setLogs([]); setFecha(null);
    setEmailJob(null); setEmailTxt(""); setTab("busqueda"); setExpandido(null);
    const m = MODOS[modo];
    addLog(`Modo: ${m.label} — ${m.desc}`);
    addLog(`Consultando ${m.portales.length} portales nacionales e internacionales...`);

    const system = `Eres un agente experto en búsqueda de empleo para la industria audiovisual, cine, teatro, live events y experiencias inmersivas. Busca ofertas REALES y ACTUALES (marzo 2026) tanto en México como INTERNACIONALES (USA, Europa, Asia, Latinoamérica).

PROYECTOS ACTUALES DEL CANDIDATO — NO INCLUIR COMO VACANTES:
Celebrity Cruises Xcel, "El Efecto" con Paula Watson, Pacífico Azul/Cocolab, "La casa que habitamos", "Cautiverio de las almas"/UNAM, Switch It/Lucero abril 2026.

INSTRUCCIONES CRÍTICAS DE FORMATO:
- Texto plano únicamente. SIN etiquetas HTML, SIN <cite>, SIN </cite>, SIN markdown.
- "descripcion": 3-4 oraciones explicando qué hace el puesto, qué proyectos involucra, con quién trabaja y qué oportunidad representa. Texto limpio.
- "porQueAplicar": 2 oraciones específicas explicando por qué este candidato encaja, mencionando proyectos concretos del candidato que conectan con esta oferta.
- "skills": 3-5 habilidades clave que busca la empresa.
- "pais": país donde está la oportunidad.

Responde ÚNICAMENTE con JSON válido sin texto adicional ni backticks:
[{"titulo":"","empresa":"","ubicacion":"","pais":"México|USA|UK|España|otro","tipo":"empleado|freelance|proyecto|convocatoria","descripcion":"3-4 oraciones texto plano sin HTML","skills":["skill1","skill2"],"salario":null,"url":null,"portal":"","fechaPublicacion":"","match":0,"matchRazon":"","porQueAplicar":"2 oraciones específicas","urgencia":"alta|media|baja"}]
Devuelve 8-12 oportunidades ordenadas por match descendente. Incluye al menos 3 oportunidades internacionales.`;

    const user = `PERFIL:\n${PERFIL}\n\nMODO: ${m.label}\nTérminos: ${m.terminos.join(" | ")}\nPortales: ${m.portales.join(", ")}\n\nBusca oportunidades NUEVAS distintas a los proyectos actuales. Incluye trabajo formal, freelance, colaboraciones y convocatorias. Incluye mínimo 3 internacionales. Prioriza oportunidades con alto potencial creativo y económico.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 5000, system, messages: [{ role: "user", content: user }], tools: [{ type: "web_search_20250305", name: "web_search" }] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      let texto = "";
      for (const b of data.content) {
        if (b.type === "text") texto += b.text;
        if (b.type === "tool_use") addLog(`Buscando: "${b.input?.query || ''}"...`);
      }
      addLog("Analizando y clasificando resultados...");
      const clean = texto.replace(/```json|```/g, "").replace(/<\/?cite[^>]*>/g, "").trim();
      let lista;
      try { lista = JSON.parse(clean); } catch { const mx = clean.match(/\[[\s\S]*\]/); if (mx) lista = JSON.parse(mx[0]); else throw new Error("Formato inesperado."); }
      if (!Array.isArray(lista)) throw new Error("Respuesta inválida.");
      lista.sort((a, b) => (b.match || 0) - (a.match || 0));
      setTrabajos(lista);
      setFecha(new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      const intl = lista.filter(j => j.pais && j.pais !== "México").length;
      addLog(`✓ ${lista.length} oportunidades — ${intl} internacionales`);
    } catch (e) { addLog(`Error: ${e.message}`); }
    finally { setCargando(false); }
  }, [modo]);

  const redactarEmail = useCallback(async (job) => {
    setEmailJob(job); setEmailTxt(""); setEmailCargando(true); setTab("email");
    const semb = SEMBLANZAS[modo === "live" ? "live" : "general"];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, messages: [{ role: "user", content: `Redacta un correo breve y natural en español. Persona real escribiendo a otra — cercano, directo, sin frases corporativas.

OFERTA:
Puesto: ${job.titulo}
Empresa: ${job.empresa} (${job.ubicacion})
Descripción: ${job.descripcion}
Por qué aplicar: ${job.porQueAplicar || job.matchRazon}

PERFIL:
${semb.texto}

ESTRUCTURA:
Línea 1: "ASUNTO: [asunto específico y directo]"
[línea en blanco]
Saludo: "Hola," o nombre si se menciona
Párrafo 1 (2 oraciones): Vi/leí sobre esta oportunidad. Por qué le interesa específicamente ESTA empresa.
Párrafo 2 (2 oraciones): Quién es Jorge y 1-2 proyectos directamente relevantes para esta oferta.
Párrafo 3 (2 oraciones): Comparte links para que conozcan más su trabajo. Disponible para videollamada.
Cierre: "Saludos, Jorge"
www.jorgeorozco.mx | www.toloache.tv | IMDb: imdb.com/name/nm2459902

Máximo 130 palabras · sin "espero su respuesta" · sin "me complace" · voz propia natural.` }] }),
      });
      const data = await res.json();
      setEmailTxt(data.content?.find(b => b.type === "text")?.text || "Error al generar el correo.");
    } catch { setEmailTxt("Error de conexión."); }
    finally { setEmailCargando(false); }
  }, [modo]);

  const copiar = (txt, key) => { navigator.clipboard.writeText(txt); setCopiado(key); setTimeout(() => setCopiado(null), 2000); };

  const mc = MODOS[modo].color;
  const altos = trabajos.filter(j => j.match >= 75).length;
  const intlCount = trabajos.filter(j => j.pais && j.pais !== "México").length;
  const hasTabs = trabajos.length > 0 || emailJob;

  const matchBadge = n => n >= 80 ? { bg: "#dcf5e7", color: "#0d5c2e" } : n >= 60 ? { bg: "#fff4d6", color: "#7a4a00" } : { bg: "#f0efeb", color: "#6b6b68" };
  const tipoBadge = { empleado: { bg: "#ddeeff", color: "#0a3d7a" }, freelance: { bg: "#dcf5e7", color: "#0d5c2e" }, proyecto: { bg: "#ede9fe", color: "#3b1fa8" }, convocatoria: { bg: "#fff4d6", color: "#7a4a00" } };
  const paisFlag = p => ({ "USA":"🇺🇸","UK":"🇬🇧","España":"🇪🇸","Japón":"🇯🇵","México":"🇲🇽","otro":"🌐" }[p] || "🌐");

  const ss = { fontFamily: "system-ui, -apple-system, sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3", ...ss }}>
      <div style={{ background: mc, color: "white", padding: "2.5rem 2rem 2rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: 10, letterSpacing: ".2em", opacity: .55, textTransform: "uppercase", marginBottom: 10 }}>Agente de búsqueda laboral</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 5px", letterSpacing: "-.02em", fontFamily: "Georgia, serif" }}>Jorge Orozco</h1>
              <p style={{ fontSize: 13, opacity: .75, margin: "0 0 3px" }}>Cineasta · Director y Productor de Contenidos Multimedia · CDMX</p>
              <p style={{ fontSize: 11, opacity: .45, margin: 0 }}>25 años · Premio Metropolitano de Teatro 2022 · The Sphere · Celebrity Cruises · Tiffany</p>
            </div>
            <button onClick={buscar} disabled={cargando} style={{ fontSize: 13, padding: "11px 24px", background: "white", color: mc, border: "none", borderRadius: 8, fontWeight: 700, cursor: cargando ? "wait" : "pointer", opacity: cargando ? .6 : 1, flexShrink: 0 }}>
              {cargando ? "Buscando..." : fecha ? "↺ Nueva búsqueda" : "Buscar oportunidades →"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "1.5rem 2rem 3rem" }}>

        {/* Modos */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 10, color: "#9c9a92", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".1em" }}>Tipo de búsqueda</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
            {Object.entries(MODOS).map(([k, m]) => (
              <button key={k} onClick={() => { setModo(k); setTrabajos([]); setFecha(null); setLogs([]); setExpandido(null); }} style={{ fontSize: 12, padding: "7px 16px", cursor: "pointer", background: modo === k ? m.color : "white", color: modo === k ? "white" : "#3d3d3a", border: `1px solid ${modo === k ? m.color : "#dedad4"}`, borderRadius: 6, fontWeight: modo === k ? 600 : 400 }}>
                {m.label} <span style={{ fontSize: 10, opacity: .65, marginLeft: 4 }}>{m.desc}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {MODOS[modo].portales.map(p => <span key={p} style={{ fontSize: 10, padding: "2px 8px", background: "white", border: "0.5px solid #dedad4", borderRadius: 20, color: "#9c9a92" }}>{p}</span>)}
          </div>
        </div>

        {/* Log */}
        {(cargando || logs.length > 0) && (
          <div style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 10, padding: "12px 16px", marginBottom: "1.5rem" }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, marginBottom: 4, color: i === logs.length - 1 && cargando ? "#1a1a1a" : "#9c9a92" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0, display: "inline-block" }} />{l}
              </div>
            ))}
            {cargando && <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, color: mc }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: mc, flexShrink: 0, display: "inline-block" }} />Procesando resultados...</div>}
          </div>
        )}

        {/* Stats */}
        {trabajos.length > 0 && !cargando && (
          <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
            {[{ l: "Total", v: trabajos.length, bg: "white", c: "#1a1a1a" }, { l: "Alto match", v: altos, bg: "#dcf5e7", c: "#0d5c2e" }, { l: "Internacionales", v: intlCount, bg: "#ddeeff", c: "#0a3d7a" }].map(s => (
              <div key={s.l} style={{ background: s.bg, border: "0.5px solid #dedad4", borderRadius: 10, padding: "10px 18px", textAlign: "center", minWidth: 80 }}>
                <div style={{ fontSize: 10, color: s.c, marginBottom: 2, textTransform: "uppercase", letterSpacing: ".06em", opacity: .7 }}>{s.l}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.c }}>{s.v}</div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: "#9c9a92" }}>{fecha}</div>
          </div>
        )}

        {/* Tabs */}
        {hasTabs && (
          <div style={{ display: "flex", borderBottom: "1px solid #dedad4", marginBottom: "1.5rem" }}>
            {[{ k: "busqueda", l: `Oportunidades${trabajos.length ? ` (${trabajos.length})` : ""}` }, { k: "email", l: emailJob ? `Correo — ${emailJob.titulo.slice(0,20)}…` : "Correo" }, { k: "semblanza", l: "Semblanzas" }].map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} style={{ fontSize: 13, padding: "10px 16px", background: "transparent", border: "none", borderBottom: tab === t.k ? `2px solid ${mc}` : "2px solid transparent", color: tab === t.k ? "#1a1a1a" : "#9c9a92", fontWeight: tab === t.k ? 700 : 400, cursor: "pointer", borderRadius: 0 }}>{t.l}</button>
            ))}
          </div>
        )}

        {/* Resultados */}
        {tab === "busqueda" && trabajos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {trabajos.map((job, i) => {
              const mb = matchBadge(job.match);
              const tb = tipoBadge[job.tipo] || tipoBadge.proyecto;
              const open = expandido === i;
              return (
                <div key={i} style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 12, overflow: "hidden", transition: "box-shadow .2s", boxShadow: open ? "0 4px 24px rgba(0,0,0,.07)" : "none" }}>
                  <div style={{ padding: "1.1rem 1.25rem", cursor: "pointer" }} onClick={() => setExpandido(open ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: "#1a1a1a", marginBottom: 3, fontFamily: "Georgia, serif" }}>{job.titulo}</div>
                        <div style={{ fontSize: 12, color: "#6b6b68" }}>
                          {job.empresa}{job.ubicacion ? ` · ${job.ubicacion}` : ""}{job.pais ? ` ${paisFlag(job.pais)}` : ""}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                        {job.match && <span style={{ fontSize: 12, fontWeight: 700, background: mb.bg, color: mb.color, padding: "3px 10px", borderRadius: 20 }}>{job.match}% match</span>}
                        <div style={{ display: "flex", gap: 4 }}>
                          {job.tipo && <span style={{ fontSize: 10, background: tb.bg, color: tb.color, padding: "2px 8px", borderRadius: 20 }}>{job.tipo}</span>}
                          {job.urgencia === "alta" && <span style={{ fontSize: 10, background: "#fde8e8", color: "#9b1c1c", padding: "2px 8px", borderRadius: 20 }}>urgente</span>}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#4a4a47", lineHeight: 1.65, margin: "0 0 8px" }}>{job.descripcion}</p>
                    <div style={{ fontSize: 11, color: "#9c9a92" }}>{open ? "▲ menos detalle" : "▼ más detalle"}</div>
                  </div>

                  {open && (
                    <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid #f0efeb" }}>
                      {job.porQueAplicar && (
                        <div style={{ background: "#f7f6f3", borderRadius: 8, padding: "10px 14px", margin: "12px 0" }}>
                          <div style={{ fontSize: 10, color: mc, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Por qué aplicar</div>
                          <p style={{ fontSize: 12.5, color: "#4a4a47", margin: 0, lineHeight: 1.6 }}>{job.porQueAplicar}</p>
                        </div>
                      )}
                      {job.skills && job.skills.length > 0 && (
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, color: "#9c9a92", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Buscan</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {job.skills.map((s, si) => <span key={si} style={{ fontSize: 11, padding: "3px 10px", background: "#f0efeb", color: "#4a4a47", borderRadius: 20 }}>{s}</span>)}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", paddingTop: 10, borderTop: "0.5px solid #f0efeb" }}>
                        <span style={{ fontSize: 11, color: "#9c9a92" }}>{job.portal}</span>
                        {job.fechaPublicacion && <span style={{ fontSize: 11, color: "#9c9a92" }}>{job.fechaPublicacion}</span>}
                        {job.salario && <span style={{ fontSize: 11, color: "#4a4a47", fontWeight: 600 }}>{job.salario}</span>}
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          {job.url && <a href={job.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: mc, fontWeight: 600 }}>Ver oferta ↗</a>}
                          <button onClick={() => redactarEmail(job)} style={{ fontSize: 12, padding: "6px 14px", color: "white", background: mc, border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Redactar correo →</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Email */}
        {tab === "email" && (
          <div>
            {!emailJob && <div style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 12, padding: "3rem", textAlign: "center" }}><p style={{ color: "#9c9a92", fontSize: 13 }}>Expande una oferta y haz clic en "Redactar correo".</p></div>}
            {emailCargando && <p style={{ fontSize: 13, color: "#6b6b68", padding: "1rem 0" }}>Redactando para <strong>{emailJob?.titulo}</strong> en <strong>{emailJob?.empresa}</strong>…</p>}
            {emailTxt && !emailCargando && (
              <div style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <div><div style={{ fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" }}>{emailJob?.titulo}</div><div style={{ fontSize: 12, color: "#9c9a92" }}>{emailJob?.empresa}</div></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => copiar(emailTxt, "email")} style={{ fontSize: 12, padding: "6px 14px" }}>{copiado === "email" ? "✓ Copiado" : "Copiar"}</button>
                    <button onClick={() => setTab("busqueda")} style={{ fontSize: 12, padding: "6px 14px" }}>← Volver</button>
                  </div>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.8, color: "#4a4a47", margin: 0, background: "#f7f6f3", borderRadius: 8, padding: "1.25rem" }}>{emailTxt}</pre>
              </div>
            )}
          </div>
        )}

        {/* Semblanzas */}
        {tab === "semblanza" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
              {Object.entries(SEMBLANZAS).map(([k, s]) => (
                <button key={k} onClick={() => setSemActiva(k)} style={{ fontSize: 13, padding: "7px 16px", cursor: "pointer", background: semActiva === k ? "white" : "transparent", border: `1px solid ${semActiva === k ? "#b0ada6" : "#dedad4"}`, borderRadius: 6, color: "#3d3d3a", fontWeight: semActiva === k ? 700 : 400 }}>{s.label}</button>
              ))}
            </div>
            <div style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 12, padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                <button onClick={() => copiar(SEMBLANZAS[semActiva].texto, "sem")} style={{ fontSize: 12, padding: "6px 14px" }}>{copiado === "sem" ? "✓ Copiado" : "Copiar texto"}</button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.8, color: "#4a4a47", margin: 0 }}>{SEMBLANZAS[semActiva].texto}</pre>
            </div>
          </div>
        )}

        {/* Empty */}
        {!cargando && trabajos.length === 0 && tab === "busqueda" && logs.length === 0 && (
          <div style={{ background: "white", border: "0.5px solid #dedad4", borderRadius: 12, padding: "4rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎬</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, fontFamily: "Georgia, serif" }}>Agente listo</h2>
            <p style={{ fontSize: 14, color: "#6b6b68", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>Elige el tipo de búsqueda y presiona buscar. El agente consulta portales nacionales e internacionales en tiempo real y genera descripciones detalladas de cada oportunidad.</p>
          </div>
        )}
      </div>
    </div>
  );
}
