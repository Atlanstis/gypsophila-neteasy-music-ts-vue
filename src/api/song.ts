import request from "@/utils/axios";

/**
 * 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
 * @param id 歌曲id
 */
export const getSongUrl = (id: number) =>
  request({
    url: "/song/url",
    params: { id }
  }) as any;
