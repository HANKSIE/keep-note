<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      
      <v-text-field 
        dense 
        append-icon="mdi-magnify" 
        background-color="secondary" 
        solo 
        :clearable="true" 
        :hide-details="true" 
        label="搜尋您的記事"
        @click:append="search"
        v-model.trim="searchText"
      />

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-btn fab bottom fixed right>
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import logo from "@/assets/idea.svg";
export default {
  name: 'App',

  data: () => ({
    logo,
    searchText: "",
  }),

  methods: {
    search(){
      console.log(this.searchText);
    },
  },
};
</script>
