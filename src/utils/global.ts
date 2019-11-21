import { Popover, Carousel, CarouselItem } from "element-ui";
import * as utils from "./index";
import Vue from "vue";
// 全局图片错误处理
window.addEventListener(
  "error",
  function(e) {
    const target = e.target as HTMLImageElement; // 当前dom节点
    if (target) {
      const { tagName } = target;
      if (tagName && tagName.toUpperCase() === "IMG") {
        target.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      }
    }
  },
  true
);

const requireComponent = require.context(
  "@/base",
  true,
  /[a-z0-9]+\.(jsx?|vue)$/i
);

export default {
  install(vue: typeof Vue) {
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName =
        componentConfig.default.options.name || componentConfig.default.name;
      if (componentName) {
        vue.component(
          componentName,
          componentConfig.default || componentConfig
        );
      }
    });

    vue
      .use(Popover)
      .use(Carousel)
      .use(CarouselItem);

    vue.prototype.$utils = utils;
  }
};
