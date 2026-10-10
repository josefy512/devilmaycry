import TareasProyectos from './tareas_y_proyectos/tareas_y_proyectos';
import DocumentosView from "./documentos/documentos";
import DirectorioView from './directorio/directorio';
import { useState } from "react";
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
  Plus,
  AlertTriangle,
  Clock,
  Wifi,
  WifiOff,
  Menu,
  X
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
  | 'documentos';

type MenuItem = {
    id: SectionId;
    label: string;
    icon: React.ReactNode;
}

type MenuGroup ={
    title?: string;
    items: MenuItem[];
};

const menuGroups: MenuGroup[] = [
    {
        items: [
            {id: 'panel', label: 'Panel de control', icon: <LayoutDashboard className="h-4 w-4" /> }
        ]    
    },
   {
    title: 'ACADÉMICO',
    items: [
      { id: 'calendario', label: 'Calendario', icon: <Calendar className="h-4 w-4" /> },
      { id: 'tareas', label: 'Tareas y Proyectos', icon: <CheckSquare className="h-4 w-4" /> },
      { id: 'recursos', label: 'Recursos de estudio', icon: <BookOpen className="h-4 w-4" /> }
    ]
  },
  {
    title: 'COMUNIDAD',
    items: [
      { id: 'foros', label: 'Foros de discusión', icon: <MessageSquare className="h-4 w-4" /> },
      { id: 'directorio', label: 'Directorio', icon: <Users className="h-4 w-4" /> }
    ]
  },
  {
    title: 'CARRERA',
    items: [
      { id: 'progreso', label: 'Progreso', icon: <TrendingUp className="h-4 w-4" /> },
      { id: 'bolsa', label: 'Bolsa de trabajo', icon: <Briefcase className="h-4 w-4" /> },
      { id: 'documentos', label: 'Documentos', icon: <FileText className="h-4 w-4" /> }
    ]
  }
];

const PanelControlView = () => (
  <div className="space-y-6">
    {/* Tarjetas Superiores de Métricas */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Tarjeta 1: Tareas Pendientes */}
      <div className="rounded-2xl bg-slate-900 p-5 ring-1 ring-slate-800">
        <div className="flex items-center justify-between">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300">
            URGENTE
          </span>
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">Tareas Pendientes</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">5</span>
          <span className="text-xs font-medium text-amber-500">+2 nuevas</span>
        </div>
      </div>

      {/* Tarjeta 2: Próximo Examen */}
      <div className="rounded-2xl bg-slate-900 p-5 ring-1 ring-slate-800">
        <div className="flex items-center justify-between">
          <Clock className="h-6 w-6 text-blue-400" />
          <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300">
            2 DÍAS
          </span>
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">Próximo Examen</p>
        <h3 className="mt-1 text-2xl font-bold text-white">Cálculo II</h3>
      </div>

      {/* Tarjeta 3: Promedio Actual */}
      <div className="rounded-2xl bg-slate-900 p-5 ring-1 ring-slate-800">
        <div className="flex items-center justify-between">
          <TrendingUp className="h-6 w-6 text-emerald-400" />
          <span className="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300">
            GLOBAL
          </span>
        </div>
        <p className="mt-4 text-xs font-medium text-slate-400">Promedio Actual</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">16.8</span>
          <span className="text-xs font-medium text-emerald-400">+0.2%</span>
        </div>
      </div>
    </div>

    {/* Sección de Accesos Rápidos */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">Accesos Rápidos</h2>
        <button className="text-xs font-medium text-blue-400 hover:underline">
          Ver todas las herramientas
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-4 ring-1 ring-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <CheckSquare className="h-5 w-5" />
          </div>
          <h4 className="mt-3 font-semibold text-white text-sm">Subir Tarea</h4>
          <p className="text-xs text-slate-400 mt-0.5">Entrega tu proyecto final</p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 ring-1 ring-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Clock className="h-5 w-5" />
          </div>
          <h4 className="mt-3 font-semibold text-white text-sm">Horario Hoy</h4>
          <p className="text-xs text-slate-400 mt-0.5">Revisa tu próxima clase</p>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4 ring-1 ring-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h4 className="mt-3 font-semibold text-white text-sm">Biblioteca</h4>
          <p className="text-xs text-slate-400 mt-0.5">Buscar libro o recurso</p>
        </div>
      </div>
    </div>
  </div>
);


const PlaceholderView = ({ title }: { title: string }) => (
  <div className="rounded-2xl bg-slate-900 p-8 ring-1 ring-slate-800 text-center">
    <h2 className="text-xl font-bold text-white">{title}</h2>
    <p className="mt-2 text-sm text-slate-400">
      Módulo en desarrollo. Esta vista se conectará próximamente con el servidor.
    </p>
  </div>
);

export default function EstudianteDashboard() {
  const [active, setActive] = useState<SectionId>('panel');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isOnline] = useState<boolean>(navigator.onLine);

const renderView = () => {
    switch (active) {
      case 'panel':
        return <PanelControlView />;
      case 'calendario':
        return <PlaceholderView title="Calendario Académico" />;
      case 'tareas':
        return <TareasProyectos />;
      case 'recursos':
        return <PlaceholderView title="Recursos de Estudio y Biblioteca" />;
      case 'foros':
        return <PlaceholderView title="Foros de Discusión Estudiantil" />;
      case 'directorio':
        return <DirectorioView />;
      case 'progreso':
        return <PlaceholderView title="Mi Progreso Académico" />;
      case 'bolsa':
        return <PlaceholderView title="Bolsa de Trabajo Institucional" />;
      case 'documentos':
        return <DocumentosView />;
    }
  };

return (
    <div className="flex min-h-screen w-full bg-[#0b0f17] text-slate-100 font-sans">
      {/* Sidebar Lateral */}
      <aside
        className={`${
          mobileOpen ? 'fixed inset-0 z-50 block bg-slate-950/80 backdrop-blur-sm' : 'hidden'
        } md:relative md:block md:w-64 md:flex-shrink-0`}
      >
        <div className="flex h-full min-h-screen flex-col border-r border-slate-800 bg-[#0b0f17] p-4">
          {/* Header Sidebar */}
          <div className="flex items-center justify-between px-2 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-bold text-white text-sm">Espacio del Estudiante</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navegación por Grupos */}
          <nav className="mt-6 flex-1 space-y-6 overflow-y-auto px-1">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {group.title && (
                  <h4 className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
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
                        setMobileOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600/10 text-blue-400 font-semibold'
                          : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Perfil del Estudiante (Footer Sidebar) */}
          <div className="border-t border-slate-800 pt-4 mt-auto px-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                AM
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Alex Morgan</p>
                <p className="text-[10px] text-slate-400 truncate">Ingeniería Civil</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex min-h-screen flex-1 flex-col overflow-x-hidden">
        {/* Topbar Superior */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-[#0b0f17] px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar cursos, tareas..."
                className="w-full rounded-xl bg-slate-900 border-none py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span>{isOnline ? 'En línea' : 'Offline'}</span>
            </div>

            <button className="relative rounded-xl bg-slate-900 p-2 text-slate-400 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Nueva Tarea</span>
            </button>
          </div>
        </header>

        {/* Banner de Bienvenida y Cuerpo Principal */}
        <div className="flex-1 p-4 md:p-8 space-y-6">
          {active === 'panel' && (
            <div>
              <h1 className="text-2xl font-bold text-white">Hola, Alex 👋</h1>
              <p className="text-xs text-slate-400 mt-1">
                Aquí tienes el resumen de tu actividad académica para hoy.
              </p>
            </div>
          )}

          {renderView()}
        </div>
      </main>
    </div>
  );
}

