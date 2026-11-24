<template>
  <!-- PREGUNTAS FRECUENTES: acordeón accesible (details/summary) -->
  <section id="preguntas" class="seccion">
    <div class="contenedor angosto">
      <div v-aparecer class="cabecera-seccion">
        <p class="etiqueta">Preguntas frecuentes</p>
        <h2 class="titulo">Todo lo que <span class="brillo">te preguntas</span></h2>
      </div>

      <div v-aparecer class="lista">
        <details v-for="(p, i) in PREGUNTAS" :key="i" class="pregunta" :open="i === 0">
          <summary>
            <span>{{ p.pregunta }}</span>
            <span class="mas" aria-hidden="true"></span>
          </summary>
          <p>{{ p.respuesta }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const PREGUNTAS = [
  { pregunta: "¿Mis invitados tienen que descargar algo?", respuesta: "No. La invitación es un enlace que abren desde WhatsApp, en cualquier celular o computadora, sin apps ni registros." },
  { pregunta: "¿Cómo les llega la invitación a mis invitados?", respuesta: "Por WhatsApp, con un enlace que se ve con una vista previa bonita en el chat. En el plan Premium cada familia recibe su propio enlace: al abrirlo, la invitación la saluda por su nombre y le muestra cuántos pases tiene." },
  { pregunta: "¿Puedo cambiar datos después de enviarla?", respuesta: "Sí. Si cambia la hora, el lugar o cualquier detalle, lo actualizamos y tus invitados ven la versión nueva con el mismo enlace." },
  { pregunta: "¿Cómo veo quién confirmó?", respuesta: "En el plan Premium tienes un panel privado con contraseña donde aparece cada confirmación con nombre, teléfono, asistencia y pases, con los totales listos. En el plan Básica te entregamos la lista en Excel al cierre de la confirmación." },
  { pregunta: "¿Cuánto cuesta?", respuesta: "El plan Básica cuesta $130.000 y el Premium $365.000. Puedes sumar adicionales como QR de entrada o video de bienvenida; los ves todos en la sección Planes." },
  { pregunta: "¿Cómo comparten fotos mis invitados?", respuesta: "En el plan Básica tus invitados suben sus fotos desde la tarjeta y todas llegan a una carpeta de Drive para ti. En el Premium, además, ponemos un código QR en las mesas; tus invitados suben sus fotos desde el celular, tú las apruebas y aparecen en la pantalla o video beam del evento." },
  { pregunta: "¿Puedo poner mi canción y mis fotos?", respuesta: "Claro. La música, las fotos, los colores y los textos se eligen contigo para que la invitación sea de tu celebración." },
  { pregunta: "¿Cuánto tarda en estar lista?", respuesta: "Depende del diseño y de los detalles; cuéntanos tu fecha por WhatsApp y te decimos los tiempos." },
];
</script>

<style scoped>
.angosto {
  max-width: 820px;
}

.lista {
  display: grid;
  gap: 12px;
}

.pregunta {
  border: 1px solid var(--borde);
  border-radius: 20px;
  background: var(--tarjeta);
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.pregunta[open] {
  border-color: rgba(10, 150, 168, 0.38);
  background: rgba(24, 217, 231, 0.07);
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  font-family: var(--fuente-titulo);
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--blanco);
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary:focus-visible {
  outline: 2px solid var(--cian-claro);
  outline-offset: 2px;
  border-radius: 20px;
}

/* + que gira a × */
.mas {
  position: relative;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--cian-suave);
  transition: transform 0.35s ease;
}

.mas::before,
.mas::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 2px;
  margin: -1px 0 0 -6px;
  border-radius: 2px;
  background: var(--cian);
}

.mas::after {
  transform: rotate(90deg);
}

.pregunta[open] .mas {
  transform: rotate(45deg);
}

.pregunta p {
  margin: 0;
  padding: 0 22px 22px;
  color: var(--texto);
}
</style>
