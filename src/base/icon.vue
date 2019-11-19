<script lang="tsx">
import { Component, Vue, Prop } from "vue-property-decorator";
interface RetStyle {
  fontSize: string;
  transform?: string;
}

@Component({
  name: "Icon"
})
export default class Icon extends Vue {
  @Prop({ required: true })
  private type!: string;

  @Prop({ default: 16 })
  private size!: number;

  @Prop({ default: false })
  private backdrop!: boolean;

  protected render() {
    const Icon = (
      <i
        class={`iconfont icon-component icon-${this.type}`}
        style={this.getIconStyle()}
      />
    );
    if (this.backdrop) {
      const backDropSizeRatio = 1.56;
      const backDropSize = `${this.size * backDropSizeRatio}px`;
      return (
        <span
          style={{ width: backDropSize, height: backDropSize }}
          class="backdrop"
        >
          {Icon}
        </span>
      );
    }
    return Icon;
  }

  getIconStyle() {
    const chromeMinSize = 12;
    let retStyle: RetStyle = {
      fontSize: `${this.size}px`
    };
    if (this.size < chromeMinSize) {
      const ratio = this.size / chromeMinSize;
      retStyle.transform = `scale(${ratio})`;
    }
    return retStyle;
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  display: inline-block;
  @include flex-center;
  border-radius: 50%;

  &:hover {
    background: var(--round-hover-bgcolor);
  }
}
.iconfont {
  color: var(--header-font-color);
}
.icon-component {
  cursor: pointer;
}
</style>
