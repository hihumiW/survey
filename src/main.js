import { createApp, defineComponent, computed, h } from "vue";
import {
  NConfigProvider,
  useOsTheme,
  darkTheme,
  NMessageProvider,
  NDialogProvider,
  zhCN,
  dateZhCN,
} from "naive-ui";
import { VueQueryPlugin } from "vue-query";

import "./style.css";
import router from "./router";
import App from "./App.vue";
import "vfonts/Lato.css";

const AppWrapper = defineComponent({
  setup() {
    const osThemeRef = useOsTheme();
    const theme = computed(() =>
      osThemeRef.value === "dark" ? darkTheme : null
    );
    return () =>
      h(
        NConfigProvider,
        { theme: theme.value, locale: zhCN, dateLocale: dateZhCN },
        () => h(NMessageProvider, () => h(NDialogProvider, () => [h(App)]))
      );
  },
});

const render = (props = {}) => {
  const { container } = props;
  const renderContainer = container || "#app";
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
  app
    .use(router)
    .use(VueQueryPlugin, vueQueryPluginOptions)
    .mount(renderContainer);
};

render();

// // some code
// renderWithQiankun({
//   mount(props) {
//     render(props);
//   },
//   bootstrap() {
//     console.log("bootstrap");
//   },
//   unmount(props) {
//     console.log("unmount");
//   },
// });

// if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
//   render({});
// }
