<template>
  <div :style="wrapStyle" class="play-icon-wrap">
    <Icon :size="iconSize" class="play-icon" type="play" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "PlayIcon"
})
export default class PlayIcon extends Vue {
  @Prop({ default: 24 })
  private size!: number;

  private get wrapStyle() {
    return { width: `${this.size}px`, height: `${this.size}px` };
  }

  private get iconSize() {
    return Math.round(this.size * 0.5);
  }
}
</script>

<style lang="scss" scoped>
.play-icon-wrap {
  @include flex-center();
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);

  .play-icon {
    color: $theme-color;
  }
}
</style>
