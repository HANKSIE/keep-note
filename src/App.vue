<template>
  <v-app>
    <v-main>
      <keep-alive>
        <router-view v-if="$route.meta.keep"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keep"></router-view>
    </v-main>
  </v-app>
</template>
