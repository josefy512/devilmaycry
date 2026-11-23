import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import {
  FileText,
  Send,
  Download,
  Save,
  CheckCircle2,
  Clock,
  User,
  Upload,
  File,
  X
} from 'lucide-react';

interface FutFormData {
  sumilla: string;
  dirigidoA: string;
  nombresApellidos: string;
  condicion: string;
  dni: string;
  telefono: string;
  domicilio: string;
  fundamento: string;
  documentosAdjuntos: string;
  lugarFecha: string;
}

const inputBase =
  'w-full min-w-0 bg-[#0B1218] border border-slate-700/80 rounded-md px-3 py-2 text-white text-base sm:text-xs focus:outline-none focus:border-[#0084C2] disabled:opacity-60 transition-colors';

export const FutPage: React.FC = () => {
  const [formData, setFormData] = useState<FutFormData>({
    sumilla: '',
    dirigidoA:
      'SEÑOR DIRECTOR DEL INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO "ARTURO SABROSO MONTOYA"',
    nombresApellidos: '',
    condicion: '',
    dni: '',
    telefono: '',
    domicilio: '',
    fundamento: '',
    documentosAdjuntos: '',
    lugarFecha: `Lima, ${new Date().toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })}`
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cargoData, setCargoData] = useState<{ ticket: string; fechaHora: string } | null>(null);
  const [archivoAdjunto, setArchivoAdjunto] = useState<File | null>(null);

  useEffect(() => {
    const rawSession =
      localStorage.getItem('usuarioLogueado') || localStorage.getItem('usuario_progresa');

    if (rawSession) {
      try {
        const user = JSON.parse(rawSession);
        const nombreCompleto =
          user.nombreCompleto ||
          `${user.nombres || ''} ${user.apellidos || ''}`.trim();

        setFormData((prev) => ({
          ...prev,
          nombresApellidos: nombreCompleto || prev.nombresApellidos,
          dni: user.dni || prev.dni,
          condicion:
            user.condicion ||
            (user.carrera
              ? `ESTUDIANTE - ${user.carrera.toUpperCase()} - PERIODO 2026-II`
              : prev.condicion),
          telefono: user.telefono || prev.telefono,
          domicilio: user.direccion || user.domicilio || prev.domicilio
        }));
      } catch (e) {
        console.error('Error al cargar datos del usuario para el FUT:', e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('progresa_fut_borrador', JSON.stringify(formData));
    } catch (e) {
      console.error('Error al guardar borrador del FUT:', e);
    }
    setTimeout(() => {
      setIsSaving(false);
      alert('Borrador guardado en el dispositivo.');
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sumilla.trim() || !formData.fundamento.trim()) {
      alert('Completa la sumilla y el fundamento del pedido.');
      return;
    }

    setIsSaving(true);

    const now = new Date();
    const ticket = `FUT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fechaHora = `${now.toLocaleDateString('es-PE')} a las ${now.toLocaleTimeString('es-PE')}`;

    const nuevoFUT = {
      codigo: ticket,
      nombres_apellidos: formData.nombresApellidos.trim() || 'Estudiante',
      dni: formData.dni.trim() || '00000000',
      telefono: formData.telefono.trim() || 'No registrado',
      carrera: formData.condicion.trim() || 'Programa Académico',
      sumilla: formData.sumilla.trim(),
      fundamento: formData.fundamento.trim(),
      estado: 'pendiente'
    };

    try {
      const { error } = await supabase.from('futs').insert([nuevoFUT]);

      if (error) {
        console.error('Error al guardar en Supabase:', error);
        alert('No se pudo registrar el FUT en la base de datos.');
        setIsSaving(false);
        return;
      }

      localStorage.removeItem('progresa_fut_borrador');
      setCargoData({ ticket, fechaHora });
      setIsSaving(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error de red al enviar FUT:', err);
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#0B1218] text-slate-200 p-3 sm:p-5">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Encabezado del FUT */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111C26] border border-slate-800 p-4 sm:pr-12 rounded-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 shrink-0 bg-[#002B45] border border-[#0084C2]/30 rounded-md text-[#A8D5EE]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Formulario Único de Trámite (FUT)
              </h2>
              <p className="text-xs text-slate-400">
                Registro digital de solicitudes y trámites administrativos.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#002B45] border border-[#0084C2]/30 text-[#A8D5EE] text-[11px] font-semibold w-fit shrink-0">
            Formato Oficial
          </span>
        </div>

        {/* Constancia de envío */}
        {isSubmitted && cargoData && (
          <div className="bg-[#111C26] border border-emerald-500/40 border-l-4 border-l-emerald-500 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white">Trámite registrado</h3>
                <p className="text-xs text-slate-300 mt-0.5 break-words">
                  Código de cargo:{' '}
                  <span className="font-mono font-bold text-[#A8D5EE]">{cargoData.ticket}</span>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Registrado el {cargoData.fechaHora}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadPDF}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#0084C2] hover:bg-[#0073A8] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Descargar cargo</span>
            </button>
          </div>
        )}

        {/* Cuerpo del formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111C26] border border-slate-800 rounded-lg p-4 sm:p-6 space-y-5"
        >
          {/* Membrete institucional */}
          <div className="border-b border-slate-800 pb-4 text-center space-y-1">
            <p className="text-[10px] sm:text-xs tracking-wider text-[#A8D5EE] font-semibold uppercase">
              Instituto de Educación Superior Tecnológico Público
            </p>
            <h3 className="text-base sm:text-xl font-bold text-white break-words">
              &quot;ARTURO SABROSO MONTOYA&quot;
            </h3>
            <p className="text-[11px] text-slate-400">
              Prolg. Antonio Raymondi N.° 1020 - La Victoria · Telf.: 473-0440
            </p>
            <p className="text-[10px] text-slate-500">
              R.M. N.° 447-90-ED / R.M. Revalidado R.D. N.° 0815-2006-ED
            </p>
          </div>

          {/* Sumilla */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white">
              Sumilla (Solicitud corta) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="sumilla"
              required
              disabled={isSubmitted}
              placeholder="Ej. Solicito constancia de matrícula o reserva de turno"
              value={formData.sumilla}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* 1. Destinatario */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              1.- Destinatario
            </label>
            <div className="w-full bg-[#0B1218]/80 border border-slate-800 rounded-md px-3 py-2 text-slate-300 text-xs font-mono break-words">
              {formData.dirigidoA}
            </div>
          </div>

          {/* 2. Datos del usuario */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              2.- Datos del Usuario (Nombres y Apellidos) <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="nombresApellidos"
                required
                disabled={isSubmitted}
                placeholder="Nombres y apellidos completos"
                value={formData.nombresApellidos}
                onChange={handleChange}
                className={`${inputBase} pl-9`}
              />
            </div>
          </div>

          {/* 3. Condición */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 break-words">
              3.- Condición y Situación Actual (Programa de estudios, ciclo, matrícula)
            </label>
            <input
              type="text"
              name="condicion"
              required
              disabled={isSubmitted}
              placeholder="Ej. Estudiante - Programa de Estudios - Ciclo"
              value={formData.condicion}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* 4 y 5. DNI y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-semibold text-slate-300">
                4.- D.N.I. / Documento de Identidad <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="dni"
                required
                disabled={isSubmitted}
                placeholder="Número de DNI"
                value={formData.dni}
                onChange={handleChange}
                className={inputBase}
              />
            </div>

            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-semibold text-slate-300">
                5.- Teléfono / Celular <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                name="telefono"
                required
                disabled={isSubmitted}
                placeholder="Número de contacto"
                value={formData.telefono}
                onChange={handleChange}
                className={inputBase}
              />
            </div>
          </div>

          {/* 6. Domicilio */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              6.- Domicilio del Usuario
            </label>
            <input
              type="text"
              name="domicilio"
              required
              disabled={isSubmitted}
              placeholder="Dirección actual"
              value={formData.domicilio}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          {/* 7. Fundamento */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white">
              7.- Fundamento del Pedido <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="fundamento"
              rows={4}
              required
              disabled={isSubmitted}
              placeholder="Detalle el motivo y sustento de su solicitud..."
              value={formData.fundamento}
              onChange={handleChange}
              className="w-full min-w-0 bg-[#0B1218] border border-slate-700/80 rounded-md p-3 text-white text-base sm:text-xs placeholder-slate-500 focus:outline-none focus:border-[#0084C2] disabled:opacity-60 resize-y transition-colors"
            />
          </div>

          {/* 8. Documentos adjuntos */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 break-words">
              8.- Documentos Adjuntos (Comprobante de pago, constancias u otros)
            </label>

            {!archivoAdjunto ? (
              <label className="flex flex-col items-center justify-center w-full min-h-24 border border-slate-700 border-dashed rounded-md cursor-pointer bg-[#0B1218] hover:border-[#0084C2]/60 transition-colors px-4 py-4 text-center">
                <Upload className="w-5 h-5 mb-1.5 text-[#A8D5EE]" />
                <p className="text-xs text-slate-300 font-medium">
                  Seleccionar archivo para adjuntar
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  PDF, PNG, JPG (Máx. 10 MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  disabled={isSubmitted}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setArchivoAdjunto(e.target.files[0]);
                    }
                  }}
                />
              </label>
            ) : (
              <div className="flex items-center justify-between gap-2 p-3 bg-[#0B1218] border border-emerald-500/30 rounded-md">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-2 bg-[#002B45] text-[#A8D5EE] rounded shrink-0">
                    <File className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {archivoAdjunto.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(archivoAdjunto.size / (1024 * 1024)).toFixed(2)} MB · Archivo listo
                    </p>
                  </div>
                </div>
                {!isSubmitted && (
                  <button
                    type="button"
                    onClick={() => setArchivoAdjunto(null)}
                    className="shrink-0 p-1.5 bg-[#111C26] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded transition-colors"
                    title="Quitar archivo"
                    aria-label="Quitar archivo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 9 y 10. Lugar/Fecha y Declaración */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-semibold text-slate-300">
                9.- Lugar y Fecha
              </label>
              <input
                type="text"
                name="lugarFecha"
                readOnly
                value={formData.lugarFecha}
                className="w-full min-w-0 bg-[#0B1218]/70 border border-slate-800 rounded-md px-3 py-2 text-slate-400 text-xs cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5 min-w-0">
              <label className="block text-xs font-semibold text-slate-300">
                10.- Declaración del Solicitante
              </label>
              <div className="p-2.5 bg-[#0B1218] border border-slate-800 rounded-md flex items-start gap-2">
                <input
                  type="checkbox"
                  id="firmaCheck"
                  defaultChecked
                  disabled={isSubmitted}
                  className="mt-0.5 shrink-0 rounded border-slate-700 text-[#0084C2] focus:ring-0"
                />
                <label htmlFor="firmaCheck" className="text-[11px] text-slate-400 leading-snug">
                  Declaro que la información consignada en este formulario es verídica.
                </label>
              </div>
            </div>
          </div>

          {/* Acciones inferiores */}
          <div className="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving || isSubmitted}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1218] hover:bg-slate-800 text-slate-200 rounded-md transition-colors text-xs font-semibold border border-slate-700/80 disabled:opacity-50"
            >
              <Save className="w-4 h-4 shrink-0" />
              <span>{isSaving ? 'Guardando...' : 'Guardar borrador'}</span>
            </button>

            {!isSubmitted ? (
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0084C2] hover:bg-[#0073A8] text-white font-semibold rounded-md transition-colors text-xs disabled:opacity-60"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Enviar FUT</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#002B45] hover:bg-[#00385A] border border-[#0084C2]/40 text-white font-semibold rounded-md transition-colors text-xs"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Imprimir / Guardar cargo</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FutPage;