# Informe del Proyecto — Plataforma Progresa

Documento dirigido al **Jurado Evaluador**. Describe qué hace el sistema, quién lo usa y qué puede hacer cada persona en cada pantalla, botón por botón.

---

## 1. Resumen General del Sistema

**Progresa** es una plataforma educativa institucional que concentra, en un solo lugar, la vida académica, administrativa y financiera de la institución.

Su propósito es que cada persona (alumno, docente, secretaría, tesorería o dirección) entre con su propio perfil y encuentre solo las herramientas que le corresponden: desde entregar una tarea o pagar una pensión, hasta pasar lista, firmar actas, atender trámites FUT o supervisar el campus.

El valor principal que aporta es **ordenar el día a día institucional sin depender de ventanillas ni papeles**: trámites digitales, pagos en línea, documentos oficiales, control de asistencia y notas, y una visión de conjunto para quienes dirigen la institución. La plataforma también indica si hay conexión a internet, de modo que el usuario sepa si trabaja en línea o en modo sin conexión.

Hoy el ingreso activo está habilitado para **Alumno** y **Docente**. Los paneles de **Secretaría**, **Tesorería** y **Dirección** ya existen en el sistema y se documentan aquí porque forman parte del conjunto de módulos de la plataforma; el acceso del rol **Personal** aún se presenta como en desarrollo en la pantalla de inicio de sesión.

---

## 2. Módulos y Funcionalidades por Tipo de Usuario

### Acceso común — Inicio de sesión

#### Nombre de la Vista / Panel
Pantalla de inicio de sesión de Progresa.

#### Descripción de Pantalla
Es la primera pantalla que ve cualquier usuario. A la izquierda aparece el formulario de ingreso (marca Progresa, selector de tipo de usuario, DNI y contraseña). A la derecha, en pantallas grandes, se muestra una imagen del campus. En la parte superior una franja indica si hay internet o si se está en modo sin conexión.

#### Funciones y Botones Interactivos
- **Botón “Alumno”:** selecciona el ingreso como estudiante.
- **Botón “Docente”:** selecciona el ingreso como profesor.
- **Botón “Personal”:** selecciona el ingreso de personal administrativo. Por ahora el sistema informa que este acceso está en desarrollo.
- **Campo DNI:** permite escribir el documento de identidad.
- **Campo Contraseña:** permite escribir la clave de acceso.
- **Botón de ojo (mostrar / ocultar contraseña):** deja ver u ocultar lo escrito en la contraseña.
- **Botón “Ingresar”:** valida los datos y abre el panel correspondiente (alumno o docente). Mientras procesa, muestra “Ingresando...”.
- **Enlace “Recupérala”:** opción visible para recuperar la contraseña si se olvidó.
- **Indicador de conexión:** informa “Con conexión a internet” o “Modo Offline — sin conexión a internet”.

#### Beneficio y Valor para el Usuario
Evita confusión: cada persona elige su rol, entra con DNI y contraseña, y llega directo a su espacio de trabajo. Si las credenciales no coinciden, el sistema avisa con un mensaje claro.

---

### Perfil: Alumno

El alumno trabaja en un panel con menú lateral (en celular se abre con el botón de menú). El menú se agrupa en **Panel de control**, **Académico**, **Comunidad** y **Carrera**. Arriba hay un buscador, un aviso de “En línea / Desconectado”, una campana de avisos y un botón “Nueva Tarea”. Abajo del menú aparecen el nombre, la carrera y el **botón de cerrar sesión**.

#### 2.1 Panel de Control del Alumno

**Nombre de la Vista / Panel:** Panel de control.

**Descripción de Pantalla:** Saluda al alumno por su nombre y muestra un resumen del día: tareas pendientes, próximo examen y promedio actual. Debajo aparecen accesos rápidos a las acciones más usadas.

**Funciones y Botones Interactivos:**
- **Menú “Panel de control”:** vuelve a esta vista de resumen.
- **Botón “Ver todas las herramientas”:** invita a recorrer el resto de módulos.
- **Acceso rápido “Subir Tarea”:** atajo para entregar un trabajo.
- **Acceso rápido “Horario Hoy”:** atajo para revisar la clase del día.
- **Acceso rápido “Biblioteca”:** atajo para buscar un libro o recurso.
- **Botón “Nueva Tarea”** (barra superior): inicia una tarea nueva.
- **Campana de notificaciones:** muestra avisos pendientes.
- **Buscador “Buscar cursos, tareas...”:** localiza contenido académico.
- **Botón de menú (celular):** abre o cierra el menú lateral.
- **Botón de cerrar sesión:** sale de la cuenta de forma segura.

**Beneficio y Valor para el Usuario:** En segundos el alumno sabe qué está urgente, qué examen se acerca y cómo va su promedio, sin entrar a varias pantallas.

---

#### 2.2 Calendario Académico y Agenda

**Nombre de la Vista / Panel:** Calendario.

**Descripción de Pantalla:** Muestra el mes (por ejemplo octubre) con clases, exámenes, entregas, tutorías y feriados. A la derecha lista los vencimientos más próximos. En celular se ve una lista por día, más fácil de leer en el teléfono.

**Funciones y Botones Interactivos:**
- **Buscador de eventos, exámenes y entregas.**
- **Campana de notificaciones.**
- **Botón “Exportar (.ICS / PDF)”:** descarga o comparte la agenda.
- **Botón “Sincronizar Calendar”:** actualiza el calendario con la agenda institucional.
- **Flechas anterior / siguiente:** cambian de mes.
- **Botón “HOY”:** vuelve al día actual.
- **Filtros:** “Todos los eventos”, “Exámenes y Parciales”, “Entregas de Tareas”, “Asesorías Docentes”, “Feriados y Recesos”.
- **Vistas “Mes”, “Semana” y “Agenda / Lista”:** cambian cómo se ve el calendario.
- **Botón “Ver Guía de Estudio y Temario”:** abre el material de un examen cercano.
- **Botón “Subir Entrega”:** envía una tarea que vence pronto.

**Beneficio y Valor para el Usuario:** El alumno no depende de recordatorios sueltos: ve fechas oficiales, plazos y recesos en un solo calendario.

---

#### 2.3 Tareas y Proyectos

**Nombre de la Vista / Panel:** Tareas y Proyectos.

**Descripción de Pantalla:** Lista las asignaciones del ciclo (pendientes, entregadas y calificadas) a la izquierda, y a la derecha el detalle de la tarea elegida: instrucciones del docente, materiales descargables y zona para subir el archivo.

**Funciones y Botones Interactivos:**
- **Buscador por tarea, curso o docente.**
- **Campana de notificaciones.**
- **Botón “Calendario de Entregas”:** abre las fechas de entrega.
- **Botón “Crear Recordatorio / Nota”:** guarda un aviso personal.
- **Pestañas “Todas”, “Pendientes”, “Entregadas” y “Calificadas”:** filtran por estado.
- **Selector de curso:** muestra todas las materias o una sola.
- **Selector de orden:** por urgencia o por más recientes.
- **Casilla “Alta prioridad”:** deja solo las tareas urgentes.
- **Tarjetas de cada tarea:** al pulsarlas se abre el detalle.
- **Botón de descarga** de la guía PDF y de la plantilla de carátula.
- **Zona “Arrastra tu archivo PDF aquí o examina tus carpetas”:** sube la entrega (PDF o ZIP).

**Beneficio y Valor para el Usuario:** El alumno ve plazos, ponderación, instrucciones y puede entregar el trabajo sin ir a otro sistema.

---

#### 2.4 Recursos de Estudio

**Nombre de la Vista / Panel:** Recursos de estudio.

**Descripción de Pantalla:** Biblioteca digital del ciclo: libros, manuales, artículos, software y repositorios. Incluye recomendaciones de los docentes de la semana.

**Funciones y Botones Interactivos:**
- **Botón “Solicitar Material / Préstamo Digital”:** pide un recurso a biblioteca.
- **Botón “Mi Historial de Lectura”:** muestra lo que ya se consultó.
- **Buscador por título, autor, materia o palabra clave.**
- **Filtro por curso y por orden** (más recientes, mejor valorados, más prestados).
- **Pestañas:** “Todos los recursos”, “Libros y Manuales”, “Artículos y Fuentes”, “Herramientas y Software”, “Repositorios Carrera”.
- **Casilla “Solo recomendados por docentes”.**
- **Botón “Ver los 24”:** amplía el catálogo de libros.
- **Botón “Leer online”:** abre el libro en pantalla.
- **Botón de marcador:** guarda el recurso para más tarde.
- **Botón “Abrir Stewart Cap. 4...”:** abre el capítulo recomendado por el docente.
- **Botón “Descargar Anexo Esfuerzos (PDF)”:** baja el material indicado por la docente.

**Beneficio y Valor para el Usuario:** El alumno encuentra lecturas del sílabo, licencias y recomendaciones del profesor sin buscar en carpetas sueltas.

---

#### 2.5 Foros de Discusión

**Nombre de la Vista / Panel:** Foros de discusión.

**Descripción de Pantalla:** Espacio previsto para el diálogo académico entre estudiantes. Por ahora indica que el módulo está en desarrollo y se conectará próximamente.

**Funciones y Botones Interactivos:**
- **Menú “Foros de discusión”:** abre esta sección.

**Beneficio y Valor para el Usuario:** Deja claro que existirá un canal de comunidad; mientras tanto el alumno sabe que no es un error de la plataforma.

---

#### 2.6 Directorio y Contactos

**Nombre de la Vista / Panel:** Directorio.

**Descripción de Pantalla:** Directorio oficial de docentes y áreas administrativas: foto, cargo, curso, correo, horario de asesoría y ubicación. Incluye indicadores de cuántos docentes hay, oficinas activas y si la mesa de ayuda está en línea.

**Funciones y Botones Interactivos:**
- **Buscador por nombre, curso u oficina.**
- **Campana de notificaciones.**
- **Botón “Descargar Directorio PDF”:** obtiene el listado impreso o digital.
- **Botón “Agendar Asesoría”:** reserva una cita con un docente.
- **Pestaña “Plana Docente”:** lista a los profesores del ciclo.
- **Pestaña “Dirección y Administración”:** lista oficinas institucionales.
- **Filtro por facultad y botón “Mis docentes actuales”.**
- **Botón de copiar correo:** copia el e-mail al portapapeles.
- **Botón “Enviar Mensaje”:** abre el correo hacia ese docente.
- **Botón “Agendar”** en cada tarjeta: pide una asesoría concreta.

**Beneficio y Valor para el Usuario:** El alumno sabe a quién escribir, en qué horario y dónde encontrar al docente, sin preguntar en secretaría.

---

#### 2.7 Progreso Académico

**Nombre de la Vista / Panel:** Progreso.

**Descripción de Pantalla:** Vista prevista para el seguimiento de avance académico. Por ahora indica que el módulo está en desarrollo.

**Funciones y Botones Interactivos:**
- **Menú “Progreso”:** abre esta sección.

**Beneficio y Valor para el Usuario:** Anticipa un lugar para ver el avance de carrera; el alumno no se queda sin orientación sobre el estado del módulo.

---

#### 2.8 Bolsa de Trabajo y Prácticas

**Nombre de la Vista / Panel:** Bolsa de trabajo.

**Descripción de Pantalla:** Ofertas de prácticas y empleo con empresas en convenio. A la izquierda está la lista de convocatorias; a la derecha, el detalle del puesto (funciones, sueldo, ciclo requerido, cierre). Arriba se ve el estado del CV institucional.

**Funciones y Botones Interactivos:**
- **Buscador de convocatorias, empresas y pasantías.**
- **Campana de notificaciones.**
- **Botón “Mis Postulaciones”:** muestra las postulaciones activas.
- **Botón “Alertas de Empleo”:** activa avisos de nuevas vacantes.
- **Botón “Ver Vista Previa”:** abre el CV institucional.
- **Botón “Actualizar CV / Portafolio”:** carga una versión nueva del CV.
- **Filtros por tipo** (pre-profesionales, profesionales, primer empleo) y modalidad (híbrido, presencial, remoto).
- **Pestañas de cantidad** (todas, pre, profesionales, exclusivo universidad, remoto/híbrido).
- **Casilla “Solo empresas con convenio directo”.**
- **Botón “Ordenar por: Más recientes”.**
- **Tarjetas de oferta:** al pulsarlas se abre el detalle.
- **Botón de guardar (marcador) y botón de compartir.**
- **Botón “Postular con CV Institucional”:** envía la postulación oficial.

**Beneficio y Valor para el Usuario:** El alumno postula a prácticas reales de la universidad con su CV verificado, sin depender de grupos informales.

---

#### 2.9 Documentos y Trámites Oficiales

**Nombre de la Vista / Panel:** Documentos.

**Descripción de Pantalla:** Centro de documentos oficiales: ficha de matrícula, sílabos, récord, boletas, reglamentos y el Formulario Único de Trámite (FUT). Indica si el servidor de firmas digitales está activo.

**Funciones y Botones Interactivos:**
- **Buscador de documentos, sílabos y constancias.**
- **Campana de notificaciones.**
- **Botón “Subir Documento”:** adjunta un archivo personal al expediente.
- **Botón “Solicitar Trámite Oficial”:** abre el FUT digital.
- **Filtros:** “Todos los archivos”, “Académicos”, “Trámites y Solicitudes”, “Reglamentos e Institucional”.
- **Botón “Ver PDF”** de la ficha de matrícula.
- **Botón “Descargar Ficha (PDF)”.**
- **Botón “Descargar Sílabo”** en cada curso matriculado.
- **Botón “Llenar FUT Digital Ahora”:** abre el formulario de trámite.
- **Botón “Ver histórico completo”** del récord académico.
- **Botones “Descargar”** del consolidado de notas y de la boleta del ciclo anterior.

**Beneficio y Valor para el Usuario:** El alumno obtiene constancias y sílabos con firma o código de verificación, sin hacer cola en ventanilla.

---

#### 2.10 Formulario Único de Trámite (FUT Digital)

**Nombre de la Vista / Panel:** FUT — Formulario Único de Trámite (ventana emergente desde Documentos).

**Descripción de Pantalla:** Formulario oficial digital, con membrete institucional. Los datos personales suelen venir prellenados. Al enviarlo, aparece un código de cargo. Se puede cerrar con el botón X de la ventana.

**Funciones y Botones Interactivos:**
- **Campo Sumilla:** escribe en corto qué solicita (por ejemplo, certificado o reserva de matrícula).
- **Destinatario:** viene fijado a la dirección institucional.
- **Datos del usuario:** nombres, condición (alumno, especialidad, ciclo), DNI, teléfono y domicilio.
- **Fundamento del pedido:** explica el motivo del trámite.
- **Zona de adjuntos:** sube voucher, DNI u otro archivo (PDF, PNG, JPG).
- **Botón para quitar el archivo adjunto.**
- **Casilla de declaración jurada digital:** confirma que los datos son verdaderos.
- **Botón “Guardar Borrador”:** guarda el trámite para terminarlo después.
- **Botón “Enviar FUT Digital”:** registra el trámite y genera ticket.
- **Botón “Descargar Cargo Oficial (PDF)” / “Descargar Copia de Resguardo (PDF)”:** imprime o guarda el cargo.
- **Botón de cerrar (X):** sale del formulario sin perder el resto del panel.

**Beneficio y Valor para el Usuario:** El alumno hace un trámite formal desde casa, recibe un número de cargo y puede guardar evidencia, sin imprimir ni esperar en mesa de partes.

---

#### 2.11 Pagos y Pensiones

**Nombre de la Vista / Panel:** Pagos y Pensiones.

**Descripción de Pantalla:** Muestra si hay una cuota pendiente (concepto, monto y vencimiento), las cuentas bancarias oficiales, un formulario para validar el voucher y el historial de pagos. Hay ventanas para pagar con tarjeta y para ampliar el código QR de Yape/Plin.

**Funciones y Botones Interactivos:**
- **Botón “Pagar en Línea”:** abre la pasarela segura con tarjeta.
- **Tarjeta “Yape / Plin”:** al tocarla amplía el código QR.
- **Botón de copiar** el número de cuenta del Banco de la Nación.
- **Botón de copiar** el código CCI del BCP.
- **Campo “Número de Operación / Constancia”.**
- **Zona para adjuntar foto o PDF del voucher.**
- **Botón “Enviar Voucher para Validación”:** manda el comprobante a Tesorería.
- **Enlace “Subir otro comprobante”:** permite enviar un voucher adicional.
- **En la pasarela:** nombre en la tarjeta, número, vencimiento, CVV.
- **Botón “Pagar S/ … ahora”:** procesa el cobro.
- **Botón “Entendido / Cerrar”:** cierra el comprobante de pago exitoso.
- **Botones X** para cerrar los recuadros de pago y de QR.

**Beneficio y Valor para el Usuario:** El alumno paga la pensión o reporta su transferencia en el mismo portal, y ve el historial de lo ya aprobado.

---

### Perfil: Docente

El docente entra a un panel con su nombre, correo e iniciales. El menú incluye Panel de control, Calificaciones, Asistencias, Horarios, Mis Cursos, Configuración y Cerrar sesión. En celular hay un botón de menú.

#### 2.12 Panel de Control del Docente

**Nombre de la Vista / Panel:** Panel de control.

**Descripción de Pantalla:** Resumen operativo del día: tareas por calificar, asistencia promedio, próxima evaluación, tutorías, la clase que empieza pronto, una tabla de FUTs de alumnos, la agenda y accesos rápidos.

**Funciones y Botones Interactivos:**
- **Buscador “Buscar estudiante, curso, FUT...”.**
- **Campana de notificaciones.**
- **Botón “Ver Sílabo”:** abre el sílabo de la clase próxima.
- **Botón “Pasar Lista”:** inicia el control de asistencia.
- **Botón “Ver todos”** de FUTs y justificaciones.
- **Botón de ojo** en cada fila de trámite: abre el detalle del FUT.
- **Botón “Ver horario completo”.**
- **Botón “Subir Material”:** publica archivos para el curso.
- **Botón “Enviar Anuncio”:** comunica un aviso al grupo.
- **Botón “Firmar Actas”:** va al cierre oficial de notas.
- **Botón “Soporte”:** pide ayuda técnica o institucional.
- **Botón “Configuración”.**
- **Botón “Cerrar Sesión”.**

**Beneficio y Valor para el Usuario:** El docente ve en una sola pantalla qué clase tiene ahora, qué trámites esperan y qué debe calificar, sin saltar entre sistemas.

---

#### 2.13 Calificaciones y Actas Oficiales

**Nombre de la Vista / Panel:** Calificaciones.

**Descripción de Pantalla:** Acta de notas del curso (evaluación continua, examen parcial, trabajo final), con filtros por condición del alumno, promedio del grupo y solicitudes FUT de reclamo. Incluye la estructura ponderada del sílabo y el estado de cierre del acta.

**Funciones y Botones Interactivos:**
- **Botón “Cerrar y Firmar Acta Oficial”:** cierra el acta con certificación (RENIEC / SUNEDU).
- **Selectores de asignatura y período.**
- **Pestañas “Todos”, “Aprobados”, “En Riesgo”, “Desaprobados”.**
- **Buscador por código de estudiante.**
- **Botones de paginación** para recorrer la lista.
- **Botón “Exportar Acta Oficial (PDF / Excel)”.**
- **Botón “Publicar Calificaciones a Alumnos”:** hace visibles las notas en el portal del estudiante.
- **Interruptor “Portal del Estudiante”:** activa o pausa la visualización inmediata de notas.
- **Botón “Revisar”** en cada FUT de reclamo.
- **Botón “VER BITÁCORA”:** consulta el historial de cambios del acta.

**Beneficio y Valor para el Usuario:** El docente consolida notas, publica resultados y firma el acta oficial con trazabilidad, reduciendo errores y papeles.

---

#### 2.14 Asistencias (Pasar Lista)

**Nombre de la Vista / Panel:** Asistencias.

**Descripción de Pantalla:** Lista de alumnos de la sesión en curso. El docente marca a cada uno como Presente (P), Tardanza (T), Falta (F) o Justificado (J). A un lado aparecen alertas de inasistencias (DPI), FUTs del día y opciones de reporte.

**Funciones y Botones Interactivos:**
- **Botón “Guardar y Consolidar Asistencia”:** registra la lista del día.
- **Botón “Marcar Todos como Presentes”:** ahorra tiempo cuando casi todos llegaron.
- **Botón de reiniciar lista:** vuelve el marcaje al estado inicial.
- **Buscador por nombre o código.**
- **Filtros:** Todos, Presentes, Tardanzas, Faltas, Justificados.
- **Botones P / T / F / J** en cada alumno.
- **Paginación** de la lista.
- **Botón “Ver Expediente”** en casos de DPI aplicado.
- **Botón “Notificar Alumno”** cuando está a una falta de inhabilitación.
- **Botón “Aprobar y Registrar [J]”** en un FUT pendiente de justificación.
- **Botón “Exportar Registro (.xlsx)”.**
- **Botón “Descargar Acta Oficial (PDF)”.**

**Beneficio y Valor para el Usuario:** Pasar lista es rápido, queda guardado y el docente detecta a tiempo a quienes están en riesgo por inasistencias.

---

#### 2.15 Horarios y Carga Semanal

**Nombre de la Vista / Panel:** Horarios.

**Descripción de Pantalla:** Semana del docente día por día. Muestra clases terminadas, la clase en curso, tutorías y reuniones. A un lado se ve la carga lectiva (horas de teoría, taller y tutoría) y si está abierta la reserva de asesorías.

**Funciones y Botones Interactivos:**
- **Botones de cada día** (Lunes a Sábado): cambian el itinerario.
- **Botón “Ver Registro de Clase”** en una sesión ya cerrada.
- **Botón “Ver Sílabo / Materiales”** en la clase en curso.
- **Botón “Pasar Asistencia”** desde el bloque de la clase actual.
- **Botón “Ver Citas de Alumnos”.**
- **Botón “Abrir Sala Virtual”** para la tutoría.
- **Botón “Ver Agenda de Reunión”.**
- **Botón “Unirse a Sesión”** de una reunión institucional.
- **Interruptor “Disponibilidad de Tutoría”:** abre o cierra el canal para que los alumnos reserven.

**Beneficio y Valor para el Usuario:** El docente organiza su día (aula, cubículo y reuniones) y controla cuándo los alumnos pueden pedirle asesoría.

---

#### 2.16 Mis Cursos Asignados

**Nombre de la Vista / Panel:** Mis Cursos.

**Descripción de Pantalla:** Tarjetas de cada asignatura asignada al docente (código, grupo, nombre, aula, horario). Permite publicar o actualizar el sílabo en PDF para que los alumnos lo descarguen.

**Funciones y Botones Interactivos:**
- **Buscador por código o nombre del curso.**
- **Botón “Subir Sílabo PDF”** (o “Actualizar Sílabo” si ya existe).
- **Enlace “Ver Sílabo (PDF)”:** abre el documento publicado.
- En la ventana de subida:
  - **Selección del archivo PDF.**
  - **Botón “Cancelar”.**
  - **Botón “Guardar y Publicar”.**
  - **Botón X** para cerrar.

**Beneficio y Valor para el Usuario:** El docente publica el sílabo oficial del curso en un solo paso y los alumnos lo encuentran después en Documentos.

---

#### 2.17 Configuración del Docente

**Nombre de la Vista / Panel:** Configuración.

**Descripción de Pantalla:** Opción del menú para ajustar preferencias de la cuenta docente. El contenido detallado de esta sección aún se está completando en el panel.

**Funciones y Botones Interactivos:**
- **Botón “Configuración”:** abre esta sección.
- **Botón “Cerrar Sesión”:** sale del panel docente.

**Beneficio y Valor para el Usuario:** Da un lugar claro para ajustes de cuenta y un cierre de sesión visible, importante en computadoras compartidas.

---

### Perfil: Secretaría y Trámites

Este perfil corresponde al personal de mesa de partes / secretaría. El panel muestra el nombre del especialista, el rol “Secretaría y Trámites” y si la aplicación está sincronizada. En celular hay botón “Menú” y pestañas horizontales.

#### 2.18 Bandeja FUT Entrante

**Nombre de la Vista / Panel:** Bandeja FUT Entrante.

**Descripción de Pantalla:** Bandeja de trámites que envían los alumnos (FUT digitales). Es el primer puesto de trabajo de secretaría al abrir el panel.

**Funciones y Botones Interactivos:**
- **Botón “Bandeja FUT Entrante”:** abre los trámites recibidos.
- **Botón “Menú”** (celular) y **botón X** para cerrar el menú.
- **Indicador “En línea / Modo Offline”.**

**Beneficio y Valor para el Usuario:** Secretaría ve las solicitudes en una cola digital, en lugar de recibir papeles físicos uno por uno.

---

#### 2.19 Emisión de Constancias

**Nombre de la Vista / Panel:** Emisión de Constancias.

**Descripción de Pantalla:** Módulo para emitir constancias oficiales (estudios, matrícula u otros documentos de secretaría).

**Funciones y Botones Interactivos:**
- **Botón “Emisión de Constancias”:** entra a este módulo.

**Beneficio y Valor para el Usuario:** Centraliza la emisión de documentos que el alumno luego consulta o descarga desde su panel.

---

#### 2.20 Padrón de Matriculados

**Nombre de la Vista / Panel:** Padrón de Matriculados.

**Descripción de Pantalla:** Listado de estudiantes matriculados para consulta y control de secretaría.

**Funciones y Botones Interactivos:**
- **Botón “Padrón de Matriculados”:** abre el padrón.

**Beneficio y Valor para el Usuario:** Permite verificar quién está matriculado al atender un trámite o una constancia.

---

### Perfil: Tesorería y Caja

Este perfil corresponde al jefe o personal de tesorería. El panel identifica el rol “Tesorería y Caja” y el estado de sincronización.

#### 2.21 Validación de Vouchers

**Nombre de la Vista / Panel:** Validación de Vouchers.

**Descripción de Pantalla:** Módulo donde tesorería revisa los comprobantes que los alumnos suben desde Pagos y Pensiones.

**Funciones y Botones Interactivos:**
- **Botón “Validación de Vouchers”:** abre la cola de comprobantes.
- **Botón “Menú”** (celular) y cierre del menú.
- **Indicador “En línea / Modo Offline”.**

**Beneficio y Valor para el Usuario:** Une el pago del alumno con la validación de caja, reduciendo pérdidas de vouchers y reclamos.

---

#### 2.22 Estado de Cuentas

**Nombre de la Vista / Panel:** Estado de Cuentas.

**Descripción de Pantalla:** Consulta de deudas y pagos por estudiante.

**Funciones y Botones Interactivos:**
- **Botón “Estado de Cuentas”:** abre la consulta por alumno.

**Beneficio y Valor para el Usuario:** Tesorería responde con rapidez si un alumno está al día o tiene una cuota pendiente.

---

#### 2.23 Cierre de Caja Diario

**Nombre de la Vista / Panel:** Cierre de Caja Diario.

**Descripción de Pantalla:** Módulo para cerrar la caja del día y dejar constancia de lo recaudado.

**Funciones y Botones Interactivos:**
- **Botón “Cierre de Caja Diario”:** entra al cierre del día.

**Beneficio y Valor para el Usuario:** Ordena el control diario de ingresos institucionales.

---

### Perfil: Dirección (Rectorado / Dirección académica)

Panel de supervisión institucional (identificado en pantalla como sistema directivo). Arriba aparecen la sede, notificaciones y el perfil de la autoridad. El menú de comando ejecutivo incluye el panel estratégico y otras áreas de gestión.

#### 2.24 Panel de Control Estratégico

**Nombre de la Vista / Panel:** Panel Estratégico.

**Descripción de Pantalla:** Vista de dirección del ciclo vigente: alertas (presupuesto, auditorías), indicadores de asistencia, docentes, presupuesto e índice de calidad, un gráfico de rendimiento por carrera y un recuadro de recomendaciones para la gestión.

**Funciones y Botones Interactivos:**
- **Botón de menú** (celular).
- **Campana de notificaciones.**
- **Botón “Exportar Reporte”:** descarga un informe para el consejo o una auditoría.
- **Botón “Nueva Resolución”:** inicia una resolución directiva.
- **Filtros de ámbito:** Vista General del Campus, Facultad de Ingeniería, Ciencias de la Salud, Artes y Humanidades, Negocios y Gestión.
- **Buscador de expedientes.**
- **Botón “Revisar Partida Presupuestal”:** entra a la alerta de presupuesto.
- **Botón “Validar Actas Docentes”:** atiende cátedras pendientes de evaluación.
- **Botón “Ejecutar Plan Rectoral”:** da seguimiento a una recomendación de gestión.
- **Botón “Configuración”.**
- **Botón “Cerrar Sesión”.**

**Beneficio y Valor para el Usuario:** La dirección ve el pulso de la institución (calidad, caja, asistencia y actas) y puede actuar sobre alertas concretas, no solo sobre informes sueltos.

---

#### 2.25 Otras secciones de Dirección (en desarrollo)

**Nombres de las Vistas / Paneles:**
- Facultades y Carreras
- Personal Docente
- Presupuesto y Finanzas
- Calidad y Acreditación
- Consejo Universitario

**Descripción de Pantalla:** Cada opción del menú abre su área. Mientras se completa la conexión institucional, la pantalla informa que la sección está en desarrollo.

**Funciones y Botones Interactivos:**
- **Botón “Facultades y Carreras”:** gestión de facultades y programas.
- **Botón “Personal Docente”:** supervisión de la plana docente.
- **Botón “Presupuesto y Finanzas”:** seguimiento financiero.
- **Botón “Calidad y Acreditación”:** indicadores de calidad.
- **Botón “Consejo Universitario”:** agenda y acuerdos del consejo.

**Beneficio y Valor para el Usuario:** El menú ya muestra el mapa completo de gobierno institucional, de modo que el jurado y los usuarios ven hacia dónde crece el sistema.

---

## Nota para el Jurado Evaluador

Este informe describe la **experiencia de uso** de Progresa: quién entra, qué pantalla ve y qué puede hacer con cada botón. Los módulos de alumno y docente son los más completos en la operación diaria (tareas, pagos, FUT, asistencia, notas y sílabos). Secretaría, tesorería y dirección completan el circuito institucional (trámites, caja y supervisión), y algunas de sus vistas internas aún se están ampliando, lo cual se indica con claridad en cada sección.
