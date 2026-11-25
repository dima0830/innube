/*
  CONFIGURACIÓN DE LA PÁGINA DE INNUBE
  Todo lo que cambia con el tiempo está aquí: el WhatsApp, las tarjetas y
  los enlaces de la demostración.
*/
import xv from "@/assets/img/tarjeta-xv.webp";
import boda from "@/assets/img/tarjeta-boda.webp";
import comunion from "@/assets/img/tarjeta-comunion.webp";
import bautizo from "@/assets/img/tarjeta-bautizo.webp";
import grado from "@/assets/img/tarjeta-grado.webp";
import regalo from "@/assets/img/tarjeta-regalo.webp";

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
    url: "https://dima0830.github.io/boda/", // pasar a https://andreayjuan.innube.online/ cuando exista en el DNS
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
  {
    id: "grado",
    tipo: "Grado · Plan Institucional",
    titulo: "Graduación del Instituto Moderno Americano",
    frase: "Con el logo del colegio y un enlace para la familia de cada graduando: la invitación llega con su nombre.",
    url: "https://ima.innube.online/",
    imagen: grado,
    color: "#2a4b8d",
    destacados: ["Enlace con el nombre de cada graduando", "Herramienta de envío por WhatsApp", "Música de ceremonia"],
  },
  {
    id: "regalo",
    tipo: "Tarjeta Regalo",
    titulo: "Los 40 de Caro",
    frase: "Un regalo que se abre en el celular: sus fotos, su canción, deseos que aparecen palabra por palabra y los mensajes de la familia.",
    url: "https://dima0830.github.io/cumple40/",
    imagen: regalo,
    color: "#d9a0a8",
    destacados: ["Regalo que se abre con su nombre", "Página secreta para la familia", "Desde $60.000"],
  },
];

/* Demostración real con la tarjeta de Vale */
export const DEMO = {
  invitados: "https://vale15.droni.vip/invitados",
  pantalla: "https://vale15.droni.vip/pantalla",
};

/*
  PLANES Y PRECIOS (los mismos del catálogo PDF: /home/dima/innube/catalogo)
  El panel de confirmados, las fotos en vivo y el álbum de recuerdo son
  exclusivos de Premium: no se venden como adicional de la Básica. En la
  Básica las fotos de los invitados van a una carpeta de Drive.
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
      "Tus invitados suben sus fotos a una carpeta de Drive",
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
      "Hasta 70 enlaces a nombre de cada invitado, con sus pases (extra: $3.000 c/u)",
      "Entrada personalizada: las puertas se abren con el nombre del invitado, y botón para guardar su invitación",
      "Vista previa personalizada al compartir en WhatsApp",
      "Galería de fotos ilimitada",
      "Código de vestimenta e itinerario",
      "Mesa de regalos y lluvia de sobres con QR de Nequi",
      "Dirección propia: tunombre.innube.online",
    ],
  },
];

export const ADICIONALES: { nombre: string; precio: string }[] = [
  { nombre: "QR de entrada y control en la puerta", precio: "$80.000" },
  { nombre: "Álbum de recuerdo (solo Premium)", precio: "$60.000" },
  { nombre: "Trivia de la pareja o la quinceañera", precio: "$60.000" },
  { nombre: "Libro de firmas digital", precio: "$50.000" },
  { nombre: "Asignación de mesas", precio: "$50.000" },
  { nombre: "Recordatorios por WhatsApp", precio: "$40.000" },
  { nombre: "Dirección propia, tunombre.innube.online (incluida en Premium)", precio: "$25.000" },
  { nombre: "Peticiones de canciones para el DJ", precio: "$30.000" },
  { nombre: "Entrega urgente (24 a 48 h)", precio: "+30%" },
];

export const INSTITUCIONAL = {
  precio: "$350.000",
  texto: "Grados y eventos de colegios: invitación con el logo de la institución y un enlace personalizado para la familia de cada estudiante.*",
  nota: "* Incluye hasta 100 enlaces. Enlace adicional: $1.200.",
};
