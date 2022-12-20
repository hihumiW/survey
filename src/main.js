import { createApp, h } from "vue";
import { NMessageProvider } from "naive-ui";
import { VueQueryPlugin } from "vue-query";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import "vfonts/Lato.css";

const AppWrapper = () => {
  return h(NMessageProvider, () => [h(App)]);
};

const app = createApp(AppWrapper);
const vueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  },
};
app.use(router).use(VueQueryPlugin, vueQueryPluginOptions).mount("#app");
