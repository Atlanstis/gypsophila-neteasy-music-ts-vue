<template>
  <div class="theme">
    <el-popover placement="top" v-model="visible" width="230">
      <div class="themes">
        <div
          v-for="(themeValue, themeKey, index) of themeMap"
          :key="index"
          @click="changeTheme(themeKey)"
          class="theme-item"
        >
          <div :style="themeValue.style" class="theme-icon"></div>
          <p>{{ themeValue.title }}</p>
        </div>
      </div>
      <Icon type="skin" :backdrop="true" slot="reference" />
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { themeMap, changeTheme } from "@/utils/theme";
import { ThemeEnum } from "../../../types/enums/system";

@Component({
  name: "theme",
  components: {}
})
export default class Theme extends Vue {
  private visible = false;
  private themeMap = themeMap;

  changeTheme(themeKey: ThemeEnum) {
    changeTheme(themeKey);
  }
}
</script>

<style lang="scss" scoped>
.theme {
  ::v-deep i {
    color: var(--header-font-color);
  }
}
.themes {
  @include flex-center();

  .theme-item {
    @include flex-center();
    flex-direction: column;
    margin: 0 8px;
    cursor: pointer;

    .theme-icon {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}
</style>
