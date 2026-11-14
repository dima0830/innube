<template>
  <!-- Maqueta de celular en CSS: marco, isla de la cámara y pantalla con el contenido -->
  <div class="celular" :style="{ '--brillo': brillo }">
    <div class="marco">
      <div class="pantalla">
        <slot />
      </div>
      <span class="isla" aria-hidden="true"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ brillo?: string }>(), { brillo: "#18d9e7" });
</script>

<style scoped>
.celular {
  position: relative;
  width: 100%;
  aspect-ratio: 390 / 844;
}

/* halo de color detrás del celular */
.celular::before {
  content: "";
  position: absolute;
  inset: 12% -14% 6%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--brillo), transparent);
  opacity: 0.45;
  filter: blur(28px);
}

.marco {
  position: absolute;
  inset: 0;
  padding: 3.2%;
  border-radius: 13% / 6%;
  background: linear-gradient(145deg, #2b3d52, #0e1a28 45%, #1f3147);
  box-shadow:
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.14),
    inset 0 0 0 4px rgba(0, 0, 0, 0.5),
    0 30px 60px -20px rgba(0, 0, 0, 0.75);
}

.pantalla {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10.5% / 4.9%;
  background: #000;
}

.pantalla :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.pantalla :deep(iframe) {
  width: 100%;
  height: 100%;
  border: 0;
}

.isla {
  position: absolute;
  top: 4.2%;
  left: 50%;
  width: 28%;
  height: 3.2%;
  margin-left: -14%;
  border-radius: 999px;
  background: #000;
}
</style>
