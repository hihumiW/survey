import { createApp, h } from "vue";
import { NMessageProvider } from "naive-ui";
import "./style.css";
import App from "./App.vue";
import "vfonts/Lato.css";

const AppWrapper = () => {
  return h(NMessageProvider, () => [h(App)]);
};

const app = createApp(AppWrapper);

app.mount("#app");
