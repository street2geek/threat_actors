<template>
  <div class="box sidebar">
      <span>ACTORS</span><br>
      <nav>
        <div v-for="(actor, key) in threatactors" :key="key"  @click="setUrlQuery(actor.slug)" class="btn playbook">{{actor.name.toUpperCase()}}</div>
      </nav>
    </div>
</template>

<script>
import { ALL_ACTORS_QUERY } from "@/graphql";

export default {
  name: "sidebar",
  data: () => ({
    threatactors: []
  }),
  watch:{
    threatactors(){
      this.passActorProps(this.threatactors[0].slug);
    }
  },
  methods: {
    setUrlQuery(slug) {
      this.$router.push({ query: { actor: slug} });
      this.$emit('set-ctf');
    }
  },
  apollo: {
    threatactors: {
      query: ALL_ACTORS_QUERY
    }
  }
   /*created() {
    this.$http.get("http://localhost:1337/threatactors").then(
      response => {
        this.threatactors = this.data.map(d => ({name:d.name, slug: d.slug}));
      },
      error => {
        console.error(error);
      }
    );
  }*/
};
</script>

<style>
.sidebar {
  grid-area: sidebar;
  background-color: #393939;
  padding-top: 20px;
  min-height: calc(100vh - 10px);
}

.sidebar span {
  color: #95989a;
  font-size: 12px;
  padding-left: 20px; 
}

.btn {
  color: #ffffff;
  background: #393939;
  text-decoration: none;
  padding-left: 20px; 
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


