import { useState } from 'react';
import {
  CreditCard,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Check,
  FileText,
  Building2,
  QrCode,
  ArrowUpRight,
  X,
  Smartphone,
  ShieldCheck,
  Loader2,
  Lock
} from 'lucide-react';

type PagoHistorial = {
  id: string;
  concepto: string;
  monto: number;
  fecha: string;
  numOperacion: string;
  estado: 'Aprobado' | 'Pendiente' | 'Rechazado';
};

export default function PagosView() {
  const [copiado, setCopiado] = useState<string | null>(null);
  const [archivoVoucher, setArchivoVoucher] = useState<File | null>(null);
  const [numOperacion, setNumOperacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Estados para la pasarela de pago directo
  const [cuotaPendiente, setCuotaPendiente] = useState({
    concepto: 'Pensión Cuota 2 - Octubre',
    monto: 250.0,
    vencimiento: '25 Octubre, 2026',
    pagada: false
  });

  const [showPayModal, setShowPayModal] = useState(false);
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'yape'>('tarjeta');
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [pagoCompletado, setPagoCompletado] = useState(false);

  // Formulario de tarjeta
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    expiracion: '',
    cvv: '',
    nombre: ''
  });

  // Historial de pagos
  const [historial, setHistorial] = useState<PagoHistorial[]>([
    {
      id: '1',
      concepto: 'Matrícula 2026-II',
      monto: 350.0,
      fecha: '15/08/2026',
      numOperacion: 'OP-882910',
      estado: 'Aprobado',
    },
    {
      id: '2',
      concepto: 'Pensión Cuota 1 - Septiembre',
      monto: 250.0,
      fecha: '10/09/2026',
      numOperacion: 'OP-901234',
      estado: 'Aprobado',
    },
  ]);

  const copiarTexto = (texto: string, campo: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(campo);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handleSubirVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numOperacion || !archivoVoucher) {
      alert('Por favor adjunta la imagen del voucher e ingresa el número de operación.');
      return;
    }

    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setMensajeExito(true);
      setNumOperacion('');
      setArchivoVoucher(null);
    }, 1500);
  };

  const handleProcesarPagoLinea = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesandoPago(true);

    setTimeout(() => {
      const numOpGenerado = `OP-${Math.floor(100000 + Math.random() * 900000)}`;
      const hoy = new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      // Agregar al historial de pagos
      const nuevoPago: PagoHistorial = {
        id: String(Date.now()),
        concepto: cuotaPendiente.concepto,
        monto: cuotaPendiente.monto,
        fecha: hoy,
        numOperacion: numOpGenerado,
        estado: 'Aprobado'
      };

      setHistorial([nuevoPago, ...historial]);
      setCuotaPendiente({ ...cuotaPendiente, pagada: true });
      setProcesandoPago(false);
      setPagoCompletado(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* 1. Alerta / Resumen de Estado Financiero */}
      <div className={`rounded-2xl p-6 ring-1 transition-all ${
        cuotaPendiente.pagada 
          ? 'bg-emerald-950/40 ring-emerald-500/30 border-l-4 border-l-emerald-500'
          : 'bg-slate-900 ring-slate-800 border-l-4 border-l-amber-500'
      }`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`rounded-md px-2 py-0.5 text-xs font-semibold border ${
                cuotaPendiente.pagada
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {cuotaPendiente.pagada ? 'AL DÍA / PAGADO' : 'PENDIENTE DE PAGO'}
              </span>
              <span className="text-xs text-slate-400">Vence: {cuotaPendiente.vencimiento}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{cuotaPendiente.concepto}</h2>
            <p className="text-xs text-slate-400">
              {cuotaPendiente.pagada
                ? '¡Gracias! Tu cuota ha sido procesada correctamente.'
                : 'Realiza el pago directamente con tarjeta o escaneando el QR.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Total a pagar:</span>
              <span className={`text-2xl font-extrabold ${cuotaPendiente.pagada ? 'text-slate-400 line-through' : 'text-emerald-400'}`}>
                S/ {cuotaPendiente.monto.toFixed(2)}
              </span>
            </div>

            {!cuotaPendiente.pagada && (
              <button
                onClick={() => setShowPayModal(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-[0.98]"
              >
                <CreditCard className="h-4 w-4" />
                Pagar en Línea
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 2. Cuentas y Métodos de Pago Oficiales */}
        <div className="space-y-4 rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-400" />
            Cuentas Bancarias e Institucionales
          </h3>
          <p className="text-xs text-slate-400">
            Puedes pagar mediante transferencia, banca por internet o agente autorizado.
          </p>

          {/* Tarjeta interactiva del QR */}
          <div
            onClick={() => setShowQrModal(true)}
            className="group flex cursor-pointer items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-purple-500/50 hover:bg-slate-900/90 active:scale-[0.99]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                Yape / Plin (Instituto Progresa)
              </h4>
              <p className="text-xs text-slate-400">
                Teléfono: 987 654 321 •{' '}
                <span className="text-purple-400 underline">Toca para ampliar QR</span>
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {/* Banco de la Nación */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-200">Banco de la Nación (Cuenta Corriente)</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md border border-blue-500/20">
                  Agente / Ventanilla
                </span>
              </div>
              <div className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-slate-300">
                <span>00-011-123456</span>
                <button onClick={() => copiarTexto('00-011-123456', 'bn')} className="text-slate-400 hover:text-white">
                  {copiado === 'bn' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* BCP / CCI */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-200">BCP - Código CCI (Interbancario)</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Transferencia
                </span>
              </div>
              <div className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded-lg border border-slate-800 font-mono text-slate-300">
                <span>002-191-001234567890-54</span>
                <button onClick={() => copiarTexto('002-191-001234567890-54', 'cci')} className="text-slate-400 hover:text-white">
                  {copiado === 'cci' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Módulo "Subir Voucher de Pago" */}
        <div className="space-y-4 rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Upload className="h-5 w-5 text-emerald-400" />
            Validar Comprobante de Pago
          </h3>
          <p className="text-xs text-slate-400">
            Adjunta la foto o captura del voucher para que Tesorería valide tu cuota.
          </p>

          {mensajeExito ? (
            <div className="rounded-xl bg-emerald-500/10 p-6 text-center border border-emerald-500/20 space-y-3">
              <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">¡Voucher enviado con éxito!</h4>
              <p className="text-xs text-slate-300">
                Tu comprobante ya está en cola de revisión por Tesorería. Te notificaremos al ser validado.
              </p>
              <button
                onClick={() => setMensajeExito(false)}
                className="text-xs text-emerald-400 hover:underline pt-2 inline-block"
              >
                Subir otro comprobante
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubirVoucher} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Número de Operación / Constancia
                </label>
                <input
                  type="text"
                  placeholder="Ej: 90128471"
                  value={numOperacion}
                  onChange={(e) => setNumOperacion(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Foto o PDF del Voucher
                </label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-800 rounded-xl cursor-pointer bg-slate-950 hover:bg-slate-900 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 mb-2 text-slate-400" />
                    <p className="text-xs text-slate-400">
                      {archivoVoucher ? (
                        <span className="text-emerald-400 font-semibold">{archivoVoucher.name}</span>
                      ) : (
                        'Toca para seleccionar imagen'
                      )}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setArchivoVoucher(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50"
              >
                {enviando ? 'Enviando a Tesorería...' : 'Enviar Voucher para Validación'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 4. Historial de Pagos y Boletas */}
      <div className="rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-400" />
          Historial de Pagos Realizados
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-3 rounded-l-lg">Concepto</th>
                <th className="p-3">Monto</th>
                <th className="p-3">N° Operación</th>
                <th className="p-3">Fecha</th>
                <th className="p-3 rounded-r-lg">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {historial.map((pago) => (
                <tr key={pago.id} className="hover:bg-slate-950/50 transition-colors">
                  <td className="p-3 font-semibold text-white">{pago.concepto}</td>
                  <td className="p-3 text-emerald-400 font-bold">S/ {pago.monto.toFixed(2)}</td>
                  <td className="p-3 font-mono text-slate-400">{pago.numOperacion}</td>
                  <td className="p-3 text-slate-400">{pago.fecha}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                      <CheckCircle className="h-3 w-3" />
                      {pago.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== MODAL PASARELA DE PAGO EN LÍNEA ===== */}
      {showPayModal && (
        <div 
          onClick={() => setShowPayModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md cursor-default rounded-2xl border border-slate-700 bg-[#0b1329] p-6 shadow-2xl space-y-5"
          >
            <button
              type="button"
              onClick={() => setShowPayModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {pagoCompletado ? (
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Pago Procesado con Éxito!</h3>
                <p className="text-xs text-slate-300">
                  Se ha registrado el pago de <span className="font-bold text-white">{cuotaPendiente.concepto}</span> por <span className="text-emerald-400 font-bold">S/ {cuotaPendiente.monto.toFixed(2)}</span>.
                </p>
                <div className="rounded-xl bg-slate-900 p-3 text-xs text-slate-400 font-mono">
                  Comprobante: OP-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowPayModal(false);
                    setPagoCompletado(false);
                  }}
                  className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
                >
                  Entendido / Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h3 className="text-base font-bold text-white">Pasarela de Pago Segura</h3>
                    <p className="text-[11px] text-slate-400">Paga con Tarjeta de Débito/Crédito</p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/90 p-3.5 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">{cuotaPendiente.concepto}</span>
                  <span className="font-extrabold text-emerald-400 text-sm">S/ {cuotaPendiente.monto.toFixed(2)}</span>
                </div>

                <form onSubmit={handleProcesarPagoLinea} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Nombre en la tarjeta</label>
                    <input
                      type="text"
                      required
                      placeholder="JUAN PEREZ"
                      value={tarjeta.nombre}
                      onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Número de tarjeta</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4557 1234 5678 9010"
                        value={tarjeta.numero}
                        onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 pr-10 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">Vencimiento</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        value={tarjeta.expiracion}
                        onChange={(e) => setTarjeta({ ...tarjeta, expiracion: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={tarjeta.cvv}
                        onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={procesandoPago}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
                  >
                    {procesandoPago ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Procesando pago con entidad bancaria...
                      </>
                    ) : (
                      `Pagar S/ ${cuotaPendiente.monto.toFixed(2)} ahora`
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== MODAL AMPLIO PARA QR ===== */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm cursor-default rounded-2xl border border-slate-700 bg-[#0f172a] p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4">
              <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
                Yape / Plin
              </span>
              <h3 className="mt-2 text-lg font-bold text-white">Instituto Progresa - Caja Chica</h3>
              <p className="text-xs text-slate-400">Escanea desde tu app o toma captura</p>
            </div>

            <div className="mx-auto my-4 flex h-60 w-60 items-center justify-center rounded-2xl bg-white p-3 shadow-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://progresa.edu.pe/pagos/demo"
                alt="QR de Pago Yape/Plin"
                className="h-full w-full object-contain rounded-lg"
              />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Smartphone className="h-4 w-4 text-purple-400" />
                <span className="font-mono text-sm font-bold text-white">987 654 321</span>
              </div>
              <span className="text-xs font-medium text-purple-400">Titular: Admin Progresa</span>
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              * Recuerda adjuntar tu comprobante tras realizar el pago.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}