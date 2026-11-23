import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  Download,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  ChevronLeft,
  ChevronRight
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
    tf: '18.0',
    estado: 'aprobado'
  },
  {
    id: '2021-08731',
    nombre: 'Carlos Ruiz Dávila',
    iniciales: 'CR',
    ec1: '14.0',
    ep: '11.0',
    ec2: '13.5',
    tf: '12.0',
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
    tf: '15.0',
    estado: 'aprobado'
  },
  {
    id: '2021-09452',
    nombre: 'Lucas Romero Quispe',
    iniciales: 'LR',
    ec1: '11.0',
    ep: '10.5',
    ec2: '12.0',
    tf: '11.0',
    estado: 'riesgo'
  }
];

export default function CalificacionesPanel() {
  const [activeTab, setActiveTab] = useState<'Todos' | 'Aprobados' | 'Riesgo' | 'Desaprobados'>('Todos');
  const [searchCode, setSearchCode] = useState<string>('');
  const [portalEstudianteVisible, setPortalEstudianteVisible] = useState<boolean>(true);
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const [actaCerrada, setActaCerrada] = useState<boolean>(false);

  const estudiantesFiltrados = useMemo(() => {
    const q = searchCode.trim().toLowerCase();
    return ESTUDIANTES.filter((est) => {
      const cumpleEstado =
        activeTab === 'Todos' ||
        (activeTab === 'Aprobados' && est.estado === 'aprobado') ||
        (activeTab === 'Riesgo' && est.estado === 'riesgo') ||
        (activeTab === 'Desaprobados' && est.estado === 'desaprobado');

      const cumpleBusqueda =
        !q ||
        est.id.toLowerCase().includes(q) ||
        est.nombre.toLowerCase().includes(q);

      return cumpleEstado && cumpleBusqueda;
    });
  }, [activeTab, searchCode]);

  return (
    <div className="space-y-5 text-slate-200">
      {/* Encabezado del módulo y cierre de acta */}
      <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Calificaciones y Registro de Actas
              </h2>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded text-[11px] font-semibold">
                Periodo 2026-II
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Registro de evaluaciones continuas, exámenes y consolidado de notas por sección.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActaCerrada((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold text-xs rounded-md transition-colors shrink-0 self-start lg:self-auto"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{actaCerrada ? 'Acta registrada' : 'Registrar cierre de acta'}</span>
          </button>
        </div>

        {/* Datos de asignatura, periodo y sección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Asignatura</p>
            <p className="text-xs font-bold text-white mt-1">
              Historia del Arte Moderno <span className="font-mono text-[#A8D5EE]">(HAR-302)</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Programa Académico · Grupo 4B</p>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Periodo lectivo</p>
            <p className="text-xs font-bold text-white mt-1">Ciclo 2026-II</p>
            <p className="text-[11px] text-emerald-400 mt-0.5">Registro habilitado</p>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Sección y matrícula</p>
            <p className="text-xs font-bold text-white mt-1">Sección B · 38 estudiantes</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Sede Institucional</p>
          </div>
        </div>
      </div>

      {/* Estructura ponderada de la asignatura */}
      <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white">Estructura de Evaluación</h3>
            <p className="text-xs text-slate-400">
              Ponderaciones vigentes establecidas en el sílabo de la asignatura.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#A8D5EE] bg-[#002B45] px-2.5 py-1 rounded border border-[#0084C2]/30 self-start sm:self-auto">
            Nota aprobatoria mínima: 10.5 / 20.0
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 1</span>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] font-bold rounded text-[11px]">
                20%
              </span>
            </div>
            <h4 className="text-xs font-bold text-white">Evaluación Continua 1</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Calificado · 100%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 2</span>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] font-bold rounded text-[11px]">
                30%
              </span>
            </div>
            <h4 className="text-xs font-bold text-white">Examen Parcial</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Calificado · 100%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-[#0084C2]/60 rounded-md p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A8D5EE] uppercase font-bold text-[10px]">Rubro 3</span>
              <span className="px-2 py-0.5 bg-[#0084C2] text-white font-bold rounded text-[11px]">
                20%
              </span>
            </div>
            <h4 className="text-xs font-bold text-white">Evaluación Continua 2</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-300">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>En revisión · 75%</span>
            </div>
          </div>

          <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Rubro 4</span>
              <span className="px-2 py-0.5 bg-[#111C26] text-slate-300 border border-slate-700 font-bold rounded text-[11px]">
                30%
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-200">Trabajo Final</h4>
            <div className="text-[11px] text-slate-400">
              Programado · Cierre de ciclo
            </div>
          </div>
        </div>

        {/* Barra de avance del registro */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold">Avance del registro evaluativo</span>
            <span className="text-white font-bold">70%</span>
          </div>
          <div className="w-full h-2 bg-[#0B1218] rounded overflow-hidden flex border border-slate-800">
            <div className="w-[20%] bg-[#002B45] h-full" />
            <div className="w-[30%] bg-[#0084C2] h-full" />
            <div className="w-[20%] bg-[#A8D5EE] h-full" />
            <div className="w-[30%] bg-transparent h-full" />
          </div>
        </div>
      </div>

      {/* Matriz de calificaciones + Panel lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Matriz de notas (8 cols) */}
        <div className="lg:col-span-8 bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4 min-w-0">
          {/* Filtros y búsqueda */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex flex-wrap items-center gap-1.5 bg-[#0B1218] p-1 rounded-md border border-slate-800 text-xs">
              {(
                [
                  { id: 'Todos', label: 'Todos', count: 38 },
                  { id: 'Aprobados', label: 'Aprobados', count: 29 },
                  { id: 'Riesgo', label: 'En seguimiento', count: 6 },
                  { id: 'Desaprobados', label: 'Desaprobados', count: 3 }
                ] as const
              ).map((tab) => {
                const activo = activeTab === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-2.5 py-1.5 rounded font-semibold transition-colors flex items-center gap-1.5 ${
                      activo
                        ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        activo ? 'bg-[#0084C2]/30 text-[#A8D5EE]' : 'bg-[#111C26] text-slate-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Buscar código o alumno..."
                className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2]"
              />
            </div>
          </div>

          {/* Tabla sin barras deslizadoras visibles */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left text-xs min-w-[540px]">
              <thead className="bg-[#0B1218] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-bold">Estudiante</th>
                  <th className="py-2.5 px-2 text-center font-bold">EC1 (20%)</th>
                  <th className="py-2.5 px-2 text-center font-bold">EP (30%)</th>
                  <th className="py-2.5 px-2 text-center font-bold bg-[#002B45]/60 text-[#A8D5EE] border-x border-slate-800">
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
                            <p className="font-bold text-white text-xs flex items-center gap-1.5">
                              <span className="truncate">{est.nombre}</span>
                              {est.fut && (
                                <span className="text-[9px] bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 px-1.5 py-0.2 rounded font-mono">
                                  FUT
                                </span>
                              )}
                              {est.alerta && (
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              )}
                            </p>
                            <p className="text-[10px] text-slate-500 font-mono">{est.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-2 text-center text-slate-200 font-semibold">{est.ec1}</td>
                      <td className="py-3 px-2 text-center text-slate-200 font-semibold">{est.ep}</td>

                      <td className="py-3 px-2 text-center bg-[#002B45]/25 border-x border-slate-800">
                        <span
                          className={`px-2 py-1 rounded font-bold ${
                            parseFloat(est.ec2) < 10.5
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : 'bg-[#0B1218] text-white border border-slate-700/80'
                          }`}
                        >
                          {est.ec2}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-center text-slate-300">{est.tf}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="text-[11px]">Mostrando registros del periodo vigente</span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                className="p-1.5 bg-[#0B1218] border border-slate-800 rounded text-slate-300 hover:text-white"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setPaginaActual(num)}
                  className={`px-2.5 py-1 rounded font-bold text-xs ${
                    paginaActual === num
                      ? 'bg-[#0084C2] text-white'
                      : 'bg-[#0B1218] border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaginaActual((p) => p + 1)}
                className="p-1.5 bg-[#0B1218] border border-slate-800 rounded text-slate-300 hover:text-white"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Nota de política de evaluación */}
          <div className="p-3 bg-[#0B1218] border border-slate-800 rounded-md flex items-start gap-2.5 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-[#A8D5EE] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Las calificaciones se registran en escala vigesimal de 0 a 20 conforme al reglamento académico institucional.
            </p>
          </div>
        </div>

        {/* Panel lateral derecho (4 cols) */}
        <div className="lg:col-span-4 space-y-5 min-w-0">
          {/* Acciones del acta */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Acciones del Acta
              </h3>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[10px] font-bold rounded">
                {actaCerrada ? 'Cerrada' : 'En borrador'}
              </span>
            </div>

            <div className="p-3 bg-[#0B1218] border border-slate-800 rounded-md flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#A8D5EE] shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Cierre de actas ordinarias</p>
                <p className="text-[11px] text-slate-400">Según cronograma académico</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full py-2 px-3 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 rounded-md text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[#A8D5EE]" />
                <span>Exportar reporte de notas</span>
              </button>

              <button
                type="button"
                className="w-full py-2 px-3 bg-[#002B45] hover:bg-[#00385A] text-white border border-[#0084C2]/40 rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#A8D5EE]" />
                <span>Publicar calificaciones</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-200">Visibilidad para alumnos</p>
                <p className="text-[11px] text-slate-400">Mostrar notas de evaluación continua</p>
              </div>
              <button
                type="button"
                onClick={() => setPortalEstudianteVisible((prev) => !prev)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 ${
                  portalEstudianteVisible ? 'bg-[#0084C2]' : 'bg-slate-700'
                }`}
                aria-label="Alternar visibilidad para alumnos"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    portalEstudianteVisible ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Resumen de rendimiento */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Resumen de Sección
              </h3>
              <span className="text-[11px] font-mono text-[#A8D5EE]">HAR-302</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Promedio de sección</p>
                <p className="text-2xl font-extrabold text-white mt-1">
                  14.2 <span className="text-xs font-normal text-slate-400">/ 20.0</span>
                </p>
              </div>
              <span className="text-xs font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30">
                38 matriculados
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Aprobados</span>
                <span className="font-bold text-white">29 estudiantes</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">En seguimiento</span>
                <span className="font-bold text-white">6 estudiantes</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Desaprobados</span>
                <span className="font-bold text-white">3 estudiantes</span>
              </div>
            </div>
          </div>

          {/* Solicitudes vinculadas a FUT */}
          <div className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#A8D5EE]" />
                <span>Solicitudes de Revisión</span>
              </h3>
              <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 text-[10px] font-bold rounded">
                2 pendientes
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-[#0B1218] border border-slate-800 rounded-md flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">Carlos Ruiz</p>
                  <p className="text-[11px] text-slate-400 truncate">Revisión de evaluación</p>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded text-[11px] font-semibold shrink-0"
                >
                  Revisar
                </button>
              </div>

              <div className="p-2.5 bg-[#0B1218] border border-slate-800 rounded-md flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-white truncate">Elena Díaz</p>
                  <p className="text-[11px] text-slate-400 truncate">Revisión de rúbrica</p>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded text-[11px] font-semibold shrink-0"
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