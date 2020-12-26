import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: colors.grey.darken3,
                secondary: colors.grey.darken1,
            },
        }
    },
});
