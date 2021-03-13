<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <h2 color ="white">
        Gesture Control
      </h2>
      <v-spacer></v-spacer>
      <v-btn text dark to="/">Configuration</v-btn>
      <v-btn text dark to="/new_signal">New Signal</v-btn>
    </v-app-bar>
    <router-view/>
  </v-app>
  <!-- <div id="app" align="center" justify="center" class="fill_height center_div">
  </div> -->
</template>

<style lang="css">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.center-div
{
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: #ccc; */
  /* border-radius: 3px; */
}

html, body, .app {
  height: 100%;
}

</style>
