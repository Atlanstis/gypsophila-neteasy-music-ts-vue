<template>
  <div id="app">
    <Layout />
    <MiNiPlayer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { themeMap, setDefaultTheme } from "@/utils/theme";
import Layout from "@/layout/index.vue";
import MiNiPlayer from "@/components/mini-player.vue";

@Component({
  name: "app",
  components: {
    Layout,
    MiNiPlayer
  }
})
export default class App extends Vue {
  created() {
    // 设置主题色
    setDefaultTheme();
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: var(--body-bgcolor);
  font-size: $font-size;
}
</style>
