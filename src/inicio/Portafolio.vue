<template>
  <!--
    PORTAFOLIO EN CARRUSEL (inspirado en el "Apple cards carousel")
    Tarjetas altas con foto que se deslizan de lado; al tocar una, se abre en grande
    desde su lugar (animación FLIP). Las pestañas llevan a cada línea dentro del carrusel
    y se marcan solas según lo que se ve. Datos en datos.ts (PORTAFOLIO).
  -->
  <section id="portafolio" class="seccion portafolio">
    <div class="contenedor">
      <div v-aparecer class="cabeza">
        <h2 class="titulo">Ideas que ya hicieron el viaje</h2>
        <p class="entrada">Algunos trabajos de Innube, ordenados por línea. Toca uno para verlo en grande.</p>
      </div>

      <div class="controles">
        <div class="pestanas" role="tablist" aria-label="Líneas de Innube">
          <button
            v-for="l in PORTAFOLIO"
            :key="l.id"
            role="tab"
            :aria-selected="l.id === activa"
            :class="{ activa: l.id === activa }"
            @click="irALinea(l.id)"
          >
            {{ l.nombre }}
          </button>
        </div>
        <div class="flechas">
          <button type="button" class="flecha" aria-label="Trabajos anteriores" :disabled="alInicio" @click="desplazar(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" class="flecha" aria-label="Más trabajos" :disabled="alFinal" @click="desplazar(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- el carrusel ocupa todo el ancho y arranca alineado con el contenido -->
    <ul ref="pista" class="pista" aria-label="Trabajos de Innube" @scroll.passive="alDesplazar">
      <li v-for="(t, i) in trabajos" :key="i" :data-linea="t.linea" class="tarjeta-item">
        <button
          type="button"
          class="tarjeta"
          :class="{ 'sin-foto': !t.foto }"
          :aria-label="`Ver ${t.titulo}`"
          @click="abrir(i, $event.currentTarget as HTMLElement)"
        >
          <img v-if="t.foto" class="foto" :src="t.foto" :alt="t.titulo" loading="lazy" decoding="async" />
          <span v-else class="espera" aria-hidden="true">
            <img :src="nube" alt="" />
            <small>Foto en camino</small>
          </span>
          <span class="velo" aria-hidden="true"></span>
          <span class="texto">
            <span class="categoria">{{ t.nombreLinea }} · {{ t.detalle }}</span>
            <strong>{{ t.titulo }}</strong>
          </span>
          <span v-if="t.ejemplo" class="ejemplo">Ejemplo</span>
          <span class="mas" aria-hidden="true">+</span>
        </button>
      </li>
    </ul>

    <!-- tarjeta abierta -->
    <Teleport to="body">
      <div v-if="abierta !== null" class="modal" :class="{ cerrando }" role="dialog" aria-modal="true" :aria-label="actual!.titulo" @click.self="cerrar">
        <article class="panel">
          <button ref="botonCerrar" type="button" class="cerrar" aria-label="Cerrar" @click="cerrar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div class="panel-foto" :class="{ 'sin-foto': !actual!.foto }">
            <img v-if="actual!.foto" ref="fotoGrande" :src="actual!.foto" :alt="actual!.titulo" />
            <span v-else ref="fotoGrande" class="espera grande"><img :src="nube" alt="" /><small>Foto en camino</small></span>
            <span v-if="actual!.ejemplo" class="ejemplo">Ejemplo</span>
          </div>
          <div class="panel-texto">
            <p class="categoria">{{ actual!.nombreLinea }}</p>
            <h3>{{ actual!.titulo }}</h3>
            <p class="detalle">{{ actual!.detalle }}</p>
            <p v-if="actual!.ejemplo" class="nota">Imagen de ejemplo: así se ve este tipo de trabajo. El tuyo se diseña a tu medida.</p>
            <template v-if="actual!.servicios.length">
              <p class="subtitulo">En {{ actual!.linea === "digital" ? "Innube Digital" : `Innube ${actual!.nombreLinea}` }} también hacemos</p>
              <ul class="servicios">
                <li v-for="s in actual!.servicios" :key="s">{{ s }}</li>
              </ul>
            </template>
            <a v-magnetico :href="enlaceWhatsApp(`¡Hola Innube! Vi «${actual!.titulo}» en su página y quiero algo así ✨`)" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
              <IconoWhatsApp /> Quiero algo así
            </a>
          </div>
        </article>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import nube from "@/assets/img/innube-nube.svg";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import { enlaceWhatsApp } from "@/config";
import { PASOS, PORTAFOLIO } from "./datos";

// línea del portafolio → paso del viaje (para mostrar sus servicios)
const PASO_DE_LINEA: Record<string, string> = { digital: "diseno", impresion: "impresion", personaliza: "personaliza", regalos: "regalos" };

const trabajos = computed(() =>
  PORTAFOLIO.flatMap((l) =>
    l.trabajos.map((t) => ({
      ...t,
      linea: l.id,
      nombreLinea: l.nombre,
      servicios: PASOS.find((p) => p.id === PASO_DE_LINEA[l.id])?.servicios ?? [],
    })),
  ),
);

/* ---------- carrusel ---------- */
const pista = ref<HTMLUListElement>();
const activa = ref(PORTAFOLIO[0].id);
const alInicio = ref(true);
const alFinal = ref(false);

function alDesplazar() {
  const el = pista.value!;
  alInicio.value = el.scrollLeft < 8;
  alFinal.value = el.scrollLeft + el.clientWidth > el.scrollWidth - 8;
  // la pestaña activa es la línea de la primera tarjeta visible
  const borde = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft) + 20;
  const items = Array.from(el.querySelectorAll<HTMLElement>(".tarjeta-item"));
  const visible = items.find((it) => it.getBoundingClientRect().right > borde);
  if (visible?.dataset.linea) activa.value = visible.dataset.linea;
}

function desplazar(dir: number) {
  const el = pista.value!;
  el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
}

function irALinea(id: string) {
  activa.value = id;
  const el = pista.value!;
  const primera = el.querySelector<HTMLElement>(`.tarjeta-item[data-linea="${id}"]`);
  if (primera) el.scrollTo({ left: primera.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: "smooth" });
}

/* ---------- tarjeta abierta (FLIP: crece desde la tarjeta tocada) ---------- */
const abierta = ref<number | null>(null);
const actual = computed(() => (abierta.value === null ? null : trabajos.value[abierta.value]));
const cerrando = ref(false);
const fotoGrande = ref<HTMLElement>();
const botonCerrar = ref<HTMLButtonElement>();
let origen: HTMLElement | null = null;
const quieto = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function desdeHasta(desde: DOMRect, hasta: DOMRect) {
  return `translate(${desde.left - hasta.left}px, ${desde.top - hasta.top}px) scale(${desde.width / hasta.width}, ${desde.height / hasta.height})`;
}

async function abrir(i: number, tarjeta: HTMLElement) {
  origen = tarjeta;
  abierta.value = i;
  document.documentElement.classList.add("sin-scroll");
  await nextTick();
  botonCerrar.value?.focus({ preventScroll: true });
  if (quieto() || !fotoGrande.value) return;
  const desde = tarjeta.getBoundingClientRect();
  const hasta = fotoGrande.value.getBoundingClientRect();
  fotoGrande.value.animate(
    [
      { transform: desdeHasta(desde, hasta), borderRadius: "22px", transformOrigin: "0 0" },
      { transform: "none", borderRadius: "0px", transformOrigin: "0 0" },
    ],
    { duration: 520, easing: "cubic-bezier(0.2, 0.9, 0.2, 1)" },
  );
}

async function cerrar() {
  if (abierta.value === null || cerrando.value) return;
  if (!quieto() && fotoGrande.value && origen) {
    cerrando.value = true;
    const desde = origen.getBoundingClientRect();
    const hasta = fotoGrande.value.getBoundingClientRect();
    await fotoGrande.value.animate(
      [
        { transform: "none", transformOrigin: "0 0" },
        { transform: desdeHasta(desde, hasta), borderRadius: "22px", transformOrigin: "0 0" },
      ],
      { duration: 380, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" },
    ).finished;
  }
  abierta.value = null;
  cerrando.value = false;
  document.documentElement.classList.remove("sin-scroll");
  origen?.focus({ preventScroll: true });
}

function alTeclado(e: KeyboardEvent) {
  if (e.key === "Escape") cerrar();
}

onMounted(() => {
  alDesplazar();
  window.addEventListener("keydown", alTeclado);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", alTeclado);
  document.documentElement.classList.remove("sin-scroll");
});
</script>

<style scoped>
.cabeza {
  max-width: 640px;
  margin-bottom: 22px;
}

.controles {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.pestanas {
  display: flex;
  gap: 8px;
  margin: 0 -20px;
  padding: 0 20px 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.pestanas button {
  flex: none;
  min-height: 44px;
  padding: 10px 20px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  background: transparent;
  color: var(--texto);
  font: 600 0.98rem var(--fuente-titulo);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.pestanas button.activa {
  background: var(--blanco);
  color: var(--noche);
  border-color: var(--blanco);
}

.flechas {
  display: none;
  gap: 10px;
}

.flecha {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: var(--boton-2);
  color: var(--blanco);
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.flecha:hover:not(:disabled) {
  background: var(--cian-suave);
}

.flecha:disabled {
  opacity: 0.35;
  cursor: default;
}

.flecha svg,
.cerrar svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- la pista del carrusel ---------- */
.pista {
  --margen: max(20px, calc((100vw - var(--ancho)) / 2));
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 6px var(--margen) 26px;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--margen);
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}

.pista::-webkit-scrollbar {
  display: none;
}

.tarjeta-item {
  flex: none;
  scroll-snap-align: start;
}

.tarjeta {
  position: relative;
  display: block;
  width: 236px;
  height: 370px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 22px;
  background: var(--tarjeta);
  box-shadow: var(--sombra);
  text-align: left;
  cursor: pointer;
  isolation: isolate;
  transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.35s ease;
}

.tarjeta:hover {
  transform: translateY(-6px) scale(1.015);
}

.tarjeta:focus-visible {
  outline: 3px solid var(--cian);
  outline-offset: 3px;
}

.foto {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.tarjeta:hover .foto {
  transform: scale(1.05);
}

/* oscurece arriba para leer el texto, como en las tarjetas de Apple */
.velo {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(6, 12, 23, 0.72) 0%, rgba(6, 12, 23, 0.2) 34%, transparent 55%);
  pointer-events: none;
}

.texto {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.categoria {
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
}

.texto strong {
  font: 700 1.2rem/1.15 var(--fuente-titulo);
  color: #fff;
  text-wrap: balance;
}

.mas {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #13283d;
  font: 600 1.3rem/1 var(--fuente-titulo);
  transition: transform 0.3s ease;
}

.tarjeta:hover .mas {
  transform: rotate(90deg);
}

.ejemplo {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(6, 12, 23, 0.6);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

/* sin foto todavía: tarjeta de la marca */
.sin-foto {
  background: linear-gradient(160deg, #1aa9c4, #1e5f9e);
}

.espera {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 10px;
  padding-top: 70px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.82rem;
}

.espera img {
  width: 70px;
  filter: brightness(0) invert(1);
  opacity: 0.45;
}

/* ---------- tarjeta abierta ---------- */
.modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(4, 10, 20, 0.62);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: aparecer-fondo 0.3s ease;
  overflow-y: auto;
}

.modal.cerrando {
  animation: desaparecer-fondo 0.38s ease forwards;
}

@keyframes aparecer-fondo {
  from {
    opacity: 0;
  }
}

@keyframes desaparecer-fondo {
  to {
    opacity: 0;
  }
}

.panel {
  position: relative;
  width: min(100%, 920px);
  max-height: calc(100svh - 32px);
  overflow: auto;
  display: grid;
  border-radius: 26px;
  background: var(--boton-2);
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.6);
}

.cerrar {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #13283d;
  cursor: pointer;
}

.cerrar:focus-visible {
  outline: 3px solid var(--cian);
  outline-offset: 2px;
}

.panel-foto {
  position: relative;
  background: #0b1424;
}

.panel-foto > img,
.panel-foto .espera.grande {
  display: block;
  width: 100%;
  height: min(58svh, 520px);
  object-fit: contain;
}

.panel-foto.sin-foto {
  background: linear-gradient(160deg, #1aa9c4, #1e5f9e);
}

.panel-foto .espera.grande {
  position: relative;
  display: grid;
  min-height: 320px;
  padding-top: 0;
}

.panel-texto {
  padding: 24px 24px 28px;
  animation: subir 0.5s 0.15s cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

.cerrando .panel-texto {
  animation: bajar 0.2s ease forwards;
}

@keyframes subir {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@keyframes bajar {
  to {
    opacity: 0;
  }
}

.panel-texto .categoria {
  margin: 0;
  color: var(--cian-claro);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.panel-texto h3 {
  margin: 6px 0 0;
  font: 800 clamp(1.6rem, 5vw, 2.3rem) / 1.1 var(--fuente-titulo);
  color: var(--blanco);
}

.detalle {
  margin: 8px 0 0;
  font-size: 1.05rem;
  color: var(--texto);
}

.nota {
  margin: 10px 0 0;
  font-size: 0.86rem;
  color: var(--texto-suave);
}

.subtitulo {
  margin: 20px 0 8px;
  font-weight: 600;
  color: var(--blanco);
}

.servicios {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}

.servicios li {
  padding: 6px 12px;
  border: 1px solid var(--borde);
  border-radius: 10px;
  font-size: 0.9rem;
  color: var(--texto);
}

@media (min-width: 760px) {
  .flechas {
    display: flex;
  }

  .tarjeta {
    width: 300px;
    height: 460px;
  }

  .texto strong {
    font-size: 1.45rem;
  }

  .panel {
    grid-template-columns: 1.25fr 1fr;
    align-items: stretch;
  }

  .panel-foto > img,
  .panel-foto .espera.grande {
    height: 100%;
    min-height: 460px;
    max-height: calc(100svh - 32px);
  }

  .panel-texto {
    align-self: center;
    padding: 36px 34px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tarjeta,
  .foto,
  .mas {
    transition: none;
  }
  .modal,
  .panel-texto {
    animation: none;
  }
}
</style>
