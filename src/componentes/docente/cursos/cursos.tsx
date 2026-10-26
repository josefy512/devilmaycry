import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Mail, 
  ListOrdered, 
  Award, 
  MoreVertical, 
  Filter,
  Loader2,
  Upload,
  FileCheck,
  X,
  ExternalLink
} from 'lucide-react';

export default function MisCursosPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para el Modal de Subida de Sílabo
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [archivoPDF, setArchivoPDF] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mensajeSubida, setMensajeSubida] = useState('');

  // 1. Cargar cursos asignados
  const fetchCursos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .ilike('profesor', '%Adolfo Ventocilla%');

      if (error) {
        console.error('Error al obtener cursos:', error);
      } else if (data) {
        const cursosFormateados = data.map((c) => ({
          id: c.id,
          codigo: c.codigo || 'INV-401',
          grupo: 'Grupo 1A • Turno Mañana',
          nombre: c.nombre_curso || c.nombre || 'Curso sin nombre',
          ubicacion: 'Aula 302 • Pabellón de Innovación',
          horario: 'Lun y Mié 10:00 – 12:00 PM',
          matriculados: 35,
          avanceSilabo: c.silabo_url ? 100 : 0,
          semana: c.silabo_url ? 'Sílabo Publicado' : 'Semana 1 de 16',
          silaboUrl: c.silabo_url || null,
          delegado: {
            nombre: 'Alumno Delegado',
            avatar: 'AD',
            email: 'delegado@progresa.edu.pe'
          }
        }));
        setCursos(cursosFormateados);
      }
    } catch (err) {
      console.error('Error inesperado:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  // 2. Función para subir el PDF a Supabase Storage
  const handleSubirSilabo = async (e) => {
    e.preventDefault();
    if (!archivoPDF || !cursoSeleccionado) return;

    try {
      setSubiendo(true);
      setMensajeSubida('');

      // Nombre único para el archivo en el bucket 'silabos'
      const fileExt = archivoPDF.name.split('.').pop();
      const fileName = `${cursoSeleccionado.codigo}_silabo_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // a) Subir a Supabase Storage (Bucket: 'silabos')
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('silabos')
        .upload(filePath, archivoPDF, {
          cacheControl: '3600',
          upsert: true
        });

      if (storageError) throw storageError;

      // b) Obtener URL pública del archivo cargado
      const { data: publicUrlData } = supabase
        .storage
        .from('silabos')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // c) Actualizar la columna 'silabo_url' en la tabla 'cursos'
      const { error: dbError } = await supabase
        .from('cursos')
        .update({ silabo_url: publicUrl })
        .eq('id', cursoSeleccionado.id);

      if (dbError) throw dbError;

      setMensajeSubida('¡Sílabo publicado con éxito!');
      await fetchCursos();
      
      setTimeout(() => {
        setCursoSeleccionado(null);
        setArchivoPDF(null);
        setMensajeSubida('');
      }, 1500);

    } catch (error) {
      console.error('Error al subir el sílabo:', error);
      setMensajeSubida(`Error: ${error.message || 'No se pudo subir el archivo'}`);
    } finally {
      setSubiendo(false);
    }
  };

  const cursosFiltrados = cursos.filter(c => 
    c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.codigo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#333333] pb-5">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#1ed760] tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1ed760] animate-pulse"></span>
            PORTAL DOCENTE ACTIVO
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Mis Cursos Asignados
          </h1>
          <p className="text-xs text-[#b3b3b3]">
            Ciclo Académico 2026-II • <strong className="text-white">{cursos.length} Asignatura(s) activa(s)</strong>
          </p>
        </div>

        {/* Buscador */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#73777c]" />
            <input 
              type="text" 
              placeholder="Buscar por código o nombre..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1f1f1f] border border-[#333333] rounded-full pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#1ed760] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Cargando o Grilla */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-[#b3b3b3] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#1ed760]" />
          <p className="text-xs font-semibold">Cargando cursos desde Supabase...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cursosFiltrados.map((curso) => (
            <div 
              key={curso.id}
              className="bg-[#121212] border border-[#1f1f1f] hover:border-[#333333] rounded-[6px] p-5 space-y-5 transition-all shadow-lg"
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
                  <h2 className="text-lg font-bold text-white tracking-tight pt-0.5">
                    {curso.nombre}
                  </h2>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => setCursoSeleccionado(curso)}
                  className="py-2.5 bg-[#ffffff] hover:bg-[#c5c5c5] text-[#000000] rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-4 h-4 text-[#000000]" />
                  <span>{curso.silaboUrl ? 'Actualizar Sílabo' : 'Subir Sílabo PDF'}</span>
                </button>

                {curso.silaboUrl ? (
                  <a 
                    href={curso.silaboUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-[#1f1f1f] hover:bg-[#292929] border border-[#1ed760]/50 text-[#1ed760] rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileCheck className="w-4 h-4 text-[#1ed760]" />
                    <span>Ver Sílabo (PDF)</span>
                    <ExternalLink className="w-3 h-3 text-[#1ed760]" />
                  </a>
                ) : (
                  <div className="py-2.5 bg-[#1f1f1f] text-[#73777c] rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 cursor-not-allowed">
                    <span>Sin Sílabo</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL DE SUBIDA ESTILO SPOTIFY */}
      {cursoSeleccionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#333333] rounded-[6px] max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            
            <button 
              onClick={() => {
                setCursoSeleccionado(null);
                setArchivoPDF(null);
                setMensajeSubida('');
              }}
              className="absolute top-4 right-4 text-[#b3b3b3] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold text-[#1ed760] tracking-wider uppercase">
                {cursoSeleccionado.codigo}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Subir Sílabo de Asignatura
              </h3>
              <p className="text-xs text-[#b3b3b3] mt-0.5">
                {cursoSeleccionado.nombre}
              </p>
            </div>

            <form onSubmit={handleSubirSilabo} className="space-y-4">
              <div className="border-2 border-dashed border-[#333333] hover:border-[#1ed760] rounded-[6px] p-6 text-center transition-colors bg-[#000000]">
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={(e) => setArchivoPDF(e.target.files[0])}
                  className="hidden" 
                  id="silabo-input"
                  required
                />
                <label htmlFor="silabo-input" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-[#1ed760]" />
                  <span className="text-xs font-semibold text-white">
                    {archivoPDF ? archivoPDF.name : 'Haz clic para seleccionar el archivo PDF'}
                  </span>
                  <span className="text-[10px] text-[#73777c]">
                    Solo formato .pdf (Máximo 10MB)
                  </span>
                </label>
              </div>

              {mensajeSubida && (
                <p className={`text-xs text-center font-bold ${mensajeSubida.includes('Error') ? 'text-red-400' : 'text-[#1ed760]'}`}>
                  {mensajeSubida}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#1f1f1f]">
                <button
                  type="button"
                  onClick={() => setCursoSeleccionado(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#b3b3b3] hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!archivoPDF || subiendo}
                  className="px-5 py-2 bg-[#ffffff] hover:bg-[#c5c5c5] disabled:bg-[#333333] disabled:text-[#73777c] text-[#000000] font-bold text-xs rounded-full transition-all flex items-center gap-2"
                >
                  {subiendo ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <span>Guardar y Publicar</span>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}