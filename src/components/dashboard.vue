<template>
      <div class="wrapper">
        <div class="box header">
            <span>ADVANCED PERSISTANCE THREAT GROUPS</span>
             <button class="dl-report-btn" @click="generateReport"> <svg class="lnr lnr-download"><use xlink:href="#lnr-download"></use></svg>&nbsp;&nbsp;&nbsp;Download Report</button>
        </div>
        <Sidebar @set-ctf="setContentTypeField" />
         <nav class="sub-navigation">
            <button class="button-outline" @click="setContentTypeField" id="actor">THREAT ACTOR</button>
            <button class="button-outline" @click="setContentTypeField" id="severity">SEVERITY</button>
            <button class="button-outline" @click="setContentTypeField" id="orientation">GOAL ORIENTATION</button>
            <button class="button-outline" @click="setContentTypeField" id="target">TARGET</button>
            <button class="button-outline" @click="setContentTypeField" id="capability">CAPABILITY</button>
            <button class="button-outline" @click="setContentTypeField" id="operandi">MODUS OPERANDI</button>
            <button class="button-outline" @click="setContentTypeField" id="activity">MAIN ACTIVITY'S</button>
        </nav>
        <div class="box inside">
            <div class="box main-content" v-html="contentToDisplay"></div>
            <div class="box aside-content">

            </div>
        </div>
        
    </div>
</template>

<script>
import Sidebar from "./dashboard-sidebar";
import { ACTOR_CONTENT_QUERY } from "@/graphql";
import Showdown from "showdown";
import gen from "../utils/reportGen.js";

const md = new Showdown.Converter();

export default {
  name: "dashboard",
  components: {
    Sidebar
  },
  props: ["to"],
  data: () => ({
    actorContent: "",
    contentToDisplay: "Please select a playbook to begin.",
    contentTypeField: ""
  }),
  methods: {
    setContentTypeField(e) {
      this.contentTypeField = e ? e.target.id : "summary";
      console.log(this.contentTypeField);
    },
    generateReport() {
      this.$apollo
        .query({
          query: ACTOR_CONTENT_QUERY,
          variables: {
            slug: this.$props.to
          }
        })
        .then(({ data }) => {
          gen.generate(this.$props.to, data);
        });
    }
  },
  watch: {
    contentTypeField() {
      this.$apollo
        .query({
          query: ACTOR_CONTENT_QUERY,
          variables: {
            slug: this.$props.to
          }
        })
        .then(response => {
          this.contentToDisplay = md.makeHtml(
            response.data.threatactors[0][this.contentTypeField]
          );
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
sup {
  font-size: 8px;
}

th,
td {
  text-align: left;
  border-bottom: 1px solid #7e7e7e;
  padding: 10px;
}

table {
  width: 100%;
}

/* .info {
  display: grid;
  background-color: #74b842;
  color: #fff;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 40px;
  grid-template-areas: "left middle middle2 right";
  justify-items: center;
  align-items: center;
} */

.left span,
.right span,
.middle span,
.middle2 span {
  font-family: "Jura", sans-serif;
  font-weight: 600;
}

.main-content {
  grid-area: main-content;
  background-color: #7e7e7e;
  margin-top: 10px;
  font-size: 100%;
  padding: 20px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.aside-content {
  grid-area: side-content;
  background-color: #7e7e7e;
  margin-top: 10px;
  padding: 20px;
  text-align: center;
}

.header {
  grid-area: header;
  background-color: #464646;
  max-width: 100%;
  font-size: 30px;
  color: #95989a;
  align-self: flex-end;
  margin-bottom: 7px;
  button {
    position: absolute;
    top: 16px;
    right: 10px;
  }
}

.header span {
  font-size: 42px;
  color: #95989a;
  font-family: "Jura", sans-serif;
}

.lnr {
  display: inline-block;
  fill: currentColor;
  width: 1em;
  height: 1em;
  vertical-align: -0.05em;
}

.lnr-download {
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
}

.wrapper {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar sub-navigation"
    "sidebar inside"
    "sidebar info"
    "footer ...";
  color: #444;
  grid-template-rows:
    70px
    50px
    680px
    40px
    1fr;
  grid-column-gap: 10px;
}

.inside {
  display: grid;
  grid-template-columns: 65% auto;
  grid-template-rows: 1fr;
  grid-template-areas: "main-content side-content";
  grid-gap: 10px;
  margin-bottom: 10px;
}

.sub-navigation {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 50px;
  grid-gap: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
}

/* .sub-navigation div {
  color: #95989a;
  padding: 20px 10px 10px;
  font-family: "Jura", sans-serif;
  text-align: center;
  cursor: pointer;
} */

.box {
  color: #fff;
  font-size: 100%;
}

.footer {
  grid-area: footer;
  color: #95989a;
  padding-left: 10px;
  padding-top: 30px;
  font-size: 10px;
  background-color: #393939;
}

::-webkit-scrollbar {
  width: 6px; /* 1px wider than Lion. */
  /* This is more usable for users trying to click it. */
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
}
/* hover effect for both scrollbar area, and scrollbar 'thumb' */
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

/* The scrollbar 'thumb' ...that marque oval shape in a scrollbar */
::-webkit-scrollbar-thumb:vertical {
  /* This is the EXACT color of Mac OS scrollbars. 
     Yes, I pulled out digital color meter */
  background: rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(0, 0, 0, 0.61); /* Some darker color when you click it */
  -webkit-border-radius: 100px;
}
</style>
