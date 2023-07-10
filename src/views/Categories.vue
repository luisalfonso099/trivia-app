<script setup>
import { ref, onMounted  } from 'vue'


// defineProps({
//   msg: String,
// })

const count = ref(0);
let alertValidate = ref(false);
let errorMesagges = ref('');
let categories = ref([]);
let dataDECategorias = [];
const difficulty = ['Any Difficulty', 'Easy','Medium','Hard'];
const types = [
  {
    name : 'Any Type',
    value : 'all',
  }, 
  {
    name : 'Multiple Choice',
    value : 'multiple',
  },
  {
    name : 'True / False',
    value : 'boolean',
  }];
const numberQuestions = ref(10);
let categorySelect = ref('');
const levelDificult = ref(difficulty[0]);
const typeQuiz = ref(types[0]);

const loadCategories = async () => {
    try {
        const triviaDB = 'https://opentdb.com/api_category.php'
        const preguntas = 'https://opentdb.com/api_count.php?category=23'
        const completa = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple'
        // const curl  = "https://quizapi.io/api/v1/questions?apiKey=o9UoE6r8hWtOVJMjpyom4WfURn7NvMnRcVvca0mt&limit=10";
        // const categ = 'https://quizapi.io/api/v1/categories?apiKey=o9UoE6r8hWtOVJMjpyom4WfURn7NvMnRcVvca0mt&limit=10'
        const resp = await fetch(triviaDB);
        let data = await resp.json();
        categories.value = data.trivia_categories
        dataDECategorias = structuredClone(data.trivia_categories)
        categorySelect.value = categories.value[0];

    } catch (error) {
        console.log('Algo salio mal al traer las categorias...', error);
    }
}

const startGame = () => {
      alertValidate.value = false;
      const regexNumberQuestions = /^(?:[1-9]|[1-4][0-9]|50)$/;

      if(!regexNumberQuestions.test(numberQuestions.value)){
        alertValidate.value = true;
        errorMesagges.value = 'The maximum value of questions per test is 50'
        return

      }

      console.log('categories',categories.value);
      console.log('dataDECategorias',dataDECategorias);
      console.log('categorySelect',categorySelect.value);

      if(!categories.value.includes(categorySelect.value)){
        alertValidate.value = true;
        errorMesagges.value = 'Estas poniendo categorias que no exixten cheeeeee';
        return
      }

      // console.log(numberQuestions);
      // console.log(categorySelect.value);
      // console.log(levelDificult.value);
      // console.log(typeQuiz);
}

onMounted(async()=>{
    await loadCategories();
    console.log(categorySelect);

})

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
          <select class="select select-bordered w-full max-w-xs" v-model="typeQuiz.name">
            <option v-for="type in types" :key="type.value">{{type.name}}</option>
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
