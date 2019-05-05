import Axios from "axios";
import { OK } from '../util'

// 保持する値の定義
const state = {
    user: null,
    apiStatus: null
}

const getters = {
    check: state => !!state.user,
    username: state => state.user ? state.user.name : ''
}


// 中間処理？、セッターとかできる
const mutations = {
    // 1引数はstateで決まっている
    setUser(state, user) {
        state.user = user
    }
}

const actions = {
    // 1引数はcontextで決まっている
    async register(context, data) {
        console.log(data);
        const response = await Axios.post('/api/register', data);
        // commitでミューテーションを読んでいる
        context.commit('setUser', response.data);
    },

    async login(context, data) {
        context.commit('setApiStatus', null)
        const response = await Axios.post('/api/login', data)
            .catch(err => err.response || err)

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)

        // 別モジュールのmutationを呼び出す
        // その場合は3引数にroute trueを指定する必要がある
        context.commit('error/setCode', response.status, { root: true })
    },

    async logout(context) {
        const response = await Axios.post('/api/logout');
        context.commit('setUser', null);
    },

    async currentUser(context) {
        const response = await Axios.get('/api/user')
        const user = response.data || null
        context.commit('setUser', user)
    }
}

export default {
    // actions指定時にnamespaceを利用できる
    // 以下のように
    // this.$store.dispatch('auth/login', this.loginForm);
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
