<template>
  <el-carousel :interval="4000" class="banner-carousel" type="card">
    <el-carousel-item :key="banner.scm" v-for="banner in banners">
      <img
        :src="$utils.genImgUrl(banner.imageUrl, 1000, 400)"
        class="banner-img"
        :alt="banner.typeTitle"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getBanner } from "@/api";

interface Banners {
  scm: string;
  imageUrl: string;
  typeTitle: string;
}

@Component({
  name: "Banner"
})
export default class Banner extends Vue {
  private banners: Banners[] = [];

  async created() {
    let data: any = await getBanner();
    let { banners } = data;
    this.banners = banners;
  }
}
</script>

<style lang="scss" scoped>
.banner-carousel {
  ::v-deep .el-carousel__container {
    height: 200px;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
</style>
