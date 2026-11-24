<template>
  <!--
    ELIGE TU CELEBRACIÓN: un bloque por tarjeta, alternando lados. El celular
    se inclina un poco con el paralaje y cada bloque tiene "Probar aquí"
    (la tarjeta funcionando dentro de un celular) y "Ver invitación".
  -->
  <section id="tarjetas" class="seccion">
    <div class="contenedor">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Nuestras tarjetas</p>
        <h2 class="titulo">Una invitación para <span class="brillo">cada celebración</span></h2>
        <p class="entrada">
          Cada tarjeta se diseña a la medida: fotos, colores, música y textos de tu evento. Tócalas y
          pruébalas como las verán tus invitados.
        </p>
      </div>

      <article
        v-for="(t, i) in TARJETAS"
        :id="`tarjeta-${t.id}`"
        :key="t.id"
        class="bloque"
        :class="{ invertido: i % 2 === 1 }"
      >
        <div v-paralaje class="lado-celular">
          <button type="button" class="abrir-celular" :aria-label="`Probar la invitación de ${t.tipo}`" @click="emit('probar', t)">
            <Celular :brillo="t.color">
              <img :src="t.imagen" :alt="`Portada de la invitación de ${t.tipo}`" loading="lazy" />
            </Celular>
            <span class="toca"><span class="anillo"></span> Tócala</span>
          </button>
        </div>

        <div v-aparecer class="lado-texto">
          <p class="tipo" :style="{ '--acento': t.color }">
            <span class="numero">0{{ i + 1 }}</span> {{ t.tipo }}
            <span v-if="t.funcional" class="sello-funcional">Con panel y fotos en vivo</span>
          </p>
          <h3 class="nombre">{{ t.titulo }}</h3>
          <p class="frase">{{ t.frase }}</p>
          <ul class="destacados">
            <li v-for="d in t.destacados" :key="d">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              {{ d }}
            </li>
          </ul>
          <div class="botones">
            <button type="button" class="boton boton-principal" @click="emit('probar', t)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></svg>
              Probar aquí
            </button>
            <a :href="t.url" target="_blank" rel="noopener noreferrer" class="boton boton-secundario">
              Ver invitación
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          </div>
          <a :href="enlaceWhatsApp(`¡Hola Innube! Me gustó la invitación de ${t.tipo} (${t.titulo}) y quiero una así ✨`)" target="_blank" rel="noopener noreferrer" class="quiero">
            <IconoWhatsApp /> Quiero una así
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { TARJETAS, enlaceWhatsApp, type Tarjeta } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
import Celular from "@/components/Celular.vue";

const emit = defineEmits<{ probar: [Tarjeta] }>();
</script>

<style scoped>
.bloque {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: clamp(32px, 6vw, 96px);
  padding: clamp(40px, 7vw, 90px) 0;
}

.bloque.invertido .lado-celular {
  order: 2;
}

.lado-celular {
  display: flex;
  justify-content: center;
  perspective: 1200px;
  --k: clamp(-0.8, var(--c, 0), 0.8);
}

.abrir-celular {
  position: relative;
  width: min(280px, 70vw);
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  /* se inclina según dónde está en la pantalla (--c de v-paralaje) */
  transform: rotateY(calc(var(--k) * -14deg)) rotateX(calc(var(--k) * 6deg)) translateY(calc(var(--k) * 30px));
  transition: filter 0.3s ease;
}

.invertido .abrir-celular {
  transform: rotateY(calc(var(--k) * 14deg)) rotateX(calc(var(--k) * 6deg)) translateY(calc(var(--k) * 30px));
}

.abrir-celular:hover {
  filter: brightness(1.08);
}

.abrir-celular:focus-visible {
  outline: 2px solid var(--cian-claro);
  outline-offset: 8px;
  border-radius: 40px;
}

/* "Tócala" con un anillo que late */
.toca {
  position: absolute;
  right: -6%;
  bottom: 18%;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--borde);
  color: var(--blanco);
  font-family: var(--fuente-titulo);
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.anillo {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cian);
}

.anillo::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid var(--cian);
  animation: pulso 1.8s ease-out infinite;
}

@keyframes pulso {
  from {
    opacity: 0.9;
    transform: scale(0.5);
  }
  to {
    opacity: 0;
    transform: scale(1.6);
  }
}

/* TEXTO */
.tipo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
  font-family: var(--fuente-titulo);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--cian-claro);
}

.numero {
  color: var(--texto-suave);
  font-weight: 500;
}

.sello-funcional {
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(10, 150, 168, 0.2), rgba(24, 217, 231, 0.08));
  border: 1px solid rgba(10, 150, 168, 0.35);
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: var(--blanco);
}

.nombre {
  margin: 0 0 14px;
  font-family: var(--fuente-titulo);
  font-size: clamp(1.7rem, 3.4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--blanco);
  text-wrap: balance;
}

.frase {
  margin: 0 0 22px;
  font-size: 1.08rem;
  color: var(--texto);
  max-width: 480px;
}

.destacados {
  display: grid;
  gap: 10px;
  margin: 0 0 30px;
  padding: 0;
  list-style: none;
}

.destacados li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--texto);
}

.destacados svg {
  width: 22px;
  height: 22px;
  flex: none;
  padding: 3px;
  border-radius: 50%;
  background: var(--cian-suave);
  color: var(--cian);
}

.botones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* "Quiero una así": enlace directo a WhatsApp diciendo qué tarjeta le gustó */
.quiero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  padding: 6px 2px;
  font-family: var(--fuente-titulo);
  font-weight: 600;
  color: #4be08a;
  text-decoration: none;
}

.quiero svg {
  width: 20px;
  height: 20px;
}

.quiero svg:last-child {
  transition: transform 0.25s ease;
}

.quiero:hover svg:last-child {
  transform: translateX(4px);
}

@media (max-width: 820px) {
  .bloque {
    grid-template-columns: 1fr;
    text-align: left;
  }
  .bloque.invertido .lado-celular {
    order: 0;
  }
  .abrir-celular,
  .invertido .abrir-celular {
    width: min(250px, 66vw);
  }
}
</style>
