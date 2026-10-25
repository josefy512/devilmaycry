import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle2, 
  BarChart3, 
  AlertTriangle, 
  User, 
  Users, 
  FileText, 
  Download, 
  UploadCloud, 
  Star 
} from 'lucide-react';

export default function TareasProyectos() {
  const [activeTab, setActiveTab] = useState('Pendientes');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('urgent');
  const [highPriorityOnly, setHighPriorityOnly] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior (Breadcrumbs, Ciclo, Buscador y Usuario) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span>Académico</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Tareas y Entregables</span>
          <span className="ml-2 px-3 py-1 bg-slate-800 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
            • CICLO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por tarea, curso o docente..." 
              className="w-full bg-[#131B2E] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-[#131B2E] border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              AM
            </div>
            <div className="hidden sm:block text-xs">
              <p className="font-semibold text-slate-200">Alex Morgan</p>
              <p className="text-slate-500">Ciclo VII</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Título Principal y Acciones */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white">Tareas y Entregables</h1>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold">
              5 Pendientes • 2 Urgentes
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Gestiona tus asignaciones, entregas de laboratorio y proyectos semestrales con control de plazos y retroalimentación docente.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#131B2E] border border-slate-800 hover:border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-all">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Calendario de Entregas</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            <span>Crear Recordatorio / Nota</span>
          </button>
        </div>
      </div>

      {/* 3. Tarjetas de Resumen (Métricas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tareas Pendientes */}
        <div className="bg-[#131B2E] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Tareas Pendientes</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">5</span>
              <span className="text-xs text-slate-400">activas</span>
            </div>
            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[11px] font-medium">
              2 urgentes
            </span>
          </div>
        </div>

        {/* Entregadas a Tiempo */}
        <div className="bg-[#131B2E] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Entregadas a Tiempo</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">14</span>
              <span className="text-xs text-slate-400">completas</span>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px] font-medium">
              100% puntualidad
            </span>
          </div>
        </div>

        {/* Calificadas & Evaluadas */}
        <div className="bg-[#131B2E] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Calificadas & Evaluadas</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">12</span>
              <span className="text-xs text-slate-400">con nota</span>
            </div>
            <span className="text-xs text-emerald-400 font-medium">
              Promedio: 17.8/20
            </span>
          </div>
        </div>

        {/* Próximo Vencimiento */}
        <div className="bg-[#131B2E] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Próximo Vencimiento</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2">
            <p className="text-sm font-bold text-rose-400">Mañana, 23:59 hrs</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">Cálculo II • Taller N° 4</p>
          </div>
        </div>
      </div>

      {/* 4. Filtros y Control de Estado */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
        {/* Tabs de Filtro por Estado */}
        <div className="flex items-center gap-1 bg-[#131B2E] p-1 rounded-xl border border-slate-800 self-start">
          {[
            { id: 'Todas', label: 'Todas', count: 21 },
            { id: 'Pendientes', label: 'Pendientes', count: 5 },
            { id: 'Entregadas', label: 'Entregadas', count: 4 },
            { id: 'Calificadas', label: 'Calificadas', count: 12 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Selectores de Orden y Prioridad */}
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="bg-[#131B2E] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-slate-700"
          >
            <option value="all">Todos los cursos (5 activos)</option>
            <option value="mat204">Cálculo II (MAT-204)</option>
            <option value="civ301">Resistencia de Materiales (CIV-301)</option>
            <option value="fis102">Física II (FIS-102)</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#131B2E] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-slate-700"
          >
            <option value="urgent">Fecha de entrega (Más urgente)</option>
            <option value="recent">Más recientes</option>
          </select>

          <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={highPriorityOnly}
              onChange={(e) => setHighPriorityOnly(e.target.checked)}
              className="rounded bg-[#131B2E] border-slate-800 text-blue-600 focus:ring-0 focus:ring-offset-0"
            />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Alta prioridad</span>
          </label>
        </div>
      </div>

      {/* 5. Vista de dos columnas: Lista de Tareas (Izq) vs Detalle de Tarea (Der) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Lista de Tareas */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Mostrando 4 tareas en curso</span>
            <span>Orden: Urgencia</span>
          </div>

          {/* Tarea 1: Seleccionada / Activa */}
          <div className="bg-[#131B2E] border-2 border-blue-500 rounded-xl p-4 space-y-3 cursor-pointer shadow-lg shadow-blue-500/5 relative">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs font-semibold text-blue-400">Cálculo II (MAT-204) • Grupo 04</span>
              </div>
              <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-[10px] font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Vence en 26h
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm">Taller N° 4: Integrales Múltiples y Teorema de Green</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Resolución analítica de volúmenes mediante coordenadas polares y aplicación vectorial con software matemático.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">Informe Grupal</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[10px]">Pendiente</span>
              </div>
              <span className="text-slate-400 text-[11px]">Ponderación: <strong className="text-slate-200">15% EC2</strong></span>
            </div>
          </div>

          {/* Tarea 2 */}
          <div className="bg-[#131B2E] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 cursor-pointer transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span className="text-xs font-semibold text-slate-400">Resistencia de Materiales (CIV-301)</span>
              </div>
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[10px] font-semibold">
                Vence en 4 días
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-200 text-sm hover:text-white transition-colors">
                Laboratorio 3: Ensayos de Tracción y Deformación Uniaxial
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Curvas de esfuerzo vs deformación real para perfiles de acero estructural ASTM-A36.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">Individual</span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px]">Borrador guardado (1 adjunto)</span>
              </div>
              <span className="text-slate-500 text-[11px]">Vence: Vie 17, 18:00</span>
            </div>
          </div>

          {/* Tarea 3 */}
          <div className="bg-[#131B2E] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 cursor-pointer transition-all">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                <span className="text-xs font-semibold text-slate-400">Física II (FIS-102)</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full text-[10px] font-medium">
                Vence en 8 días
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-200 text-sm hover:text-white transition-colors">
                Resolución de Problemas: Leyes de la Termodinámica
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Guía de ejercicios sobre ciclos de Carnot, entropía y máquinas térmicas reversibles.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">Práctica Dirigida</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-500 rounded text-[10px]">No iniciado</span>
              </div>
              <span className="text-slate-500 text-[11px]">21 Octubre</span>
            </div>
          </div>

          {/* Tarea 4: Calificada */}
          <div className="bg-[#131B2E] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3 cursor-pointer transition-all opacity-80">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-semibold text-slate-400">Topografía Aplicada (CIV-205)</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-semibold">
                Calificado • 18.5 / 20
              </span>
            </div>

            <div>
              <h3 className="font-bold text-slate-300 text-sm">Levantamiento Topográfico: Poligonal Cerrada</h3>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Detalle de la Tarea Seleccionada */}
        <div className="lg:col-span-7 bg-[#131B2E] border border-slate-800 rounded-xl p-6 space-y-6">
          
          {/* Header del Detalle */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold">
                Cálculo II • MAT-204
              </span>
              <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Límite: Mañana 14 Oct, 23:59 PM (Queda 1d 02h)
              </span>
            </div>

            <h2 className="text-xl font-bold text-white">
              Taller N° 4: Integrales Múltiples y Teorema de Green
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> Prof. Dr. Ramiro Valdivia
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-500" /> Modalidad: <strong className="text-slate-300 font-medium">Grupal (3 integrantes)</strong>
              </span>
              <span>•</span>
              <span>Ponderación: <strong className="text-slate-200 font-medium">15% Promedio Parcial</strong></span>
            </div>
          </div>

          {/* Instrucciones del Docente */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Instrucciones del Docente
            </h4>
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-4 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>1. Desarrollar de forma analítica y ordenada los problemas 1 al 8 contenidos en la guía oficial adjunta.</p>
              <p>
                2. El informe final debe incluir: <strong className="text-white">Carátula oficial de la Facultad</strong>, formulación de integrales dobles y triples, procedimiento detallado paso a paso, gráficas computacionales (GeoGebra, Matlab o Python) para verificar los recintos de integración, y conclusiones de equipo.
              </p>
              <p className="text-blue-400 font-medium bg-blue-500/5 p-2 rounded border border-blue-500/10">
                • Solo un integrante del grupo debe subir la entrega final en formato PDF. Indicar los nombres y códigos de los miembros en la primera página.
              </p>
            </div>
          </div>

          {/* Materiales de Apoyo */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Materiales de Apoyo y Guías Descargables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Material 1 */}
              <div className="flex items-center justify-between p-3 bg-[#0B0F19] border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center font-bold text-xs text-rose-400">
                    PDF
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200 truncate max-w-[140px]">Guia_Taller4_Integrale...</p>
                    <p className="text-slate-500 text-[10px]">2.4 MB • Enunciados oficiales</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Material 2 */}
              <div className="flex items-center justify-between p-3 bg-[#0B0F19] border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-400">
                    DOC
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200 truncate max-w-[140px]">Plantilla_Caratula_FI_2...</p>
                    <p className="text-slate-500 text-[10px]">140 KB • Formato requerido</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Área de Carga de Archivos */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tu Entrega (Archivos Adjuntos)
              </h4>
              <span className="text-[11px] text-slate-500">Formatos: PDF, ZIP (Máx. 25MB)</span>
            </div>

            <div className="border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-[#0B0F19]/50 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Arrastra tu archivo PDF aquí o <span className="text-blue-400 underline">examina tus carpetas</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Asegúrate de revisar la carátula antes de subir la versión definitiva.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}