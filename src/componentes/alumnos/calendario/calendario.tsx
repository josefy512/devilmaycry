import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Calendar as CalendarIcon, 
  Download, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  FileText, 
  Video, 
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Upload
} from 'lucide-react';

export default function CalendarioView() {
  const [currentView, setCurrentView] = useState<'Mes' | 'Semana' | 'Agenda'>('Mes');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Días del mes de Octubre 2026 basados en el diseño
  const diasMes = [
    { dia: 28, otroMes: true }, { dia: 29, otroMes: true }, { dia: 30, otroMes: true }, 
    { dia: 1, otroMes: false }, { dia: 2, otroMes: false }, { dia: 3, otroMes: false }, { dia: 4, otroMes: false },
    { dia: 5, otroMes: false }, { dia: 6, otroMes: false }, { dia: 7, otroMes: false }, 
    { dia: 8, otroMes: false, evento: 'FER', titulo: 'Combate...', color: 'bg-purple-950/80 border-purple-800 text-purple-300' }, 
    { dia: 9, otroMes: false, evento: 'Lab', titulo: 'Lab Inicial', color: 'bg-slate-800/60 text-slate-300' }, 
    { dia: 10, otroMes: false }, { dia: 11, otroMes: false },
    { dia: 12, otroMes: false }, { dia: 13, otroMes: false, evento: 'Quiz', titulo: 'Quiz Hid...' }, 
    { dia: 14, otroMes: false, hoy: true, eventosList: ['• Ex. Par...', '• Taller N...'] }, 
    { dia: 15, otroMes: false }, 
    { dia: 16, otroMes: false, evento: 'Tutoría', titulo: 'Asesoría...' }, 
    { dia: 17, otroMes: false, evento: 'Lab', titulo: 'Lab 3: Tr...' }, { dia: 18, otroMes: false },
    { dia: 19, otroMes: false }, { dia: 20, otroMes: false, evento: 'Repaso', titulo: 'Repaso ...' }, 
    { dia: 21, otroMes: false, eventosList: ['PC2: Físi...', '+2 más'] }, 
    { dia: 22, otroMes: false }, { dia: 23, otroMes: false, evento: 'Avance', titulo: 'Avance ...' }, 
    { dia: 24, otroMes: false, evento: 'RECESO', titulo: 'Aniversa...', color: 'bg-purple-950/80 border-purple-800 text-purple-300' }, 
    { dia: 25, otroMes: false },
    { dia: 26, otroMes: false }, { dia: 27, otroMes: false }, { dia: 28, otroMes: false }, 
    { dia: 29, otroMes: false }, { dia: 30, otroMes: false }, { dia: 31, otroMes: false }, { dia: 1, otroMes: true }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior & Sincronización */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span>Académico</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Calendario Académico y Eventos</span>
          <span className="px-3 py-0.5 bg-blue-500/10 text-blue-400 rounded-full font-semibold border border-blue-500/20">
            • CICLO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar eventos, exámenes, entregas... (Ctrl+K)" 
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="p-2 bg-[#131927] border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              AM
            </div>
            <div className="hidden sm:block text-[11px]">
              <p className="font-semibold text-slate-200">Alex Morgan</p>
              <p className="text-slate-500">Ciclo VII</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Banner de Control y Acciones de Sincronización */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span>AGENDA UNIVERSITARIA</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sincronización en vivo
            </span>
          </div>
          <h1 className="text-lg font-bold text-white">Calendario Académico y Agenda</h1>
          <p className="text-xs text-slate-400">
            Monitoreo de evaluaciones, plazos de entrega y sesiones sincrónicas en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-[#1C2538] hover:bg-slate-800 border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition-colors">
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Exportar (.ICS / PDF)</span>
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-blue-600/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sincronizar Calendar</span>
          </button>
        </div>
      </div>

      {/* 3. Barra de Navegación de Mes y Filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#131927] border border-slate-800 rounded-2xl p-4">
        
        {/* Mes y Controles */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="p-1.5 bg-[#0B0F17] border border-slate-800 rounded-lg text-slate-400 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-[#0B0F17] border border-slate-800 rounded-lg text-slate-400 hover:text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-sm font-bold text-white">Octubre 2026</h3>
          <button className="px-2.5 py-1 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-semibold">
            HOY
          </button>
        </div>

        {/* Filtros por Tipo de Evento */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { id: 'Todos', label: 'Todos los eventos', count: 18 },
            { id: 'Examenes', label: 'Exámenes y Parciales', count: 4 },
            { id: 'Tareas', label: 'Entregas de Tareas', count: 8 },
            { id: 'Asesorias', label: 'Asesorías Docentes', count: 3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-[#0B0F17] text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}

          <button className="px-3 py-1.5 bg-purple-950/40 text-purple-300 border border-purple-800/60 rounded-lg font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-400">Feriados y Recesos</span> 3
          </button>
        </div>

        {/* Selector de Vista (Mes / Semana / Agenda) */}
        <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded-xl border border-slate-800 self-start lg:self-auto text-xs">
          {(['Mes', 'Semana', 'Agenda'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setCurrentView(v)}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                currentView === v ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v === 'Agenda' ? 'Agenda / Lista' : v}
            </button>
          ))}
        </div>

      </div>

      {/* 4. Estructura Principal: Calendario Visual (Izquierda) + Timeline de Vencimientos (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Cuadrícula del Mes (8 cols) */}
        <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
          
          {/* Cabecera de Días de la Semana */}
          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider py-2 border-b border-slate-800/80">
            <span>LUN</span>
            <span>MAR</span>
            <span>MIÉ</span>
            <span>JUE</span>
            <span>VIE</span>
            <span>SÁB</span>
            <span>DOM</span>
          </div>

                  {/* Días del Mes Grid */}
<div className="grid grid-cols-7 gap-1.5 auto-rows-fr">
  {diasMes.map((item, index) => (
    <div 
      key={index}
      className={`min-h-[60px] sm:min-h-[90px] p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between transition-all ${
        item.hoy 
          ? 'bg-blue-950/20 border-blue-500/60 shadow-lg shadow-blue-500/10' 
          : item.evento || item.color
            ? (item.color || 'bg-[#0B0F17] border-slate-800')
            : item.otroMes 
              ? 'bg-[#0B0F17]/40 border-slate-900 text-slate-600 opacity-40' 
              : 'bg-[#0B0F17] border-slate-800/80 text-slate-300 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[11px] sm:text-xs font-semibold ${item.hoy ? 'text-blue-400 font-bold bg-blue-500/20 px-1.5 py-0.2 rounded' : ''}`}>
          {item.dia}
        </span>
        {item.hoy && <span className="text-[8px] sm:text-[9px] font-bold text-blue-400">HOY</span>}
      </div>

      <div className="space-y-1">
        {item.titulo && (
          <div className="hidden sm:block text-[10px] font-medium truncate px-1 py-0.5 rounded bg-black/30">
            {item.titulo}
          </div>
        )}
        {(item.titulo || item.evento || item.eventosList) && (
          <div className="sm:hidden w-1.5 h-1.5 rounded-full bg-blue-400 mx-auto mt-1" />
        )}
      </div>
    </div>
  ))}
</div>
        </div>

        {/* COLUMNA DERECHA: Próximos Vencimientos y Horizontes de Entrega (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Próximos Vencimientos
            </h3>
            <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              5 Alertas Críticas
            </span>
          </div>

          <div className="space-y-3">
            
            {/* Vencimiento 1: Examen Parcial */}
            <div className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 transition-all">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> URGENTE • MAÑANA 09:00 AM
                </span>
                <span className="text-slate-500 font-mono">MAT-204</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Examen Parcial: Cálculo II</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Aula 304 - Pabellón B • Modalidad Presencial<br />
                  <strong className="text-slate-300">Ponderación:</strong> 25% del promedio final
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Ver Guía de Estudio y Temario</span>
                </button>
              </div>
            </div>

            {/* Vencimiento 2: Taller de Integrales */}
            <div className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 transition-all">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-blue-400 font-bold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> MAÑANA 23:59 HRS
                </span>
                <span className="text-slate-500 font-mono">Cálculo II</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Taller Nº 4: Integrales Múltiples</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Cátedra Dr. Ramiro Valdivia • Formato PDF grupal
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button className="w-full py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Entrega</span>
                </button>
              </div>
            </div>

            {/* Vencimiento 3: Asesoría */}
            <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3 transition-all">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> JUEVES 16 • 15:00 HRS
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px]">Enlace Listo</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Asesoría: Resistencia de Materiales</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Sesión de resolución de dudas con Ing. Martha Córdova
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}