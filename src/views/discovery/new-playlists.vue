<template>
  <div class="new-play-lists" v-if="list.length">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlayListCard :card="item" :key="item.id" v-for="item in list" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getPersonalized } from "@/api";
import { PlayListCardInterface } from "@/types/interface/card";
import PlayListCard from "@/components/playlist-card.vue";

@Component({
  name: "NewPlayLists",
  components: { PlayListCard }
})
export default class NewPlayLists extends Vue {
  private list: PlayListCardInterface[] = [];
  async created() {
    const data: any = await getPersonalized({ limit: 10 });
    this.list = data.result;
  }
}
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>
