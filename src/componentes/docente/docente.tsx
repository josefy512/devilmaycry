import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
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
  Sun,
  Moon
} from 'lucide-react';

type DocenteSectionId = 'panel' | 'calificaciones' | 'asistencias' | 'horarios' | 'cursos' | 'configuracion';

export default function DocentesLayout() {
  const [activeSection, setActiveSection] = useState<DocenteSectionId>('panel');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Estado para el Modo Oscuro / Claro (persiste en localStorage)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('progresa_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('progresa_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Obtener los datos del docente logueado
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const nombreCompleto = `${usuario.nombres || 'Docente'} ${usuario.apellidos || ''}`.trim();
  const correoDocente = usuario.email || 'correo@progresa.edu.pe';
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
    <div className={`min-h-screen flex font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
    }`}>
      
      {/* Overlay para cerrar el menú en móviles (al hacer clic fuera, se cierra limpiamente) */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* 1. BARRA LATERAL (SIDEBAR) - Limpia, sin X flotando */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r ${
          isDarkMode 
            ? 'bg-[#121722] border-slate-800/80 text-slate-100' 
            : 'bg-white border-slate-200 text-slate-800 shadow-xl lg:shadow-none'
        } ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Perfil del Docente */}
          <div className={`flex items-center gap-3 pb-4 border-b ${
            isDarkMode ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-blue-500/20">
              {iniciales}
            </div>
            <div className="overflow-hidden">
              <h2 className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{nombreCompleto}</h2>
              <p className={`text-[11px] truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{correoDocente}</p>
            </div>
          </div>

          {/* Menú de Navegación Principal */}
          <nav className="space-y-1">
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20' 
                      : isDarkMode 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sección Inferior: Tema, Configuración y Cerrar Sesión */}
        <div className={`space-y-1.5 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          
          {/* Botón alternar Modo Oscuro / Claro */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              isDarkMode ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
              <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-500/10 font-mono">Alt</span>
          </button>


          {/*

          <button
            onClick={() => {
              setActiveSection('configuracion');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeSection === 'configuracion'
                ? 'bg-blue-600 text-white font-semibold'
                : isDarkMode ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
*/}
          {/* AQUÍ TERMINA EL COMENTARIO */}
          <button
            onClick={handleCerrarSesion}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Móvil */}
        <div className={`lg:hidden border-b p-4 flex items-center justify-between ${
          isDarkMode ? 'bg-[#121722] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode ? 'bg-[#0B0F17] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Progresa • Docentes</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
            {iniciales}
          </div>
        </div>

        {/* Contenido Dinámico de la Vista */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 overflow-y-auto">
          {activeSection === 'panel' && <PanelControlDocente isDarkMode={isDarkMode} />}
          {activeSection === 'calificaciones' && <CalificacionesPanel />}
          {activeSection === 'asistencias' && <AsistenciasPanel />}
          {activeSection === 'horarios' && <HorariosPanel />}
          {activeSection === 'cursos' && <CursosPanel />}
        </main>

      </div>

    </div>
  );
}

{/* VISTA INTERNA: PANEL DE CONTROL DOCENTE CON SOPORTE DE TEMA */}
function PanelControlDocente({ isDarkMode }: { isDarkMode: boolean }) {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
  const especialidadMateria = usuario.especialidad || 'Especialidad General';

  // 🟢 Estado para guardar los FUTs aprobados desde Supabase
  const [futsAprobados, setFutsAprobados] = useState<any[]>([]);
  const [cargandoFuts, setCargandoFuts] = useState(false);

  useEffect(() => {
    const obtenerFutsAprobados = async () => {
      setCargandoFuts(true);
      const { data, error } = await supabase
        .from('futs')
        .select('*')
        .eq('estado', 'aprobado') // Solo los aprobados por la Directora
        .order('fecha_solicitud', { ascending: false });

      if (error) {
        console.error('Error al cargar FUTs aprobados para el docente:', error);
      } else if (data) {
        setFutsAprobados(data);
      }
      setCargandoFuts(false);
    };

    obtenerFutsAprobados();
  }, []);

  const cardStyle = `border rounded-2xl p-5 transition-all ${
    isDarkMode ? 'bg-[#121722] border-slate-800/80 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
  }`;

  return (
    <div className="space-y-6">
      
      {/* Header Superior y Buscador */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${
        isDarkMode ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Docente / Panel de Control</span>
          <h1 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{especialidadMateria}</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar estudiante, curso... (Ctrl+K)" 
              className={`w-full border rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                isDarkMode 
                  ? 'bg-[#121722] border-slate-800 text-slate-200 placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400'
              }`}
            />
          </div>

          <button className={`p-2.5 border rounded-xl relative self-end sm:self-auto transition-colors ${
            isDarkMode ? 'bg-[#121722] border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}>
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Tarjetas de Indicadores Rápidos (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tareas por calificar</span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>14</span>
            <span className="text-[10px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
              +3 desde ayer
            </span>
          </div>
          <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pendientes de revisión en 2 cursos</p>
        </div>

        {/* KPI 2 */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Asistencia Promedio</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>92%</span>
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +1.2%
            </span>
          </div>
          <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Promedio semanal consolidado</p>
        </div>

        {/* KPI 3 */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Próxima Evaluación</span>
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Mañana</span>
            <p className="text-xs text-blue-500 font-medium truncate mt-0.5">Historia del Arte • Grupo 4B</p>
          </div>
          <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Examen Parcial Ponderado (25%)</p>
        </div>

        {/* KPI 4 */}
        <div className={cardStyle}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tutorías Hoy</span>
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>3</span>
            <div className="flex -space-x-2 overflow-hidden">
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-blue-500 bg-slate-700 text-[10px] font-bold text-center leading-6 text-white">AG</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-blue-500 bg-blue-600 text-[10px] font-bold text-center leading-6 text-white">CR</div>
              <div className="inline-block h-6 w-6 rounded-full ring-2 ring-blue-500 bg-indigo-600 text-[10px] font-bold text-center leading-6 text-white">ED</div>
            </div>
          </div>
          <p className={`text-[11px] mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sesiones de reforzamiento agendadas</p>
        </div>

      </div>

      {/* Grid Principal: Clase + FUTs (Izquierda) | Agenda + Accesos (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Columna Izquierda (8 columnas) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tarjeta de Clase Próxima */}
          <div className={`border rounded-2xl p-5 relative overflow-hidden shadow-md ${
            isDarkMode ? 'bg-[#121722] border-blue-500/30 text-slate-100' : 'bg-gradient-to-br from-blue-900 to-slate-900 border-blue-900 text-white'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    En 15 minutos
                  </span>
                  <span className="text-slate-300 font-medium">Aula 102 • Pabellón B</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight">Historia del Arte Moderno</h2>
                <p className="text-xs text-slate-300">Grupo 4B • Unidad 3: Impresionismo y Vanguardias</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-300" />
                  <span>Ver Sílabo</span>
                </button>
                <button className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Pasar Lista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de FUTs y Trámites */}
          <div className={cardStyle}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-sm font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <FileCheck2 className="w-4 h-4 text-blue-500" />
                  <span>Atención de FUTs y Justificaciones Médicas</span>
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Trámites e incidencias de tus alumnos</p>
              </div>
              <button className="text-xs text-blue-500 font-semibold hover:underline flex items-center gap-1">
                <span>Ver todos</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead className={`uppercase text-[10px] tracking-wider border-b ${
                  isDarkMode ? 'bg-[#0B0F17] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  <tr>
                    <th className="py-2.5 px-3">Estudiante</th>
                    <th className="py-2.5 px-3">Trámite / Asunto</th>
                    <th className="py-2.5 px-3">Fecha</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {futsAprobados.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400 text-xs">
                      {cargandoFuts ? 'Cargando trámites aprobados...' : 'No hay FUTs aprobados por dirección disponibles.'}
                    </td>
                  </tr>
                ) : (
                  futsAprobados.map((fut) => (
                    <tr key={fut.id} className="transition-colors">
                      <td className="py-3 px-3 font-medium flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                          {fut.nombres_apellidos ? fut.nombres_apellidos.substring(0, 2).toUpperCase() : 'AL'}
                        </div>
                        <span>{fut.nombres_apellidos}</span>
                      </td>
                      <td className="py-3 px-3">{fut.sumilla}</td>
                      <td className="py-3 px-3 text-slate-400">
                        {new Date(fut.fecha_solicitud || Date.now()).toLocaleDateString('es-PE')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-md font-semibold text-[10px]">
                          Aprobado por Dirección
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button 
                          onClick={() => alert(`Fundamento del alumno: ${fut.fundamento}`)}
                          className={`p-1.5 border rounded-lg transition-colors ${
                            isDarkMode ? 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                          title="Ver detalle"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Columna Derecha (4 columnas) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Agenda del Día */}
          <div className={cardStyle}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Agenda de Hoy</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">10 OCT 2026</span>
            </div>

            <div className={`space-y-4 pl-2 border-l-2 relative my-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="relative pl-4 space-y-1">
                <div className={`absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ${isDarkMode ? 'ring-[#121722]' : 'ring-white'}`}></div>
                <span className="text-[10px] font-bold text-blue-500">10:00 AM - 11:30 AM</span>
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Historia del Arte Moderno</h4>
                <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Aula 102 • Grupo 4B</p>
              </div>

              <div className="relative pl-4 space-y-1">
                <div className={`absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-slate-500 ring-4 ${isDarkMode ? 'ring-[#121722]' : 'ring-white'}`}></div>
                <span className="text-[10px] font-bold text-slate-400">12:00 PM - 01:30 PM</span>
                <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Técnicas de Pintura</h4>
                <p className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Taller 3 • Grupo 2A</p>
              </div>
            </div>

            <button className={`w-full py-2 border rounded-xl text-xs font-medium transition-colors ${
              isDarkMode ? 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}>
              Ver horario completo
            </button>
          </div>

          {/* Accesos Rápidos */}
          <div className={cardStyle}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Accesos Rápidos
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Subir Material', icon: Upload, color: 'text-blue-500' },
                { label: 'Enviar Anuncio', icon: Send, color: 'text-emerald-500' },
                { label: 'Firmar Actas', icon: Award, color: 'text-purple-500' },
                { label: 'Soporte', icon: HelpCircle, color: 'text-amber-500' }
              ].map((acc, idx) => {
                const AccIcon = acc.icon;
                return (
                  <button key={idx} className={`p-3 border rounded-xl flex flex-col items-center justify-center gap-2 group transition-all ${
                    isDarkMode ? 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}>
                    <AccIcon className={`w-5 h-5 ${acc.color} group-hover:scale-110 transition-transform`} />
                    <span className={`text-[11px] font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}