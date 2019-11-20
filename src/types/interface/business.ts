export interface SongInterface {
  id: number;
  name: string;
  song: {
    mvid: number;
    artists: ArtistsInterface[];
    album: {
      blurPicUrl: string;
    };
    duration: number;
  };
}

export interface NomaizedSongInterface {
  id: number;
  name: string;
  img: string;
  artists: ArtistsInterface[];
  duration: number;
  albumName: string;
  url: string;
  artistsText: string;
  durationSecond: number;
  albumId: number;
  mvId: number;
  [key: string]: any;
}

export interface ArtistsInterface {
  name: string;
}
