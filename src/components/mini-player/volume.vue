<template>
  <div class="volume">
    <Icon
      :size="20"
      class="icon"
      :type="iconType"
      @click.native="toggleVolume"
    />
    <div class="progress-wrap">
      <ProgressBar
        :draggable="true"
        :alwaysShowBtn="true"
        :percent="volumePercent"
        @percentChange="percentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

enum VolumeVoiceEnum {
  mute = "volume_mute",
  large = "volume_up",
  small = "volume_down"
}

@Component({
  name: "Volume"
})
export default class Volume extends Vue {
  @Prop({ default: 1 })
  private volume!: number;

  private volumePercent = this.volume;

  private lastVolume: number = 0;

  /**
   * 是否静音
   */
  private get isMute() {
    return this.volumePercent === 0;
  }

  private set isMute(status) {
    const percent = status ? 0 : this.lastVolume;
    if (status) {
      this.lastVolume = this.volumePercent;
    }
    this.volumePercent = percent;
    this.percentChange(percent);
  }

  private get iconType() {
    return this.isMute
      ? VolumeVoiceEnum.mute
      : this.volumePercent <= 0.5
      ? VolumeVoiceEnum.small
      : VolumeVoiceEnum.large;
  }

  percentChange(percent: number) {
    this.volumePercent = percent;
    this.$emit("volumeChange", percent);
  }

  toggleVolume() {
    this.isMute = !this.isMute;
  }
}
</script>

<style lang="scss" scoped>
.volume {
  display: flex;
  align-items: center;
  width: 150px;

  .icon {
    color: var(--font-color);
    cursor: pointer;
    margin-right: 8px;
  }

  .progress-wrap {
    flex: 1;
  }
}
</style>
