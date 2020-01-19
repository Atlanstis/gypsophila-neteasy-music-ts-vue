import { NomaizedSongInterface } from "@/types/interface/business";

declare namespace MusicState {
  export interface State {
    currentSong: NomaizedSongInterface | { id: undefined };
    currentTime: number;
    playing: boolean;
    playMode: string;
    isPlaylistShow: boolean;
    isPlaylistPromptShow: boolean;
    isPlayerShow: boolean;
    playlist: NomaizedSongInterface[];
    playHistory: NomaizedSongInterface[];
    isMenuShow: boolean;
  }
}
