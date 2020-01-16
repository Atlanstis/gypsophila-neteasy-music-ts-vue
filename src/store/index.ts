import Vue from "vue";
import Vuex from "vuex";
import musicModule from "./modules/music";
import createLogger from "vuex/dist/logger";
import { NODE_ENV } from "@/constants/global";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== NODE_ENV.PRODUCTION;

export default new Vuex.Store({
  modules: {
    music: musicModule
  },
  plugins: debug ? [createLogger()] : []
});
