<template>
  <!--
    PORTADA: el mensaje y cuatro celulares en abanico con las tarjetas reales.
    La escena se queda fija mientras bajas: los celulares se separan y se
    enderezan (--pe va de 0 a 1 con progresoPista).
  -->
  <div ref="pistaRef" class="pista">
    <section id="inicio" class="escena">
      <div class="contenedor texto">
        <p class="etiqueta"><span class="punto" aria-hidden="true"></span> Invitaciones digitales</p>
        <h1 class="titulo">Invitaciones que se <span class="brillo">viven</span>, no solo se leen</h1>
        <p class="entrada">
          15 años, matrimonios, primeras comuniones y bautizos. Con música, mapa, confirmación de
          invitados y las fotos de tus invitados en vivo en una pantalla gigante.
        </p>
        <div class="acciones">
          <a :href="enlaceWhatsApp()" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
            <IconoWhatsApp /> Cotiza por WhatsApp
          </a>
          <a href="#tarjetas" class="boton boton-secundario">Ver las tarjetas</a>
        </div>
      </div>

      <div class="abanico" aria-label="Algunas de nuestras invitaciones">
        <a
          v-for="(t, i) in TARJETAS"
          :key="t.id"
          :href="`#tarjeta-${t.id}`"
          class="abanico-celular"
          :style="{ '--d': i - 1.5, '--da': Math.abs(i - 1.5), zIndex: 10 - Math.round(Math.abs(i - 1.5) * 2) }"
          :aria-label="`Ver la invitación de ${t.tipo}`"
        >
          <div class="mece" :style="{ animationDelay: `${-i * 1.3}s` }">
            <Celular :brillo="t.color">
              <img :src="t.imagen" :alt="`Portada de la invitación de ${t.tipo}`" :loading="i < 2 ? 'eager' : 'lazy'" />
            </Celular>
            <span class="nombre-tipo">{{ t.tipo }}</span>
          </div>
        </a>

        <!-- Gerónimo, la mascota de Innube, anuncia las invitaciones -->
        <div class="geronimo" aria-hidden="true">
          <span class="globo">¡Estás invitado!</span>
          <img :src="geronimo" alt="" width="517" height="740" />
        </div>
      </div>

      <a href="#tarjetas" class="desliza" aria-label="Bajar a las tarjetas">
        <span></span>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TARJETAS, enlaceWhatsApp } from "@/config";
import { usarProgresoPista } from "@/progresoPista";
import Celular from "@/components/Celular.vue";
import geronimo from "@/assets/img/geronimo.svg";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const pistaRef = ref<HTMLElement | null>(null);
usarProgresoPista(pistaRef);
</script>

<style scoped>
/* PISTA: 100svh de escena + 90svh de recorrido */
.pista {
  --p: 0;
  --pe: 0;
  position: relative;
  height: 190vh;
  height: 190svh;
}

.escena {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  padding-top: clamp(84px, 13vh, 140px);
}

.texto {
  position: relative;
  z-index: 20;
  text-align: center;
  transform: translateY(calc(var(--p) * -6vh));
  opacity: calc(1 - clamp(0, (var(--p) - 0.55) / 0.4, 1) * 0.35);
}

.texto .titulo {
  max-width: 900px;
  margin-inline: auto;
  /* también según el alto, para que quede espacio a los celulares */
  font-size: clamp(2rem, min(6.4vw, 7.6vh), 4.6rem);
}

.texto .entrada {
  margin: 0 auto;
}

.punto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cian);
  box-shadow: 0 0 10px var(--cian);
  animation: latir 2s ease-in-out infinite;
}

@keyframes latir {
  50% {
    opacity: 0.35;
  }
}

.acciones {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 26px;
}

/* ABANICO */
.abanico {
  position: relative;
  flex: 1;
  min-height: 0;
  margin-top: clamp(18px, 4vh, 40px);
  /* la altura que queda bajo el texto decide el tamaño de los celulares */
  container-type: size;
}

/* ancho de cada celular: según el ancho de la pantalla, pero sin pasar
   de lo que cabe a lo alto (celular 2.16 veces más alto + nombre y vaivén) */
.abanico-celular,
.geronimo {
  --w: max(96px, min(clamp(118px, 17vw, 210px), (100cqh - 48px) / 2.45));
}

.abanico-celular {
  position: absolute;
  left: 50%;
  top: 0;
  width: var(--w);
  text-decoration: none;
  /* de abanico (girados y juntos) a fila (rectos y separados) */
  transform:
    translateX(calc(-50% + var(--d) * (34% + var(--pe) * 82%)))
    translateY(calc(var(--da) * (1 - var(--pe)) * 9%))
    rotate(calc(var(--d) * (1 - var(--pe)) * 11deg));
  transform-origin: 50% 110%;
  transition: filter 0.3s ease;
}

.abanico-celular:hover {
  filter: brightness(1.08);
}

.mece {
  animation: flotar 5s ease-in-out infinite alternate;
}

@keyframes flotar {
  to {
    transform: translateY(-12px);
  }
}

.nombre-tipo {
  display: block;
  margin-top: 12px;
  font-family: var(--fuente-titulo);
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--blanco);
  text-align: center;
  opacity: calc(clamp(0, (var(--pe) - 0.55) / 0.35, 1));
}

/* GERÓNIMO: a la derecha del abanico, solo en pantallas anchas */
.geronimo {
  position: absolute;
  z-index: 25;
  bottom: 14px;
  /* justo después del último celular de la fila (≈2.25 anchos desde el centro) */
  left: min(calc(50% + var(--w) * 2.3 + 18px), calc(100% - 180px));
  /* cabe completo con su globo dentro del alto disponible */
  width: min(clamp(120px, 11vw, 170px), (100cqh - 70px) / 1.43);
  animation: entra-geronimo 0.9s cubic-bezier(0.34, 1.4, 0.64, 1) 0.6s both;
}

.geronimo img {
  display: block;
  width: 100%;
  height: auto;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
}

@keyframes entra-geronimo {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
}

/* globo de diálogo frente al megáfono */
.globo {
  position: absolute;
  bottom: 97%;
  right: 12%;
  padding: 8px 14px;
  border-radius: 16px 16px 4px 16px;
  background: #fff;
  color: var(--azul);
  font-family: var(--fuente-titulo);
  font-weight: 700;
  font-size: 0.95rem;
  white-space: nowrap;
  box-shadow: 0 12px 30px -10px rgba(24, 217, 231, 0.6);
  animation: globo 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s both;
  transform-origin: 100% 100%;
}

@keyframes globo {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
}

@media (max-width: 1180px) {
  .geronimo {
    display: none;
  }
}

/* indicador para bajar */
.desliza {
  position: absolute;
  left: 50%;
  bottom: 22px;
  z-index: 30;
  width: 26px;
  height: 42px;
  margin-left: -13px;
  border: 2px solid rgba(10, 150, 168, 0.5);
  border-radius: 999px;
  opacity: calc(1 - clamp(0, var(--p) / 0.15, 1));
}

.desliza span {
  position: absolute;
  left: 50%;
  top: 8px;
  width: 4px;
  height: 8px;
  margin-left: -2px;
  border-radius: 4px;
  background: var(--cian);
  animation: rueda 1.6s ease-in-out infinite;
}

@keyframes rueda {
  70% {
    opacity: 0;
    transform: translateY(12px);
  }
}

/* pantallas bajas (portátiles): menos texto para que los celulares se vean completos */
@media (max-height: 820px) and (min-width: 561px) {
  .texto .entrada {
    display: none;
  }
  .acciones {
    margin-top: 18px;
  }
}

@media (max-height: 640px) and (min-width: 561px) {
  .texto .etiqueta {
    display: none;
  }
}

@media (max-width: 560px) and (max-height: 760px) {
  .texto .entrada {
    display: none;
  }
}

/* celulares pequeños: el abanico va un poco más abajo y la fila se aprieta */
@media (max-width: 560px) {
  .escena {
    padding-top: 104px;
  }
  .texto .entrada {
    font-size: 0.98rem;
  }
  .acciones {
    flex-wrap: nowrap;
    gap: 8px;
    margin-top: 20px;
  }
  .acciones .boton {
    min-height: 46px;
    padding: 11px 15px;
    font-size: 0.86rem;
    white-space: nowrap;
  }
  .abanico-celular {
    --w: max(80px, min(clamp(84px, 27vw, 140px), (100cqh - 40px) / 2.45));
    transform:
      translateX(calc(-50% + var(--d) * (30% + var(--pe) * 40%)))
      translateY(calc(var(--da) * (1 - var(--pe)) * 9%))
      rotate(calc(var(--d) * (1 - var(--pe)) * 11deg));
  }
  /* en celular los celulares quedan montados: los nombres se cruzarían */
  .nombre-tipo {
    display: none;
  }
}

@media (max-width: 370px) {
  .acciones .boton-secundario {
    display: none;
  }
}

@media (max-width: 400px) {
  .acciones {
    gap: 6px;
  }
  .acciones .boton {
    padding: 10px 11px;
    font-size: 0.78rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pista {
    height: auto;
  }
  .escena {
    position: relative;
    min-height: 100svh;
    height: auto;
  }
  .abanico {
    min-height: 60vh;
  }
}
</style>
