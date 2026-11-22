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
    <div className="min-h-screen bg-[#000000] text-white px-4 py-5 sm:px-6 space-y-6 font-sans">
      {/* 1. Barra Superior Institucional */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#b3b3b3]">
          <span className="px-2.5 py-1 bg-[#121212] text-[#1ed760] font-bold border border-[#2b2b2b] rounded-[2px]">
            CICLO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73777c]" />
            <input
              type="text"
              placeholder="Buscar curso, código o docente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-[#2b2b2b] rounded-[2px] pl-9 pr-3 py-2 text-xs text-white placeholder-[#73777c] focus:outline-none focus:border-[#1ed760] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 sm:pl-3 sm:border-l border-[#262626]">
            <div className="w-8 h-8 rounded-[2px] bg-[#181818] border border-[#2b2b2b] flex items-center justify-center font-bold text-xs text-[#1ed760] shrink-0">
              {user?.iniciales || 'EP'}
            </div>
            <div className="text-[11px] leading-tight">
              <p className="font-bold text-white">
                {user?.nombre_completo || 'Estudiante Progresa'}
              </p>
              <p className="text-[#b3b3b3]">Ingeniería de Software</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Título de Sección y Pestañas */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Panel del Estudiante
          </h1>
          <p className="text-xs text-[#b3b3b3] max-w-2xl">
            Consulta tus asignaturas matriculadas, revisa los sílabos disponibles y gestiona tus entregables del ciclo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#121212] p-1 rounded-[2px] border border-[#26262b] self-start">
          <button
            type="button"
            onClick={() => setActiveMainTab('cursos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-[2px] text-xs font-bold transition-colors ${
              activeMainTab === 'cursos'
                ? 'bg-[#ffffff] text-[#000000]'
                : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Mis Cursos & Sílabos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab('tareas')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-[2px] text-xs font-bold transition-colors ${
              activeMainTab === 'tareas'
                ? 'bg-[#ffffff] text-[#000000]'
                : 'text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a]'
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
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1f1f1f] pb-2.5">
            <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Asignaturas Matriculadas en el Ciclo
            </h2>
            <span className="text-xs text-[#b3b3b3]">
              {cursosFiltrados.length} de {cursos.length} curso(s) visible(s)
            </span>
          </div>

          {loadingCursos ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#b3b3b3] gap-3 bg-[#121212] border border-[#1f1f1f] rounded-[2px]">
              <Loader2 className="w-7 h-7 animate-spin text-[#1ed760]" />
              <p className="text-xs font-semibold">Cargando asignaturas oficiales...</p>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="p-8 bg-[#121212] border border-[#1f1f1f] rounded-[2px] text-center text-[#b3b3b3] text-xs">
              No se encontraron cursos con ese criterio de búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {cursosFiltrados.map((curso) => (
                <div
                  key={curso.id}
                  className="bg-[#121212] border border-[#222222] hover:border-[#363636] rounded-[2px] p-4 sm:p-5 flex flex-col justify-between gap-4 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1f1f1f] pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#1b1b1b] border border-[#2c2c2c] text-white text-[10px] font-mono font-bold rounded-[2px]">
                          {curso.codigo}
                        </span>
                        <span className="px-2 py-0.5 bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/25 text-[10px] font-bold rounded-[2px]">
                          {curso.grupo}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#b3b3b3] font-medium">
                        {curso.creditos} créditos
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {curso.nombre}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#080808] border border-[#1f1f1f] rounded-[2px] text-xs">
                      <div className="min-w-0">
                        <p className="text-[10px] text-[#73777c] uppercase font-bold">
                          Docente Titular
                        </p>
                        <p className="font-semibold text-white truncate mt-0.5">
                          {curso.profesor}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] text-[#73777c] uppercase font-bold">
                          Horario
                        </p>
                        <p className="font-semibold text-white truncate mt-0.5">
                          {curso.horario}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#1f1f1f]">
                    <span className="text-xs text-[#b3b3b3]">
                      Sílabo Oficial del Curso:
                    </span>

                    {curso.silaboUrl ? (
                      <a
                        href={curso.silaboUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 bg-[#ffffff] hover:bg-[#d4d4d4] text-[#000000] font-bold text-xs rounded-[2px] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Ver / Descargar PDF</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 bg-[#181818] border border-[#262626] text-[#73777c] text-xs font-semibold rounded-[2px]">
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
            <div className="bg-[#121212] border border-[#222222] rounded-[2px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Tareas Pendientes</span>
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-white">5</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-[2px] text-[11px]">
                  2 urgentes
                </span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222222] rounded-[2px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Entregadas a Tiempo</span>
                <CheckCircle2 className="w-4 h-4 text-[#1ed760] shrink-0" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-2">
                <span className="text-2xl font-bold text-white">14</span>
                <span className="text-xs text-[#1ed760] font-bold">100% puntual</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#222222] rounded-[2px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 text-[#b3b3b3] text-xs font-semibold">
                <span>Calificadas</span>
                <span className="text-xs text-[#1ed760] font-bold">Promedio: 17.8</span>
              </div>
              <div className="mt-3 text-2xl font-bold text-white">12</div>
            </div>

            <div className="bg-[#121212] border border-[#222222] rounded-[2px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Próximo Vencimiento</span>
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              </div>
              <div className="mt-2">
                <p className="text-sm font-bold text-rose-400">Mañana, 23:59 hrs</p>
                <p className="text-xs text-[#b3b3b3] truncate mt-0.5">
                  Proyecto de Investigación • Taller N° 4
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              {TAREAS_EJEMPLO.map((tarea) => {
                const isSelected = tarea.id === tareaSeleccionada.id;
                return (
                  <button
                    key={tarea.id}
                    type="button"
                    onClick={() => setSelectedTareaId(tarea.id)}
                    className={`w-full text-left bg-[#121212] border rounded-[2px] p-4 space-y-3 transition-colors ${
                      isSelected
                        ? 'border-[#3a3a3a] border-l-4 border-l-[#1ed760]'
                        : 'border-[#222222] hover:border-[#333333]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span
                        className={`font-bold ${
                          isSelected ? 'text-[#1ed760]' : 'text-[#b3b3b3]'
                        }`}
                      >
                        {tarea.cursoCorto}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-[2px] text-[10px] font-semibold ${
                          tarea.urgencia === 'alta'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {tarea.venceBadge}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-sm leading-snug">
                      {tarea.titulo}
                    </h3>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1f1f1f] text-xs text-[#b3b3b3]">
                      <span>{tarea.modalidad}</span>
                      <span className={isSelected ? 'text-white font-bold' : ''}>
                        {tarea.ponderacion}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 bg-[#121212] border border-[#222222] rounded-[2px] p-5 sm:p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="space-y-2 border-b border-[#1f1f1f] pb-4">
                  <span className="inline-block px-2.5 py-0.5 bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/20 text-xs font-bold rounded-[2px]">
                    {tareaSeleccionada.codigo} • {tareaSeleccionada.curso}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {tareaSeleccionada.titulo}
                  </h2>
                  <p className="text-xs text-[#b3b3b3]">
                    {tareaSeleccionada.docente} • Modalidad: {tareaSeleccionada.modalidad}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-[#b3b3b3]">
                  <p className="font-bold text-white uppercase tracking-wider">
                    Instrucciones
                  </p>
                  <div className="bg-[#080808] border border-[#1f1f1f] p-4 rounded-[2px] space-y-2 leading-relaxed">
                    {tareaSeleccionada.instrucciones.map((paso, idx) => (
                      <p key={idx}>{paso}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-3 px-4 bg-[#ffffff] hover:bg-[#d4d4d4] text-[#000000] font-extrabold text-xs rounded-[2px] transition-colors flex items-center justify-center gap-2"
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