import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Search,
  Clock,
  CheckCircle2,
  BookOpen,
  FileText,
  ExternalLink,
  AlertTriangle,
  Upload,
  Loader2
} from 'lucide-react';

const TAREAS_EJEMPLO = [
  {
    id: 1,
    codigo: 'INV-401',
    curso: 'Proyecto de Investigación e Innovación Tecnológica',
    cursoCorto: 'Proyecto de Investigación (INV-401)',
    venceBadge: 'Vence en 26h',
    urgencia: 'alta',
    titulo: 'Taller N° 4: Avance de Documentación y Matriz Metodológica',
    modalidad: 'Informe Grupal',
    ponderacion: 'Ponderación: 15%',
    docente: 'Prof. Adolfo Ventocilla Flores',
    instrucciones: [
      'Presentar el documento en formato PDF siguiendo los lineamientos explicados en clase.',
      'Asegurar que el enlace del repositorio o la base de datos en Supabase esté accesible.'
    ]
  },
  {
    id: 2,
    codigo: 'SEM-502',
    curso: 'Seminario de Tesis',
    cursoCorto: 'Seminario de Tesis (SEM-502)',
    venceBadge: 'Vence en 4 días',
    urgencia: 'media',
    titulo: 'Entrega de Estado del Arte',
    modalidad: 'Individual',
    ponderacion: 'Pendiente',
    docente: 'Docente Asignado',
    instrucciones: [
      'Redactar una síntesis estructurada de fuentes académicas recientes relacionadas con el problema de investigación.',
      'Incluir referencias completas y subir el archivo final en formato PDF.'
    ]
  }
];

export default function MisCursosYEntregables({ user }) {
  const [activeMainTab, setActiveMainTab] = useState('cursos');
  const [searchQuery, setSearchQuery] = useState('');

  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [selectedTareaId, setSelectedTareaId] = useState(TAREAS_EJEMPLO[0].id);

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
          const cursosMapeados = data.map((c) => ({
            id: c.id,
            codigo: c.codigo || 'INV-401',
            nombre: c.nombre_curso || c.nombre || 'Curso sin nombre',
            profesor: c.profesor || 'Docente asignado',
            creditos: c.creditos || 4,
            silaboUrl: c.silabo_url || null,
            ubicacion: 'Aula 302 • Pabellón de Innovación',
            horario: 'Lun y Mié 10:00 – 12:00 PM',
            grupo: 'Grupo 1A • Turno Mañana',
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

  const tareaSeleccionada =
    TAREAS_EJEMPLO.find((t) => t.id === selectedTareaId) || TAREAS_EJEMPLO[0];

  return (
    <div className="min-h-screen bg-[#080c12] text-slate-100 px-4 py-5 sm:px-6 space-y-6 font-sans">
      {/* 1. Barra superior del portal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/90 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 rounded text-[11px] font-bold tracking-wide uppercase">
            CICLO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar curso, código o docente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f1622] border border-slate-800 rounded-md pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 sm:pl-3 sm:border-l border-slate-800">
            <div className="w-8 h-8 rounded-md bg-slate-800/90 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200 shrink-0">
              {user?.iniciales || 'EP'}
            </div>
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-slate-100">
                {user?.nombre_completo || 'Estudiante Progresa'}
              </p>
              <p className="text-slate-400">Ingeniería de Software</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Título de sección y pestañas */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Panel del Estudiante
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Consulta tus asignaturas matriculadas, revisa los sílabos disponibles y gestiona tus entregables del ciclo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#0e141f] p-1 rounded-md border border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveMainTab('cursos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMainTab === 'cursos'
                ? 'bg-slate-100 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Mis Cursos & Sílabos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('tareas')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold transition-colors ${
              activeMainTab === 'tareas'
                ? 'bg-slate-100 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Tareas y Entregables (5)</span>
          </button>
        </div>
      </div>

      {/* 3. VISTA 1: MIS CURSOS Y SÍLABOS */}
      {activeMainTab === 'cursos' && (
        <div className="space-y-4 pt-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              ASIGNATURAS MATRICULADAS EN EL CICLO
            </h2>
            <span className="text-xs text-slate-400">
              {cursosFiltrados.length} de {cursos.length} curso(s) visible(s)
            </span>
          </div>

          {loadingCursos ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3 bg-[#0e141f] border border-slate-800 rounded-lg">
              <Loader2 className="w-7 h-7 animate-spin text-sky-400" />
              <p className="text-xs font-medium">Cargando asignaturas oficiales...</p>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="p-8 bg-[#0e141f] border border-slate-800 rounded-lg text-center text-slate-400 text-xs">
              No se encontraron cursos con ese criterio de búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {cursosFiltrados.map((curso) => (
                <div
                  key={curso.id}
                  className="bg-[#0e141f] border border-slate-800/90 hover:border-slate-700 rounded-lg p-5 flex flex-col justify-between gap-4 transition-colors"
                >
                  <div className="space-y-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700/80 text-[11px] font-mono font-semibold rounded">
                          {curso.codigo}
                        </span>
                        <span className="px-2.5 py-0.5 bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 text-[11px] font-semibold rounded">
                          {curso.grupo}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {curso.creditos} créditos
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">
                      {curso.nombre}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#090d14] border border-slate-800/80 rounded-md text-xs">
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                          DOCENTE TITULAR
                        </p>
                        <p className="font-semibold text-slate-100 truncate mt-1">
                          {curso.profesor}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                          HORARIO
                        </p>
                        <p className="font-semibold text-slate-100 truncate mt-1">
                          {curso.horario}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400">
                      Sílabo Oficial del Curso:
                    </span>

                    {curso.silaboUrl ? (
                      <a
                        href={curso.silaboUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs rounded-md transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Ver / Descargar PDF</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium rounded-md">
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

      {/* 4. VISTA 2: TAREAS Y ENTREGABLES */}
      {activeMainTab === 'tareas' && (
        <div className="space-y-6 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-[#0e141f] border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Tareas Pendientes</span>
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-white">5</span>
                <span className="px-2 py-0.5 bg-amber-950/70 text-amber-400 border border-amber-800/50 rounded text-[11px] font-medium">
                  2 urgentes
                </span>
              </div>
            </div>

            <div className="bg-[#0e141f] border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Entregadas a Tiempo</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-white">14</span>
                <span className="text-xs text-emerald-400 font-semibold">100% puntual</span>
              </div>
            </div>

            <div className="bg-[#0e141f] border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 text-slate-400 text-xs font-medium">
                <span>Calificadas</span>
                <span className="text-xs text-emerald-400 font-semibold">Promedio: 17.8</span>
              </div>
              <div className="mt-3 text-2xl font-bold text-white">12</div>
            </div>

            <div className="bg-[#0e141f] border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Próximo Vencimiento</span>
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              </div>
              <div className="mt-2">
                <p className="text-sm font-bold text-rose-400">Mañana, 23:59 hrs</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Proyecto de Investigación • Taller N° 4
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-3">
              {TAREAS_EJEMPLO.map((tarea) => {
                const isSelected = tarea.id === tareaSeleccionada.id;
                return (
                  <button
                    key={tarea.id}
                    type="button"
                    onClick={() => setSelectedTareaId(tarea.id)}
                    className={`w-full text-left bg-[#0e141f] border rounded-lg p-4 space-y-3 transition-colors ${
                      isSelected
                        ? 'border-sky-700/80 border-l-4 border-l-sky-500'
                        : 'border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span
                        className={`font-semibold ${
                          isSelected ? 'text-sky-400' : 'text-slate-300'
                        }`}
                      >
                        {tarea.cursoCorto}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          tarea.urgencia === 'alta'
                            ? 'bg-rose-950/70 text-rose-400 border border-rose-800/50'
                            : 'bg-amber-950/70 text-amber-400 border border-amber-800/50'
                        }`}
                      >
                        {tarea.venceBadge}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm leading-snug">
                      {tarea.titulo}
                    </h3>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-800/80 text-xs text-slate-400">
                      <span>{tarea.modalidad}</span>
                      <span className={isSelected ? 'text-slate-200 font-semibold' : ''}>
                        {tarea.ponderacion}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#0e141f] border border-slate-800/90 rounded-lg p-5 sm:p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="space-y-2 border-b border-slate-800/80 pb-4">
                  <span className="inline-block px-2.5 py-0.5 bg-sky-950/70 text-sky-300 border border-sky-800/50 text-xs font-semibold rounded">
                    {tareaSeleccionada.codigo} • {tareaSeleccionada.curso}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {tareaSeleccionada.titulo}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {tareaSeleccionada.docente} • Modalidad: {tareaSeleccionada.modalidad}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <p className="font-bold text-slate-200 uppercase tracking-wider">
                    Instrucciones
                  </p>
                  <div className="bg-[#090d14] border border-slate-800/80 p-4 rounded-md space-y-2 leading-relaxed">
                    {tareaSeleccionada.instrucciones.map((paso, idx) => (
                      <p key={idx}>{paso}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4 shrink-0" />
                  <span>Subir Entrega Definitiva (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}