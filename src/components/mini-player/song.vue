<template>
  <div class="song">
    <div class="img-wrap">
      <div class="mask"></div>
      <img alt="test" :src="$utils.genImgUrl(currentSong.img, 80)" />
      <div class="player-control">
        <Icon :size="20" :type="playControlIcon" color="white" />
      </div>
    </div>
    <div class="content">
      <div class="top">
        <p class="name">{{ currentSong.name }}</p>
        <p class="split">-</p>
        <p class="artists">{{ currentSong.artistsText }}</p>
      </div>
      <div class="time">
        <span class="played-time">{{ $utils.formatTime(currentTime) }}</span>
        <span class="split">/</span>
        <span class="total-time">{{
          $utils.formatTime(currentSong.duration / 1000)
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, namespace } from "vuex-class";
import { NomaizedSongInterface } from "../../types/interface/business";

enum PlayControl {
  Expand = "expand",
  narrow = "narrow"
}

const musicModule = namespace("music");

@Component({
  name: "Song"
})
export default class Song extends Vue {
  @musicModule.State(state => state.currentSong)
  currentSong!: NomaizedSongInterface;
  @musicModule.State(state => state.currentTime) currentTime!: number;

  private get playControlIcon() {
    return PlayControl.Expand;
  }
}
</script>

<style lang="scss" scoped>
.song {
  display: flex;
  flex: 4;
  overflow: hidden;

  .img-wrap {
    position: relative;
    margin-right: 8px;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    @include img-wrap(40px);

    img {
      filter: blur(2px);
    }

    .player-control {
      @include abs-center;
    }

    .mask {
      @include abs-stretch;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .top {
      display: flex;
      align-items: flex-end;
      white-space: nowrap;

      .name {
        color: var(--font-color-white);
        @include text-ellipsis;
      }

      .split {
        font-size: $font-size-xs;
        margin: 0 4px;
      }

      .artists {
        font-size: $font-size-xs;
        @include text-ellipsis;
      }
    }

    .time {
      font-size: $font-size-xs;
      color: var(--font-color-grey);

      .split {
        margin: 0 4px;
      }
    }
  }
}
</style>
