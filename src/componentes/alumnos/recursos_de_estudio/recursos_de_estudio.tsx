import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  History, 
  CloudCheck, 
  Star, 
  Download, 
  Eye, 
  ExternalLink, 
  ThumbsUp, 
  CheckCircle, 
  Library, 
  Key, 
  Layers,
  ChevronRight
} from 'lucide-react';

export default function RecursosEstudioView() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [onlyRecommended, setOnlyRecommended] = useState(true);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior & Métricas Rápidas */}
      <div className="bg-[#131927] border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Inicio</span>
              <span>/</span>
              <span className="text-slate-100 font-medium">Recursos de estudio</span>
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-semibold">
                CATÁLOGO ACADÉMICO 2026-II
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">Recursos de Estudio</h1>
              <span className="text-xs text-slate-500 font-mono bg-slate-800 px-2 py-0.5 rounded">v4.8 • FAC-ING</span>
            </div>

            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Accede a la biblioteca digital, manuales técnicos, software recomendado y material complementario seleccionado para tus asignaturas activas de este ciclo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-blue-600/20">
              <BookOpen className="w-4 h-4" />
              <span>Solicitar Material / Préstamo Digital</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C2538] hover:bg-[#25314A] border border-slate-700/60 text-slate-200 rounded-xl text-xs font-medium transition-colors">
              <History className="w-4 h-4 text-slate-400" />
              <span>Mi Historial de Lectura</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de Estadísticas de Biblioteca */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
              <Library className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Libros indexados</p>
              <p className="text-base font-bold text-white">48 disponibles</p>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Lecturas del sílabo</p>
              <p className="text-base font-bold text-white">100% cubiertas</p>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Entornos & licencias</p>
              <p className="text-base font-bold text-white">3 activas</p>
            </div>
          </div>

          <div className="bg-[#0B0F17] border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <CloudCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Sincronización</p>
              <p className="text-base font-bold text-white">Al día (Cloud)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barra de Búsqueda y Filtros */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por título, autor, materia o palabra clave (ej. Stewart, Resistencia)..."
              className="w-full bg-[#131927] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-3">
            <select className="w-full bg-[#131927] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
              <option>Todos los cursos (5 activos)</option>
              <option>Cálculo II (MAT-204)</option>
              <option>Resistencia de Materiales (CIV-301)</option>
              <option>Física II (FIS-102)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select className="w-full bg-[#131927] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none">
              <option>Más recientes</option>
              <option>Mejor valorados</option>
              <option>Más prestados</option>
            </select>
          </div>
        </div>

        {/* Pestañas de Categoría */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'Todos', label: 'Todos los recursos', count: 48 },
              { id: 'Libros', label: 'Libros y Manuales', count: 24 },
              { id: 'Articulos', label: 'Artículos y Fuentes', count: 12 },
              { id: 'Herramientas', label: 'Herramientas y Software', count: 8 },
              { id: 'Repositorios', label: 'Repositorios Carrera', count: 4 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-[#131927] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#131927] border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <input 
              type="checkbox" 
              checked={onlyRecommended}
              onChange={(e) => setOnlyRecommended(e.target.checked)}
              className="rounded bg-[#0B0F17] border-slate-800 text-blue-600 focus:ring-0"
            />
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Solo recomendados por docentes</span>
          </label>
        </div>
      </div>

      {/* 3. Contenido Principal: Grid de Libros + Recomendaciones del Docente */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        
        {/* COLUMNA IZQUIERDA: Libros y Manuales Destacados (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Libros y Manuales Técnicos</span>
              <span className="text-xs font-normal text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                4 destacados
              </span>
            </h3>
            <button className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              Ver los 24 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Libro 1: Cálculo II */}
            <div className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-4 transition-all">
              <div className="space-y-3">
                {/* Portada Estilizada */}
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700/60 rounded-xl p-4 text-center space-y-2 relative overflow-hidden h-40 flex flex-col justify-center items-center">
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Cálculo II
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] text-slate-400 font-mono">
                    7ª Edición
                  </span>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CIENCIAS BÁSICAS</p>
                    <p className="text-sm font-black text-white px-2 leading-snug">Multivariable & Álgebra</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">Cálculo de Varias Variables y Vectorial</h4>
                  <p className="text-xs text-slate-400 mt-0.5">James Stewart • Cengage Learning</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3 text-rose-400" /> PDF (18.4 MB)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Star className="w-3 h-3 fill-amber-400" /> 4.9 <span className="text-slate-500">(128)</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Leer online</span>
                  </button>
                  <button className="p-2 bg-[#1C2538] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/60 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Libro 2: Resistencia de Materiales */}
            <div className="bg-[#131927] border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between space-y-4 transition-all">
              <div className="space-y-3">
                {/* Portada Estilizada */}
                <div className="bg-gradient-to-br from-[#331E0B] to-[#0F172A] border border-amber-500/20 rounded-xl p-4 text-center space-y-2 relative overflow-hidden h-40 flex flex-col justify-center items-center">
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Resistencia de Materiales
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] text-slate-400 font-mono">
                    8ª Edición
                  </span>

                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">ESTRUCTURAS</p>
                    <p className="text-sm font-black text-white px-2 leading-snug">Mecánica de Materiales</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm line-clamp-1">Mecánica de Materiales y Tensión</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Ferdinand P. Beer, Johnston • McGraw-Hill</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3 text-rose-400" /> PDF Oficial (32.1 MB)
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <Star className="w-3 h-3 fill-amber-400" /> 4.8 <span className="text-slate-500">(94)</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Leer online</span>
                  </button>
                  <button className="p-2 bg-[#1C2538] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/60 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COLUMNA DERECHA: Recomendaciones Directas del Docente (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
              <span>RECOMENDADO ESTA SEMANA</span>
            </h3>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </div>

          <div className="space-y-3">
            
            {/* Recomendación 1: Ramiro Valdivia */}
            <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Prof. Dr. Ramiro Valdivia</h4>
                  <p className="text-[10px] text-blue-400">Cálculo II • Grupo 04</p>
                </div>
              </div>

              <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80 text-xs italic text-slate-300">
                "Revisar capítulo 4 antes del parcial del viernes: Teorema de Green y aplicaciones de flujo vectorial."
              </div>

              <button className="w-full text-left text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Abrir Stewart Cap. 4 (pp. 312-348)</span>
              </button>
            </div>

            {/* Recomendación 2: Martha Córdova */}
            <div className="bg-[#131927] border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">Ing. Martha Córdova</h4>
                  <p className="text-[10px] text-amber-400">Resistencia de Materiales</p>
                </div>
              </div>

              <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800/80 text-xs italic text-slate-300">
                "Tablas de esfuerzo cortante para la entrega obligatoria de laboratorio N° 3. Ver apéndice B."
              </div>

              <button className="w-full text-left text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Anexo Esfuerzos (PDF)</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}