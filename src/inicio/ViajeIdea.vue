<template>
  <!--
    EL VIAJE DE UNA IDEA
    Una sección alta: mientras se baja, el "escenario" queda fijo (sticky) y una
    línea de tiempo de GSAP, atada al scroll, transforma la idea paso a paso.
    Solo se animan transform y opacidad (y el trazo del dibujo) para que vaya
    fluido en un Android de gama media. Con "reducir movimiento" se ve como
    una lista normal, sin animación.
  -->
  <section id="viaje" ref="viaje" class="viaje" :class="{ quieto }" aria-label="El viaje de una idea">
    <div class="escenario">
      <!-- fondo de cubos: fuerte en la portada, suave durante el viaje -->
      <div ref="cubos" class="cubos"><FondoCubos /></div>
      <div class="visual" aria-hidden="true">
        <div ref="caja" class="caja">
          <span class="halo"></span>

          <img ref="geronimo" class="geronimo" :src="geronimoSvg" alt="" />

          <!-- 1. la idea -->
          <svg ref="bombillo" class="bombillo" viewBox="0 0 100 130">
            <defs>
              <radialGradient id="luz-bombillo">
                <stop offset="0" stop-color="#fff6c2" stop-opacity="0.95" />
                <stop offset="0.55" stop-color="#ffd65a" stop-opacity="0.35" />
                <stop offset="1" stop-color="#ffd65a" stop-opacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="48" r="50" fill="url(#luz-bombillo)" />
            <g stroke="#ffe48a" stroke-width="3" stroke-linecap="round" opacity="0.9">
              <path d="M50 -6v-8M14 10l-6-6M86 10l6-6M2 46h-8M98 46h8" />
            </g>
            <path
              d="M50 10C28 10 15 27 15 46c0 15 9 24 16 33 4 5 6 10 6 16h26c0-6 2-11 6-16 7-9 16-18 16-33 0-19-13-36-35-36z"
              fill="#fffbe6"
              stroke="#ffe48a"
              stroke-width="3"
            />
            <path d="M40 72q5-18 10 0 5-18 10 0" fill="none" stroke="#f5a623" stroke-width="3" stroke-linecap="round" />
            <rect x="37" y="98" width="26" height="7" rx="3" fill="#9fb4c8" />
            <rect x="39" y="107" width="22" height="7" rx="3" fill="#7d93a8" />
            <rect x="44" y="116" width="12" height="6" rx="3" fill="#5f748a" />
          </svg>

          <!-- 3. se imprime: el aviso, con el rollo de vinilo que lo descubre -->
          <div ref="aviso" class="aviso">
            <span ref="luz" class="luz"></span>
            <span class="marca">TU MARCA</span>
          </div>
          <span ref="rollo" class="rollo"></span>

          <!-- 2. se vuelve diseño: la nube se dibuja con sus nodos de vector -->
          <svg ref="dibujo" class="dibujo" viewBox="0 0 220 150">
            <defs>
              <linearGradient id="relleno-nube" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stop-color="#1e3b5d" />
                <stop offset="1" stop-color="#14d1e5" />
              </linearGradient>
            </defs>
            <path
              ref="relleno"
              class="relleno"
              d="M58 128C30 128 14 108 20 86 8 66 24 44 48 48c6-26 38-40 62-26 16-18 52-12 60 14 26-2 42 22 34 44 14 18 2 48-26 48z"
              fill="url(#relleno-nube)"
            />
            <path
              ref="trazo"
              class="trazo"
              pathLength="1"
              d="M58 128C30 128 14 108 20 86 8 66 24 44 48 48c6-26 38-40 62-26 16-18 52-12 60 14 26-2 42 22 34 44 14 18 2 48-26 48zM110 124V66M90 86l20-22 20 22"
            />
            <g ref="nodos" class="nodos">
              <line x1="8" y1="66" x2="32" y2="104" />
              <line x1="54" y1="22" x2="42" y2="74" />
              <line x1="196" y1="36" x2="212" y2="124" />
              <rect x="16" y="82" width="8" height="8" />
              <rect x="44" y="44" width="8" height="8" />
              <rect x="106" y="18" width="8" height="8" />
              <rect x="166" y="32" width="8" height="8" />
              <rect x="200" y="76" width="8" height="8" />
              <rect x="174" y="124" width="8" height="8" />
              <circle cx="8" cy="66" r="4" />
              <circle cx="54" cy="22" r="4" />
              <circle cx="212" cy="124" r="4" />
            </g>
          </svg>

          <!-- 4. se vuelve tuya: mug y cojín -->
          <svg ref="mug" class="mug" viewBox="0 0 130 130">
            <ellipse cx="60" cy="122" rx="48" ry="6" fill="#000" opacity="0.35" />
            <path d="M96 42c26 0 26 44 0 44" fill="none" stroke="#dfe9f2" stroke-width="10" />
            <rect x="16" y="22" width="86" height="98" rx="10" fill="#f6fbff" />
            <rect x="16" y="22" width="22" height="98" rx="10" fill="#dfe9f2" />
            <ellipse cx="59" cy="24" rx="43" ry="7" fill="#c9d8e6" />
            <path
              d="M48 86c-9 0-14-6-12-13-4-6 1-13 8-12 2-8 12-12 19-8 5-6 16-4 19 4 8 0 13 7 10 14 4 6 0 15-9 15z"
              fill="url(#relleno-nube)"
            />
          </svg>
          <svg ref="cojin" class="cojin" viewBox="0 0 140 140">
            <ellipse cx="70" cy="132" rx="56" ry="6" fill="#000" opacity="0.35" />
            <path d="M14 14q56-10 112 0 10 56 0 112-56 10-112 0-10-56 0-112z" fill="#18d9e7" />
            <path d="M26 26q44-8 88 0 8 44 0 88-44 8-88 0-8-44 0-88z" fill="#f6fbff" />
            <path
              d="M56 92c-11 0-17-8-14-16-5-8 1-16 10-15 3-10 15-15 24-10 6-7 20-5 23 5 10 0 16 9 13 17 5 8 0 19-11 19z"
              fill="url(#relleno-nube)"
            />
          </svg>

          <!-- 5. se regala -->
          <svg ref="regalo" class="regalo" viewBox="0 0 160 170">
            <defs>
              <linearGradient id="caja-regalo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#18d9e7" />
                <stop offset="1" stop-color="#1e6fa8" />
              </linearGradient>
            </defs>
            <ellipse cx="80" cy="162" rx="64" ry="7" fill="#000" opacity="0.35" />
            <rect x="20" y="70" width="120" height="90" rx="8" fill="url(#caja-regalo)" />
            <rect x="72" y="70" width="16" height="90" fill="#f6fbff" />
            <g ref="tapa">
              <rect x="12" y="48" width="136" height="28" rx="7" fill="#22e3f0" />
              <rect x="72" y="48" width="16" height="28" fill="#f6fbff" />
              <path d="M80 48c-14-30-48-24-34-4zM80 48c14-30 48-24 34-4z" fill="#f6fbff" />
              <circle cx="80" cy="47" r="7" fill="#dfe9f2" />
            </g>
          </svg>

          <!-- 6. llega a ti: chispas de celebración -->
          <span v-for="n in 10" :key="n" ref="chispas" class="chispa" :style="chispa(n)"></span>
        </div>
      </div>

      <div class="textos">
        <!-- portada -->
        <div class="panel portada">
          <h1 class="grande">Todo empieza con una <Resaltado :retraso="700">idea</Resaltado>.</h1>
          <p class="bajada">La tuya. En Innube la convertimos en algo que se ve, se toca y se regala.</p>
          <div class="acciones">
            <a :href="enlaceWhatsApp(MENSAJES.general)" target="_blank" rel="noopener noreferrer" v-magnetico class="boton boton-principal">
              <IconoWhatsApp />
              <span>Cuéntanos tu idea</span>
            </a>
            <span class="baja">Baja y mira su viaje</span>
          </div>
        </div>

        <!-- pasos -->
        <div v-for="paso in PASOS" :key="paso.id" class="panel">
          <p class="numero">{{ paso.numero }}</p>
          <p v-if="paso.linea" class="linea">{{ paso.linea }}</p>
          <h2 class="grande">{{ paso.titulo }}</h2>
          <p class="bajada">{{ paso.texto }}</p>
          <ul v-if="paso.servicios" class="servicios">
            <li v-for="s in paso.servicios" :key="s">{{ s }}</li>
          </ul>
        </div>

        <!-- final -->
        <div class="panel final">
          <p class="numero">06</p>
          <h2 class="grande">Y llega a <Resaltado tipo="circulo" :retraso="200">ti</Resaltado>.</h2>
          <p class="bajada">Ahora cuéntanos: ¿cuál es tu idea?</p>
          <div class="acciones">
            <a :href="enlaceWhatsApp(MENSAJES.general)" target="_blank" rel="noopener noreferrer" v-magnetico class="boton boton-principal">
              <IconoWhatsApp />
              <span>Escríbenos por WhatsApp</span>
            </a>
            <a v-magnetico href="#portafolio" class="boton boton-secundario">Ver trabajos</a>
          </div>
        </div>
      </div>

      <!-- progreso del viaje -->
      <div class="progreso" aria-hidden="true">
        <span v-for="n in 7" :key="n" :class="{ activo: n - 1 <= actual }"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import geronimoSvg from "@/assets/img/geronimo.svg";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import FondoCubos from "@/components/FondoCubos.vue";
import Resaltado from "@/components/Resaltado.vue";
import { enlaceWhatsApp } from "@/config";
import { MENSAJES, PASOS } from "./datos";

gsap.registerPlugin(ScrollTrigger);

const viaje = ref<HTMLElement>();
const cubos = ref<HTMLElement>();
const caja = ref<HTMLElement>();
const geronimo = ref<HTMLElement>();
const bombillo = ref<SVGElement>();
const dibujo = ref<SVGElement>();
const trazo = ref<SVGPathElement>();
const relleno = ref<SVGPathElement>();
const nodos = ref<SVGGElement>();
const aviso = ref<HTMLElement>();
const luz = ref<HTMLElement>();
const rollo = ref<HTMLElement>();
const mug = ref<SVGElement>();
const cojin = ref<SVGElement>();
const regalo = ref<SVGElement>();
const tapa = ref<SVGGElement>();
const chispas = ref<HTMLElement[]>([]);

const actual = ref(0);
const quieto = ref(false);

const COLORES = ["#18d9e7", "#ffd65a", "#7ff1fa", "#ff7a8a", "#f6fbff"];
function chispa(n: number) {
  const angulo = (n / 10) * Math.PI * 2;
  return {
    left: `${50 + Math.cos(angulo) * 40}%`,
    top: `${46 + Math.sin(angulo) * 36}%`,
    background: COLORES[n % COLORES.length],
  };
}

let ctx: gsap.Context | undefined;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    quieto.value = true;
    return;
  }

  ctx = gsap.context(() => {
    const ancho = () => caja.value!.offsetWidth;
    const T = 0.6; // duración de cada transición
    const panelesOrdenados = Array.from(viaje.value!.querySelectorAll<HTMLElement>(".panel"));

    gsap.set([dibujo.value, aviso.value, rollo.value, mug.value, cojin.value, regalo.value], { autoAlpha: 0 });
    gsap.set(trazo.value!, { strokeDashoffset: 1 });
    gsap.set([relleno.value, nodos.value], { opacity: 0 });
    gsap.set(chispas.value, { scale: 0, opacity: 0 });
    gsap.set(panelesOrdenados.slice(1), { autoAlpha: 0, y: 28 });

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: T },
      scrollTrigger: {
        trigger: viaje.value,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          const i = Math.min(6, Math.floor(s.progress * 6.6 + 0.25));
          if (i !== actual.value) actual.value = i;
        },
      },
    });

    // textos: sale el anterior y entra el siguiente en cada paso
    for (let i = 1; i < panelesOrdenados.length; i++) {
      tl.to(panelesOrdenados[i - 1], { autoAlpha: 0, y: -24, duration: 0.3 }, i - 1);
      tl.to(panelesOrdenados[i], { autoAlpha: 1, y: 0, duration: 0.35 }, i - 1 + 0.3);
    }

    // los cubos se calman después de la portada (siguen ahí, suaves)
    tl.to(cubos.value!, { opacity: 0.35, duration: 0.5 }, 0);

    // 0 → 1: la idea se enciende y Gerónimo se hace a un lado para acompañar
    tl.to(geronimo.value!, { x: () => -ancho() * 0.4, y: () => ancho() * 0.08, scale: 0.34 }, 0)
      .to(bombillo.value!, { y: () => ancho() * 0.3, scale: 2.5 }, 0)
      .to(".halo", { opacity: 1, scale: 1.15 }, 0);

    // 1 → 2: la idea se vuelve diseño
    tl.to(bombillo.value!, { scale: 0.6, autoAlpha: 0, duration: 0.4 }, 1)
      .to(dibujo.value!, { autoAlpha: 1, duration: 0.2 }, 1.05)
      .to(trazo.value!, { strokeDashoffset: 0, duration: 0.45, ease: "none" }, 1.05)
      .to(nodos.value!, { opacity: 1, duration: 0.25 }, 1.2);

    // 2 → 3: se imprime en un aviso que se enciende
    tl.to(nodos.value!, { opacity: 0, duration: 0.2 }, 2)
      .to(relleno.value!, { opacity: 1, duration: 0.4 }, 2)
      .to(dibujo.value!, { scale: 0.62, y: () => -ancho() * 0.05 }, 2)
      .fromTo(aviso.value!, { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: 0.45, ease: "power1.inOut", immediateRender: false }, 2.05)
      .fromTo(rollo.value!, { autoAlpha: 1, x: 0 }, { x: () => ancho() * 0.86, duration: 0.45, ease: "power1.inOut", immediateRender: false }, 2.05)
      .to(rollo.value!, { autoAlpha: 0, duration: 0.1 }, 2.5)
      .fromTo(luz.value!, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power4.in", immediateRender: false }, 2.45);

    // 3 → 4: se vuelve tuya (mug y cojín)
    tl.to([aviso.value, dibujo.value], { autoAlpha: 0, scale: 0.4, y: () => -ancho() * 0.12 }, 3)
      .fromTo(mug.value!, { autoAlpha: 0, x: () => -ancho() * 0.3, rotate: -18 }, { autoAlpha: 1, x: 0, rotate: -6, duration: 0.45, immediateRender: false }, 3.15)
      .fromTo(cojin.value!, { autoAlpha: 0, x: () => ancho() * 0.3, rotate: 18 }, { autoAlpha: 1, x: 0, rotate: 8, duration: 0.45, immediateRender: false }, 3.2);

    // 4 → 5: se empaca y se regala
    tl.to(mug.value!, { x: () => ancho() * 0.2, y: () => ancho() * 0.05, scale: 0.3, autoAlpha: 0 }, 4)
      .to(cojin.value!, { x: () => -ancho() * 0.18, y: () => ancho() * 0.05, scale: 0.3, autoAlpha: 0 }, 4)
      .fromTo(regalo.value!, { autoAlpha: 0, y: () => ancho() * 0.12, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, immediateRender: false }, 4.15)
      .fromTo(tapa.value!, { y: -70, rotate: -14, transformOrigin: "50% 100%" }, { y: 0, rotate: 0, duration: 0.4, ease: "bounce.out", immediateRender: false }, 4.3);

    // 5 → 6: llega a ti, Gerónimo vuelve y celebra
    tl.to(geronimo.value!, { x: () => -ancho() * 0.12, y: 0, scale: 0.82 }, 5)
      .to(regalo.value!, { x: () => ancho() * 0.22, y: () => ancho() * 0.12, scale: 0.55 }, 5)
      .to(chispas.value, { scale: 1, opacity: 1, stagger: 0.03, duration: 0.3, ease: "back.out(3)" }, 5.3)
      .to({}, { duration: 0.4 }, 6.2);
  }, viaje.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<style scoped>
.viaje {
  position: relative;
  height: 720svh;
}

.escenario {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
}

.cubos {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.visual,
.textos,
.progreso {
  z-index: 1;
}

/* ---------- lo visual ---------- */
.visual {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  height: calc(56svh - 64px);
  display: grid;
  place-items: center;
}

.caja {
  position: relative;
  width: min(84vw, calc(56svh - 80px), 460px);
  aspect-ratio: 1;
}

.caja > * {
  position: absolute;
}

.halo {
  inset: 6%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(24, 217, 231, 0.32), rgba(24, 217, 231, 0) 68%);
  opacity: 0.45;
}

.geronimo {
  left: 32%;
  bottom: 0;
  height: 74%;
  width: auto;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
}

.bombillo {
  left: 41%;
  top: 0;
  width: 18%;
  overflow: visible;
  filter: drop-shadow(0 0 14px rgba(255, 214, 90, 0.65));
}

.dibujo {
  left: 8%;
  top: 22%;
  width: 84%;
  overflow: visible;
}

.trazo {
  fill: none;
  stroke: var(--cian-claro);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  filter: drop-shadow(0 0 6px rgba(24, 217, 231, 0.8));
}

.nodos line {
  stroke: rgba(10, 150, 168, 0.55);
  stroke-width: 1.5;
}

.nodos rect {
  fill: var(--noche);
  stroke: var(--cian-claro);
  stroke-width: 2;
}

.nodos circle {
  fill: var(--cian-claro);
}

.aviso {
  left: 4%;
  top: 16%;
  width: 92%;
  height: 58%;
  border-radius: 18px;
  background: linear-gradient(160deg, #ffffff, #e8f7fa);
  border: 2px solid rgba(10, 150, 168, 0.35);
  transform-origin: 0 50%;
}

.luz {
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  border: 2px solid var(--cian-claro);
  box-shadow:
    0 0 28px rgba(24, 217, 231, 0.75),
    inset 0 0 40px rgba(24, 217, 231, 0.25);
}

.marca {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 8%;
  text-align: center;
  font-family: var(--fuente-titulo);
  font-weight: 800;
  font-size: clamp(0.9rem, 4.4vw, 1.5rem);
  letter-spacing: 0.3em;
  color: var(--blanco);
}

.rollo {
  left: 1%;
  top: 15%;
  width: 7%;
  height: 68%;
  border-radius: 999px;
  background: linear-gradient(90deg, #8aa6bf, #f4fbff 45%, #8aa6bf);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.mug {
  left: 6%;
  top: 22%;
  width: 46%;
}

.cojin {
  right: 4%;
  top: 18%;
  width: 50%;
}

.regalo {
  left: 25%;
  top: 14%;
  width: 50%;
  overflow: visible;
}

.chispa {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

/* ---------- los textos ---------- */
.textos {
  position: absolute;
  left: 0;
  right: 0;
  top: 56svh;
  bottom: 0;
  width: min(100% - 40px, var(--ancho));
  margin-inline: auto;
}

.panel {
  position: absolute;
  inset: 0 0 auto;
}

.grande {
  margin: 0;
  font-family: var(--fuente-titulo);
  font-weight: 800;
  font-size: clamp(2.3rem, 10.5vw, 5.2rem);
  line-height: 0.98;
  letter-spacing: -0.035em;
  color: var(--blanco);
  text-wrap: balance;
}

.portada .grande {
  font-size: clamp(2.6rem, 12vw, 6rem);
}

.bajada {
  margin: 14px 0 0;
  max-width: 34ch;
  font-size: clamp(1rem, 4.2vw, 1.25rem);
  line-height: 1.5;
  color: var(--texto);
}

.numero {
  position: absolute;
  right: 0;
  top: -8px;
  margin: 0;
  font-family: var(--fuente-titulo);
  font-weight: 800;
  font-size: clamp(3.4rem, 18vw, 8rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(10, 150, 168, 0.35);
}

.linea {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-weight: 500;
  color: var(--cian-claro);
}

.linea::before {
  content: "";
  width: 22px;
  height: 2px;
  background: currentColor;
}

.servicios {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.servicios li {
  padding: 6px 12px;
  border-radius: 10px;
  background: rgba(19, 40, 61, 0.06);
  border: 1px solid var(--borde);
  font-size: 0.9rem;
  color: var(--blanco);
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 18px;
  margin-top: 22px;
}

.baja {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--texto-suave);
}

.baja::after {
  content: "↓";
  animation: rebote 1.6s ease-in-out infinite;
}

@keyframes rebote {
  50% {
    transform: translateY(5px);
  }
}

/* ---------- progreso ---------- */
.progreso {
  position: absolute;
  right: 10px;
  top: 50%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  translate: 0 -50%;
}

.progreso span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(10, 150, 168, 0.25);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.progreso span.activo {
  background: var(--cian);
  transform: scale(1.4);
}

/* ---------- computador: imagen a la derecha, texto a la izquierda ---------- */
@media (min-width: 900px) {
  .visual {
    top: 0;
    left: auto;
    right: 3vw;
    width: 50%;
    height: 100svh;
  }

  .caja {
    width: min(42vw, 72svh, 600px);
  }

  .textos {
    top: 0;
    display: grid;
    align-items: center;
  }

  .panel {
    inset: 50% auto auto 0;
    width: 44%;
    translate: 0 -50%;
  }

  .grande {
    font-size: clamp(3rem, 5.4vw, 5.6rem);
  }

  .portada .grande {
    font-size: clamp(3.4rem, 6.4vw, 6.6rem);
  }

  .numero {
    top: -0.9em;
    right: auto;
    left: 0;
    font-size: clamp(4rem, 7vw, 7rem);
    opacity: 0.8;
  }

  .progreso {
    right: 24px;
  }
}

/* ---------- sin animaciones: se lee como una lista ---------- */
.quieto {
  height: auto;
}

.quieto .escenario {
  position: relative;
  height: auto;
  overflow: visible;
  padding: 110px 0 40px;
}

.quieto .visual,
.quieto .progreso {
  display: none;
}

.quieto .textos {
  position: relative;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.quieto .panel {
  position: relative;
  inset: auto;
  width: auto;
  translate: none;
}

.quieto .numero {
  position: static;
  font-size: 3rem;
}
</style>
