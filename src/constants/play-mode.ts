interface PlayMode {
  code: string;
  icon: string;
  name: string;
}

interface PlayModeMap {
  [key: string]: PlayMode;
}

export const playModeMap: PlayModeMap = {
  sequence: {
    code: "sequence",
    icon: "sequence",
    name: "顺序播放"
  },
  loop: {
    code: "loop",
    icon: "loop",
    name: "单曲循环"
  },
  random: {
    code: "random",
    icon: "random",
    name: "随机播放"
  }
};
