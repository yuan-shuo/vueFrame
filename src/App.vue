<template>
  <div class="container">
    <button @click="plus">count+1</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>


export default {
  data() {
    return {
      count:1
    }
  },
  methods:{
    plus(){
      this.count += 1
    }
  }
}
</script>

<style>

</style>
