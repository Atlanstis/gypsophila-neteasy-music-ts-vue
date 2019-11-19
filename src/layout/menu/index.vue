<template>
  <div class="menu">
    <div class="menu-wrap">
      <div
        class="menu-block"
        :key="index"
        v-for="(menu, index) in menusWithPlaylist"
      >
        <ul class="menu-list">
          <router-link
            v-for="(item, childIndex) in menu.children"
            :key="childIndex"
            :to="item.path"
            active-class="menu-item-active"
            class="menu-item"
            tag="li"
          >
            <Icon :size="16" :type="item.meta.icon" class="iconfont" />
            <span class="menu-title">{{ item.meta.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { menuRoutes } from "@/router";
@Component({
  name: "Menu"
})
export default class Menu extends Vue {
  private menus = [
    {
      children: menuRoutes
    }
  ];
  private get menusWithPlaylist() {
    return this.menus;
  }
}
</script>

<style lang="scss">
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);

  .menu-wrap {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-list {
        .menu-item {
          @include text-ellipsis;
          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bg);

            i {
              color: $theme-color;
            }
          }

          .iconfont {
            font-size: $font-size-medium-sm;
          }

          .menu-title {
            display: inline-block;
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
