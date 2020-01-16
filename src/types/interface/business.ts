/**
 * 未格式化前的歌曲接口
 */
export interface SongInterface {
  id: number;
  name: string;
  song: {
    mvid: number;
    artists: ArtistsInterface[];
    album: {
      blurPicUrl: string;
      id: number;
      name: string;
    };
    duration: number;
  };
}

/**
 * 格式化后的歌曲接口
 */
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

/**
 * 作者接口
 */
export interface ArtistsInterface {
  name: string;
}

/**
 * 专辑歌曲接口
 */
export interface AlbumSongInterface {
  id: number;
  al: {
    picUrl: string;
  };
}
