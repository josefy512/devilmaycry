import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Search,
  Clock,
  CheckCircle2,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  User,
  Loader2,
  AlertTriangle,
  Upload
} from 'lucide-react';

interface CursoItem {
  id: string | number;
  codigo: string;
  nombre: string;
  profesor: string;
  creditos: number;
  silaboUrl: string | null;
  ubicacion: string;
  horario: string;
  grupo: string;
  avance: number;
}

interface TareaItem {
  id: string;
  codigoCurso: string;
  nombreCurso: string;
  titulo: string;
  vencimiento: string;
  modalidad: string;
  ponderacion: string;
  docente: string;
  instrucciones: string[];
}

const TAREAS_ACTIVAS: TareaItem[] = [
  {
    id: 't-1',
    codigoCurso: 'INV-401',
    nombreCurso: 'Proyecto de Investigación e Innovación Tecnológica',
    titulo: 'Taller N° 4: Avance de Documentación y Matriz Metodológica',
    vencimiento: 'Mañana, 23:59 hrs',
    modalidad: 'Informe Grupal',
    ponderacion: '15%',
    docente: 'Prof. Adolfo Ventocilla Flores',
    instrucciones: [
      'Presentar el documento en formato PDF siguiendo los lineamientos explicados en clase.',
      'Verificar que las tablas, esquemas o enlaces de referencia estén legibles y completos.'
    ]
  },
  {
    id: 't-2',
    codigoCurso: 'SEM-502',
    nombreCurso: 'Seminario de Tesis',
    titulo: 'Entrega de Estado del Arte',
    vencimiento: 'En 4 días',
    modalidad: 'Individual',
    ponderacion: '10%',
    docente: 'Docente de Seminario',
    instrucciones: [
      'Consolidar al menos 6 fuentes académicas relevantes con resumen crítico.',
      'Subir el archivo en formato PDF dentro del plazo establecido.'
    ]
  }
];

export default function MisCursosYEntregables() {
  const [activeMainTab, setActiveMainTab] = useState<'cursos' | 'tareas'>('cursos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cursos, setCursos] = useState<CursoItem[]>([]);
  const [loadingCursos, setLoadingCursos] = useState<boolean>(true);
  const [tareaSeleccionadaId, setTareaSeleccionadaId] = useState<string>('t-1');
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCursosAlumno() {
      try {
        setLoadingCursos(true);
        const { data, error } = await supabase
          .from('cursos')
          .select('*');

        if (error) {
          console.error('Error al cargar cursos:', error);
        } else if (data) {
          const cursosMapeados: CursoItem[] = data.map((c: Record<string, unknown>) => ({
            id: (c.id as string | number) ?? Math.random().toString(36).slice(2),
            codigo: (c.codigo as string) || 'INV-401',
            nombre: (c.nombre_curso as string) || (c.nombre as string) || 'Curso sin nombre',
            profesor: (c.profesor as string) || 'Docente asignado',
            creditos: (c.creditos as number) || 4,
            silaboUrl: (c.silabo_url as string) || null,
            ubicacion: 'Aula 302 · Pabellón Académico',
            horario: 'Lun y Mié 10:00 – 12:00 PM',
            grupo: 'Grupo 1A · Turno Mañana',
            avance: c.silabo_url ? 100 : 0
          }));
          setCursos(cursosMapeados);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      } finally {
        setLoadingCursos(false);
      }
    }

    fetchCursosAlumno();
  }, []);

  const cursosFiltrados = cursos.filter((c) =>
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.profesor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tareaActiva =
    TAREAS_ACTIVAS.find((t) => t.id === tareaSeleccionadaId) || TAREAS_ACTIVAS[0];

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoNombre(file.name);
    }
  };

  return (
    <div className="space-y-5">
      {/* Cabecera del módulo y selector de pestañas */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Cursos, Sílabos y Entregables
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Consulta asignaturas matriculadas, descarga sílabos oficiales y gestiona tus entregas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-[#0B1218] p-1 rounded-md border border-slate-800 self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setActiveMainTab('cursos')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeMainTab === 'cursos'
                ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#A8D5EE]" />
            <span>Mis Cursos y Sílabos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('tareas')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeMainTab === 'tareas'
                ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#A8D5EE]" />
            <span>Tareas y Entregables ({TAREAS_ACTIVAS.length})</span>
          </button>
        </div>
      </div>

      {/* VISTA 1: MIS CURSOS Y SÍLABOS */}
      {activeMainTab === 'cursos' && (
        <div className="space-y-4">
          <div className="rounded-lg bg-[#111C26] border border-slate-800 p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Filtrar por curso, código o docente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0084C2] focus:outline-none transition-colors"
              />
            </div>

            <span className="text-xs text-slate-400 font-medium">
              {cursosFiltrados.length} asignatura(s) disponible(s)
            </span>
          </div>

          {loadingCursos ? (
            <div className="rounded-lg bg-[#111C26] border border-slate-800 flex flex-col items-center justify-center py-16 text-slate-400 gap-2.5">
              <Loader2 className="w-6 h-6 animate-spin text-[#0084C2]" />
              <p className="text-xs font-medium">Cargando asignaturas oficiales...</p>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="rounded-lg bg-[#111C26] border border-slate-800 p-8 text-center text-slate-400 text-xs">
              No se encontraron cursos con el criterio ingresado.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cursosFiltrados.map((curso) => (
                <div
                  key={curso.id}
                  className="rounded-lg bg-[#111C26] border border-slate-800 hover:border-slate-700 p-5 space-y-4 transition-colors"
                >
                  <div className="border-b border-slate-800 pb-3 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[10px] font-mono font-bold rounded">
                        {curso.codigo}
                      </span>
                      <span className="px-2 py-0.5 bg-[#0B1218] text-slate-300 border border-slate-700/80 text-[10px] font-semibold rounded">
                        {curso.grupo}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {curso.nombre}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0B1218] border border-slate-800/90 rounded-md text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-[#002B45] text-[#A8D5EE] rounded shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Docente</p>
                        <p className="font-semibold text-slate-100 truncate">{curso.profesor}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-[#002B45] text-[#A8D5EE] rounded shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase font-semibold">Horario</p>
                        <p className="font-semibold text-slate-100 truncate">{curso.horario}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FileText className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>Sílabo del curso:</span>
                    </div>

                    {curso.silaboUrl ? (
                      <a
                        href={curso.silaboUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold text-xs rounded-md transition-colors shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Ver / Descargar PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="px-3 py-1 bg-[#0B1218] border border-slate-800 text-slate-500 text-xs font-medium rounded">
                        Publicación pendiente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: TAREAS Y ENTREGABLES */}
      {activeMainTab === 'tareas' && (
        <div className="space-y-5">
          {/* Indicadores numéricos sobrios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-amber-400 p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Tareas Pendientes</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{TAREAS_ACTIVAS.length}</span>
                <span className="text-[11px] font-semibold text-amber-300">Por entregar</span>
              </div>
            </div>

            <div className="rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-emerald-500 p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Entregadas a Tiempo</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">14</span>
                <span className="text-xs font-semibold text-emerald-300">Registradas</span>
              </div>
            </div>

            <div className="rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-[#0084C2] p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Evaluaciones Calificadas</span>
                <span className="text-xs font-semibold text-[#A8D5EE]">Prom: 17.8</span>
              </div>
              <div className="mt-2.5 text-2xl font-extrabold text-white">12</div>
            </div>

            <div className="rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-rose-500 p-4">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Próximo Vencimiento</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="mt-2">
                <p className="text-sm font-bold text-rose-300">{tareaActiva.vencimiento}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{tareaActiva.codigoCurso}</p>
              </div>
            </div>
          </div>

          {/* Lista de tareas y detalle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-3">
              {TAREAS_ACTIVAS.map((tarea) => {
                const seleccionada = tarea.id === tareaActiva.id;
                return (
                  <button
                    type="button"
                    key={tarea.id}
                    onClick={() => {
                      setTareaSeleccionadaId(tarea.id);
                      setArchivoNombre(null);
                    }}
                    className={`w-full text-left rounded-lg p-4 space-y-2.5 transition-colors border ${
                      seleccionada
                        ? 'bg-[#111C26] border-[#0084C2] border-l-4 border-l-[#0084C2]'
                        : 'bg-[#111C26] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#A8D5EE] truncate">
                        {tarea.codigoCurso} · {tarea.modalidad}
                      </span>
                      <span className="px-2 py-0.5 bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded text-[10px] font-semibold shrink-0">
                        {tarea.vencimiento}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm leading-snug">
                      {tarea.titulo}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                      <span className="truncate">{tarea.docente}</span>
                      <span className="text-slate-200 font-semibold shrink-0">
                        Peso: {tarea.ponderacion}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detalle de la tarea seleccionada */}
            <div className="lg:col-span-7 rounded-lg bg-[#111C26] border border-slate-800 p-5 sm:p-6 space-y-4">
              <div className="space-y-1.5 border-b border-slate-800 pb-4">
                <span className="inline-block px-2.5 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[11px] font-semibold rounded">
                  {tareaActiva.codigoCurso} · {tareaActiva.nombreCurso}
                </span>
                <h3 className="text-lg font-bold text-white pt-1">
                  {tareaActiva.titulo}
                </h3>
                <p className="text-xs text-slate-400">
                  {tareaActiva.docente} · Vence: {tareaActiva.vencimiento}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Indicaciones de Entrega
                </p>
                <div className="bg-[#0B1218] border border-slate-800 p-4 rounded-md space-y-2">
                  {tareaActiva.instrucciones.map((inst, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {idx + 1}. {inst}
                    </p>
                  ))}
                </div>
              </div>

              {archivoNombre && (
                <div className="rounded-md bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs text-emerald-300 font-medium">
                  Archivo seleccionado: {archivoNombre}
                </div>
              )}

              <div className="pt-1">
                <label className="w-full cursor-pointer py-2.5 px-4 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Seleccionar y Subir Entrega (PDF)</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleArchivoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}