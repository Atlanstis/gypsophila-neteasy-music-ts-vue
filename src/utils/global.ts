import { Popover, Carousel, CarouselItem } from "element-ui";
import * as utils from "./index";

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
  install(Vue: any) {
    // 批量注册base组件
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName);
      const componentName = componentConfig.default.name;
      if (componentName) {
        Vue.component(
          componentName,
          componentConfig.default || componentConfig
        );
      }
    });

    Vue.use(Popover)
      .use(Carousel)
      .use(CarouselItem);

    Vue.prototype.$utils = utils;
  }
};
