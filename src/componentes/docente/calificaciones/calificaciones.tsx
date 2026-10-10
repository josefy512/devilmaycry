import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  ChevronDown, 
  Download, 
  Send, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  RefreshCw, 
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function CalificacionesPanel() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [portalEstudianteVisible, setPortalEstudianteVisible] = useState(true);

  // Datos simulados de los estudiantes
  const estudiantes = [
    {
      id: '2022-10492',
      nombre: 'Ana García Méndez',
      avatar: 'AG',
      color: 'bg-purple-600',
      ec1: '16.5',
      ep: '15.0',
      ec2: '17.0',
      tf: '18.0*',
      estado: 'aprobado'
    },
    {
      id: '2021-08731',
      nombre: 'Carlos Ruiz Dávila',
      avatar: 'CR',
      color: 'bg-amber-600',
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
      avatar: 'ED',
      color: 'bg-rose-600',
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
      avatar: 'SM',
      color: 'bg-cyan-600',
      ec1: '15.0',
      ep: '14.0',
      ec2: '16.0',
      tf: '15.0*',
      estado: 'aprobado'
    },
    {
      id: '2021-09452',
      nombre: 'Lucas Romero Quispe',
      avatar: 'LR',
      color: 'bg-emerald-600',
      ec1: '11.0',
      ep: '10.5',
      ec2: '12.0',
      tf: '11.0*',
      estado: 'riesgo'
    }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* 1. Header Principal y Acción Crítica de Actas */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 rounded uppercase text-[10px]">
                ACTAS OFICIALES V4.2
              </span>
              <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sincronizado con SUNEDU
              </span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Gestión de Calificaciones y Actas Oficiales
            </h1>
            <p className="text-xs text-slate-400">
              Consolidación ponderada reglamentaria, auditoría por rúbricas y certificación digital del registro académico.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/25 self-start lg:self-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>Cerrar y Firmar Acta Oficial</span>
            <span className="text-[10px] bg-blue-700 px-1.5 py-0.5 rounded font-mono ml-1">RENIEC / SUNEDU</span>
          </button>
        </div>

        {/* Selectores de Curso, Período y Sección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
          
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Asignatura</p>
              <p className="text-xs font-bold text-white flex items-center gap-2 mt-0.5">
                <span>Historia del Arte Moderno</span>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded font-mono">HAR-302</span>
              </p>
              <p className="text-[10px] text-slate-400">Facultad de Artes y Diseño • Grupo 4B</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Período</p>
              <p className="text-xs font-bold text-white mt-0.5">Ciclo 2026-II</p>
              <p className="text-[10px] text-emerald-400">Activo (En evaluación)</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Estudiantes Asignados</p>
              <p className="text-xs font-bold text-white mt-0.5">Sección B • 38 Alumnos</p>
              <p className="text-[10px] text-slate-400">Sede Central</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>

        </div>
      </div>

      {/* 2. Estructura Ponderada de la Asignatura */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Estructura Ponderada de la Asignatura</span>
            </h3>
            <p className="text-xs text-slate-400">Parámetros validados según el Sílabo Oficial 2026-II y directiva vicerrectoral.</p>
          </div>
          <span className="text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start sm:self-auto">
            Nota mínima aprobatoria: <strong>10.5 / 20.0 pts</strong>
          </span>
        </div>

        {/* Tarjetas de Hitos Ponderados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Criterio I</span>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-extrabold rounded">20%</span>
            </div>
            <h4 className="text-xs font-bold text-white">Eval. Continua 1</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Evaluado • 100% Entregas</span>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px]">Hito Central</span>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-extrabold rounded">30%</span>
            </div>
            <h4 className="text-xs font-bold text-white">Examen Parcial</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              <span>Evaluado • 100% Actas</span>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-blue-500/40 rounded-xl p-3 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-blue-400 uppercase font-bold text-[10px]">Criterio II</span>
              <span className="px-2 py-0.5 bg-blue-500 text-white font-extrabold rounded">20%</span>
            </div>
            <h4 className="text-xs font-bold text-white">Eval. Continua 2</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-medium">
              <Clock className="w-3 h-3" />
              <span>En Curso • 75% Calificado</span>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3 space-y-2 opacity-70">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500 uppercase font-bold text-[10px]">Cierre Final</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 font-extrabold rounded">30%</span>
            </div>
            <h4 className="text-xs font-bold text-slate-300">Trabajo Final</h4>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
              <span>Pendiente • Apertura S16</span>
            </div>
          </div>

        </div>

        {/* Barra de Progreso del Ciclo */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-300 flex items-center gap-2">
              <span>Avance Evaluativo del Ciclo</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded font-bold">HITO ACTIVO</span>
            </span>
            <span className="text-white font-bold">70% <span className="text-slate-400 font-normal">completado</span></span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
            <div className="w-[20%] bg-blue-600 h-full border-r border-slate-900" title="EC1 20%"></div>
            <div className="w-[30%] bg-cyan-500 h-full border-r border-slate-900" title="EP 30%"></div>
            <div className="w-[20%] bg-amber-500 h-full border-r border-slate-900" title="EC2 20%"></div>
            <div className="w-[30%] bg-slate-800 h-full" title="TF 30%"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
            <span>• EC1 (20%) + EP (30%)</span>
            <span>• EC2 (20% en proceso)</span>
            <span>• TF (30% restante)</span>
          </div>
        </div>
      </div>

      {/* 3. Matriz de Notas (Tabla Principal) + Barra Lateral de Acciones (Grid 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Matriz de Notas (8 cols) */}
        <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          
          {/* Tabs de Filtro de Alumnos */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 bg-[#0B0F17] p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'Todos', label: 'Todos', count: 38 },
                { id: 'Aprobados', label: 'Aprobados', count: 29 },
                { id: 'Riesgo', label: 'En Riesgo', count: 6 },
                { id: 'Desaprobados', label: 'Desaprobados', count: 3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar por código..." 
                className="bg-[#0B0F17] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 w-40"
              />
            </div>
          </div>

          {/* Tabla de Calificaciones */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Estudiante</th>
                  <th className="py-3 px-2 text-center">EC1 (20%)</th>
                  <th className="py-3 px-2 text-center">EP (30%)</th>
                  <th className="py-3 px-2 text-center bg-blue-950/20 text-blue-400 border-x border-blue-900/30">
                    EC2 (20%) ♦
                  </th>
                  <th className="py-3 px-2 text-center">TF (30%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {estudiantes.map((est) => (
                  <tr key={est.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-sans">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full ${est.color} flex items-center justify-center font-bold text-[10px] text-white`}>
                          {est.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{est.nombre}</span>
                            {est.fut && (
                              <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1 rounded font-mono">FUT</span>
                            )}
                            {est.alerta && (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            )}
                          </p>
                          <p className="text-[10px] text-slate-500">{est.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center text-slate-300 font-semibold">{est.ec1}</td>
                    <td className="py-3 px-2 text-center text-slate-300 font-semibold">{est.ep}</td>
                    
                    {/* Celda Activa EC2 */}
                    <td className="py-3 px-2 text-center bg-blue-950/10 border-x border-blue-900/20">
                      <span className={`px-2 py-1 rounded font-extrabold ${
                        parseFloat(est.ec2) < 10.5 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                          : 'bg-slate-800 text-white'
                      }`}>
                        {est.ec2}
                      </span>
                    </td>

                    <td className="py-3 px-2 text-center text-slate-500 italic">{est.tf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie de Tabla y Paginación */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px]">Guardar Cambios Automáticos <strong className="text-emerald-400">(Sincronizado)</strong></span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold text-xs">1</button>
              <button className="px-2.5 py-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-400 hover:text-white text-xs">2</button>
              <button className="px-2.5 py-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-400 hover:text-white text-xs">3</button>
              <span className="text-slate-600 px-1">...</span>
              <button className="px-2.5 py-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-400 hover:text-white text-xs">8</button>
              <button className="p-1 bg-[#0B0F17] border border-slate-800 rounded text-slate-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nota Aclaratoria sobre Redondeo */}
          <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">Política Oficial de Redondeo:</strong> De acuerdo con el Reglamento General de Estudios, el promedio ponderado final admite fracción decimal de hasta 0.5 puntos como redondeo a favor del estudiante exclusivamente en el acta final definitiva. Las notas proyectadas con asterisco (*) reflejan el cálculo preliminar estimativo.
            </p>
          </div>

        </div>

        {/* COLUMNA DERECHA: Acciones del Acta + Métricas + FUTs (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Acciones de Cierre de Acta */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Acciones del Acta
              </h3>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded">
                BORRADOR ABIERTO
              </span>
            </div>

            <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-xs font-bold text-white">Cierre de actas ordinarias</p>
                  <p className="text-[10px] text-slate-400">Vence en 4 días</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full py-2.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-slate-400" />
                <span>Exportar Acta Oficial (PDF / Excel)</span>
              </button>

              <button className="w-full py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Publicar Calificaciones a Alumnos</span>
              </button>
            </div>

            {/* Switch de Visibilidad */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-300">Portal del Estudiante</p>
                <p className="text-[10px] text-slate-500">Visualización inmediata de EC2</p>
              </div>
              <button 
                onClick={() => setPortalEstudianteVisible(!portalEstudianteVisible)}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${portalEstudianteVisible ? 'bg-emerald-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${portalEstudianteVisible ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Rendimiento Académico */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Rendimiento Académico
              </h3>
              <span className="text-[10px] font-mono text-slate-500">HAR-302</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Promedio de Clase</p>
                <p className="text-2xl font-extrabold text-white mt-1">
                  14.2 <span className="text-xs font-normal text-slate-500">/ 20.0</span>
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                +0.8 pts <span className="text-[10px] text-slate-500 font-normal">vs. Ciclo 2026-I</span>
              </span>
            </div>

            {/* Distribución por Condición */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Distribución por Condición <span className="text-slate-500 font-normal">(38 Matriculados)</span></p>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Aprobados (≥ 12.0)
                  </span>
                  <span className="font-bold text-white">29 alumnos <span className="text-slate-500 font-normal">(76%)</span></span>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> En Riesgo (10.5 - 11.9)
                  </span>
                  <span className="font-bold text-white">6 alumnos <span className="text-slate-500 font-normal">(16%)</span></span>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Desaprobados (&lt; 10.5)
                  </span>
                  <span className="font-bold text-white">3 alumnos <span className="text-slate-500 font-normal">(8%)</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Solicitudes FUT Pendientes */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Solicitudes FUT</span>
              </h3>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[10px] font-bold rounded">
                2 Pendientes
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Reclamos oficiales ingresados vía Mesa de Partes Virtual con plazo de resolución docente de 48 horas.
            </p>

            <div className="space-y-2 pt-1">
              <div className="p-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Carlos Ruiz <span className="text-[10px] text-slate-500 font-mono">#4092</span></p>
                  <p className="text-[10px] text-slate-400 truncate">Examen Parcial • Pregunta 3</p>
                </div>
                <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold transition-colors">
                  Revisar
                </button>
              </div>

              <div className="p-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Elena Díaz <span className="text-[10px] text-slate-500 font-mono">#4105</span></p>
                  <p className="text-[10px] text-slate-400 truncate">Eval. Continua 1 • Rúbrica</p>
                </div>
                <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold transition-colors">
                  Revisar
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>• Autoguardado hace 2 min</span>
              <button className="text-blue-400 font-bold hover:underline">VER BITÁCORA</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}