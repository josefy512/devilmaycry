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

  // Datos simulados de historial de pagos
  const [historial] = useState<PagoHistorial[]>([
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
    // Simulación de envío a Supabase / Backend
    setTimeout(() => {
      setEnviando(false);
      setMensajeExito(true);
      setNumOperacion('');
      setArchivoVoucher(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* 1. Alerta / Resumen de Estado Financiero */}
      <div className="rounded-2xl bg-slate-900 p-6 ring-1 ring-slate-800 border-l-4 border-l-amber-500">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
                PENDIENTE DE PAGO
              </span>
              <span className="text-xs text-slate-400">Vence: 25 Octubre, 2026</span>
            </div>
            <h2 className="text-xl font-bold text-white">Pensión Cuota 2 - Octubre</h2>
            <p className="text-xs text-slate-400">
              Realiza el pago antes de la fecha límite para evitar cargos por mora.
            </p>
          </div>

          <div className="flex items-baseline gap-2 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Total a pagar:</span>
            <span className="text-2xl font-extrabold text-emerald-400">S/ 250.00</span>
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
                <button
                  onClick={() => copiarTexto('00-011-123456', 'bn')}
                  className="text-slate-400 hover:text-white"
                >
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
                <button
                  onClick={() => copiarTexto('002-191-001234567890-54', 'cci')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiado === 'cci' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Yape / Plin */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Yape / Plin Institucional</p>
                    <p className="text-[11px] text-slate-400">Teléfono: 987 654 321</p>
                  </div>
                </div>
                <button
                  onClick={() => copiarTexto('987654321', 'yape')}
                  className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 text-slate-300"
                >
                  {copiado === 'yape' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
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
    </div>
  );
}
