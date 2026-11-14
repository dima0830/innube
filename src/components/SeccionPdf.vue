<template>
  <!--
    TARJETA DE ENTREGA EN PDF: cada invitación digital trae su diseño en PDF
    para que el organizador escriba el nombre de cada invitado y le asigne
    pases; así no entrega solo un link. El botón del PDF abre la invitación.
    Los nombres van encima de la imagen (sin los nombres reales) y se turnan.
  -->
  <section id="pdf" class="seccion">
    <div class="contenedor rejilla">
      <div v-aparecer class="texto">
        <p class="etiqueta">Tarjeta de entrega en PDF</p>
        <h2 class="titulo">Mucho más que <span class="brillo">un link</span> en WhatsApp</h2>
        <p class="entrada">
          Cada invitación digital incluye su diseño en PDF, a juego con la tarjeta. Tú lo personalizas con el nombre
          de cada invitado y le asignas sus pases; al tocar el botón del PDF, se abre la invitación digital.
        </p>

        <ul class="invitados" aria-label="Ejemplos de invitados">
          <li v-for="(inv, i) in INVITADOS" :key="inv.archivo">
            <button type="button" :class="{ activo: actual === i }" :aria-pressed="actual === i" @click="elegir(i)">
              <span class="icono-pdf" aria-hidden="true">PDF</span>
              <span class="datos">
                <b>{{ inv.lineas.join(" ") }}</b>
                <small>{{ inv.pases }} {{ inv.pases === 1 ? "pase" : "pases" }}</small>
              </span>
              <svg class="enviado" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12.5l4 4L14 8.5M10 16.5l1 0L22 8.5" /></svg>
            </button>
          </li>
        </ul>
        <p class="nota">Un solo diseño para todos tus invitados: solo cambias el nombre y los pases.</p>
      </div>

      <div class="escena" aria-hidden="true">
        <div class="hoja">
          <img :src="base" alt="" width="640" height="1334" loading="lazy" />
          <Transition name="nombre" mode="out-in">
            <div :key="actual" class="personal">
              <p class="nombre">
                <span v-for="l in INVITADOS[actual].lineas" :key="l">{{ l }}</span>
              </p>
              <p class="pases">{{ INVITADOS[actual].pases }}</p>
            </div>
          </Transition>
          <span class="toque"></span>
        </div>

        <!-- mensaje de WhatsApp con el archivo -->
        <Transition name="burbuja" mode="out-in">
          <div :key="actual" class="burbuja">
            <span class="archivo-icono">PDF</span>
            <span class="archivo">
              <b>Invitación {{ INVITADOS[actual].archivo }}.pdf</b>
              <small>1 página · PDF</small>
            </span>
            <span class="hora">7:30 p. m. <i>✓✓</i></span>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import base from "@/assets/img/pdf-vale-base.webp";

/* invitados ficticios */
const INVITADOS = [
  { lineas: ["Laura", "y Andrés"], pases: 2, archivo: "Laura y Andrés" },
  { lineas: ["Familia", "Gómez"], pases: 4, archivo: "Familia Gómez" },
  { lineas: ["Tía", "Carmen"], pases: 1, archivo: "Tía Carmen" },
];

const actual = ref(0);
let reloj: ReturnType<typeof setInterval> | undefined;
function arrancar() {
  clearInterval(reloj);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  reloj = setInterval(() => (actual.value = (actual.value + 1) % INVITADOS.length), 3800);
}
function elegir(i: number) {
  actual.value = i;
  arrancar();
}
onMounted(arrancar);
onBeforeUnmount(() => clearInterval(reloj));
</script>

<style scoped>
.rejilla {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: clamp(32px, 6vw, 90px);
}

.texto .titulo {
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  text-wrap: balance;
}

.texto .titulo .brillo {
  white-space: nowrap;
}

/* lista de invitados */
.invitados {
  display: grid;
  gap: 10px;
  margin: 26px 0 14px;
  padding: 0;
  list-style: none;
}

.invitados button {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--borde);
  border-radius: 16px;
  background: var(--tarjeta);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

.invitados button.activo {
  border-color: rgba(127, 241, 250, 0.5);
  background: rgba(24, 217, 231, 0.1);
  box-shadow: 0 10px 30px -16px rgba(24, 217, 231, 0.8);
}

.icono-pdf,
.archivo-icono {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 46px;
  border-radius: 6px;
  background: linear-gradient(160deg, #ff6b5e, #e5383b);
  color: #fff;
  font-family: var(--fuente-titulo);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.datos {
  display: grid;
  flex: 1;
}

.datos b {
  font-family: var(--fuente-titulo);
  font-weight: 600;
  color: var(--blanco);
}

.datos small {
  color: var(--texto-suave);
}

.enviado {
  width: 22px;
  height: 22px;
  color: var(--texto-suave);
  transition: color 0.3s ease;
}

.activo .enviado {
  color: #53bdeb;
}

.nota {
  margin: 0;
  font-size: 0.92rem;
  color: var(--texto-suave);
}

/* ESCENA: la hoja del PDF con la burbuja de WhatsApp encima */
.escena {
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

.hoja {
  position: relative;
  width: min(330px, 74vw);
  container-type: inline-size;
  border-radius: 18px;
  overflow: hidden;
  rotate: 3deg;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 40px 80px -30px rgba(0, 0, 0, 0.85),
    0 0 80px -20px rgba(47, 122, 95, 0.7);
}

.hoja img {
  display: block;
  width: 100%;
  height: auto;
}

/* nombre y pases puestos donde van en la tarjeta (la tarjeta está girada ~4.7°) */
.personal {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.nombre {
  position: absolute;
  left: 50.8%;
  top: 40.1%;
  display: grid;
  justify-items: center;
  width: 44%;
  margin: 0;
  font-family: "Great Vibes", cursive;
  font-size: 10.6cqi;
  line-height: 0.95;
  color: #4d5c41;
  white-space: nowrap;
  transform: translate(-50%, -50%) rotate(4.7deg);
}

.nombre span:nth-child(2) {
  padding-left: 18%;
}

.pases {
  position: absolute;
  left: 49.8%;
  top: 51.1%;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  font-size: 5cqi;
  color: #7d837c;
  transform: translate(-50%, -50%) rotate(4.7deg);
}

/* anillo sobre el botón "¡Haz clic para revelar tu invitación!" */
.toque {
  position: absolute;
  left: 47%;
  top: 57.6%;
  width: 12cqi;
  height: 12cqi;
  margin: -6cqi 0 0 -6cqi;
  border: 2px solid rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  animation: tocar 2.4s ease-out infinite;
}

@keyframes tocar {
  0% {
    opacity: 0;
    transform: scale(1.6);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  55% {
    opacity: 1;
    transform: scale(0.85);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* burbuja de WhatsApp */
.burbuja {
  position: absolute;
  left: max(0px, calc(50% - 250px));
  bottom: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 4px 12px;
  width: min(300px, 82vw);
  padding: 10px 12px 8px;
  border-radius: 14px 14px 14px 4px;
  background: #1f2c34;
  color: #e9edef;
  box-shadow: 0 20px 40px -16px rgba(0, 0, 0, 0.8);
}

.archivo {
  display: grid;
  min-width: 0;
}

.archivo b {
  overflow: hidden;
  font-weight: 600;
  font-size: 0.92rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.archivo small {
  color: #8696a0;
  font-size: 0.78rem;
}

.hora {
  grid-column: 1 / -1;
  justify-self: end;
  font-size: 0.72rem;
  color: #8696a0;
}

.hora i {
  font-style: normal;
  color: #53bdeb;
}

/* transiciones */
.nombre-enter-active,
.nombre-leave-active {
  transition: opacity 0.45s ease, filter 0.45s ease;
}

.nombre-enter-from,
.nombre-leave-to {
  opacity: 0;
  filter: blur(4px);
}

.burbuja-enter-active {
  transition: opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.burbuja-leave-active {
  transition: opacity 0.25s ease;
}

.burbuja-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.94);
}

.burbuja-leave-to {
  opacity: 0;
}

@media (max-width: 820px) {
  .rejilla {
    grid-template-columns: minmax(0, 1fr);
  }
  .burbuja {
    left: 0;
  }
}
</style>
