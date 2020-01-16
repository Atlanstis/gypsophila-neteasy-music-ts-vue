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
          @click.native="clickSongHandle(listIndex, index)"
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
import { namespace } from "vuex-class";

const songsLimit = 10;
const musicModule = namespace("music");

@Component({
  name: "NewSongs",
  components: { SongCard }
})
export default class NewSongs extends Vue {
  @musicModule.Action("startSong") startSong!: Function;

  private list: SongInterface[] = [];
  private chunkLimit = Math.ceil(songsLimit / 2);

  private get thunkedList() {
    return [
      this.list.slice(0, this.chunkLimit),
      this.list.slice(this.chunkLimit, this.list.length)
    ];
  }

  private get normalizedSongs() {
    return this.list.map(song => this.nomalizeSong(song));
  }

  async created() {
    const { result } = (await getNewSongs()) as any;
    this.list = result;
  }

  /**
   * 获取歌曲顺序，从1开始
   */
  getSongOrder(listIndex: number, index: number) {
    return this.chunkLimit * listIndex + index + 1;
  }

  clickSongHandle(listIndex: number, index: number) {
    const songOringinIndex = this.getSongOrder(listIndex, index) - 1;
    const nomalizedSong = this.normalizedSongs[songOringinIndex];
    this.startSong(nomalizedSong);
  }

  nomalizeSong(song: SongInterface) {
    const {
      id,
      name,
      song: {
        mvid,
        artists,
        album: { blurPicUrl, id: albumId, name: albumName },
        duration
      }
    } = song;

    return createSong({
      id,
      name,
      img: blurPicUrl,
      artists,
      duration,
      mvId: mvid,
      albumId,
      albumName
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
