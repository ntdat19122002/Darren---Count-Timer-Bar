import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            appBridge: null,
            default_img_url: '/nesttiktokpixel/static/img/',
            page: 'Dashboard',
            pageParams: {}
        }
    },
    mutations: {
        setAppBridge(state, appBridge) {
            state.appBridge = appBridge;
        }
    },
    getters: {
        getAppBridge: (state) => state.appBridge
    }
})

export default store
