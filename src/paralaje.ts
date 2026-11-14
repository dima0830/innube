import type { Directive } from "vue";

/*
  v-paralaje: escribe en el elemento la variable CSS --c, que dice dónde está
  respecto al centro de la pantalla:
    0  = justo en el centro
    +  = más abajo (≈ +0.5 cuando entra por abajo)
    -  = más arriba (≈ -0.5 cuando sale por arriba)
  Con eso cada capa se mueve a su ritmo usando solo CSS, por ejemplo:
    translate: 0 calc(var(--c) * -80px);  → va más lento que la página (fondo)
    translate: 0 calc(var(--c) * 30px);   → va más rápido (primer plano)
  Solo se calculan los elementos que están en pantalla, una vez por cuadro.
*/

const activos = new Set<HTMLElement>();
const observadores = new WeakMap<HTMLElement, IntersectionObserver>();
let pendiente = false;
let escuchando = false;

function actualizar() {
  pendiente = false;
  const alto = window.innerHeight;
  for (const el of activos) {
    const r = el.getBoundingClientRect();
    const c = (r.top + r.height / 2 - alto / 2) / alto;
    el.style.setProperty("--c", c.toFixed(4));
  }
}

function programar() {
  if (!pendiente) {
    pendiente = true;
    requestAnimationFrame(actualizar);
  }
}

export const paralaje: Directive<HTMLElement> = {
  mounted(el) {
    el.style.setProperty("--c", "0");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) activos.add(el);
        else activos.delete(el);
        programar();
      },
      { rootMargin: "20% 0px" },
    );
    observador.observe(el);
    observadores.set(el, observador);

    if (!escuchando) {
      escuchando = true;
      window.addEventListener("scroll", programar, { passive: true });
      window.addEventListener("resize", programar);
    }
  },
  unmounted(el) {
    observadores.get(el)?.disconnect();
    observadores.delete(el);
    activos.delete(el);
  },
};
