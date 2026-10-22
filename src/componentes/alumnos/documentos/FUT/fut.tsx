import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Download, 
  Save, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building2,
  Calendar,
  User,
  HelpCircle
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

export const FutPage: React.FC = () => {
  // Estado inicial del formulario con pre-llenado dinámico si existe en sesión
  const [formData, setFormData] = useState<FutFormData>({
    sumilla: '',
    dirigidoA: 'SEÑOR DIRECTOR DEL INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO "ARTURO SABROSO MONTOYA"',
    nombresApellidos: '',
    condicion: '',
    dni: '',
    telefono: '',
    domicilio: '',
    fundamento: '',
    documentosAdjuntos: '',
    lugarFecha: `Lima, ${new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}`
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cargoData, setCargoData] = useState<{ ticket: string; fechaHora: string } | null>(null);

  // Intentar cargar datos del usuario desde localStorage para evitar reescritura
  useEffect(() => {
    const savedUser = localStorage.getItem('usuario_progresa');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setFormData(prev => ({
          ...prev,
          nombresApellidos: user.nombreCompleto || 'ALEX MORGAN',
          dni: user.dni || '73829102',
          condicion: `ALUMNO - ${user.carrera || 'DESARROLLO DE SOFTWARE'} - VI CICLO - MATRÍCULA N° 2026-II`,
          telefono: user.telefono || '987654321',
          domicilio: user.direccion || 'Av. Prolongación Parinacochas 123, La Victoria'
        }));
      } catch (e) {
        console.error('Error cargando datos de usuario', e);
      }
    } else {
      // Valores por defecto para demo
      setFormData(prev => ({
        ...prev,
        nombresApellidos: 'ALEX MORGAN',
        dni: '73829102',
        condicion: 'ALUMNO - DESARROLLO DE SOFTWARE - CICLO VII - MATRÍCULA N° 2026-0042',
        telefono: '912345678',
        domicilio: 'Av. Raymondi 1020, La Victoria, Lima'
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Borrador guardado localmente.');
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sumilla || !formData.fundamento) {
      alert('Por favor completa la sumilla y el fundamento del pedido.');
      return;
    }

    const now = new Date();
    const ticket = `FUT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fechaHora = `${now.toLocaleDateString('es-PE')} a las ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;

    setCargoData({ ticket, fechaHora });
    setIsSubmitted(true);
  };

  const handleDownloadPDF = () => {
    // Simulación de descarga de PDF con sello digital
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Encabezado Principal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Formulario Único de Trámite (FUT)</h1>
              <p className="text-sm text-slate-400">Trámite digital rápido, ecológico y seguro sin salir de casa.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Mesa de Partes Digital Activa
          </div>
        </div>

        {/* Mensaje de Confirmación / Cargo generado */}
        {isSubmitted && cargoData && (
          <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-emerald-200">¡FUT Enviado Exitosamente!</h3>
                <p className="text-sm text-slate-300">
                  Código de Cargo: <span className="font-mono font-bold text-emerald-400">{cargoData.ticket}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3.5 h-3.5" /> Registrado el {cargoData.fechaHora}
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-emerald-900/30"
            >
              <Download className="w-4 h-4" />
              Descargar Cargo Oficial (PDF)
            </button>
          </div>
        )}

        {/* Formulario FUT Digital */}
        <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Membrete Institucional en el Formulario */}
          <div className="border-b border-slate-800 pb-6 text-center space-y-1">
            <p className="text-xs tracking-widest text-blue-400 font-semibold uppercase">Instituto de Educación Superior Tecnológico Público</p>
            <h2 className="text-xl sm:text-2xl font-black text-white">"ARTURO SABROSO MONTOYA"</h2>
            <p className="text-xs text-slate-400">Prolg. Antonio Raymondi N° 1020 - La Victoria | Telf.: 473-0440</p>
            <p className="text-[10px] text-slate-500 pt-1">R.M. N° 447-90-ED / R.M. REVALIDADO R.D. N° 0815-2006-ED</p>
          </div>

          {/* Campo 1: Sumilla */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-400 flex items-center gap-2">
              <span>SUMILLA (Solicitud corta)</span>
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="sumilla"
              required
              disabled={isSubmitted}
              placeholder="Ej.: SOLICITO RESERVA DE MATRÍCULA / CERTIFICADO DE ESTUDIOS"
              value={formData.sumilla}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-sm disabled:opacity-60"
            />
          </div>

          {/* Campo 1 Dirigido a */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">1.- DESTINATARIO</label>
            <input
              type="text"
              name="dirigidoA"
              readOnly
              value={formData.dirigidoA}
              className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-300 text-xs font-mono focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Campo 2: Datos del Usuario */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">2.- DATOS DEL USUARIO (NOMBRES Y APELLIDOS)</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="nombresApellidos"
                required
                disabled={isSubmitted}
                value={formData.nombresApellidos}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Campo 3: Condición o Situación Actual */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">3.- CONDICIÓN Y/O SITUACIÓN ACTUAL (ALUMNO - ESPECIALIDAD - SEMESTRE - MATRÍCULA N°)</label>
            <input
              type="text"
              name="condicion"
              required
              disabled={isSubmitted}
              value={formData.condicion}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Campos 4 y 5: DNI y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">4.- D.N.I. / C.I.P</label>
              <input
                type="text"
                name="dni"
                required
                disabled={isSubmitted}
                value={formData.dni}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">5.- TELÉFONO / CELULAR</label>
              <input
                type="text"
                name="telefono"
                required
                disabled={isSubmitted}
                value={formData.telefono}
                onChange={handleChange}
                className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
              />
            </div>
          </div>

          {/* Campo 6: Domicilio */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">6.- DOMICILIO DEL USUARIO</label>
            <input
              type="text"
              name="domicilio"
              required
              disabled={isSubmitted}
              value={formData.domicilio}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Campo 7: Fundamento del Pedido */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-amber-400 flex items-center gap-2">
              <span>7.- FUNDAMENTO DEL PEDIDO</span>
              <span className="text-red-400">*</span>
            </label>
            <textarea
              name="fundamento"
              rows={4}
              required
              disabled={isSubmitted}
              placeholder="Explique detalladamente las razones de su trámite..."
              value={formData.fundamento}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl p-4 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-60"
            />
          </div>

          {/* Campo 8: Documentos que se adjuntan */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-400">8.- DOCUMENTOS QUE SE ADJUNTA (OPCIONAL / ENLACES O NOMBRES DE VOUCHERS)</label>
            <input
              type="text"
              name="documentosAdjuntos"
              disabled={isSubmitted}
              placeholder="Ej.: Copia de DNI, Voucher de Pago N° 82910"
              value={formData.documentosAdjuntos}
              onChange={handleChange}
              className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 disabled:opacity-60"
            />
          </div>

          {/* Campo 9 y 10: Lugar, Fecha y Firma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">9.- LUGAR Y FECHA</label>
              <input
                type="text"
                name="lugarFecha"
                readOnly
                value={formData.lugarFecha}
                className="w-full bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-2 text-slate-400 text-xs cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-400">10.- FIRMA Y DECLARACIÓN</label>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="firmaCheck" 
                  defaultChecked 
                  disabled={isSubmitted} 
                  className="rounded text-blue-600 focus:ring-blue-500" 
                />
                <label htmlFor="firmaCheck" className="text-[11px] text-slate-400 leading-tight">
                  Declaración jurada digital: confirmo la veracidad de los datos registrados.
                </label>
              </div>
            </div>
          </div>

          {/* Botones de Acción (Guardar, Enviar y Descargar) */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving || isSubmitted}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-sm font-medium border border-slate-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Guardando...' : 'Guardar Borrador'}
            </button>

            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
              {!isSubmitted ? (
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm"
                >
                  <Send className="w-4 h-4" />
                  Enviar FUT Digital
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all text-sm"
                >
                  <Download className="w-4 h-4" />
                  Descargar Copia de Resguardo (PDF)
                </button>
              )}
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default FutPage;