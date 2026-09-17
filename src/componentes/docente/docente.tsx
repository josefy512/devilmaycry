import { useState } from 'react';
import {
  ClipboardList,
  Table,
  CheckSquare,
  FileWarning,
  UserX,
  GraduationCap,
  Wifi,
  WifiOff,
  Menu,
  X,
  CircleDot,
} from 'lucide-react';

// Vistas simuladas temporales para evitar que la app explote
const MisCursosView = () => <div className="p-4 bg-white rounded-xl shadow-sm">Gestión de Cursos y Asignaturas</div>;
const RegistroNotasView = () => <div className="p-4 bg-white rounded-xl shadow-sm">Módulo de Registro de Notas</div>;
const AsistenciaView = () => <div className="p-4 bg-white rounded-xl shadow-sm">Control e Historial de Asistencia</div>;
const FutsView = () => <div className="p-4 bg-white rounded-xl shadow-sm">Atención y Gestión de FUTs</div>;
const DesercionView = () => <div className="p-4 bg-white rounded-xl shadow-sm">Alertas Tempranas de Deserción</div>;

type SectionId = 'cursos' | 'notas' | 'asistencia' | 'futs' | 'desercion';

type Section = {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
};

const sections: Section[] = [
  { id: 'cursos', label: 'Mis Cursos', icon: <ClipboardList className="h-5 w-5" /> },
  { id: 'notas', label: 'Registro de Notas', icon: <Table className="h-5 w-5" /> },
  { id: 'asistencia', label: 'Control de Asistencia', icon: <CheckSquare className="h-5 w-5" /> },
  { id: 'futs', label: 'Atención de FUTs', icon: <FileWarning className="h-5 w-5" /> },
  { id: 'desercion', label: 'Alertas de Deserción', icon: <UserX className="h-5 w-5" /> },
];

export default function DocenteDashboard() {
  const [active, setActive] = useState<SectionId>('cursos');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnline] = useState(navigator.onLine);

  const activeLabel = sections.find((s) => s.id === active)?.label ?? '';

  const renderView = () => {
    switch (active) {
      case 'cursos': return <MisCursosView />;
      case 'notas': return <RegistroNotasView />;
      case 'asistencia': return <AsistenciaView />;
      case 'futs': return <FutsView />;
      case 'desercion': return <DesercionView />;
    }
  };

  const handleSelect = (id: SectionId) => {
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* ===== Sidebar ===== */}
      <aside
        className={`${
          mobileOpen ? 'fixed inset-0 z-50 block' : 'hidden'
        } md:relative md:block md:w-[40%] md:flex-shrink-0`}
      >
        {mobileOpen && (
          <div
            className="absolute inset-0 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <div className="relative flex h-full min-h-screen flex-col bg-[#0a1f44]">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-lg bg-white/10 p-2 text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="border-b border-white/10 px-6 py-7">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="truncate text-lg font-semibold text-white">Ing. Carlos Mendoza</h2>
                <p className="truncate text-sm text-blue-200/70">Sistemas e Informática</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-400/30">
                <CircleDot className="h-3 w-3" />
                Docente Activo
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-200 ring-1 ring-sky-400/30">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                PWA Sincronizado
              </span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => handleSelect(s.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/15 text-white shadow-md shadow-blue-900/30 ring-1 ring-white/20'
                          : 'text-blue-200/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className={isActive ? 'text-sky-300' : ''}>{s.icon}</span>
                      <span className="flex-1 text-left">{s.label}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 px-6 py-4">
            <p className="text-xs text-blue-200/40">Progresa PWA · Panel Docente v1.0</p>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex min-h-screen flex-1 flex-col md:w-[60%]">
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
          >
            <Menu className="h-4 w-4" />
            Menú
          </button>
          <span className="text-sm font-semibold text-slate-800">{activeLabel}</span>
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 md:hidden">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                active === s.id
                  ? 'bg-[#0a1f44] text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center justify-between border-b border-slate-200 bg-white px-8 py-5 md:flex">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{activeLabel}</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Semestre 2026-I · Sistemas e Informática
            </p>
          </div>
          <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
            isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {isOnline ? 'En línea' : 'Modo Offline'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}