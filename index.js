// CARRUSEL
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
let index = 0;

if (track && prevButton && nextButton) {
  const slides = track.querySelectorAll('img');
  const totalSlides = slides.length;

  nextButton.addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // Cambio automático cada 4 segundos
  setInterval(() => {
    index = (index + 1) % totalSlides;
    updateCarousel();
  }, 4000);
}



const preguntas = [
  {
    pregunta: "¿Qué provincia tiene mayor contaminación por plomo?",
    opciones: ["La Rioja", "Buenos Aires", "Santa Fe", "Córdoba"],
    correcta: "La Rioja",
    imagen: "img/argentina.png",
    info: "La Rioja: contaminación por plomo y metales pesados debido a la minería. Afecta la salud de las comunidades cercanas."
  },
  {
    pregunta: "¿Dónde hay más residuos plásticos en la costa?",
    opciones: ["Mar del Plata", "Rosario", "Buenos Aires", "Bahía Blanca"],
    correcta: "Mar del Plata",
    imagen: "img/argentina.png",
    info: "Mar del Plata: altos niveles de residuos plásticos en playas y agua, afectando fauna marina y turismo."
  },
  {
    pregunta: "¿Qué región tiene más contaminación del aire por industria?",
    opciones: ["Salta", "Neuquén", "Córdoba", "Santa Cruz"],
    correcta: "Córdoba",
    imagen: "img/argentina.png",
    info: "Córdoba: contaminación atmosférica elevada por emisiones industriales y tráfico vehicular, afectando salud respiratoria."
  },
  {
    pregunta: "¿Dónde se encuentran basurales a cielo abierto más problemáticos?",
    opciones: ["Rosario", "Gran Buenos Aires", "Mendoza", "Neuquén"],
    correcta: "Gran Buenos Aires",
    imagen: "img/argentina.png",
    info: "Gran Buenos Aires: basurales a cielo abierto producen lixiviados y gases tóxicos que contaminan aire, suelo y agua."
  },
  {
    pregunta: "¿Qué zona tiene mayor contaminación de ríos por minería?",
    opciones: ["La Rioja", "Delta del Paraná", "Santa Fe", "Veladero (San Juan)"],
    correcta: "Veladero (San Juan)",
    imagen: "img/argentina.png",
    info: "Veladero (San Juan): minería a cielo abierto genera derrames de cianuro y contaminantes que afectan ríos y suelos."
  }
];

let indice = 0;
let puntaje = 0; // Variable para contar respuestas correctas

function mostrarPregunta() {
  const pregunta = preguntas[indice];
  document.getElementById("pregunta").textContent = pregunta.pregunta;
  document.getElementById("imagen-pregunta").src = pregunta.imagen;
  document.getElementById("resultado").textContent = "";
  document.getElementById("info-provincia").textContent = "";
  document.getElementById("siguiente").style.display = "none";

  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  pregunta.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.className = "btn-opcion";
    btn.addEventListener("click", () => seleccionarOpcion(opcion));
    opcionesDiv.appendChild(btn);
  });
}

function seleccionarOpcion(opcion) {
  const preguntaActual = preguntas[indice];
  const correcta = preguntaActual.correcta;
  const resultado = document.getElementById("resultado");
  const info = document.getElementById("info-provincia");
  const botones = document.querySelectorAll(".btn-opcion");

  botones.forEach(b => {
    b.disabled = true;
    if (b.textContent === correcta) {
      b.style.backgroundColor = "#00ff88"; // verde
      b.style.color = "#000";
    } else if (b.textContent === opcion) {
      b.style.backgroundColor = "#ff4444"; // rojo
      b.style.color = "#fff";
    }
  });

  if (opcion === correcta) {
    resultado.textContent = "✅ Correcto!";
    resultado.style.color = "#00ff88";
    puntaje++; // Incrementar puntaje
  } else {
    resultado.textContent = `❌ Incorrecto! La respuesta correcta es: ${correcta}`;
    resultado.style.color = "#ff4444";
  }

  info.textContent = preguntaActual.info;
  document.getElementById("siguiente").style.display = "inline-block";
}

document.getElementById("siguiente").addEventListener("click", () => {
  indice++;
  if (indice < preguntas.length) {
    mostrarPregunta();
  } else {
    // Mostrar puntaje final
    document.getElementById("quiz-container").innerHTML = `
      <h3>¡Terminaste el quiz! 🌿</h3>
      <p>Acertaste ${puntaje} de ${preguntas.length} preguntas.</p>
    `;
  }
});

mostrarPregunta();
