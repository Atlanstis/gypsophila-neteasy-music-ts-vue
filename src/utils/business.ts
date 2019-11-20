import {
  ArtistsInterface,
  NomaizedSongInterface
} from "@/types/interface/business";

export function createSong(song: {
  [key: string]: any;
}): NomaizedSongInterface {
  const {
    id,
    name,
    img,
    artists,
    duration,
    albumId,
    albumName,
    mvId,
    ...rest
  } = song;

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(song.id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    ...rest
  };
}

function genSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function genArtistisText(artists: ArtistsInterface[]) {
  return (artists || []).map(({ name }) => name).join("/");
}
