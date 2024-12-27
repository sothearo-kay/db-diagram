<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as go from "gojs";

interface Props {
  nodeDataArray: { key: number; text: string; color: string }[];
  linkDataArray: { from: number; to: number }[];
}

interface Emits {
  (e: "ExternalObjectsDropped", diagramEvent: go.DiagramEvent): void;
  (e: "SelectionMoved", diagramEvent: go.DiagramEvent): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const diagram = ref<Element | null>(null);

onMounted(() => {
  if (!diagram.value) return;

  const $ = go.GraphObject.make;

  const myDiagram = new go.Diagram(diagram.value, {
    "undoManager.isEnabled": true,
  });

  myDiagram.addDiagramListener("ExternalObjectsDropped", (e) =>
    emit("ExternalObjectsDropped", e),
  );

  myDiagram.addDiagramListener("SelectionMoved", (e) =>
    emit("SelectionMoved", e),
  );

  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(go.Shape, { fill: "white" }, new go.Binding("fill", "color")),
    $(go.TextBlock, { margin: 8 }, new go.Binding("text")),
  );

  myDiagram.linkTemplate = $(
    go.Link,
    {
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,
    },
    $(go.Shape),
    $(go.Shape, { toArrow: "OpenTriangle" }),
  );

  const nda = props.nodeDataArray;
  const lda = props.linkDataArray;
  myDiagram.model = new go.GraphLinksModel(nda, lda);
});
</script>

<template>
  <div ref="diagram" class="h-[400px] w-[400px] border"></div>
</template>
