import request from "@/utils/axios";

interface requestParams {
  [key: string]: string | number;
}

export const getBanner = () =>
  request({
    url: "/banner?type=0"
  });

export const getPersonalized = (params: requestParams) =>
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
