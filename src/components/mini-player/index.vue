<template>
  <div class="mini-player">
    <div class="control">
      <Icon :size="24" class="icon" type="prev" />
      <div @click="togglePlaying" class="play-icon">
        <Icon :size="24" :type="playIcon" />
      </div>
      <Icon :size="24" class="icon" type="next" />
    </div>

    <Song />

    <div class="mode">
      <el-popover
        placement="top"
        trigger="hover"
        width="160"
        popper-class="play-mode-popover"
      >
        <p class="play-mode-text">{{ playModeText }}</p>
        <Icon
          :size="20"
          :type="playModeIcon"
          @click.native="playModeChange"
          slot="reference"
          class="mode-item"
        />
      </el-popover>
      <Icon
        :size="20"
        @click="togglePlaylistShow"
        class="mode-item"
        type="playlist"
      />

      <div class="volume">
        <Volume />
      </div>
    </div>

    <div class="progress-bar-wrap">
      <ProgressBar />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { playModeMap } from "@/constants/play-mode";
import Volume from "./volume.vue";
import Song from "./song.vue";

enum PlayingStatus {
  Play = "play",
  Pause = "pause"
}

@Component({
  name: "MiNiPlayer",
  components: { Volume, Song }
})
export default class MiNiPlayer extends Vue {
  private playing = false;

  private playMode = "sequence";

  private get playIcon() {
    return this.playing ? PlayingStatus.Pause : PlayingStatus.Play;
  }

  private get curMode() {
    return playModeMap[this.playMode];
  }

  private get playModeIcon() {
    return this.curMode.icon;
  }

  private get playModeText() {
    return this.curMode.name;
  }

  togglePlaylistShow() {}

  playModeChange() {
    const keys = Object.keys(playModeMap);
    const curIndex = keys.findIndex(
      key => playModeMap[key].code === this.playMode
    );
    const nextIndex = (curIndex + 1) % keys.length;
    this.playMode = playModeMap[keys[nextIndex]].code;
  }

  togglePlaying() {
    this.playing = !this.playing;
  }
}
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  z-index: $mini-player-z-index;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 16px;
  padding-right: 24px;
  background: var(--body-bgcolor);

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 45px;
      height: 45px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }

      .icon-play {
        transform: translateX(2px);
      }

      .icon-pause {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 6;

    .mode-item {
      display: block;
      margin-right: 16px;
      width: 22px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}
</style>

<style lang="scss">
.play-mode-popover {
  .play-mode-text {
    text-align: center;
  }
}
</style>