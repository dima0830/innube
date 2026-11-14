<template>
  <!-- Barra superior: se vuelve de vidrio al bajar -->
  <header class="encabezado" :class="{ solido: abajo }">
    <div class="contenedor fila">
      <a href="#inicio" class="logo" aria-label="Innube, ir al inicio">
        <img :src="logo" alt="Innube" width="70" height="56" />
      </a>
      <nav class="enlaces" aria-label="Secciones">
        <a href="#tarjetas">Tarjetas</a>
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#proceso">Proceso</a>
        <a href="#preguntas">Preguntas</a>
      </nav>
      <a :href="enlaceWhatsApp()" target="_blank" rel="noopener noreferrer" class="boton boton-principal cotizar">
        <IconoWhatsApp />
        <span>Cotizar</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import logo from "@/assets/img/innube-logo-blanco.svg";
import { enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const abajo = ref(false);
const alBajar = () => (abajo.value = window.scrollY > 40);
onMounted(() => {
  alBajar();
  window.addEventListener("scroll", alBajar, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", alBajar));
</script>

<style scoped>
.encabezado {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 14px 0;
  transition: background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
}

.encabezado.solido {
  padding: 8px 0;
  background: rgba(7, 26, 46, 0.72);
  backdrop-filter: blur(14px) saturate(1.3);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  box-shadow: 0 1px 0 var(--borde);
}

.fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo img {
  display: block;
  width: auto;
  height: 64px;
  transition: height 0.3s ease;
}

.solido .logo img {
  height: 52px;
}

.enlaces {
  display: flex;
  gap: 28px;
}

.enlaces a {
  position: relative;
  font-weight: 500;
  font-size: 0.96rem;
  color: var(--texto);
  text-decoration: none;
  transition: color 0.2s ease;
}

.enlaces a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 2px;
  background: var(--cian);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}

.enlaces a:hover {
  color: var(--blanco);
}

.enlaces a:hover::after {
  transform: scaleX(1);
}

.cotizar {
  min-height: 44px;
  padding: 10px 20px;
  font-size: 0.95rem;
}

@media (max-width: 820px) {
  .enlaces {
    display: none;
  }
  .logo img {
    height: 46px;
  }
}
</style>
