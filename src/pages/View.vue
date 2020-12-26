<template>
    <v-container>
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
                <v-list>
                    <template v-for="item in note.items">  
                        <v-list-item :key="item.id">
                            <v-list-item-action>
                                <v-checkbox v-model="item.checked" />
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-textarea auto-grow rows="1" v-model="item.text"/>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: ["id"],
    data(){
        return{
            note: {}
        };
    },
    methods:{
        createEmptyNote(){
            return {
                title: "",
                items: [
                    {text: "", checked: false},
                ]
            }
        }
    },
    async created(){
        const Note = await this.$fetchNote();
        // const note = await Note.create({title: "待辦事項", items: [
        //     {text: "起床", checked: false},
        //     {text: "吃飯", checked: false},
        //     { text: "睡覺", checked: true},
        // ]});
        let note = await Note.find(this.id);
        this.note = note || await Note.create(this.createEmptyNote());
    }
}
</script>