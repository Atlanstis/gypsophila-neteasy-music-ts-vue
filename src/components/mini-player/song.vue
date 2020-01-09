<template>
  <div class="song">
    <div class="img-wrap">
      <div class="mask"></div>
      <img
        alt="test"
        :src="
          $utils.genImgUrl(
            'https://p1.music.126.net/UmoXRu8E_rBA_gE3hDU7Fg==/109951164511893184.jpg',
            80
          )
        "
      />
      <div class="player-control">
        <Icon :size="20" :type="playControlIcon" color="white" />
      </div>
    </div>
    <div class="content">
      <div class="top">
        <p class="name">光の道標</p>
        <p class="split">-</p>
        <p class="artists">鹿乃</p>
      </div>
      <div class="time">
        <span class="played-time">04:29</span>
        <span class="split">/</span>
        <span class="total-time">05:06</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

enum PlayControl {
  Expand = "expand",
  narrow = "narrow"
}

@Component({
  name: "Song",
  components: {}
})
export default class Song extends Vue {
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
