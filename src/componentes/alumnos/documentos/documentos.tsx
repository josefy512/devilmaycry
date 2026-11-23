import React, { useState, useEffect, useMemo } from 'react';
import FutPage from './FUT/fut';
import { supabase } from '../../supabaseClient';
import {
  Search,
  Upload,
  Plus,
  FileText,
  Download,
  Eye,
  Award,
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet,
  BookOpen,
  Calendar,
  X,
  ExternalLink,
  Loader2
} from 'lucide-react';

interface SilaboItem {
  id: string;
  curso: string;
  codigo: string;
  docente: string;
  creditos: string;
  tamano: string;
  actualizado: string;
  silaboUrl: string | null;
}

export default function DocumentosView() {
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Academicos' | 'Tramites' | 'Reglamentos'>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFutModal, setShowFutModal] = useState<boolean>(false);

  const [silabosDinamicos, setSilabosDinamicos] = useState<SilaboItem[]>([]);
  const [loadingSilabos, setLoadingSilabos] = useState<boolean>(true);

  const abrirFut = () => {
    window.history.pushState({ futModal: true }, '');
    setShowFutModal(true);
  };

  const cerrarFut = () => {
    if (window.history.state && window.history.state.futModal) {
      window.history.back();
    } else {
      setShowFutModal(false);
    }
  };

  useEffect(() => {
    if (!showFutModal) return;

    const onPopState = () => setShowFutModal(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrarFut();
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onKeyDown);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflowPrevio;
    };
  }, [showFutModal]);

  useEffect(() => {
    async function fetchSilabosSupabase() {
      try {
        setLoadingSilabos(true);
        const { data, error } = await supabase.from('cursos').select('*');

        if (error) {
          console.error('Error al obtener sílabos:', error);
        } else if (data) {
          const mapeados: SilaboItem[] = data.map((c: Record<string, unknown>, index: number) => ({
            id: (c.id as string) || String(index + 1),
            curso: (c.nombre_curso as string) || (c.nombre as string) || 'Curso sin nombre',
            codigo: (c.codigo as string) || 'INV-401',
            docente: (c.profesor as string) || 'Docente asignado',
            creditos: `${c.creditos || 4} Créditos`,
            tamano: 'PDF Oficial',
            actualizado: 'Ciclo 2026-II',
            silaboUrl: (c.silabo_url as string) || null
          }));
          setSilabosDinamicos(mapeados);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      } finally {
        setLoadingSilabos(false);
      }
    }

    fetchSilabosSupabase();
  }, []);

  const silabosFiltrados = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return silabosDinamicos;
    return silabosDinamicos.filter(
      (s) =>
        s.curso.toLowerCase().includes(q) ||
        s.codigo.toLowerCase().includes(q) ||
        s.docente.toLowerCase().includes(q)
    );
  }, [silabosDinamicos, searchTerm]);

  const categorias: Array<{ id: 'Todos' | 'Academicos' | 'Tramites' | 'Reglamentos'; label: string }> = [
    { id: 'Todos', label: 'Todos' },
    { id: 'Academicos', label: 'Académicos' },
    { id: 'Tramites', label: 'Trámites' },
    { id: 'Reglamentos', label: 'Reglamentos' }
  ];

  const mostrarAcademicos = activeCategory === 'Todos' || activeCategory === 'Academicos';
  const mostrarTramites = activeCategory === 'Todos' || activeCategory === 'Tramites';
  const mostrarReglamentos = activeCategory === 'Todos' || activeCategory === 'Reglamentos';

  return (
    <div className="space-y-5 text-slate-200">
      {/* Encabezado del módulo y acciones */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Documentos y Constancias
            </h2>
            <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded text-[11px] font-semibold">
              Periodo 2026-II
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Consulta fichas de matrícula, sílabos oficiales, récord académico, reglamentos y formatos de trámite.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1218] border border-slate-700/80 hover:border-slate-600 rounded-md text-xs font-semibold text-slate-200 transition-colors"
          >
            <Upload className="w-4 h-4 text-[#A8D5EE]" />
            <span>Adjuntar documento</span>
          </button>
          <button
            type="button"
            onClick={abrirFut}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Solicitar trámite (FUT)</span>
          </button>
        </div>
      </div>

      {/* Buscador y filtros */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar curso, código o docente..."
            className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
          />
        </div>

        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1.5 bg-[#0B1218] p-1 rounded-md border border-slate-800 w-max">
            {categorias.map((cat) => {
              const activa = activeCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                    activa
                      ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ficha de matrícula */}
      {mostrarAcademicos && (
        <div className="bg-[#111C26] border border-slate-800 border-l-4 border-l-[#0084C2] rounded-lg p-4 sm:p-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="p-2.5 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Ficha y Constancia de Matrícula
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Registrada
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Periodo Lectivo 2026-II · Constancia con código de verificación institucional.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2.5 text-xs">
                  <div className="min-w-0">
                    <p className="text-slate-500 font-medium">Estudiante</p>
                    <p className="text-slate-200 font-semibold mt-0.5 truncate">
                      Estudiante Registrado <span className="text-slate-400 font-normal">(202110482)</span>
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 font-medium">Programa de Estudios</p>
                    <p className="text-slate-200 font-semibold mt-0.5 truncate">Ingeniería de Software</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 font-medium">Carga Académica</p>
                    <p className="text-[#A8D5EE] font-semibold mt-0.5">22 Créditos (5 cursos)</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 font-medium">Fecha de Registro</p>
                    <p className="text-slate-200 font-semibold mt-0.5">14 Ago, 2026 · 09:42</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 shrink-0">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 rounded-md text-xs font-semibold text-slate-200 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#A8D5EE]" />
                <span>Vista previa</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sílabos + Formulario FUT */}
      {(mostrarAcademicos || mostrarTramites) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {mostrarAcademicos && (
            <div className={`${mostrarTramites ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-3.5 min-w-0`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sílabos de Asignaturas
                </h3>
                <span className="text-xs text-slate-400 bg-[#111C26] px-2.5 py-1 rounded border border-slate-800">
                  {silabosFiltrados.length} curso(s)
                </span>
              </div>

              {loadingSilabos ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-[#111C26] border border-slate-800 rounded-lg gap-2.5 text-slate-400 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[#0084C2]" />
                  <p className="text-xs font-medium">Cargando sílabos desde el servidor...</p>
                </div>
              ) : silabosFiltrados.length === 0 ? (
                <div className="p-8 bg-[#111C26] border border-slate-800 rounded-lg text-center text-xs text-slate-400">
                  No se encontraron sílabos con el filtro actual.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {silabosFiltrados.map((item) => (
                    <div
                      key={item.id}
                      className="min-w-0 bg-[#111C26] border border-slate-800 hover:border-slate-700 rounded-lg p-4 space-y-3 flex flex-col justify-between transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="w-8 h-8 shrink-0 rounded bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center text-[#A8D5EE]">
                            <FileText className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30 whitespace-nowrap">
                            {item.creditos}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-sm break-words">{item.curso}</h4>
                          <p className="text-xs text-slate-400 mt-0.5 break-words">
                            {item.codigo} · {item.docente}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-2.5 border-t border-slate-800">
                        <p className="text-[11px] text-slate-500">
                          {item.actualizado} · {item.tamano}
                        </p>

                        {item.silaboUrl ? (
                          <a
                            href={item.silaboUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">Descargar Sílabo (PDF)</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <div className="w-full py-2 px-3 bg-[#0B1218] border border-slate-800 text-slate-500 rounded-md text-xs font-medium text-center">
                            Publicación pendiente del docente
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {mostrarTramites && (
            <div className={`${mostrarAcademicos ? 'lg:col-span-4' : 'lg:col-span-12'} space-y-3.5 min-w-0`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Formularios y Trámites
              </h3>

              <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-9 h-9 shrink-0 rounded bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center text-[#A8D5EE]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30 whitespace-nowrap">
                    Formato 2026
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm">
                    FUT — Formulario Único de Trámite
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Solicitud de constancias, convalidaciones, rectificación de matrícula y certificados.
                  </p>
                </div>

                <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 text-xs text-slate-300 space-y-1.5">
                  <p className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider">
                    Características
                  </p>
                  <ul className="space-y-1 text-slate-400">
                    <li>· Registro en línea con comprobante de seguimiento.</li>
                    <li>· Datos del estudiante precargados en el formulario.</li>
                    <li>· Atención directa por mesa de partes / secretaría.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={abrirFut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold rounded-md transition-colors text-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Completar FUT Digital</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Récord Académico y Reglamentos */}
      {(mostrarAcademicos || mostrarReglamentos) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1">
          {mostrarAcademicos && (
            <div className="space-y-3 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Historial y Récord de Notas
                </h3>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#A8D5EE] hover:underline flex items-center gap-1"
                >
                  <span>Ver detalle</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 shrink-0 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        Récord Académico Consolidado
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Promedio ponderado: <strong className="text-white">16.8 / 20.0</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 px-3 py-1.5 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-md text-xs font-semibold transition-colors"
                  >
                    Descargar
                  </button>
                </div>

                <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 shrink-0 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE]">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        Boleta de Notas — Ciclo 2026-I
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        24 créditos culminados · Periodo anterior
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="shrink-0 px-3 py-1.5 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-md text-xs font-semibold transition-colors"
                  >
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          )}

          {mostrarReglamentos && (
            <div className="space-y-3 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Normativa y Reglamentos
                </h3>
                <span className="text-xs text-slate-500">Vigente</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 shrink-0 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        Reglamento del Estudiante 2026
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        Normas de evaluación, asistencia y convivencia
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 bg-[#0B1218] border border-slate-800 text-slate-300 rounded text-xs font-mono">
                    PDF
                  </span>
                </div>

                <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 shrink-0 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-xs sm:text-sm truncate">
                        Cronograma Académico Institucional 2026
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        Fechas de matrículas, evaluaciones y cierres de acta
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 px-2.5 py-1 bg-[#0B1218] border border-slate-800 text-slate-300 rounded text-xs font-mono">
                    PDF
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal FUT Digital */}
      {showFutModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) cerrarFut();
          }}
        >
          <div
            className="min-h-full flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) cerrarFut();
            }}
          >
            <div className="relative w-full max-w-4xl bg-[#0F1923] border border-slate-700 rounded-t-lg sm:rounded-lg overflow-x-hidden">
              <button
                type="button"
                onClick={cerrarFut}
                className="absolute top-3 right-3 z-10 p-1.5 bg-[#0B1218] hover:bg-slate-800 text-slate-300 hover:text-white rounded-md transition-colors border border-slate-700"
                title="Cerrar formulario"
                aria-label="Cerrar formulario"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="p-3 sm:p-5 w-full max-w-full">
                <FutPage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}