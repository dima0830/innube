import { createApp, type Directive } from "vue";
import Inicio from "./Inicio.vue";
import "./assets/css/main.css";

/* v-aparecer: los hijos del elemento suben con un brillo al entrar en pantalla (una vez) */
const aparecer: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add("aparecer");
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add("visible");
          observador.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observador.observe(el);
  },
};

createApp(Inicio).directive("aparecer", aparecer).mount("#app");
