import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Upload, 
  Plus, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  BookOpen, 
  FileSpreadsheet, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  Building2,
  Calendar
} from 'lucide-react';

export default function DocumentosView() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const silabos = [
    {
      id: '1',
      curso: 'Cálculo II',
      codigo: 'MAT-204',
      docente: 'Prof. Dr. Ramiro Valdivia',
      creditos: '5 CRÉDITOS',
      tamano: '2.4 MB (PDF)',
      actualizado: 'Ciclo 2026-II',
      iconColor: 'bg-[#18233C] text-blue-400 border-blue-500/20'
    },
    {
      id: '2',
      curso: 'Resistencia de Materiales',
      codigo: 'CIV-301',
      docente: 'Ing. Martha Córdova',
      creditos: '4 CRÉDITOS',
      tamano: '3.1 MB (PDF)',
      actualizado: 'Ciclo 2026-II',
      iconColor: 'bg-[#271E38] text-purple-400 border-purple-500/20'
    },
    {
      id: '3',
      curso: 'Física II (Termodinámica)',
      codigo: 'FIS-102',
      docente: 'Lic. Javier Mendoza',
      creditos: '5 CRÉDITOS',
      tamano: '1.9 MB (PDF)',
      actualizado: 'Ciclo 2026-II',
      iconColor: 'bg-[#2E2419] text-amber-400 border-amber-500/20'
    },
    {
      id: '4',
      curso: 'Topografía Aplicada',
      codigo: 'CIV-205',
      docente: 'Ing. Daniel Morales',
      creditos: '5 CRÉDITOS',
      tamano: '4.2 MB (PDF)',
      actualizado: 'Ciclo 2026-II',
      iconColor: 'bg-[#152B28] text-emerald-400 border-emerald-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior (Buscador y Usuario) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Documentos</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar documentos, sílabos, constancias..." 
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-[#131927] border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors relative">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Título Principal y Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Gestión de Documentos</h1>
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold">
              Ciclo 2026-II
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Consulta, descarga y gestiona tus certificados, fichas académicas y formatos oficiales con autenticación y firma digital.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-all">
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Subir Documento</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            <span>Solicitar Trámite Oficial</span>
          </button>
        </div>
      </div>

      {/* 3. Filtros de Categoría e Estado Servidor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-[#131927] p-1 rounded-xl border border-slate-800 self-start">
          {[
            { id: 'Todos', label: 'Todos los archivos (18)' },
            { id: 'Academicos', label: 'Académicos' },
            { id: 'Tramites', label: 'Trámites y Solicitudes' },
            { id: 'Reglamentos', label: 'Reglamentos e Institucional' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Servidor de firmas:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Activo & Verificado
          </span>
        </div>
      </div>

      {/* 4. Tarjeta Principal: Ficha de Matrícula */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 shrink-0">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-white">Ficha y Constancia de Matrícula Oficial</h3>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Validada y Oficial
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Periodo Lectivo 2026-II • Emitido por Secretaría General con Código de Verificación Electrónica (CVE).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-xs">
                <div>
                  <p className="text-slate-500 font-medium">Estudiante:</p>
                  <p className="text-slate-200 font-semibold mt-0.5">Alex Morgan <span className="text-slate-400 font-normal">(202110482)</span></p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Programa:</p>
                  <p className="text-slate-200 font-semibold mt-0.5">Ingeniería Civil</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Carga Lectiva:</p>
                  <p className="text-blue-400 font-semibold mt-0.5">22 Créditos (5 asignaturas)</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Fecha Registro:</p>
                  <p className="text-slate-200 font-semibold mt-0.5">14 Ago, 2026 • 09:42 AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1C2538] hover:bg-[#25314A] border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition-colors">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Ver PDF</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-rose-600/20">
              <Download className="w-4 h-4" />
              <span>Descargar Ficha (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Sección de Sílabos + Formularios */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Izquierda: Sílabos de Cursos (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Sílabos de Cursos Matriculados</h3>
            <span className="text-xs text-slate-400 bg-[#131927] px-2.5 py-1 rounded-md border border-slate-800">
              5 Asignaturas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {silabos.map((item) => (
              <div 
                key={item.id}
                className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs ${item.iconColor}`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {item.creditos}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{item.curso}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.codigo} • {item.docente}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-500">
                    Actualizado {item.actualizado} • {item.tamano}
                  </p>

                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#1C2538] hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-medium transition-colors">
                    <Download className="w-3.5 h-3.5 text-rose-400" />
                    <span>Descargar Sílabo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Derecha: Formularios y Trámites - FUT (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Formularios y Trámites</h3>
          </div>

          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Vigencia 2026 • V.4
              </span>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">FUT - Formulario Único de Trámite</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Requerido para convalidaciones, rectificación de matrícula, certificados de egresado y justificaciones médicas.
              </p>
            </div>

            <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PASOS PARA TRAMITAR:</p>
              <ol className="text-xs text-slate-300 space-y-1.5 pl-4 list-decimal">
                <li>Descargar y rellenar formato digital</li>
                <li>Adjuntar sustento y voucher de pago</li>
                <li>Ingresar por Mesa de Partes Virtual</li>
              </ol>
            </div>

            <div className="space-y-2 pt-1">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Descargar FUT (Word Editable)</span>
              </button>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1C2538] hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-colors">
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>Descargar FUT (PDF Oficial)</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 6. Fila Inferior: Historial vs Reglamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Bloque Historial */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Historial de Calificaciones y Récord</h3>
            <button className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              Ver histórico completo <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-xs">Consolidado y Récord Académico Integral</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Promedio Ponderado Acumulado: <strong className="text-emerald-400">16.8 / 20.0</strong></p>
                  <span className="inline-block mt-1 text-[9px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">Firma Digital FNMT</span>
                </div>
              </div>

              <button className="px-3 py-1.5 bg-[#1C2538] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors">
                Descargar
              </button>
            </div>

            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-xs">Boleta Oficial de Notas - Ciclo 2026-I</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Aprobado con distinción • 24 Créditos culminados</p>
                  <span className="inline-block mt-1 text-[9px] text-slate-500">Emitido Julio 2026</span>
                </div>
              </div>

              <button className="px-3 py-1.5 bg-[#1C2538] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors">
                Descargar
              </button>
            </div>
          </div>
        </div>

        {/* Bloque Reglamentos */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Normativa y Reglamentos Vigentes</h3>
            <span className="text-xs text-slate-500">Actualización Anual</span>
          </div>

          <div className="space-y-3">
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-xs">Reglamento General del Estudiante 2026</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Normas académicas, deberes, derechos y evaluación (48 pág.)</p>
                  <span className="inline-block mt-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Vigente</span>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-[#1C2538] text-slate-400 rounded-lg text-xs font-mono">
                PDF
              </span>
            </div>

            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100 text-xs">Calendario de Actividades Académicas 2026</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Fechas de exámenes parciales, finales y entrega de actas</p>
                  <span className="inline-block mt-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Vigente</span>
                </div>
              </div>

              <span className="px-2.5 py-1 bg-[#1C2538] text-slate-400 rounded-lg text-xs font-mono">
                PDF
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}