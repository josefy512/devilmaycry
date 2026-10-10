import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  DollarSign, 
  Award, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  FlaskConical, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export default function DireccionLayout() {
  const [activeSection, setActiveSection] = useState('panel');
  const [facultadFiltro, setFacultadFiltro] = useState('Todas');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Opciones del menú lateral de Dirección
  const menuItems = [
    { id: 'panel', label: 'Panel Estratégico', icon: LayoutDashboard },
    { id: 'facultades', label: 'Facultades y Carreras', icon: Building2 },
    { id: 'docentes', label: 'Personal Docente', icon: Users },
    { id: 'presupuesto', label: 'Presupuesto y Finanzas', icon: DollarSign },
    { id: 'acreditacion', label: 'Calidad y Acreditación', icon: Award },
    { id: 'consejo', label: 'Consejo Universitario', icon: Calendar },
  ];

  const facultades = [
    'Vista General del Campus', 
    'Facultad de Ingeniería', 
    'Ciencias de la Salud', 
    'Artes y Humanidades', 
    'Negocios y Gestión'
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      
      {/* 1. HEADER GLOBAL SUPERIOR */}
      <header className="h-16 border-b border-slate-800 bg-[#131927] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-[#0B0F17] border border-slate-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-600/30">
              E
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-sm block leading-none">EduCore</span>
              <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase block mt-0.5">SISTEMA DIRECTIVO</span>
            </div>
          </div>
        </div>

        {/* Buscador Global y Perfil del Rector/Director */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Universidad Central • Sede Central</span>
          </div>

          <button className="p-2 text-slate-400 hover:text-white relative bg-[#0B0F17] border border-slate-800 rounded-xl">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500"></span>
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-300">
              RV
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white leading-none">Dr. Ricardo Valdivia</p>
              <p className="text-[10px] text-slate-400 mt-0.5">RECTORADO INSTITUCIONAL</p>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL: SIDEBAR + CONTENIDO */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. SIDEBAR IZQUIERDO DE COMANDO EJECUTIVO */}
        <aside className={`
          fixed lg:static inset-y-16 left-0 z-30
          w-64 bg-[#131927] border-r border-slate-800 flex flex-col justify-between p-4
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
                COMANDO EJECUTIVO
              </p>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#0B0F17]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* 3. VISTA PRINCIPAL DEL PANEL DE DIRECCIÓN */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {activeSection === 'panel' && (
            <div className="space-y-6">
              
              {/* Header Interno del Panel */}
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

                {/* Buscador y Filtros */}
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

              {/* Tarjetas de Alertas Críticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#131927] border border-amber-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                        ALERTA PRESUPUESTAL • CIENCIAS MÉDICAS
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">Presupuesto de Facultad al 94.6% de ejecución</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Umbral trimestral alcanzado con 18 días de anticipación. Requiere reasignación del Fondo de Contingencia para prácticas clínicas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-500 text-[11px]">Plazo límite: <strong className="text-slate-300">72 hrs</strong></span>
                    <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl font-semibold transition-colors flex items-center gap-1">
                      <span>Revisar Partida Presupuestal</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#131927] border border-blue-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                        AUDITORÍA VRAC / SUNEDU
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">Evaluaciones Docentes del Semestre: 12 cátedras pendientes</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Cierre de auditoría para las Facultades de Ingeniería y Humanidades. Garantiza la emisión de actas de grado académico.
                      </p>
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

              {/* KPIs Principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Asistencia General</span>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-extrabold text-white">94.8%</p>
                    <span className="text-xs font-semibold text-emerald-400">Conforme</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[94.8%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500">Matrícula Universitaria: <strong className="text-slate-300">8,420 activos</strong></p>
                </div>

                <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Personal Docente Activo</span>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-extrabold text-white">142 <span className="text-sm font-normal text-slate-500">/ 145</span></p>
                    <span className="text-xs font-semibold text-slate-400">3 Sabáticas</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[97.9%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500">48 Princ. • 62 Asoc. • 32 Aux.</p>
                </div>

                <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ejecución Presupuestal</span>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-extrabold text-white">S/ 4.28M</p>
                    <span className="text-xs font-bold text-amber-400">78.4%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[78.4%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-500">Superávit Caja: <strong className="text-emerald-400">+S/ 340,200</strong></p>
                </div>

                <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Índice de Calidad</span>
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

              {/* Gráfico y Asistente */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Gráfico de Tendencia (8 cols) */}
                <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white">Evolución de Rendimiento y Promedios por Carrera</h3>
                    <span className="text-xs text-slate-400 font-mono">2025-I / 2026-II</span>
                  </div>

                  <div className="h-48 w-full bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 relative flex flex-col justify-between">
                    <div className="h-full w-full relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="400" y2="0" stroke="#1E293B" strokeDasharray="3 3" />
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#1E293B" strokeDasharray="3 3" />
                        <path d="M 0 30 Q 130 25, 260 20 T 400 15" fill="none" stroke="#10B981" strokeWidth="3" />
                        <path d="M 0 50 Q 130 40, 260 35 T 400 25" fill="none" stroke="#3B82F6" strokeWidth="3" />
                        <path d="M 0 70 Q 130 65, 260 55 T 400 45" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="4 2" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl">
                      <span className="text-[11px] font-bold text-white block">Ciencias Médicas</span>
                      <p className="text-lg font-extrabold text-emerald-400">16.4</p>
                    </div>
                    <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl">
                      <span className="text-[11px] font-bold text-white block">Ing. Sistemas & IA</span>
                      <p className="text-lg font-extrabold text-blue-400">15.8</p>
                    </div>
                    <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl">
                      <span className="text-[11px] font-bold text-white block">Arquitectura & Urb.</span>
                      <p className="text-lg font-extrabold text-amber-400">15.2</p>
                    </div>
                    <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl">
                      <span className="text-[11px] font-bold text-white block">Gestión & Finanzas</span>
                      <p className="text-lg font-extrabold text-purple-400">14.9</p>
                    </div>
                  </div>
                </div>

                {/* Asistente IA (4 cols) */}
                <div className="lg:col-span-4 bg-[#131927] border border-blue-500/40 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-xs font-bold text-white uppercase">Asistente Estratégico Decanal</h3>
                    <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono font-bold px-2 py-0.5 rounded">PREDICTIVO</span>
                  </div>

                  <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1 text-xs">
                    <span className="text-amber-400 font-bold block">● ALERTA PREVENTIVA</span>
                    <p className="text-slate-300 leading-relaxed">
                      "Se recomienda asignar un 15% más de recursos a tutorías de Cálculo en Ingeniería."
                    </p>
                  </div>

                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30">
                    Ejecutar Plan Rectoral
                  </button>
                </div>

              </div>

            </div>
          )}

          {activeSection !== 'panel' && (
            <div className="p-12 text-center bg-[#131927] border border-slate-800 rounded-2xl">
              <h2 className="text-xl font-bold text-white">Sección {activeSection.toUpperCase()} en Desarrollo</h2>
              <p className="text-xs text-slate-400 mt-1">Conectando base de datos institucional multi-tenant...</p>
            </div>
          )}
        </main>

      </div>

    </div>
  );
}