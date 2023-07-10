<script setup>
import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

const count = ref(0)

const getCuestions = async () => {
  const triviaDB = 'https://opentdb.com/api_category.php'
  const preguntas = 'https://opentdb.com/api_count.php?category=23'
  const completa = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple'

  // const curl  = "https://quizapi.io/api/v1/questions?apiKey=o9UoE6r8hWtOVJMjpyom4WfURn7NvMnRcVvca0mt&limit=10";
  // const categ = 'https://quizapi.io/api/v1/categories?apiKey=o9UoE6r8hWtOVJMjpyom4WfURn7NvMnRcVvca0mt&limit=10'
  const resp = await fetch(triviaDB);
  const data = await resp.json();
  console.log('Data', data);
}

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
            <span class="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" class="input input-bordered" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" class="input input-bordered" />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>
