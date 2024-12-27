import { createApp } from "vue";
import { basicSetup } from "codemirror";
import App from "./App.vue";
import VueCodemirror from "vue-codemirror";
import "./assets/index.css";

const app = createApp(App);

app.use(VueCodemirror, {
  autofocus: true,
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  placeholder: "Code goes here...",
  extensions: [basicSetup],
});

app.mount("#app");
