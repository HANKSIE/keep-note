<template>
  <v-container>
    <v-app-bar app>
      <v-btn icon>
        <v-icon @click="$router.back()">mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row class="justify-center mt-5 mb-16">
      <v-col cols="11">
        <v-card>
          <v-card-title class="mb-5">
            <v-container>
              <v-text-field
                :hide-details="true"
                placeholder="標題"
                v-model="note.title"
              />
            </v-container>
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-scroll-y-reverse-transition group>
                <template v-for="item in note.items">
                  <v-list-item :key="item.id">
                    <v-list-item-action>
                      <v-checkbox v-model="item.checked" />
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-textarea auto-grow rows="1" v-model="item.text" />
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn depressed icon small @click="removeItem(item.id)"
                        ><v-icon>mdi-close</v-icon></v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-scroll-y-reverse-transition>
              <v-list-item>
                <v-list-item-action>
                  <v-btn @click="insertEmptyItem"
                    ><v-icon>mdi-plus</v-icon>新增項目</v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-bottom-navigation grow fixed>
      <v-btn @click="remove">
        <span>Delete</span>
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },

  data() {
    return {
      note: {},
    };
  },

  methods: {
    insertEmptyNote() {
      this.note = {
        title: "",
        items: [],
      };

      this.insertEmptyItem();
    },

    insertEmptyItem() {
      let id = performance.now();
      if (this.note.items.length > 0) {
        id = this.note.items[this.note.items.length - 1].id + 1;
      }
      this.note.items.push({ id, text: "", checked: false });
    },

    removeItem(id) {
      this.note.items = this.note.items.filter((item) => item.id != id);
    },

    async save() {
      await this.$store.dispatch("note/save", this.note);
    },

    async remove() {
      await this.$store.dispatch("note/remove", this.note.id);
      this.$router.back();
    },
  },

  async created() {
    const Note = await this.$fetchNote();
    const note = await Note.find(this.id);
    if (note) {
      this.note = note;
    } else {
      this.insertEmptyNote();
      this.note = await Note.create(this.note);
    }
  },

  async updated() {
    // 資料庫有該筆筆記
    if (this.note.id) {
      await this.save();
    }
  },
};
</script>