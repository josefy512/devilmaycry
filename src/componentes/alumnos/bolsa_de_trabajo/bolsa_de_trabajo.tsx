import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Briefcase, 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Send, 
  Bookmark, 
  Share2, 
  FileCheck2, 
  CheckCircle2, 
  Eye, 
  RefreshCw, 
  Star,
  ChevronDown
} from 'lucide-react';

export default function BolsaTrabajoView() {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [onlyConvenio, setOnlyConvenio] = useState(true);
  const [selectedOfferId, setSelectedOfferId] = useState('1');

  const ofertas = [
    {
      id: '1',
      empresa: 'Inmobiliaria & Constructora Urbana S.A.',
      siglas: 'IU',
      logoColor: 'bg-blue-600',
      puesto: 'Practicante Pre-Profesional de Estructuras & BIM',
      tipo: 'Prácticas Pre',
      modalidad: 'Híbrido - San Isidro',
      sueldo: 'S/. 1,300 - 1,500',
      convenio: true,
      convenioTexto: 'CONVENIO ACTIVO',
      publicado: 'Publicado hace 2h',
      postulantes: ''
    },
    {
      id: '2',
      empresa: 'Geotecnia & Pavimentos del Perú',
      siglas: 'GP',
      logoColor: 'bg-amber-600',
      puesto: 'Asistente Técnico de Calidad y Suelos',
      tipo: 'Prácticas Profesionales',
      modalidad: 'Presencial - Planta',
      sueldo: 'S/. 1,600',
      convenio: false,
      convenioTexto: '',
      publicado: 'Publicado ayer',
      postulantes: '5 POSTULANTES'
    },
    {
      id: '3',
      empresa: 'Arcadis Global Engineering',
      siglas: 'AR',
      logoColor: 'bg-indigo-600',
      puesto: 'Junior CAD & Civil Designer',
      tipo: 'Exclusivo Universidad',
      modalidad: 'Remoto',
      sueldo: 'S/. 1,800',
      convenio: true,
      convenioTexto: 'INTERNACIONAL',
      publicado: 'Publicado hace 3 días',
      postulantes: ''
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior (Navegación, Tag de Convenios, Buscador Global y Usuario) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span>Carrera</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Bolsa de Trabajo y Prácticas</span>
          <span className="ml-2 px-3 py-0.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
            • CONVENIOS UNIVERSITARIOS 2026-II
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar convocatorias, empresas, pasantías..." 
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-[#131927] border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors relative">
            <Bell className="w-4 h-4" />
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

      {/* 2. Título Principal y Botones de Mis Postulaciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Bolsa de Trabajo y Prácticas</h1>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs font-mono">
              Bolsa Oficial Universitaria
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Explora vacantes exclusivas, prácticas pre-profesionales y convocatorias con empresas aliadas en convenio con la universidad.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>Mis Postulaciones</span>
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold">
              3 activas
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            <Bell className="w-4 h-4" />
            <span>Alertas de Empleo</span>
          </button>
        </div>
      </div>

      {/* 3. Banner Estado del CV Institucional */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400 shrink-0">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">CV Institucional:</span>
              <span className="text-xs font-bold text-blue-400">CV_Alex_Morgan_2026.pdf</span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verificado
              </span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px]">
                Disponibilidad: Inmediata (Horario Flexible)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Actualizado hace 5 días • <strong className="text-slate-200">Perfil Laboral: 92% Completo</strong> • Intereses: <span className="text-blue-400">Estructuras, Geotecnia, Modelado BIM</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end lg:self-center">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1C2538] hover:bg-[#25314A] border border-slate-700/60 rounded-lg text-xs text-slate-300">
            <Eye className="w-3.5 h-3.5" />
            <span>Ver Vista Previa</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-semibold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Actualizar CV / Portafolio</span>
          </button>
        </div>
      </div>

      {/* 4. Barra de Filtros y Búsqueda Avanzada */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por cargo, empresa o palabra clave (ej. Practicante Civil, Asistente BIM)..."
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <select className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none">
            <option>Prácticas Pre-profesionales</option>
            <option>Prácticas Profesionales</option>
            <option>Primer Empleo</option>
          </select>
          <select className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none">
            <option>Híbrido</option>
            <option>Presencial</option>
            <option>Remoto</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'Todas', label: 'Todas (42)' },
              { id: 'Pre', label: 'Prácticas Pre-profesionales (28)' },
              { id: 'Pro', label: 'Prácticas Profesionales (10)' },
              { id: 'Exclusivo', label: 'Exclusivo Universidad (15)' },
              { id: 'Remoto', label: 'Remoto / Híbrido (18)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-[#0B0F17] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={onlyConvenio}
              onChange={(e) => setOnlyConvenio(e.target.checked)}
              className="rounded bg-[#0B0F17] border-slate-800 text-blue-600 focus:ring-0"
            />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Solo empresas con convenio directo</span>
          </label>
        </div>
      </div>

      {/* 5. Vista Principal: Lista de Ofertas (Izq) vs Detalle de Oferta (Der) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMNA IZQUIERDA: Lista de Ofertas (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Mostrando 24 oportunidades disponibles</span>
            <div className="flex items-center gap-1">
              <span>Ordenar por:</span>
              <button className="text-slate-200 font-semibold flex items-center gap-1">
                Más recientes <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tarjeta 1 (Seleccionada) */}
          <div 
            onClick={() => setSelectedOfferId('1')}
            className={`bg-[#131927] border-2 rounded-2xl p-4 space-y-3 cursor-pointer transition-all ${
              selectedOfferId === '1' ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold">
                • CONVENIO ACTIVO
              </span>
              <span className="text-[11px] text-slate-500">Publicado hace 2h</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                IU
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Practicante Pre-Profesional de Estructuras & BIM</h3>
                <p className="text-xs text-slate-400 mt-0.5">Inmobiliaria & Constructora Urbana S.A.</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2">
              Apoyo en modelado Revit Estructuras y metrados para proyecto multifamiliar en fase ejecutiva...
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px]">Prácticas Pre</span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px]">Híbrido - San Isidro</span>
            </div>

            <p className="text-xs font-bold text-emerald-400">S/. 1,300 - 1,500</p>
          </div>

          {/* Tarjeta 2 */}
          <div 
            onClick={() => setSelectedOfferId('2')}
            className={`bg-[#131927] border rounded-2xl p-4 space-y-3 cursor-pointer transition-all ${
              selectedOfferId === '2' ? 'border-blue-500' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-bold">
                5 POSTULANTES
              </span>
              <span className="text-[11px] text-slate-500">Publicado ayer</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                GP
              </div>
              <div>
                <h3 className="font-bold text-slate-200 text-sm">Asistente Técnico de Calidad y Suelos</h3>
                <p className="text-xs text-slate-400 mt-0.5">Geotecnia & Pavimentos del Perú</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 line-clamp-2">
              Ensayos de laboratorio (Proctor, CBR), recopilación de probetas de concreto y redacción de informes...
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px]">Prácticas Profesionales</span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px]">Presencial - Planta</span>
            </div>

            <p className="text-xs font-bold text-emerald-400">S/. 1,600</p>
          </div>
        </div>

        {/* COLUMNA DERECHA: Detalle Completo del Puesto (7 cols) */}
        <div className="lg:col-span-7 bg-[#131927] border border-slate-800 rounded-2xl p-6 space-y-6">
          
          {/* Header del Puesto */}
          <div className="space-y-4 border-b border-slate-800 pb-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-600/20 shrink-0">
                  IU
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Practicante Pre-Profesional de Estructuras & BIM</h2>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <span className="font-semibold text-slate-200">Inmobiliaria & Constructora Urbana S.A.</span>
                    <span>•</span>
                    <span className="text-blue-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Convenio Marco #CONV-2024-88
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#0B0F17] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 bg-[#0B0F17] border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Badges de Información Rápida */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-[#0B0F17] border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> San Isidro (Híbrido)
              </span>
              <span className="px-3 py-1 bg-[#0B0F17] border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Pre-profesional (30h/sem)
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold rounded-lg flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> S/. 1,400 + FOLA
              </span>
            </div>

            {/* Botón Postular */}
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              <span>Postular con CV Institucional</span>
            </button>
          </div>

          {/* Cuadrícula de Métricas Clave del Puesto */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0B0F17] border border-slate-800 p-3 rounded-xl text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">VACANTES</p>
              <p className="text-base font-bold text-white mt-1">2 plazas</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 p-3 rounded-xl text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">CICLO REQUERIDO</p>
              <p className="text-base font-bold text-white mt-1">7mo a 9no ciclo</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 p-3 rounded-xl text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">HORARIO</p>
              <p className="text-base font-bold text-white mt-1">Flexible a clases</p>
            </div>
            <div className="bg-[#0B0F17] border border-slate-800 p-3 rounded-xl text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold">CIERRE CONVOCATORIA</p>
              <p className="text-base font-bold text-amber-400 mt-1">30 de Noviembre</p>
            </div>
          </div>

          {/* Descripción del Puesto */}
          <div className="space-y-3 text-xs leading-relaxed text-slate-300">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-400">DESCRIPCIÓN DEL PUESTO</h4>
            <p>
              Nos encontramos en búsqueda de un Practicante Pre-Profesional apasionado por el modelado y cálculo de estructuras civiles para integrarse a nuestro equipo de ingeniería de proyectos multifamiliares de alta densidad. Tendrás la oportunidad de participar activamente en la coordinación BIM 3D y 4D junto a consultores especialistas.
            </p>

            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-400 pt-2">FUNCIONES PRINCIPALES</h4>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
              <li>Modelado de elementos estructurales (zapatas, vigas, columnas, placas) en Revit.</li>
              <li>Extracción y validación de metrados de concreto y acero de refuerzo.</li>
              <li>Detección de interferencias con especialidades sanitarias y eléctricas (Navisworks).</li>
              <li>Asistencia en la elaboración de planos de detalle para obra.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}