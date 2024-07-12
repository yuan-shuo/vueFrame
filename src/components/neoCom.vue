<template>
  <div>
    <div id="viz"></div>
  </div>
</template>

<script>
import NeoVis from 'neovis.js/dist/neovis.js';

export default {
  name: 'NeoVisExample',
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const config = {
        containerId: "viz",
        neo4j: {
          serverUrl: "bolt://localhost:7687",
          serverUser: "neo4j",
          serverPassword: "174235",
        },
        initialCypher: "MATCH (n)-[r]->(m) RETURN n, m"
      };

      try {
        this.neoViz = new NeoVis(config);
        this.neoViz.render();
      } catch (error) {
        console.error('Error initializing NeoVis:', error);
      }
    }
  }
};
</script>


<style scoped>
html, body {
  font: 16pt arial;
}

#viz {
  width: 900px;
  height: 700px;
  border: 1px solid lightgray;
  font: 22pt arial;
}
</style>
