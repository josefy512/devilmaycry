import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  ChevronDown,
  Download,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface EstudianteNota {
  id: string;
  nombre: string;
  iniciales: string;
  ec1: string;
  ep: string;
  ec2: string;
  tf: string;
  estado: 'aprobado' | 'riesgo' | 'desaprobado';
  fut?: boolean;
  alerta?: boolean;
}

const ESTUDIANTES: EstudianteNota[] = [
  {
    id: '2022-10492',
    nombre: 'Ana García Méndez',
    iniciales: 'AG',
    ec1: '16.5',
    ep: '15.0',
    ec2: '17.0',
    tf: '18.0*',
    estado: 'aprobado'
  },
  {
    id: '2021-08731',
    nombre: 'Carlos Ruiz Dávila',
    iniciales: 'CR',
    ec1: '14.0',
    ep: '11.0',
    ec2: '13.5',
    tf: '12.0*',
    estado: 'aprobado',
    fut: true
  },
  {
    id: '2023-14205',
    nombre: 'Elena Díaz Vargas',
    iniciales: 'ED',
    ec1: '08.5',
    ep: '09.0',
    ec2: '10.0',
    tf: '--',
    estado: 'desaprobado',
    alerta: true
  },
  {
    id: '2022-11840',
    nombre: 'Sofía Morales Benítez',
    iniciales: 'SM',
    ec1: '15.0',
    ep: '14.0',
    ec2: '16.0',
    tf: '15.0*',
    estado: 'aprobado'
  },
  {
    id: '2021-09452',
    nombre: 'Lucas Romero Quispe',
    iniciales: 'LR',
    ec1: '11.0',
    ep: '10.5',
    ec2: '12.0',
    tf: '11.0*',
    estado: 'riesgo'
  }
];

export default function CalificacionesPanel() {
  const [activeTab, setActiveTab] = useState<'Todos' | 'Aprobados' | 'Riesgo' | 'Desaprobados'>('Todos');
  const [codigoBusqueda, setCodigoBusqueda] = useState<string>('');
  const [portalEstudianteVisible, setPortalEstudianteVisible] = useState<boolean>(true);
  const [actaCerrada, setActaCerrada] = useState<boolean>(false);

  const estudiantesFiltrados = useMemo(() => {
    const q = codigoBusqueda.trim().toLowerCase();
    return ESTUDIANTES.filter((est) => {
      const cumpleEstado =
        activeTab === 'Todos' ||
        (activeTab === 'Aprobados' && est.estado === 'aprobado') ||
        (activeTab === 'Riesgo' && est.estado === 'riesgo') ||
        (activeTab === 'Desaprobados' && est.estado === 'desaprobado');

      const cumpleCodigo =
        !q ||
        est.id.toLowerCase().includes(q) ||
        est.nombre.toLowerCase().includes(q);

      return cumpleEstado && cumpleCodigo;
    });
  }, [activeTab, codigoBusqueda]);

  return (
    <div className="space-y-5 text-slate-200">
      {/* Encabezado y selectores de registro */}
      <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] font-semibold border border-[#0084C2]/30 rounded text-[11px]">
                Registro Académico
              </span>
              <span className="text-slate-400 text-xs">Periodo 2026-II</span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-white">
              Calificaciones y Actas de Evaluación
            </h1>
            <p className="text-xs text-slate-400">
              Consolidado de notas parciales y continuas para el registro y cierre de acta del curso.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActaCerrada((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold text-xs rounded-md transition-colors self-start lg:self-auto shrink-0"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{actaCerrada ? 'Acta registrada' : 'Cerrar y registrar acta'}</span>
          </button>
        </div>

        {/* Datos del curso, periodo y sección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Asignatura</p>
              <p className="text-xs font-bold text-white flex items-center gap-2 mt-0.5 truncate">
                <span className="truncate">Historia del Arte Moderno</span>
                <span className="text-[10px] text-[#A8D5EE] bg-[#002B45] px-1.5 py-0.5 rounded font-mono shrink-0">
                  HAR-302
                </span>
              </p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                Especialidad · Grupo 4B
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Periodo lectivo</p>
              <p className="text-xs font-bold text-white mt-0.5">Ciclo 2026-II</p>
              <p className="text-[11px] text-[#A8D5EE] mt-0.5">En evaluación</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Matrícula asignada</p>
              <p className="text-xs font-bold text-white mt-0.5">Sección B · 38 estudiantes</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Sede institucional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Estructura ponderada */}
      <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A8D5EE]" />
              <span>Ponderación de Evaluaciones</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Esquema de rubros y avances registrados para el periodo vigente.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2.5 py-1 rounded border border-[#0084C2]/30 self-start sm:self-auto">
            Nota mínima aprobatoria: <strong>10.5 / 20.0</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 1</span>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] font-bold rounded">20%</span>
            </div>
            <h3 className="text-xs font-bold text-white">Eval. Continua 1</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Registrado · 100%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 2</span>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] font-bold rounded">30%</span>
            </div>
            <h3 className="text-xs font-bold text-white">Examen Parcial</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Registrado · 100%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-[#0084C2]/50 rounded-md p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#A8D5EE] uppercase font-bold text-[10px]">Rubro 3</span>
              <span className="px-2 py-0.5 bg-[#0084C2] text-white font-bold rounded">20%</span>
            </div>
            <h3 className="text-xs font-bold text-white">Eval. Continua 2</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>En proceso · 75%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 4</span>
              <span className="px-2 py-0.5 bg-[#111C26] text-slate-300 border border-slate-700 font-bold rounded">
                30%
              </span>
            </div>
            <h3 className="text-xs font-bold text-white">Trabajo Final</h3>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <span>Pendiente de cierre</span>
            </div>
          </div>
        </div>

        {/* Barra de avance */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-300">Avance del registro evaluativo</span>
            <span className="text-white font-bold">
              70% <span className="text-slate-400 font-normal">completado</span>
            </span>
          </div>
          <div className="w-full h-2 bg-[#0B1218] rounded overflow-hidden flex border border-slate-800">
            <div className="w-[20%] bg-[#0084C2] h-full" />
            <div className="w-[30%] bg-[#A8D5EE] h-full" />
            <div className="w-[20%] bg-amber-400 h-full" />
            <div className="w-[30%] bg-[#111C26] h-full" />
          </div>
        </div>
      </div>

      {/* Tabla principal + Acciones laterales */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tabla de notas (8 cols) */}
        <div className="lg:col-span-8 bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center gap-1.5 bg-[#0B1218] p-1 rounded-md border border-slate-800 text-xs w-max">
                {(
                  [
                    { id: 'Todos', label: 'Todos', count: 38 },
                    { id: 'Aprobados', label: 'Aprobados', count: 29 },
                    { id: 'Riesgo', label: 'En riesgo', count: 6 },
                    { id: 'Desaprobados', label: 'Desaprobados', count: 3 }
                  ] as const
                ).map((tab) => {
                  const activa = activeTab === tab.id;
                  return (
                    <button
                      type="button"
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2.5 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                        activa
                          ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#111C26] text-slate-300">
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full sm:w-44">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={codigoBusqueda}
                onChange={(e) => setCodigoBusqueda(e.target.value)}
                placeholder="Buscar código o alumno..."
                className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2]"
              />
            </div>
          </div>

          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-xs min-w-[520px]">
              <thead className="bg-[#0B1218] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Estudiante</th>
                  <th className="py-2.5 px-2 text-center font-bold">EC1 (20%)</th>
                  <th className="py-2.5 px-2 text-center font-bold">EP (30%)</th>
                  <th className="py-2.5 px-2 text-center font-bold text-[#A8D5EE] bg-[#002B45]/40">
                    EC2 (20%)
                  </th>
                  <th className="py-2.5 px-2 text-center font-bold">TF (30%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono">
                {estudiantesFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center font-sans text-xs text-slate-400">
                      No hay estudiantes que coincidan con el filtro seleccionado.
                    </td>
                  </tr>
                ) : (
                  estudiantesFiltrados.map((est) => (
                    <tr key={est.id} className="hover:bg-[#0B1218]/60 transition-colors">
                      <td className="py-3 px-3 font-sans">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-[10px] text-[#A8D5EE] shrink-0">
                            {est.iniciales}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-white text-xs flex items-center gap-1.5 truncate">
                              <span className="truncate">{est.nombre}</span>
                              {est.fut && (
                                <span className="text-[9px] bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 px-1.5 py-0.2 rounded font-mono shrink-0">
                                  FUT
                                </span>
                              )}
                              {est.alerta && (
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              )}
                            </p>
                            <p className="text-[10px] text-slate-500">{est.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center text-slate-200 font-semibold">
                        {est.ec1}
                      </td>
                      <td className="py-3 px-2 text-center text-slate-200 font-semibold">
                        {est.ep}
                      </td>
                      <td className="py-3 px-2 text-center bg-[#002B45]/20">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            parseFloat(est.ec2) < 10.5
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : 'bg-[#0B1218] text-white border border-slate-700/80'
                          }`}
                        >
                          {est.ec2}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-400">{est.tf}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pie de tabla y paginación */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="text-[11px]">
              Registro activo · <strong className="text-[#A8D5EE]">Periodo 2026-II</strong>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 bg-[#0B1218] border border-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="px-2.5 py-1 bg-[#002B45] border border-[#0084C2]/50 text-white rounded font-bold text-xs"
              >
                1
              </button>
              <button
                type="button"
                className="px-2.5 py-1 bg-[#0B1218] border border-slate-800 rounded text-slate-400 hover:text-white text-xs"
              >
                2
              </button>
              <button
                type="button"
                className="p-1.5 bg-[#0B1218] border border-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#0B1218] border border-slate-800 rounded-md flex items-start gap-2.5 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-[#A8D5EE] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Las notas marcadas con asterisco (*) corresponden a cálculos preliminares de referencia hasta el cierre definitivo del acta.
            </p>
          </div>
        </div>

        {/* Columna derecha: Acciones, Rendimiento y FUTs (4 cols) */}
        <div className="lg:col-span-4 space-y-5 min-w-0">
          {/* Acciones del acta */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Acciones del Acta
              </h3>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[10px] font-semibold rounded">
                {actaCerrada ? 'Cerrada' : 'Borrador'}
              </span>
            </div>

            <div className="p-3 bg-[#0B1218] border border-slate-800 rounded-md flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#A8D5EE] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Plazo de cierre ordinario</p>
                <p className="text-[11px] text-slate-400">Vence en 4 días</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full py-2 px-3 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 rounded-md text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#A8D5EE]" />
                <span>Exportar acta (PDF / Excel)</span>
              </button>

              <button
                type="button"
                className="w-full py-2 px-3 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publicar notas a estudiantes</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-200">Visibilidad en portal</p>
                <p className="text-[11px] text-slate-400">Mostrar avance de notas</p>
              </div>
              <button
                type="button"
                onClick={() => setPortalEstudianteVisible(!portalEstudianteVisible)}
                aria-label="Alternar visibilidad en portal del estudiante"
                className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                  portalEstudianteVisible ? 'bg-[#0084C2]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    portalEstudianteVisible ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Rendimiento académico */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Rendimiento del Grupo
              </h3>
              <span className="text-[11px] font-mono text-[#A8D5EE]">HAR-302</span>
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Promedio general</p>
                <p className="text-2xl font-extrabold text-white mt-0.5">
                  14.2 <span className="text-xs font-normal text-slate-400">/ 20.0</span>
                </p>
              </div>
              <span className="text-xs font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30">
                +0.8 pts
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <p className="text-[10px] text-slate-400 font-bold uppercase">
                Resumen por condición (38 matriculados)
              </p>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Aprobados (≥ 10.5)</span>
                <span className="font-bold text-white">35 estudiantes</span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">En observación</span>
                <span className="font-bold text-amber-300">6 estudiantes</span>
              </div>

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Desaprobados</span>
                <span className="font-bold text-rose-300">3 estudiantes</span>
              </div>
            </div>
          </div>

          {/* Solicitudes FUT */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#A8D5EE]" />
                <span>Solicitudes FUT</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[10px] font-semibold rounded">
                2 pendientes
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-[#0B1218] border border-slate-800 rounded-md flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">Carlos Ruiz · #4092</p>
                  <p className="text-[11px] text-slate-400 truncate">Revisión de evaluación parcial</p>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded text-[11px] font-semibold transition-colors shrink-0"
                >
                  Revisar
                </button>
              </div>

              <div className="p-2.5 bg-[#0B1218] border border-slate-800 rounded-md flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">Elena Díaz · #4105</p>
                  <p className="text-[11px] text-slate-400 truncate">Revisión de evaluación continua</p>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded text-[11px] font-semibold transition-colors shrink-0"
                >
                  Revisar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}