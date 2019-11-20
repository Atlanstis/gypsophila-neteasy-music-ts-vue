<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div :class="{ show: alwaysShowBtn }" class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { prefixStyle } from "@/utils";

const transform: any = prefixStyle("transform");

@Component({
  name: "ProgressBar"
})
export default class ProgressBar extends Vue {
  @Prop({ default: false })
  private alwaysShowBtn!: boolean;

  @Prop({ default: false })
  private disabled!: boolean;

  private progressClick(event: MouseEvent) {
    if (!this.disabled) {
      const $progressBar = this.$refs.progressBar as HTMLElement;
      const rect = $progressBar.getBoundingClientRect();
      const offsetWidth = Math.max(
        0,
        Math.min(event.pageX - rect.left, $progressBar.clientWidth)
      );
      this._offset(offsetWidth);
    }
  }

  private _offset(offsetWidth: number) {
    let offset = `${offsetWidth}px`;
    (this.$refs.progress as HTMLElement).style.width = `${offset}`;
    (this.$refs.progressBtn as HTMLElement).style[
      transform
    ] = `translate3d(${offset},0,0)`;
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  cursor: pointer;

  .bar-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: var(--progress-bgcolor);

    .progress {
      position: absolute;
      height: 100%;
      background: $theme-color;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        display: none;
        position: relative;
        top: 8px;
        left: 9px;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: $theme-color;

        &.show {
          display: block;
        }
      }
    }
  }

  &:hover {
    .progress-btn {
      display: block !important;
    }
  }
}
</style>
