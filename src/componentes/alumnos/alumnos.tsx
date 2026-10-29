import TareasProyectos from './tareas_y_proyectos/tareas_y_proyectos';
import RecursosDeEstudioView from "./recursos_de_estudio/recursos_de_estudio";
import BolsaDeTrabajoView from './bolsa_de_trabajo/bolsa_de_trabajo';
import CalendarioView from './calendario/calendario';
import DocumentosView from "./documentos/documentos";
import DirectorioView from './directorio/directorio';
import PagosView from './pagos/pagos';
import { useState, useEffect } from "react";
import { 
  LayoutDashboard,
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
  Play,
  Home,
  Compass
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
      { id: 'panel', label: 'Panel Principal', icon: <Home className="h-5 w-5" /> }
    ]    
  },
  {
    title: 'ACADÉMICO',
    items: [
      { id: 'calendario', label: 'Calendario', icon: <Calendar className="h-5 w-5" /> },
      { id: 'tareas', label: 'Tareas y Proyectos', icon: <CheckSquare className="h-5 w-5" /> },
      { id: 'recursos', label: 'Recursos de estudio', icon: <BookOpen className="h-5 w-5" /> }
    ]
  },
  {
    title: 'COMUNIDAD',
    items: [
      { id: 'foros', label: 'Comunicados', icon: <MessageSquare className="h-5 w-5" /> },
      { id: 'directorio', label: 'Directorio', icon: <Users className="h-5 w-5" /> }
    ]
  },
  {
    title: 'CARRERA',
    items: [
      { id: 'progreso', label: 'Progreso', icon: <TrendingUp className="h-5 w-5" /> },
      { id: 'bolsa', label: 'Bolsa de trabajo', icon: <Briefcase className="h-5 w-5" /> },
      { id: 'documentos', label: 'Documentos', icon: <FileText className="h-5 w-5" /> },
      { id: 'pagos', label: 'Pagos y Pensiones', icon: <CreditCard className="h-5 w-5" /> }
    ]
  }
];

const PanelControlView = () => (
  <div className="space-y-8">
    {/* Tarjetas Superiores estilo Spotify Grid */}
    <div>
      <h2 className="text-xl font-extrabold text-white mb-4 tracking-tight">Resumen de Hoy</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Tarjeta 1: Tareas Pendientes */}
        <div className="group relative overflow-hidden rounded-md bg-[#181818] p-5 hover:bg-[#282828] transition-all duration-300">
          <div className="flex items-center justify-between">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              Urgente
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tareas Pendientes</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">5</span>
            <span className="text-xs font-bold text-amber-400">+2 nuevas</span>
          </div>
        </div>

        {/* Tarjeta 2: Próximo Examen */}
        <div className="group relative overflow-hidden rounded-md bg-[#181818] p-5 hover:bg-[#282828] transition-all duration-300">
          <div className="flex items-center justify-between">
            <Clock className="h-6 w-6 text-[#1DB954]" />
            <span className="rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#1DB954] uppercase tracking-wider">
              En 2 días
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Próximo Examen</p>
          <h3 className="mt-1 text-2xl font-black text-white truncate">Cálculo II</h3>
        </div>

        {/* Tarjeta 3: Promedio Actual */}
        <div className="group relative overflow-hidden rounded-md bg-[#181818] p-5 hover:bg-[#282828] transition-all duration-300">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              Global
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Promedio Actual</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">16.8</span>
            <span className="text-xs font-bold text-[#1DB954]">+0.2%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Sección de Accesos Rápidos estilo Playlist Cards */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-white tracking-tight hover:underline cursor-pointer">
          Accesos Rápidos
        </h2>
        <button className="text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-wider">
          Ver todo
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Acceso 1 */}
        <div className="group relative rounded-md bg-[#181818] p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#282828] text-[#1DB954] group-hover:scale-105 transition-transform">
            <CheckSquare className="h-6 w-6" />
          </div>
          <h4 className="mt-4 font-bold text-white text-base">Subir Tarea</h4>
          <p className="text-xs text-zinc-400 mt-1 font-medium">Entrega tu proyecto final</p>
          
          {/* Botón flotante Play de Spotify */}
          <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg shadow-black/50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
            <Play className="h-5 w-5 fill-black translate-x-0.5" />
          </div>
        </div>

        {/* Acceso 2 */}
        <div className="group relative rounded-md bg-[#181818] p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#282828] text-blue-400 group-hover:scale-105 transition-transform">
            <Clock className="h-6 w-6" />
          </div>
          <h4 className="mt-4 font-bold text-white text-base">Horario Hoy</h4>
          <p className="text-xs text-zinc-400 mt-1 font-medium">Revisa tu próxima clase</p>

          <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg shadow-black/50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
            <Play className="h-5 w-5 fill-black translate-x-0.5" />
          </div>
        </div>

        {/* Acceso 3 */}
        <div className="group relative rounded-md bg-[#181818] p-4 hover:bg-[#282828] transition-all duration-300 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#282828] text-purple-400 group-hover:scale-105 transition-transform">
            <BookOpen className="h-6 w-6" />
          </div>
          <h4 className="mt-4 font-bold text-white text-base">Biblioteca</h4>
          <p className="text-xs text-zinc-400 mt-1 font-medium">Buscar libro o recurso</p>

          <div className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-lg shadow-black/50 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
            <Play className="h-5 w-5 fill-black translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="rounded-md bg-[#181818] p-8 text-center border border-zinc-800">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    <p className="mt-2 text-sm text-zinc-400">
      Módulo en desarrollo. Esta vista se conectará próximamente con el servidor.
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
    : 'Alumno Progresa';

  const carrera = studentUser?.carrera || 'Carrera Profesional';

  const getInitials = (name: string) => {
    if (!name) return 'AP';
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

  const renderView = () => {
    switch (active) {
      case 'panel':
        return <PanelControlView />;
      case 'calendario':
        return <CalendarioView />;
      case 'tareas':
        return <TareasProyectos />;
      case 'recursos':
        return <RecursosDeEstudioView />;
      case 'foros':
        return <PlaceholderView title="Comunicados" />;
      case 'directorio':
        return <DirectorioView />;
      case 'progreso':
        return <PlaceholderView title="Mi Progreso Académico" />;
      case 'bolsa':
        return <BolsaDeTrabajoView />;
      case 'documentos':
        return <DocumentosView />;
      case 'pagos':
        return <PagosView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 font-sans p-2 gap-2 overflow-hidden select-none">
      {/* Sidebar Estilo Spotify (Panel Izquierdo Independiente) */}
      <aside
        className={`${
          mobileOpen ? 'fixed inset-0 z-50 block bg-black/90 p-2' : 'hidden'
        } md:relative md:block md:w-64 md:flex-shrink-0 h-full`}
      >
        <div className="flex h-full flex-col rounded-lg bg-[#121212] p-3 border border-zinc-800/40">
          {/* Header Sidebar / Nombre Institución */}
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1DB954] text-black font-black">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate font-extrabold text-white text-sm" title={nombreInstitucion}>
                  {nombreInstitucion}
                </span>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Progresa App</span>
              </div>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-zinc-400 hover:text-white md:hidden shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navegación por Grupos (Spotify Library style) */}
          <nav className="flex-1 space-y-6 overflow-y-auto px-1 custom-scrollbar pt-2">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {group.title && (
                  <h4 className="px-3 text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase mb-2">
                    {group.title}
                  </h4>
                )}
                {group.items.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActive(item.id);
                        localStorage.setItem('progresa_student_section', item.id);
                        setMobileOpen(false);
                      }}
                      className={`flex w-full items-center gap-4 rounded-md px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-[#282828] text-white shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-[#181818]'
                      }`}
                    >
                      <span className={isActive ? 'text-[#1DB954]' : 'text-zinc-400'}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Perfil del Alumno (Estilo Bottom Bar Player) */}
          <div className="mt-auto pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between gap-3 p-2 rounded-md bg-[#181818] hover:bg-[#282828] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1DB954] text-xs font-black text-black">
                  {getInitials(fullName)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">
                    {fullName}
                  </p>
                  <p className="truncate text-[10px] text-zinc-400 font-medium">
                    {carrera}
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
                className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 transition-colors shrink-0"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido Principal (Panel Flotante Derecho estilo Spotify) */}
      <main className="flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-[#121212] border border-zinc-800/40">
        {/* Topbar Superior con Navegación y Búsqueda */}
        <header className="flex h-16 shrink-0 items-center justify-between bg-[#121212]/90 px-6 backdrop-blur-md border-b border-zinc-800/40 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Buscador Estilo Spotify Topbar */}
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="¿Qué quieres consultar hoy?"
                className="w-full rounded-full bg-[#242424] border-none py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-400 focus:ring-2 focus:ring-white focus:outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Estado de Conexión en línea / offline */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-300 ${
                isOnline
                  ? 'bg-[#1DB954]/10 text-[#1DB954] border border-[#1DB954]/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-[#1DB954]" />
                  <span>En línea</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                  <span>Desconectado</span>
                </>
              ) }
            </div>

            <button className="relative rounded-full bg-[#181818] p-2 text-zinc-400 hover:text-white hover:bg-[#282828] transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#1DB954]" />
            </button>
          </div>
        </header>

        {/* Cuerpo Principal del Dashboard */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
          {active === 'panel' && (
            <div className="bg-gradient-to-b from-zinc-800/40 to-transparent p-6 rounded-lg border border-zinc-800/30">
              <h1 className="text-3xl font-black text-white tracking-tight">
                ¡Buenas noches, {studentUser ? studentUser.nombres : 'Alumno'}!
              </h1>
              <p className="text-xs text-zinc-400 mt-1 font-semibold">
                Resumen de actividad académica en tiempo real.
              </p>
            </div>
          )}

          {renderView()}
        </div>
      </main>
    </div>
  );
}