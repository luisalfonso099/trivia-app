<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import eventBus from '../eventBus';

const count = ref(0);
let alertValidate = ref(false);
let errorMesagges = ref('');
let categories = ref([]);
let dataDECategorias = ref([]);
const difficulty = ['Any Difficulty', 'Easy','Medium','Hard'];
const types = ['Any Type','Multiple Choice','True / False'];

const numberQuestions = ref(10);
let categorySelect = ref('');
const levelDificult = ref(difficulty[0]);
const typeQuiz = ref(types[0]);

const router = useRouter(); // Acceder al enrutador

const loadCategories = async () => {
  try {
    const triviaDB = 'https://opentdb.com/api_category.php';
    const resp = await fetch(triviaDB);
    let data = await resp.json();
    categories.value = data.trivia_categories;
    dataDECategorias.value = structuredClone(data.trivia_categories);
    categorySelect.value = categories.value[0];
  } catch (error) {
    console.log('Algo salio mal al traer las categorias...', error);
  }
};

const startGame = () => {
  alertValidate.value = false;
  const regexNumberQuestions = /^(?:[1-9]|[1-4][0-9]|50)$/;
  const regexDificult = /^(?!Any Difficulty$|Easy$|Medium$|Hard$).*$/;
  const regexLevel = /^(?!Any Type$|Multiple Choice$|True \/ False$).*$/;

  if (!regexNumberQuestions.test(numberQuestions.value)) {
    alertValidate.value = true;
    errorMesagges.value = 'The maximum value of questions per test is 50';
    return;
  }
  if (!dataDECategorias.value.some((cat) => cat.name === categorySelect.value.name)) {
    alertValidate.value = true;
    errorMesagges.value = 'You are choosing categories that do not exist';
    return;
  }
  if (regexDificult.test(levelDificult.value)) {
    alertValidate.value = true;
    errorMesagges.value = 'That’s not a valid difficulty';
    return;
  }

  if (regexLevel.test(typeQuiz.value)) {
    alertValidate.value = true;
    errorMesagges.value = 'That’s not a valid quiz';
    return;
  }

  eventBus.emit('startGame', {
    numberQuestions : numberQuestions.value,
    categorySelect : categorySelect.value.name,
    levelDificult: levelDificult.value,
    typeQuiz: typeQuiz.value,
  });
  router.push('/playing');
  console.log('typeQuiz//', typeQuiz.value);
};

onMounted(async () => {
  await loadCategories();
  console.log(categorySelect);
});
</script>


<template>
  <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Number of Questions:</span>
          </label>
          <input v-model="numberQuestions" type="number" placeholder="Number of Questions:" class="input input-bordered" min="1" max="50"/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Categories</span>
          </label>
          <select class="select select-bordered w-full max-w-xs" v-model="categorySelect.name">
            <option v-for="category in categories" :key="category.id">{{category.name}}</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Select Difficulty:</span>
          </label>
          <select class="select select-bordered w-full max-w-xs" v-model="levelDificult">
            <option v-for="level in difficulty">{{level}}</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Select Type:</span>
          </label>
          <select class="select select-bordered w-full max-w-xs" v-model="typeQuiz">
            <option v-for="type in types" >{{type}}</option>
          </select>
        </div>
        <div class="alert alert-warning z-50" v-if="alertValidate">
          <span>Warning: {{errorMesagges}}</span>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" @click="startGame">Start</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
