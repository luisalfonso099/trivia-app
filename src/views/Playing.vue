<template>
  <Loading v-if="statusLoading" />

  <div class="context">
    <div class="flex items-center justify-center">
      <div class="card w-1/3 h-auto bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">{{ actualQuiz.question }}</h2>
          <div
            class="card-actions justify-end"
            v-for="answer in actualQuiz.incorrect_answers"
          >
            <button 
            :class="`btn w-full`" 
            @click="respuestaDelJugador(answer)">
            {{ answer }}
            </button>
          </div>
          <progress class="progress progress-info" :value="tiempo" max="1000"></progress>
        </div>
      </div>
    </div>
  </div>

  <div class="area">
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch  } from "vue";
import { dataQuery } from "../store/dataQuery.js";
import Loading from "../components/Loading.vue";

const store = dataQuery();

let statusLoading = ref(true);
let actualQuiz = ref({ question: "lalala" });
let numberQuiz = ref(0);
let tiempo = ref(0);
let allQuiz = ref([]);
let correctAnswer = ref('');
let answerSelect = ref('');
let mostrarRespuesta = ref(false);
let actualIndex = 0;
let intervalProgress =null
let intervalPrincipal = null
const loadQuestions = async () => {
  const { number, category, level, type } = store.getDataQuery;
  const completa = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${level}&type=${type}`;
  const resp = await fetch(completa);
  const data = await resp.json();
  allQuiz.value = data.results;
  numberQuiz.value = number;
};

const timer = (valorMaximo, intervalo)=> {
  let valorActual = 0;
  intervalProgress = setInterval(() => {
    if (valorActual >= valorMaximo) {
      clearInterval(intervalProgress);
    } else {
      valorActual++;
      tiempo.value = valorActual;
    }
  }, intervalo);
};

const setearPreguntas = () => {
  actualQuiz.value = allQuiz.value[actualIndex];
  correctAnswer.value = actualQuiz.value.correct_answer;
  actualQuiz.value.incorrect_answers.push(actualQuiz.value.correct_answer);
  actualQuiz.value.incorrect_answers = shuffleArray(actualQuiz.value.incorrect_answers);
  statusLoading.value = false;
  timer(1000, 10); 

  intervalPrincipal = setInterval(() => {
    clearInterval(intervalProgress);
    actualIndex++;
    if (actualIndex < allQuiz.value.length) {
      actualQuiz.value = allQuiz.value[actualIndex];
      correctAnswer.value = actualQuiz.value.correct_answer;
      actualQuiz.value.incorrect_answers.push(actualQuiz.value.correct_answer);
      actualQuiz.value.incorrect_answers = shuffleArray(actualQuiz.value.incorrect_answers);
    } else {
      clearInterval(intervalPrincipal);
      console.log('No hay más preguntas setearPreguntas');
    }
    timer(1000, 10); 
  }, 10000);
};

const siguientePregunta = () => {
  clearInterval(intervalProgress);
  clearInterval(intervalPrincipal);

  actualIndex++;
  if (actualIndex < allQuiz.value.length) {
    setearPreguntas()
  } else {
    console.log('No hay más preguntas siguientePregunta');
    // No hay más preguntas, puedes mostrar un mensaje o realizar alguna acción adecuada.
  }
};

const respuestaDelJugador = (answer) => {
  answerSelect.value = answer;
  if (answer === correctAnswer.value) {
    setTimeout(siguientePregunta, 1000); // Llama a siguientePregunta después de 1 segundo.
  } else {
    mostrarRespuesta.value = true;
    setTimeout(siguientePregunta, 1000); // Llama a siguientePregunta después de 1 segundo.
  }
};
// Función para mezclar el array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

onMounted(async () => {
  await loadQuestions();
  setearPreguntas();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Exo:400,700");

.context {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
