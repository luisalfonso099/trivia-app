<script setup>
import { ref, onMounted } from 'vue';
import eventBus from '../eventBus';


onMounted(() => {
  eventBus.on('startGame', (data) => {
    console.log('datasssss', data);
  });
});
</script>

<template>
  <div class="stack">
    <div class="card shadow-md bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 1</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
    <div class="card shadow bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 2</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
    <div class="card shadow-sm bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Notification 3</h2>
        <p>You have 3 unread messages. Tap here to see.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
