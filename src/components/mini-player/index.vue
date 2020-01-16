<template>
  <div class="mini-player">
    <div class="control">
      <Icon :size="24" class="icon" type="prev" />
      <div @click="togglePlaying" class="play-icon">
        <Icon :size="24" :type="playIcon" />
      </div>
      <Icon :size="24" class="icon" type="next" />
    </div>

    <Song v-if="hasCurrentSong" />

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
        <Volume :volume="volume" @volumeChange="onVolumeChange" />
      </div>
    </div>

    <div class="progress-bar-wrap">
      <ProgressBar
        :disabled="!hasCurrentSong"
        :percent="playedPercent"
        @percentChange="onProgressChange"
      />
    </div>
    <audio
      :src="currentSong.url"
      @canplay="songReadied"
      @ended="songEnded"
      @timeupdate="updateSongTime"
      ref="audio"
    ></audio>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { playModeMap } from "@/constants/play-mode";
import Volume from "./volume.vue";
import Song from "./song.vue";
import { State, namespace } from "vuex-class";
import { NomaizedSongInterface } from "@/types/interface/business";
import storage from "good-storage";
import { VOLUME_KEY } from "@/constants/storage-key";

enum PlayingStatus {
  Play = "play",
  Pause = "pause"
}

const musicModule = namespace("music");

const DEFAULT_VOLUME = 0.75;

@Component({
  name: "MiNiPlayer",
  components: { Volume, Song }
})
export default class MiNiPlayer extends Vue {
  private songReady: boolean = false;
  private timer: number | null = null;
  private volume: number = storage.get(VOLUME_KEY, DEFAULT_VOLUME);
  /**
   * 播放状态
   */
  @musicModule.State(state => state.playing) playing!: boolean;
  /**
   * 播放模式
   */
  @musicModule.State(state => state.playMode) playMode!: string;
  /**
   * 当前播放歌曲
   */
  @musicModule.State(state => state.currentSong)
  currentSong!: NomaizedSongInterface;
  /**
   * 当前播放时间
   */
  @musicModule.State(state => state.currentTime) currentTime!: number;
  @musicModule.Mutation("setPlayMode") setPlayMode!: Function;
  @musicModule.Mutation("setPlayingState") setPlayingState!: Function;
  @musicModule.Mutation("setCurrentTime") setCurrentTime!: Function;

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

  private get audio() {
    return this.$refs.audio as HTMLMediaElement;
  }

  private get hasCurrentSong() {
    return !!this.currentSong.id;
  }

  /**
   * 歌曲播放百分比
   */
  private get playedPercent() {
    const { durationSecond } = this.currentSong;
    return Math.min(this.currentTime / durationSecond, 1) || 0;
  }

  @Watch("playing")
  onPlayingChange(newPlaying: boolean) {
    this.$nextTick(() => {
      newPlaying ? this.play() : this.pause();
    });
  }

  @Watch("currentSong")
  onCurrentSongChange(
    newSong: NomaizedSongInterface,
    oldSong: NomaizedSongInterface
  ) {
    if (!newSong.id) {
      this.audio.pause();
      this.audio.currentTime = 0;
      return;
    }
    if (oldSong && newSong.id === oldSong.id) {
      // 单曲循环
    }
    this.songReady = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.play();
    }, 1000);
  }

  /**
   * 播放音乐
   */
  async play() {
    if (this.songReady) {
      try {
        await this.audio.play();
      } catch (error) {
        this.setPlayingState(false);
      }
    }
  }
  /**
   * 暂停音乐
   */
  pause() {
    this.audio.pause();
  }

  togglePlaylistShow() {}

  /**
   * 更换播放模式
   */
  playModeChange() {
    const keys = Object.keys(playModeMap);
    const curIndex = keys.findIndex(
      key => playModeMap[key].code === this.playMode
    );
    const nextIndex = (curIndex + 1) % keys.length;
    this.setPlayMode(playModeMap[keys[nextIndex]].code);
  }

  /**
   * 切换播放状态
   */
  togglePlaying() {
    if (!this.currentSong.id) {
      return;
    }
    this.setPlayingState(!this.playing);
  }

  /**
   * 歌曲准备好，可以播放的事件回调
   */
  songReadied() {
    this.songReady = true;
  }

  /**
   * 当前歌曲播放结束
   */
  songEnded() {}

  /**
   * 更新歌曲播放时间
   */
  updateSongTime(e: Event) {
    let target = e.target as HTMLMediaElement;
    this.setCurrentTime(target.currentTime);
  }
  /**
   * 歌曲播放进度变更
   */
  onProgressChange(percent: number) {
    this.audio.currentTime = this.currentSong.durationSecond * percent;
  }

  /**
   * 音量大小变更
   */
  onVolumeChange(volumePercent: number) {
    this.audio.volume = volumePercent;
    storage.set(VOLUME_KEY, volumePercent);
  }

  mounted() {
    this.audio.volume = this.volume;
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
