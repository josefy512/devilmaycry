import React, { useState, useEffect } from 'react';
import { supabase } from "../../supabaseClient";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileCheck2, 
  Zap, 
  RotateCcw, 
  Search, 
  ShieldAlert, 
  FileText, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Info,
  ExternalLink,
  BellRing
} from 'lucide-react';

type EstadoAsistencia = 'P' | 'T' | 'F' | 'J';

interface Estudiante {
  num: string;
  nombre: string;
  condicion: string;
  avatar: string;
  colorAvatar: string;
  codigo: string;
  asistCiclo: number;
  estado: EstadoAsistencia;
  observacion: string;
  alertaDPI?: boolean;
  dpiAlcanzado?: boolean;
}

export default function AsistenciasPanel() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para FUTs dinámicos desde Supabase
  const [futsAprobados, setFutsAprobados] = useState<any[]>([]);
  const [cargandoFuts, setCargandoFuts] = useState(false);

  // Cargar FUTs aprobados por la Directora desde Supabase
  useEffect(() => {
    const cargarFutsAprobados = async () => {
      setCargandoFuts(true);
      const { data, error } = await supabase
        .from('futs')
        .select('*')
        .eq('estado', 'aprobado')
        .order('fecha_solicitud', { ascending: false });

      if (error) {
        console.error('Error al cargar FUTs aprobados:', error);
      } else if (data) {
        setFutsAprobados(data);
      }
      setCargandoFuts(false);
    };

    cargarFutsAprobados();
  }, []);

  // Estado inicial simulado de la lista de estudiantes
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    {
      num: '01',
      nombre: 'Ana García Méndez',
      condicion: 'Regular',
      avatar: 'AG',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2022-10492',
      asistCiclo: 96,
      estado: 'P',
      observacion: 'Normal'
    },
    {
      num: '02',
      nombre: 'Carlos Ruiz Dávila',
      condicion: 'Regular',
      avatar: 'CR',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2023-11884',
      asistCiclo: 88,
      estado: 'T',
      observacion: 'Ingreso 10:12 AM'
    },
    {
      num: '03',
      nombre: 'Elena Díaz Vargas',
      condicion: 'Regular',
      avatar: 'ED',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2021-09431',
      asistCiclo: 90,
      estado: 'J',
      observacion: 'FUT #4105 Aprobado (Salud)'
    },
    {
      num: '04',
      nombre: 'Sofía Morales Benítez',
      condicion: 'Riesgo Inminente',
      avatar: 'SM',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2024-20150',
      asistCiclo: 72,
      estado: 'F',
      observacion: 'Alerta DPI (28% faltas)',
      alertaDPI: true
    },
    {
      num: '05',
      nombre: 'Lucas Romero Quispe',
      condicion: 'Delegado de Aula',
      avatar: 'LR',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2022-10512',
      asistCiclo: 94,
      estado: 'P',
      observacion: 'Delegado Titular'
    },
    {
      num: '06',
      nombre: 'Mateo Fernández Solís',
      condicion: 'Inhabilitado',
      avatar: 'MF',
      colorAvatar: 'bg-rose-950 text-rose-400 border border-rose-800',
      codigo: '2020-05882',
      asistCiclo: 69,
      estado: 'F',
      observacion: 'DPI Alcanzado (31% Desaprobado)',
      dpiAlcanzado: true
    },
    {
      num: '07',
      nombre: 'Javier Mendoza Paz',
      condicion: 'En Seguimiento',
      avatar: 'JM',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2023-14205',
      asistCiclo: 75,
      estado: 'T',
      observacion: 'Riesgo preventivo 3 faltas'
    },
    {
      num: '08',
      nombre: 'Valeria Castro Silva',
      condicion: 'Destacado',
      avatar: 'VC',
      colorAvatar: 'bg-[#1E293B]',
      codigo: '2022-16789',
      asistCiclo: 98,
      estado: 'P',
      observacion: 'Asistencia perfecta'
    }
  ]);

  // Cambiar el estado de asistencia de un estudiante
  const handleCambiarEstado = (id: string, nuevoEstado: EstadoAsistencia) => {
    setEstudiantes(prev => prev.map(est => {
      if (est.codigo === id) {
        return { ...est, estado: nuevoEstado };
      }
      return est;
    }));
  };

  // Botón: Marcar Todos como Presentes
  const handleMarcarTodosPresentes = () => {
    setEstudiantes(prev => prev.map(est => ({ ...est, estado: 'P' })));
  };

  // Botón: Reiniciar Lista
  const handleReiniciarLista = () => {
    setEstudiantes(prev => prev.map(est => ({ ...est, estado: 'F' })));
  };

  // Cálculos dinámicos
  const totalPresentes = estudiantes.filter(e => e.estado === 'P').length;
  const totalTardanzas = estudiantes.filter(e => e.estado === 'T').length;
  const totalFaltas = estudiantes.filter(e => e.estado === 'F').length;
  const totalJustificados = estudiantes.filter(e => e.estado === 'J').length;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* 1. Header del Curso y Sesión Activa */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-blue-400 font-semibold tracking-wide uppercase">
              DISEÑO & DESARROLLO DE SOFTWARE • Grupo 4B • Aula 102 • Turno Mañana
            </p>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Historia del Arte Moderno</span>
              <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded">HAR-302</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                SESIÓN EN CURSO • 10:00 - 11:30 AM
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Sesión N° 12 de 32 • Viernes, 10 de Octubre de 2026</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3 h-3" /> Autoguardado Activo
              </span>
              <p className="text-[10px] text-slate-500">Sincronizado hace 1 min</p>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/25">
              <CheckCircle2 className="w-4 h-4" />
              <span>Guardar y Consolidar Asistencia</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Métricas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-800/80">
          
          <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-3">
            <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase">
              <span>MATRICULADOS</span>
              <Users className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">40</p>
            <p className="text-[10px] text-slate-500">100% matrícula activa</p>
          </div>

          <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-emerald-400 text-[10px] font-bold uppercase">
              <span>PRESENTES [P]</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{totalPresentes}</p>
            <p className="text-[10px] text-emerald-400">{Math.round((totalPresentes/40)*100)}% de asistencia</p>
          </div>

          <div className="bg-[#0B0F17] border border-amber-500/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-amber-400 text-[10px] font-bold uppercase">
              <span>TARDANZAS [T]</span>
              <Clock className="w-3.5 h-3.5" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{totalTardanzas}</p>
            <p className="text-[10px] text-slate-500">Tolerancia 15 min</p>
          </div>

          <div className="bg-[#0B0F17] border border-rose-500/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-rose-400 text-[10px] font-bold uppercase">
              <span>FALTAS [F]</span>
              <XCircle className="w-3.5 h-3.5" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{totalFaltas}</p>
            <p className="text-[10px] text-slate-500">Sin Justificación</p>
          </div>

          <div className="bg-[#0B0F17] border border-blue-500/30 rounded-xl p-3 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-blue-400 text-[10px] font-bold uppercase">
              <span>JUSTIFICADOS [J]</span>
              <FileCheck2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{totalJustificados}</p>
            <p className="text-[10px] text-blue-400">Con trámite FUT</p>
          </div>

        </div>
      </div>

      {/* 2. Barra de Herramientas del Docente + Matriz Principal (Grid 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Matriz de Marcaje de Asistencia (8 cols) */}
        <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          
          {/* Botones de acción masiva y Filtros */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleMarcarTodosPresentes}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Marcar Todos como Presentes</span>
              </button>

              <button 
                onClick={handleReiniciarLista}
                className="p-2 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                title="Reiniciar Lista"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, código..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#0B0F17] p-1 rounded-xl border border-slate-800 text-xs">
                {['Todos', 'Presentes', 'Tardanzas', 'Faltas', 'Justificados'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      activeFilter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Tabla de Estudiantes */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F17] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-2 text-center w-8">N°</th>
                  <th className="py-2.5 px-3">Estudiante</th>
                  <th className="py-2.5 px-2 text-center">Cód. Univ.</th>
                  <th className="py-2.5 px-2 text-center">Asist. Ciclo</th>
                  <th className="py-2.5 px-3 text-center">Marcaje de Asistencia</th>
                  <th className="py-2.5 px-3">Observación / Alerta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {estudiantes.map((est) => (
                  <tr key={est.codigo} className="hover:bg-slate-800/30 transition-colors">
                    
                    <td className="py-3 px-2 text-center font-mono text-slate-500 text-[11px]">{est.num}</td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${est.colorAvatar} flex items-center justify-center font-bold text-[10px] text-white shrink-0`}>
                          {est.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{est.nombre}</p>
                          <p className="text-[10px] text-slate-500">{est.condicion}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center font-mono text-slate-400 text-[11px]">{est.codigo}</td>

                    <td className="py-3 px-2 text-center font-mono font-bold">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        est.asistCiclo >= 90 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : est.asistCiclo >= 75 
                          ? 'bg-amber-500/10 text-amber-400' 
                          : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {est.asistCiclo}%
                      </span>
                    </td>

                    {/* Selector Interactivo de Marcaje P | T | F | J */}
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-center gap-1 bg-[#0B0F17] p-1 rounded-xl border border-slate-800/80 w-max mx-auto">
                        <button
                          onClick={() => handleCambiarEstado(est.codigo, 'P')}
                          className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                            est.estado === 'P'
                              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          P
                        </button>

                        <button
                          onClick={() => handleCambiarEstado(est.codigo, 'T')}
                          className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                            est.estado === 'T'
                              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          T
                        </button>

                        <button
                          onClick={() => handleCambiarEstado(est.codigo, 'F')}
                          className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                            est.estado === 'F'
                              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          F
                        </button>

                        <button
                          onClick={() => handleCambiarEstado(est.codigo, 'J')}
                          className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                            est.estado === 'J'
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          J
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {est.dpiAlcanzado ? (
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[10px] font-bold flex items-center gap-1 w-max">
                          <ShieldAlert className="w-3 h-3" /> DPI Alcanzado (31% Desaprobado)
                        </span>
                      ) : est.alertaDPI ? (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[10px] font-bold flex items-center gap-1 w-max">
                          <ShieldAlert className="w-3 h-3" /> Alerta (28% faltas)
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] truncate block max-w-[150px]">
                          {est.observacion}
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pie de Tabla */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span>Mostrando 8 de 40 estudiantes matriculados</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px]">Filas por página: 8</span>
              <div className="flex items-center gap-1 font-mono">
                <button className="p-1 bg-[#0B0F17] border border-slate-800 rounded"><ChevronLeft className="w-3.5 h-3.5" /></button>
                <span className="px-2 text-white">1 / 5</span>
                <button className="p-1 bg-[#0B0F17] border border-slate-800 rounded"><ChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMNA DERECHA: Monitor DPI + FUTs Dinámicos + Exportar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Panel Monitor DPI (Desaprobado por Inasistencias) */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Monitor DPI</h3>
              </div>
              <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded">
                3 Casos
              </span>
            </div>

            <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1">
              <p className="text-[11px] text-slate-400">
                Límite máximo permitido: <strong className="text-white">30% de inasistencias injustificadas</strong> (máx. 6 de 20 sesiones en el ciclo).
              </p>
            </div>

            <div className="space-y-3">
              
              {/* Caso 1: DPI Aplicado */}
              <div className="p-3 bg-[#0B0F17] border border-rose-900/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Mateo Fernández S.</span>
                  <span className="px-2 py-0.5 bg-rose-600 text-white font-extrabold text-[9px] rounded uppercase">
                    DPI APLICADO
                  </span>
                </div>
                <p className="text-[11px] text-rose-400">5 inasistencias acumuladas • 31% (Excedido)</p>
                <button className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-semibold transition-colors flex items-center justify-center gap-1">
                  <span>Ver Expediente</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Caso 2: Riesgo Crítico */}
              <div className="p-3 bg-[#0B0F17] border border-amber-900/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">Sofía Morales Benítez</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 font-bold text-[9px] rounded">
                    Riesgo Crítico
                  </span>
                </div>
                <p className="text-[11px] text-amber-400">4 inasistencias acumuladas • 28% (Límite 30%)</p>
                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800">
                  <span className="text-rose-400 font-semibold">A 1 falta de baja</span>
                  <button className="text-blue-400 font-bold hover:underline flex items-center gap-1">
                    <BellRing className="w-3 h-3" /> Notificar Alumno
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Solicitudes FUT Justificaciones del Día (DINÁMICO DESDE SUPABASE) */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Solicitudes FUT</h3>
              </div>
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded">
                {futsAprobados.length} Casos
              </span>
            </div>

            <div className="space-y-2.5 max-h-80 overflow-y-auto">
              {cargandoFuts ? (
                <p className="text-xs text-slate-500 text-center py-4">Cargando trámites de Supabase...</p>
              ) : futsAprobados.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No hay trámites FUT aprobados por el momento.</p>
              ) : (
                futsAprobados.map((fut) => (
                  <div key={fut.id} className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{fut.nombres_apellidos}</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Validado / Aprobado</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      <strong className="text-blue-400">{fut.codigo}</strong> • {fut.sumilla}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[9px] text-slate-500">
                      <span>{fut.carrera}</span>
                      <button 
                        onClick={() => alert(`Fundamento del alumno: ${fut.fundamento}`)}
                        className="text-blue-400 hover:underline font-semibold"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Reportes y Salida */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              Reportes y Salida
            </h3>

            <div className="flex items-center gap-3 p-3 bg-[#0B0F17] border border-slate-800 rounded-xl">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-extrabold text-xs text-white shrink-0">
                80%
              </div>
              <div>
                <p className="font-bold text-white text-xs">Asistencia General</p>
                <p className="text-[10px] text-slate-400">34 de 40 alumnos en aula o justificados</p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full py-2.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Exportar Registro (.xlsx)</span>
              </button>

              <button className="w-full py-2.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4 text-rose-400" />
                <span>Descargar Acta Oficial (PDF)</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}