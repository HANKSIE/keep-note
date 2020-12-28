import Vue from "vue";
import HDB from "@/libraries/hdb";

const DB_NAME = "HKeep";
const OBJECT_STORE = {
  NOTES: "notes",
};

const install = () => {
  Vue.prototype.$fetchNote = async () => {
    const Note = await new HDB(DB_NAME, OBJECT_STORE.NOTES, {
      keyPath: "id",
      autoIncrement: true,
      indexes: [
        { name: "id", keyPath: "id", options: { unique: true } },
        { name: "title", keyPath: "title", options: { unique: false } },
      ],
    });
    return Note;
  };
};

export default install;
