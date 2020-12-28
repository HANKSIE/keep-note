<template>
  <v-container>
    <v-app-bar app>
      <v-text-field
        dense
        prepend-inner-icon="mdi-menu"
        append-icon="mdi-magnify"
        background-color="secondary"
        solo
        :clearable="true"
        :hide-details="true"
        label="搜尋您的記事"
        @click:append="search"
        @click:prepend-inner="openNav = !openNav"
        v-model.trim="searchText"
      />
    </v-app-bar>

    <v-navigation-drawer app v-model="openNav" temporary>
      <template v-slot:prepend>
        <v-subheader inset>導覽列</v-subheader>
        <v-divider></v-divider>
      </template>
      <v-list nav>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-list-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>列表</v-list-item-title>
        </v-list-item>
        <v-list-item to="/archive">
          <v-list-item-icon>
            <v-icon>mdi-archive-arrow-down-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>封存</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-row class="flex-column">
      <v-col>
        <template v-if="hadNotes">
          <template v-for="note in note.list">
            <v-card :key="note.id" class="mt-5" :to="`/note/${note.id}`">
              <v-card-title>
                <v-container>
                  <span class="text-truncate">
                    <template v-if="note.title">
                      {{ note.title }}
                    </template>
                    <template v-else>
                      <span class="grey--text">未命名</span>
                    </template>
                  </span>
                </v-container>
              </v-card-title>
              <v-card-text>
                <template v-for="item in note.items">
                  <v-list-item :key="item.id">
                    <v-list-item-action>
                      <v-checkbox disabled :input-value="item.checked" />
                    </v-list-item-action>
                    <v-list-item-content>
                      {{ item.text }}
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-card-text>
            </v-card>
          </template>
        </template>
        <template v-else>
          <h1 class="text-center">目前沒有記事</h1>
        </template>
      </v-col>
    </v-row>

    <v-btn fab bottom fixed right to="/note/">
      <v-icon> mdi-plus </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      openNav: false,
      searchText: "",
    };
  },

  methods: {
    async search() {
      await this.$store.dispatch("note/load", this.searchText);
      window.scrollTo(0, 0);
    },
  },

  computed: {
    ...mapState(["note"]),
    hadNotes() {
      return this.note.list.length !== 0;
    },
  },

  async created() {
    await this.$store.dispatch("note/load");
  },
};
</script>