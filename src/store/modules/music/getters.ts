import { MusicState } from "./interface";

export const currentIndex = (state: MusicState.State) => {
  const { currentSong, playlist } = state;
  return playlist.findIndex(({ id }) => id === currentSong.id);
};
