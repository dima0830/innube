import type { Directive } from "vue";

/*
  v-magnetico: el botón se acerca un poco al cursor mientras está encima y vuelve
  con un rebote al salir (inspirado en el "magnetic button"). Solo con mouse
  (en celular no hay cursor) y nunca con "reducir movimiento".
  Uso: <a v-magnetico class="boton">…</a>  ó  v-magnetico="0.5" (fuerza, 0 a 1).
*/
const FUERZA = 0.35;
const MAXIMO = 14; // px

export const magnetico: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fuerza = value ?? FUERZA;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
    el.classList.add("magnetico");
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const lim = (n: number) => Math.max(-MAXIMO, Math.min(MAXIMO, n));
      el.style.setProperty("--mx", `${lim((e.clientX - (r.left + r.width / 2)) * fuerza)}px`);
      el.style.setProperty("--my", `${lim((e.clientY - (r.top + r.height / 2)) * fuerza)}px`);
      el.classList.add("atraido");
    };
    const soltar = () => {
      el.classList.remove("atraido");
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", soltar);
  },
};
