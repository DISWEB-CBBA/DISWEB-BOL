particlesJS("particles-js", {
  particles: {
    number: { value: 90, density: { enable: true, value_area: 1000 } },
    color: { value: "#00ffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000" },
    },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00ffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

document.addEventListener("DOMContentLoaded", function () {
  // Actualizar año en el footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Controlar posición del icono flotante
  const icono = document.querySelector(".icono-flotante");

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const posY = scrollY + windowHeight / 2;
    icono.style.top = posY + "px";
  });
});
