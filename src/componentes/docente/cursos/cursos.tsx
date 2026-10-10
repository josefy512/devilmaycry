import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Mail, 
  FileText, 
  ListOrdered, 
  Award, 
  MoreVertical, 
  Filter,
  BookOpen
} from 'lucide-react';

export default function MisCursosPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  // Datos simulados de los 4 cursos asignados
  const cursos = [
    {
      id: 'HAR-302',
      codigo: 'HAR-302',
      grupo: 'Grupo 4B • Turno Mañana',
      nombre: 'Historia del Arte Moderno',
      ubicacion: 'Aula 102 • Pabellón B',
      horario: 'Mié y Vie 10:00 – 11:30 AM',
      matriculados: 40,
      avanceSilabo: 44,
      semana: 'Semana 7 de 16',
      delegado: {
        nombre: 'Lucas Romero Quispe',
        avatar: 'LR',
        colorAvatar: 'bg-[#1E293B]',
        email: 'lucas.romero@universidad.edu.pe'
      }
    },
    {
      id: 'HAR-101',
      codigo: 'HAR-101',
      grupo: 'Grupo 1A • Turno Mañana',
      nombre: 'Fundamentos del Diseño Visual',
      ubicacion: 'Aula 204 • Pabellón A',
      horario: 'Lun y Mié 08:00 – 09:30 AM',
      matriculados: 38,
      avanceSilabo: 50,
      semana: 'Semana 8 de 16',
      delegado: {
        nombre: 'Valeria Castro Silva',
        avatar: 'VC',
        colorAvatar: 'bg-[#1E293B]',
        email: 'valeria.castro@universidad.edu.pe'
      }
    },
    {
      id: 'PIN-205',
      codigo: 'PIN-205',
      grupo: 'Grupo 2A • Turno Tarde',
      nombre: 'Técnicas de Pintura & Restauración',
      ubicacion: 'Taller 3 • Pabellón de Artes',
      horario: 'Mar y Jue 14:00 – 16:30 PM',
      matriculados: 25,
      avanceSilabo: 44,
      semana: 'Semana 7 de 16',
      delegado: {
        nombre: 'Carlos Ruiz Dávila',
        avatar: 'CR',
        colorAvatar: 'bg-[#1E293B]',
        email: 'carlos.ruiz@universidad.edu.pe'
      }
    },
    {
      id: 'HAR-405',
      codigo: 'HAR-405',
      grupo: 'Grupo 1B • Turno Noche',
      nombre: 'Seminario de Historia Crítica',
      ubicacion: 'Aula 108 • Pabellón Central',
      horario: 'Viernes 18:00 – 20:30 PM',
      matriculados: 30,
      avanceSilabo: 44,
      semana: 'Semana 7 de 16',
      delegado: {
        nombre: 'Ana García Méndez',
        avatar: 'AG',
        colorAvatar: 'bg-[#1E293B]',
        email: 'ana.garcia@universidad.edu.pe'
      }
    }
  ];

  // Filtrar por código o nombre
  const cursosFiltrados = cursos.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.codigo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* 1. Header del Módulo y Buscador Superior */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            PORTAL DOCENTE ACTIVO
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Mis Cursos Asignados
          </h1>
          <p className="text-xs text-slate-400">
            Ciclo Académico 2026-II • <strong className="text-slate-200">4 Asignaturas activas</strong>
          </p>
        </div>

        {/* Buscador de Cursos */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre de curso..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#131927] border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono border border-slate-800 px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </div>

          <button className="p-2.5 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-semibold">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtrar</span>
          </button>
        </div>
      </div>

      {/* 2. Grilla de Tarjetas de Cursos (2 Columnas Simétricas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cursosFiltrados.map((curso) => (
          <div 
            key={curso.id}
            className="bg-[#131927] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-5 transition-all shadow-lg shadow-black/20"
          >
            {/* Cabecera de la Tarjeta */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-800/80 text-slate-300 text-[10px] font-mono font-bold rounded">
                    {curso.codigo}
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded">
                    {curso.grupo}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight pt-0.5">
                  {curso.nombre}
                </h2>
              </div>

              <button className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Ubicación y Horario */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-800/60 text-slate-400 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Ubicación</p>
                  <p className="font-semibold text-slate-200">{curso.ubicacion}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-800/60 text-slate-400 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">Horario</p>
                  <p className="font-semibold text-slate-200">{curso.horario}</p>
                </div>
              </div>
            </div>

            {/* Métricas: Matriculados & Avance del Sílabo */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold flex items-center justify-between">
                  <span>Matriculados</span>
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                </p>
                <p className="text-xl font-extrabold text-white mt-1">
                  {curso.matriculados} <span className="text-xs font-normal text-slate-400">alumnos activos</span>
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] uppercase font-bold">
                  <span className="text-slate-500">Avance del Sílabo</span>
                  <span className="text-emerald-400 font-extrabold">{curso.avanceSilabo}%</span>
                </div>
                <p className="text-xs font-semibold text-slate-300 mt-1">{curso.semana}</p>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mt-1.5">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${curso.avanceSilabo}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Datos del Delegado de Aula */}
            <div className="p-3 bg-[#0B0F17] border border-slate-800/80 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-[10px] text-white">
                  {curso.delegado.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{curso.delegado.nombre}</p>
                  <p className="text-[10px] text-slate-500 font-medium">DELEGADO DE AULA</p>
                </div>
              </div>

              <a 
                href={`mailto:${curso.delegado.email}`}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Contactar</span>
              </a>
            </div>

            {/* 3 Botones de Acción Directa */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80">
              <button 
                onClick={() => alert(`Subir materiales para ${curso.codigo}`)}
                className="py-2.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Materiales</span>
                <span className="sm:hidden">Mat.</span>
              </button>

              <button 
                onClick={() => alert(`Lista de alumnos de ${curso.codigo}`)}
                className="py-2.5 bg-[#0B0F17] hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ListOrdered className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Lista Alumn...</span>
                <span className="sm:hidden">Lista</span>
              </button>

              <button 
                onClick={() => alert(`Navegando a Calificaciones de ${curso.codigo}`)}
                className="py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Calificacion...</span>
                <span className="sm:hidden">Notas</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}