<template>
  <FondoCielo />
  <EncabezadoInicio />
  <main>
    <ViajeIdea />
    <Portafolio />
    <Temporada />
  </main>
  <PieInicio />
  <WhatsAppFlotante :mensaje="MENSAJES.general" />
</template>

<script setup lang="ts">
import FondoCielo from "@/components/FondoCielo.vue";
import WhatsAppFlotante from "@/components/WhatsAppFlotante.vue";
import EncabezadoInicio from "@/inicio/EncabezadoInicio.vue";
import ViajeIdea from "@/inicio/ViajeIdea.vue";
import Portafolio from "@/inicio/Portafolio.vue";
import Temporada from "@/inicio/Temporada.vue";
import PieInicio from "@/inicio/PieInicio.vue";
import { MENSAJES } from "@/inicio/datos";
</script>
