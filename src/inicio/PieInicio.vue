<template>
  <footer id="contacto" class="pie">
    <div class="contenedor">
      <div v-aparecer class="cierre">
        <img class="geronimo" :src="geronimo" alt="Gerónimo, la mascota de Innube" width="120" height="172" loading="lazy" />
        <div>
          <h2 class="titulo">¿Tienes una idea?<br />Gerónimo ya está listo.</h2>
          <a :href="enlaceWhatsApp(MENSAJES.general)" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
            <IconoWhatsApp />
            <span>302 379 8490</span>
          </a>
        </div>
      </div>

      <div class="datos">
        <img :src="logo" alt="Innube" width="90" height="72" />
        <p>Crea, siente, conecta.</p>
        <ul>
          <li><a href="https://www.instagram.com/innube_digital/" target="_blank" rel="noopener noreferrer">@innube_digital</a></li>
          <li><a :href="`mailto:${CORREO}`">{{ CORREO }}</a></li>
          <li>Cra. 16 #3B-58, Hacaritama · Villavicencio</li>
          <li><a :href="invitaciones">Invitaciones digitales</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from "@/assets/img/innube-logo-lema-oscuro.svg";
import geronimo from "@/assets/img/geronimo.svg";
import { CORREO, enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import { MENSAJES } from "./datos";

const invitaciones = `${import.meta.env.BASE_URL}invitaciones/`;
</script>

<style scoped>
.pie {
  padding: var(--espacio-seccion) 0 110px;
  border-top: 1px solid var(--borde);
}

.cierre {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 56px;
}

.geronimo {
  width: 96px;
  height: auto;
  flex: none;
}

.datos {
  display: grid;
  gap: 8px;
  color: var(--texto-suave);
}

.datos img {
  width: 90px;
  height: auto;
}

.datos p {
  margin: 4px 0 8px;
  color: var(--texto);
}

.datos ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.datos a {
  color: var(--texto);
}

@media (min-width: 760px) {
  .geronimo {
    width: 140px;
  }
}
</style>
