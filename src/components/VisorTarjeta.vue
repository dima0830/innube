<template>
  <!--
    PROBAR AQUÍ: un celular grande con la invitación real funcionando dentro.
    El iframe solo se carga al abrir (no hace lenta la página).
  -->
  <Teleport to="body">
    <Transition name="visor">
      <div v-if="tarjeta" class="visor" role="dialog" aria-modal="true" :aria-label="`Invitación de ${tarjeta.tipo}`" @click.self="emit('cerrar')">
        <div class="contenido">
          <div ref="celularRef" class="celular-grande" :style="{ '--escala': escala, '--alto': `${alto}px` }">
            <Celular :brillo="tarjeta.color">
              <div v-if="cargando" class="cargando">
                <img :src="tarjeta.imagen" alt="" aria-hidden="true" />
                <span class="girando" aria-label="Cargando"></span>
              </div>
              <iframe
                class="iframe-escalado"
                :src="tarjeta.url"
                :title="`Invitación de ${tarjeta.tipo}`"
                allow="autoplay; fullscreen"
                @load="cargando = false"
              ></iframe>
            </Celular>
          </div>

          <div class="lado">
            <p class="etiqueta">{{ tarjeta.tipo }}</p>
            <h2 class="titulo-visor">{{ tarjeta.titulo }}</h2>
            <p class="ayuda">Desliza dentro del celular: así la verán tus invitados.</p>
            <div class="botones">
              <a :href="tarjeta.url" target="_blank" rel="noopener noreferrer" class="boton boton-secundario">
                Abrir en pantalla completa
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
              <a :href="enlaceWhatsApp(`¡Hola Innube! Me gustó la invitación de ${tarjeta.tipo} y quiero una ✨`)" target="_blank" rel="noopener noreferrer" class="boton boton-principal">
                <IconoWhatsApp /> Quiero una así
              </a>
            </div>
          </div>
        </div>

        <button type="button" class="cerrar" aria-label="Cerrar" @click="emit('cerrar')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { enlaceWhatsApp, type Tarjeta } from "@/config";
import Celular from "@/components/Celular.vue";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const props = defineProps<{ tarjeta: Tarjeta | null }>();
const emit = defineEmits<{ cerrar: [] }>();
const cargando = ref(true);

/* el iframe se pinta a 390×844 (un celular real) y se escala al tamaño del marco */
const celularRef = ref<HTMLElement | null>(null);
const escala = ref(1);
const alto = ref(844);
let medidor: ResizeObserver | undefined;
watch(celularRef, (el) => {
  medidor?.disconnect();
  if (!el) return;
  medidor = new ResizeObserver(() => {
    const pantalla = el.querySelector(".pantalla") as HTMLElement | null;
    if (!pantalla) return;
    escala.value = pantalla.clientWidth / 390;
    alto.value = Math.round(pantalla.clientHeight / escala.value);
  });
  medidor.observe(el);
});

watch(
  () => props.tarjeta,
  (t) => {
    cargando.value = true;
    document.body.style.overflow = t ? "hidden" : "";
  },
);

function alTeclado(e: KeyboardEvent) {
  if (e.key === "Escape" && props.tarjeta) emit("cerrar");
}
onMounted(() => window.addEventListener("keydown", alTeclado));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", alTeclado);
  medidor?.disconnect();
  document.body.style.overflow = "";
});
</script>

<style scoped>
.visor {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 20px;
  overflow-y: auto;
  background: rgba(4, 14, 26, 0.86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.contenido {
  display: flex;
  align-items: center;
  gap: clamp(24px, 5vw, 64px);
}

.celular-grande {
  width: min(360px, 82vw, calc((100vh - 60px) * 0.462));
  width: min(360px, 82vw, calc((100svh - 60px) * 0.462));
}

.celular-grande :deep(.iframe-escalado) {
  position: absolute;
  top: 0;
  left: 0;
  width: 390px;
  height: var(--alto, 844px);
  transform: scale(var(--escala, 1));
  transform-origin: 0 0;
}

.cargando {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.cargando img {
  position: absolute;
  inset: 0;
  filter: brightness(0.6);
}

.girando {
  position: relative;
  width: 42px;
  height: 42px;
  border: 3px solid rgba(255, 255, 255, 0.25);
  border-top-color: var(--cian);
  border-radius: 50%;
  animation: girar 0.9s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.lado {
  max-width: 340px;
}

.titulo-visor {
  margin: 0 0 10px;
  font-family: var(--fuente-titulo);
  font-size: 2rem;
  line-height: 1.1;
  color: var(--blanco);
}

.ayuda {
  margin: 0 0 22px;
  color: var(--texto-suave);
}

.botones {
  display: grid;
  gap: 10px;
}

.cerrar {
  position: fixed;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: rgba(19, 40, 61, 0.08);
  color: var(--blanco);
  cursor: pointer;
}

.cerrar svg {
  width: 22px;
  height: 22px;
}

.visor-enter-active,
.visor-leave-active {
  transition: opacity 0.3s ease;
}

.visor-enter-from,
.visor-leave-to {
  opacity: 0;
}

.visor-enter-active .celular-grande {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.visor-enter-from .celular-grande {
  transform: translateY(40px) scale(0.92);
}

/* en celular: solo el celular grande y los botones debajo, compactos */
@media (max-width: 760px) {
  .contenido {
    flex-direction: column;
    gap: 16px;
  }
  .lado {
    text-align: center;
  }
  .lado .etiqueta,
  .titulo-visor,
  .ayuda {
    display: none;
  }
  .botones {
    grid-template-columns: 1fr 1fr;
  }
  .botones .boton {
    min-height: 44px;
    padding: 10px 12px;
    font-size: 0.85rem;
  }
  .celular-grande {
    width: min(300px, 74vw, calc((100svh - 150px) * 0.462));
  }
}
</style>
