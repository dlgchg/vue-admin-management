<template>
  <div class="main-container">
    <div class="slider">
      logo
      <router-link
        v-for="route in addRoutes"
        :key="route.meta.title"
        :to="route.path"
      >
        {{ route.meta.title }}
        <br>
        <router-link
          v-for="childRoute in route.children"
          :key="childRoute.meta.title"
          :to="childPath(route.path, childRoute.path)"
        >
          {{ childRoute.meta.title }} <br>
        </router-link>
      </router-link>
    </div>
    <div class="content">
      <header class="header">
        <router-link
          class="link"
          v-for="route in levelList"
          :key="route.meta.title"
          :to="route.path"
        >
          /{{ route.meta.title }}
        </router-link>
      </header>
      <keep-alive>
        <router-view> </router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      levelList: [],
    };
  },
  computed: {
    ...mapState(["addRoutes"]),
  },
  methods: {
    childPath(basePath, childPath){
      return basePath +'/'+ childPath
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];
      if (
        first.meta.title.trim().toLocaleLowerCase() !==
        "Home".toLocaleLowerCase()
      ) {
        matched = [
          {
            path: "/home",
            meta: { title: "Home", roles: ["admin", "editor", "normal"] },
          },
        ].concat(matched);
      }
      this.levelList = matched.filter((item) => item.meta && item.meta.title);
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100%;
}
.slider {
  width: 100px;
  height: 100%;
  border-right: solid gray 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}
.content {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.header {
  width: 100%;
  height: 50px;
  border-bottom: solid 1px black;
}
.link {
  margin-right: 10px;
}
</style>
