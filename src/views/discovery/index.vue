<template>
  <div class="discovery">
    <div class="discovery-content">
      <Banner />
      <NewPlaylists />
      <NewSongs />
      <NewMvs />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Banner from "./banner.vue";
import NewPlaylists from "./new-playlists.vue";
import NewSongs from "./new-songs.vue";
import NewMvs from "./new-mvs.vue";

@Component({
  name: "Discovery",
  components: { Banner, NewPlaylists, NewSongs, NewMvs }
})
export default class Discovery extends Vue {}
</script>

<style lang="scss" scoped>
.discovery {
  padding: 18px 32px;
}
</style>
