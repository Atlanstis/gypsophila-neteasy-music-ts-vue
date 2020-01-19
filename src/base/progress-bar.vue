<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
        <div :class="{ show: alwaysShowBtn }" class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
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

  @Prop({ default: 0 })
  private percent!: number;

  @Prop({ default: false })
  private draggable!: boolean;

  private progressBar!: HTMLElement;

  @Watch("percent")
  onPercentWatch(newVal: number) {
    this.setProgressOffset(newVal);
  }

  mounted() {
    if (this.percent > 0) {
      this.setProgressOffset(this.percent);
    }
    this.progressBar = this.$refs.progressBar as HTMLElement;
    if (this.progressBar) {
      if (this.draggable) {
        this.progressBar.addEventListener("mousedown", this.mousedownHandle);
      } else {
        this.progressBar.addEventListener("click", this.progressClick);
      }
    }
  }

  beforeDestroy() {
    if (this.progressBar) {
      if (this.draggable) {
        this.progressBar.removeEventListener("mousedown", this.mousedownHandle);
      } else {
        this.progressBar.removeEventListener("click", this.progressClick);
      }
    }
  }

  private mousedownHandle(e: MouseEvent) {
    this.mousemoveHandle(e);
    window.addEventListener("mousemove", this.mousemoveHandle);
    window.addEventListener("mouseup", this.mouseupHandle);
  }

  private mousemoveHandle(e: MouseEvent) {
    this.progressClick(e);
  }

  private mouseupHandle(e: MouseEvent) {
    window.removeEventListener("mousemove", this.mousemoveHandle);
    window.removeEventListener("mouseup", this.mouseupHandle);
  }

  private setProgressOffset(percent: number) {
    const barWidth = (this.$refs.progressBar as HTMLElement).clientWidth;
    const offsetWidth = percent * barWidth;
    this._offset(offsetWidth);
  }

  private progressClick(event: MouseEvent) {
    if (!this.disabled) {
      const $progressBar = this.$refs.progressBar as HTMLElement;
      const rect = $progressBar.getBoundingClientRect();
      const offsetWidth = Math.max(
        0,
        Math.min(event.pageX - rect.left, $progressBar.clientWidth)
      );
      this._offset(offsetWidth);
      this._triggerPercent();
    }
  }

  private _triggerPercent() {
    this.$emit("percentChange", this._getPercent());
  }

  private _getPercent() {
    const barWidth = (this.$refs.progressBar as HTMLElement).clientWidth;
    let percent = (this.$refs.progress as HTMLElement).clientWidth / barWidth;
    return Number(percent.toFixed(2));
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
