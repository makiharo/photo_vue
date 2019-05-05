import Axios from "axios";
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

// 保持する値の定義
const state = {
    user: null,
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null
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
    },
    setApiStatus(state, status) {
        state.apiStatus = status
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages
    }
}

const actions = {
    // 会員登録
    // 1引数はcontextで決まっている
    async register(context, data) {
        // commitでミューテーションを読んでいる
        context.commit('setApiStatus', null)
        const response = await Axios.post('/api/register', data);

        if (response.status === CREATED) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)

        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setRegisterErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root: true })
        }

    },

    // ログイン
    async login(context, data) {
        context.commit('setApiStatus', null)
        const response = await Axios.post('/api/login', data)

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)

        /**
         * バリデーションエラーの場合
         * ページコンポーネント内でエラーの表示を行う必要があるので、
         * ステータスコードが UNPROCESSABLE_ENTITY の場合は
         *  error/setCode ミューテーションを呼びません。
         * 代わりに loginErrorMessages にエラーメッセージをセットします
         */
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            // 別モジュールのmutationを呼び出す
            // その場合は3引数にroute trueを指定する必要がある
            context.commit('error/setCode', response.status, { root: true })
        }
    },

    // ログアウト
    async logout(context) {
        context.commit('setApiStatus', null)
        const response = await Axios.post('/api/logout');

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', null)
            return false
        }

        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },

    // ログインユーザーチェック
    async currentUser(context) {
        context.commit('setApiStatus', null)
        const response = await Axios.get('/api/user')
        const user = response.data || null

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', user)
            return false
        }

        // 現在のユーザー
        console.log("現在ユーザー");
        console.log(user);

        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
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
