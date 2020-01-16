import request from "@/utils/axios";
import { RequestParams } from "@/types/interface/system";

/**
 * 获取 banner( 轮播图 ) 数据
 */
export const getBanner = () =>
  request({
    url: "/banner?type=0"
  });

/**
 * 获取推荐歌单
 * 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 */
export const getPersonalized = (params: RequestParams) =>
  request({
    url: "/personalized",
    params
  });

/**
 * 获取推荐新音乐
 */
export const getNewSongs = () =>
  request({
    url: "/personalized/newsong"
  });

/**
 * 获取推荐 mv
 */
export const getPersonalizedMv = () =>
  request({
    url: "/personalized/mv"
  });
