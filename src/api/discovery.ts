import request from "@/utils/axios";
import { RequestParams } from "@/types/interface/system";

export const getBanner = () =>
  request({
    url: "/banner?type=0"
  });

export const getPersonalized = (params: RequestParams) =>
  request({
    url: "/personalized",
    params
  });

export const getNewSongs = () =>
  request({
    url: "/personalized/newsong"
  });

export const getPersonalizedMv = () =>
  request({
    url: "/personalized/mv"
  });
