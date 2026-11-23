import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import CalificacionesPanel from './calificaciones/calificaciones';
import AsistenciasPanel from './asistencias/asistencias';
import HorariosPanel from './horarios/horarios';
import CursosPanel from './cursos/cursos';

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Calendar,
  BookOpen,
  Award,
  LogOut,
  Search,
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
  Menu
} from 'lucide-react';

type DocenteSectionId = 'panel' | 'calificaciones' | 'asistencias' | 'horarios' | 'cursos';

interface FutAprobado {
  id: string | number;
  nombres_apellidos?: string;
  sumilla?: string;
  fundamento?: string;
  fecha_solicitud?: string;
}

export default function DocentesLayout() {
  const [activeSection, setActiveSection] = useState<DocenteSectionId>('panel');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
    } catch {
      return {};
    }
  })();

  const nombreCompleto =
    `${usuario.nombres || ''} ${usuario.apellidos || ''}`.trim() || 'Docente Institucional';
  const correoDocente = usuario.email || 'docente@institucion.edu.pe';
  const iniciales =
    `${usuario.nombres?.[0] || ''}${usuario.apellidos?.[0] || ''}`.toUpperCase() || 'DC';

  const navigationItems: Array<{
    id: DocenteSectionId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'panel', label: 'Panel de control', icon: LayoutDashboard },
    { id: 'calificaciones', label: 'Calificaciones', icon: Award },
    { id: 'asistencias', label: 'Asistencias', icon: CheckSquare },
    { id: 'horarios', label: 'Horarios', icon: Calendar },
    { id: 'cursos', label: 'Mis Cursos', icon: BookOpen }
  ];

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('progresa_student_section');
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex bg-[#0B1218] text-slate-200">
      {/* Overlay móvil */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
        />
      )}

      {/* Barra lateral institucional */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#0F1923] border-r border-slate-800 p-4 flex flex-col justify-between transition-transform duration-200 shrink-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-5">
          {/* Identificador del docente */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-xs text-[#A8D5EE] shrink-0">
              {iniciales}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-white truncate">{nombreCompleto}</h2>
              <p className="text-[11px] text-slate-400 truncate">{correoDocente}</p>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111C26]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#A8D5EE] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Cerrar sesión */}
        <div className="pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleCerrarSesion}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Cabecera móvil */}
        <div className="lg:hidden bg-[#0F1923] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md bg-[#111C26] border border-slate-800 text-slate-200 hover:border-slate-700 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-4 h-4" />
            </button>
            <span className="font-bold text-xs text-white truncate">
              Gestión Académica · Docentes
            </span>
          </div>

          <div className="w-8 h-8 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-xs text-[#A8D5EE] shrink-0">
            {iniciales}
          </div>
        </div>

        {/* Contenido dinámico */}
        <main className="p-4 sm:p-6 space-y-5 flex-1 min-w-0">
          {activeSection === 'panel' && (
            <PanelControlDocente onNavigate={(sec) => setActiveSection(sec)} />
          )}
          {activeSection === 'calificaciones' && <CalificacionesPanel />}
          {activeSection === 'asistencias' && <AsistenciasPanel />}
          {activeSection === 'horarios' && <HorariosPanel />}
          {activeSection === 'cursos' && <CursosPanel />}
        </main>
      </div>
    </div>
  );
}

function PanelControlDocente({
  onNavigate
}: {
  onNavigate: (sec: DocenteSectionId) => void;
}) {
  const usuario = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuarioLogueado') || '{}');
    } catch {
      return {};
    }
  })();

  const especialidadMateria = usuario.especialidad || 'Gestión Académica Docente';
  const [busqueda, setBusqueda] = useState('');
  const [futsAprobados, setFutsAprobados] = useState<FutAprobado[]>([]);
  const [cargandoFuts, setCargandoFuts] = useState(false);

  useEffect(() => {
    const obtenerFutsAprobados = async () => {
      setCargandoFuts(true);
      const { data, error } = await supabase
        .from('futs')
        .select('*')
        .eq('estado', 'aprobado')
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

  const futsFiltrados = futsAprobados.filter((fut) => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return true;
    return (
      (fut.nombres_apellidos || '').toLowerCase().includes(q) ||
      (fut.sumilla || '').toLowerCase().includes(q)
    );
  });

  const cardStyle = 'bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-5';

  return (
    <div className="space-y-5">
      {/* Cabecera del panel y buscador */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8D5EE]">
            Rol Docente · Periodo 2026-II
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5 truncate">
            {especialidadMateria}
          </h1>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Filtrar trámites o alumnos..."
            className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
          />
        </div>
      </div>

      {/* Indicadores numéricos sobrios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`${cardStyle} border-l-4 border-l-amber-400`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Entregas por revisar</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">14</span>
            <span className="text-[11px] font-semibold text-amber-300">Pendientes</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">Asignaturas activas del ciclo</p>
        </div>

        <div className={`${cardStyle} border-l-4 border-l-emerald-500`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Asistencia promedio</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2.5 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">92%</span>
            <span className="text-[11px] font-semibold text-emerald-300 inline-flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Consolidado
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">Registro semanal de sesiones</p>
        </div>

        <div className={`${cardStyle} border-l-4 border-l-[#0084C2]`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Próxima evaluación</span>
            <Calendar className="w-4 h-4 text-[#A8D5EE]" />
          </div>
          <div className="mt-2.5">
            <span className="text-base font-bold text-white">Programada</span>
            <p className="text-xs text-[#A8D5EE] font-medium truncate mt-0.5">
              Evaluación de unidad · Grupo 4B
            </p>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">Control de actas y notas</p>
        </div>

        <div className={`${cardStyle} border-l-4 border-l-[#002B45]`}>
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Consultas y tutorías</span>
            <MessageSquare className="w-4 h-4 text-[#A8D5EE]" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-white">3</span>
            <span className="text-[11px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30">
              Hoy
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">Atención académica programada</p>
        </div>
      </div>

      {/* Bloque principal: Sesión próxima + FUTs | Agenda + Accesos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Columna izquierda (8 cols) */}
        <div className="lg:col-span-8 space-y-5 min-w-0">
          {/* Sesión programada */}
          <div className="bg-[#111C26] border border-slate-800 border-l-4 border-l-[#0084C2] rounded-lg p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 font-semibold rounded text-[11px]">
                    Próxima sesión
                  </span>
                  <span className="text-slate-400">Aula 102 · Pabellón B</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  Sesión de Asignatura · Grupo 4B
                </h2>
                <p className="text-xs text-slate-400">
                  Unidad vigente · Control de asistencia y avance del sílabo
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onNavigate('cursos')}
                  className="px-3.5 py-2 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 rounded-md text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#A8D5EE]" />
                  <span>Ver cursos</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('asistencias')}
                  className="px-4 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Registrar asistencia</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de FUTs aprobados */}
          <div className={cardStyle}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#A8D5EE]" />
                  <span>FUTs y Justificaciones Aprobadas</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Solicitudes validadas por dirección vinculadas a tus estudiantes
                </p>
              </div>
              <span className="text-xs text-[#A8D5EE] font-semibold flex items-center gap-1">
                <span>{futsFiltrados.length} registro(s)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mt-3">
              <table className="w-full text-left text-xs min-w-[540px]">
                <thead className="uppercase text-[10px] tracking-wider bg-[#0B1218] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">Estudiante</th>
                    <th className="py-2.5 px-3 font-bold">Asunto / Sumilla</th>
                    <th className="py-2.5 px-3 font-bold">Fecha</th>
                    <th className="py-2.5 px-3 font-bold">Estado</th>
                    <th className="py-2.5 px-3 font-bold text-right">Detalle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {futsFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-5 text-center text-slate-400 text-xs">
                        {cargandoFuts
                          ? 'Cargando trámites aprobados...'
                          : 'No hay FUTs aprobados registrados por el momento.'}
                      </td>
                    </tr>
                  ) : (
                    futsFiltrados.map((fut) => {
                      const siglas = fut.nombres_apellidos
                        ? fut.nombres_apellidos.substring(0, 2).toUpperCase()
                        : 'AL';
                      return (
                        <tr key={fut.id} className="hover:bg-[#0B1218]/60 transition-colors">
                          <td className="py-3 px-3 font-semibold text-white">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center text-[10px] font-bold text-[#A8D5EE] shrink-0">
                                {siglas}
                              </span>
                              <span className="truncate">
                                {fut.nombres_apellidos || 'Estudiante'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3">{fut.sumilla || 'Solicitud registrada'}</td>
                          <td className="py-3 px-3 text-slate-400">
                            {new Date(fut.fecha_solicitud || Date.now()).toLocaleDateString('es-PE')}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded font-semibold text-[11px]">
                              Aprobado
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                alert(
                                  `Fundamento registrado: ${
                                    fut.fundamento || 'Sin detalle adicional.'
                                  }`
                                )
                              }
                              className="p-1.5 bg-[#0B1218] border border-slate-700/80 rounded text-slate-300 hover:text-white transition-colors"
                              title="Ver fundamento"
                              aria-label="Ver fundamento"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Columna derecha (4 cols) */}
        <div className="lg:col-span-4 space-y-5 min-w-0">
          {/* Agenda del día */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A8D5EE]" />
                <span>Agenda de Hoy</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">2026-II</span>
            </div>

            <div className="space-y-3.5 my-4">
              <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#A8D5EE]">
                  10:00 - 11:30
                </span>
                <h4 className="text-xs font-bold text-white">Sesión Teórica · Grupo 4B</h4>
                <p className="text-[11px] text-slate-400">Aula 102 · Pabellón B</p>
              </div>

              <div className="bg-[#0B1218] border border-slate-800 rounded-md p-3 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  12:00 - 13:30
                </span>
                <h4 className="text-xs font-bold text-white">Práctica Dirigida · Grupo 2A</h4>
                <p className="text-[11px] text-slate-400">Aula 204 · Pabellón A</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('horarios')}
              className="w-full py-2 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 rounded-md text-xs font-semibold text-slate-200 transition-colors"
            >
              Ver horario completo
            </button>
          </div>

          {/* Accesos rápidos */}
          <div className={cardStyle}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Accesos Rápidos
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('cursos')}
                className="p-3 bg-[#0B1218] border border-slate-800 hover:border-[#0084C2]/60 rounded-md flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Upload className="w-4 h-4 text-[#A8D5EE]" />
                <span className="text-xs font-medium text-slate-200">Material y cursos</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('calificaciones')}
                className="p-3 bg-[#0B1218] border border-slate-800 hover:border-[#0084C2]/60 rounded-md flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Award className="w-4 h-4 text-[#A8D5EE]" />
                <span className="text-xs font-medium text-slate-200">Calificaciones</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('asistencias')}
                className="p-3 bg-[#0B1218] border border-slate-800 hover:border-[#0084C2]/60 rounded-md flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4 text-[#A8D5EE]" />
                <span className="text-xs font-medium text-slate-200">Asistencias</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('horarios')}
                className="p-3 bg-[#0B1218] border border-slate-800 hover:border-[#0084C2]/60 rounded-md flex flex-col items-center justify-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#A8D5EE]" />
                <span className="text-xs font-medium text-slate-200">Cronograma</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}