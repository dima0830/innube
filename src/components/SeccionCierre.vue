<template>
  <!-- CIERRE: llamada grande a WhatsApp sobre la nube del logo, y el pie -->
  <section class="seccion cierre">
    <div class="contenedor">
      <div v-aparecer class="caja">
        <img :src="nube" alt="" class="nube-fondo" aria-hidden="true" />
        <img :src="geronimo" alt="" class="geronimo" aria-hidden="true" width="517" height="740" loading="lazy" />
        <p class="etiqueta">¿Listos para celebrar?</p>
        <h2 class="titulo">Tu invitación, <span class="brillo">en la nube</span></h2>
        <p class="entrada">Escríbenos y empecemos a diseñar la invitación de tu celebración.</p>
        <a :href="enlaceWhatsApp()" target="_blank" rel="noopener noreferrer" class="boton boton-principal grande">
          <IconoWhatsApp /> Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  </section>

  <footer class="pie">
    <div class="contenedor fila">
      <img :src="logo" alt="Innube. Crea, siente, conecta." class="logo-pie" width="130" height="110" />
      <p class="contacto">
        <a :href="enlaceWhatsApp()" target="_blank" rel="noopener noreferrer">WhatsApp {{ telefonoVisible }}</a>
        <span aria-hidden="true">·</span>
        <a :href="`mailto:${CORREO}`">{{ CORREO }}</a>
      </p>
      <p class="derechos">© {{ anio }} Innube · Invitaciones digitales</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import nube from "@/assets/img/innube-nube.svg";
import logo from "@/assets/img/innube-logo-lema.svg";
import geronimo from "@/assets/img/geronimo.svg";
import { CORREO, WHATSAPP, enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const anio = new Date().getFullYear();
/* 573182955152 → 318 295 5152 */
const telefonoVisible = WHATSAPP.slice(2).replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
</script>

<style scoped>
.caja {
  position: relative;
  overflow: hidden;
  padding: clamp(48px, 8vw, 96px) clamp(22px, 5vw, 64px);
  border: 1px solid rgba(127, 241, 250, 0.3);
  border-radius: 40px;
  background:
    radial-gradient(ellipse 80% 70% at 50% 120%, rgba(24, 217, 231, 0.35), transparent 70%),
    linear-gradient(160deg, #0f3558, #0b2742 60%);
  text-align: center;
  box-shadow: 0 50px 100px -50px rgba(24, 217, 231, 0.6);
}

.caja > .nube-fondo.nube-fondo {
  position: absolute;
  left: 50%;
  bottom: -18%;
  width: min(720px, 120%);
  margin-left: max(-360px, -60%);
  opacity: 0.1;
  pointer-events: none;
}

.caja > *:not(.nube-fondo, .geronimo) {
  position: relative;
}

/* Gerónimo anuncia con su megáfono hacia el texto */
.caja > .geronimo.geronimo {
  position: absolute;
  right: clamp(12px, 5vw, 70px);
  bottom: 0;
  width: auto;
  height: 82%;
  max-height: 340px;
  pointer-events: none;
}

/* en pantallas anchas el texto va a la izquierda y Gerónimo le grita desde la derecha */
@media (min-width: 901px) {
  .caja {
    padding-right: clamp(300px, 30vw, 380px);
    text-align: left;
  }
  .caja .entrada {
    margin: 0 0 30px;
    text-align: left;
  }
  .caja > .nube-fondo.nube-fondo {
    left: 35%;
  }
}

@media (max-width: 900px) {
  .caja > .geronimo.geronimo {
    position: relative;
    right: auto;
    display: block;
    height: 170px;
    margin: -10px auto 10px;
  }
}

.caja .entrada {
  margin: 0 auto 30px;
}

.grande {
  min-height: 60px;
  padding: 16px 32px;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .grande {
    padding: 14px 20px;
    font-size: 1rem;
    white-space: nowrap;
  }
}

.pie {
  padding: 40px 0 110px;
  border-top: 1px solid var(--borde);
}

.fila {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 28px;
}

.logo-pie {
  width: 130px;
  height: auto;
}

.contacto {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  color: var(--texto-suave);
}

.contacto a {
  color: var(--texto);
  text-decoration: none;
}

.contacto a:hover {
  color: var(--cian-claro);
}

.derechos {
  margin: 0;
  font-size: 0.88rem;
  color: var(--texto-suave);
}
</style>
