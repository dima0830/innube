<template>
  <FondoCielo />
  <Encabezado />
  <main>
    <PortadaAbanico />
    <SeccionTarjetas @probar="probando = $event" />
    <SeccionOtrosEventos />
    <SeccionIncluye />
    <ComoFunciona />
    <SeccionPdf />
    <SeccionPlanes />
    <SeccionProceso />
    <SeccionPreguntas />
    <SeccionCierre />
  </main>
  <WhatsAppFlotante />
  <VisorTarjeta :tarjeta="probando" @cerrar="probando = null" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Tarjeta } from "@/config";
import FondoCielo from "@/components/FondoCielo.vue";
import Encabezado from "@/components/Encabezado.vue";
import PortadaAbanico from "@/components/PortadaAbanico.vue";
import SeccionTarjetas from "@/components/SeccionTarjetas.vue";
import SeccionOtrosEventos from "@/components/SeccionOtrosEventos.vue";
import SeccionIncluye from "@/components/SeccionIncluye.vue";
import ComoFunciona from "@/components/ComoFunciona.vue";
import SeccionPdf from "@/components/SeccionPdf.vue";
import SeccionPlanes from "@/components/SeccionPlanes.vue";
import SeccionProceso from "@/components/SeccionProceso.vue";
import SeccionPreguntas from "@/components/SeccionPreguntas.vue";
import SeccionCierre from "@/components/SeccionCierre.vue";
import WhatsAppFlotante from "@/components/WhatsAppFlotante.vue";
import VisorTarjeta from "@/components/VisorTarjeta.vue";

const probando = ref<Tarjeta | null>(null);
</script>
