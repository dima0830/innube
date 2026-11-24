<template>
  <!-- TODO LO QUE INCLUYE: funciones en tarjetas de vidrio; la luz sigue al cursor -->
  <section id="incluye" class="seccion">
    <div class="contenedor">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Todo lo que incluye</p>
        <h2 class="titulo">Mucho más que <span class="brillo">una tarjeta bonita</span></h2>
        <p class="entrada">Tus invitados tienen todo en un solo enlace, y tú, el control de tu evento.</p>
      </div>

      <ul v-aparecer class="rejilla">
        <li v-for="f in FUNCIONES" :key="f.titulo" class="funcion" :class="{ grande: f.grande }" @pointermove="luz">
          <span class="icono" aria-hidden="true" v-html="f.icono"></span>
          <h3>{{ f.titulo }}</h3>
          <p>{{ f.texto }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const I = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const FUNCIONES = [
  { titulo: "Confirmación de invitados", texto: "Te confirman con nombre, asistencia y pases. En Premium lo ves en tu panel privado; en Básica recibes la lista en Excel.", icono: I('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 11l2 2 4-4"/>'), grande: true },
  { titulo: "Fotos en vivo", texto: "Tus invitados suben fotos con un QR y aparecen en la pantalla gigante del evento. Plan Premium.", icono: I('<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>'), grande: true },
  { titulo: "Tarjeta de entrega en PDF", texto: "Su diseño en PDF para que escribas el nombre de cada invitado y le asignes pases.", icono: I('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6M9 17h4"/>'), grande: true },
  { titulo: "Sobre y portada animada", texto: "La primera impresión: un sobre que se abre o una portada con movimiento.", icono: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>') },
  { titulo: "Música de fondo", texto: "La canción que elijas suena al abrir la invitación.", icono: I('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>') },
  { titulo: "Cuenta regresiva", texto: "Días, horas y minutos hasta tu gran día.", icono: I('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>') },
  { titulo: "Ubicación con un toque", texto: "Botones a Google Maps o Waze de la ceremonia y la fiesta.", icono: I('<path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>') },
  { titulo: "Galería de fotos", texto: "Tu historia en fotos, con carrusel y vista ampliada.", icono: I('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>') },
  { titulo: "Regalos y detalles", texto: "Código de vestimenta, lluvia de sobres y notas importantes.", icono: I('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M12 8a3 3 0 1 0-3-3c0 2 3 3 3 3zM12 8a3 3 0 1 1 3-3c0 2-3 3-3 3z"/>') },
];

/* el brillo de la tarjeta sigue al puntero */
function luz(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
</script>

<style scoped>
.rejilla {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.funcion {
  position: relative;
  padding: 26px 22px;
  border: 1px solid var(--borde);
  border-radius: 24px;
  background:
    radial-gradient(260px circle at var(--mx, -200px) var(--my, -200px), rgba(10, 150, 168, 0.14), transparent 60%),
    var(--tarjeta);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.funcion:hover {
  border-color: rgba(10, 150, 168, 0.4);
  transform: translateY(-4px);
}

.funcion.grande {
  grid-column: span 2;
  background:
    radial-gradient(300px circle at var(--mx, -200px) var(--my, -200px), rgba(10, 150, 168, 0.18), transparent 60%),
    linear-gradient(135deg, rgba(24, 217, 231, 0.16), rgba(24, 217, 231, 0.04));
}

.icono {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(10, 150, 168, 0.22), rgba(24, 217, 231, 0.06));
  color: var(--cian-claro);
}

.icono :deep(svg) {
  width: 26px;
  height: 26px;
}

.funcion h3 {
  margin: 0 0 6px;
  font-family: var(--fuente-titulo);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--blanco);
}

.funcion p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--texto-suave);
}

@media (max-width: 960px) {
  .rejilla {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .rejilla {
    grid-template-columns: 1fr;
  }
  .funcion.grande {
    grid-column: auto;
  }
}
</style>
