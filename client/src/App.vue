<template>
   <ToDo/>
</template>

<script>
import ToDo from './components/todoApp.vue';
export default{
  name:"App",
  components:{
    ToDo,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
}
</style>
