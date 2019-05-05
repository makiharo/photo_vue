import Axios from "axios";

// 保持する値の定義
const state = {
    user: null
}

const getters = {}

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
        const response = await Axios.post('/api/login', data);
        context.commit('setUser', response.data);
    },
    async logout (context) {
        const response = await Axios.post('/api/logout');
        context.commit('setUser', null);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
