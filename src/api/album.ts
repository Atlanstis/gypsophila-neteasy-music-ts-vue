import request from "@/utils/axios";
import { RequestParams } from "@/types/interface/system";

/**
 * 传入专辑 id, 可获得专辑内容
 * 必选参数 : id: 专辑 id
 */
export const getAlbum = (params: RequestParams | number) => {
  if (typeof params === "number") {
    params = {
      id: params
    };
  }
  return request({
    url: "/album",
    params
  }) as any;
};
