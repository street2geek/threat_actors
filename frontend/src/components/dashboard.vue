<template>
      <div class="wrapper">
        <div class="box header">
            <span>ADVANCED PERSISTANCE THREAT GROUPS</span>
        </div>
        <Sidebar :actors="threatactors"/>
        <div class="box inside">
            <div class="box description">Please select a playbook to begin.
            </div>
            <div class="box timeline"></div>
        </div>
        <div class="info">
          

        </div>
        <div class="bottomheader">
            <div id="severity">SEVERITY</div>
            <div id="goal-orientation">GOAL ORIENTATION</div>
            <div id="target">TARGET</div>
            <div id="capability">CAPABILITY</div>
            <div id="modus-operandi">MODUS OPERANDI</div>
            <div id="main-activity">MAIN ACTIVITY'S</div>
        </div>
        <div class="phasescontainer">

        </div>
    </div>
</template>

<script>
import Sidebar from "./dashboard-sidebar";
import { ALL_ACTORS_QUERY } from '@/graphql'

export default {
  name: "dashboard",
  components: {
    Sidebar
  },
  data: () => {
    return {
      data: [],
      threatactors: []
    };
  },
  /*created() {
    this.$http.get("http://localhost:1337/threatactors").then(
      response => {
        this.data = response.data;
        this.threatactors = this.data.map(d => d.name);
      },
      error => {
        console.error(error);
      }
    );
  }*/
  apollo: {
    threatactors: {
      query: ALL_ACTORS_QUERY
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

.indicators {
  font-size: 16px;
  font-family: "Inconsolata", monospace;
}

table {
  width: 100%;
}

.info {
  display: grid;
  background-color: #74b842;
  color: #fff;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 40px;
  grid-template-areas: "left middle middle2 right";
  justify-items: center;
  align-items: center;
}

.left span,
.right span,
.middle span,
.middle2 span {
  font-family: "Jura", sans-serif;
  font-weight: 600;
}

.description {
  grid-area: description;
  background-color: #7e7e7e;
  margin-top: 10px;
  font-size: 100%;
  padding: 20px;
}

.description {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.timeline {
  grid-area: timeline;
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
}

.header span {
  font-size: 42px;
  color: #95989a;
  font-family: "Jura", sans-serif;
}

.wrapper {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar inside"
    "sidebar info"
    "sidebar bottomheader"
    "sidebar phasescontainer"
    "footer ...";
  color: #444;
  grid-template-rows:
    70px
    350px
    40px
    50px
    1fr
    70px;
  grid-column-gap: 10px;
}

.inside {
  display: grid;
  grid-template-columns: 65% auto;
  grid-template-rows: 1fr;
  grid-template-areas: "description timeline";
  grid-gap: 10px;
  margin-bottom: 10px;
}

.bottomheader {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 50px;
  grid-template-areas: "recon weaponization delivery exploit install command objective";
  grid-gap: 10px;
  margin-bottom: 10px;
}

.bottomheader div {
  color: #95989a;
  padding: 20px 10px 10px;
  font-family: "Jura", sans-serif;
  text-align: center;
}

.phasescontainer {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 10px;
  margin-top: 10px;
}

.phases {
  background-color: #7e7e7e;
  padding: 10px;
}

.phases:hover {
  background: #ef9124;
}

.phasesblank {
  background-color: #464646;
}

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

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #464646;
  margin: 15% auto;
  padding: 20px;
  color: white;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
