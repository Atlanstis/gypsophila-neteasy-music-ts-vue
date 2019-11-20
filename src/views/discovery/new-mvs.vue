<template>
  <div class="new-mvs" v-if="mvs.length">
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li class="list-item" v-for="mv in mvs" :key="mv.id">
        <MvCard :card="mv" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MvsCardInterface } from "../../types/interface/card";
import { getPersonalizedMv } from "@/api";
import MvCard from "@/components/mv-card.vue";

@Component({
  name: "NewMvs",
  components: { MvCard }
})
export default class NewMvs extends Vue {
  private mvs: MvsCardInterface[] = [];

  async created() {
    const data: any = await getPersonalizedMv();
    this.mvs = data.result;
  }
}
</script>

<style lang="scss" scoped>
.new-mvs {
  @include list(25%);
}
</style>
