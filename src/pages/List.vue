<template>
    <v-container>
        <v-row class="flex-column">
            <v-col>
                <template v-for="note in notes">
                    <v-card :key="note.id" class="mt-5" :to="`/note/${note.id}`">
                        <v-card-title>
                            <span class="text-truncate">
                                {{ note.title }}
                            </span>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            notes: [],
        };
    },

    async created(){
        //load notes
        const Note = await this.$fetchNote();
        // Note.insert({title: "待辦事項", items: [
        //     {text: "起床", checked: false},
        //     {text: "吃飯", checked: false},
        //     { text: "睡覺", checked: true},
        // ]});
        this.notes = await Note.get();
    }
}
</script>