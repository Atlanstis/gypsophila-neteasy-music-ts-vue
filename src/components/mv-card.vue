<template>
  <div class="mv-card">
    <div class="img-wrap">
      <img :src="$utils.genImgUrl(card.picUrl, 500, 260)" :alt="card.name" />
      <div class="play-count-wrap" v-if="card.playCount">
        <Icon type="play" />
        {{ $utils.formatNumber(card.playCount) }}
      </div>
      <div class="play-icon-wrap">
        <PlayIcon :size="48" class="play-icon" />
      </div>
      <div class="duration-wrap" v-if="card.duration">
        {{ $utils.formatTime(card.duration / 1000) }}
      </div>
    </div>
    <p class="name" v-if="card.name">{{ card.name }}</p>
    <p class="author" v-if="card.artistName">{{ card.artistName }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { MvsCardInterface } from "../types/interface/card";

@Component({
  name: "MvCard"
})
export default class MvCard extends Vue {
  @Prop({ default: {} })
  private card!: MvsCardInterface;
}
</script>

<style lang="scss" scoped>
.mv-card {
  min-width: 140px;
  cursor: pointer;

  .img-wrap {
    position: relative;
    padding-top: 56%;

    img {
      @include abs-stretch();
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    .play-icon-wrap {
      @include abs-stretch;

      &:hover {
        .play-icon {
          opacity: 1;
        }
      }

      .play-icon {
        @include abs-center;

        opacity: 0;
        transition: opacity 0.3s;
      }
    }

    .play-count-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: $font-size-sm;
      color: $white;

      i {
        display: inline-block;
        margin-right: 4px;
      }
    }

    .duration-wrap {
      position: absolute;
      right: 2px;
      bottom: 2px;
      font-size: $font-size-sm;
      color: $white;
    }
  }

  .name {
    margin-top: 8px;
    @include text-ellipsis;
    font-size: $font-size-sm;
  }

  .author {
    margin-top: 4px;
    @include text-ellipsis;
    font-size: $font-size-sm;
    color: var(--font-color-grey-shallow);
  }
}
</style>
