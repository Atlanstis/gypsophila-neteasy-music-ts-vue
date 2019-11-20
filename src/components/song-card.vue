<template>
  <div class="song-card">
    <div class="order-wrap">
      <span class="order">{{ $utils.pad(order) }}</span>
    </div>
    <div class="img-wrap">
      <img
        :src="$utils.getImgUrl($utils.getImgUrl(img, 120), 120)"
        :alt="name"
      />
      <PlayIcon class="play-icon" />
    </div>
    <div class="song-content">
      <p class="song-name">{{ name }}</p>
      <p class="singer">{{ artistsText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "SongCard"
})
export default class SongCard extends Vue {
  @Prop({ default: 0 })
  private order!: number;

  @Prop({ default: "" })
  private name!: string;

  @Prop({ default: "" })
  private img!: string;
  @Prop({ default: "" })
  private artistsText!: string;
}
</script>

<style lang="scss" scoped>
.song-card {
  display: flex;
  padding: 8px;
  font-size: $font-size-sm;
  cursor: pointer;

  div {
    flex-shrink: 0;
  }

  &:hover {
    background: var(--light-bgcolor);

    .img-wrap {
      .play-icon {
        opacity: 1;
      }
    }
  }

  .order-wrap {
    @include flex-center();
    width: 30px;
    margin-right: 8px;
  }

  .img-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;
    img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }

    .play-icon {
      @include abs-center;
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .song-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    overflow: hidden;

    .song-name {
      @include text-ellipsis;
      color: var(--font-color-white);
    }

    .singer {
      @include text-ellipsis;
    }
  }
}
</style>
