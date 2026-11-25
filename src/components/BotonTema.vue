<template>
  <!-- Botón de modo claro / oscuro (el cambio lo anima src/tema.ts con la ola de cuadritos) -->
  <button
    type="button"
    class="boton-tema"
    :aria-label="oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    :title="oscuro ? 'Modo claro' : 'Modo oscuro'"
    @click="alternarTema"
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" class="icono" :class="{ oscuro }">
      <!-- sol: círculo + rayos; en modo oscuro el círculo se vuelve luna y los rayos se esconden -->
      <mask id="luna-mascara">
        <rect width="24" height="24" fill="#fff" />
        <circle class="mordisco" cx="24" cy="4" r="7" fill="#000" />
      </mask>
      <circle class="astro" cx="12" cy="12" r="5" mask="url(#luna-mascara)" />
      <g class="rayos">
        <path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { alternarTema, temaActual } from "@/tema";

const oscuro = ref(false);
const actualizar = () => (oscuro.value = temaActual() === "oscuro");
onMounted(() => {
  actualizar();
  window.addEventListener("tema", actualizar);
});
onBeforeUnmount(() => window.removeEventListener("tema", actualizar));
</script>

<style scoped>
.boton-tema {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: none;
  padding: 0;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: var(--tarjeta);
  color: var(--blanco);
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.boton-tema:hover {
  border-color: var(--cian);
  box-shadow: 0 0 0 4px var(--cian-suave);
}

.boton-tema:focus-visible {
  outline: 2px solid var(--cian);
  outline-offset: 2px;
}

.icono {
  width: 22px;
  height: 22px;
  overflow: visible;
}

.astro {
  fill: currentColor;
  transform-origin: 12px 12px;
  transition: r 0.4s ease;
}

.mordisco {
  transition: cx 0.4s ease, cy 0.4s ease;
}

.rayos {
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  transform-origin: 12px 12px;
  transition: opacity 0.3s ease, transform 0.4s ease;
}

/* modo oscuro: luna */
.oscuro .astro {
  r: 8;
}
.oscuro .mordisco {
  cx: 17;
  cy: 7;
}
.oscuro .rayos {
  opacity: 0;
  transform: rotate(-45deg) scale(0.5);
}
</style>
