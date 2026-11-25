<template>
  <header class="encabezado" :class="{ solido: abajo }">
    <div class="contenedor fila">
      <a href="#viaje" class="logo" aria-label="Innube, ir al inicio">
        <img :src="logo" alt="Innube" class="logo-claro" width="62" height="50" />
        <img :src="logoBlanco" alt="Innube" class="logo-oscuro" width="62" height="50" />
      </a>
      <nav class="enlaces" aria-label="Secciones">
        <a href="#portafolio">Portafolio</a>
        <a href="#navidad">Navidad</a>
        <a :href="invitaciones">Invitaciones</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <div class="derecha">
        <BotonTema />
        <a :href="enlaceWhatsApp(MENSAJES.general)" target="_blank" rel="noopener noreferrer" v-magnetico class="boton boton-principal cotizar">
        <IconoWhatsApp />
        <span>Escríbenos</span>
      </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import logo from "@/assets/img/innube-logo-color.svg";
import logoBlanco from "@/assets/img/innube-logo-blanco.svg";
import BotonTema from "@/components/BotonTema.vue";
import { enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import { MENSAJES } from "./datos";

const invitaciones = `${import.meta.env.BASE_URL}invitaciones/`;
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
  padding: 10px 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.encabezado.solido {
  background: var(--encabezado);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 var(--borde);
}

.fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.logo img {
  height: 44px;
  width: auto;
}

.enlaces {
  display: none;
  gap: 26px;
  font-size: 0.98rem;
}

.enlaces a {
  text-decoration: none;
  color: var(--texto);
}

.enlaces a:hover {
  color: var(--cian-claro);
}

.cotizar {
  min-height: 44px;
  padding: 10px 18px;
  font-size: 0.95rem;
}

@media (min-width: 900px) {
  .enlaces {
    display: flex;
  }
}
.derecha {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
