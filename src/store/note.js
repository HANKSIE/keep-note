import { fetchNote } from "@/plugins/hdb";

export default {
  namespaced: true,

  state: {
    list: [],
  },
  mutations: {
    set(state, { list }) {
      state.list = list;
    },
    remove(state, { id }) {
      state.list = state.list.filter((note) => note.id != id);
    },
    save(state, { note }) {
      const clone = state.list.slice();

      let isNew = true;
      for (let i = 0; i < clone.length; i++) {
        if (clone[i].id == note.id) {
          clone[i] = note;
          isNew = false;
          break;
        }
      }

      if (isNew) {
        clone.unshift(note);
      }

      state.list = clone;
    },
  },
  actions: {
    async load({ commit }, text) {
      const Note = await fetchNote();
      const notes = text
        ? await Note.where({ "title like": text })
            .orderBy("id", "desc")
            .get()
        : await Note.orderBy("id", "desc").get();
      commit("set", { list: notes });
    },
    async remove({ commit }, id) {
      const Note = await fetchNote();
      const isSuccess = await Note.delete({ id });
      if (isSuccess) {
        commit("remove", { id });
      }
    },
    async save({ commit }, note) {
      const Note = await fetchNote();
      const isSuccess = await Note.where({ id: note.id }).update(note);
      if (isSuccess) {
        commit("save", { note });
      }
    },
  },
};
