import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Calendar,
  Mail,
  Clock,
  MapPin,
  Copy,
  Building2,
  GraduationCap,
  CheckCircle2,
  User,
  Send
} from 'lucide-react';

interface DocenteContacto {
  id: string;
  iniciales: string;
  nombre: string;
  cargo: string;
  departamento: string;
  curso: string;
  grupo?: string;
  email: string;
  horario: string;
  ubicacion: string;
  disponibilidad: string;
}

interface AreaAdministrativa {
  id: string;
  sigla: string;
  nombre: string;
  responsable: string;
  email: string;
  horario: string;
  ubicacion: string;
  canal: string;
}

const DOCENTES: DocenteContacto[] = [
  {
    id: '1',
    iniciales: 'RV',
    nombre: 'Prof. Dr. Ramiro Valdivia',
    cargo: 'Docente Titular',
    departamento: 'Departamento de Ciencias Básicas',
    curso: 'Cálculo II (MAT-204)',
    grupo: 'Grupo A',
    email: 'r.valdivia@institucion.edu.pe',
    horario: 'Martes y Jueves · 15:00 - 17:00',
    ubicacion: 'Pabellón B · Cubículo 204',
    disponibilidad: 'Atención programada'
  },
  {
    id: '2',
    iniciales: 'MC',
    nombre: 'Ing. Martha Córdova, M.Sc.',
    cargo: 'Coordinadora de Cátedra',
    departamento: 'Departamento de Estructuras',
    curso: 'Resistencia de Materiales (CIV-301)',
    grupo: 'Mecánica de Sólidos',
    email: 'm.cordova@institucion.edu.pe',
    horario: 'Lunes y Miércoles · 10:00 - 12:30',
    ubicacion: 'Pabellón Tecnológico · Lab. 1',
    disponibilidad: 'Horario regular'
  },
  {
    id: '3',
    iniciales: 'JM',
    nombre: 'Lic. Javier Mendoza, Ph.D.',
    cargo: 'Docente Investigador',
    departamento: 'Departamento de Física Aplicada',
    curso: 'Física II - Electromagnetismo (FIS-102)',
    email: 'j.mendoza@institucion.edu.pe',
    horario: 'Viernes · 08:00 - 12:00',
    ubicacion: 'Pabellón A · Oficina 210',
    disponibilidad: 'Asesoría previa cita'
  },
  {
    id: '4',
    iniciales: 'DM',
    nombre: 'Ing. Daniel Morales',
    cargo: 'Docente Asociado',
    departamento: 'Departamento de Topografía',
    curso: 'Topografía Aplicada (CIV-205)',
    email: 'd.morales@institucion.edu.pe',
    horario: 'Jueves · 14:00 - 18:00',
    ubicacion: 'Área de Prácticas · Cubículo 102',
    disponibilidad: 'Atención programada'
  },
  {
    id: '5',
    iniciales: 'EV',
    nombre: 'Dra. Elena Vásquez',
    cargo: 'Coordinadora de Área',
    departamento: 'Departamento de Geotecnia',
    curso: 'Mecánica de Suelos I',
    email: 'e.vasquez@institucion.edu.pe',
    horario: 'Lunes · 14:00 - 16:00',
    ubicacion: 'Laboratorio Central · L-3',
    disponibilidad: 'Horario regular'
  },
  {
    id: '6',
    iniciales: 'CB',
    nombre: 'Arq. Carlos Benavides',
    cargo: 'Docente de Especialidad',
    departamento: 'Departamento de Edificaciones',
    curso: 'Diseño y Arquitectura II',
    email: 'c.benavides@institucion.edu.pe',
    horario: 'Miércoles · 16:00 - 19:00',
    ubicacion: 'Taller de Diseño 4',
    disponibilidad: 'Horario regular'
  }
];

const AREAS_ADMINISTRATIVAS: AreaAdministrativa[] = [
  {
    id: 'adm-1',
    sigla: 'SG',
    nombre: 'Secretaría Académica y Registros',
    responsable: 'Oficina de Matrícula y Constancias',
    email: 'secretaria@institucion.edu.pe',
    horario: 'Lun - Vie · 08:00 - 17:00',
    ubicacion: 'Primer Piso · Pabellón Central',
    canal: 'Presencial / Trámite FUT'
  },
  {
    id: 'adm-2',
    sigla: 'TS',
    nombre: 'Tesorería y Caja Institucional',
    responsable: 'Control de Pensiones y Comprobantes',
    email: 'tesoreria@institucion.edu.pe',
    horario: 'Lun - Vie · 08:30 - 17:30',
    ubicacion: 'Primer Piso · Ventanilla 2',
    canal: 'Presencial / Virtual'
  },
  {
    id: 'adm-3',
    sigla: 'BD',
    nombre: 'Bienestar y Soporte Estudiantil',
    responsable: 'Orientación y Seguimiento Académico',
    email: 'bienestar@institucion.edu.pe',
    horario: 'Lun - Vie · 09:00 - 17:00',
    ubicacion: 'Segundo Piso · Ala Norte',
    canal: 'Cita previa'
  },
  {
    id: 'adm-4',
    sigla: 'TI',
    nombre: 'Soporte de Sistemas y Plataforma',
    responsable: 'Administración de Cuentas y Accesos',
    email: 'sistemas@institucion.edu.pe',
    horario: 'Lun - Vie · 08:00 - 18:00',
    ubicacion: 'Centro de Cómputo · Piso 2',
    canal: 'Correo institucional'
  }
];

export default function DirectorioView() {
  const [activeTab, setActiveTab] = useState<'docentes' | 'direccion'>('docentes');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const docentesFiltrados = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return DOCENTES;
    return DOCENTES.filter(
      (d) =>
        d.nombre.toLowerCase().includes(q) ||
        d.curso.toLowerCase().includes(q) ||
        d.departamento.toLowerCase().includes(q) ||
        d.cargo.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const areasFiltradas = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return AREAS_ADMINISTRATIVAS;
    return AREAS_ADMINISTRATIVAS.filter(
      (a) =>
        a.nombre.toLowerCase().includes(q) ||
        a.responsable.toLowerCase().includes(q) ||
        a.ubicacion.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-5 text-slate-200">
      {/* Encabezado del módulo y acciones */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-white">
              Directorio Institucional
            </h2>
            <span className="px-2 py-0.5 bg-[#002B45] text-[#A8D5EE] border border-[#0084C2]/30 rounded text-[11px] font-semibold">
              Periodo 2026-II
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Correos institucionales, horarios de atención y ubicaciones de docentes y áreas administrativas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1218] border border-slate-700/80 hover:border-slate-600 rounded-md text-xs font-semibold text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4 text-[#A8D5EE]" />
            <span>Descargar directorio</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Solicitar atención</span>
          </button>
        </div>
      </div>

      {/* Indicadores numéricos sobrios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#111C26] border border-slate-800 rounded-lg p-3.5 flex items-center gap-3">
          <div className="p-2.5 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE] shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 font-medium">Plana docente</p>
            <p className="text-sm font-bold text-white truncate">{DOCENTES.length} contactos registrados</p>
          </div>
        </div>

        <div className="bg-[#111C26] border border-slate-800 rounded-lg p-3.5 flex items-center gap-3">
          <div className="p-2.5 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE] shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 font-medium">Áreas administrativas</p>
            <p className="text-sm font-bold text-white truncate">{AREAS_ADMINISTRATIVAS.length} oficinas activas</p>
          </div>
        </div>

        <div className="bg-[#111C26] border border-slate-800 rounded-lg p-3.5 flex items-center gap-3">
          <div className="p-2.5 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE] shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 font-medium">Canal de consultas</p>
            <p className="text-sm font-bold text-white truncate">Correo institucional</p>
          </div>
        </div>

        <div className="bg-[#111C26] border border-slate-800 rounded-lg p-3.5 flex items-center gap-3">
          <div className="p-2.5 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE] shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 font-medium">Horario de atención</p>
            <p className="text-sm font-bold text-white truncate">Lun - Vie · 08:00 - 18:00</p>
          </div>
        </div>
      </div>

      {/* Pestañas y buscador */}
      <div className="rounded-lg bg-[#111C26] border border-slate-800 p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-[#0B1218] p-1 rounded-md border border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveTab('docentes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeTab === 'docentes'
                ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#A8D5EE]" />
            <span>Plana docente ({DOCENTES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('direccion')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors ${
              activeTab === 'direccion'
                ? 'bg-[#002B45] text-white border border-[#0084C2]/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#A8D5EE]" />
            <span>Áreas y administración ({AREAS_ADMINISTRATIVAS.length})</span>
          </button>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, curso o dependencia..."
            className="w-full bg-[#0B1218] border border-slate-700/80 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#0084C2] transition-colors"
          />
        </div>
      </div>

      {/* Pestaña 1: Plana Docente */}
      {activeTab === 'docentes' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Contactos Docentes
            </h3>
            <span>{docentesFiltrados.length} resultado(s)</span>
          </div>

          {docentesFiltrados.length === 0 ? (
            <div className="rounded-lg bg-[#111C26] border border-slate-800 p-8 text-center text-xs text-slate-400">
              No se encontraron docentes con ese criterio de búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {docentesFiltrados.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#111C26] border border-slate-800 hover:border-slate-700 rounded-lg p-4 flex flex-col justify-between space-y-4 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Identificador de contacto sin foto externa */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex flex-col items-center justify-center text-[#A8D5EE] shrink-0">
                          <span className="text-xs font-bold leading-none">{doc.iniciales}</span>
                          <User className="w-3 h-3 mt-0.5 opacity-80" />
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block text-[10px] font-semibold text-[#A8D5EE] bg-[#002B45] px-2 py-0.5 rounded border border-[#0084C2]/30">
                            {doc.cargo}
                          </span>
                          <h4 className="font-bold text-white text-sm mt-1 truncate">
                            {doc.nombre}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 truncate">{doc.departamento}</p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-[#0B1218] text-slate-200 border border-slate-800 rounded text-xs font-medium">
                        {doc.curso}
                      </span>
                      {doc.grupo && (
                        <span className="px-2 py-1 bg-[#0B1218]/60 text-slate-400 border border-slate-800/80 rounded text-[11px]">
                          {doc.grupo}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Datos de contacto */}
                  <div className="space-y-2 bg-[#0B1218] p-3 rounded-md border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Mail className="w-3.5 h-3.5 text-[#A8D5EE] shrink-0" />
                        <span className="truncate">{doc.email}</span>
                      </div>
                      <button
                        type="button"
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

                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{doc.horario}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{doc.ubicacion}</span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${doc.email}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white rounded-md text-xs font-semibold transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Escribir</span>
                    </a>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#0B1218] hover:bg-slate-800 border border-slate-700/80 text-slate-200 rounded-md text-xs font-semibold transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#A8D5EE]" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pestaña 2: Dirección y Administración */}
      {activeTab === 'direccion' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Dependencias Administrativas
            </h3>
            <span>{areasFiltradas.length} oficina(s)</span>
          </div>

          {areasFiltradas.length === 0 ? (
            <div className="rounded-lg bg-[#111C26] border border-slate-800 p-8 text-center text-xs text-slate-400">
              No se encontraron áreas con ese criterio de búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areasFiltradas.map((area) => (
                <div
                  key={area.id}
                  className="bg-[#111C26] border border-slate-800 hover:border-slate-700 rounded-lg p-4 flex flex-col justify-between space-y-3.5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-md bg-[#002B45] border border-[#0084C2]/30 flex items-center justify-center text-xs font-bold text-[#A8D5EE] shrink-0">
                        {area.sigla}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{area.nombre}</h4>
                        <p className="text-xs text-slate-400 truncate">{area.responsable}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#002B45] border border-[#0084C2]/30 text-[10px] font-semibold text-[#A8D5EE] shrink-0">
                      {area.canal}
                    </span>
                  </div>

                  <div className="space-y-2 bg-[#0B1218] p-3 rounded-md border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <Mail className="w-3.5 h-3.5 text-[#A8D5EE] shrink-0" />
                        <span className="truncate">{area.email}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(area.email)}
                        title="Copiar correo"
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        {copiedEmail === area.email ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{area.horario}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{area.ubicacion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}