<template>
  <!--
    Cielo nocturno fijo detrás de toda la página: degradado azul marino,
    auroras cian que se mueven lento y estrellas que titilan.
  -->
  <div class="cielo" aria-hidden="true">
    <span class="aurora a1"></span>
    <span class="aurora a2"></span>
    <span class="aurora a3"></span>
    <span v-for="e in estrellas" :key="e.id" class="estrella" :style="e.estilo"></span>
  </div>
</template>

<script setup lang="ts">
const estrellas = Array.from({ length: 70 }, (_, id) => {
  const r = (n: number) => ((id * n * 9301 + 49297) % 233280) / 233280;
  return {
    id,
    estilo: {
      left: `${r(7) * 100}%`,
      top: `${r(13) * 100}%`,
      width: `${1 + r(3) * 2.2}px`,
      height: `${1 + r(3) * 2.2}px`,
      animationDelay: `${-r(17) * 6}s`,
      animationDuration: `${3 + r(5) * 4}s`,
    },
  };
});
</script>

<style scoped>
.cielo {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background:
    radial-gradient(ellipse 120% 70% at 50% -10%, #0f3558 0%, transparent 60%),
    linear-gradient(180deg, #081d33 0%, var(--noche) 50%, #050f1c 100%);
  pointer-events: none;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: derivar 26s ease-in-out infinite alternate;
}

.a1 {
  top: -10%;
  left: -10%;
  width: 55vw;
  height: 45vh;
  background: #18d9e7;
}

.a2 {
  top: 35%;
  right: -15%;
  width: 50vw;
  height: 45vh;
  background: #2a6cff;
  opacity: 0.22;
  animation-duration: 32s;
  animation-direction: alternate-reverse;
}

.a3 {
  bottom: -15%;
  left: 20%;
  width: 60vw;
  height: 40vh;
  background: #0fb5c9;
  opacity: 0.18;
  animation-duration: 38s;
}

@keyframes derivar {
  to {
    transform: translate(6vw, 4vh) scale(1.15);
  }
}

.estrella {
  position: absolute;
  border-radius: 50%;
  background: #eaffff;
  box-shadow: 0 0 6px rgba(127, 241, 250, 0.8);
  animation: titilar ease-in-out infinite;
}

@keyframes titilar {
  50% {
    opacity: 0.15;
  }
}
</style>
