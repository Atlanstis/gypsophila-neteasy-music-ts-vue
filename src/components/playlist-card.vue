<template>
  <div class="playlist-card">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(card.picUrl, 300)" :alt="card.name" />
      <div class="desc-wrap" v-if="card.copywriter">
        <span class="desc">{{ card.copywriter }}</span>
      </div>
      <PlayIcon :size="36" class="play-icon" />
    </div>
    <p class="name">{{ card.name }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PlayListCardInterface } from "../types/interface/card";

@Component({
  name: "PlayListCard"
})
export default class PlayListCard extends Vue {
  @Prop({ default: {} })
  private card!: PlayListCardInterface;
}
</script>

<style lang="scss" scoped>
.playlist-card {
  position: relative;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 8px;
    border-radius: 4px;
    overflow: hidden;

    img {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .desc-wrap {
      position: absolute;
      padding: 6px;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);
      transform: translateY(-100%);
      transition: all 0.3s;

      .desc {
        color: $white;
        font-size: $font-size-sm;
      }
    }

    .play-icon {
      opacity: 0;
      position: absolute;
      right: 4px;
      bottom: 4px;
      font-size: 24px;
      transition: all 0.3s;
      color: $white;
    }

    &:hover {
      .desc-wrap {
        transform: translateY(0);
      }

      .play-icon {
        opacity: 1;
      }
    }
  }

  .name {
    font-size: $font-size-sm;
    @include text-ellipsis();
  }
}
</style>
