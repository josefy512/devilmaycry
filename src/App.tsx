import React, { useState, useEffect } from 'react';
import FormularioPanel from './formulario'; // Ajusta la ruta de tu login si es necesario
import EstudianteDashboard from './componentes/alumnos/alumnos';
import DocenteDashboard from './componentes/docente/docente';
import DirectoresLayout from './componentes/direccion/direccion';
export default function App() {
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar, revisamos si ya había una sesión guardada
  useEffect(() => {
    const guardado = localStorage.getItem('usuarioLogueado');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
    setCargando(false);
  }, []);

  // Mientras verifica el localStorage para evitar parpadeos
  if (cargando) {
    return null;
  }

  // Si no hay usuario logueado, mostramos el login
  if (!usuario || !usuario.nombres) {
    return <FormularioPanel />;
  }

  // Si el usuario es director o personal directivo, mostramos su panel
  if (usuario.rol === 'director' || usuario.cargo?.includes('Director')) {
    return <DirectoresLayout />;
  }

  // Si el usuario es docente, mostramos su panel
  if (usuario.rol === 'docente') {
    return <DocenteDashboard />;
  }

  // Por defecto, si es alumno:
  return <EstudianteDashboard />;
}