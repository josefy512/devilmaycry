import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import {
  BarChart3,
  FileCheck2,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Download,
  Menu,
  X,
  UserCheck,
  Clock,
  Sparkles,
} from 'lucide-react';

type Section = 'dashboard' | 'futs' | 'alumnos' | 'docentes' | 'resoluciones';

interface FUT {
  id: string;
  codigo: string;
  estudiante: string;
  carrera: string;
  asunto: string;
  fecha: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}

export default function DirectoresLayout() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [busquedaAlumno, setBusquedaAlumno] = useState('');

  // Cargar datos del Director desde localStorage
  const usuarioGuardado = localStorage.getItem('usuarioLogueado');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : {};
  const nombreDirector = usuario.nombres && usuario.apellidos 
    ? `${usuario.nombres} ${usuario.apellidos}` 
    : 'Director Institucional';
  const correoDirector = usuario.email || 'direccion@progresa.edu.pe';
  const institucionNombre = usuario.institucionNombre || usuario.institucion_nombre || 'Institución Educativa';
  const iniciales = usuario.nombres ? usuario.nombres.charAt(0) : 'D';

  // Estado inicial de FUTs cargando desde el localStorage compartido para la demo
  const [futs, setFuts] = useState<FUT[]>([]);

  useEffect(() => {
    const futsGuardados = localStorage.getItem('progresa_futs_demo');
    if (futsGuardados) {
      try {
        setFuts(JSON.parse(futsGuardados));
      } catch (e) {
        console.error("Error al leer los FUTs", e);
      }
    } else {
      // Datos por defecto si está vacío
      const futsIniciales: FUT[] = [
        { id: '1', codigo: 'FUT-2026-089', estudiante: 'Sosa Ortiz, Valentina', carrera: 'Computación e Informática', asunto: 'Justificación de inasistencia por salud', fecha: '24 Oct 2026', estado: 'pendiente' },
        { id: '2', codigo: 'FUT-2026-090', estudiante: 'Ramos Paredes, Mateo', carrera: 'Administración de Empresas', asunto: 'Solicitud de certificado de estudios', fecha: '25 Oct 2026', estado: 'pendiente' },
      ];
      setFuts(futsIniciales);
      localStorage.setItem('progresa_futs_demo', JSON.stringify(futsIniciales));
    }
  }, []);

  const actualizarFutsEnStorage = (nuevosFuts: FUT[]) => {
    setFuts(nuevosFuts);
    localStorage.setItem('progresa_futs_demo', JSON.stringify(nuevosFuts));
  };

  const handleAprobarFUT = (id: string) => {
    const actualizados = futs.map((f) => (f.id === id ? { ...f, estado: 'aprobado' as const } : f));
    actualizarFutsEnStorage(actualizados);
  };

  const handleRechazarFUT = (id: string) => {
    const actualizados = futs.map((f) => (f.id === id ? { ...f, estado: 'rechazado' as const } : f));
    actualizarFutsEnStorage(actualizados);
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('progresa_student_section');
    window.location.reload();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Ejecutivo', icon: BarChart3 },
    { id: 'futs', label: 'FUTs y Justificaciones', icon: FileCheck2 },
    { id: 'alumnos', label: 'Búsqueda de Alumnos', icon: Search },
    { id: 'docentes', label: 'Gestión de Personal', icon: Users },
    { id: 'resoluciones', label: 'Actas y Resoluciones', icon: FileText },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#000000] text-[#ffffff] font-sans antialiased selection:bg-[#1ed760] selection:text-[#000000]">
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#000000]/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ===== SIDEBAR PANEL ===== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#121212] p-3 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-3 py-4 mb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1ed760] text-[#000000] font-bold shadow-md">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#ffffff]">Progresa</span>
              <span className="text-[11px] font-semibold text-[#1ed760] uppercase tracking-wider">Control Director</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full p-1 text-[#b3b3b3] hover:text-[#ffffff] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-1 mb-6 rounded-[6px] bg-[#1f1f1f] p-3 transition-colors hover:bg-[#292929]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#333333] font-bold text-[#ffffff]">
              {iniciales}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#ffffff]">{nombreDirector}</p>
              <p className="truncate text-[11px] font-medium text-[#b3b3b3]">{correoDirector}</p>
            </div>
          </div>
        </div>

        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#73777c]">
          Gestión Principal
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as Section);
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-[#292929] text-[#ffffff]'
                    : 'text-[#b3b3b3] hover:bg-[#1f1f1f] hover:text-[#ffffff]'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-[#1ed760]' : 'text-[#73777c]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <button
            onClick={handleCerrarSesion}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffffff] px-4 py-2.5 text-xs font-bold text-[#000000] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#000000]">
        <header className="flex h-16 items-center justify-between px-6 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-full p-2 text-[#b3b3b3] hover:text-[#ffffff] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-[#ffffff] sm:text-base">
                Gestión Académica de Dirección
              </h1>
              <p className="flex items-center gap-1.5 text-xs font-medium text-[#b3b3b3]">
                <Building2 className="h-3.5 w-3.5 text-[#1ed760]" />
                {institucionNombre}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-[#121212] px-3 py-1 text-[11px] font-semibold text-[#1ed760] sm:flex border border-[#1f1f1f]">
              <span className="h-2 w-2 rounded-full bg-[#1ed760] animate-pulse" />
              Ciclo Lectivo 2026 Activo
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-[6px] bg-[#121212] p-5 transition-colors hover:bg-[#1f1f1f]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#b3b3b3]">Promedio General</span>
                    <TrendingUp className="h-4 w-4 text-[#1ed760]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#ffffff]">15.8</span>
                    <span className="rounded-full bg-[#1ed760]/15 px-2 py-0.5 text-[11px] font-semibold text-[#1ed760]">
                      +0.3 vs bimestre
                    </span>
                  </div>
                  <span className="mt-2 block text-[11px] text-[#73777c]">Rendimiento institucional consolidado</span>
                </div>

                <div className="rounded-[6px] bg-[#121212] p-5 transition-colors hover:bg-[#1f1f1f]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#b3b3b3]">% Asistencia Total</span>
                    <UserCheck className="h-4 w-4 text-[#1ed760]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#ffffff]">93.4%</span>
                    <span className="text-[11px] font-medium text-[#b3b3b3]">Estable</span>
                  </div>
                  <span className="mt-2 block text-[11px] text-[#73777c]">Asistencia diaria promedio global</span>
                </div>

                <div className="rounded-[6px] bg-[#121212] p-5 transition-colors hover:bg-[#1f1f1f]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#b3b3b3]">FUTs Pendientes</span>
                    <Clock className="h-4 w-4 text-[#b85850]" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#ffffff]">
                      {futs.filter((f) => f.estado === 'pendiente').length}
                    </span>
                    <span className="rounded-full bg-[#b85850]/20 px-2 py-0.5 text-[11px] font-semibold text-[#b85850]">
                      Requieren atención
                    </span>
                  </div>
                  <span className="mt-2 block text-[11px] text-[#73777c]">Trámites de alumnos por revisar</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-[6px] bg-[#121212] p-5 lg:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-[#ffffff]">Rendimiento por Especialidad / Nivel</h2>
                      <p className="text-xs text-[#b3b3b3]">Resumen de notas y asistencia consolidada</p>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-full bg-[#1f1f1f] px-3 py-1.5 text-xs font-semibold text-[#ffffff] hover:bg-[#292929]">
                      <Download className="h-3.5 w-3.5" />
                      Exportar PDF
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#1f1f1f] text-[#73777c]">
                          <th className="pb-3 font-semibold uppercase tracking-wider">Especialidad / Grado</th>
                          <th className="pb-3 font-semibold uppercase tracking-wider">Promedio</th>
                          <th className="pb-3 font-semibold uppercase tracking-wider">Asistencia</th>
                          <th className="pb-3 font-semibold uppercase tracking-wider">Estudiantes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1f1f1f]">
                        <tr className="hover:bg-[#1f1f1f]/50">
                          <td className="py-3 font-bold text-[#ffffff]">Computación e Informática</td>
                          <td className="py-3 font-bold text-[#1ed760]">16.2</td>
                          <td className="py-3 text-[#b3b3b3]">95.1%</td>
                          <td className="py-3 text-[#b3b3b3]">180</td>
                        </tr>
                        <tr className="hover:bg-[#1f1f1f]/50">
                          <td className="py-3 font-bold text-[#ffffff]">Administración de Empresas</td>
                          <td className="py-3 font-bold text-[#ffffff]">15.4</td>
                          <td className="py-3 text-[#b3b3b3]">92.8%</td>
                          <td className="py-3 text-[#b3b3b3]">210</td>
                        </tr>
                        <tr className="hover:bg-[#1f1f1f]/50">
                          <td className="py-3 font-bold text-[#ffffff]">Electrotecnia Industrial</td>
                          <td className="py-3 font-bold text-[#ffffff]">13.8</td>
                          <td className="py-3 text-[#b3b3b3]">89.4%</td>
                          <td className="py-3 text-[#b3b3b3]">145</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col rounded-[6px] bg-[#121212] p-5">
                  <h2 className="text-base font-bold text-[#ffffff]">Ficha Rápida de Alumno</h2>
                  <p className="mb-4 text-xs text-[#b3b3b3]">Búsqueda directa por DNI o Apellidos</p>

                  <div className="relative mb-4">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#73777c]" />
                    <input
                      type="text"
                      placeholder="Buscar por DNI o Apellido..."
                      value={busquedaAlumno}
                      onChange={(e) => setBusquedaAlumno(e.target.value)}
                      className="w-full rounded-full bg-[#1f1f1f] py-2 pl-10 pr-4 text-xs text-[#ffffff] placeholder-[#73777c] focus:bg-[#292929] focus:outline-none focus:ring-1 focus:ring-[#1ed760]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center rounded-[6px] bg-[#1f1f1f] p-4 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#1ed760] font-bold text-[#000000] text-lg">
                      VS
                    </div>
                    <h3 className="text-sm font-bold text-[#ffffff]">Valentina Sosa Ortiz</h3>
                    <p className="text-xs text-[#b3b3b3]">DNI: 74839201 • 3er Semestre</p>
                    <div className="mt-4 grid w-full grid-cols-2 gap-2 text-center">
                      <div className="rounded-[6px] bg-[#121212] p-2">
                        <span className="block text-[10px] text-[#73777c]">Asistencia</span>
                        <span className="text-xs font-bold text-[#1ed760]">96.5%</span>
                      </div>
                      <div className="rounded-[6px] bg-[#121212] p-2">
                        <span className="block text-[10px] text-[#73777c]">Nota Promedio</span>
                        <span className="text-xs font-bold text-[#ffffff]">18.4</span>
                      </div>
                    </div>
                    <button className="mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-[#ffffff] py-2 text-xs font-bold text-[#000000] hover:scale-[1.02] transition-transform">
                      Ver Expediente Completo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'futs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-lg font-bold text-[#ffffff]">Bandeja de Aprobación de FUTs</h2>
                  <p className="text-xs text-[#b3b3b3]">Revisión y firma digital de solicitudes institucionales en tiempo real</p>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-full bg-[#1ed760] px-3 py-1.5 text-xs font-bold text-[#000000]">
                    Pendientes ({futs.filter(f => f.estado === 'pendiente').length})
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {futs.length === 0 ? (
                  <p className="text-xs text-[#73777c] py-6 text-center">No hay trámites registrados en este momento.</p>
                ) : (
                  futs.map((fut) => (
                    <div
                      key={fut.id}
                      className="flex flex-col justify-between gap-4 rounded-[6px] bg-[#121212] p-4 transition-colors hover:bg-[#1f1f1f] sm:flex-row sm:items-center"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#1ed760]">{fut.codigo}</span>
                          <span className="text-xs text-[#73777c]">| {fut.fecha}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              fut.estado === 'pendiente'
                                ? 'bg-[#b85850]/20 text-[#b85850]'
                                : fut.estado === 'aprobado'
                                ? 'bg-[#1ed760]/20 text-[#1ed760]'
                                : 'bg-[#73777c]/20 text-[#73777c]'
                            }`}
                          >
                            {fut.estado.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#ffffff]">{fut.asunto}</h3>
                        <p className="text-xs text-[#b3b3b3]">
                          Solicitante: <strong className="text-[#ffffff]">{fut.estudiante}</strong> ({fut.carrera})
                        </p>
                      </div>

                      {fut.estado === 'pendiente' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRechazarFUT(fut.id)}
                            className="flex items-center gap-1 rounded-full border border-[#333333] px-3 py-1.5 text-xs font-semibold text-[#b3b3b3] hover:border-[#b85850] hover:text-[#b85850]"
                          >
                            <XCircle className="h-4 w-4" />
                            Observar
                          </button>
                          <button
                            onClick={() => handleAprobarFUT(fut.id)}
                            className="flex items-center gap-1 rounded-full bg-[#1ed760] px-4 py-1.5 text-xs font-bold text-[#000000] hover:scale-[1.02] transition-transform"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Aprobar y Firmar
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-[#73777c]">Trámite procesado</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeSection !== 'dashboard' && activeSection !== 'futs' && (
            <div className="flex h-64 flex-col items-center justify-center rounded-[6px] bg-[#121212] p-8 text-center">
              <Sparkles className="mb-3 h-8 w-8 text-[#1ed760]" />
              <h2 className="text-base font-bold text-[#ffffff]">Módulo de {navItems.find(i => i.id === activeSection)?.label}</h2>
              <p className="mt-1 max-w-sm text-xs text-[#b3b3b3]">
                Este panel está listo para consulta directa de la base de datos de {institucionNombre}.
              </p>
              <button
                onClick={() => setActiveSection('dashboard')}
                className="mt-4 rounded-full bg-[#ffffff] px-4 py-2 text-xs font-bold text-[#000000]"
              >
                Volver al Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}