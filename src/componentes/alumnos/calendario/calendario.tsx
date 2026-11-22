import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Video,
  Plus,
  Pencil,
  Trash2,
  X,
  Calendar as CalendarIcon,
  List
} from 'lucide-react';

type TipoEvento = 'Examen' | 'Tarea' | 'Asesoria' | 'Feriado';

interface EventoCalendario {
  id: string;
  fecha: string; // YYYY-MM-DD
  titulo: string;
  tipo: TipoEvento;
  hora?: string;
  detalle?: string;
}

const STORAGE_KEY = 'progresa_eventos_calendario_v1';

const EVENTOS_INICIALES: EventoCalendario[] = [
  {
    id: 'ev-1',
    fecha: '2026-10-08',
    titulo: 'Combate de Angamos',
    tipo: 'Feriado',
    detalle: 'Feriado calendario nacional'
  },
  {
    id: 'ev-2',
    fecha: '2026-10-09',
    titulo: 'Laboratorio Inicial',
    tipo: 'Tarea',
    hora: '10:00',
    detalle: 'Reconocimiento de equipos y normas'
  },
  {
    id: 'ev-3',
    fecha: '2026-10-13',
    titulo: 'Quiz de Hidráulica',
    tipo: 'Examen',
    hora: '08:30',
    detalle: 'Evaluación corta en aula'
  },
  {
    id: 'ev-4',
    fecha: '2026-10-14',
    titulo: 'Examen Parcial: Cálculo II',
    tipo: 'Examen',
    hora: '09:00',
    detalle: 'Aula 304 - Pabellón B · Ponderación 25%'
  },
  {
    id: 'ev-5',
    fecha: '2026-10-14',
    titulo: 'Taller Nº 4: Integrales Múltiples',
    tipo: 'Tarea',
    hora: '23:59',
    detalle: 'Entrega en formato PDF grupal'
  },
  {
    id: 'ev-6',
    fecha: '2026-10-16',
    titulo: 'Asesoría: Resistencia de Materiales',
    tipo: 'Asesoria',
    hora: '15:00',
    detalle: 'Resolución de dudas con docente del curso'
  },
  {
    id: 'ev-7',
    fecha: '2026-10-17',
    titulo: 'Laboratorio 3: Tracción y Corte',
    tipo: 'Tarea',
    hora: '11:00',
    detalle: 'Registro de mediciones y ficha técnica'
  },
  {
    id: 'ev-8',
    fecha: '2026-10-20',
    titulo: 'Repaso General de Curso',
    tipo: 'Asesoria',
    hora: '16:30',
    detalle: 'Ejercicios propuestos de práctica'
  },
  {
    id: 'ev-9',
    fecha: '2026-10-21',
    titulo: 'PC2: Física Aplicada',
    tipo: 'Examen',
    hora: '10:00',
    detalle: 'Práctica calificada presencial'
  },
  {
    id: 'ev-10',
    fecha: '2026-10-23',
    titulo: 'Avance de Proyecto Integrador',
    tipo: 'Tarea',
    hora: '18:00',
    detalle: 'Revisión parcial de entregable'
  },
  {
    id: 'ev-11',
    fecha: '2026-10-24',
    titulo: 'Aniversario Institucional',
    tipo: 'Feriado',
    detalle: 'Actividad conmemorativa programada'
  }
];

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const toIsoDate = (year: number, monthIndex: number, day: number) => {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
};

const badgeTipo = (tipo: TipoEvento) => {
  switch (tipo) {
    case 'Examen':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    case 'Tarea':
      return 'bg-[#0084C2]/20 text-[#A8D5EE] border-[#0084C2]/40';
    case 'Asesoria':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Feriado':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  }
};

export default function CalendarioView() {
  const [eventos, setEventos] = useState<EventoCalendario[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Error al leer eventos del calendario:', e);
      }
    }
    return EVENTOS_INICIALES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
    } catch (e) {
      console.error('Error al guardar eventos del calendario:', e);
    }
  }, [eventos]);

  const [year, setYear] = useState<number>(2026);
  const [month, setMonth] = useState<number>(9); // Octubre (0-indexado)
  const [filtroTipo, setFiltroTipo] = useState<'Todos' | TipoEvento>('Todos');
  const [modoVista, setModoVista] = useState<'cuadricula' | 'lista'>('cuadricula');

  // Día seleccionado para inspeccionar / agregar / editar
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-14');
  const [panelDiaAbierto, setPanelDiaAbierto] = useState<boolean>(false);

  // Formulario de evento (crear o editar)
  const [editId, setEditId] = useState<string | null>(null);
  const [tituloForm, setTituloForm] = useState<string>('');
  const [tipoForm, setTipoForm] = useState<TipoEvento>('Tarea');
  const [horaForm, setHoraForm] = useState<string>('');
  const [detalleForm, setDetalleForm] = useState<string>('');

  const eventosFiltrados = useMemo(() => {
    if (filtroTipo === 'Todos') return eventos;
    return eventos.filter((ev) => ev.tipo === filtroTipo);
  }, [eventos, filtroTipo]);

  const eventosDelDiaSeleccionado = useMemo(() => {
    return eventos.filter((ev) => ev.fecha === selectedDate);
  }, [eventos, selectedDate]);

  // Celdas del mes (lunes a domingo)
  const celdasCalendario = useMemo(() => {
    const primerDiaMes = new Date(year, month, 1);
    const totalDiasMes = new Date(year, month + 1, 0).getDate();
    const diasMesAnterior = new Date(year, month, 0).getDate();

    // Lunes = 0 ... Domingo = 6
    const offsetInicio = (primerDiaMes.getDay() + 6) % 7;

    const celdas: Array<{
      fecha: string;
      dia: number;
      esMesActual: boolean;
    }> = [];

    for (let i = offsetInicio - 1; i >= 0; i--) {
      const d = diasMesAnterior - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      celdas.push({
        fecha: toIsoDate(prevYear, prevMonth, d),
        dia: d,
        esMesActual: false
      });
    }

    for (let d = 1; d <= totalDiasMes; d++) {
      celdas.push({
        fecha: toIsoDate(year, month, d),
        dia: d,
        esMesActual: true
      });
    }

    const resto = celdas.length % 7 === 0 ? 0 : 7 - (celdas.length % 7);
    for (let d = 1; d <= resto; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      celdas.push({
        fecha: toIsoDate(nextYear, nextMonth, d),
        dia: d,
        esMesActual: false
      });
    }

    return celdas;
  }, [year, month]);

  const limpiarFormulario = () => {
    setEditId(null);
    setTituloForm('');
    setTipoForm('Tarea');
    setHoraForm('');
    setDetalleForm('');
  };

  const abrirDia = (fechaIso: string) => {
    setSelectedDate(fechaIso);
    limpiarFormulario();
    setPanelDiaAbierto(true);
  };

  const iniciarEdicion = (ev: EventoCalendario) => {
    setEditId(ev.id);
    setTituloForm(ev.titulo);
    setTipoForm(ev.tipo);
    setHoraForm(ev.hora || '');
    setDetalleForm(ev.detalle || '');
  };

  const eliminarEvento = (id: string) => {
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
    if (editId === id) limpiarFormulario();
  };

  const guardarEvento = (e: React.FormEvent) => {
    e.preventDefault();
    const tituloLimpio = tituloForm.trim();
    if (!tituloLimpio) return;

    if (editId) {
      setEventos((prev) =>
        prev.map((ev) =>
          ev.id === editId
            ? {
                ...ev,
                titulo: tituloLimpio,
                tipo: tipoForm,
                hora: horaForm.trim() || undefined,
                detalle: detalleForm.trim() || undefined
              }
            : ev
        )
      );
      limpiarFormulario();
      return;
    }

    const nuevo: EventoCalendario = {
      id: `ev-${Date.now()}`,
      fecha: selectedDate,
      titulo: tituloLimpio,
      tipo: tipoForm,
      hora: horaForm.trim() || undefined,
      detalle: detalleForm.trim() || undefined
    };

    setEventos((prev) => [...prev, nuevo]);
    limpiarFormulario();
  };

  const cambiarMes = (delta: number) => {
    const nuevaFecha = new Date(year, month + delta, 1);
    setYear(nuevaFecha.getFullYear());
    setMonth(nuevaFecha.getMonth());
  };

  const irHoy = () => {
    const hoy = new Date();
    setYear(hoy.getFullYear());
    setMonth(hoy.getMonth());
    const isoHoy = toIsoDate(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    setSelectedDate(isoHoy);
  };

  const proximosEventos = useMemo(() => {
    return [...eventosFiltrados]
      .filter((ev) => ev.tipo !== 'Feriado')
      .slice(0, 4);
  }, [eventosFiltrados]);

  return (
    <div className="space-y-5">
      {/* Encabezado limpio del módulo */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Calendario Académico
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Selecciona un día para consultar actividades, agregar eventos o modificar registros.
          </p>
        </div>

        <button
          onClick={() => abrirDia(selectedDate)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0084C2] hover:bg-[#0073A8] text-white px-3.5 py-2 text-xs font-semibold transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Evento</span>
        </button>
      </div>

      {/* Barra de controles: mes, filtros y vista */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Navegación de mes */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <button
              onClick={() => cambiarMes(-1)}
              title="Mes anterior"
              className="rounded-md bg-[#0B1218] border border-slate-800 p-1.5 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => cambiarMes(1)}
              title="Mes siguiente"
              className="rounded-md bg-[#0B1218] border border-slate-800 p-1.5 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <span className="text-sm font-bold text-white min-w-[120px]">
            {MESES[month]} {year}
          </span>

          <button
            onClick={irHoy}
            className="rounded-md bg-[#002B45] border border-[#0084C2]/40 px-2.5 py-1 text-[11px] font-semibold text-[#A8D5EE] hover:bg-[#00385A] transition-colors"
          >
            Hoy
          </button>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {(
            [
              { id: 'Todos', label: 'Todos' },
              { id: 'Examen', label: 'Exámenes' },
              { id: 'Tarea', label: 'Tareas' },
              { id: 'Asesoria', label: 'Asesorías' },
              { id: 'Feriado', label: 'Feriados' }
            ] as const
          ).map((tab) => {
            const activo = filtroTipo === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFiltroTipo(tab.id)}
                className={`rounded-md px-3 py-1.5 font-semibold transition-colors ${
                  activo
                    ? 'bg-[#0084C2] text-white'
                    : 'bg-[#0B1218] text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Selector Cuadrícula / Lista */}
        <div className="flex items-center gap-1 rounded-md bg-[#0B1218] border border-slate-800 p-1 self-start lg:self-auto text-xs">
          <button
            onClick={() => setModoVista('cuadricula')}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-semibold transition-colors ${
              modoVista === 'cuadricula'
                ? 'bg-[#002B45] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Mes</span>
          </button>
          <button
            onClick={() => setModoVista('lista')}
            className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-semibold transition-colors ${
              modoVista === 'lista'
                ? 'bg-[#002B45] text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span>Lista</span>
          </button>
        </div>
      </div>

      {/* Cuerpo principal: Calendario + Actividades programadas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Columna izquierda (8 cols) */}
        <div className="lg:col-span-8 rounded-lg bg-[#111C26] border border-slate-800 p-4">
          {modoVista === 'cuadricula' ? (
            <>
              {/* Días de la semana en escritorio/tablet */}
              <div className="hidden sm:grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-2.5 border-b border-slate-800">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>

              {/* Cuadrícula en escritorio/tablet */}
              <div className="hidden sm:grid grid-cols-7 gap-1.5 pt-2.5">
                {celdasCalendario.map((celda) => {
                  const evsDia = eventosFiltrados.filter((ev) => ev.fecha === celda.fecha);
                  const esSeleccionado = celda.fecha === selectedDate;

                  return (
                    <button
                      type="button"
                      key={celda.fecha}
                      onClick={() => abrirDia(celda.fecha)}
                      className={`min-h-[88px] rounded-md border p-2 text-left flex flex-col justify-between transition-colors ${
                        esSeleccionado
                          ? 'bg-[#002B45]/70 border-[#0084C2]'
                          : celda.esMesActual
                            ? 'bg-[#0B1218] border-slate-800/90 hover:border-slate-700'
                            : 'bg-[#0B1218]/40 border-slate-900 text-slate-600 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-bold ${
                            esSeleccionado ? 'text-[#A8D5EE]' : 'text-slate-300'
                          }`}
                        >
                          {celda.dia}
                        </span>
                        {evsDia.length > 0 && (
                          <span className="text-[10px] font-semibold text-[#A8D5EE]">
                            {evsDia.length}
                          </span>
                        )}
                      </div>

                      <div className="w-full space-y-1 mt-1">
                        {evsDia.slice(0, 2).map((ev) => (
                          <div
                            key={ev.id}
                            className={`truncate rounded px-1.5 py-0.5 text-[10px] font-medium border ${badgeTipo(ev.tipo)}`}
                          >
                            {ev.titulo}
                          </div>
                        ))}
                        {evsDia.length > 2 && (
                          <div className="text-[10px] text-slate-400 font-medium px-1">
                            +{evsDia.length - 2} más
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Lista responsiva automática en pantallas pequeñas */}
              <div className="sm:hidden space-y-2 max-h-[460px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {celdasCalendario
                  .filter((c) => c.esMesActual)
                  .map((celda) => {
                    const evsDia = eventosFiltrados.filter((ev) => ev.fecha === celda.fecha);
                    return (
                      <button
                        type="button"
                        key={celda.fecha}
                        onClick={() => abrirDia(celda.fecha)}
                        className="w-full text-left rounded-md bg-[#0B1218] border border-slate-800 hover:border-[#0084C2]/60 p-3 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded bg-[#002B45] text-xs font-bold text-white">
                            <span>{celda.dia}</span>
                            <span className="text-[9px] font-normal text-[#A8D5EE]">
                              {MESES[month].slice(0, 3)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-200 truncate">
                              {evsDia.length > 0
                                ? evsDia.map((e) => e.titulo).join(' · ')
                                : 'Sin eventos registrados'}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Toca para ver o agregar
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-[#A8D5EE] shrink-0">
                          {evsDia.length}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </>
          ) : (
            /* Vista Lista de eventos */
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {eventosFiltrados.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">
                  No hay eventos para el filtro seleccionado.
                </p>
              ) : (
                eventosFiltrados.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => abrirDia(ev.fecha)}
                    className="cursor-pointer rounded-md bg-[#0B1218] border border-slate-800 hover:border-slate-700 p-3.5 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono text-slate-400">{ev.fecha}</span>
                        <span
                          className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${badgeTipo(ev.tipo)}`}
                        >
                          {ev.tipo}
                        </span>
                        {ev.hora && (
                          <span className="text-[11px] text-slate-400">{ev.hora} hrs</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 truncate">{ev.titulo}</h4>
                      {ev.detalle && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">{ev.detalle}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Columna derecha (4 cols): Actividades programadas */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Actividades Programadas
            </h3>
            <span className="text-[11px] font-semibold text-[#A8D5EE]">
              {proximosEventos.length} registros
            </span>
          </div>

          <div className="space-y-3">
            {proximosEventos.map((ev) => (
              <div
                key={ev.id}
                onClick={() => abrirDia(ev.fecha)}
                className="cursor-pointer rounded-lg bg-[#111C26] border border-slate-800 hover:border-[#0084C2]/60 p-4 space-y-2 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-[#A8D5EE] flex items-center gap-1">
                    {ev.tipo === 'Examen' ? (
                      <Clock className="h-3.5 w-3.5 text-rose-400" />
                    ) : ev.tipo === 'Asesoria' ? (
                      <Video className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-[#0084C2]" />
                    )}
                    {ev.fecha} {ev.hora ? `· ${ev.hora}` : ''}
                  </span>
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${badgeTipo(ev.tipo)}`}
                  >
                    {ev.tipo}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{ev.titulo}</h4>
                {ev.detalle && (
                  <p className="text-xs text-slate-400 leading-relaxed">{ev.detalle}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal / Panel para ver, agregar, editar o eliminar eventos de un día */}
      {panelDiaAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-lg bg-[#0F1923] border border-slate-700 shadow-xl overflow-hidden">
            {/* Cabecera del día */}
            <div className="flex items-center justify-between bg-[#002B45] px-4 py-3 border-b border-[#0084C2]/40">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8D5EE]">
                  Agenda del Día
                </span>
                <h3 className="text-sm font-bold text-white">{selectedDate}</h3>
              </div>
              <button
                onClick={() => {
                  setPanelDiaAbierto(false);
                  limpiarFormulario();
                }}
                className="rounded p-1 text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-5 max-h-[82vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* Lista de eventos del día */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Eventos en esta fecha ({eventosDelDiaSeleccionado.length})
                </h4>

                {eventosDelDiaSeleccionado.length === 0 ? (
                  <p className="rounded-md bg-[#0B1218] border border-slate-800 p-3 text-xs text-slate-400">
                    No hay eventos registrados para este día. Agrega uno abajo.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {eventosDelDiaSeleccionado.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-md bg-[#0B1218] border border-slate-800 p-3 flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${badgeTipo(ev.tipo)}`}
                            >
                              {ev.tipo}
                            </span>
                            {ev.hora && (
                              <span className="text-[11px] text-slate-400">{ev.hora}</span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-white mt-1">{ev.titulo}</p>
                          {ev.detalle && (
                            <p className="text-[11px] text-slate-400 mt-0.5">{ev.detalle}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => iniciarEdicion(ev)}
                            title="Modificar evento"
                            className="rounded p-1.5 text-slate-400 hover:text-[#A8D5EE] hover:bg-slate-800 transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => eliminarEvento(ev.id)}
                            title="Eliminar evento"
                            className="rounded p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Formulario para agregar o modificar */}
              <form onSubmit={guardarEvento} className="space-y-3 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {editId ? 'Modificar Evento' : 'Agregar Nuevo Evento'}
                </h4>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Título</label>
                  <input
                    type="text"
                    required
                    value={tituloForm}
                    onChange={(e) => setTituloForm(e.target.value)}
                    placeholder="Ej. Entrega de informe de laboratorio"
                    className="w-full rounded-md bg-[#0B1218] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#0084C2] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Tipo</label>
                    <select
                      value={tipoForm}
                      onChange={(e) => setTipoForm(e.target.value as TipoEvento)}
                      className="w-full rounded-md bg-[#0B1218] border border-slate-700 px-3 py-2 text-xs text-white focus:border-[#0084C2] focus:outline-none"
                    >
                      <option value="Tarea">Tarea</option>
                      <option value="Examen">Examen</option>
                      <option value="Asesoria">Asesoría</option>
                      <option value="Feriado">Feriado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1">Hora (opcional)</label>
                    <input
                      type="text"
                      value={horaForm}
                      onChange={(e) => setHoraForm(e.target.value)}
                      placeholder="Ej. 14:30"
                      className="w-full rounded-md bg-[#0B1218] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#0084C2] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Detalle / Aula (opcional)</label>
                  <textarea
                    rows={2}
                    value={detalleForm}
                    onChange={(e) => setDetalleForm(e.target.value)}
                    placeholder="Indicaciones, aula o modalidad..."
                    className="w-full rounded-md bg-[#0B1218] border border-slate-700 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#0084C2] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  {editId && (
                    <button
                      type="button"
                      onClick={limpiarFormulario}
                      className="rounded-md bg-slate-800 hover:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Cancelar edición
                    </button>
                  )}
                  <button
                    type="submit"
                    className="rounded-md bg-[#0084C2] hover:bg-[#0073A8] px-4 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    {editId ? 'Guardar cambios' : 'Agregar evento'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}