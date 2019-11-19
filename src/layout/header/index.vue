<template>
  <div class="header">
    <div class="left"></div>
    <div class="right">
      <Theme />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Theme from "./components/theme.vue";

@Component({
  name: "layout-header",
  components: {
    Theme
  }
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;
}
.right {
  display: flex;
  align-items: center;
}
</style>
