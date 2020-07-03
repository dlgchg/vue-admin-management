import Vue from "vue";
import Vuex from "vuex";

import { defaultRoute, asyncRoute } from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    routes: [],
    addRoutes: [],
    roles: "",
  },
  mutations: {
    setRoute: (state, routes) => {
      state.routes = defaultRoute.concat(routes);
      state.addRoutes = routes;
    },
    setRoles: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    getRoutes({ commit, state }) {
      let routes = [];
      if (state.roles.includes("admin")) {
        routes = asyncRoute || [];
      } else {
        routes = filterAsyncRoutes(asyncRoute, state.roles);
      }
      commit("setRoute", routes);
      return routes;
    },
  },
});

function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    
    if (hasPermission(roles, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      
      res.push(tmp);
    }
  });
  return res;
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return [roles].some((role) => route.meta.roles.includes(role));
  }
  return true;
}

export default store;
