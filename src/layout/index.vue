<template>
  <div class="layout"><LayoutHeader /></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LayoutHeader from "./header/index.vue";

@Component({
  name: "layout",
  components: {
    LayoutHeader
  }
})
export default class Layout extends Vue {
  mounted() {}
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
