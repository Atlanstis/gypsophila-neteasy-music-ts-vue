<template>
  <div class="new-songs" v-if="list.length">
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        class="list"
        v-for="(list, listIndex) in thunkedList"
        :key="listIndex"
      >
        <SongCard
          class="song-card"
          :order="getSongOrder(listIndex, index)"
          v-for="(item, index) in list"
          v-bind="nomalizeSong(item)"
          :key="item.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getNewSongs } from "@/api";
import SongCard from "@/components/song-card.vue";
import { SongInterface } from "@/types/interface/business";
import { createSong } from "@/utils";

const songsLimit = 10;
@Component({
  name: "NewSongs",
  components: { SongCard }
})
export default class NewSongs extends Vue {
  private list: SongInterface[] = [];
  private chunkLimit = Math.ceil(songsLimit / 2);

  private get thunkedList() {
    return [
      this.list.slice(0, this.chunkLimit),
      this.list.slice(this.chunkLimit, this.list.length)
    ];
  }

  async created() {
    const { result } = (await getNewSongs()) as any;
    this.list = result;
  }

  getSongOrder(listIndex: number, index: number) {
    return this.chunkLimit * listIndex + index + 1;
  }

  nomalizeSong(song: SongInterface) {
    const {
      id,
      name,
      song: {
        mvid,
        artists,
        album: { blurPicUrl },
        duration
      }
    } = song;

    return createSong({
      id,
      name,
      img: blurPicUrl,
      artists,
      duration,
      mvId: mvid
    });
  }
}
</script>

<style lang="scss" scoped>
.new-songs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
