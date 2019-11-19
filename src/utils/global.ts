import { Popover } from "element-ui";
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

    Vue.use(Popover);
  }
};
