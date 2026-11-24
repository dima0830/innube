/*
  CONFIGURACIÓN DE LA PÁGINA DE INNUBE
  Todo lo que cambia con el tiempo está aquí: el WhatsApp, las tarjetas y
  los enlaces de la demostración.
*/
import xv from "@/assets/img/tarjeta-xv.webp";
import boda from "@/assets/img/tarjeta-boda.webp";
import comunion from "@/assets/img/tarjeta-comunion.webp";
import bautizo from "@/assets/img/tarjeta-bautizo.webp";

/* WhatsApp de Innube (con indicativo, sin espacios ni +) */
export const WHATSAPP = "573023798490";
export const CORREO = "geroinnube@gmail.com";

export function enlaceWhatsApp(mensaje = "¡Hola Innube! Quiero cotizar una invitación digital ✨") {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

export type Tarjeta = {
  id: string;
  tipo: string;
  titulo: string;
  frase: string;
  url: string;
  imagen: string;
  color: string; // color de acento de la tarjeta (brillo detrás del celular)
  destacados: string[];
  funcional?: boolean;
};

export const TARJETAS: Tarjeta[] = [
  {
    id: "xv",
    tipo: "15 años",
    titulo: "Los quince años de Vale",
    frase: "Un estanque encantado con sobre que se abre, video de entrada y fotos de los invitados en vivo.",
    url: "https://vale15.droni.vip/",
    imagen: xv,
    color: "#2f7a5f",
    destacados: ["Sobre animado y video", "Confirmación con panel privado", "Fotos de invitados en pantalla gigante"],
    funcional: true,
  },
  {
    id: "boda",
    tipo: "Matrimonio",
    titulo: "La boda de Andrea & Juan Carlos",
    frase: "Romántica y floral, con su historia en fotos, código de vestimenta y lluvia de sobres.",
    url: "https://dima0830.github.io/boda/",
    imagen: boda,
    color: "#c98e80",
    destacados: ["Foto de la pareja de portada", "Música de fondo", "Galería y confirmación"],
  },
  {
    id: "comunion",
    tipo: "Primera Comunión",
    titulo: "La Primera Comunión de Sofía",
    frase: "Rosas, dorado y movimiento al bajar: la portada se transforma y la oración se ilumina.",
    url: "https://dima0830.github.io/comunion/",
    imagen: comunion,
    color: "#d9a7a0",
    destacados: ["Portada con movimiento", "Polaroids que se reparten", "Oración que se ilumina"],
  },
  {
    id: "bautizo",
    tipo: "Bautizo",
    titulo: "El bautizo de Santiago",
    frase: "Salvia y oro con detalles de acuarela, galería en carrusel y espacio para compartir fotos.",
    url: "https://dima0830.github.io/bautizo/",
    imagen: bautizo,
    color: "#9fb08d",
    destacados: ["Arco dorado en la portada", "Ruta de la iglesia a la fiesta", "Carrusel de fotos"],
  },
];

/* Demostración real con la tarjeta de Vale */
export const DEMO = {
  invitados: "https://vale15.droni.vip/invitados",
  pantalla: "https://vale15.droni.vip/pantalla",
};

/*
  PLANES Y PRECIOS (los mismos del catálogo PDF: /home/dima/innube/catalogo)
  El panel de confirmados y las fotos en vivo son exclusivos de Premium:
  no se venden como adicional de la Básica.
*/
export type Plan = {
  id: string;
  nombre: string;
  precio: string;
  para: string;
  entrega: string;
  incluye: string[];
  destacado?: boolean;
};

export const PLANES: Plan[] = [
  {
    id: "basica",
    nombre: "Básica",
    precio: "$130.000",
    para: "Para eventos íntimos que quieren verse increíbles.",
    entrega: "Entrega en 3 días hábiles · 1 ronda de cambios",
    incluye: [
      "Diseño personalizado con tus colores y fotos",
      "Portada animada y música de fondo",
      "Cuenta regresiva para el gran día",
      "Ubicación con mapa y botón de calendario",
      "Galería de hasta 6 fotos",
      "Formulario de confirmación de asistencia",
      "Lista de confirmados en Excel al cierre",
    ],
  },
  {
    id: "premium",
    nombre: "Premium",
    precio: "$365.000",
    para: "Para que cada invitado sienta que la tarjeta es solo para él, y tú tengas todo bajo control.",
    entrega: "Entrega en 5 días hábiles · 2 rondas de cambios",
    destacado: true,
    incluye: [
      "Todo lo de la Básica, más:",
      "Panel privado de confirmados en tiempo real",
      "Fotos de los invitados en vivo y pantalla gigante",
      "Enlace personalizado por invitado, con nombre y cupos",
      "Vista previa personalizada al compartir en WhatsApp",
      "Galería de fotos ilimitada",
      "Código de vestimenta e itinerario",
      "Mesa de regalos y lluvia de sobres con QR de Nequi",
    ],
  },
];

export const ADICIONALES: { nombre: string; precio: string }[] = [
  { nombre: "QR de entrada y control en la puerta", precio: "$80.000" },
  { nombre: "Soporte en vivo el día del evento", precio: "$80.000" },
  { nombre: "Álbum de recuerdo después del evento", precio: "$60.000" },
  { nombre: "Trivia de la pareja o la quinceañera", precio: "$60.000" },
  { nombre: "Libro de firmas digital", precio: "$50.000" },
  { nombre: "Video de entrada o de los anfitriones", precio: "$50.000" },
  { nombre: "Asignación de mesas", precio: "$50.000" },
  { nombre: "Transmisión en vivo", precio: "$50.000" },
  { nombre: "Recordatorios por WhatsApp", precio: "$40.000" },
  { nombre: "Dominio propio", precio: "$40.000" },
  { nombre: "Peticiones de canciones para el DJ", precio: "$30.000" },
  { nombre: "Entrega urgente (24 a 48 h)", precio: "+30%" },
];

export const INSTITUCIONAL = {
  precio: "$350.000",
  texto: "Grados y eventos de colegios: invitación con el logo de la institución y hasta 50 enlaces personalizados (enlace adicional $3.000).",
};
