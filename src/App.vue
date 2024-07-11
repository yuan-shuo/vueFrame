<template>  
  <div id="viz"></div>
</template>  
  
<script>  
// 引入neovis.js  
import NeoVis from 'neovis.js/dist/neovis.js';  
  
export default {  
  name: 'Neo4jVisualization',  
  mounted() {  
    this.draw();  
  },  
  methods: {  
    draw() {
        let neoViz;
        const config = {
            containerId: "viz",
            neo4j: {
                serverUrl: "bolt://localhost:7687",
                serverUser: "neo4j",
                serverPassword: "174235",
            },
			initialCypher: "MATCH (n)-[r]->(m) RETURN n, m"
        };

        neoViz = new NeoVis.default(config);
        neoViz.render();
    }
  }  
};  
</script>  
  
<style scoped>  
#viz {  
  width: 900px;  
  height: 700px;  
  border: 1px solid lightgray;  
  font: 22pt arial;  
}  
</style>