import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient'; // Ajusta la ruta según tu estructura
import { 
  Search, 
  Bell, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink, 
  User, 
  Users, 
  Loader2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function MisCursosYEntregables({ user }) {
  // Pestaña activa principal: 'cursos' (primero) o 'tareas'
  const [activeMainTab, setActiveMainTab] = useState('cursos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estados de datos desde Supabase
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(true);

  // Cargar cursos y sílabos desde Supabase para el alumno
  useEffect(() => {
    async function fetchCursosAlumno() {
      try {
        setLoadingCursos(true);
        const { data, error } = await supabase
          .from('cursos')
          .select('*');

        if (error) {
          console.error('Error al cargar cursos:', error);
        } else if (data) {
          const cursosMapeados = data.map((c) => ({
            id: c.id,
            codigo: c.codigo || 'INV-401',
            nombre: c.nombre_curso || c.nombre || 'Curso sin nombre',
            profesor: c.profesor || 'Docente asignado',
            creditos: c.creditos || 4,
            silaboUrl: c.silabo_url || null,
            ubicacion: 'Aula 302 • Pabellón de Innovación',
            horario: 'Lun y Mié 10:00 – 12:00 PM',
            grupo: 'Grupo 1A • Turno Mañana',
            avance: c.silabo_url ? 100 : 0
          }));
          setCursos(cursosMapeados);
        }
      } catch (err) {
        console.error('Error inesperado:', err);
      } finally {
        setLoadingCursos(false);
      }
    }

    fetchCursosAlumno();
  }, []);

  const cursosFiltrados = cursos.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.profesor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 space-y-6 font-sans">
      
      {/* 1. Header Superior */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#333333] pb-4">
        <div className="flex items-center gap-3 text-xs text-[#b3b3b3]">
          <span>Inicio</span>
          <span>/</span>
          <span>Portal Estudiantil</span>
          <span className="ml-2 px-3 py-1 bg-[#121212] text-[#1ed760] rounded-full font-bold border border-[#333333]">
            CICLO ACADÉMICO 2026-II
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73777c]" />
            <input 
              type="text" 
              placeholder="Buscar curso, profesor o tarea..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1f1f1f] border border-[#333333] rounded-[500px] pl-9 pr-4 py-2 text-xs text-white placeholder-[#73777c] focus:outline-none focus:border-[#1ed760] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2.5 pl-3 border-l border-[#333333]">
            <div className="w-8 h-8 rounded-[500px] bg-[#1f1f1f] border border-[#333333] flex items-center justify-center font-bold text-xs text-[#1ed760]">
              {user?.iniciales || 'EP'}
            </div>
            <div className="hidden sm:block text-[11px]">
              <p className="font-bold text-white">{user?.nombre_completo || 'Estudiante Progresa'}</p>
              <p className="text-[#b3b3b3]">Ingeniería de Software</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Título Principal y Pestañas de Navegación Principal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Panel del Estudiante
          </h1>
          <p className="text-xs text-[#b3b3b3]">
            Accede primero a tus asignaturas oficiales, revisa los sílabos en PDF y gestiona tus entregas pendientes.
          </p>
        </div>

        {/* Pestañas Principales (Cursos vs Tareas) */}
        <div className="flex items-center gap-2 bg-[#121212] p-1 rounded-[9999px] border border-[#333333] self-start">
          <button
            onClick={() => setActiveMainTab('cursos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[9999px] text-xs font-bold transition-all ${
              activeMainTab === 'cursos'
                ? 'bg-[#ffffff] text-[#000000] shadow-md'
                : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mis Cursos & Sílabos</span>
          </button>
          <button
            onClick={() => setActiveMainTab('tareas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[9999px] text-xs font-bold transition-all ${
              activeMainTab === 'tareas'
                ? 'bg-[#ffffff] text-[#000000] shadow-md'
                : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tareas y Entregables (5)</span>
          </button>
        </div>
      </div>

      {/* 3. VISTA 1: MIS CURSOS Y SÍLABOS (Lo primero que ve el alumno) */}
      {activeMainTab === 'cursos' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Asignaturas Matriculadas en el Ciclo
            </h2>
            <span className="text-xs text-[#b3b3b3]">
              {cursos.length} curso(s) habilitado(s)
            </span>
          </div>

          {loadingCursos ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#b3b3b3] gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#1ed760]" />
              <p className="text-xs font-semibold">Cargando asignaturas oficiales...</p>
            </div>
          ) : cursosFiltrados.length === 0 ? (
            <div className="p-8 bg-[#121212] border border-[#1f1f1f] rounded-[6px] text-center text-[#b3b3b3] text-xs">
              No hay cursos registrados o disponibles en este momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cursosFiltrados.map((curso) => (
                <div 
                  key={curso.id}
                  className="bg-[#121212] border border-[#1f1f1f] hover:border-[#333333] rounded-[6px] p-5 space-y-4 transition-all shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-[#1f1f1f] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 bg-[#1f1f1f] text-white text-[10px] font-mono font-bold rounded-[2px]">
                          {curso.codigo}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/20 text-[10px] font-bold rounded-[2px]">
                          {curso.grupo}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight pt-0.5">
                        {curso.nombre}
                      </h3>
                    </div>
                  </div>

                  {/* Docente y Horario */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#000000] border border-[#1f1f1f] rounded-[6px] text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-[#1f1f1f] text-[#b3b3b3] rounded-[4px]">
                        <User className="w-4 h-4 text-[#1ed760]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#73777c] uppercase font-bold">Docente Titular</p>
                        <p className="font-semibold text-white">{curso.profesor}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-[#1f1f1f] text-[#b3b3b3] rounded-[4px]">
                        <Clock className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#73777c] uppercase font-bold">Horario</p>
                        <p className="font-semibold text-white">{curso.horario}</p>
                      </div>
                    </div>
                  </div>

                  {/* Enlace al Sílabo en PDF */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#1f1f1f]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#73777c]" />
                      <span className="text-xs text-[#b3b3b3]">Sílabo Oficial del Curso:</span>
                    </div>

                    {curso.silaboUrl ? (
                      <a 
                        href={curso.silaboUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-[#ffffff] hover:bg-[#c5c5c5] text-[#000000] font-bold text-xs rounded-[9999px] transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Ver / Descargar PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="px-3 py-1.5 bg-[#1f1f1f] text-[#73777c] text-xs font-semibold rounded-[9999px] cursor-not-allowed">
                        Publicación pendiente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. VISTA 2: TAREAS Y ENTREGABLES */}
      {activeMainTab === 'tareas' && (
        <div className="space-y-6 pt-2">
          
          {/* Métricas rápidas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Tareas Pendientes</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">5</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[11px]">2 urgentes</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Entregadas a Tiempo</span>
                <CheckCircle2 className="w-4 h-4 text-[#1ed760]" />
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">14</span>
                <span className="text-xs text-[#1ed760] font-bold">100% puntual</span>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Calificadas</span>
                <span className="text-xs text-[#1ed760] font-bold">Promedio: 17.8</span>
              </div>
              <div className="mt-3 text-2xl font-bold text-white">12</div>
            </div>

            <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[#b3b3b3] text-xs font-semibold">
                <span>Próximo Vencimiento</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="mt-2">
                <p className="text-sm font-bold text-rose-400">Mañana, 23:59 hrs</p>
                <p className="text-xs text-[#b3b3b3] truncate mt-0.5">Proyecto de Investigación • Taller N° 4</p>
              </div>
            </div>
          </div>

          {/* Lista de Tareas Activas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 space-y-3 cursor-pointer border-l-4 border-l-[#1ed760]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1ed760]">Proyecto de Investigación (INV-401)</span>
                  <span className="px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-full text-[10px] font-semibold">Vence en 26h</span>
                </div>
                <h3 className="font-bold text-white text-sm">Taller N° 4: Avance de Documentación y Matriz Metodológica</h3>
                <div className="flex items-center justify-between pt-2 border-t border-[#1f1f1f] text-xs text-[#b3b3b3]">
                  <span>Informe Grupal</span>
                  <span className="text-white font-bold">Ponderación: 15%</span>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-4 space-y-3 cursor-pointer">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#b3b3b3]">Seminario de Tesis (SEM-502)</span>
                  <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full text-[10px]">Vence en 4 días</span>
                </div>
                <h3 className="font-bold text-slate-200 text-sm">Entrega de Estado del Arte</h3>
                <div className="flex items-center justify-between pt-2 border-t border-[#1f1f1f] text-xs text-[#b3b3b3]">
                  <span>Individual</span>
                  <span>Pendiente</span>
                </div>
              </div>
            </div>

            {/* Detalle de la tarea seleccionada */}
            <div className="lg:col-span-7 bg-[#121212] border border-[#1f1f1f] rounded-[6px] p-6 space-y-5">
              <div className="space-y-2 border-b border-[#1f1f1f] pb-4">
                <span className="px-2.5 py-0.5 bg-[#1ed760]/10 text-[#1ed760] text-xs font-bold rounded">
                  INV-401 • Proyecto de Investigación e Innovación Tecnológica
                </span>
                <h2 className="text-xl font-bold text-white">
                  Taller N° 4: Avance de Documentación y Matriz Metodológica
                </h2>
                <p className="text-xs text-[#b3b3b3]">
                  Prof. Adolfo Ventocilla Flores • Modalidad Grupal
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#b3b3b3]">
                <p className="font-bold text-white uppercase tracking-wider">Instrucciones:</p>
                <div className="bg-[#000000] border border-[#1f1f1f] p-4 rounded-[6px] space-y-2">
                  <p>1. Presentar el documento en formato PDF siguiendo los lineamientos explicados en clase.</p>
                  <p>2. Asegurar que el enlace del repositorio o la base de datos en Supabase esté accesible.</p>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-3 bg-[#ffffff] hover:bg-[#c5c5c5] text-[#000000] font-extrabold text-xs rounded-[9999px] transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Subir Entrega Definitiva (PDF)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}