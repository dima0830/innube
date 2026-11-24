<template>
  <!-- Botón flotante de WhatsApp: aparece al pasar la portada -->
  <Transition name="flotante">
    <a
      v-if="visible"
      :href="enlaceWhatsApp(mensaje)"
      target="_blank"
      rel="noopener noreferrer"
      class="flotante"
      aria-label="Escríbenos por WhatsApp"
    >
      <IconoWhatsApp />
      <span class="texto">¿Hablamos?</span>
    </a>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { enlaceWhatsApp } from "@/config";
import IconoWhatsApp from "@/components/IconoWhatsApp.vue";

const props = defineProps<{ mensaje?: string }>();
const mensaje = props.mensaje;
const visible = ref(false);
const revisar = () => (visible.value = window.scrollY > window.innerHeight * 0.9);
onMounted(() => {
  revisar();
  window.addEventListener("scroll", revisar, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", revisar));
</script>

<style scoped>
.flotante {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px 12px 14px;
  border-radius: 999px;
  background: #25d366;
  color: #fff;
  font-family: var(--fuente-titulo);
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 14px 30px -10px rgba(37, 211, 102, 0.7);
  transition: transform 0.2s ease;
}

.flotante:hover {
  transform: translateY(-3px);
}

.flotante svg {
  width: 24px;
  height: 24px;
}

/* aro que late para llamar la atención */
.flotante::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
  animation: aro 2.4s ease-out infinite;
}

@keyframes aro {
  to {
    box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
  }
}

.flotante-enter-active,
.flotante-leave-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.flotante-enter-from,
.flotante-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

@media (max-width: 560px) {
  .texto {
    display: none;
  }
  .flotante {
    padding: 14px;
  }
}
</style>
