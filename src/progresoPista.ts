import { onBeforeUnmount, onMounted, type Ref } from "vue";

/*
  Progreso por una "pista": un contenedor alto con algo fijo (sticky) dentro.
  Mientras bajas por ella, p va de 0 (arriba) a 1 (cuando lo fijo se suelta).
  Escribe --p (lineal) y --pe (suavizada, frena al final) en el contenedor
  y llama a alCambiar(p) si se le pasa, una vez por cuadro.
  Con "reducir movimiento" no hace nada (p se queda en 0).
*/
export function usarProgresoPista(pista: Ref<HTMLElement | null>, alCambiar?: (p: number) => void) {
  let pendiente = false;
  let ultimo = -1;

  function calcular() {
    pendiente = false;
    const el = pista.value;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const recorrido = r.height - window.innerHeight;
    const p = recorrido > 0 ? Math.min(1, Math.max(0, -r.top / recorrido)) : 0;
    if (p === ultimo) return;
    ultimo = p;
    el.style.setProperty("--p", p.toFixed(4));
    el.style.setProperty("--pe", (1 - Math.pow(1 - p, 3)).toFixed(4));
    alCambiar?.(p);
  }

  function programar() {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(calcular);
    }
  }

  /* para recalcular desde fuera (por ejemplo si cambió el tamaño de algo) */
  function forzar() {
    ultimo = -1;
    programar();
  }

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("scroll", programar, { passive: true });
    window.addEventListener("resize", forzar);
    calcular();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", programar);
    window.removeEventListener("resize", forzar);
  });

  return { forzar };
}
