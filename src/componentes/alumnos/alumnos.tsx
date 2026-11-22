import TareasProyectos from './tareas_y_proyectos/tareas_y_proyectos';
import RecursosDeEstudioView from "./recursos_de_estudio/recursos_de_estudio";
import BolsaDeTrabajoView from './bolsa_de_trabajo/bolsa_de_trabajo';
import CalendarioView from './calendario/calendario';
import DocumentosView from "./documentos/documentos";
import DirectorioView from './directorio/directorio';
import PagosView from './pagos/pagos';
import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckSquare,
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  Briefcase,
  FileText,
  Search,
  Bell,
  AlertTriangle,
  Clock,
  Wifi,
  WifiOff,
  Menu,
  X,
  LogOut,
  CreditCard,
  Home,
  ChevronRight,
  GraduationCap
} from "lucide-react";

type SectionId =
  | 'panel'
  | 'calendario'
  | 'tareas'
  | 'recursos'
  | 'foros'
  | 'directorio'
  | 'progreso'
  | 'bolsa'
  | 'documentos'
  | 'pagos';

type MenuItem = {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
};

type MenuGroup = {
  title?: string;
  items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
  {
    items: [
      { id: 'panel', label: 'Panel Principal', icon: <Home className="h-4 w-4" /> }
    ]
  },
  {
    title: 'GESTIÓN ACADÉMICA',
    items: [
      { id: 'calendario', label: 'Horario y Calendario', icon: <Calendar className="h-4 w-4" /> },
      { id: 'tareas', label: 'Tareas y Evaluaciones', icon: <CheckSquare className="h-4 w-4" /> },
      { id: 'recursos', label: 'Biblioteca y Recursos', icon: <BookOpen className="h-4 w-4" /> },
      { id: 'progreso', label: 'Record de Notas', icon: <TrendingUp className="h-4 w-4" /> }
    ]
  },
  {
    title: 'TRÁMITES Y TESORERÍA',
    items: [
      { id: 'pagos', label: 'Estado de Pagos', icon: <CreditCard className="h-4 w-4" /> },
      { id: 'documentos', label: 'Documentos y Constancias', icon: <FileText className="h-4 w-4" /> }
    ]
  },
  {
    title: 'COMUNIDAD Y CARRERA',
    items: [
      { id: 'foros', label: 'Comunicados Oficiales', icon: <MessageSquare className="h-4 w-4" /> },
      { id: 'directorio', label: 'Directorio Institucional', icon: <Users className="h-4 w-4" /> },
      { id: 'bolsa', label: 'Bolsa Laboral', icon: <Briefcase className="h-4 w-4" /> }
    ]
  }
];

const PanelControlView = ({ onNavigate }: { onNavigate: (sec: SectionId) => void }) => (
  <div className="space-y-6">
    {/* Indicadores principales en modo oscuro institucional */}
    <div>
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
        Situación Académica Actual
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Tarjeta 1: Tareas */}
        <div
          onClick={() => onNavigate('tareas')}
          className="cursor-pointer rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-amber-400 p-5 hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Actividades Pendientes</span>
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              Por entregar
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">5</span>
            <span className="text-xs font-medium text-amber-300">2 próximas a vencer</span>
          </div>
        </div>

        {/* Tarjeta 2: Próxima Evaluación */}
        <div
          onClick={() => onNavigate('calendario')}
          className="cursor-pointer rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-[#0084C2] p-5 hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Próxima Evaluación</span>
            <span className="inline-flex items-center gap-1 rounded bg-[#0084C2]/15 border border-[#0084C2]/35 px-2 py-0.5 text-[11px] font-semibold text-[#A8D5EE]">
              <Clock className="h-3 w-3" />
              En 2 días
            </span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold text-white truncate">Cálculo II</h3>
          <p className="mt-0.5 text-xs text-slate-400">Evaluación parcial programada</p>
        </div>

        {/* Tarjeta 3: Promedio */}
        <div
          onClick={() => onNavigate('progreso')}
          className="cursor-pointer rounded-lg bg-[#111C26] border border-slate-800 border-l-4 border-l-emerald-500 p-5 hover:border-slate-700 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Promedio Ponderado</span>
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              Aprobado
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">16.8</span>
            <span className="text-xs font-medium text-emerald-300">Periodo vigente</span>
          </div>
        </div>
      </div>
    </div>

    {/* Accesos Directos */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Accesos Frecuentes
        </h2>
        <button
          onClick={() => onNavigate('documentos')}
          className="text-xs font-semibold text-[#A8D5EE] hover:underline"
        >
          Ver trámites y documentos
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        <div
          onClick={() => onNavigate('tareas')}
          className="group flex items-center justify-between rounded-lg bg-[#111C26] border border-slate-800 p-4 hover:border-[#0084C2]/60 hover:bg-[#152330] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002B45] border border-[#0084C2]/40 text-[#A8D5EE]">
              <CheckSquare className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm truncate">Entrega de Tareas</h4>
              <p className="text-xs text-slate-400 truncate">Subir proyectos y prácticas</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#A8D5EE] transition-colors shrink-0" />
        </div>

        <div
          onClick={() => onNavigate('pagos')}
          className="group flex items-center justify-between rounded-lg bg-[#111C26] border border-slate-800 p-4 hover:border-[#0084C2]/60 hover:bg-[#152330] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0084C2] text-white">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm truncate">Pagos y Pensiones</h4>
              <p className="text-xs text-slate-400 truncate">Consultar cuotas y recibos</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#A8D5EE] transition-colors shrink-0" />
        </div>

        <div
          onClick={() => onNavigate('recursos')}
          className="group flex items-center justify-between rounded-lg bg-[#111C26] border border-slate-800 p-4 hover:border-[#0084C2]/60 hover:bg-[#152330] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002B45] border border-[#0084C2]/40 text-[#A8D5EE]">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm truncate">Material de Estudio</h4>
              <p className="text-xs text-slate-400 truncate">Sílabos, guías y bibliografía</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#A8D5EE] transition-colors shrink-0" />
        </div>
      </div>
    </div>
  </div>
);

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="rounded-lg bg-[#111C26] p-8 text-center border border-slate-800">
    <h2 className="text-base font-bold text-white">{title}</h2>
    <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
      Módulo habilitado en la estructura académica. Próximamente disponible con registros históricos.
    </p>
  </div>
);

export default function EstudianteDashboard() {
  const [studentUser, setStudentUser] = useState<{
    nombres: string;
    apellidos: string;
    codigo: string;
    carrera: string;
    institucionNombre?: string;
  } | null>(null);

  const nombreInstitucion = studentUser?.institucionNombre || 'Institución Educativa';

  useEffect(() => {
    const sessionData = localStorage.getItem('usuarioLogueado');
    if (sessionData) {
      try {
        setStudentUser(JSON.parse(sessionData));
      } catch (e) {
        console.error('Error al parsear el usuario logueado:', e);
      }
    }
  }, []);

  const fullName = studentUser
    ? `${studentUser.nombres} ${studentUser.apellidos}`
    : 'Alumno Registrado';

  const carrera = studentUser?.carrera || 'Programa de Estudios';
  const codigoAlumno = studentUser?.codigo || 'EST-2026';

  const getInitials = (name: string) => {
    if (!name) return 'ER';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const [active, setActive] = useState<SectionId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('progresa_student_section');
      return (saved as SectionId) || 'panel';
    }
    return 'panel';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof window !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigate = (sec: SectionId) => {
    setActive(sec);
    localStorage.setItem('progresa_student_section', sec);
    setMobileOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      for (const group of menuGroups) {
        const match = group.items.find((item) => item.label.toLowerCase().includes(q));
        if (match) {
          handleNavigate(match.id);
          setSearchQuery('');
          break;
        }
      }
    }
  };

  const renderView = () => {
    switch (active) {
      case 'panel':
        return <PanelControlView onNavigate={handleNavigate} />;
      case 'calendario':
        return <CalendarioView />;
      case 'tareas':
        return <TareasProyectos />;
      case 'recursos':
        return <RecursosDeEstudioView />;
      case 'foros':
        return <PlaceholderView title="Comunicados Oficiales" />;
      case 'directorio':
        return <DirectorioView />;
      case 'progreso':
        return <PlaceholderView title="Record de Notas y Avance Curricular" />;
      case 'bolsa':
        return <BolsaDeTrabajoView />;
      case 'documentos':
        return <DocumentosView />;
      case 'pagos':
        return <PagosView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0B1218] text-slate-200 font-sans overflow-hidden select-none">
      {/* Menú lateral oscuro institucional */}
      <aside
        className={`${
          mobileOpen ? 'fixed inset-0 z-50 block bg-black/70' : 'hidden'
        } md:relative md:block md:w-64 md:shrink-0 h-full`}
      >
        <div className="flex h-full w-64 flex-col bg-[#0F1923] border-r border-slate-800">
          {/* Cabecera azul marino estilo Registra */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#002B45] text-white border-b-4 border-[#0084C2]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#0F1923] border border-[#A8D5EE]/30 text-[#A8D5EE] font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-bold text-white text-sm" title={nombreInstitucion}>
                  {nombreInstitucion}
                </span>
                <span className="block text-[10px] text-[#A8D5EE] font-semibold uppercase tracking-wider">
                  Sistema Académico
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded p-1 text-slate-300 hover:text-white md:hidden shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navegación sin barra de scroll visible */}
          <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {group.title && (
                  <h4 className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                    {group.title}
                  </h4>
                )}
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#002B45] text-white border-l-4 border-[#0084C2]'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                      }`}
                    >
                      <span className={isActive ? 'text-[#A8D5EE]' : 'text-slate-500'}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Pie de perfil del alumno */}
          <div className="p-3 bg-[#0B1218]/70 border-t border-slate-800">
            <div className="flex items-center justify-between gap-2 p-2 rounded-md bg-[#111C26] border border-slate-800">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#002B45] border border-[#0084C2]/40 text-xs font-bold text-[#A8D5EE]">
                  {getInitials(fullName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">
                    {fullName}
                  </p>
                  <p className="truncate text-[10px] text-slate-400 font-medium">
                    Cód: {codigoAlumno}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem('usuarioLogueado');
                  localStorage.removeItem('progresa_student_section');
                  window.location.reload();
                }}
                title="Cerrar sesión"
                className="rounded p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <main className="flex h-full flex-1 flex-col overflow-hidden bg-[#0B1218]">
        {/* Barra superior oscura institucional */}
        <header className="flex h-16 shrink-0 items-center justify-between bg-[#0F1923] px-4 sm:px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md p-2 text-slate-300 hover:bg-slate-800 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Ir a módulo (ej. pagos, tareas)..."
                className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:border-[#0084C2] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Estado de red */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border ${
                isOnline
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Conectado</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5" />
                  <span>Modo sin conexión</span>
                </>
              )}
            </div>

            <button
              onClick={() => handleNavigate('foros')}
              title="Comunicados oficiales"
              className="relative rounded-md border border-slate-800 bg-[#111C26] p-2 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#0084C2]" />
            </button>
          </div>
        </header>

        {/* Área de contenido */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active === 'panel' && (
            <div className="rounded-lg bg-[#002B45] text-white p-5 sm:p-6 border-b-4 border-[#0084C2]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A8D5EE]">
                    Portal del Estudiante · Periodo Académico 2026
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    Bienvenido(a), {studentUser ? studentUser.nombres : 'Estudiante'}
                  </h1>
                  <p className="text-xs text-slate-200 mt-1">
                    {carrera} — {nombreInstitucion}
                  </p>
                </div>
              </div>
            </div>
          )}

          {renderView()}
        </div>

        {/* Franja inferior oscura con borde azul institucional */}
        <footer className="shrink-0 bg-[#0F1923] border-t border-[#0084C2]/40 px-6 py-2 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-[#A8D5EE]">Progresa App — Sistema de Gestión Académica</span>
          <span>Soporte institucional · Sincronización automática activa</span>
        </footer>
      </main>
    </div>
  );
}