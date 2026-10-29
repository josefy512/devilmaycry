import React, { useState } from 'react';
import {
  BookOpen, Search, Bookmark, History, CloudCheck, Star, Download, Eye,
  ThumbsUp, CheckCircle, Library, Key, ChevronRight
} from 'lucide-react';
 
const TABS = [
  { id: 'Todos', label: 'Todos los recursos', count: 48 },
  { id: 'Libros', label: 'Libros y Manuales', count: 24 },
  { id: 'Articulos', label: 'Artículos y Fuentes', count: 12 },
  { id: 'Herramientas', label: 'Herramientas y Software', count: 8 },
  { id: 'Repositorios', label: 'Repositorios Carrera', count: 4 },
];
 
const STATS = [
  { icon: Library, label: 'Libros indexados', value: '48 disponibles', color: 'green' },
  { icon: CheckCircle, label: 'Lecturas del sílabo', value: '100% cubiertas', color: 'emerald' },
  { icon: Key, label: 'Entornos & licencias', value: '3 activas', color: 'amber' },
  { icon: CloudCheck, label: 'Sincronización', value: 'Al día (Cloud)', color: 'teal' },
];
 
// Clases completas (Tailwind no detecta clases construidas dinámicamente)
const STAT_COLORS = {
  green: 'bg-[#1DB954]/10 text-[#1ED760] border-[#1DB954]/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
};
 
const BOOKS = [
  {
    course: 'Cálculo II', edition: '7ª Edición', area: 'CIENCIAS BÁSICAS', cover: 'Multivariable & Álgebra',
    title: 'Cálculo de Varias Variables y Vectorial', author: 'James Stewart • Cengage Learning',
    file: 'PDF (18.4 MB)', rating: '4.9', votes: 128,
    bg: 'from-[#14532d] to-[#0A0A0A] border-[#1DB954]/25',
    chip: 'text-[#1ED760] bg-[#1DB954]/10 border-[#1DB954]/30', areaColor: 'text-neutral-400',
  },
  {
    course: 'Resistencia de Materiales', edition: '8ª Edición', area: 'ESTRUCTURAS', cover: 'Mecánica de Materiales',
    title: 'Mecánica de Materiales y Tensión', author: 'Ferdinand P. Beer, Johnston • McGraw-Hill',
    file: 'PDF Oficial (32.1 MB)', rating: '4.8', votes: 94,
    bg: 'from-[#331E0B] to-[#0A0A0A] border-amber-500/20',
    chip: 'text-amber-400 bg-amber-500/10 border-amber-500/20', areaColor: 'text-amber-400',
  },
];
 
const RECS = [
  {
    initials: 'RV', name: 'Prof. Dr. Ramiro Valdivia', meta: 'Cálculo II • Grupo 04',
    avatar: 'bg-[#1DB954]', metaColor: 'text-[#1ED760]', linkColor: 'text-[#1ED760]',
    quote: 'Revisar capítulo 4 antes del parcial del viernes: Teorema de Green y aplicaciones de flujo vectorial.',
    action: 'Abrir Stewart Cap. 4 (pp. 312-348)', icon: BookOpen,
  },
  {
    initials: 'MC', name: 'Ing. Martha Córdova', meta: 'Resistencia de Materiales',
    avatar: 'bg-amber-600', metaColor: 'text-amber-400', linkColor: 'text-amber-400',
    quote: 'Tablas de esfuerzo cortante para la entrega obligatoria de laboratorio N° 3. Ver apéndice B.',
    action: 'Descargar Anexo Esfuerzos (PDF)', icon: Download,
  },
];
 
export default function RecursosEstudioView() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [onlyRecommended, setOnlyRecommended] = useState(true);
 
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] text-neutral-100 font-sans">
      <div className="mx-auto w-full max-w-screen-2xl p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-6">
 
        {/* 1. Header & métricas */}
        <header className="bg-[#181818] border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-400 mb-2">
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Inicio</span>
                <span>/</span>
                <span className="text-neutral-100 font-medium">Recursos de estudio</span>
                <span className="px-2.5 py-0.5 bg-[#1DB954]/10 text-[#1ED760] border border-[#1DB954]/30 rounded-full font-semibold text-[10px] sm:text-xs">
                  CATÁLOGO ACADÉMICO 2026-II
                </span>
              </div>
 
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Recursos de Estudio</h1>
                <span className="text-xs text-neutral-500 font-mono bg-neutral-800 px-2 py-0.5 rounded">v4.8 • FAC-ING</span>
              </div>
 
              <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
                Accede a la biblioteca digital, manuales técnicos, software recomendado y material complementario seleccionado para tus asignaturas activas de este ciclo.
              </p>
            </div>
 
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch gap-3 w-full lg:w-auto shrink-0">
              <button className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] bg-[#1DB954] hover:bg-[#1ED760] text-black font-medium rounded-full text-xs transition-all shadow-lg shadow-[#1DB954]/20">
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Solicitar Material / Préstamo Digital</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 min-h-[44px] bg-[#242424] hover:bg-[#2E2E2E] border border-neutral-700/60 text-neutral-200 rounded-full text-xs font-medium transition-colors">
                <History className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Mi Historial de Lectura</span>
              </button>
            </div>
          </div>
 
          {/* Estadísticas: 1 col en móviles muy pequeños, 2 en móvil/tablet, 4 en desktop */}
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STATS.map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-[#0A0A0A] border border-neutral-800/80 rounded-xl p-3 sm:p-4 flex items-center gap-3 min-w-0">
                <div className={`p-2.5 sm:p-3 rounded-lg border shrink-0 ${STAT_COLORS[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-neutral-400 font-medium truncate">{label}</p>
                  <p className="text-sm sm:text-base font-bold text-white truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </header>
 
        {/* 2. Búsqueda y filtros */}
        <section className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="sm:col-span-2 lg:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -tranneutral-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Buscar por título, autor, materia o palabra clave..."
                className="w-full bg-[#181818] border border-neutral-800 rounded-full pl-9 pr-4 py-3 sm:py-2.5 min-h-[44px] text-sm sm:text-xs text-neutral-200 focus:outline-none focus:border-[#1DB954]"
              />
            </div>
 
            <div className="lg:col-span-3">
              <select className="w-full bg-[#181818] border border-neutral-800 rounded-xl px-3 py-3 sm:py-2.5 min-h-[44px] text-sm sm:text-xs text-neutral-300 focus:outline-none focus:border-[#1DB954]">
                <option>Todos los cursos (5 activos)</option>
                <option>Cálculo II (MAT-204)</option>
                <option>Resistencia de Materiales (CIV-301)</option>
                <option>Física II (FIS-102)</option>
              </select>
            </div>
 
            <div className="lg:col-span-3">
              <select className="w-full bg-[#181818] border border-neutral-800 rounded-xl px-3 py-3 sm:py-2.5 min-h-[44px] text-sm sm:text-xs text-neutral-300 focus:outline-none focus:border-[#1DB954]">
                <option>Más recientes</option>
                <option>Mejor valorados</option>
                <option>Más prestados</option>
              </select>
            </div>
          </div>
 
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
            {/* Pestañas: scroll horizontal en móvil, wrap en pantallas grandes */}
            <div className="-mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-nowrap sm:flex-wrap items-center gap-2 w-max sm:w-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 min-h-[40px] rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[#1DB954] text-black shadow'
                        : 'bg-[#181818] text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
 
            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none bg-[#181818] border border-neutral-800 px-3 py-2.5 min-h-[40px] rounded-xl self-start xl:self-auto">
              <input
                type="checkbox"
                checked={onlyRecommended}
                onChange={(e) => setOnlyRecommended(e.target.checked)}
                className="rounded bg-[#0A0A0A] border-neutral-800 text-[#1DB954] focus:ring-0"
              />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span>Solo recomendados por docentes</span>
            </label>
          </div>
        </section>
 
        {/* 3. Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
 
          {/* Libros */}
          <section className="lg:col-span-8 space-y-4 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1ED760]" />
                <span>Libros y Manuales Técnicos</span>
                <span className="text-xs font-normal text-[#1ED760] bg-[#1DB954]/10 px-2 py-0.5 rounded border border-[#1DB954]/30">
                  4 destacados
                </span>
              </h3>
              <button className="text-xs text-[#1ED760] hover:underline flex items-center gap-1 py-2">
                Ver los 24 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BOOKS.map((b) => (
                <article key={b.title} className="bg-[#181818] border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex flex-col justify-between gap-4 transition-all min-w-0">
                  <div className="space-y-3">
                    <div className={`bg-gradient-to-br ${b.bg} border rounded-xl p-4 text-center relative overflow-hidden h-36 sm:h-40 flex flex-col justify-center items-center`}>
                      <span className={`absolute top-2 left-2 max-w-[60%] truncate text-[10px] font-bold px-2 py-0.5 rounded border ${b.chip}`}>
                        {b.course}
                      </span>
                      <span className="absolute top-2 right-2 text-[10px] text-neutral-400 font-mono">{b.edition}</span>
                      <div className="space-y-1 pt-4">
                        <p className={`text-[10px] uppercase font-bold tracking-wider ${b.areaColor}`}>{b.area}</p>
                        <p className="text-sm font-black text-white px-2 leading-snug">{b.cover}</p>
                      </div>
                    </div>
 
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm line-clamp-2">{b.title}</h4>
                      <p className="text-xs text-neutral-400 mt-0.5 break-words">{b.author}</p>
                    </div>
                  </div>
 
                  <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-rose-400" /> {b.file}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3 h-3 fill-amber-400" /> {b.rating} <span className="text-neutral-500">({b.votes})</span>
                      </span>
                    </div>
 
                    <div className="flex items-center gap-2">
                      <button className="flex-1 min-h-[44px] py-2 bg-[#1DB954] hover:bg-[#1ED760] text-black rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-[#1DB954]/20">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Leer online</span>
                      </button>
                      <button aria-label="Guardar" className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-[#242424] hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl border border-neutral-700/60 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
 
          {/* Recomendaciones: 2 columnas en tablet, 1 en desktop (sidebar) */}
          <aside className="lg:col-span-4 space-y-4 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>RECOMENDADO ESTA SEMANA</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
              {RECS.map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.initials} className="bg-[#181818] border border-neutral-800 rounded-2xl p-4 space-y-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${r.avatar} flex items-center justify-center font-bold text-xs text-black shrink-0`}>
                        {r.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">{r.name}</h4>
                        <p className={`text-[10px] truncate ${r.metaColor}`}>{r.meta}</p>
                      </div>
                    </div>
 
                    <div className="bg-[#0A0A0A] p-3 rounded-xl border border-neutral-800/80 text-xs italic text-neutral-300 break-words">
                      "{r.quote}"
                    </div>
 
                    <button className={`w-full min-h-[40px] text-left text-xs font-semibold hover:underline flex items-center gap-1.5 ${r.linkColor}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{r.action}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
 