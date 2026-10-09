import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Download, 
  Calendar, 
  Mail, 
  Clock, 
  MapPin, 
  Copy, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  UserCheck, 
  Send 
} from 'lucide-react';

export default function DirectorioView() {
  const [activeTab, setActiveTab] = useState<'docentes' | 'direccion'>('docentes');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const docentes = [
    {
      id: '1',
      nombre: 'Prof. Dr. Ramiro Valdivia',
      cargo: 'TITULAR Y CÁTEDRA',
      departamento: 'Depto. de Ciencias Básicas y Matemáticas',
      curso: 'Cálculo II (MAT-204)',
      grupo: 'Álgebra Tensor Avanzado',
      email: 'r.valdivia@universidad.edu',
      horario: 'Martes y Jueves: 15:00 - 17:00 hrs',
      ubicación: 'Edificio B, Cubículo 204 (Pabellón de Ciencias)',
      estado: 'Asesoría Hoy',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      nombre: 'Ing. Martha Córdova, M.Sc.',
      cargo: 'JEFA DE CÁTEDRA',
      departamento: 'Depto. de Estructuras e Ingeniería Civil',
      curso: 'Resistencia de Materiales (CIV-301)',
      grupo: 'Mecánica de Sólidos',
      email: 'm.cordova@universidad.edu',
      horario: 'Lunes y Miércoles: 10:00 - 12:30 hrs',
      ubicación: 'Pabellón Tecnológico, Lab. Mecánica Suelos',
      estado: 'En Conferencia',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '3',
      nombre: 'Lic. Javier Mendoza, Ph.D.',
      cargo: 'INVESTIGADOR Y DOCENTE',
      departamento: 'Depto. de Física Aplicada',
      curso: 'Física II - Electromagnetismo (FIS-102)',
      grupo: '',
      email: 'j.mendoza@universidad.edu',
      horario: 'Viernes: 08:00 - 12:00 hrs',
      ubicación: 'Edificio A, Oficina 210',
      estado: 'Asesoría Virtual',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '4',
      nombre: 'Ing. Daniel Morales',
      cargo: 'DOCENTE ASOCIADO',
      departamento: 'Depto. de Geoinformática y Topografía',
      curso: 'Topografía Aplicada (CIV-205)',
      grupo: '',
      email: 'd.morales@universidad.edu',
      horario: 'Jueves: 14:00 - 18:00 hrs',
      ubicación: 'Campo de Prácticas / Cubículo 102',
      estado: 'Asesoría Hoy',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '5',
      nombre: 'Dra. Elena Vásquez',
      cargo: 'COORDINADORA DE ÁREA',
      departamento: 'Depto. de Geotecnia & Mecánica Suelos',
      curso: 'Mecánica de Suelos I',
      grupo: '',
      email: 'e.vasquez@universidad.edu',
      horario: 'Lunes: 14:00 - 16:00 hrs',
      ubicación: 'Laboratorio Central L-3',
      estado: 'En Reunión',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '6',
      nombre: 'Arq. Carlos Benavides',
      cargo: 'DOCENTE INVITADO',
      departamento: 'Urbanismo y Edificaciones',
      curso: 'Diseño y Arquitectura II',
      grupo: '',
      email: 'c.benavides@universidad.edu',
      horario: 'Miércoles: 16:00 - 19:00 hrs',
      ubicación: 'Taller de Diseño 4',
      estado: 'Asesoría Hoy',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior (Navegación, Buscador Global y Usuario) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Directorio y Contactos</span>
          <span className="ml-2 px-3 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
            • DIRECTORIO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, curso, oficina..." 
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-[#131927] border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              AM
            </div>
            <div className="hidden sm:block text-xs">
              <p className="font-semibold text-slate-200">Alex Morgan</p>
              <p className="text-slate-500">Ing. Civil (Ciclo VII)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Título Principal y Botones de Acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Directorio y Contactos</h1>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs font-mono">
              OFICIAL
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Consulta los canales de comunicación oficiales, horarios de asesoría y ubicación física o virtual de docentes y áreas administrativas institucionales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-all">
            <Download className="w-4 h-4 text-slate-400" />
            <span>Descargar Directorio PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            <Calendar className="w-4 h-4" />
            <span>Agendar Asesoría</span>
          </button>
        </div>
      </div>

      {/* 3. Métricas y Estado General */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">DOCENTES DEL CICLO</p>
            <p className="text-lg font-bold text-white mt-0.5">6 asignados activos</p>
          </div>
        </div>

        <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">ÁREAS DE ATENCIÓN</p>
            <p className="text-lg font-bold text-white mt-0.5">8 oficinas activas</p>
          </div>
        </div>

        <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">MESA DE AYUDA</p>
            <p className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              En línea (&lt; 15 min)
            </p>
          </div>
        </div>

        <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">HORARIO GENERAL</p>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">Lun - Vie: 08:00 - 19:30</p>
          </div>
        </div>
      </div>

      {/* 4. Selector de Pestañas y Filtros Secundarios */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 bg-[#131927] p-1.5 rounded-xl border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('docentes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'docentes'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Plana Docente</span>
            <span className="px-2 py-0.2 bg-blue-700/60 rounded-full text-[10px]">
              6 docentes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('direccion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'direccion'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Dirección y Administración</span>
            <span className="px-2 py-0.2 bg-slate-800 rounded-full text-[10px]">
              8 áreas
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, curso, cargo o departamento..."
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>

          <select className="bg-[#131927] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none">
            <option>Facultad de Ingeniería Civil y Militar</option>
            <option>Todas las Facultades</option>
          </select>

          <button className="px-3 py-1.5 bg-[#131927] border border-slate-800 rounded-lg text-xs text-slate-300 hover:text-white">
            Mis docentes actuales
          </button>
        </div>
      </div>

      {/* Subtítulo informativo */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          Docentes del Ciclo & Cátedra
          <span className="text-xs font-normal text-slate-400">(6 asignados en tu matrícula)</span>
        </h3>
        <p className="hidden sm:block text-slate-500">Haz clic en copiar correo o solicita asesoría directamente</p>
      </div>

      {/* 5. Cuadrícula de Tarjetas del Directorio Docente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {docentes.map((doc) => (
          <div 
            key={doc.id}
            className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all shadow-sm"
          >
            {/* Header de la Tarjeta */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={doc.foto} 
                    alt={doc.nombre} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {doc.cargo}
                    </span>
                    <h4 className="font-bold text-white text-sm mt-1">{doc.nombre}</h4>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${doc.badgeColor}`}>
                  • {doc.estado}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-1">{doc.departamento}</p>

              {/* Tags del curso asignado */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="px-2.5 py-1 bg-slate-800/80 text-slate-200 border border-slate-700/80 rounded-md text-xs font-medium">
                  {doc.curso}
                </span>
                {doc.grupo && (
                  <span className="px-2.5 py-1 bg-slate-800/40 text-slate-400 rounded-md text-xs">
                    {doc.grupo}
                  </span>
                )}
              </div>
            </div>

            {/* Datos de contacto y ubicación */}
            <div className="space-y-2 bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80 text-xs">
              {/* Correo */}
              <div className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{doc.email}</span>
                </div>
                <button 
                  onClick={() => handleCopy(doc.email)}
                  title="Copiar correo"
                  className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                >
                  {copiedEmail === doc.email ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Horario */}
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{doc.horario}</span>
              </div>

              {/* Ubicación */}
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{doc.ubicación}</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a 
                href={`mailto:${doc.email}`}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Mensaje</span>
              </a>

              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Agendar</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}