<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "app",
  components: {}
})
export default class App extends Vue {
  mounted() {}
}
</script>

<style lang="scss"></style>
