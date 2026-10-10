import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  CheckSquare, 
  FileText, 
  ExternalLink, 
  Layers
} from 'lucide-react';

export default function HorariosPanel() {
  const [diaSeleccionado, setDiaSeleccionado] = useState('Miércoles');
  const [disponibilidadTutoria, setDisponibilidadTutoria] = useState(true);

  // Días de la semana para la barra superior
  const diasSemana = [
    { nombre: 'Lunes', fecha: '12 May', sesiones: '3 sesiones' },
    { nombre: 'Martes', fecha: '13 May', sesiones: '2 sesiones' },
    { nombre: 'Miércoles', fecha: '14 May', sesiones: '4 sesiones', activo: true },
    { nombre: 'Jueves', fecha: '15 May', sesiones: '2 sesiones' },
    { nombre: 'Viernes', fecha: '16 May', sesiones: '1 sesión' },
    { nombre: 'Sábado', fecha: '17 May', sesiones: 'Taller libre' },
  ];

  // Itinerario operativo del día (Miércoles 14)
  const itinerarioDia = [
    {
      id: 1,
      horario: '08:00 AM – 09:30 AM',
      duracion: '90 min',
      codigo: 'HAR-101 • PREGRADO REGULAR',
      nombre: 'Fundamentos del Diseño Visual',
      aula: 'Aula 204 • Pabellón A (Presencial)',
      grupo: 'Grupo 1A (38 matriculados)',
      estado: 'FINALIZADO',
      detalleEstado: 'Cierre de acta matutina confirmado a las 09:28 AM',
      tipo: 'claseFinalizada'
    },
    {
      id: 2,
      horario: '10:00 AM – 11:30 AM',
      duracion: '90 min',
      codigo: 'HAR-302 • NIVEL INTERMEDIO',
      nombre: 'Historia del Arte Moderno',
      sesion: 'Sesión 14 de 32',
      aula: 'Aula 102 • Pabellón B (Presencial)',
      grupo: 'Grupo 4B • 40 estudiantes',
      extra: 'Proyector 4K y Pizarra Smart',
      tema: 'Tema de hoy: Expresionismo alemán y movimientos de vanguardia del Siglo XX (Semana 7).',
      estado: 'EN CURSO • RESTAN 35M',
      tipo: 'claseEnCurso'
    },
    {
      id: 3,
      horario: '03:00 PM – 04:30 PM',
      duracion: '90 min',
      tipo: 'tutoria',
      titulo: 'Asesoría de Tesis y Consultas de Cátedra',
      subtitulo: 'ASESORÍA DOCENTE PROGRAMADA',
      citas: '3 Citas Agendadas',
      ubicacion: 'Cubículo Docente 4 • Pabellón de Profesores',
      enlace: 'Enlace virtual activo disponible',
      estudiantesCitados: [
        'Elena Díaz (15:00)',
        'Javier Mendoza (15:30)',
        'Carlos Ruiz (16:00)'
      ]
    },
    {
      id: 4,
      horario: '05:00 PM – 06:00 PM',
      duracion: '60 min',
      tipo: 'reunion',
      titulo: 'Consejo de Cátedra de Humanidades & Artes',
      subtitulo: 'GESTIÓN ACADÉMICA E INSTITUCIONAL',
      modalidad: 'Híbrida',
      ubicacion: 'Sala de Juntas B (Edificio Central)',
      meet: 'Google Meet Integrado',
      agenda: 'Agenda: Revisión de Actas Parciales y Cierre de Sílabo de medio ciclo.'
    }
  ];

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* 1. Header Superior del Módulo */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 rounded uppercase text-[10px]">
                Inicio
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">Gestión Docente</span>
              <span className="text-slate-500">/</span>
              <span className="text-white font-medium">Mi Horario y Carga Semanal</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Mi Horario y Carga Semanal
            </h1>
            <p className="text-xs text-slate-400">
              Distribución de clases presenciales y gestión de disponibilidad horaria operativa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-[11px] text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CICLO 2026-II • SEMESTRE REGULAR</span>
            </div>
            <div className="px-3 py-1.5 bg-[#0B0F17] border border-slate-800 rounded-xl text-[11px] text-slate-300">
              Prof. Marta Rodríguez
            </div>
          </div>
        </div>

        {/* Selector Horizontal de Días (Lunes a Sábado) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-800/80">
          {diasSemana.map((d) => {
            const esSeleccionado = diaSeleccionado === d.nombre;
            return (
              <button
                key={d.nombre}
                onClick={() => setDiaSeleccionado(d.nombre)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  esSeleccionado 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20' 
                    : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{d.nombre}</span>
                  {d.nombre === 'Miércoles' && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${esSeleccionado ? 'bg-blue-700 text-white' : 'bg-blue-500/20 text-blue-400'}`}>
                      HOY
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-sm font-extrabold">{d.fecha}</span>
                  <span className={`text-[10px] ${esSeleccionado ? 'text-blue-100' : 'text-slate-400'}`}>{d.sesiones}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Grilla Principal: Itinerario (8 cols) + Carga y Disponibilidad (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Itinerario Operativo (8 cols) */}
        <div className="lg:col-span-8 bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Itinerario Operativo: {diaSeleccionado} 14 de Mayo</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">4 compromisos programados</span>
          </div>

          {/* Lista de Bloques del Día */}
          <div className="space-y-4">
            {itinerarioDia.map((item) => {
              const enCurso = item.tipo === 'claseEnCurso';
              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-2xl border relative overflow-hidden transition-all ${
                    enCurso 
                      ? 'bg-gradient-to-r from-[#131927] via-[#162035] to-[#131927] border-blue-500/50 shadow-lg shadow-blue-950/20' 
                      : 'bg-[#0B0F17] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    enCurso ? 'bg-blue-500' : item.tipo === 'tutoria' ? 'bg-amber-500' : item.tipo === 'reunion' ? 'bg-purple-500' : 'bg-emerald-500'
                  }`} />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-2">
                    
                    <div className="min-w-[130px]">
                      <p className="text-[11px] font-bold text-slate-300">{item.horario}</p>
                      <p className="text-xs font-extrabold text-white mt-0.5">{item.duracion}</p>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono font-bold">
                          {item.codigo || item.subtitulo}
                        </span>
                        {item.sesion && (
                          <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-semibold">
                            {item.sesion}
                          </span>
                        )}
                        {item.modalidad && (
                          <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-semibold">
                            {item.modalidad}
                          </span>
                        )}
                        {item.citas && (
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-semibold">
                            {item.citas}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white">{item.nombre || item.titulo}</h4>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{item.aula || item.ubicacion}</span>
                        </span>
                        <span>•</span>
                        <span>{item.grupo || item.enlace || item.meet}</span>
                      </div>

                      {item.extra && (
                        <p className="text-[11px] text-slate-400 italic">{item.extra}</p>
                      )}

                      {item.tema && (
                        <div className="p-2.5 bg-[#131927] border border-slate-800/80 rounded-xl text-xs text-slate-300">
                          {item.tema}
                        </div>
                      )}

                      {item.agenda && (
                        <p className="text-xs text-slate-300">{item.agenda}</p>
                      )}

                      {item.estudiantesCitados && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] text-slate-400 font-semibold">ESTUDIANTES CITADOS:</span>
                          {item.estudiantesCitados.map((est, idx) => (
                            <span key={idx} className="text-[10px] bg-[#131927] border border-slate-800 text-amber-400 px-2 py-0.5 rounded">
                              ● {est}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {item.tipo === 'claseFinalizada' && (
                        <div className="space-y-1 text-right">
                          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full inline-block">
                            {item.estado}
                          </span>
                          <button className="px-3 py-1.5 bg-[#131927] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 mt-1">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>Ver Registro de Clase</span>
                          </button>
                        </div>
                      )}

                      {enCurso && (
                        <div className="space-y-2 text-right">
                          <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-extrabold rounded-full inline-block shadow-md shadow-blue-600/30 animate-pulse">
                            {item.estado}
                          </span>
                          <div className="flex items-center gap-2 pt-1">
                            <button className="px-3 py-2 bg-[#131927] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors">
                              Ver Sílabo / Materiales
                            </button>
                            <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5">
                              <CheckSquare className="w-3.5 h-3.5" />
                              <span>Pasar Asistencia</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {item.tipo === 'tutoria' && (
                        <div className="flex items-center gap-2">
                          <button className="px-3.5 py-2 bg-[#131927] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors">
                            Ver Citas de Alumnos
                          </button>
                          <button className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors">
                            Abrir Sala Virtual
                          </button>
                        </div>
                      )}

                      {item.tipo === 'reunion' && (
                        <div className="flex items-center gap-2">
                          <button className="px-3.5 py-2 bg-[#131927] hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl text-xs font-semibold transition-colors">
                            Ver Agenda de Reunión
                          </button>
                          <button className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                            <span>Unirse a Sesión</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMNA DERECHA: Carga Lectiva Semanal + Disponibilidad de Tutoría (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Tarjeta de Carga Lectiva Semanal */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Carga Lectiva Semanal</span>
              </h3>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded">
                CONFORME
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-2xl font-extrabold text-white">
                  24 <span className="text-xs font-normal text-slate-500">/ 32 hrs máx.</span>
                </p>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                75% ASIGNADO
              </span>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
              <div className="w-[50%] bg-blue-600 h-full" title="Teóricas 16h"></div>
              <div className="w-[25%] bg-emerald-500 h-full" title="Talleres 6h"></div>
              <div className="w-[25%] bg-amber-500 h-full" title="Tutoría 2h"></div>
            </div>

            <div className="space-y-1.5 text-xs pt-1">
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Clases Teóricas (Lectivas)
                </span>
                <span className="font-bold text-white">16 hrs</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Laboratorios y Talleres
                </span>
                <span className="font-bold text-white">6 hrs</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Asesoría y Tutoría
                </span>
                <span className="font-bold text-white">2 hrs</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">RÉGIMEN CONTRACTUAL:</span>
              <span className="font-bold text-white">Tiempo Completo (TC)</span>
            </div>
          </div>

          {/* Disponibilidad de Tutoría */}
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Disponibilidad de Tutoría
              </h3>
              <button 
                onClick={() => setDisponibilidadTutoria(!disponibilidadTutoria)}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${disponibilidadTutoria ? 'bg-emerald-500' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${disponibilidadTutoria ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="space-y-2">
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded uppercase inline-block">
                Canal de Reserva Abierto
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Los estudiantes de tus secciones asignadas pueden reservar espacios libres de 30 minutos desde su portal institucional.
              </p>
            </div>

            <div className="p-3 bg-[#0B0F17] border border-slate-800 rounded-xl space-y-2 text-xs">
              <p className="text-slate-300 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Horario Recurrente Fijado Activo</span>
              </p>
              <p className="text-slate-400 text-[11px]">📅 Miércoles y Jueves: 15:00 a 17:00</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400">Cupos disponibles hoy:</span>
                <strong className="text-amber-400">1 espacio restante</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}