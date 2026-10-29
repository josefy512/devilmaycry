import React, { useState, useEffect } from 'react';
import FutPage from './FUT/fut';
import { supabase } from '../../supabaseClient';
import {
  Search,
  Bell,
  Upload,
  Plus,
  FileText,
  Download,
  Eye,
  Award,
  ShieldCheck,
  ChevronRight,
  FileSpreadsheet,
  BookOpen,
  Calendar,
  X,
  ExternalLink,
  Loader2
} from 'lucide-react';
 
export default function DocumentosView() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showFutModal, setShowFutModal] = useState(false);
 
  const [silabosDinamicos, setSilabosDinamicos] = useState([]);
  const [loadingSilabos, setLoadingSilabos] = useState(true);
 
  useEffect(() => {
    async function fetchSilabosSupabase() {
      try {
        setLoadingSilabos(true);
        const { data, error } = await supabase.from('cursos').select('*');
 
        if (error) {
          console.error('Error al obtener sílabos:', error);
        } else if (data) {
          const mapeados = data.map((c, index) => ({
            id: c.id || String(index + 1),
            curso: c.nombre_curso || c.nombre || 'Curso sin nombre',
            codigo: c.codigo || 'INV-401',
            docente: c.profesor || 'Docente asignado',
            creditos: `${c.creditos || 4} CRÉDITOS`,
            tamano: 'PDF Oficial',
            actualizado: 'Ciclo 2026-II',
            silaboUrl: c.silabo_url || null,
            iconColor:
              index % 2 === 0
                ? 'bg-[#18233C] text-blue-400 border-blue-500/20'
                : 'bg-[#271E38] text-purple-400 border-purple-500/20'
          }));
          setSilabosDinamicos(mapeados);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      } finally {
        setLoadingSilabos(false);
      }
    }
 
    fetchSilabosSupabase();
  }, []);
 
  const categorias = [
    { id: 'Todos', label: 'Todos (18)' },
    { id: 'Academicos', label: 'Académicos' },
    { id: 'Tramites', label: 'Trámites' },
    { id: 'Reglamentos', label: 'Reglamentos' },
  ];
 
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0B0F17] text-slate-100 p-3 sm:p-6 space-y-5 sm:space-y-6 font-sans">
 
      {/* 1. Header superior */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 sm:gap-3 text-sm text-slate-400">
          <span>Inicio</span>
          <span>/</span>
          <span className="text-slate-100 font-medium">Documentos</span>
        </div>
 
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="relative flex-1 min-w-0 md:w-80 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full bg-[#131927] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="shrink-0 p-2 bg-[#131927] border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors relative">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
 
      {/* 2. Título y acciones */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Gestión de Documentos</h1>
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold whitespace-nowrap">
              Ciclo 2026-II
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Consulta, descarga y gestiona tus certificados, fichas académicas y formatos oficiales con autenticación y firma digital.
          </p>
        </div>
 
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-all">
            <Upload className="w-4 h-4 text-slate-400" />
            <span>Subir Documento</span>
          </button>
          <button
            onClick={() => setShowFutModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Solicitar Trámite Oficial</span>
          </button>
        </div>
      </div>
 
      {/* 3. Filtros y estado del servidor */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* El scroll horizontal queda SOLO dentro de este contenedor */}
        <div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1 sm:gap-2 bg-[#131927] p-1 rounded-xl border border-slate-800 w-max">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
 
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>Servidor de firmas:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Activo & Verificado
          </span>
        </div>
      </div>
 
      {/* 4. Ficha de matrícula */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="p-2.5 sm:p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 shrink-0">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-base sm:text-lg font-bold text-white">Ficha y Constancia de Matrícula Oficial</h3>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap">
                  <ShieldCheck className="w-3.5 h-3.5" /> Validada y Oficial
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Periodo Lectivo 2026-II • Emitido por Secretaría General con Código de Verificación Electrónica (CVE).
              </p>
 
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-3 text-xs">
                <div className="min-w-0">
                  <p className="text-slate-500 font-medium">Estudiante:</p>
                  <p className="text-slate-200 font-semibold mt-0.5 break-words">
                    Alex Morgan <span className="text-slate-400 font-normal">(202110482)</span>
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 font-medium">Programa:</p>
                  <p className="text-slate-200 font-semibold mt-0.5">Ingeniería Civil</p>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 font-medium">Carga Lectiva:</p>
                  <p className="text-blue-400 font-semibold mt-0.5">22 Créditos (5 asignaturas)</p>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-500 font-medium">Fecha Registro:</p>
                  <p className="text-slate-200 font-semibold mt-0.5">14 Ago, 2026 • 09:42 AM</p>
                </div>
              </div>
            </div>
          </div>
 
          <div className="flex flex-col min-[420px]:flex-row items-stretch gap-2 sm:gap-3 w-full xl:w-auto xl:shrink-0">
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C2538] hover:bg-[#25314A] border border-slate-700/60 rounded-xl text-xs font-semibold text-slate-200 transition-colors">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Ver PDF</span>
            </button>
            <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-rose-600/20">
              <Download className="w-4 h-4" />
              <span>Descargar Ficha (PDF)</span>
            </button>
          </div>
        </div>
      </div>
 
      {/* 5. Sílabos + Formularios */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
 
        {/* Sílabos */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">Sílabos de Cursos Matriculados</h3>
            <span className="text-xs text-slate-400 bg-[#131927] px-2.5 py-1 rounded-md border border-slate-800">
              {silabosDinamicos.length} Asignaturas
            </span>
          </div>
 
          {loadingSilabos ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-[#131927] border border-slate-800 rounded-2xl gap-3 text-slate-400 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <p className="text-xs font-medium">Sincronizando sílabos desde Supabase...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {silabosDinamicos.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-9 h-9 shrink-0 rounded-xl border flex items-center justify-center font-bold text-xs ${item.iconColor}`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 whitespace-nowrap">
                        {item.creditos}
                      </span>
                    </div>
 
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-100 text-sm break-words">{item.curso}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 break-words">{item.codigo} • {item.docente}</p>
                    </div>
                  </div>
 
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] text-slate-500">
                      {item.actualizado} • {item.tamano}
                    </p>
 
                    {item.silaboUrl ? (
                      <a
                        href={item.silaboUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-md"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Descargar Sílabo (PDF)</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <div className="w-full py-2 px-2 bg-slate-800/50 text-slate-500 rounded-xl text-xs font-medium text-center cursor-not-allowed">
                        Publicación pendiente del docente
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
 
        {/* Formularios y trámites */}
        <div className="lg:col-span-4 space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Formularios y Trámites</h3>
          </div>
 
          <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                Vigencia 2026 • V.4
              </span>
            </div>
 
            <div>
              <h4 className="font-bold text-white text-sm">FUT - Formulario Único de Trámite</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Requerido para convalidaciones, rectificación de matrícula, certificados de egresado y justificaciones médicas.
              </p>
            </div>
 
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-slate-200">VENTAJAS DEL TRÁMITE DIGITAL:</p>
              <ul className="space-y-1.5 text-slate-400">
                {[
                  'Pre-llenado automático de tus datos personales.',
                  'Emisión instantánea de constancia con código de ticket.',
                  'Sin imprimir ni hacer colas en ventanilla.',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-blue-400"></span>
                    <span className="min-w-0">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
 
            <button
              type="button"
              onClick={() => setShowFutModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all text-sm"
            >
              <FileText className="w-4 h-4" />
              Llenar FUT Digital Ahora
            </button>
          </div>
        </div>
      </div>
 
      {/* 6. Historial vs Reglamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 pt-2">
 
        {/* Historial */}
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">Historial de Calificaciones y Récord</h3>
            <button className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              Ver histórico completo <ChevronRight className="w-3 h-3" />
            </button>
          </div>
 
          <div className="space-y-3">
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-100 text-xs">Consolidado y Récord Académico Integral</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Promedio Ponderado Acumulado: <strong className="text-emerald-400">16.8 / 20.0</strong>
                  </p>
                  <span className="inline-block mt-1 text-[9px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">Firma Digital FNMT</span>
                </div>
              </div>
 
              <button className="shrink-0 px-3 py-2 bg-[#1C2538] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors">
                Descargar
              </button>
            </div>
 
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 shrink-0 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-100 text-xs">Boleta Oficial de Notas - Ciclo 2026-I</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Aprobado con distinción • 24 Créditos culminados</p>
                  <span className="inline-block mt-1 text-[9px] text-slate-500">Emitido Julio 2026</span>
                </div>
              </div>
 
              <button className="shrink-0 px-3 py-2 bg-[#1C2538] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors">
                Descargar
              </button>
            </div>
          </div>
        </div>
 
        {/* Reglamentos */}
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white">Normativa y Reglamentos Vigentes</h3>
            <span className="text-xs text-slate-500">Actualización Anual</span>
          </div>
 
          <div className="space-y-3">
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 shrink-0 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-100 text-xs">Reglamento General del Estudiante 2026</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Normas académicas, deberes, derechos y evaluación (48 pág.)</p>
                  <span className="inline-block mt-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Vigente</span>
                </div>
              </div>
 
              <span className="shrink-0 px-2.5 py-1 bg-[#1C2538] text-slate-400 rounded-lg text-xs font-mono">
                PDF
              </span>
            </div>
 
            <div className="bg-[#131927] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 shrink-0 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-100 text-xs">Calendario de Actividades Académicas 2026</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Fechas de exámenes parciales, finales y entrega de actas</p>
                  <span className="inline-block mt-1 text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Vigente</span>
                </div>
              </div>
 
              <span className="shrink-0 px-2.5 py-1 bg-[#1C2538] text-slate-400 rounded-lg text-xs font-mono">
                PDF
              </span>
            </div>
          </div>
        </div>
      </div>
 
      {/* Modal FUT Digital */}
      {showFutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-4xl bg-[#0b0f17] border border-slate-800 rounded-t-2xl sm:rounded-2xl max-h-[95vh] sm:max-h-[92vh] overflow-y-auto overflow-x-hidden shadow-2xl">
            <button
              onClick={() => setShowFutModal(false)}
              className="sticky top-2 float-right mr-2 mt-2 z-10 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-all border border-slate-700"
              title="Cerrar Formulario"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2 sm:p-4 w-full max-w-full">
              <FutPage />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
