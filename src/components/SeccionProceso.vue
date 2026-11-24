<template>
  <!--
    PROCESO DE COMPRA: cuatro pasos unidos por una línea de luz que se dibuja
    al bajar (--p de v-paralaje); cada paso se enciende cuando la línea llega.
  -->
  <section id="proceso" class="seccion">
    <div class="contenedor">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Cómo la consigues</p>
        <h2 class="titulo">De tu idea a tu enlace <span class="brillo">en 4 pasos</span></h2>
      </div>

      <div ref="lineaRef" class="linea-tiempo" :style="{ '--avance': avance }">
        <span class="riel" aria-hidden="true"><span class="luz"></span></span>
        <article v-for="(p, i) in PASOS" :key="p.titulo" class="paso" :class="{ encendido: avance >= (i + 0.5) / PASOS.length - 0.06 }">
          <span class="circulo" aria-hidden="true" v-html="p.icono"></span>
          <p class="numero">Paso {{ i + 1 }}</p>
          <h3>{{ p.titulo }}</h3>
          <p class="texto">{{ p.texto }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const I = (d: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const PASOS = [
  { titulo: "Escríbenos", texto: "Cuéntanos por WhatsApp qué celebras, la fecha y tus ideas.", icono: I('<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>') },
  { titulo: "Elige el diseño", texto: "Parte de uno de nuestros modelos o creamos uno nuevo para ti.", icono: I('<path d="M12 3l2.4 5 5.6.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8 9.6 8z"/>') },
  { titulo: "Envía tus datos", texto: "Nombres, lugares, fotos y la canción. Nosotros lo armamos.", icono: I('<path d="M4 12l16-8-6 16-3-6z"/>') },
  { titulo: "Envía tus invitaciones", texto: "Recibes el enlace listo para compartir; en Premium, uno a nombre de cada invitado con sus pases.", icono: I('<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>') },
];

/* la línea avanza mientras la sección pasa por la mitad de la pantalla */
const lineaRef = ref<HTMLElement | null>(null);
const avance = ref(0);
let pendiente = false;
function calcular() {
  pendiente = false;
  const el = lineaRef.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  const alto = window.innerHeight;
  avance.value = Math.min(1, Math.max(0, (alto * 0.75 - r.top) / (r.height + alto * 0.2)));
}
function programar() {
  if (!pendiente) {
    pendiente = true;
    requestAnimationFrame(calcular);
  }
}
onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    avance.value = 1;
    return;
  }
  window.addEventListener("scroll", programar, { passive: true });
  calcular();
});
onBeforeUnmount(() => window.removeEventListener("scroll", programar));
</script>

<style scoped>
.linea-tiempo {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

/* riel horizontal a la altura de los círculos */
.riel {
  position: absolute;
  top: 34px;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: rgba(10, 150, 168, 0.14);
}

.luz {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--cian-claro), var(--cian));
  box-shadow: 0 0 12px var(--cian);
  transform: scaleX(var(--avance));
  transform-origin: left;
}

.paso {
  position: relative;
  text-align: center;
}

.circulo {
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  margin: 0 auto 18px;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: var(--noche-2);
  color: var(--texto-suave);
  transition: background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
}

.circulo :deep(svg) {
  width: 28px;
  height: 28px;
}

.encendido .circulo {
  border-color: var(--cian);
  background: linear-gradient(135deg, var(--cian-claro), var(--cian));
  color: var(--tinta);
  box-shadow: 0 0 0 6px rgba(24, 217, 231, 0.12), 0 0 30px rgba(24, 217, 231, 0.55);
}

.numero {
  margin: 0 0 4px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--cian-claro);
}

.paso h3 {
  margin: 0 0 6px;
  font-family: var(--fuente-titulo);
  font-size: 1.3rem;
  color: var(--blanco);
}

.texto {
  margin: 0 auto;
  max-width: 240px;
  font-size: 0.95rem;
  color: var(--texto-suave);
}

/* en celular: vertical, la línea baja por la izquierda */
@media (max-width: 760px) {
  .linea-tiempo {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .riel {
    top: 34px;
    bottom: 34px;
    left: 34px;
    right: auto;
    width: 2px;
    height: auto;
  }
  .luz {
    transform: scaleY(var(--avance));
    transform-origin: top;
  }
  .paso {
    display: grid;
    grid-template-columns: 70px 1fr;
    column-gap: 18px;
    text-align: left;
  }
  .circulo {
    grid-row: span 3;
    margin: 0;
  }
  .texto {
    margin: 0;
  }
}
</style>
