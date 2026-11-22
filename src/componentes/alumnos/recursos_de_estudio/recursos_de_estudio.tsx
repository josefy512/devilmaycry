import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  History,
  CheckCircle,
  Star,
  Download,
  Eye,
  ThumbsUp,
  Library,
  Key,
  Layers,
  ChevronRight
} from 'lucide-react';

type CategoriaRecurso = 'Todos' | 'Libros' | 'Articulos' | 'Herramientas' | 'Repositorios';

interface RecursoItem {
  id: string;
  categoria: Exclude<CategoriaRecurso, 'Todos'>;
  curso: string;
  edicion: string;
  area: string;
  portadaTitulo: string;
  titulo: string;
  autor: string;
  archivo: string;
  calificacion: string;
  votos: number;
  recomendado: boolean;
}

const TABS: Array<{ id: CategoriaRecurso; label: string; count: number }> = [
  { id: 'Todos', label: 'Todos los recursos', count: 48 },
  { id: 'Libros', label: 'Libros y Manuales', count: 24 },
  { id: 'Articulos', label: 'Artículos y Fuentes', count: 12 },
  { id: 'Herramientas', label: 'Herramientas y Software', count: 8 },
  { id: 'Repositorios', label: 'Repositorios Académicos', count: 4 }
];

const STATS = [
  { icon: Library, label: 'Libros indexados', value: '48 disponibles' },
  { icon: CheckCircle, label: 'Lecturas del sílabo', value: '100% cubiertas' },
  { icon: Key, label: 'Entornos y licencias', value: '3 activas' },
  { icon: Layers, label: 'Colecciones vigentes', value: '5 áreas' }
];

const RECURSOS: RecursoItem[] = [
  {
    id: 'rec-1',
    categoria: 'Libros',
    curso: 'Cálculo II',
    edicion: '7.ª Edición',
    area: 'Ciencias Básicas',
    portadaTitulo: 'Cálculo Multivariable y Vectorial',
    titulo: 'Cálculo de Varias Variables y Vectorial',
    autor: 'James Stewart · Cengage Learning',
    archivo: 'PDF (18.4 MB)',
    calificacion: '4.9',
    votos: 128,
    recomendado: true
  },
  {
    id: 'rec-2',
    categoria: 'Libros',
    curso: 'Resistencia de Materiales',
    edicion: '8.ª Edición',
    area: 'Estructuras',
    portadaTitulo: 'Mecánica de Materiales y Esfuerzos',
    titulo: 'Mecánica de Materiales y Tensión',
    autor: 'Ferdinand P. Beer, Johnston · McGraw-Hill',
    archivo: 'PDF Oficial (32.1 MB)',
    calificacion: '4.8',
    votos: 94,
    recomendado: true
  },
  {
    id: 'rec-3',
    categoria: 'Articulos',
    curso: 'Física II',
    edicion: 'Edición 2025',
    area: 'Ciencias Básicas',
    portadaTitulo: 'Guía de Electromagnetismo y Ondas',
    titulo: 'Apuntes y Ejercicios Resueltos de Electromagnetismo',
    autor: 'Departamento de Ciencias · Material de Cátedra',
    archivo: 'PDF (6.2 MB)',
    calificacion: '4.7',
    votos: 65,
    recomendado: true
  },
  {
    id: 'rec-4',
    categoria: 'Herramientas',
    curso: 'Bases de Datos',
    edicion: 'Guía Práctica',
    area: 'Sistemas y Gestión',
    portadaTitulo: 'Modelado Relacional y Consultas SQL',
    titulo: 'Manual de Diseño de Bases de Datos Relacionales',
    autor: 'Coordinación Académica · Guía Técnica',
    archivo: 'PDF (4.8 MB)',
    calificacion: '4.9',
    votos: 82,
    recomendado: false
  }
];

const RECS = [
  {
    initials: 'RV',
    name: 'Prof. Dr. Ramiro Valdivia',
    meta: 'Cálculo II · Grupo 04',
    quote: 'Revisar el capítulo 4 antes de la evaluación: Teorema de Green y aplicaciones de flujo vectorial.',
    action: 'Abrir capítulo de referencia (pp. 312-348)',
    icon: BookOpen
  },
  {
    initials: 'MC',
    name: 'Ing. Martha Córdova',
    meta: 'Resistencia de Materiales',
    quote: 'Tablas de esfuerzo cortante para la entrega obligatoria de laboratorio N.° 3. Revisar anexos.',
    action: 'Descargar tabla de esfuerzos (PDF)',
    icon: Download
  }
];

export default function RecursosEstudioView() {
  const [activeTab, setActiveTab] = useState<CategoriaRecurso>('Todos');
  const [onlyRecommended, setOnlyRecommended] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [guardados, setGuardados] = useState<string[]>([]);

  const toggleGuardado = (id: string) => {
    setGuardados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const recursosFiltrados = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return RECURSOS.filter((item) => {
      const cumpleTab = activeTab === 'Todos' || item.categoria === activeTab;
      const cumpleRec = !onlyRecommended || item.recomendado;
      const cumpleBusqueda =
        !q ||
        item.titulo.toLowerCase().includes(q) ||
        item.autor.toLowerCase().includes(q) ||
        item.curso.toLowerCase().includes(q);
      return cumpleTab && cumpleRec && cumpleBusqueda;
    });
  }, [activeTab, onlyRecommended, searchTerm]);

  return (
    <div className="space-y-5">
      {/* Encabezado del módulo y acciones */}
      <header className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Biblioteca y Recursos de Estudio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-3xl">
              Consulta libros, guías técnicas, artículos y material de apoyo vinculados a tus asignaturas vigentes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold rounded-md text-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Solicitar Material</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-md text-xs font-semibold transition-colors"
            >
              <History className="w-4 h-4 text-[#A8D5EE] shrink-0" />
              <span>Historial de Lectura</span>
            </button>
          </div>
        </div>

        {/* Indicadores numéricos sobrios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-[#0B1218] border border-slate-800 rounded-md p-3.5 flex items-center gap-3 min-w-0"
            >
              <div className="p-2.5 rounded-md bg-[#002B45] border border-[#0084C2]/30 text-[#A8D5EE] shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400 font-medium truncate">{label}</p>
                <p className="text-sm font-bold text-white truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Búsqueda y filtros */}
      <section className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          <div className="sm:col-span-2 lg:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por título, autor o asignatura..."
              className="w-full bg-[#111C26] border border-slate-800 rounded-md pl-9 pr-4 py-2 min-h-[40px] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
            />
          </div>

          <div className="lg:col-span-3">
            <select className="w-full bg-[#111C26] border border-slate-800 rounded-md px-3 py-2 min-h-[40px] text-xs text-slate-200 focus:outline-none focus:border-[#0084C2]">
              <option>Todos los cursos</option>
              <option>Cálculo II (MAT-204)</option>
              <option>Resistencia de Materiales (CIV-301)</option>
              <option>Física II (FIS-102)</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select className="w-full bg-[#111C26] border border-slate-800 rounded-md px-3 py-2 min-h-[40px] text-xs text-slate-200 focus:outline-none focus:border-[#0084C2]">
              <option>Ordenar por: Recientes</option>
              <option>Mejor valorados</option>
              <option>Título (A - Z)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Pestañas con scroll horizontal limpio en móvil */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 w-max sm:w-auto">
              {TABS.map((tab) => {
                const activo = activeTab === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 min-h-[36px] rounded-md text-xs font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${
                      activo
                        ? 'bg-[#002B45] text-white border border-[#0084C2]/60'
                        : 'bg-[#111C26] text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        activo ? 'bg-[#0084C2]/30 text-[#A8D5EE]' : 'bg-[#0B1218] text-slate-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#111C26] border border-slate-800 px-3 py-2 min-h-[36px] rounded-md self-start xl:self-auto">
            <input
              type="checkbox"
              checked={onlyRecommended}
              onChange={(e) => setOnlyRecommended(e.target.checked)}
              className="rounded border-slate-700 bg-[#0B1218] text-[#0084C2] focus:ring-0"
            />
            <Star className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Solo recomendados por docentes</span>
          </label>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Catálogo de recursos */}
        <section className="lg:col-span-8 space-y-3.5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#A8D5EE]" />
              <span>Catálogo de Material Académico</span>
              <span className="text-[11px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30">
                {recursosFiltrados.length} visibles
              </span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setActiveTab('Todos');
                setOnlyRecommended(false);
                setSearchTerm('');
              }}
              className="text-xs font-semibold text-[#A8D5EE] hover:underline flex items-center gap-1"
            >
              Ver todo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recursosFiltrados.length === 0 ? (
            <div className="rounded-lg bg-[#111C26] border border-slate-800 p-8 text-center text-xs text-slate-400">
              No se encontraron recursos con los filtros actuales.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recursosFiltrados.map((b) => {
                const esGuardado = guardados.includes(b.id);
                return (
                  <article
                    key={b.id}
                    className="bg-[#111C26] border border-slate-800 hover:border-slate-700 rounded-lg p-4 flex flex-col justify-between gap-4 transition-colors min-w-0"
                  >
                    <div className="space-y-3">
                      <div className="bg-[#0B1218] border border-slate-800 rounded-md p-4 text-center relative h-36 flex flex-col justify-center items-center">
                        <span className="absolute top-2.5 left-2.5 max-w-[60%] truncate text-[10px] font-semibold px-2 py-0.5 rounded bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30">
                          {b.curso}
                        </span>
                        <span className="absolute top-2.5 right-2.5 text-[10px] text-slate-400 font-mono">
                          {b.edicion}
                        </span>
                        <div className="space-y-1 pt-3">
                          <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                            {b.area}
                          </p>
                          <p className="text-sm font-bold text-white px-2 leading-snug">
                            {b.portadaTitulo}
                          </p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm line-clamp-2">{b.titulo}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 break-words">{b.autor}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-[#A8D5EE]" /> {b.archivo}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <Star className="w-3.5 h-3.5" /> {b.calificacion}{' '}
                          <span className="text-slate-500">({b.votos})</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex-1 min-h-[38px] py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Consultar material</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleGuardado(b.id)}
                          aria-label="Guardar recurso"
                          className={`min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md border transition-colors ${
                            esGuardado
                              ? 'bg-[#002B45] border-[#0084C2] text-[#A8D5EE]'
                              : 'bg-[#0B1218] hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700/80'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Sugerencias de docentes (sin animaciones llamativas) */}
        <aside className="lg:col-span-4 space-y-3.5 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ThumbsUp className="w-3.5 h-3.5 text-[#A8D5EE]" />
              <span>Sugerencias de Docentes</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
            {RECS.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.initials}
                  className="bg-[#111C26] border border-slate-800 rounded-lg p-4 space-y-3 min-w-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-xs text-[#A8D5EE] shrink-0">
                      {r.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs truncate">{r.name}</h4>
                      <p className="text-[11px] text-[#A8D5EE] truncate">{r.meta}</p>
                    </div>
                  </div>

                  <div className="bg-[#0B1218] p-3 rounded-md border border-slate-800 text-xs text-slate-300 break-words">
                    "{r.quote}"
                  </div>

                  <button
                    type="button"
                    className="w-full min-h-[36px] text-left text-xs font-semibold text-[#A8D5EE] hover:underline flex items-center gap-1.5"
                  >
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
  );
}