<template>
  <!-- Palabra resaltada con un trazo azul "a mano" que se dibuja al aparecer en pantalla.
       tipo="subrayado" (línea ondulada debajo) o tipo="circulo" (óvalo alrededor). -->
  <span ref="el" class="resaltado" :class="[tipo, { dibujado }]">
    <slot />
    <svg class="trazo-mano" :viewBox="tipo === 'circulo' ? '0 0 200 80' : '0 0 200 24'" preserveAspectRatio="none" aria-hidden="true">
      <path
        v-if="tipo === 'circulo'"
        pathLength="1"
        d="M110 6 C 60 2, 12 12, 8 38 C 4 64, 70 76, 120 72 C 170 68, 196 52, 192 32 C 188 12, 140 4, 92 10"
      />
      <path v-else pathLength="1" d="M4 15 C 40 6, 70 20, 104 12 S 168 6, 196 13 M 26 20 C 70 15, 130 21, 182 17" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(defineProps<{ tipo?: "subrayado" | "circulo"; retraso?: number }>(), {
  tipo: "subrayado",
  retraso: 400,
});

const el = ref<HTMLElement>();
const dibujado = ref(false);
let observador: IntersectionObserver | undefined;
let reloj = 0;

onMounted(() => {
  observador = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    reloj = window.setTimeout(() => (dibujado.value = true), props.retraso);
    observador?.disconnect();
  });
  observador.observe(el.value!);
});
onBeforeUnmount(() => {
  observador?.disconnect();
  clearTimeout(reloj);
});
</script>

<style scoped>
.resaltado {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  z-index: 0;
}

.trazo-mano {
  position: absolute;
  z-index: -1;
  overflow: visible;
  pointer-events: none;
}

.subrayado .trazo-mano {
  left: -4%;
  width: 108%;
  bottom: -0.12em;
  height: 0.34em;
}

.circulo .trazo-mano {
  left: -12%;
  width: 124%;
  top: -18%;
  height: 136%;
}

.trazo-mano path {
  fill: none;
  stroke: var(--resaltado);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 1.1s cubic-bezier(0.65, 0, 0.35, 1);
}

.subrayado .trazo-mano path {
  stroke-width: 6;
}

.dibujado .trazo-mano path {
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .trazo-mano path {
    transition: none;
  }
}
</style>
