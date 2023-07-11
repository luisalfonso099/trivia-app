<script setup>
import { ref, onMounted } from 'vue';
import {dataQuery} from '../store/dataQuery.js';


const store = dataQuery()

let actualQuiz = ref({question : 'lalala'});
let numberQuiz = ref(0);
let allQuiz = ref([]);
let intervalId;
const loadQuestions = async () => {
  const {number,category,level,type} = store.getDataQuery;
  const completa = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${level}&type=${type}`
  const resp = await fetch(completa);
  const data = await resp.json();
  allQuiz.value = data.results
  numberQuiz.value = number;
}

const setearPreguntas = () => {
  let actualIndex = 0;
  actualQuiz.value = allQuiz.value[actualIndex];
  intervalId = setInterval(() => {
      actualIndex ++;

    if(actualIndex < allQuiz.value.length){
      actualQuiz.value = allQuiz.value[actualIndex];
    }else{
      clearInterval(intervalId);
    }
      console.log('interval',actualQuiz.value);


  }, 1000)

}


onMounted(async() => {
    await loadQuestions();
    console.log('aaaa',store.getDataQuery);
  setearPreguntas();

});
</script>

<template>
   <div class="card w-1/3 h-auto bg-primary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">{{actualQuiz.question }}</h2>
    <div class="card-actions justify-end">
      <button class="btn"></button>
    </div>
  </div>
</div>

</template>

<style scoped>

</style>
