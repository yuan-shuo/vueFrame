<template>
  <div id="viz" ref="viz" class="neovis-container" :style="styles"></div>
</template>

<script>
import NeoVis from 'neovis.js';

export default {
  name: 'NeovisComponent',
  data() {
    return {
      styles: {
        width: '900px',
        height: '700px',
        border: '1px solid lightgray',
        fontSize: '22pt',
      },
      neovisInstance: null,
    };
  },
  mounted() {
    this.initNeovis();
  },
  methods: {
    initNeovis() {
      const config = {
        containerId: 'viz',
        neo4j: {
          serverUrl: 'bolt://localhost:7687',
          serverUser: 'neo4j',
          serverPassword: '174235',
        },
        initialCypher: 'MATCH (n)-[r]->(m) DETACH DELETE r RETURN n, m',
      };

      this.neovisInstance = new NeoVis(config);
      this.neovisInstance.render();
    },
  },
};
</script>

<style scoped>
.neovis-container {
  font-family: 'Arial', sans-serif;
}
</style>