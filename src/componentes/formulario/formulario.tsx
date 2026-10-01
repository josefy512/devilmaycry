import { useState, useEffect, type FormEvent } from 'react';
import {
  GraduationCap,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Loader2,
  Wifi,
  WifiOff,
  User,
  Briefcase,
  CloudOff,
  Cloud,
} from 'lucide-react';

type Role = 'alumno' | 'docente' | 'personal';

const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
  { id: 'alumno', label: 'Alumno', icon: <User className="h-4 w-4" /> },
  { id: 'docente', label: 'Docente', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'personal', label: 'Personal', icon: <Briefcase className="h-4 w-4" /> },
];

export default function LoginForm() {
  const [role, setRole] = useState<Role>('alumno');
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!codigo.trim()) {
      setError('Ingresa tu DNI o código de alumno.');
      return;
    }
    if (!password) {
      setError('Ingresa tu contraseña.');
      return;
    }
    setSubmitting(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setError('Credenciales no registradas. Verifica tus datos.');
  };

  return (
    // 1. Cambiamos min-h-screen por h-screen (o h-dvh) y agregamos overflow-hidden
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a1f44]">
      {/* ===== Top status bar ===== */}
      <div
        className={`flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-medium transition-colors duration-300 ${
          isOnline
            ? 'bg-emerald-500/15 text-emerald-200'
            : 'bg-amber-500/15 text-amber-200'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="h-3.5 w-3.5" />
            <span>Con conexión a internet</span>
          </>
        ) : (
          <>
            <WifiOff className="h-3.5 w-3.5" />
            <span>Modo Offline — sin conexión a internet</span>
          </>
        )}
      </div>

      {/* ===== Main split layout ===== */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — form */}
        {/* 2. Reducimos py-8 a py-4 o py-6 y ajustamos padding lateral */}
        <div className="flex w-full flex-col justify-between px-6 py-4 sm:px-10 md:w-1/2 md:px-12 lg:px-16 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-md flex-col justify-center flex-1">
            {/* Logo + PWA badge */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
                  <GraduationCap className="h-5 w-5 text-white" strokeWidth={2} />
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">
                  Progresa
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-0.5 ring-1 ring-emerald-400/30">
                {isOnline ? (
                  <Cloud className="h-3.5 w-3.5 text-emerald-300" />
                ) : (
                  <CloudOff className="h-3.5 w-3.5 text-amber-300" />
                )}
                <span className="text-[11px] font-medium text-emerald-200">
                  PWA Lista / Modo Offline
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                Iniciar sesión
              </h1>
              <p className="mt-1 text-xs text-blue-200/70 sm:text-sm">
                Selecciona tu rol e ingresa tus credenciales.
              </p>
            </div>

            {/* Role selector */}
            <div className="mb-5">
              <span className="mb-1.5 block text-xs font-medium text-blue-100/90 sm:text-sm">
                Tipo de usuario
              </span>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => {
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm ${
                        active
                          ? 'border-white/50 bg-white/15 text-white shadow-md shadow-blue-500/20'
                          : 'border-white/10 bg-white/5 text-blue-200/60 hover:border-white/25 hover:text-blue-100'
                      }`}
                    >
                      {r.icon}
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-blue-100/90 sm:text-sm">
                  {role === 'alumno'
                    ? 'DNI / Código de Alumno'
                    : role === 'docente'
                    ? 'DNI / Código Docente'
                    : 'DNI / Código de Personal'}
                </span>
                <div className="group relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 transition-colors group-focus-within:text-white">
                    <IdCard className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={codigo}
                    onChange={(e) =>
                      setCodigo(e.target.value.replace(/[^\d]/g, '').slice(0, 12))
                    }
                    placeholder="12345678"
                    inputMode="numeric"
                    autoComplete="username"
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-blue-200/40 transition-all duration-200 focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-blue-100/90 sm:text-sm">
                  Contraseña
                </span>
                <div className="group relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 transition-colors group-focus-within:text-white">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-blue-200/40 transition-all duration-200 focus:border-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300/60 transition-colors hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-lg bg-red-500/15 px-3.5 py-2 text-xs text-red-200 ring-1 ring-red-400/30">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0a1f44] transition-all duration-200 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Ingresando...
                  </>
                ) : (
                  'Ingresar'
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-blue-200/50">
              ¿Olvidaste tu contraseña?{' '}
              <span className="cursor-pointer font-medium text-blue-200 transition-colors hover:text-white">
                Recupérala
              </span>
            </p>
          </div>
        </div>

        {/* Right panel — photo (desktop only) */}
        <div className="relative hidden overflow-hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/7972673/pexels-photo-7972673.jpeg?auto=compress&cs=tinysrgb&h=1200&w=900"
            alt="Estudiantes conversando en el campus"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1f44]/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1f44]/30 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}