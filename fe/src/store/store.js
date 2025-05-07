import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            sessionToken: null,
            default_img_url: '/nesttiktokpixel/static/img/',
            page: 'Dashboard',
            pageParams: {}
        }
    },
    mutations: {
        setSessionToken(state, token) {
            state.sessionToken = token;
        }
    },
    getters: {
        getSessionToken: (state) => state.sessionToken
    }
})

export default store
