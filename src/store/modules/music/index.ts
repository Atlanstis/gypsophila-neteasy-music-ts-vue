import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import * as getters from "./getters";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
