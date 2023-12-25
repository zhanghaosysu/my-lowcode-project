import { createPinia } from "pinia";
import { createApp, defineAsyncComponent } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import router from "./router/index";
import App from "./App.vue";
import "./styles/reset.scss"; // 全局属性
import "./styles/globa.scss";
import "./styles/animateIn.scss"; // 全局属性 进入动画
import "./styles/animateOut.scss"; // 全局属性 消失动画

let app: any;
// 自定义组件
const components = ["VText", "Picture", "RectShape"];

const loadApp = () => {
  app = createApp(App);

  // 按需加载自定义组件
  components.forEach((key) => {
    app.component(
      key,
      defineAsyncComponent(() =>
        import(`./custom-component/${key}/Component.vue`)
      )
    );
    app.component(
      key + "Attr",
      defineAsyncComponent(() => import(`./custom-component/${key}/Attr.vue`))
    );
  });

  app.use(ElementPlus);
  app.use(router);
  app.use(createPinia());
};

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  loadApp();
  app.mount("#app");
} else {
  renderWithQiankun({
    mount(props) {
      console.log('vitemount----');
      loadApp();
      app.mount(
        (props.container
          ? props.container.querySelector("#app")
          : document.getElementById("app")) as Element
      );
    },
    bootstrap() {
      console.log("--bootstrap");
    },
    update() {
      console.log("--update");
    },
    unmount() {
      console.log("--unmount");
      app?.unmount();
    },
  });
}
