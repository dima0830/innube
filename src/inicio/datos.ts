/*
  CONTENIDO DEL INICIO DE INNUBE
  Aquí se cambian los textos del viaje, las líneas de servicio y el portafolio.
  Para agregar un trabajo: pon la foto en src/assets/img/portafolio/, impórtala
  abajo y agrégala a su línea (máximo 6 por línea). Un trabajo sin foto
  aparece como "Foto en camino".
*/
import avisoInnube from "@/assets/img/portafolio/aviso-innube.webp";
import puertaConvierte from "@/assets/img/portafolio/puerta-convierte.webp";
import tarjetaFrente from "@/assets/img/portafolio/tarjeta-frente.webp";
import padMouse from "@/assets/img/portafolio/pad-mouse.webp";
import tapete from "@/assets/img/portafolio/tapete.webp";
import postMarcas from "@/assets/img/portafolio/post-marcas.webp";
import cojinJ from "@/assets/img/portafolio/cojin-j.webp";
import cojinA from "@/assets/img/portafolio/cojin-a.webp";
import fotoEscena from "@/assets/img/portafolio/foto-escena.webp";
import fotoAcuarela from "@/assets/img/portafolio/foto-acuarela.webp";
import xv from "@/assets/img/tarjeta-xv.webp";
import boda from "@/assets/img/tarjeta-boda.webp";

export type Paso = {
  id: string;
  numero: string;
  linea?: string; // nombre de la línea de servicio que representa
  titulo: string;
  texto: string;
  servicios?: string[];
};

export const PASOS: Paso[] = [
  {
    id: "idea",
    numero: "01",
    titulo: "Una idea",
    texto: "Llega como llegan las buenas ideas: de repente. Cuéntanosla por WhatsApp, con un dibujo, una foto o una nota de voz.",
  },
  {
    id: "diseno",
    numero: "02",
    linea: "Innube Digital",
    titulo: "Se vuelve diseño",
    texto: "Le damos forma, color y nombre. Lo que antes vivía en tu cabeza ahora se puede ver.",
    servicios: ["Logos e identidad", "Invitaciones digitales", "Piezas para redes", "Páginas web"],
  },
  {
    id: "impresion",
    numero: "03",
    linea: "Innube Impresión",
    titulo: "Se imprime",
    texto: "Y sale a la calle en grande, para que todo el que pase la vea, de día y de noche.",
    servicios: ["Vinilo adhesivo", "Avisos luminosos", "Banner y pendones", "Señalización"],
  },
  {
    id: "personaliza",
    numero: "04",
    linea: "Innube Personaliza",
    titulo: "Se vuelve tuya",
    texto: "Cabe en un mug, en un cojín o en un posavelas. Sublimado, grabado con láser o impreso a todo color.",
    servicios: ["Mugs", "Cojines", "Buzos y camisetas", "Corte láser", "Impresión UV"],
  },
  {
    id: "regalos",
    numero: "05",
    linea: "Innube Regalos",
    titulo: "Se regala",
    texto: "Para tu equipo o tus clientes: con tu marca, bien empacado y listo para entregar.",
    servicios: ["Anchetas", "Agendas y calendarios", "Detalles para equipos"],
  },
];

export type Trabajo = {
  titulo: string;
  detalle: string;
  foto?: string;
  alto?: boolean; // foto vertical
  ejemplo?: boolean; // foto de referencia (generada), no del trabajo real: se marca "Ejemplo"
};

export type Linea = { id: string; nombre: string; trabajos: Trabajo[] };

export const PORTAFOLIO: Linea[] = [
  {
    id: "digital",
    nombre: "Digital",
    trabajos: [
      { titulo: "Los quince de Vale", detalle: "Invitación digital", foto: xv, alto: true },
      { titulo: "Boda Andrea & Juan Carlos", detalle: "Invitación digital", foto: boda, alto: true },
      { titulo: "Tu foto navideña", detalle: "Retrato navideño con IA", foto: fotoEscena },
      { titulo: "Tarjetas Innube", detalle: "Tarjetas de presentación con UV", foto: tarjetaFrente },
      { titulo: "Creamos marcas", detalle: "Pieza para redes", foto: postMarcas, alto: true },
      { titulo: "Logo para emprendedora", detalle: "Identidad de marca" },
    ],
  },
  {
    id: "impresion",
    nombre: "Impresión",
    trabajos: [
      { titulo: "Aviso Innube", detalle: "Aviso de fachada", foto: avisoInnube },
      { titulo: "Convierte tus ideas", detalle: "Afiche para puerta", foto: puertaConvierte, alto: true },
      { titulo: "Señalización industrial", detalle: "504 piezas de seguridad" },
      { titulo: "Vinilo para distribuidora", detalle: "Vinilo de 1,5 × 10,7 m" },
      { titulo: "Aviso de caja de luz", detalle: "Aviso luminoso" },
    ],
  },
  {
    id: "personaliza",
    nombre: "Personaliza",
    trabajos: [
      { titulo: "Cojín con foto navideña", detalle: "Sublimación", foto: cojinJ, alto: true },
      { titulo: "Cojín con foto navideña", detalle: "Sublimación", foto: cojinA, alto: true },
      { titulo: "Retrato en acuarela", detalle: "Diseño para cojín o mug", foto: fotoAcuarela, alto: true },
      { titulo: "Pad mouse Innube", detalle: "Sublimación", foto: padMouse },
      { titulo: "Tapete Innube", detalle: "Sublimación", foto: tapete, alto: true },
      { titulo: "Posavelas a color", detalle: "Corte láser + UV" },
    ],
  },
  {
    id: "regalos",
    nombre: "Regalos",
    trabajos: [
      { titulo: "Ancheta Pino", detalle: "Caja de madera con tu logo" },
      { titulo: "Agenda de madera", detalle: "Grabado láser con nombre" },
      { titulo: "Calendario de escritorio", detalle: "Madera + impresión UV" },
      { titulo: "Detalle de agradecimiento", detalle: "Para todo el equipo" },
    ],
  },
];

export const MENSAJES = {
  general: "¡Hola Innube! Tengo una idea y quiero hacerla realidad ✨",
  navidad: "¡Hola Innube! Quiero un regalo de Navidad 🎄",
};
