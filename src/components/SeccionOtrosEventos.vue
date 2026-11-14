<template>
  <!-- ¿CELEBRAS OTRA COSA?: franja para quien no ve su evento entre las cuatro tarjetas -->
  <section class="otros" aria-labelledby="otros-titulo">
    <div class="contenedor">
      <div v-aparecer class="franja">
        <div class="texto">
          <p class="etiqueta">¿Celebras otra cosa?</p>
          <h2 id="otros-titulo" class="titulo-franja">Diseñamos la invitación de <span class="brillo">tu evento</span></h2>
          <ul class="eventos">
            <li v-for="e in EVENTOS" :key="e.nombre"><span aria-hidden="true">{{ e.icono }}</span> {{ e.nombre }}</li>
          </ul>
        </div>
        <a :href="enlaceWhatsApp('¡Hola Innube! Quiero una invitación digital para mi evento ✨')" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
          <IconoWhatsApp /> Cuéntanos tu evento
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const EVENTOS = [
  { icono: "🎓", nombre: "Grados" },
  { icono: "🎂", nombre: "Cumpleaños" },
  { icono: "🍼", nombre: "Baby shower" },
  { icono: "💍", nombre: "Aniversarios" },
  { icono: "🏢", nombre: "Eventos de empresa" },
  { icono: "✨", nombre: "Y más" },
];
</script>

<style scoped>
.otros {
  padding: 0 0 clamp(40px, 6vw, 80px);
}

.franja {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 40px;
  padding: clamp(26px, 4vw, 44px) clamp(22px, 4vw, 52px);
  border: 1px solid rgba(127, 241, 250, 0.28);
  border-radius: 28px;
  background:
    radial-gradient(ellipse 60% 120% at 0% 50%, rgba(24, 217, 231, 0.16), transparent 70%),
    var(--tarjeta);
}

.texto {
  flex: 1 1 420px;
}

.titulo-franja {
  margin: 0 0 16px;
  font-family: var(--fuente-titulo);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--blanco);
  text-wrap: balance;
}

.eventos {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.eventos li {
  padding: 7px 14px;
  border: 1px solid var(--borde);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.92rem;
  color: var(--texto);
}

@media (max-width: 560px) {
  .franja .boton {
    width: 100%;
  }
}
</style>
