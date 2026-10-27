import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileCheck2, 
  Users, 
  GraduationCap, 
  Building2, 
  Search, 
  Bell, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  LogOut, 
  Settings, 
  Menu, 
  Download,
  ChevronRight,
  Filter
} from 'lucide-react';

type DirectorSectionId = 'dashboard' | 'futs' | 'alumnos' | 'docentes' | 'resoluciones' | 'configuracion';

export default function DirectoresLayout() {
  const [activeSection, setActiveSection] = useState<DirectorSectionId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busquedaAlumno, setBusquedaAlumno] = useState('');

  // Cargar datos del Director logueado desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const nombreDirector = `${usuario.nombres || 'Dr. Ricardo'} ${usuario.apellidos || 'Méndez'}`.trim();
  const correoDirector = usuario.email || 'director@progresa.edu.pe';
  const institucionNombre = usuario.institucion_nombre || 'I.E. Emblemática San Martín';
  const iniciales = `${usuario.nombres?.[0] || 'D'}${usuario.apellidos?.[0] || 'R'}`.toUpperCase();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard Ejecutivo', icon: LayoutDashboard },
    { id: 'futs', label: 'FUTs y Justificaciones', icon: FileCheck2 },
    { id: 'alumnos', label: 'Búsqueda de Alumnos', icon: GraduationCap },
    { id: 'docentes', label: 'Gestión de Personal', icon: Users },
    { id: 'resoluciones', label: 'Actas y Resoluciones', icon: FileText },
  ];

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('progresa_student_section');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans">
      
      {/* Overlay Móvil (Cierra al hacer clic fuera) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#121722] border-r border-slate-800/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Perfil del Director */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-blue-500/20">
              {iniciales}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-sm text-white truncate">{nombreDirector}</h2>
              <p className="text-[11px] text-blue-400 font-medium truncate">Director Institucional</p>
            </div>
          </div>

          {/* Menú Principal */}
          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as DirectorSectionId);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sección Inferior: Configuración (Comentada) + Cerrar Sesión */}
        <div className="space-y-1.5 pt-4 border-t border-slate-800/80">
          
          {/* CONFIGURACIÓN OCULTA TEMPORALMENTE
          <button
            onClick={() => {
              setActiveSection('configuracion');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'configuracion'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Configuración del Centro</span>
          </button>
          */}

          <button
            onClick={handleCerrarSesion}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Superior Principal */}
        <header className="bg-[#121722] border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white bg-[#0B0F17] rounded-lg border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white tracking-tight">Gestión Académica de Dirección</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{institucionNombre}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ciclo Lectivo 2026 Activo
            </span>

            <button className="p-2.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Vistas Dinámicas */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          {activeSection === 'dashboard' && <DashboardEjecutivoDirector />}
          {activeSection === 'futs' && <BandejaFUTsDirector />}
          {activeSection === 'alumnos' && <BusquedaAlumnosView />}
          {activeSection === 'docentes' && <div className="p-8 text-center text-slate-400">Módulo de Personal Docente</div>}
          {activeSection === 'resoluciones' && <div className="p-8 text-center text-slate-400">Módulo de Actas y Resoluciones</div>}
        </main>

      </div>

    </div>
  );
}

{/* VISTA INTERNA 1: DASHBOARD EJECUTIVO */}
function DashboardEjecutivoDirector() {
  return (
    <div className="space-y-6">
      
      {/* KPIs Superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#121722] border border-slate-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Promedio General</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-white">15.8</span>
            <span className="text-xs font-semibold text-emerald-400 ml-3 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              +0.3 vs bimestre anterior
            </span>
          </div>
        </div>

        <div className="bg-[#121722] border border-slate-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">% Asistencia Total</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-white">93.4%</span>
            <span className="text-xs font-semibold text-emerald-400 ml-3 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Estable
            </span>
          </div>
        </div>

        <div className="bg-[#121722] border border-slate-800/80 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">FUTs Pendientes de Firma</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-amber-400">7</span>
            <span className="text-xs font-semibold text-amber-400 ml-3 bg-amber-500/10 px-2 py-0.5 rounded-md">
              Requiere atención
            </span>
          </div>
        </div>

      </div>

      {/* Grid Principal: Tabla de Rendimiento por Sección + Buscador Rápido de Alumnos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tabla Rendimiento Académico (8 cols) */}
        <div className="lg:col-span-8 bg-[#121722] border border-slate-800/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Rendimiento por Especialidad / Nivel</h3>
              <p className="text-xs text-slate-400">Resumen de notas y asistencia consolidada</p>
            </div>
            <button className="px-3 py-1.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Exportar PDF</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Especialidad / Grado</th>
                  <th className="py-2.5 px-3">Promedio</th>
                  <th className="py-2.5 px-3">Asistencia</th>
                  <th className="py-2.5 px-3 text-right">Estudiantes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-medium text-white">Computación e Informática</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">16.2</td>
                  <td className="py-3 px-3">95.1%</td>
                  <td className="py-3 px-3 text-right font-mono">180</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-medium text-white">Administración de Empresas</td>
                  <td className="py-3 px-3 text-blue-400 font-bold">15.4</td>
                  <td className="py-3 px-3">92.8%</td>
                  <td className="py-3 px-3 text-right font-mono">210</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-medium text-white">Electrotecnia Industrial</td>
                  <td className="py-3 px-3 text-amber-400 font-bold">13.8</td>
                  <td className="py-3 px-3">89.4%</td>
                  <td className="py-3 px-3 text-right font-mono">145</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Widget Búsqueda / Tarjeta Estudiante (4 cols) - Réplica exacta del panel derecho de la imagen */}
        <div className="lg:col-span-4 bg-[#121722] border border-slate-800/80 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Ficha Rápida de Alumno</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por DNI o Apellidos..." 
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tarjeta Estudiante Destacado */}
          <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/20">
              VS
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Valentina Sosa Ortiz</h4>
              <p className="text-[11px] text-slate-400">DNI: 74839201 • 3er Semestre</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div className="bg-[#121722] p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Asistencia</span>
                <span className="text-xs font-bold text-emerald-400">96.5%</span>
              </div>
              <div className="bg-[#121722] p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Nota Promedio</span>
                <span className="text-xs font-bold text-blue-400">18.4</span>
              </div>
            </div>

            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors">
              Ver Expediente Completo
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

{/* VISTA INTERNA 2: BANDEJA DE FUTS PARA FIRMA DEL DIRECTOR */}
function BandejaFUTsDirector() {
  return (
    <div className="bg-[#121722] border border-slate-800/80 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>FUTs Pendientes de Firma y Aprobación Directoral</span>
          </h2>
          <p className="text-xs text-slate-400">Trámites institucionales que requieren validez legal del Director</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Registro FUT 1 */}
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-md">
                PENDIENTE FIRMA
              </span>
              <span className="text-xs font-mono text-slate-400">FUT-2026-089</span>
            </div>
            <h3 className="font-bold text-sm text-white">Justificación por Inasistencia Médica (Salud)</h3>
            <p className="text-xs text-slate-400">Solicitante: <strong className="text-slate-200">Carlos Eduardo Ruiz</strong> • DNI: 72839401</p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Adjunto</span>
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aprobar y Firmar</span>
            </button>
          </div>
        </div>

        {/* Registro FUT 2 */}
        <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded-md">
                PENDIENTE FIRMA
              </span>
              <span className="text-xs font-mono text-slate-400">FUT-2026-092</span>
            </div>
            <h3 className="font-bold text-sm text-white">Solicitud de Examen Extemporáneo</h3>
            <p className="text-xs text-slate-400">Solicitante: <strong className="text-slate-200">Ana María García</strong> • DNI: 71029384</p>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <button className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Adjunto</span>
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Aprobar y Firmar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

{/* VISTA INTERNA 3: BÚSQUEDA DE ALUMNOS */}
function BusquedaAlumnosView() {
  return (
    <div className="bg-[#121722] border border-slate-800/80 rounded-2xl p-5 space-y-4">
      <h2 className="text-base font-bold text-white">Búsqueda General de Estudiantes</h2>
      <p className="text-xs text-slate-400">Consulte expedientes, estado de matrícula y notas por alumno</p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por DNI, Nombres o Apellidos..." 
            className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors">
          Filtrar Resultados
        </button>
      </div>
    </div>
  );
}