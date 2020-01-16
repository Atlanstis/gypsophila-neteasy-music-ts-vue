import {
  ArtistsInterface,
  NomaizedSongInterface,
  AlbumSongInterface
} from "@/types/interface/business";
import { isUndefined } from "./common";
import { getAlbum, getSongUrl } from "@/api";

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

/**
 * 从专辑信息中获取歌曲图片
 * @param id 歌曲id
 * @param albumId 歌曲对应专辑id
 */
export async function getSongImg(id: number, albumId: number) {
  if (isUndefined(albumId)) {
    throw new Error("need albumId");
  }
  const data: { songs: AlbumSongInterface[] } = await getAlbum(albumId);
  const { songs } = data;
  const {
    al: { picUrl }
  } = songs.find(({ id: songId }) => songId === id) || { al: { picUrl: "" } };
  return picUrl;
}

function genSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function genArtistisText(artists: ArtistsInterface[]) {
  return (artists || []).map(({ name }) => name).join("/");
}

/**
 * 通过能否获取歌曲 url，判断歌曲能否播放
 * @param id 歌曲id
 */
export async function checkCanPlay(id: number) {
  const { data } = await getSongUrl(id);
  const [resultSong] = data;
  return !!resultSong.url;
}
