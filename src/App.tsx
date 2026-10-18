import { useState, useEffect } from 'react';
import FormularioPanel from './componentes/formulario/formulario';
import EstudianteDashboard from './componentes/alumnos/alumnos'; // Ajusta la ruta si es necesario

export default function App() {
  const [usuario, setUsuario] = useState<any>(null);

  // Al cargar, revisamos si ya había una sesión guardada
  useEffect(() => {
    const guardado = localStorage.getItem('usuarioLogueado');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  // Si hay usuario logueado y es alumno, mostramos su dashboard
  if (usuario && usuario.rol === 'alumno') {
    return <EstudianteDashboard />;
  }

  // Si no, mostramos el login
  return <FormularioPanel />;
}