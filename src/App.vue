<script setup lang="ts">
import { ref } from "vue";
import Diagram from "./components/diagram.vue";

const nda = [
  { key: 1, text: "Alpha", color: "lightblue" },
  { key: 2, text: "Beta", color: "orange" },
  { key: 3, text: "Gamma", color: "lightgreen" },
  { key: 4, text: "Delta", color: "pink" },
];
const lda = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 2 },
  { from: 3, to: 4 },
  { from: 4, to: 1 },
];

const moves = ref(0);
</script>

<template>
  <div class="grid min-h-screen grid-cols-3">
    <!-- Code Editor -->
    <VueCodemirror />

    <!-- Dialog Display -->
    <div class="col-span-2 flex flex-col items-center border-l pt-10">
      <Diagram
        :node-data-array="nda"
        :link-data-array="lda"
        @selection-moved="moves++"
      />
      #moves: {{ moves }}
    </div>
  </div>
</template>
