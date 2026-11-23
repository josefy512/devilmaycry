import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  MapPin,
  Clock,
  Calendar,
  FileText,
  CheckCircle2,
  Send
} from 'lucide-react';

interface ConvocatoriaMural {
  id: string;
  sigla: string;
  empresa: string;
  puesto: string;
  carreraObjetivo: string;
  tipoPractica: 'Pre-profesional' | 'Profesional';
  modalidad: string;
  subvencion: string;
  cierre: string;
  publicado: string;
  convenio: boolean;
  resumen: string;
  actividades: string[];
  requisitos: string[];
  contacto: string;
}

const CONVOCATORIAS: ConvocatoriaMural[] = [
  {
    id: 'conv-1',
    sigla: 'SW',
    empresa: 'Soluciones Digitales Sur S.A.C.',
    puesto: 'Practicante de Desarrollo Web y Soporte de Sistemas',
    carreraObjetivo: 'Ingeniería de Software / Sistemas',
    tipoPractica: 'Pre-profesional',
    modalidad: 'Híbrido · Lima Sur',
    subvencion: 'S/ 1,100',
    cierre: '05 de Diciembre',
    publicado: 'Hoy',
    convenio: true,
    resumen:
      'Apoyo en el mantenimiento de módulos web internos, actualización de componentes frontend y soporte técnico a usuarios institucionales.',
    actividades: [
      'Apoyo en interfaces web con HTML, CSS, JavaScript / TypeScript y React.',
      'Revisión y registro de incidencias técnicas y pruebas funcionales.',
      'Documentación básica de cambios y soporte a bases de datos.'
    ],
    requisitos: [
      'Estudiante de 4.° ciclo en adelante de Computación, Sistemas o Software.',
      'Disponibilidad de 25 a 30 horas semanales.'
    ],
    contacto: 'convocatorias@solucionesdigitales.pe'
  },
  {
    id: 'conv-2',
    sigla: 'IU',
    empresa: 'Constructora Urbana del Sur S.A.',
    puesto: 'Practicante Pre-Profesional de Metrados y Oficina Técnica',
    carreraObjetivo: 'Ingeniería Civil',
    tipoPractica: 'Pre-profesional',
    modalidad: 'Híbrido · Lima Metropolitana',
    subvencion: 'S/ 1,300',
    cierre: '30 de Noviembre',
    publicado: 'Ayer',
    convenio: true,
    resumen:
      'Apoyo en lectura de planos, elaboración de metrados y seguimiento de avance de obra para proyectos residenciales y locales.',
    actividades: [
      'Elaboración y revisión de metrados de estructuras y arquitectura.',
      'Apoyo en cuadros de control de materiales y avance semanal.',
      'Coordinación con residencia de obra para actualización de planos.'
    ],
    requisitos: [
      'Estudiante de Ingeniería Civil o Construcción a partir del 6.° ciclo.',
      'Manejo básico de hojas de cálculo y lectura de planos.'
    ],
    contacto: 'rrhh@constructorasur.pe'
  },
  {
    id: 'conv-3',
    sigla: 'AD',
    empresa: 'Consultoría y Gestión Empresarial Perú',
    puesto: 'Practicante de Administración y Registro de Operaciones',
    carreraObjetivo: 'Administración',
    tipoPractica: 'Profesional',
    modalidad: 'Presencial · Lima',
    subvencion: 'S/ 1,200',
    cierre: '08 de Diciembre',
    publicado: 'Hace 2 días',
    convenio: false,
    resumen:
      'Apoyo en control documentario, seguimiento de proveedores, conciliación de registros administrativos y atención de trámites.',
    actividades: [
      'Ordenamiento y control de expedientes administrativos y comprobantes.',
      'Seguimiento de cronogramas internos y reportes semanales.',
      'Apoyo en coordinación con áreas operativas y clientes.'
    ],
    requisitos: [
      'Egresado o estudiante de últimos ciclos de Administración o afines.',
      'Buen manejo de herramientas de oficina y redacción administrativa.'
    ],
    contacto: 'seleccion@gestionperu.pe'
  }
];

const CARRERAS_FILTRO = [
  'Todas las carreras',
  'Ingeniería de Software / Sistemas',
  'Ingeniería Civil',
  'Administración'
];

export default function BolsaTrabajoView() {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState<string>('Todas las carreras');
  const [tipoFiltro, setTipoFiltro] = useState<'Todos' | 'Pre-profesional' | 'Profesional'>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOfferId, setSelectedOfferId] = useState<string>('conv-1');
  const [postulacionesEnviadas, setPostulacionesEnviadas] = useState<string[]>([]);

  const ofertasFiltradas = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return CONVOCATORIAS.filter((item) => {
      const cumpleCarrera =
        carreraSeleccionada === 'Todas las carreras' ||
        item.carreraObjetivo === carreraSeleccionada;
      const cumpleTipo = tipoFiltro === 'Todos' || item.tipoPractica === tipoFiltro;
      const cumpleBusqueda =
        !q ||
        item.puesto.toLowerCase().includes(q) ||
        item.empresa.toLowerCase().includes(q) ||
        item.carreraObjetivo.toLowerCase().includes(q) ||
        item.modalidad.toLowerCase().includes(q);
      return cumpleCarrera && cumpleTipo && cumpleBusqueda;
    });
  }, [carreraSeleccionada, tipoFiltro, searchTerm]);

  const ofertaActiva =
    ofertasFiltradas.find((o) => o.id === selectedOfferId) || ofertasFiltradas[0] || null;

  const registrarInteres = (id: string) => {
    if (!postulacionesEnviadas.includes(id)) {
      setPostulacionesEnviadas((prev) => [...prev, id]);
    }
  };

  return (
    <div className="space-y-5 text-slate-200">
      {/* Encabezado del mural de prácticas */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Mural de Prácticas y Convocatorias
            </h2>
            <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded text-[11px] font-semibold">
              Aviso Estudiantil
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Convocatorias vigentes para practicantes clasificadas por carrera para que revises oportunidades al instante.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0B1218] border border-slate-800 px-3.5 py-2 rounded-md text-xs shrink-0 self-start lg:self-auto">
          <FileText className="w-4 h-4 text-[#A8D5EE]" />
          <span className="text-slate-400">Convocatorias activas:</span>
          <strong className="text-white">{ofertasFiltradas.length}</strong>
        </div>
      </div>

      {/* Filtros por carrera, tipo y búsqueda */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-3.5 sm:p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar puesto, empresa, carrera o modalidad..."
              className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
            />
          </div>

          <div className="md:col-span-6">
            <select
              value={carreraSeleccionada}
              onChange={(e) => setCarreraSeleccionada(e.target.value)}
              className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#0084C2]"
            >
              {CARRERAS_FILTRO.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800 text-xs">
          {(
            [
              { id: 'Todos', label: 'Todas las prácticas' },
              { id: 'Pre-profesional', label: 'Prácticas Pre-profesionales' },
              { id: 'Profesional', label: 'Prácticas Profesionales' }
            ] as const
          ).map((tab) => {
            const activo = tipoFiltro === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setTipoFiltro(tab.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activo
                    ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                    : 'bg-[#0B1218] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido del mural: Avisos (izquierda) y Detalle del aviso (derecha) */}
      {ofertasFiltradas.length === 0 ? (
        <div className="rounded-lg bg-[#111C26] border border-slate-800 p-8 text-center text-xs text-slate-400">
          No hay convocatorias publicadas para la carrera o filtro seleccionado.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Avisos en el mural */}
          <div className="lg:col-span-5 space-y-3">
            {ofertasFiltradas.map((oferta) => {
              const esSeleccionada = ofertaActiva?.id === oferta.id;
              return (
                <button
                  type="button"
                  key={oferta.id}
                  onClick={() => setSelectedOfferId(oferta.id)}
                  className={`w-full text-left rounded-lg p-4 space-y-2.5 transition-colors border ${
                    esSeleccionada
                      ? 'bg-[#111C26] border-[#0084C2] border-l-4 border-l-[#0084C2]'
                      : 'bg-[#111C26] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded font-semibold truncate">
                      {oferta.carreraObjetivo}
                    </span>
                    <span className="text-slate-400 shrink-0">{oferta.publicado}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-xs text-[#A8D5EE] shrink-0">
                      {oferta.sigla}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-sm leading-snug">
                        {oferta.puesto}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {oferta.empresa}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {oferta.resumen}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-300 font-medium">
                      {oferta.tipoPractica} · {oferta.modalidad}
                    </span>
                    <span className="font-bold text-[#A8D5EE]">{oferta.subvencion}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detalle del aviso seleccionado */}
          {ofertaActiva && (
            <div className="lg:col-span-7 bg-[#111C26] border border-slate-800 rounded-lg p-5 sm:p-6 space-y-5">
              <div className="space-y-3 border-b border-slate-800 pb-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center font-bold text-sm text-[#A8D5EE] shrink-0">
                    {ofertaActiva.sigla}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded text-[11px] font-semibold">
                        {ofertaActiva.carreraObjetivo}
                      </span>
                      {ofertaActiva.convenio && (
                        <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Convenio registrado
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                      {ofertaActiva.puesto}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#A8D5EE] shrink-0" />
                      <span className="font-semibold text-slate-200">{ofertaActiva.empresa}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-[#0B1218] border border-slate-800 rounded text-slate-300 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#A8D5EE]" />
                    {ofertaActiva.modalidad}
                  </span>
                  <span className="px-2.5 py-1 bg-[#0B1218] border border-slate-800 rounded text-slate-300 inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A8D5EE]" />
                    Práctica {ofertaActiva.tipoPractica}
                  </span>
                  <span className="px-2.5 py-1 bg-[#0B1218] border border-slate-800 rounded text-white font-semibold">
                    Referencia: {ofertaActiva.subvencion}
                  </span>
                  <span className="px-2.5 py-1 bg-[#0B1218] border border-slate-800 rounded text-amber-300 inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Cierre: {ofertaActiva.cierre}
                  </span>
                </div>

                <div className="pt-1">
                  {postulacionesEnviadas.includes(ofertaActiva.id) ? (
                    <div className="w-full py-2.5 px-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-md text-xs font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Interés registrado · Contacto: {ofertaActiva.contacto}</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => registrarInteres(ofertaActiva.id)}
                      className="w-full py-2.5 px-4 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold rounded-md text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Postular / Ver correo de contacto</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">
                    Descripción del Aviso
                  </h4>
                  <p className="text-slate-300">{ofertaActiva.resumen}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">
                    Actividades a Realizar
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {ofertaActiva.actividades.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">
                    Requisitos Básicos
                  </h4>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    {ofertaActiva.requisitos.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  Canal de postulación: <span className="font-mono text-[#A8D5EE]">{ofertaActiva.contacto}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}