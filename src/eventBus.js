import { reactive } from 'vue';

const eventBus = reactive({});

eventBus.emit = function(event, ...args) {
  this[event]?.forEach(callback => callback(...args));
};

eventBus.on = function(event, callback) {
  if (!this[event]) {
    this[event] = [];
  }
  this[event].push(callback);
};

export default eventBus;
