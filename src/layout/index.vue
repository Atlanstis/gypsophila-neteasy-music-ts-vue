<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <div class="layout-menu"><LayoutMenu /></div>
      <div class="content" id="page-content">
        <router-view :class="routerViewCls"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./header/index.vue";
import LayoutMenu from "./menu/index.vue";
import { layoutCenterNames } from "@/router";

@Component({
  name: "layout",
  components: {
    LayoutHeader,
    LayoutMenu
  }
})
export default class Layout extends Vue {
  private get routerViewCls(): string {
    return layoutCenterNames.find(name => name === this.$route.name)
      ? "router-view-center"
      : "";
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  .layout-body {
    display: flex;
    height: calc(100% - #{$header-height});

    .layout-menu {
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
