import ThemeFile from "@/style/themes/theme";
import { ThemeEnum } from "@/types/enums/system";
import variables from "@/style/themes/variables";
import variablesWhite from "@/style/themes/variables-white";
import variablesRed from "@/style/themes/variables-red";

interface ThemeMap {
  [key: string]: ThemeMapItem;
}

interface ThemeMapItem {
  title: string;
  file: ThemeFile;
  style: {
    [key: string]: string;
  };
}
const themeMap: ThemeMap = {
  [ThemeEnum.White]: {
    title: "浅色",
    file: variablesWhite,
    style: {
      backgroundColor: "#F6F6F6",
      border: "1px solid #EBEAEA"
    }
  },
  [ThemeEnum.Dark]: {
    title: "深色",
    file: variables,
    style: {
      backgroundColor: "#202020"
    }
  },
  [ThemeEnum.Red]: {
    title: "红色",
    file: variablesRed,
    style: {
      backgroundColor: "#D33A31"
    }
  }
};

function setDefaultTheme() {
  changeTheme(ThemeEnum.White);
}

function changeTheme(themeKey: ThemeEnum) {
  const theme = themeMap[themeKey].file;
  Object.keys(theme).forEach(key => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
}

export { ThemeMap, themeMap, changeTheme, setDefaultTheme };
