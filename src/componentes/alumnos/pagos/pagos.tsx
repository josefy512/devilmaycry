import React, { useState } from 'react';
import {
  CreditCard,
  Upload,
  CheckCircle,
  Copy,
  Check,
  FileText,
  Building2,
  QrCode,
  X,
  Smartphone,
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

  const [cuotaPendiente, setCuotaPendiente] = useState({
    concepto: 'Pensión Cuota 2 - Octubre',
    monto: 250.0,
    vencimiento: '25 Octubre, 2026',
    pagada: false
  });

  const [showPayModal, setShowPayModal] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);
  const [pagoCompletado, setPagoCompletado] = useState(false);

  const [tarjeta, setTarjeta] = useState({
    numero: '',
    expiracion: '',
    cvv: '',
    nombre: ''
  });

  const [historial, setHistorial] = useState<PagoHistorial[]>([
    {
      id: '1',
      concepto: 'Matrícula 2026-II',
      monto: 350.0,
      fecha: '15/08/2026',
      numOperacion: 'OP-882910',
      estado: 'Aprobado'
    },
    {
      id: '2',
      concepto: 'Pensión Cuota 1 - Septiembre',
      monto: 250.0,
      fecha: '10/09/2026',
      numOperacion: 'OP-901234',
      estado: 'Aprobado'
    }
  ]);

  const copiarTexto = (texto: string, campo: string) => {
    navigator.clipboard.writeText(texto);
    setCopiado(campo);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handleSubirVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numOperacion || !archivoVoucher) {
      alert('Adjunta el comprobante e ingresa el número de operación.');
      return;
    }

    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setMensajeExito(true);
      setNumOperacion('');
      setArchivoVoucher(null);
    }, 1200);
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
    }, 1500);
  };

  return (
    <div className="space-y-5 text-slate-200">
      {/* 1. Resumen de cuota vigente */}
      <div
        className={`rounded-lg p-4 sm:p-5 border transition-colors ${
          cuotaPendiente.pagada
            ? 'bg-[#111C26] border-emerald-500/40 border-l-4 border-l-emerald-500'
            : 'bg-[#111C26] border-slate-800 border-l-4 border-l-amber-400'
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded px-2 py-0.5 text-[11px] font-semibold border ${
                  cuotaPendiente.pagada
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}
              >
                {cuotaPendiente.pagada ? 'Pagado' : 'Pendiente de pago'}
              </span>
              <span className="text-xs text-slate-400">Vence: {cuotaPendiente.vencimiento}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{cuotaPendiente.concepto}</h2>
            <p className="text-xs text-slate-400">
              {cuotaPendiente.pagada
                ? 'La cuota ha sido registrada correctamente en el historial.'
                : 'Registra tu pago en línea o adjunta el comprobante de depósito o transferencia.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-2 bg-[#0B1218] px-4 py-2.5 rounded-md border border-slate-800">
              <span className="text-xs text-slate-400">Monto:</span>
              <span
                className={`text-xl font-extrabold ${
                  cuotaPendiente.pagada ? 'text-slate-400 line-through' : 'text-white'
                }`}
              >
                S/ {cuotaPendiente.monto.toFixed(2)}
              </span>
            </div>

            {!cuotaPendiente.pagada && (
              <button
                type="button"
                onClick={() => setShowPayModal(true)}
                className="flex items-center gap-2 rounded-md bg-[#0084C2] hover:bg-[#0073A8] px-4 py-2.5 text-xs font-semibold text-white transition-colors"
              >
                <CreditCard className="h-4 w-4" />
                <span>Pagar en línea</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Cuentas institucionales y Validación de comprobante */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Cuentas */}
        <div className="space-y-4 rounded-lg bg-[#111C26] p-4 sm:p-5 border border-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="h-4 w-4 text-[#A8D5EE]" />
            <h3 className="text-sm font-bold text-white">Cuentas Institucionales</h3>
          </div>
          <p className="text-xs text-slate-400">
            Realiza abonos mediante transferencia, banca digital o recaudación autorizada.
          </p>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="w-full text-left flex items-center gap-3.5 rounded-md border border-slate-800 bg-[#0B1218] p-3.5 hover:border-[#0084C2]/60 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#002B45] border border-[#0084C2]/30 text-[#A8D5EE] shrink-0">
              <QrCode className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white">Billetera Móvil (Yape / Plin)</h4>
              <p className="text-xs text-slate-400 truncate">
                Número: 987 654 321 · <span className="text-[#A8D5EE] underline">Ver código QR</span>
              </p>
            </div>
          </button>

          <div className="space-y-3">
            <div className="rounded-md bg-[#0B1218] p-3.5 border border-slate-800">
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-200">
                  Banco de la Nación (Cuenta Corriente)
                </span>
                <span className="text-[10px] bg-[#002B45] text-[#A8D5EE] px-2 py-0.5 rounded border border-[#0084C2]/30 font-semibold">
                  Ventanilla / Agente
                </span>
              </div>
              <div className="flex justify-between items-center text-xs bg-[#111C26] px-3 py-2 rounded border border-slate-800 font-mono text-slate-200">
                <span>00-011-123456</span>
                <button
                  type="button"
                  onClick={() => copiarTexto('00-011-123456', 'bn')}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Copiar cuenta Banco de la Nación"
                >
                  {copiado === 'bn' ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-md bg-[#0B1218] p-3.5 border border-slate-800">
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-200">
                  BCP · Código CCI Interbancario
                </span>
                <span className="text-[10px] bg-[#002B45] text-[#A8D5EE] px-2 py-0.5 rounded border border-[#0084C2]/30 font-semibold">
                  Transferencia
                </span>
              </div>
              <div className="flex justify-between items-center text-xs bg-[#111C26] px-3 py-2 rounded border border-slate-800 font-mono text-slate-200">
                <span className="truncate">002-191-001234567890-54</span>
                <button
                  type="button"
                  onClick={() => copiarTexto('002-191-001234567890-54', 'cci')}
                  className="text-slate-400 hover:text-white transition-colors shrink-0 ml-2"
                  aria-label="Copiar CCI BCP"
                >
                  {copiado === 'cci' ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subir comprobante */}
        <div className="space-y-4 rounded-lg bg-[#111C26] p-4 sm:p-5 border border-slate-800">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Upload className="h-4 w-4 text-[#A8D5EE]" />
            <h3 className="text-sm font-bold text-white">Registro de Comprobante</h3>
          </div>
          <p className="text-xs text-slate-400">
            Ingresa el número de operación y adjunta la constancia para validación administrativa.
          </p>

          {mensajeExito ? (
            <div className="rounded-md bg-[#0B1218] p-5 text-center border border-emerald-500/30 space-y-2.5">
              <CheckCircle className="h-8 w-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Comprobante registrado</h4>
              <p className="text-xs text-slate-400">
                El registro fue enviado para revisión del área correspondiente.
              </p>
              <button
                type="button"
                onClick={() => setMensajeExito(false)}
                className="text-xs font-semibold text-[#A8D5EE] hover:underline pt-1"
              >
                Registrar otro comprobante
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubirVoucher} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Número de Operación o Constancia
                </label>
                <input
                  type="text"
                  placeholder="Ej. 90128471"
                  value={numOperacion}
                  onChange={(e) => setNumOperacion(e.target.value)}
                  className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0084C2]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Comprobante (Imagen o PDF)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-slate-700 rounded-md cursor-pointer bg-[#0B1218] hover:border-[#0084C2]/60 transition-colors px-3 text-center">
                  <Upload className="w-5 h-5 mb-1.5 text-slate-400" />
                  <p className="text-xs text-slate-400 truncate max-w-full">
                    {archivoVoucher ? (
                      <span className="text-[#A8D5EE] font-semibold">{archivoVoucher.name}</span>
                    ) : (
                      'Seleccionar archivo de comprobante'
                    )}
                  </p>
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
                className="w-full flex items-center justify-center gap-2 rounded-md bg-[#002B45] hover:bg-[#00385A] border border-[#0084C2]/40 py-2.5 text-xs font-semibold text-white transition-colors disabled:opacity-50"
              >
                {enviando ? 'Enviando registro...' : 'Enviar comprobante'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 3. Historial de Pagos */}
      <div className="rounded-lg bg-[#111C26] p-4 sm:p-5 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileText className="h-4 w-4 text-[#A8D5EE]" />
          <h3 className="text-sm font-bold text-white">Historial de Pagos</h3>
        </div>

        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full text-left text-xs text-slate-300 min-w-[520px]">
            <thead className="bg-[#0B1218] text-slate-400 uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-bold">Concepto</th>
                <th className="py-2.5 px-3 font-bold">Monto</th>
                <th className="py-2.5 px-3 font-bold">N.° Operación</th>
                <th className="py-2.5 px-3 font-bold">Fecha</th>
                <th className="py-2.5 px-3 font-bold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {historial.map((pago) => (
                <tr key={pago.id} className="hover:bg-[#0B1218]/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{pago.concepto}</td>
                  <td className="py-3 px-3 font-bold text-slate-100">S/ {pago.monto.toFixed(2)}</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{pago.numOperacion}</td>
                  <td className="py-3 px-3 text-slate-400">{pago.fecha}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                      {pago.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Pago en Línea */}
      {showPayModal && (
        <div
          onClick={() => setShowPayModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-lg border border-slate-700 bg-[#0F1923] p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Pago en Línea</h3>
                <p className="text-[11px] text-slate-400">Registro directo de cuota académica</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Cerrar ventana de pago"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {pagoCompletado ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Pago registrado</h4>
                <p className="text-xs text-slate-300">
                  Se registró <span className="font-semibold text-white">{cuotaPendiente.concepto}</span> por{' '}
                  <span className="font-bold text-white">S/ {cuotaPendiente.monto.toFixed(2)}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowPayModal(false);
                    setPagoCompletado(false);
                  }}
                  className="w-full rounded-md bg-[#0084C2] hover:bg-[#0073A8] py-2.5 text-xs font-semibold text-white transition-colors"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <div className="rounded-md bg-[#0B1218] p-3 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">{cuotaPendiente.concepto}</span>
                  <span className="font-bold text-white text-sm">
                    S/ {cuotaPendiente.monto.toFixed(2)}
                  </span>
                </div>

                <form onSubmit={handleProcesarPagoLinea} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Titular de la tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre como figura en la tarjeta"
                      value={tarjeta.nombre}
                      onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
                      className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0084C2]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        value={tarjeta.numero}
                        onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}
                        className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 px-3 py-2 pr-9 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#0084C2]"
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        value={tarjeta.expiracion}
                        onChange={(e) => setTarjeta({ ...tarjeta, expiracion: e.target.value })}
                        className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#0084C2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 mb-1">
                        Código de seguridad
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="CVV"
                        value={tarjeta.cvv}
                        onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value })}
                        className="w-full rounded-md bg-[#0B1218] border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-[#0084C2]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={procesandoPago}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-[#0084C2] hover:bg-[#0073A8] py-2.5 text-xs font-semibold text-white transition-colors disabled:opacity-50 mt-2"
                  >
                    {procesandoPago ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Procesando pago...</span>
                      </>
                    ) : (
                      <span>Confirmar pago de S/ {cuotaPendiente.monto.toFixed(2)}</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de Código QR */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-lg border border-slate-700 bg-[#0F1923] p-5 text-center space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A8D5EE]">
                  Billetera Móvil
                </span>
                <h3 className="text-sm font-bold text-white">Código QR Institucional</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Cerrar código QR"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-md bg-white p-2.5">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://progresa.edu.pe/pagos/demo"
                alt="Código QR de pago institucional"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-between rounded-md border border-slate-800 bg-[#0B1218] px-3 py-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Smartphone className="h-4 w-4 text-[#A8D5EE]" />
                <span className="font-mono font-bold">987 654 321</span>
              </div>
              <span className="text-slate-400">Caja Institucional</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}