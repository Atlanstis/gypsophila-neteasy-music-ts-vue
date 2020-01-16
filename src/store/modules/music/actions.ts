import { Commit, Dispatch } from "vuex";
import { NomaizedSongInterface } from "@/types/interface/business";
import { getSongImg, checkCanPlay, notify } from "@/utils";
import { MusicState } from "./interface";

const actions = {
  /**
   * 整合歌曲信息，并且播放音乐
   */
  async startSong(
    context: { commit: Commit; state: MusicState.State; dispatch: Dispatch },
    rawSong: NomaizedSongInterface
  ) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong);
    if (!song.img && song.albumId) {
      song.img = await getSongImg(song.id, song.albumId);
    }
    context.commit("setCurrentSong", song);
    context.commit("setPlayingState", true);
    // 处理历史记录
    const { playHistory } = context.state;
    const playHistoryTemp = playHistory.slice();
    const findedIndex = playHistoryTemp.findIndex(({ id }) => song.id === id);
    if (findedIndex !== -1) {
      playHistoryTemp.splice(findedIndex, 1);
    }
    playHistoryTemp.unshift(song);
    const maxLength = 100;
    if (playHistoryTemp.length > maxLength) {
      playHistoryTemp.splice(maxLength);
    }
    context.commit("setPlayHistory", playHistoryTemp);
    // 校验能否播放
    const canPlay = await checkCanPlay(song.id);
    if (!canPlay) {
      notify(`${song.name}播放失败`);
      context.dispatch("clearCurrentSong");
    }
  },

  /**
   * 清除当前播放信息
   */
  clearCurrentSong(context: { commit: Commit }) {
    context.commit("setCurrentSong", {});
    context.commit("setPlayingState", false);
    context.commit("setCurrentTime", 0);
  }
};

export default actions;
