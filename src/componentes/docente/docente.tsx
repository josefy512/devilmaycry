import React, { useState } from 'react';
import CalificacionesPanel from './calificaciones/calificaciones';
import AsistenciasPanel from "./asistencias/asistencias";
import HorariosPanel from "./horarios/horarios";
import CursosPanel from "./cursos/cursos";

import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Calendar, 
  BookOpen, 
  Award, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  AlertCircle, 
  TrendingUp, 
  MessageSquare, 
  FileCheck2, 
  Eye, 
  Clock, 
  Upload, 
  Send, 
  HelpCircle, 
  ChevronRight, 
  Menu, 
  X 
} from 'lucide-react';

type DocenteSectionId = 'panel' | 'calificaciones' | 'asistencias' | 'horarios' | 'cursos' | 'configuracion';

export default function DocentesLayout() {
  const [activeSection, setActiveSection] = useState<DocenteSectionId>('panel');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Obtener los datos del docente logueado desde el localStorage
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const nombreCompleto = `${usuario.nombres || 'Docente'} ${usuario.apellidos || ''}`.trim();
  const correoDocente = usuario.email || 'correo@progresa.edu.pe';
  
  // Calcular iniciales para el avatar (ej: "Juan Pérez" -> "JP")
  const iniciales = `${usuario.nombres?.[0] || ''}${usuario.apellidos?.[0] || ''}`.toUpperCase() || 'DC';

  const navigationItems = [
    { id: 'panel', label: 'Panel de control', icon: LayoutDashboard },
    { id: 'calificaciones', label: 'Calificaciones', icon: Award },
    { id: 'asistencias', label: 'Asistencias', icon: CheckSquare },
    { id: 'horarios', label: 'Horarios', icon: Calendar },
    { id: 'cursos', label: 'Mis Cursos', icon: BookOpen },
  ];

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('progresa_student_section');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex font-sans">
      
      {/* Overlay para cerrar el menú en móviles */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#131927] border-r border-slate-800/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Perfil del Docente en el Header del Sidebar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-blue-500/20">
                {iniciales}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-bold text-sm text-white truncate">{nombreCompleto}</h2>
                <p className="text-[11px] text-slate-400 truncate">{correoDocente}</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menú de Navegación Principal */}
          <nav className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as DocenteSectionId);
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

        {/* Sección Inferior: Configuración y Cerrar Sesión */}
        <div className="space-y-1.5 pt-4 border-t border-slate-800/80">
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
            <span>Configuración</span>
          </button>

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
      <div className="flex-1 flex flex-1 flex-col min-w-0">
        
        {/* Header Móvil */}
        <div className="lg:hidden bg-[#131927] border-b border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-400 hover:text-white bg-[#0B0F17] rounded-lg border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-white">Progresa • Docentes</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-xs text-white">
            {iniciales}
          </div>
        </div>

        {/* Contenido Dinámico de la Vista */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          {activeSection === 'panel' && <PanelControlDocente />}
          {activeSection === 'calificaciones' && <CalificacionesPanel />}
          {activeSection === 'asistencias' && <AsistenciasPanel />}
          {activeSection === 'horarios' && <HorariosPanel />}
          {activeSection === 'cursos' && <CursosPanel />}
        </main>

      </div>

    </div>
  );
}

{/* VISTA INTERNA: PANEL DE CONTROL DOCENTE */}
function PanelControlDocente() {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const especialidadMateria = usuario.especialidad || 'Especialidad General';

  return (
    <div className="space-y-6">
      
      {/* Header Superior y Buscador */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-slate-400 font-medium">Docente / Panel de Control</span>
          <h1 className="text-xl font-bold text-white tracking-tight">{especialidadMateria}</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar estudiante, curso, FUT... (Ctrl+K)" 
              className="w-full bg-[#131927] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button className="p-2.5 bg-[#131927] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors relative self-end sm:self-auto">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Indicadores Rápidos (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-[#131927] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Tareas por calificar</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">14</span>
            <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
              +3 desde ayer
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Pendientes de revisión en 2 cursos</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#131927] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Asistencia Promedio</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">92%</span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +1.2%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Promedio semanal consolidado</p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#131927] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Próxima Evaluación</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-bold text-white">Mañana</span>
            <p className="text-xs text-blue-400 font-medium truncate mt-0.5">Historia del Arte • Grupo 4B</p>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Examen Parcial Ponderado (25%)</p>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#131927] border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-4 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Tutorías Hoy</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-white">3</span>
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#131927] bg-slate-700 text-[10px] font-bold text-center leading-6 text-white">AG</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#131927] bg-blue-600 text-[10px] font-bold text-center leading-6 text-white">CR</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#131927] bg-indigo-600 text-[10px] font-bold text-center leading-6 text-white">ED</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Sesiones de reforzamiento agendadas</p>
        </div>

      </div>

      {/* Grid Principal: Clase + FUTs (Izquierda) | Agenda + Accesos (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Columna Izquierda (8 columnas) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tarjeta de Clase Próxima */}
          <div className="bg-gradient-to-r from-[#131927] via-[#162035] to-[#131927] border border-blue-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-blue-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    En 15 minutos
                  </span>
                  <span className="text-slate-400 font-medium">Aula 102 • Pabellón B</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Historia del Arte Moderno</h2>
                <p className="text-xs text-slate-400">Grupo 4B • Unidad 3: Impresionismo y Vanguardias</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Ver Sílabo</span>
                </button>
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Pasar Lista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de FUTs y Trámites */}
          <div className="bg-[#131927] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-blue-400" />
                  <span>Atención de FUTs y Justificaciones Médicas</span>
                </h3>
                <p className="text-xs text-slate-400">Trámites e incidencias de tus alumnos</p>
              </div>
              <button className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1">
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Estudiante</th>
                    <th className="py-2.5 px-3">Trámite / Asunto</th>
                    <th className="py-2.5 px-3">Fecha</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">AG</div>
                      <span>Ana García</span>
                    </td>
                    <td className="py-3 px-3">Entrega de Proyecto Final (Pase FUT)</td>
                    <td className="py-3 px-3 text-slate-400">Hoy, 9:00 AM</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-md font-semibold text-[10px]">
                        Pendiente FUT #4092
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="p-1.5 bg-[#0B0F17] hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-medium text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold">CR</div>
                      <span>Carlos Ruiz</span>
                    </td>
                    <td className="py-3 px-3">Justificante Médico (Salud)</td>
                    <td className="py-3 px-3 text-slate-400">Ayer</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-semibold text-[10px]">
                        Aprobado
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="p-1.5 bg-[#0B0F17] hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Columna Derecha (4 columnas) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Agenda del Día */}
          <div className="bg-[#131927] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Agenda de Hoy</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-500">10 OCT 2026</span>
            </div>

            <div className="space-y-4 pl-2 border-l-2 border-slate-800 relative">
              <div className="relative pl-4 space-y-1">
                <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#131927]"></div>
                <span className="text-[10px] font-bold text-blue-400">10:00 AM - 11:30 AM</span>
                <h4 className="text-xs font-bold text-white">Historia del Arte Moderno</h4>
                <p className="text-[11px] text-slate-400">Aula 102 • Grupo 4B</p>
              </div>

              <div className="relative pl-4 space-y-1">
                <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-[#131927]"></div>
                <span className="text-[10px] font-bold text-slate-400">12:00 PM - 01:30 PM</span>
                <h4 className="text-xs font-bold text-white">Técnicas de Pintura</h4>
                <p className="text-[11px] text-slate-400">Taller 3 • Grupo 2A</p>
              </div>
            </div>

            <button className="w-full py-2 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 transition-colors">
              Ver horario completo
            </button>
          </div>

          {/* Accesos Rápidos */}
          <div className="bg-[#131927] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Accesos Rápidos
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center gap-2 group transition-all">
                <Upload className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-300">Subir Material</span>
              </button>

              <button className="p-3 bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center gap-2 group transition-all">
                <Send className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-300">Enviar Anuncio</span>
              </button>

              <button className="p-3 bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center gap-2 group transition-all">
                <Award className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-300">Firmar Actas</span>
              </button>

              <button className="p-3 bg-[#0B0F17] hover:bg-slate-800/80 border border-slate-800/80 rounded-xl flex flex-col items-center justify-center gap-2 group transition-all">
                <HelpCircle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-semibold text-slate-300">Soporte</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}