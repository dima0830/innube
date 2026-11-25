<template>
  <!--
    Cielo claro fijo detrás de toda la página: fondo blanco, brillos cian
    muy suaves que se mueven lento y puntitos de luz que titilan.
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
    radial-gradient(ellipse 120% 70% at 50% -10%, var(--cielo-1) 0%, transparent 60%),
    linear-gradient(180deg, var(--cielo-2) 0%, var(--noche) 50%, var(--cielo-3) 100%);
  pointer-events: none;
  transition: background-color 0.3s ease;
}

.aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.16;
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
  background: #6fb4ff;
  opacity: 0.12;
  animation-duration: 32s;
  animation-direction: alternate-reverse;
}

.a3 {
  bottom: -15%;
  left: 20%;
  width: 60vw;
  height: 40vh;
  background: #0fb5c9;
  opacity: 0.1;
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
  background: #8fe6ef;
  opacity: 0.7;
  animation: titilar ease-in-out infinite;
}

@keyframes titilar {
  50% {
    opacity: 0.15;
  }
}
</style>
