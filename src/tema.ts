/*
  MODO CLARO / OSCURO de innube.online
  - El tema vive en <html data-tema="claro|oscuro"> y se guarda en localStorage.
  - Un script en el <head> de cada página lo aplica antes de pintar (sin parpadeo).
  - Al cambiarlo, una ola de cuadritos cian barre la pantalla de arriba abajo:
    cubre, cambia el tema y descubre (inspirado en el "image generation loader").
*/
export type Tema = "claro" | "oscuro";

const CLAVE = "innube-tema";
const COLOR_BARRA: Record<Tema, string> = { claro: "#ffffff", oscuro: "#060c17" };

export function temaActual(): Tema {
  return document.documentElement.dataset.tema === "oscuro" ? "oscuro" : "claro";
}

function aplicar(tema: Tema) {
  document.documentElement.dataset.tema = tema;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLOR_BARRA[tema]);
  try {
    localStorage.setItem(CLAVE, tema);
  } catch {
    /* modo privado: no se guarda */
  }
  window.dispatchEvent(new CustomEvent("tema", { detail: tema }));
}

let cambiando = false;

export function alternarTema() {
  if (cambiando) return;
  const nuevo: Tema = temaActual() === "oscuro" ? "claro" : "oscuro";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    aplicar(nuevo);
    return;
  }
  cambiando = true;
  olaDeCuadritos(() => aplicar(nuevo)).finally(() => (cambiando = false));
}

/* Ola de cuadritos: cubre de arriba abajo, llama a `enMedio` con la pantalla tapada y descubre. */
function olaDeCuadritos(enMedio: () => void): Promise<void> {
  return new Promise((listo) => {
    const lienzo = document.createElement("canvas");
    lienzo.setAttribute("aria-hidden", "true");
    lienzo.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;z-index:9999;pointer-events:none";
    document.body.appendChild(lienzo);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    lienzo.width = W * dpr;
    lienzo.height = H * dpr;
    const c = lienzo.getContext("2d")!;
    c.scale(dpr, dpr);

    const celda = 10;
    const hueco = 2;
    const cols = Math.ceil(W / celda);
    const filas = Math.ceil(H / celda);
    // cada cuadrito con un tono de la paleta y un pequeño retraso propio (borde irregular)
    const TONOS = ["#0a96a8", "#12c6d6", "#18d9e7", "#7ff1fa", "#2f80d6", "#1e5fb4"];
    const n = cols * filas;
    const tono = new Uint8Array(n);
    const azar = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      tono[i] = Math.floor(Math.random() * TONOS.length);
      azar[i] = Math.random();
    }

    const CUBRIR = 520;
    const PAUSA = 90;
    const DESCUBRIR = 560;
    const BORDE = 0.18; // ancho del borde irregular (fracción de la pantalla)
    const suave = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x * x * (3 - 2 * x));
    let inicio = 0;
    let cambiado = false;

    function cuadro(ahora: number) {
      if (!inicio) inicio = ahora;
      const t = ahora - inicio;
      // frente de la ola (0 = arriba, 1 = abajo), con margen para el borde irregular
      const cubre = suave(t / CUBRIR) * (1 + BORDE);
      const descubre = t < CUBRIR + PAUSA ? -1 : suave((t - CUBRIR - PAUSA) / DESCUBRIR) * (1 + BORDE);
      if (!cambiado && t >= CUBRIR) {
        cambiado = true;
        enMedio();
      }
      c.clearRect(0, 0, W, H);
      for (let f = 0; f < filas; f++) {
        const y = f / filas;
        for (let k = 0; k < cols; k++) {
          const i = f * cols + k;
          const umbral = y + azar[i] * BORDE;
          // tamaño del cuadrito: crece al llegar la ola y se encoge al irse
          let s = suave((cubre - umbral) / 0.06);
          if (descubre >= 0) s = Math.min(s, 1 - suave((descubre - umbral) / 0.06));
          if (s <= 0.02) continue;
          const lado = (celda - hueco) * s;
          c.fillStyle = TONOS[tono[i]];
          c.fillRect(k * celda + (celda - lado) / 2, f * celda + (celda - lado) / 2, lado, lado);
        }
      }
      if (t < CUBRIR + PAUSA + DESCUBRIR + 40) requestAnimationFrame(cuadro);
      else {
        lienzo.remove();
        listo();
      }
    }
    requestAnimationFrame(cuadro);
  });
}

