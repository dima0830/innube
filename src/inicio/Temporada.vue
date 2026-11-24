<template>
  <!-- Sección de temporada: se cambia cada temporada (Navidad, madres, grados…) -->
  <section id="navidad" class="seccion temporada">
    <div class="contenedor rejilla">
      <div v-aparecer class="texto">
        <p class="fecha">Navidad 2026 · pedidos hasta el 12 de diciembre</p>
        <h2 class="titulo">Este diciembre, regala su cara favorita.</h2>
        <p class="entrada">
          Mándanos una foto normal y la convertimos en una escena navideña. Después la ponemos en un cojín, o te la
          enviamos lista para compartir.
        </p>
        <ul class="precios">
          <li><span>Tu foto navideña (digital)</span><strong>$20.000</strong></li>
          <li><span>Cojín con tu foto navideña</span><strong>$55.000</strong></li>
          <li><span>Posavelas de madera a color</span><strong>desde $25.000</strong></li>
          <li><span>Ancheta Pino para empresas</span><strong>desde $150.000</strong></li>
        </ul>
        <a :href="enlaceWhatsApp(MENSAJES.navidad)" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
          <IconoWhatsApp />
          <span>Pedir mi regalo</span>
        </a>
      </div>

      <div class="fotos" aria-hidden="true">
        <img v-paralaje class="f1" :src="cojinJ" alt="" loading="lazy" />
        <img v-paralaje class="f2" :src="fotoEscena" alt="" loading="lazy" />
        <img v-paralaje class="f3" :src="cojinA" alt="" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import { paralaje as vParalaje } from "@/paralaje";
import cojinJ from "@/assets/img/portafolio/cojin-j.webp";
import cojinA from "@/assets/img/portafolio/cojin-a.webp";
import fotoEscena from "@/assets/img/portafolio/foto-escena.webp";
import { MENSAJES } from "./datos";
</script>

<style scoped>
.temporada {
  overflow: hidden;
  background: radial-gradient(ellipse 90% 60% at 80% 40%, rgba(229, 72, 77, 0.18), transparent 70%);
}

.rejilla {
  display: grid;
  gap: 40px;
}

.fecha {
  margin: 0 0 12px;
  color: #c0392b;
  font-weight: 500;
}

.precios {
  margin: 24px 0 28px;
  padding: 0;
  list-style: none;
  max-width: 460px;
}

.precios li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--borde);
  color: var(--texto);
}

.precios strong {
  flex: none;
  font-family: var(--fuente-titulo);
  color: var(--blanco);
}

.fotos {
  position: relative;
  height: 420px;
}

.fotos img {
  position: absolute;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 24px 50px -16px rgba(0, 0, 0, 0.7);
}

.f1 {
  left: 0;
  top: 30px;
  width: 52%;
  height: 300px;
  rotate: -5deg;
  translate: 0 calc(var(--c) * -40px);
}

.f2 {
  left: 30%;
  top: 0;
  width: 42%;
  aspect-ratio: 1;
  z-index: 2;
  rotate: 3deg;
  translate: 0 calc(var(--c) * 30px);
}

.f3 {
  right: 0;
  top: 110px;
  width: 46%;
  height: 290px;
  rotate: 6deg;
  translate: 0 calc(var(--c) * -20px);
}

@media (min-width: 900px) {
  .rejilla {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .fotos {
    height: 560px;
  }

  .f1 {
    height: 400px;
  }

  .f3 {
    height: 380px;
  }
}
</style>
