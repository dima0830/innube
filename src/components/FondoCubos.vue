<template>
  <!-- Fondo de cubos isométricos: el puntero levanta ondas que recorren la rejilla y, en reposo,
       aparecen ondas solas. Liviano: canvas 2D, se pausa fuera de pantalla y respeta "reducir movimiento". -->
  <canvas ref="lienzo" class="fondo-cubos" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const lienzo = ref<HTMLCanvasElement>();

type Onda = { x: number; y: number; t0: number; fuerza: number };

let c: CanvasRenderingContext2D;
let W = 0;
let H = 0;
let dpr = 1;
let lado = 64; // ancho del rombo superior de cada cubo
let cols = 0;
let filas = 0;
let ondas: Onda[] = [];
let ultimoMovimiento = 0;
let ultimaOndaSola = 0;
let anim = 0;
let visible = true;
let colores = { arriba: "#fff", izq: "#eee", der: "#ddd", brillo: "24, 217, 231" };

const VELOCIDAD = 7; // casillas por segundo
const ANCHO_ONDA = 1.6; // casillas
const APAGADO = 0.9; // cuánto se apaga por segundo
const ALTURA = 0.7; // cuánto sube un cubo en la cresta (en alturas de cubo)

function leerColores() {
  const css = getComputedStyle(document.documentElement);
  const v = (n: string) => css.getPropertyValue(n).trim();
  colores = { arriba: v("--cubo-arriba"), izq: v("--cubo-izq"), der: v("--cubo-der"), brillo: v("--cubo-brillo") };
}

function medir() {
  const el = lienzo.value!;
  const r = el.getBoundingClientRect();
  W = r.width;
  H = r.height;
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  el.width = Math.round(W * dpr);
  el.height = Math.round(H * dpr);
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  lado = W < 700 ? 52 : 64;
  // rejilla isométrica que cubre todo (con margen)
  cols = Math.ceil(W / lado) + 3;
  filas = Math.ceil(H / (lado / 4)) + 8; // cada fila baja medio rombo (lado/4)
}

function altura(px: number, py: number, ahora: number) {
  let h = 0;
  for (const o of ondas) {
    const edad = (ahora - o.t0) / 1000;
    const d = Math.hypot(px - o.x, (py - o.y) * 2) / lado; // distancia en casillas (eje vertical isométrico)
    const frente = edad * VELOCIDAD;
    const x = (d - frente) / ANCHO_ONDA;
    h += o.fuerza * Math.exp(-x * x) * Math.exp(-APAGADO * edad);
  }
  return Math.min(h, 1.4);
}

function dibujar(ahora: number) {
  c.clearRect(0, 0, W, H);
  const a = lado / 2; // medio ancho del rombo
  const b = lado / 4; // medio alto del rombo
  const alto = lado * 0.42; // alto de las caras laterales
  ondas = ondas.filter((o) => (ahora - o.t0) / 1000 < 5);
  for (let f = 0; f < filas; f++) {
    for (let k = 0; k < cols; k++) {
      const x = k * lado + (f % 2 ? a : 0) - a;
      const y0 = f * b - lado;
      const h = altura(x, y0, ahora);
      const y = y0 - h * alto * ALTURA;
      // cara izquierda
      c.fillStyle = colores.izq;
      c.beginPath();
      c.moveTo(x - a, y);
      c.lineTo(x, y + b);
      c.lineTo(x, y + b + alto);
      c.lineTo(x - a, y + alto);
      c.closePath();
      c.fill();
      // cara derecha
      c.fillStyle = colores.der;
      c.beginPath();
      c.moveTo(x + a, y);
      c.lineTo(x, y + b);
      c.lineTo(x, y + b + alto);
      c.lineTo(x + a, y + alto);
      c.closePath();
      c.fill();
      // cara de arriba (con el brillo cian de la cresta)
      c.fillStyle = colores.arriba;
      c.beginPath();
      c.moveTo(x, y - b);
      c.lineTo(x + a, y);
      c.lineTo(x, y + b);
      c.lineTo(x - a, y);
      c.closePath();
      c.fill();
      if (h > 0.05) {
        c.fillStyle = `rgba(${colores.brillo}, ${Math.min(0.55, h * 0.5)})`;
        c.fill();
      }
    }
  }
}

function bucle(ahora: number) {
  anim = 0;
  if (!visible) return;
  // en reposo (1,5 s sin mover el puntero), una onda sola cada ~1,6 s
  if (ahora - ultimoMovimiento > 1500 && ahora - ultimaOndaSola > 1600) {
    ultimaOndaSola = ahora;
    ondas.push({ x: Math.random() * W, y: Math.random() * H, t0: ahora, fuerza: 0.7 });
  }
  dibujar(ahora);
  anim = requestAnimationFrame(bucle);
}

let ultimaOndaPuntero = 0;
function alMover(e: PointerEvent) {
  const r = lienzo.value!.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  if (y < 0 || y > r.height) return;
  const ahora = performance.now();
  ultimoMovimiento = ahora;
  if (ahora - ultimaOndaPuntero < 140) return; // no más de ~7 ondas por segundo
  ultimaOndaPuntero = ahora;
  ondas.push({ x, y, t0: ahora, fuerza: e.type === "pointerdown" ? 1 : 0.55 });
  if (ondas.length > 14) ondas.shift();
}

let observador: IntersectionObserver | undefined;
let alCambiarTamano: () => void;
let alCambiarTema: () => void;

onMounted(() => {
  c = lienzo.value!.getContext("2d")!;
  leerColores();
  medir();
  const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (quieto) {
    dibujar(performance.now());
    alCambiarTema = () => requestAnimationFrame(() => (leerColores(), dibujar(performance.now())));
    window.addEventListener("tema", alCambiarTema);
    return;
  }
  alCambiarTamano = () => medir();
  alCambiarTema = () => leerColores();
  window.addEventListener("resize", alCambiarTamano);
  window.addEventListener("tema", alCambiarTema);
  window.addEventListener("pointermove", alMover, { passive: true });
  window.addEventListener("pointerdown", alMover, { passive: true });
  observador = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !anim) anim = requestAnimationFrame(bucle);
  });
  observador.observe(lienzo.value!);
  ondas.push({ x: W * 0.7, y: H * 0.4, t0: performance.now(), fuerza: 1 });
  anim = requestAnimationFrame(bucle);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(anim);
  observador?.disconnect();
  window.removeEventListener("resize", alCambiarTamano);
  window.removeEventListener("tema", alCambiarTema);
  window.removeEventListener("pointermove", alMover);
  window.removeEventListener("pointerdown", alMover);
});

</script>

<style scoped>
.fondo-cubos {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* se desvanece hacia los bordes para no competir con el texto */
  -webkit-mask-image: radial-gradient(ellipse 85% 75% at 60% 40%, #000 35%, transparent 85%);
  mask-image: radial-gradient(ellipse 85% 75% at 60% 40%, #000 35%, transparent 85%);
}
</style>
