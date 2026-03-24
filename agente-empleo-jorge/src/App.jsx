import { useState, useCallback } from "react";

const PROYECTOS_ACTUALES = [
  "celebrity cruises","celebrity xcel","el efecto","paula watson",
  "pacífico azul","pacifico azul","cocolab los cabos","la casa que habitamos","mucho power",
  "cautiverio de las almas","unam inquisición","switch it lucero","lucero abril",
];

const PERFIL = `JORGE OROZCO — Cineasta · Director y Productor de Contenidos Multimedia
Ciudad de México | jorgeorozco.mx | toloache.tv | @toloachetv | IMDb: nm2459902

PERFIL: Cineasta, director y productor con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv.

RECONOCIMIENTOS: Premio Metropolitano de Teatro 2022 — Mejor Diseño de Video, "Network" (prot. Daniel Giménez Cacho). Cortometrajes premiados: Huellas (2014), Casa Capuchinas (2014).

CINE Y TV: La sombra del Ángel (escritor/director 13 caps, Estudios Churubusco 2012), Los Mayas son eternos (3 caps, Churubusco 2012), Dany Who (Viacom/Paramount Channel), 13 Miedos (Lemon Media). Cortometrajes: El vengador (2008), Huellas y Casa Capuchinas (2014, premiados).

TEATRO: Mamma Mía (OCESA, Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho (Premio Metropolitano 2022), "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

INMERSIVO: The Sphere Las Vegas (Josué Ibáñez Studio), Tiffany Wonder Tokyo (Tiffany & Co.), Re de Café Tacuba 30 aniversario, A Capite ad Calcem (UNAM), Egipto y Disney (Cocolab).

CONCIERTOS (Switch It 2020-presente): Carin León, Benny Ibarra, Amazon Music.

HERRAMIENTAS: Adobe Premiere, After Effects, DaVinci, Resolume, Notch, Disguise (xR), Final Draft, Movie Magic.
IDIOMAS: Español nativo, Inglés profesional.`;

const PROYECTOS_EXCLUIR = `PROYECTOS ACTUALES — EXCLUSIÓN TOTAL. Jorge YA trabaja en estos proyectos, NO los incluyas como vacantes bajo ningún concepto. Si encuentras una vacante relacionada con estas empresas, descártala y busca otra diferente:
1. Celebrity Cruises / Celebrity Xcel — Jorge ES el director y productor de contenidos.
2. "El Efecto" con Paula Watson — Jorge ES el diseñador de video escénico.
3. Pacífico Azul / Cocolab Los Cabos — Jorge YA dirige contenidos ahí.
4. "La casa que habitamos" / Mucho Power — Jorge YA es el director, en post-producción.
5. "Cautiverio de las almas" — Jorge YA la terminó para la UNAM.
6. Switch It + Lucero concierto abril 2026 — Jorge YA está en ese proyecto.

Si tienes duda sobre si incluir una vacante, NO la incluyas. Busca otra.`;

const MODOS = {
  general: {
    label: "General", desc: "Cine · TV · Multimedia", color: "#111827",
    terminos: ["director multimedia Ciudad de México 2026","cineasta director productor México 2026","director creativo audiovisual CDMX","convocatoria director cine televisión México 2026","film director producer Latin America 2026","creative director immersive content 2026","director audiovisual Spain Europe 2026"],
    portales: ["OCC","LinkedIn MX","Indeed MX","Glassdoor MX","Mandy.com","Stage 32","Ibermedia","IMCINE/FONCA","EntertainmentCareers.net","Media Match"],
  },
  live: {
    label: "Live Events", desc: "Conciertos · Teatro · Escena", color: "#7f1d1d",
    terminos: ["director cámaras conciertos México 2026","video designer live events CDMX","scenic video designer theater 2026","camera director live concert tour 2026","theatrical video designer Broadway West End 2026","live show director international 2026"],
    portales: ["ProductionHUB","Mandy.com","Staff Me Up","PLSN Jobs","Stage 32","LinkedIn","Media Match","Backstage","Artsjobs UK"],
  },
  inmersivo: {
    label: "Inmersivo", desc: "Museos · XR · Instalaciones", color: "#1e1b4b",
    terminos: ["immersive experience director 2026","video mapping director museum 2026","multimedia director immersive installation international","no proscenium immersive director 2026","experiential content director luxury brand 2026","XR creative director 2026"],
    portales: ["No Proscenium","PLSN Jobs","AVIXA/InfoComm","Stage 32","ProductionHUB","LinkedIn","Media Match","Museos INBA/UNAM","Creative Review Jobs"],
  },
  internacional: {
    label: "Internacional", desc: "USA · Europa · Asia", color: "#064e3b",
    terminos: ["film director producer remote international 2026","multimedia director cruise ship entertainment 2026","creative director luxury brand experiential 2026","immersive show director Las Vegas Dubai 2026","theatrical video designer West End Broadway 2026","content director theme park attraction 2026"],
    portales: ["Mandy.com","ProductionHUB","Stage 32","EntertainmentCareers.net","Media Match","LinkedIn","No Proscenium","Indeed USA","Indeed UK","PLSN Jobs"],
  },
};

const SEMBLANZAS = {
  general: { label: "General", texto: `Jorge Orozco es un Cineasta, Director y Productor de Contenidos Multimedia con más de 25 años de trayectoria en cine, televisión, teatro, espectáculos en vivo y experiencias inmersivas. Formado en Dirección de Cine en San Pablo CEU (Madrid) y Licenciado en Mercadotecnia por la Universidad del Valle de México. Socio fundador de Toloache.tv.

Proyectos actuales (2026): Celebrity Cruises Xcel (Director/Productor de Contenidos), "El Efecto" dir. Paula Watson (Diseñador de Video Escénico), Pacífico Azul (Cocolab/Los Cabos), largometraje "La casa que habitamos" y "Cautiverio de las almas" (UNAM).

Colabora con Switch It desde 2020: Lucero (abril 2026), Carin León, Benny Ibarra y Amazon Music.

Cine/TV: Escritor y director de "La sombra del Ángel" (13 capítulos, Estudios Churubusco 2012), "Dany Who" (Viacom/Paramount Channel), cortometrajes premiados Huellas y Casa Capuchinas (2014).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Re de Café Tacuba 30 aniversario.

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv` },
  live: { label: "Live Events", texto: `Jorge Orozco es un Cineasta, Director y Productor especializado en conciertos, video escénico y experiencias audiovisuales para eventos en vivo. Más de 25 años de trayectoria.

Desde 2020 colabora con Switch It: Lucero (música regional, abril 2026), Carin León, Benny Ibarra y Amazon Music.

Director y Productor de Contenidos para Celebrity Cruises Xcel. Diseñador de Video Escénico en "El Efecto" (dir. Paula Watson).

Teatro: Mamma Mía (Diseñador de Video y Productor Asociado), "Network" prot. Daniel Giménez Cacho — Premio Metropolitano de Teatro 2022, "Privacidad" con Diego Luna y Luis Gerardo Méndez, Cirque Music: Querida, Peter Pan (OCESA).

Inmersivo: The Sphere Las Vegas, Tiffany Wonder Tokyo, Pacífico Azul (Cocolab).
Herramientas: Resolume · Notch · Disguise (xR) · After Effects · DaVinci

www.jorgeorozco.mx | www.toloache.tv | IMDb: nm2459902 | @toloachetv` },
};

const ICONS = { general: "◈", live: "◉", inmersivo: "◎", internacional: "◌" };

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

  const mc = MODOS[modo].color;
  const addLog = m => setLogs(p => [...p, m]);

  const buscar = useCallback(async () => {
    setCargando(true); setTrabajos([]); setLogs([]); setFecha(null);
    setEmailJob(null); setEmailTxt(""); setTab("busqueda"); setExpandido(null);
    const m = MODOS[modo];
    addLog(`Modo ${m.label} — consultando ${m.portales.length} portales...`);

    const system = `Eres un agente experto en búsqueda de empleo para la industria audiovisual, cine, teatro, live events y experiencias inmersivas. Busca ofertas REALES y ACTUALES (marzo 2026) en México e internacionales.

${PROYECTOS_EXCLUIR}

FORMATO: texto plano, SIN HTML, SIN etiquetas cite, SIN markdown. JSON únicamente:

SOBRE EL CAMPO "contacto": Busca el correo de contacto, nombre del reclutador o responsable de RH mencionado en la oferta. Si no hay correo directo, anota el nombre del portal de aplicación o el departamento. Ejemplo: "rrhh@empresa.com", "María González, reclutadora", o "Aplicar vía LinkedIn". Pon null solo si no hay ninguna referencia.

SOBRE EL CAMPO "salario": Es muy importante. Busca activamente rangos de compensación. Incluye:
- Si la oferta pública menciona el rango, ponlo exacto.
- Si el portal tiene datos de mercado para ese puesto en esa región, inclúyelos como "Estimado: $X–$Y MXN/mes" o "Estimado: $X–$Y USD/proyecto".
- Para freelance: estima tarifa por proyecto o día según estándares de la industria.
- Solo pon null si realmente no hay ninguna referencia disponible.
[{"titulo":"","empresa":"","ubicacion":"","pais":"México|USA|UK|España|otro","tipo":"empleado|freelance|proyecto|convocatoria","descripcion":"3-4 oraciones detalladas texto plano","skills":["s1","s2","s3"],"salario":"rango en moneda local o USD si es internacional, o null si no hay info pública","contacto":"correo o nombre del contacto si está disponible, o null","url":null,"portal":"","fechaPublicacion":"","match":0,"matchRazon":"","porQueAplicar":"2 oraciones específicas conectando proyectos del candidato con esta oferta","urgencia":"alta|media|baja"}]
8-12 resultados, mínimo 3 internacionales, ordenados por match.`;

    const user = `PERFIL:\n${PERFIL}\n\nMODO: ${m.label}\nTérminos: ${m.terminos.join(" | ")}\nPortales: ${m.portales.join(", ")}\n\nBusca oportunidades NUEVAS y DISTINTAS. Excluye estrictamente los proyectos actuales. Mínimo 3 internacionales.`;

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
      addLog("Filtrando y clasificando...");
      const clean = texto.replace(/```json|```/g, "").replace(/<\/?cite[^>]*>/g, "").trim();
      let lista;
      try { lista = JSON.parse(clean); } catch { const mx = clean.match(/\[[\s\S]*\]/); if (mx) lista = JSON.parse(mx[0]); else throw new Error("Formato inesperado."); }
      if (!Array.isArray(lista)) throw new Error("Respuesta inválida.");
      lista = lista.filter(job => {
        const txt = `${job.titulo} ${job.empresa} ${job.descripcion}`.toLowerCase();
        return !PROYECTOS_ACTUALES.some(p => txt.includes(p));
      });
      lista.sort((a, b) => (b.match || 0) - (a.match || 0));
      setTrabajos(lista);
      setFecha(new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      addLog(`✓ ${lista.length} oportunidades — ${lista.filter(j => j.pais && j.pais !== "México").length} internacionales`);
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
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, messages: [{ role: "user", content: `Correo breve y natural en español. Tono: persona real, directo, sin corporativo.\n\nOFERTA: ${job.titulo} — ${job.empresa} (${job.ubicacion})\nDescripción: ${job.descripcion}\nPor qué aplicar: ${job.porQueAplicar || job.matchRazon}\n\nPERFIL:\n${semb.texto}\n\nESTRUCTURA:\nLínea 1: "ASUNTO: [directo y específico]"\n[vacío]\n"Hola," + párrafo 1 (2 oraciones): Vi esta oportunidad + por qué me interesa específicamente.\nPárrafo 2 (2 oraciones): Quién soy + 1-2 proyectos relevantes para esta oferta.\nPárrafo 3 (2 oraciones): Links de trabajo. Disponible para videollamada.\n"Saludos, Jorge"\nwww.jorgeorozco.mx | www.toloache.tv | IMDb: imdb.com/name/nm2459902\n\nMáximo 130 palabras. Sin "espero", sin "me complace", voz propia.` }] }),
      });
      const data = await res.json();
      setEmailTxt(data.content?.find(b => b.type === "text")?.text || "Error.");
    } catch { setEmailTxt("Error de conexión."); }
    finally { setEmailCargando(false); }
  }, [modo]);

  const copiar = (txt, k) => { navigator.clipboard.writeText(txt); setCopiado(k); setTimeout(() => setCopiado(null), 2000); };

  const altos = trabajos.filter(j => j.match >= 75).length;
  const intlCount = trabajos.filter(j => j.pais && j.pais !== "México").length;
  const hasTabs = trabajos.length > 0 || emailJob;
  const matchStyle = n => n >= 80 ? { bg: "#d1fae5", c: "#065f46" } : n >= 60 ? { bg: "#fef3c7", c: "#78350f" } : { bg: "#f3f4f6", c: "#6b7280" };
  const tipoStyle = { empleado: { bg: "#dbeafe", c: "#1e40af" }, freelance: { bg: "#d1fae5", c: "#065f46" }, proyecto: { bg: "#ede9fe", c: "#4c1d95" }, convocatoria: { bg: "#fef3c7", c: "#78350f" } };
  const flag = p => ({ "USA":"🇺🇸","UK":"🇬🇧","España":"🇪🇸","Japón":"🇯🇵","México":"🇲🇽" }[p] || "🌐");

  const F = "system-ui,-apple-system,sans-serif";
  const serif = "Georgia,'Times New Roman',serif";

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf9", fontFamily: F }}>
      <style>{`*{box-sizing:border-box}.card{background:white;border:1px solid #e7e5e4;border-radius:14px;transition:box-shadow .2s,border-color .2s}.card:hover{border-color:#d1ccc8;box-shadow:0 2px 14px rgba(0,0,0,.07)}.card.open{box-shadow:0 8px 32px rgba(0,0,0,.1);border-color:#c7c3be}.btn{border:1px solid #e7e5e4;background:white;border-radius:8px;padding:7px 16px;font-size:13px;cursor:pointer;color:#3d3d3a;transition:all .15s;font-family:inherit}.btn:hover{background:#f5f4f1;border-color:#c7c3be}.tag{display:inline-block;font-size:11px;padding:3px 10px;border-radius:20px;font-weight:500}`}</style>

      {/* Header */}
      <div style={{ background: mc }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "2.5rem 2rem 2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(255,255,255,.45)", textTransform: "uppercase", marginBottom: 10 }}>Agente de búsqueda laboral</div>
              <h1 style={{ fontFamily: serif, fontSize: 34, fontWeight: 400, color: "white", margin: "0 0 6px", letterSpacing: "-.01em" }}>Jorge Orozco</h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", margin: "0 0 3px" }}>Cineasta · Director y Productor de Contenidos Multimedia · CDMX</p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)", margin: 0 }}>25 años · Premio Metropolitano 2022 · The Sphere · Tiffany · Celebrity Cruises</p>
            </div>
            <button onClick={buscar} disabled={cargando} style={{ fontSize: 14, padding: "13px 28px", background: "white", color: mc, border: "none", borderRadius: 10, fontWeight: 700, cursor: cargando ? "wait" : "pointer", opacity: cargando ? .6 : 1, fontFamily: F, flexShrink: 0 }}>
              {cargando ? "Buscando..." : fecha ? "↺ Nueva búsqueda" : "Buscar oportunidades →"}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 2rem 4rem" }}>

        {/* Modos */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ fontSize: 10, color: "#a8a29e", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".12em" }}>Tipo de búsqueda</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {Object.entries(MODOS).map(([k, m]) => (
              <button key={k} onClick={() => { setModo(k); setTrabajos([]); setFecha(null); setLogs([]); setExpandido(null); }} style={{ fontSize: 13, padding: "9px 18px", cursor: "pointer", background: modo === k ? m.color : "white", color: modo === k ? "white" : "#44403c", border: `1px solid ${modo === k ? m.color : "#e7e5e4"}`, borderRadius: 8, fontWeight: modo === k ? 600 : 400, fontFamily: F, display: "flex", alignItems: "center", gap: 7, transition: "all .15s" }}>
                <span style={{ fontSize: 14, opacity: .8 }}>{ICONS[k]}</span>
                {m.label}
                <span style={{ fontSize: 11, opacity: .6 }}>{m.desc}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {MODOS[modo].portales.map(p => <span key={p} style={{ fontSize: 11, padding: "3px 10px", background: "white", border: "1px solid #e7e5e4", borderRadius: 20, color: "#a8a29e" }}>{p}</span>)}
          </div>
        </div>

        {/* Log */}
        {(cargando || logs.length > 0) && (
          <div style={{ background: "white", border: "1px solid #e7e5e4", borderRadius: 12, padding: "14px 18px", marginBottom: "1.75rem" }}>
            {logs.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 12.5, marginBottom: 5, color: i === logs.length - 1 && cargando ? "#1c1917" : "#a8a29e" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0, display: "inline-block" }} />{l}
              </div>
            ))}
            {cargando && <div style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 12.5, color: mc }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: mc, flexShrink: 0, display: "inline-block" }} />Procesando resultados...</div>}
          </div>
        )}

        {/* Stats */}
        {trabajos.length > 0 && !cargando && (
          <div style={{ display: "flex", gap: 10, marginBottom: "1.75rem", flexWrap: "wrap", alignItems: "center" }}>
            {[{ l: "Total", v: trabajos.length, bg: "white", c: "#1c1917" }, { l: "Alto match", v: altos, bg: "#d1fae5", c: "#065f46" }, { l: "Internacionales", v: intlCount, bg: "#dbeafe", c: "#1e40af" }].map(s => (
              <div key={s.l} style={{ background: s.bg, border: "1px solid #e7e5e4", borderRadius: 10, padding: "10px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: s.c, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".07em", opacity: .7 }}>{s.l}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.v}</div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: "#a8a29e", marginLeft: 4 }}>{fecha}</div>
          </div>
        )}

        {/* Tabs */}
        {hasTabs && (
          <div style={{ display: "flex", borderBottom: "1px solid #e7e5e4", marginBottom: "1.75rem" }}>
            {[{ k: "busqueda", l: `Oportunidades${trabajos.length ? ` (${trabajos.length})` : ""}` }, { k: "email", l: emailJob ? `Correo — ${emailJob.titulo.slice(0, 18)}…` : "Correo" }, { k: "semblanza", l: "Semblanzas" }].map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} style={{ fontSize: 13, padding: "10px 18px", background: "transparent", border: "none", borderBottom: tab === t.k ? `2px solid ${mc}` : "2px solid transparent", color: tab === t.k ? "#1c1917" : "#a8a29e", fontWeight: tab === t.k ? 700 : 400, cursor: "pointer", borderRadius: 0, fontFamily: F }}>{t.l}</button>
            ))}
          </div>
        )}

        {/* Resultados */}
        {tab === "busqueda" && trabajos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {trabajos.map((job, i) => {
              const ms = matchStyle(job.match);
              const ts = tipoStyle[job.tipo] || tipoStyle.proyecto;
              const open = expandido === i;
              return (
                <div key={i} className={`card${open ? " open" : ""}`}>
                  <div style={{ height: 3, borderRadius: "14px 14px 0 0", background: job.match >= 80 ? "#10b981" : job.match >= 60 ? "#f59e0b" : "#d1d5db" }} />
                  <div style={{ padding: "1.1rem 1.4rem", cursor: "pointer" }} onClick={() => setExpandido(open ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: serif, fontSize: 16, color: "#1c1917", marginBottom: 4, lineHeight: 1.3 }}>{job.titulo}</div>
                        <div style={{ fontSize: 12.5, color: "#78716c" }}>
                          {job.empresa}{job.ubicacion ? ` · ${job.ubicacion}` : ""}{job.pais ? <span style={{ marginLeft: 5 }}>{flag(job.pais)}</span> : null}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                        {job.match && <span className="tag" style={{ background: ms.bg, color: ms.c, fontWeight: 700 }}>{job.match}% match</span>}
                        <div style={{ display: "flex", gap: 4 }}>
                          {job.tipo && <span className="tag" style={{ background: ts.bg, color: ts.c }}>{job.tipo}</span>}
                          {job.urgencia === "alta" && <span className="tag" style={{ background: "#fee2e2", color: "#991b1b" }}>urgente</span>}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 13.5, color: "#57534e", lineHeight: 1.65, margin: 0 }}>{job.descripcion}</p>
                    {job.salario && (
                      <div style={{ marginTop: 8, display: "inline-block" }}>
                        <span style={{ fontSize: 12, color: "#065f46", fontWeight: 600, background: "#d1fae5", padding: "2px 9px", borderRadius: 20 }}>💰 {job.salario}</span>
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: "#a8a29e", marginTop: 8, cursor: "pointer" }}>{open ? "▲ ocultar detalle" : "▼ ver detalle completo"}</div>
                  </div>

                  {open && (
                    <div style={{ borderTop: "1px solid #f5f4f1", padding: "1.1rem 1.4rem 1.4rem" }}>
                      {job.porQueAplicar && (
                        <div style={{ background: "#fafaf9", border: "1px solid #e7e5e4", borderLeft: `3px solid ${mc}`, borderRadius: "0 8px 8px 0", padding: "12px 16px", marginBottom: 14 }}>
                          <div style={{ fontSize: 10, color: mc, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 5 }}>Por qué es una buena oportunidad</div>
                          <p style={{ fontSize: 13, color: "#57534e", margin: 0, lineHeight: 1.6 }}>{job.porQueAplicar}</p>
                        </div>
                      )}
                      {job.contacto && (
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, color: "#a8a29e", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Contacto / Cómo aplicar</div>
                          <div style={{ fontSize: 13, color: "#1c1917", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14 }}>📬</span>
                            {job.contacto.includes("@") ? (
                              <a href={"mailto:" + job.contacto} style={{ color: "#1e40af", fontWeight: 600, textDecoration: "none" }}>{job.contacto}</a>
                            ) : (
                              <span>{job.contacto}</span>
                            )}
                          </div>
                        </div>
                      )}
                      {job.skills && job.skills.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 10, color: "#a8a29e", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>Habilidades que buscan</div>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {job.skills.map((s, si) => <span key={si} className="tag" style={{ background: "#f5f4f1", color: "#44403c", border: "1px solid #e7e5e4" }}>{s}</span>)}
                          </div>
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #f5f4f1" }}>
                        <span style={{ fontSize: 12, color: "#a8a29e" }}>{job.portal}</span>
                        {job.fechaPublicacion && <span style={{ fontSize: 12, color: "#a8a29e" }}>{job.fechaPublicacion}</span>}
                        {job.salario && (
                          <span style={{ fontSize: 13, color: "#065f46", fontWeight: 700, background: "#d1fae5", padding: "3px 10px", borderRadius: 20 }}>
                            💰 {job.salario}
                          </span>
                        )}
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          {job.url && <a href={job.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: mc, fontWeight: 600, textDecoration: "none" }}>Ver oferta ↗</a>}
                          <button onClick={() => redactarEmail(job)} style={{ fontSize: 13, padding: "8px 18px", background: mc, color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontFamily: F }}>Redactar correo →</button>
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
            {!emailJob && <div className="card" style={{ padding: "3.5rem", textAlign: "center" }}><div style={{ fontSize: 36, marginBottom: 12 }}>✉</div><p style={{ color: "#a8a29e", fontSize: 14 }}>Expande una oferta y haz clic en "Redactar correo".</p></div>}
            {emailCargando && <p style={{ fontSize: 14, color: "#78716c", padding: "1rem 0" }}>Redactando para <strong>{emailJob?.titulo}</strong>…</p>}
            {emailTxt && !emailCargando && (
              <div className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <div><div style={{ fontFamily: serif, fontSize: 17 }}>{emailJob?.titulo}</div><div style={{ fontSize: 13, color: "#a8a29e" }}>{emailJob?.empresa}</div></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn" onClick={() => copiar(emailTxt, "e")}>{copiado === "e" ? "✓ Copiado" : "Copiar"}</button>
                    <button className="btn" onClick={() => setTab("busqueda")}>← Volver</button>
                  </div>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.8, color: "#57534e", margin: 0, background: "#fafaf9", borderRadius: 10, padding: "1.25rem", border: "1px solid #e7e5e4", fontFamily: F }}>{emailTxt}</pre>
              </div>
            )}
          </div>
        )}

        {/* Semblanzas */}
        {tab === "semblanza" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
              {Object.entries(SEMBLANZAS).map(([k, s]) => <button key={k} className="btn" onClick={() => setSemActiva(k)} style={{ fontWeight: semActiva === k ? 700 : 400, borderColor: semActiva === k ? "#a8a29e" : "#e7e5e4" }}>{s.label}</button>)}
            </div>
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
                <button className="btn" onClick={() => copiar(SEMBLANZAS[semActiva].texto, "s")}>{copiado === "s" ? "✓ Copiado" : "Copiar texto"}</button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.8, color: "#57534e", margin: 0, fontFamily: F }}>{SEMBLANZAS[semActiva].texto}</pre>
            </div>
          </div>
        )}

        {/* Empty */}
        {!cargando && trabajos.length === 0 && tab === "busqueda" && logs.length === 0 && (
          <div className="card" style={{ padding: "5rem 2rem", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 18 }}>🎬</div>
            <h2 style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, marginBottom: 12, color: "#1c1917" }}>Agente listo</h2>
            <p style={{ fontSize: 14, color: "#78716c", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>Elige el tipo de búsqueda y presiona buscar. El agente consulta portales nacionales e internacionales, filtra los proyectos que ya tienes activos y genera análisis detallados por oportunidad.</p>
          </div>
        )}
      </div>
    </div>
  );
}
