<template>
  <!-- PLANES: Básica y Premium lado a lado, adicionales y plan institucional (datos en config.ts) -->
  <section id="planes" class="seccion">
    <div class="contenedor">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Planes</p>
        <h2 class="titulo">Elige cómo quieres <span class="brillo">celebrar</span></h2>
        <p class="entrada">Dos planes claros y adicionales para armar tu invitación a la medida. Todos incluyen diseño personalizado.</p>
      </div>

      <div v-aparecer class="planes">
        <article v-for="p in PLANES" :key="p.id" class="plan" :class="{ destacado: p.destacado }">
          <span v-if="p.destacado" class="sello">⭐ La más elegida</span>
          <h3>{{ p.nombre }}</h3>
          <p class="para">{{ p.para }}</p>
          <p class="precio">{{ p.precio }} <small>COP</small></p>
          <p class="entrega">{{ p.entrega }}</p>
          <ul>
            <li v-for="(item, i) in p.incluye" :key="item" :class="{ mas: item.endsWith(':'), clave: p.destacado && (i === 1 || i === 2) }">
              {{ item }}
            </li>
          </ul>
          <a
            :href="enlaceWhatsApp(`¡Hola Innube! Quiero el plan ${p.nombre} para mi invitación digital ✨`)"
            target="_blank"
            rel="noopener noreferrer"
            class="boton"
            :class="p.destacado ? 'boton-principal' : 'boton-secundario'"
          >
            <IconoWhatsApp /> Quiero la {{ p.nombre }}
          </a>
        </article>
      </div>

      <div v-aparecer>
        <p class="exclusivo">
          <b>Solo en Premium:</b> el panel de confirmados en tiempo real, las fotos en vivo en pantalla gigante y el álbum de recuerdo. Lo demás se puede sumar a cualquiera de los dos planes.
        </p>
      </div>

      <!-- TARJETA REGALO: se pide sola en el formulario /pedido/ -->
      <div v-aparecer class="regalo">
        <img :src="imagenRegalo" alt="Tarjeta Regalo de muestra: los 40 de Caro" class="regalo-img" loading="lazy" />
        <div class="regalo-texto">
          <p class="etiqueta">Para regalar</p>
          <h3>Tarjeta Regalo</h3>
          <p class="regalo-precio">{{ REGALO.precio }} <small>COP</small></p>
          <p class="regalo-desc">{{ REGALO.texto }}</p>
          <ul>
            <li v-for="item in REGALO.incluye" :key="item">{{ item }}</li>
          </ul>
          <p class="regalo-urgente">{{ REGALO.urgente }}</p>
          <div class="regalo-botones">
            <a :href="pedido" class="boton boton-principal">🎁 Pídela aquí</a>
            <a href="https://dima0830.github.io/cumple40/" target="_blank" rel="noopener" class="boton boton-secundario">Ver la muestra</a>
          </div>
        </div>
      </div>

      <div v-aparecer class="extras">
        <div class="adicionales">
          <h3>Adicionales</h3>
          <ul>
            <li v-for="a in ADICIONALES" :key="a.nombre">
              <span>{{ a.nombre }}</span><b>{{ a.precio }}</b>
            </li>
          </ul>
        </div>
        <div class="institucional">
          <p class="etiqueta">Colegios</p>
          <h3>Plan Institucional</h3>
          <p class="precio">{{ INSTITUCIONAL.precio }} <small>COP</small></p>
          <p class="texto">{{ INSTITUCIONAL.texto }}</p>
          <p class="nota">{{ INSTITUCIONAL.nota }}</p>
          <a
            :href="enlaceWhatsApp('¡Hola Innube! Quiero cotizar el plan Institucional para un evento de colegio 🎓')"
            target="_blank"
            rel="noopener noreferrer"
            class="boton boton-secundario"
          >
            <IconoWhatsApp /> Cotizar para mi colegio
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ADICIONALES, INSTITUCIONAL, PLANES, REGALO, enlaceWhatsApp } from "@/config";
import imagenRegalo from "@/assets/img/tarjeta-regalo.webp";

const pedido = `${import.meta.env.BASE_URL}pedido/`;
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";
</script>

<style scoped>
.planes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 460px));
  justify-content: center;
  gap: 24px;
}

.plan {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 34px 30px 30px;
  border: 1px solid var(--borde);
  border-radius: 28px;
  background: #fff;
  box-shadow: var(--sombra);
}

.plan.destacado {
  border: 2px solid var(--cian);
  background: linear-gradient(180deg, rgba(24, 217, 231, 0.12), #fff 55%);
  box-shadow: 0 30px 60px -30px rgba(16, 188, 205, 0.55);
}

.sello {
  position: absolute;
  top: -14px;
  left: 50%;
  translate: -50% 0;
  padding: 5px 14px;
  border-radius: 999px;
  background: var(--cian);
  color: var(--tinta);
  font: 700 0.72rem var(--fuente-titulo);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

.plan h3 {
  margin: 0;
  font: 700 1.6rem var(--fuente-titulo);
  color: var(--blanco);
}

.para {
  margin: 6px 0 0;
  min-height: 3em;
  font-size: 0.95rem;
  color: var(--texto-suave);
}

.precio {
  margin: 18px 0 0;
  font: 700 2.6rem/1 var(--fuente-titulo);
  color: var(--blanco);
}

.destacado .precio {
  color: var(--cian-claro);
}

.precio small {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--texto-suave);
}

.entrega {
  margin: 8px 0 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--borde);
  font-size: 0.85rem;
  color: var(--texto-suave);
}

.plan ul {
  flex: 1;
  margin: 0 0 26px;
  padding: 0;
  list-style: none;
}

.plan li {
  position: relative;
  padding-left: 26px;
  margin-bottom: 10px;
  font-size: 0.98rem;
  color: var(--texto);
}

.plan li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--cian-claro);
  font-weight: 700;
}

.plan li.mas {
  padding-left: 0;
  font-weight: 700;
  color: var(--blanco);
}

.plan li.mas::before {
  content: none;
}

.plan li.clave {
  font-weight: 700;
  color: var(--blanco);
}

.plan .boton {
  width: 100%;
}

.exclusivo {
  max-width: 720px;
  margin: 28px auto 0;
  padding: 14px 20px;
  border-radius: 16px;
  background: var(--cian-suave);
  text-align: center;
  font-size: 0.95rem;
  color: var(--texto);
}

.exclusivo b {
  color: var(--blanco);
}

.regalo {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 32px;
  align-items: center;
  max-width: 944px;
  margin: 40px auto 0;
  padding: 28px 32px;
  border: 2px solid #ecc6c9;
  border-radius: 24px;
  background: linear-gradient(150deg, #fdeeee, #fff 65%);
}

.regalo-img {
  width: 100%;
  aspect-ratio: 600 / 1100;
  object-fit: cover;
  object-position: top;
  border: 7px solid #1b1d20;
  border-radius: 30px;
  box-shadow: 0 24px 40px -24px rgba(143, 79, 90, 0.7);
  transform: rotate(-3deg);
}

.regalo .etiqueta {
  color: #b76e79;
}

.regalo h3 {
  margin: 4px 0 0;
  font: 700 1.6rem var(--fuente-titulo);
  color: var(--blanco);
}

.regalo-precio {
  margin: 4px 0 0;
  font: 700 2rem var(--fuente-titulo);
  color: #b76e79;
}

.regalo-precio small {
  font-size: 0.8rem;
  color: var(--texto-suave);
}

.regalo-desc {
  margin: 10px 0 0;
  color: var(--texto);
}

.regalo ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 20px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.92rem;
}

.regalo li::before {
  content: "✓ ";
  color: #b76e79;
  font-weight: 700;
}

.regalo-urgente {
  margin: 12px 0 0;
  font-size: 0.88rem;
  color: var(--texto-suave);
}

.regalo-botones {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.extras {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
  max-width: 944px;
  margin: 40px auto 0;
}

.adicionales,
.institucional {
  padding: 28px;
  border: 1px solid var(--borde);
  border-radius: 24px;
  background: var(--tarjeta);
}

.extras h3 {
  margin: 0 0 14px;
  font: 700 1.25rem var(--fuente-titulo);
  color: var(--blanco);
}

.adicionales ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.adicionales li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px dashed var(--borde);
  font-size: 0.9rem;
  color: var(--texto);
}

.adicionales li b {
  font-family: var(--fuente-titulo);
  color: var(--cian-claro);
  white-space: nowrap;
}

.institucional {
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(16, 188, 205, 0.45);
  background: linear-gradient(160deg, rgba(24, 217, 231, 0.1), #fff 70%);
}

.institucional .etiqueta {
  align-self: flex-start;
}

.institucional .precio {
  margin: 0;
  font-size: 2rem;
  color: var(--cian-claro);
}

.institucional .texto {
  margin: 12px 0 8px;
  font-size: 0.92rem;
  color: var(--texto-suave);
}

.institucional .nota {
  flex: 1;
  margin: 0 0 20px;
  font-size: 0.8rem;
  color: var(--texto-suave);
}

@media (max-width: 860px) {
  .regalo {
    grid-template-columns: 1fr;
    padding: 24px 20px;
    text-align: center;
  }
  .regalo-img {
    width: 170px;
    margin: 0 auto;
  }
  .regalo ul {
    grid-template-columns: 1fr;
    text-align: left;
    justify-items: start;
    width: fit-content;
    margin-inline: auto;
  }
  .regalo-botones {
    justify-content: center;
  }
  .planes,
  .extras {
    grid-template-columns: 1fr;
  }
  .planes {
    gap: 34px;
  }
}

@media (max-width: 560px) {
  .plan {
    padding: 30px 22px 24px;
  }
  .adicionales ul {
    grid-template-columns: 1fr;
  }
  .para {
    min-height: 0;
  }
}
</style>
