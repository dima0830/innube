<template>
  <section id="portafolio" class="seccion portafolio">
    <div class="contenedor">
      <div v-aparecer class="cabeza">
        <h2 class="titulo">Ideas que ya hicieron el viaje</h2>
        <p class="entrada">Algunos trabajos de Innube, ordenados por línea. Cada mes llegan más.</p>
      </div>

      <div class="pestanas" role="tablist" aria-label="Líneas de Innube">
        <button
          v-for="l in PORTAFOLIO"
          :key="l.id"
          role="tab"
          :aria-selected="l.id === activa"
          :class="{ activa: l.id === activa }"
          @click="activa = l.id"
        >
          {{ l.nombre }}
        </button>
      </div>

      <Transition name="cambio" mode="out-in">
        <ul :key="activa" class="rejilla">
          <li v-for="(t, i) in linea.trabajos.slice(0, 6)" :key="i" class="trabajo" :class="{ alto: t.alto, pendiente: !t.foto }">
            <img v-if="t.foto" :src="t.foto" :alt="t.titulo" loading="lazy" decoding="async" />
            <div v-else class="espera" aria-hidden="true">
              <img :src="nube" alt="" />
              <span>Foto en camino</span>
            </div>
            <div class="pie">
              <strong>{{ t.titulo }}</strong>
              <span>{{ t.detalle }}</span>
            </div>
          </li>
        </ul>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import nube from "@/assets/img/innube-nube.svg";
import { PORTAFOLIO } from "./datos";

const activa = ref(PORTAFOLIO[0].id);
const linea = computed(() => PORTAFOLIO.find((l) => l.id === activa.value)!);
</script>

<style scoped>
.cabeza {
  max-width: 640px;
  margin-bottom: 28px;
}

.pestanas {
  display: flex;
  gap: 8px;
  margin: 0 -20px 24px;
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
  color: #fff;
  border-color: var(--blanco);
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  grid-auto-flow: dense;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.trabajo {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: var(--tarjeta);
  border: 1px solid var(--borde);
}

.trabajo.alto {
  grid-row: span 2;
}

.trabajo > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pie {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 26px 12px 10px;
  background: linear-gradient(transparent, rgba(10, 14, 20, 0.78));
  line-height: 1.25;
}

.pie strong {
  font: 600 0.92rem var(--fuente-titulo);
  color: #fff;
}

.pie span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.78);
}

.espera {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  padding-bottom: 36px;
  border: 1.5px dashed rgba(10, 150, 168, 0.25);
  border-radius: inherit;
  color: var(--texto-suave);
  font-size: 0.82rem;
}

.espera img {
  width: 54px;
  opacity: 0.35;
}

.cambio-enter-active,
.cambio-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.cambio-enter-from,
.cambio-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (min-width: 760px) {
  .rejilla {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 210px;
    gap: 14px;
  }
}
</style>
