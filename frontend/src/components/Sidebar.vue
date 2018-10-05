<template>
       <div class="box sidebar">
            <a href="https://researchcenter.paloaltonetworks.com/unit42/" target="_blank"> <img src='imgs/u42logo.png' alt=''></a>
            <span>ACTORS</span><br>

            <div class="btn playbook" id="playbook_oilrig" pb_file="oilrig.json" onclick="">OILRIG</div>
            <div class="btn playbook" id="playbook_sofacy" pb_file="sofacy.json" onclick="">SOFACY</div>
            <div class="btn playbook" id="playbook_pickaxe" pb_file="pickaxe.json" onclick="">PICKAXE</div>
            <div class="btn playbook" id="playbook_patchwork" pb_file="patchwork.json" onclick="">PATCHWORK</div>
            <div class="btn playbook" id="playbook_darkhydrus" pb_file="darkhydrus.json" onclick="">DARKHYDRUS</div>
            <div class="btn playbook" id="playbook_reaper" pb_file="reaper.json" onclick="">REAPER</div>
            <div class="btn playbook" id="playbook_rancor" pb_file="rancor.json" onclick="">RANCOR</div>
            <div class="btn playbook" id="playbook_tick" pb_file="tick.json" onclick="">TICK</div>
            <div class="btn playbook" id="playbook_dragonok" pb_file="dragonok.json" onclick="">DRAGONOK</div>

            <!--<div class="btn playbook" id="playbook_name" pb_file="name.json" onclick="">NAME</div>-->

        </div>
</template>

<script>
export default {
  name: "sidebar"
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
  background:  #74B842;
  text-decoration: none;
}

.activebtn {
  background:  #74B842;
  text-decoration: none;
}
</style>


