<template>
  <!--
    CÓMO FUNCIONA: dos tutoriales animados (confirmación de invitados y fotos en
    vivo). Cada uno avanza solo paso a paso como un video corto; se puede pausar
    o saltar a un paso. Los datos de ejemplo son ficticios.
  -->
  <section id="como-funciona" ref="seccionRef" class="seccion">
    <div class="contenedor">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Cómo funciona</p>
        <h2 class="titulo">Tú celebras, <span class="brillo">la tarjeta trabaja</span></h2>
        <p class="entrada">Mira en segundos cómo se confirman tus invitados y cómo sus fotos llegan a la pantalla de tu evento. Así funciona el plan Premium.</p>
      </div>

      <div class="pestanas" role="tablist" aria-label="Tutoriales">
        <button
          v-for="(t, i) in TUTORIALES"
          :key="t.id"
          type="button"
          role="tab"
          class="pestana"
          :class="{ activa: tutorial === i }"
          :aria-selected="tutorial === i"
          @click="elegirTutorial(i)"
        >
          <span class="icono-pestana" aria-hidden="true" v-html="t.icono"></span>
          {{ t.nombre }}
        </button>
      </div>

      <div class="tutorial" @mouseenter="pausadoHover = true" @mouseleave="pausadoHover = false">
        <!-- ESCENARIO con las maquetas -->
        <div class="escenario" :class="`t${tutorial} p${paso}`" aria-hidden="true">
          <!-- ===== TUTORIAL 1: CONFIRMACIÓN ===== -->
          <template v-if="tutorial === 0">
            <div class="maqueta-celular">
              <Celular>
                <div class="app">
                  <!-- paso 0: chat de WhatsApp con el enlace -->
                  <div class="capa chat" :class="{ ver: paso === 0 }">
                    <div class="chat-barra"><span class="avatar">🎉</span> Familia Rodríguez</div>
                    <div class="burbuja recibida">¡Te invitamos a nuestra celebración! 💛</div>
                    <div class="burbuja recibida enlace">
                      <img :src="pdfBase" alt="" />
                      <b>Invitación para la familia Rodríguez</b>
                      <small>2 pases · Toca para abrir tu invitación</small>
                    </div>
                    <div class="dedo" style="--x: 55%; --y: 68%"></div>
                  </div>
                  <!-- paso 1: formulario de confirmación -->
                  <div class="capa formulario" :class="{ ver: paso === 1 }">
                    <p class="app-titulo">Confirmar asistencia</p>
                    <label>Nombre completo<span class="campo"><span class="escribe">Laura Gómez</span></span></label>
                    <label>Teléfono<span class="campo"><span class="escribe e2">300 000 0000</span></span></label>
                    <div class="opciones"><span class="opcion si">¡Sí, asistiré!</span><span class="opcion">No puedo</span></div>
                    <div class="pases"><span>1</span><span class="activo">2</span><span>3</span></div>
                    <span class="enviar">Enviar ✓</span>
                    <div class="dedo d-enviar"></div>
                  </div>
                  <!-- pasos 2 y 3: gracias -->
                  <div class="capa gracias" :class="{ ver: paso >= 2 }">
                    <span class="check">✓</span>
                    <p>¡Gracias, Laura!<br /><small>Te esperamos con 2 pases</small></p>
                  </div>
                </div>
              </Celular>
            </div>

            <div class="maqueta-panel">
              <div class="ventana">
                <div class="ventana-barra"><i></i><i></i><i></i><span>Tu panel · Lista de invitados</span></div>
                <div class="panel-cuerpo">
                  <div class="panel-pestanas"><span class="activa">Confirmaciones</span><span>Fotos</span></div>
                  <p class="resumen">
                    <b>{{ paso >= 2 ? 13 : 12 }}</b> registros · <b>{{ paso >= 2 ? 11 : 10 }}</b> asistirán · <b>{{ paso >= 2 ? 25 : 23 }}</b> pases
                  </p>
                  <div class="tabla">
                    <div class="fila cabeza"><span>Nombre</span><span>Asistencia</span><span>Pases</span></div>
                    <div class="fila nueva" :class="{ ver: paso >= 2 }"><span>Laura Gómez</span><span class="si">Asistirá</span><span>2</span></div>
                    <div v-for="f in FILAS" :key="f[0]" class="fila"><span>{{ f[0] }}</span><span :class="f[1] === 'Asistirá' ? 'si' : 'no'">{{ f[1] }}</span><span>{{ f[2] }}</span></div>
                  </div>
                  <span class="actualizar" :class="{ ver: paso === 3 }">↻ Actualizar</span>
                </div>
              </div>
            </div>
          </template>

          <!-- ===== TUTORIAL 2: FOTOS EN VIVO ===== -->
          <template v-else>
            <div class="maqueta-celular">
              <Celular>
                <div class="app">
                  <!-- paso 0: QR en la mesa -->
                  <div class="capa qr-mesa" :class="{ ver: paso === 0 }">
                    <div class="tarjetita">
                      <p>Comparte tus fotos 📸</p>
                      <div class="qr" v-html="QR"></div>
                      <small>Escanea con tu cámara</small>
                    </div>
                    <div class="escaneo"></div>
                  </div>
                  <!-- paso 1: subir fotos -->
                  <div class="capa subir" :class="{ ver: paso === 1 }">
                    <p class="app-titulo">Comparte tus recuerdos</p>
                    <label>Tu nombre<span class="campo"><span class="escribe">Tía Carmen</span></span></label>
                    <div class="miniaturas">
                      <span v-for="(f, i) in FOTOS.slice(0, 3)" :key="i" class="mini" :style="{ background: f.fondo, animationDelay: `${0.4 + i * 0.35}s` }">{{ f.icono }}</span>
                    </div>
                    <span class="enviar">Enviar fotografías</span>
                    <div class="dedo d-enviar"></div>
                  </div>
                  <!-- pasos 2 y 3 -->
                  <div class="capa gracias" :class="{ ver: paso >= 2 }">
                    <span class="check">✓</span>
                    <p>¡Fotos enviadas!<br /><small>Aparecerán en la pantalla</small></p>
                  </div>
                </div>
              </Celular>
            </div>

            <div class="maqueta-panel">
              <!-- paso 2: moderación en tu panel -->
              <div class="ventana" :class="{ atras: paso === 3 }">
                <div class="ventana-barra"><i></i><i></i><i></i><span>Tu panel · Fotos</span></div>
                <div class="panel-cuerpo">
                  <div class="panel-pestanas"><span>Confirmaciones</span><span class="activa">Fotos <em>3</em></span></div>
                  <div class="moderacion">
                    <div v-for="(f, i) in FOTOS.slice(0, 3)" :key="i" class="foto-mod" :class="{ aprobada: paso >= 2 && i === 0 }">
                      <span class="foto" :style="{ background: f.fondo }">{{ f.icono }}</span>
                      <span class="acciones-mod"><b>✓<span class="palabra"> Aprobar</span></b><i>✕</i></span>
                    </div>
                  </div>
                  <div class="dedo d-aprobar" :class="{ ver: paso === 2 }"></div>
                </div>
              </div>

              <!-- paso 3: pantalla gigante del evento -->
              <div class="pantalla-evento" :class="{ ver: paso === 3 }">
                <div class="muro">
                  <span v-for="(f, i) in FOTOS" :key="i" class="tesela" :style="{ background: f.fondo }">{{ f.icono }}</span>
                </div>
                <div class="destacada">
                  <span class="foto-grande" :style="{ background: FOTOS[0].fondo }">{{ FOTOS[0].icono }}</span>
                  <span class="insignia-nueva">✨ ¡Nueva foto!</span>
                  <small>— Tía Carmen</small>
                </div>
                <div class="qr-pie" v-html="QR"></div>
              </div>
            </div>
          </template>
        </div>

        <!-- PASOS y controles -->
        <div class="pasos">
          <ol>
            <li v-for="(p, i) in TUTORIALES[tutorial].pasos" :key="i" :class="{ actual: paso === i, hecho: paso > i }">
              <button type="button" @click="irA(i)">
                <span class="num">{{ i + 1 }}</span>
                <span class="textos">
                  <b>{{ p.titulo }}</b>
                  <small>{{ p.texto }}</small>
                </span>
              </button>
              <span class="barra"><span :style="paso === i && !pausado ? { animationDuration: `${DURACION}ms` } : undefined" :class="{ corre: paso === i && !pausado, llena: paso > i }"></span></span>
            </li>
          </ol>

          <div class="controles">
            <button type="button" class="control" :aria-label="pausadoBoton ? 'Reproducir' : 'Pausar'" @click="pausadoBoton = !pausadoBoton">
              <svg v-if="pausadoBoton" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
            </button>
            <a :href="TUTORIALES[tutorial].enlace" target="_blank" rel="noopener noreferrer" class="boton boton-secundario ver-real">
              {{ TUTORIALES[tutorial].textoEnlace }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          </div>
          <p class="nota">{{ TUTORIALES[tutorial].nota }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { DEMO } from "@/config";
import pdfBase from "@/assets/img/pdf-vale-base.webp";
import Celular from "@/components/Celular.vue";

const DURACION = 4200; // milisegundos por paso

const TUTORIALES = [
  {
    id: "invitados",
    nombre: "Confirmación de invitados",
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 11l2 2 4-4"/></svg>',
    enlace: DEMO.invitados,
    textoEnlace: "Ver el panel real",
    nota: "El panel real de Vale está protegido con contraseña: así solo tú ves la lista de tus invitados.",
    pasos: [
      { titulo: "Envías su invitación", texto: "Por WhatsApp, con un enlace a su nombre y sus pases." },
      { titulo: "Tu invitado confirma", texto: "Escribe su nombre, si asiste y cuántos pases usará." },
      { titulo: "Lo ves al instante", texto: "Aparece en tu panel con el total de asistentes y pases." },
      { titulo: "Tu lista siempre al día", texto: "Consúltala desde el celular cuando quieras." },
    ],
  },
  {
    id: "fotos",
    nombre: "Fotos en vivo en tu evento",
    icono: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/></svg>',
    enlace: DEMO.pantalla,
    textoEnlace: "Ver la pantalla real",
    nota: "La pantalla real de Vale muestra las fotos que compartieron sus invitados en la fiesta.",
    pasos: [
      { titulo: "Un QR en cada mesa", texto: "Tus invitados lo escanean con la cámara del celular." },
      { titulo: "Suben sus fotos", texto: "Con su nombre, sin apps ni registros." },
      { titulo: "Tú las apruebas", texto: "Desde tu panel eliges qué fotos se muestran." },
      { titulo: "¡A la pantalla gigante!", texto: "Aparecen en vivo en el video beam de tu evento." },
    ],
  },
];

const FILAS = [
  ["Carlos Pérez", "Asistirá", "3"],
  ["Ana María Ruiz", "Asistirá", "2"],
  ["Jorge Díaz", "No asistirá", "0"],
];

/* fotos ficticias: degradados con un icono */
const FOTOS = [
  { fondo: "linear-gradient(135deg,#ffb3c7,#ff7aa2)", icono: "💃" },
  { fondo: "linear-gradient(135deg,#a8e6ff,#4aa8ff)", icono: "🥂" },
  { fondo: "linear-gradient(135deg,#ffe29a,#ffb347)", icono: "🎂" },
  { fondo: "linear-gradient(135deg,#c3f7d1,#3cc98b)", icono: "📸" },
  { fondo: "linear-gradient(135deg,#d7c6ff,#8f6bff)", icono: "🎶" },
  { fondo: "linear-gradient(135deg,#ffd1a8,#ff8a5b)", icono: "🌸" },
];

/* un QR decorativo (no lleva a ningún lado) */
const QR = (() => {
  let s = '<svg viewBox="0 0 21 21" shape-rendering="crispEdges"><rect width="21" height="21" fill="#fff"/>';
  const ojo = (x: number, y: number) => `<path fill="#071a2e" d="M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z" fill-rule="evenodd"/>`;
  s += ojo(0, 0) + ojo(14, 0) + ojo(0, 14);
  /* módulos repartidos por toda la grilla, fuera de los tres "ojos" */
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      const enOjo = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      const h = ((x * 73856093) ^ (y * 19349663) ^ (x * y * 83492791)) >>> 0;
      if (!enOjo && h % 7 < 3) s += `<rect x="${x}" y="${y}" width="1" height="1" fill="#071a2e"/>`;
    }
  }
  return s + "</svg>";
})();

const tutorial = ref(0);
const paso = ref(0);
const pausadoBoton = ref(false);
const pausadoHover = ref(false);
const enPantalla = ref(false);
const pausado = computed(() => pausadoBoton.value || pausadoHover.value || !enPantalla.value);

let temporizador: ReturnType<typeof setTimeout> | undefined;
function programar() {
  clearTimeout(temporizador);
  if (pausado.value) return;
  temporizador = setTimeout(() => {
    paso.value = (paso.value + 1) % TUTORIALES[tutorial.value].pasos.length;
    programar();
  }, DURACION);
}

function irA(i: number) {
  paso.value = i;
  programar();
}

function elegirTutorial(i: number) {
  tutorial.value = i;
  paso.value = 0;
  programar();
}

watch(pausado, programar);

const seccionRef = ref<HTMLElement | null>(null);
let observador: IntersectionObserver | undefined;
onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) pausadoBoton.value = true;
  observador = new IntersectionObserver(([e]) => (enPantalla.value = e.isIntersecting), { threshold: 0.35 });
  if (seccionRef.value) observador.observe(seccionRef.value);
});
onBeforeUnmount(() => {
  clearTimeout(temporizador);
  observador?.disconnect();
});
</script>

<style scoped>
/* PESTAÑAS */
.pestanas {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 34px;
}

.pestana {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  background: rgba(19, 40, 61, 0.03);
  color: var(--texto);
  font-family: var(--fuente-titulo);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.3s ease;
}

.pestana.activa {
  background: linear-gradient(135deg, rgba(10, 150, 168, 0.22), rgba(24, 217, 231, 0.1));
  color: var(--blanco);
  box-shadow: 0 0 0 1px rgba(10, 150, 168, 0.45), 0 10px 30px -14px rgba(24, 217, 231, 0.8);
}

.icono-pestana {
  display: grid;
  width: 22px;
  height: 22px;
  color: var(--cian);
}

.icono-pestana :deep(svg) {
  width: 100%;
  height: 100%;
}

/* MARCO DEL TUTORIAL */
.tutorial {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  padding: clamp(18px, 3vw, 36px);
  border: 1px solid var(--borde);
  border-radius: 32px;
  background:
    radial-gradient(ellipse 70% 60% at 30% 40%, rgba(24, 217, 231, 0.12), transparent 70%),
    var(--tarjeta);
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.7);
}

/* ESCENARIO: celular a la izquierda, panel/pantalla a la derecha */
.escenario {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.62fr) minmax(0, 1fr);
  align-items: center;
  gap: 4%;
  min-height: 430px;
}

.maqueta-celular {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 220px;
  justify-self: center;
}

.app {
  position: relative;
  height: 100%;
  background: #f6f9fc;
  color: #10243a;
  font-size: 11px;
}

.capa {
  position: absolute;
  inset: 0;
  padding: 26% 9% 8%;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.45s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.capa.ver {
  opacity: 1;
  transform: none;
}

.app-titulo {
  margin: 0 0 10px;
  font-family: var(--fuente-titulo);
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}

/* chat */
.chat {
  padding-top: 0;
  background: #e9f1ea;
}

.chat-barra {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 -10% 12px;
  padding: 30% 10% 8px;
  background: #0b7a6c;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
}

.burbuja {
  max-width: 88%;
  margin-bottom: 8px;
  padding: 7px 9px;
  border-radius: 10px 10px 10px 2px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  font-size: 10.5px;
}

.burbuja.enlace {
  display: grid;
  gap: 2px;
  padding: 5px;
}

.burbuja.enlace img {
  height: 92px;
  border-radius: 7px;
  object-fit: cover;
  object-position: top;
}

.burbuja.enlace small {
  color: #6a7a8a;
}

/* formulario */
.formulario label,
.subir label {
  display: grid;
  gap: 3px;
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 9.5px;
  color: #4b6075;
}

.campo {
  display: block;
  min-height: 24px;
  padding: 5px 8px;
  border: 1px solid #d6e2ee;
  border-radius: 7px;
  background: #fff;
  font-weight: 500;
  font-size: 10.5px;
  color: #10243a;
  white-space: nowrap;
  overflow: hidden;
}

/* efecto de "escribiendo" */
.escribe {
  display: inline-block;
}

.ver .escribe {
  animation: escribir 1.2s steps(14) 0.3s both;
}

.ver .escribe.e2 {
  animation-delay: 1.3s;
}

@keyframes escribir {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.opciones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  margin: 4px 0 8px;
}

.opcion {
  padding: 6px;
  border: 1px solid #d6e2ee;
  border-radius: 999px;
  text-align: center;
  font-weight: 700;
}

.ver .opcion.si {
  animation: elegir 0.4s ease 2.2s both;
}

@keyframes elegir {
  to {
    background: #0b2742;
    border-color: #0b2742;
    color: #fff;
  }
}

.pases {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.pases span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #d6e2ee;
  border-radius: 50%;
  font-weight: 700;
}

.ver .pases .activo {
  animation: elegir 0.4s ease 2.6s both;
}

.enviar {
  display: block;
  padding: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #7ff1fa, #18d9e7);
  color: #071a2e;
  font-weight: 800;
  text-align: center;
}

.ver .enviar {
  animation: pulsar 0.35s ease 3.3s both;
}

@keyframes pulsar {
  50% {
    transform: scale(0.94);
  }
}

/* dedo que toca */
.dedo {
  position: absolute;
  left: var(--x, 50%);
  top: var(--y, 50%);
  width: 26px;
  height: 26px;
  margin: -13px 0 0 -13px;
  border-radius: 50%;
  background: rgba(24, 217, 231, 0.35);
  border: 2px solid rgba(24, 217, 231, 0.9);
  opacity: 0;
}

.ver > .dedo,
.dedo.ver {
  animation: tocar 1.4s ease 1.6s both;
}

.d-enviar {
  --x: 50%;
  --y: 86%;
}

.formulario.ver > .d-enviar,
.subir.ver > .d-enviar {
  animation-delay: 3s;
}

@keyframes tocar {
  0% {
    opacity: 0;
    transform: scale(1.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
  60% {
    opacity: 1;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

/* gracias */
.gracias {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  padding-top: 8%;
  text-align: center;
  font-family: var(--fuente-titulo);
  font-size: 15px;
  font-weight: 700;
}

.gracias small {
  font-family: var(--fuente-texto);
  font-weight: 500;
  font-size: 11px;
  color: #4b6075;
}

.check {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7ff1fa, #18d9e7);
  color: #071a2e;
  font-size: 26px;
}

.gracias.ver .check {
  animation: aparece 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes aparece {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
}

/* QR de mesa */
.qr-mesa {
  display: grid;
  place-items: center;
  background: #f1ece2;
}

.tarjetita {
  width: 86%;
  padding: 12px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.tarjetita p {
  margin: 0 0 8px;
  font-weight: 800;
  font-size: 11px;
}

.tarjetita small {
  color: #6a7a8a;
}

.qr :deep(svg),
.qr-pie :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.qr {
  width: 70%;
  margin: 0 auto 6px;
}

.escaneo {
  position: absolute;
  left: 18%;
  right: 18%;
  top: 38%;
  height: 2px;
  background: #18d9e7;
  box-shadow: 0 0 12px #18d9e7;
}

.qr-mesa.ver .escaneo {
  animation: barrer 1.6s ease-in-out infinite alternate;
}

@keyframes barrer {
  to {
    transform: translateY(110px);
  }
}

/* subir fotos */
.miniaturas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin: 6px 0 12px;
}

.mini {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 8px;
  font-size: 18px;
}

.subir.ver .mini {
  animation: aparece 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* PANEL (ventana de computadora) */
.maqueta-panel {
  position: relative;
  min-height: 300px;
}

.ventana {
  position: relative;
  border-radius: 14px;
  background: #fff;
  color: #10243a;
  font-size: 12px;
  box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(19, 40, 61, 0.08);
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.ventana.atras {
  opacity: 0;
  transform: scale(0.92) translateY(10px);
}

.ventana-barra {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  background: #eef3f8;
  font-size: 11px;
  font-weight: 700;
  color: #4b6075;
}

.ventana-barra i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #f26b6b;
}

.ventana-barra i:nth-child(2) {
  background: #f5c04a;
}

.ventana-barra i:nth-child(3) {
  background: #5ad17a;
}

.ventana-barra span {
  margin-left: 8px;
}

.panel-cuerpo {
  position: relative;
  padding: 14px;
}

.panel-pestanas {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.panel-pestanas span {
  padding: 5px 12px;
  border-radius: 999px;
  background: #eef3f8;
  font-weight: 700;
  font-size: 11px;
}

.panel-pestanas .activa {
  background: #0b2742;
  color: #fff;
}

.panel-pestanas em {
  margin-left: 4px;
  padding: 0 6px;
  border-radius: 999px;
  background: #18d9e7;
  color: #071a2e;
  font-style: normal;
}

.resumen {
  margin: 0 0 10px;
  color: #4b6075;
}

.resumen b {
  color: #0b2742;
  font-size: 13px;
}

.tabla {
  border: 1px solid #e3ebf3;
  border-radius: 10px;
  overflow: hidden;
}

.fila {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.6fr;
  gap: 6px;
  padding: 8px 10px;
  border-top: 1px solid #eef3f8;
}

.fila.cabeza {
  border-top: 0;
  background: #f6f9fc;
  font-weight: 800;
  color: #4b6075;
  font-size: 10.5px;
}

.fila .si {
  color: #1a9a5a;
  font-weight: 700;
}

.fila .no {
  color: #c25151;
  font-weight: 700;
}

/* la fila nueva entra y se ilumina */
.fila.nueva {
  max-height: 0;
  padding-block: 0;
  overflow: hidden;
  border-top-width: 0;
  background: rgba(24, 217, 231, 0.18);
  transition: max-height 0.5s ease, padding 0.5s ease;
}

.fila.nueva.ver {
  max-height: 40px;
  padding-block: 8px;
  border-top-width: 1px;
  animation: destello 1.6s ease 0.5s both;
}

@keyframes destello {
  to {
    background: transparent;
  }
}

.actualizar {
  display: inline-block;
  margin-top: 10px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #eef3f8;
  font-weight: 700;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.actualizar.ver {
  opacity: 1;
  animation: pulsar 0.4s ease 1s 2;
}

/* moderación */
.moderacion {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.foto-mod {
  border: 1px solid #e3ebf3;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.4s ease;
}

.foto-mod .foto {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  font-size: 26px;
}

.acciones-mod {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  font-size: 10px;
}

.acciones-mod b {
  padding: 2px 6px;
  border-radius: 999px;
  background: #e6f7ee;
  color: #1a9a5a;
}

.acciones-mod i {
  font-style: normal;
  color: #c25151;
}

.foto-mod.aprobada {
  box-shadow: 0 0 0 3px #18d9e7;
}

.foto-mod.aprobada b {
  background: #1a9a5a;
  color: #fff;
  transition: background-color 0.3s ease 1.4s, color 0.3s ease 1.4s;
}

.d-aprobar {
  --x: 22%;
  --y: 86%;
}

/* pantalla gigante */
.pantalla-evento {
  position: absolute;
  inset: 0 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 10px;
  aspect-ratio: 16 / 10;
  padding: 12px;
  border-radius: 12px;
  border: 6px solid #10151c;
  background: radial-gradient(ellipse at 50% 40%, #12343a, #061317);
  box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.8);
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.pantalla-evento.ver {
  opacity: 1;
  transform: none;
}

.muro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  align-content: center;
}

.tesela {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 6px;
  font-size: 18px;
}

.destacada {
  position: relative;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 4px;
  color: #fff;
}

.foto-grande {
  display: grid;
  place-items: center;
  width: 82%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  font-size: 46px;
  box-shadow: 0 0 0 3px #fff;
}

.pantalla-evento.ver .foto-grande {
  animation: aparece 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
}

.insignia-nueva {
  position: absolute;
  top: 8%;
  right: 8%;
  padding: 3px 8px;
  border-radius: 999px;
  background: #ffd85c;
  color: #3a2a00;
  font-weight: 800;
  font-size: 10px;
}

.destacada small {
  font-size: 11px;
  color: #cfe3f1;
}

.qr-pie {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 34px;
  padding: 2px;
  border-radius: 4px;
  background: #fff;
}

/* PASOS */
.pasos ol {
  display: grid;
  gap: 8px;
  margin: 0 0 18px;
  padding: 0;
  list-style: none;
}

.pasos li {
  position: relative;
  border-radius: 16px;
  transition: background-color 0.3s ease;
}

.pasos li.actual {
  background: rgba(10, 150, 168, 0.08);
}

.pasos li button {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  padding: 12px 14px 14px;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.num {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--borde);
  font-family: var(--fuente-titulo);
  font-weight: 700;
  color: var(--texto-suave);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.actual .num,
.hecho .num {
  background: var(--cian);
  border-color: var(--cian);
  color: var(--tinta);
}

.textos {
  display: grid;
  gap: 2px;
}

.textos b {
  font-family: var(--fuente-titulo);
  font-size: 1.05rem;
  color: var(--blanco);
}

.textos small {
  font-size: 0.92rem;
  color: var(--texto-suave);
}

li:not(.actual) .textos small {
  display: none;
}

/* barra de progreso de cada paso */
.barra {
  position: absolute;
  left: 60px;
  right: 14px;
  bottom: 6px;
  height: 2px;
  border-radius: 2px;
  background: rgba(10, 150, 168, 0.12);
  overflow: hidden;
}

.barra span {
  display: block;
  height: 100%;
  background: var(--cian);
  transform: scaleX(0);
  transform-origin: left;
}

.barra .corre {
  animation: progreso linear forwards;
}

.barra .llena {
  transform: scaleX(1);
}

@keyframes progreso {
  to {
    transform: scaleX(1);
  }
}

.controles {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  flex: none;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: rgba(19, 40, 61, 0.05);
  color: var(--blanco);
  cursor: pointer;
}

.control svg {
  width: 20px;
  height: 20px;
}

.ver-real {
  flex: 1;
}

.nota {
  margin: 14px 0 0;
  font-size: 0.88rem;
  color: var(--texto-suave);
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .tutorial {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  /* un solo aparato por paso: celular (pasos 1-2) o panel/pantalla (pasos 3-4) */
  .escenario {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }
  .maqueta-celular,
  .maqueta-panel {
    grid-area: 1 / 1;
    align-self: center;
    transition: opacity 0.5s ease;
  }
  .maqueta-celular {
    max-width: 170px;
  }
  .maqueta-panel {
    width: 100%;
    min-height: 0;
  }
  .p0 .maqueta-panel,
  .p1 .maqueta-panel,
  .p2 .maqueta-celular,
  .p3 .maqueta-celular {
    opacity: 0;
    pointer-events: none;
  }
  .ventana {
    font-size: 11px;
  }
  .acciones-mod .palabra {
    display: none;
  }
  .acciones-mod b {
    padding: 2px 8px;
  }
  .opcion {
    padding: 5px 3px;
    font-size: 9.5px;
  }
  .qr-pie {
    width: 26px;
    right: 6px;
    bottom: 6px;
  }
  .pantalla-evento .destacada small {
    font-size: 9px;
  }
  .pasos li:not(.actual) button {
    padding-block: 8px 10px;
  }
}
</style>
