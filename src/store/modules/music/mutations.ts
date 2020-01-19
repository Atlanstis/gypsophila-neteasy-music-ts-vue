import storage from "good-storage";
import {
  PLAY_MODE_KEY,
  PLAY_HISTORY_KEY,
  PLAY_LIST_KEY,
  CUR_SONG_KEY
} from "@/constants/storage-key";
import { NomaizedSongInterface } from "@/types/interface/business";
import { MusicState } from "./interface";

const mutations = {
  // 更改播放模式
  setPlayMode(state: MusicState.State, playMode: string) {
    storage.set(PLAY_MODE_KEY, playMode);
    state.playMode = playMode;
  },

  // 设置当前播放歌曲
  setCurrentSong(state: MusicState.State, song: NomaizedSongInterface) {
    storage.set(CUR_SONG_KEY, song);
    state.currentSong = song;
  },

  // 设置播放状态
  setPlayingState(state: MusicState.State, playing: boolean) {
    state.playing = playing;
  },

  // 设置播放历史
  setPlayHistory(
    state: MusicState.State,
    playHistory: NomaizedSongInterface[]
  ) {
    state.playHistory = playHistory;
    storage.set(PLAY_HISTORY_KEY, playHistory);
  },

  // 设置当前播放时间
  setCurrentTime(state: MusicState.State, currentTime: number) {
    state.currentTime = currentTime;
  },

  // 设置播放列表
  setPlaylist(state: MusicState.State, playlist: NomaizedSongInterface[]) {
    storage.set(PLAY_LIST_KEY, playlist);
    state.playlist = playlist;
  }
};

export default mutations;
