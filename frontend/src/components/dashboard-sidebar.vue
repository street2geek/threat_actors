<template>
  <div class="box sidebar">
      <span>ACTORS</span><br>
      <nav>
        <div v-for="(actor, key) in threatactors" :key="key"  @click="setUrl(actor.slug)" class="btn playbook">{{actor.name.toUpperCase()}}</div>
      </nav>
    </div>
</template>

<script>
import { ALL_ACTORS_QUERY } from "@/graphql";

export default {
  name: "sidebar",
  props: [],
  data: () => ({
    threatactors: []
  }),
  methods: {
    setUrl(slug) {
      this.$router.push({ query: { actor: slug} });
    }
  },
  apollo: {
    threatactors: {
      query: ALL_ACTORS_QUERY
    }
  }
};
</script>

<style>
.sidebar {
  grid-area: sidebar;
  background-color: #393939;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  min-height: calc(100vh - 10px);
}

.sidebar span {
  color: #95989a;
  font-size: 12px;
}

.btn {
  color: #ffffff;
  background: #393939;
  text-decoration: none;
}

.btn:hover {
  background: #74b842;
  text-decoration: none;
  cursor: pointer;
}

.activebtn {
  background: #74b842;
  text-decoration: none;
}
</style>


