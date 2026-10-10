import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  TrendingUp, 
  Users, 
  PieChart, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  Cpu, 
  FlaskConical, 
  Library, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

export default function DireccionPanel() {
  const [facultadFiltro, setFacultadFiltro] = useState('Todas');

  // Facultades para filtro rápido
  const facultades = [
    'Vista General del Campus', 
    'Facultad de Ingeniería', 
    'Ciencias de la Salud', 
    'Artes y Humanidades', 
    'Negocios y Gestión'
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans pb-8">
      
      {/* 1. HEADER SUPERIOR EJECUTIVO */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 rounded uppercase text-[10px]">
                GOBIERNO UNIVERSITARIO & DIRECCIÓN ACADÉMICA
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-mono text-[11px]">CICLO ESTRATÉGICO 2026-II</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Panel de Control Estratégico
            </h1>
            <p className="text-xs text-slate-400">
              Rectorado / Decanatura General • Supervisión de calidad académica, gestión de cátedras y balance presupuestal.
            </p>
          </div>

          {/* Acciones del Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              2 ALERTAS INSTITUCIONALES
            </span>

            <button className="px-3.5 py-2 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Informe Consolidado (.PDF)</span>
            </button>

            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nueva Resolución Decanal</span>
            </button>
          </div>

        </div>

        {/* Buscador de Expedientes y Filtros de Ámbito */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <span className="text-[10px] font-bold text-slate-500 uppercase mr-1 shrink-0">Ámbito:</span>
            {facultades.map((f, i) => (
              <button
                key={f}
                onClick={() => setFacultadFiltro(f)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  (facultadFiltro === f || (i === 0 && facultadFiltro === 'Todas'))
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar expedientes, resoluciones o actas..." 
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-8 pr-8 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-500 font-mono border border-slate-800 px-1 py-0.5 rounded">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* 2. TARJETAS DE ALERTAS CRÍTICAS (Presupuesto + Auditoría VRAC / SUNEDU) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Alerta 1: Presupuesto Ciencias Médicas */}
        <div className="bg-[#131927] border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                    ALERTA PRESUPUESTAL • CIENCIAS MÉDICAS
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">94.6% EJECUTADO</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  Presupuesto de Facultad al 94.6% de ejecución
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Umbral trimestral alcanzado con 18 días de anticipación. Requiere reasignación del Fondo de Contingencia para prácticas clínicas de internado.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-500 text-[11px]">Plazo límite de resolución: <strong className="text-slate-300">72 hrs</strong></span>
            <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-semibold transition-colors flex items-center gap-1">
              <span>Revisar Partida Presupuestal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Alerta 2: Evaluaciones VRAC / SUNEDU */}
        <div className="bg-[#131927] border border-blue-500/30 rounded-2xl p-4 relative overflow-hidden flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                    AUDITORÍA VRAC / SUNEDU
                  </span>
                  <span className="text-[10px] text-blue-400 font-bold">48H RESTANTES</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">
                  Evaluaciones Docentes del Semestre: 12 cátedras pendientes de validación
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Cierre de auditoría para las Facultades de Ingeniería y Humanidades. El cumplimiento oportuno garantiza la emisión regular de actas de grado.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-slate-500 text-[11px]">Ingeniería (7) • Humanidades (5)</span>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1">
              <span>Validar Actas Docentes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. BLOQUE DE METRICAS CLAVE (4 KPIs GENERALES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Asistencia General */}
        <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asistencia General</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +1.6% vs 2026-I
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-white">94.8%</p>
            <span className="text-xs font-semibold text-emerald-400">Conforme</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full w-[94.8%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">Matrícula Universitaria: <strong className="text-slate-300">8,420 activos</strong></p>
        </div>

        {/* KPI 2: Personal Docente Activo */}
        <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Personal Docente Activo</span>
            <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              97.9% en función
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-white">142 <span className="text-sm font-normal text-slate-500">/ 145</span></p>
            <span className="text-xs font-semibold text-slate-400">3 Sabáticas</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full w-[97.9%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">48 Princ. • 62 Asoc. • 32 Aux.</p>
        </div>

        {/* KPI 3: Ejecución Presupuestal */}
        <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ejecución Presupuestal</span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Meta Q3: 82%
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-white">S/ 4.28M</p>
            <span className="text-xs font-bold text-amber-400">78.4%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full w-[78.4%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">Superávit Caja: <strong className="text-emerald-400">+S/ 340,200</strong></p>
        </div>

        {/* KPI 4: Índice de Calidad */}
        <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Índice de Calidad</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Óptimo Decanal
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-extrabold text-white">8.7 <span className="text-sm font-normal text-slate-500">/ 10</span></p>
            <span className="text-xs font-bold text-emerald-400">Acreditada</span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[87%]"></div>
          </div>
          <p className="text-[10px] text-slate-500">Tasa Aprobación Global: <strong className="text-slate-300">88.2%</strong></p>
        </div>

      </div>

      {/* 4. SECCIÓN CENTRAL: EVOLUCIÓN DE RENDIMIENTO + ASISTENTE IA & AGENDA RECTORAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: EVOLUCIÓN ACADÉMICA Y PROMEDIOS POR CARRERA (8 Cols) */}
        <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">SUPERVISIÓN PEDAGÓGICA COMPARADA</span>
              <h3 className="text-base font-bold text-white tracking-tight">
                Evolución de Rendimiento y Promedios por Carrera
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#0B0F17] border border-slate-800 px-3 py-1 rounded-xl text-slate-300 font-mono">
                4 Semestres (2025-I / 2026-II)
              </span>
            </div>
          </div>

          {/* Gráfico SVG Vectorial de Tendencias */}
          <div className="space-y-2">
            <div className="h-52 w-full bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 relative flex flex-col justify-between">
              
              {/* Marcas de escala (Eje Y) */}
              <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-600">
                <span>20.0</span>
                <span>16.5</span>
                <span>14.0</span>
                <span>11.0</span>
              </div>

              {/* Contenedor del Gráfico SVG */}
              <div className="ml-8 h-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                  {/* Líneas horizontales de guía */}
                  <line x1="0" y1="0" x2="400" y2="0" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Línea 1: Ciencias Médicas (Verde) */}
                  <path d="M 0 35 Q 130 30, 260 28 T 400 22" fill="none" stroke="#10B981" strokeWidth="3" />
                  
                  {/* Línea 2: Ing. Sistemas e IA (Azul) */}
                  <path d="M 0 65 Q 130 50, 260 42 T 400 32" fill="none" stroke="#3B82F6" strokeWidth="3" />

                  {/* Línea 3: Arquitectura (Naranja) */}
                  <path d="M 0 80 Q 130 75, 260 68 T 400 55" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 2" />

                  {/* Puntos destacados en el último semestre */}
                  <circle cx="400" cy="22" r="4" fill="#10B981" />
                  <circle cx="400" cy="32" r="4" fill="#3B82F6" />
                  <circle cx="400" cy="55" r="4" fill="#F59E0B" />
                </svg>
              </div>

              {/* Etiquetas del Eje X */}
              <div className="ml-8 flex justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                <span>SEMESTRE 2025-I</span>
                <span>SEMESTRE 2025-II</span>
                <span>SEMESTRE 2026-I</span>
                <span className="text-blue-400 font-bold">SEMESTRE 2026-II (ACTUAL)</span>
              </div>
            </div>

            {/* Leyenda y Datos por Carrera */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] font-bold text-white">Ciencias Médicas</span>
                </div>
                <p className="text-lg font-extrabold text-emerald-400">16.4 <span className="text-[10px] font-normal text-slate-500">prom.</span></p>
                <p className="text-[10px] text-slate-400">Ratio Doc/Est: <strong className="text-slate-200">1:16</strong> • Alumnos: <strong className="text-slate-200">1,840</strong></p>
              </div>

              <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span className="text-[11px] font-bold text-white">Ing. Sistemas & IA</span>
                </div>
                <p className="text-lg font-extrabold text-blue-400">15.8 <span className="text-[10px] font-normal text-slate-500">prom.</span></p>
                <p className="text-[10px] text-slate-400">Ratio Doc/Est: <strong className="text-slate-200">1:24</strong> • Alumnos: <strong className="text-slate-200">2,610</strong></p>
              </div>

              <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-[11px] font-bold text-white">Arquitectura & Urb.</span>
                </div>
                <p className="text-lg font-extrabold text-amber-400">15.2 <span className="text-[10px] font-normal text-slate-500">prom.</span></p>
                <p className="text-[10px] text-slate-400">Ratio Doc/Est: <strong className="text-slate-200">1:20</strong> • Alumnos: <strong className="text-slate-200">1,490</strong></p>
              </div>

              <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                  <span className="text-[11px] font-bold text-white">Gestión & Finanzas</span>
                </div>
                <p className="text-lg font-extrabold text-purple-400">14.9 <span className="text-[10px] font-normal text-slate-500">prom.</span></p>
                <p className="text-[10px] text-slate-400">Ratio Doc/Est: <strong className="text-slate-200">1:28</strong> • Alumnos: <strong className="text-slate-200">2,480</strong></p>
              </div>
            </div>
          </div>

          {/* Bloque Inferior: Infraestructura y Laboratorios */}
          <div className="p-4 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-blue-400" />
                <span>Infraestructura y Laboratorios de Investigación en Marcha</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">ACREDITACIÓN SINEACE / ABET</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-[#131927] border border-slate-800/80 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">Centro de Simulación Clínica</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.2 rounded">OPERATIVO 98%</span>
                </div>
                <p className="text-[11px] text-slate-400">14 Estaciones de robótica médica con agenda cubierta para internistas.</p>
              </div>

              <div className="p-2.5 bg-[#131927] border border-slate-800/80 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">Cluster HPC de Supercómputo</span>
                  <span className="text-[9px] bg-blue-500/10 text-blue-400 font-bold px-1.5 py-0.2 rounded">CARGA 84%</span>
                </div>
                <p className="text-[11px] text-slate-400">Soporte a 18 proyectos doctorales y grupos de investigación CONCYTEC.</p>
              </div>

              <div className="p-2.5 bg-[#131927] border border-slate-800/80 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-200">Biblioteca Digital Centralizada</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-bold px-1.5 py-0.2 rounded">CONECTADO</span>
                </div>
                <p className="text-[11px] text-slate-400">Acceso activo a repositorios Scopus, IEEE Xplore y ScienceDirect.</p>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: ASISTENTE ESTRATÉGICO DE DECISIÓN & AGENDA DE RECTORADO (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tarjeta Asistente IA de Decisión */}
          <div className="bg-[#131927] border border-blue-500/40 rounded-2xl p-5 space-y-4 shadow-xl shadow-blue-950/20 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Asistente Estratégico Decanal</h3>
              </div>
              <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono font-bold px-2 py-0.5 rounded">PREDICTIVO</span>
            </div>

            {/* Recomendación 1 */}
            <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ALERTA PREVENTIVA DE RETENCIÓN
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Se recomienda asignar un <strong className="text-white">15% más de recursos</strong> a tutorías de Cálculo y Física en Ingeniería para mitigar el retiro estudiantil proyectado para la semana 10."
              </p>
              <button className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors pt-1">
                <span>Aplicar a Plan de Tutoría</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Recomendación 2 */}
            <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> OPTIMIZACIÓN DE AULAS & CAMPUS
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                "El traslado de <strong className="text-white">4 cátedras de turno mañana</strong> del Pabellón B al Pabellón C liberaría un 22% de consumo energético y racionaliza climatización."
              </p>
              <button className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors pt-1">
                <span>Generar Minuta Decanal</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ejecutar Plan Rectoral Recomendado</span>
            </button>
          </div>

          {/* Agenda Rectoral y Consejo Universitario */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Agenda Rectoral y Consejo</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">SEMANA 8</span>
            </div>

            <div className="space-y-3">
              
              {/* Evento 1 */}
              <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-amber-400 font-bold uppercase">HOY • 16:00 - 18:30</span>
                  <span className="px-2 py-0.2 bg-emerald-500/10 text-emerald-400 font-bold rounded">QUÓRUM (18)</span>
                </div>
                <h4 className="text-xs font-bold text-white">Sesión Ordinaria de Consejo Universitario</h4>
                <p className="text-[11px] text-slate-400">📍 Sala de Grados / Rectorado Central</p>
              </div>

              {/* Evento 2 */}
              <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">MAÑANA • 10:00 AM</span>
                  <span className="px-2 py-0.2 bg-blue-500/10 text-blue-400 font-bold rounded">POSTGRADO</span>
                </div>
                <h4 className="text-xs font-bold text-white">Sustentación de Tesis Doctoral Institucional</h4>
                <p className="text-[11px] text-slate-400">📍 Aula Magna • Doctorado en Inteligencia Artificial</p>
              </div>

              {/* Evento 3 */}
              <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">VIERNES • 11:30 AM</span>
                  <span className="px-2 py-0.2 bg-purple-500/10 text-purple-400 font-bold rounded">CALIDAD</span>
                </div>
                <h4 className="text-xs font-bold text-white">Comité de Acreditación Institucional (SINEACE)</h4>
                <p className="text-[11px] text-slate-400">📍 Auditorio Central de Decanatura</p>
              </div>

            </div>

            <button className="w-full py-2 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 pt-2">
              <span>Ver Agenda Rectoral Completa y Actas Previas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}