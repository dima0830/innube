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
export const WHATSAPP = "573182955152";
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
