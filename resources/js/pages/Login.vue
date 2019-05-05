<template>
    <div class="container--small">
        <ul class="tab">
            <li class="tab__item" :class="{'tab__item--active': tab === 1 }" @click="tab = 1">Login</li>
            <li class="tab__item" :class="{'tab__item--active': tab === 2 }" @click="tab = 2">Register</li>
        </ul>
        <div class="panel" v-show="tab === 1">
            <!--
                preventでデフォ挙動を抑止する
            -->
            <form class="form" @submit.prevent="login">
                <div v-if="loginErrors" class="errors">
                    <ul v-if="loginErrors.email">
                        <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
                    </ul>
                    <ul v-if="loginErrors.password">
                        <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
                    </ul>
                </div>
                <label for="login-email">Email</label>
                <input type="text" class="form__item" id="login-email" v-model="loginForm.email">
                <label for="login-password">Password</label>
                <input type="password" class="form__item" id="login-password" v-model="loginForm.password">
                <div class="form__button">
                    <button type="submit" class="button button--inverse">login</button>
                </div>
            </form>
        </div>
        <div class="panel" v-show="tab === 2">
            <form class="form" @submit.prevent="register">
                <label for="username">Name</label>
                <input type="text" class="form__item" id="username" v-model="registerForm.name">
                <label for="email">Email</label>
                <input type="text" class="form__item" id="email" v-model="registerForm.email">
                <label for="password">Password</label>
                <input type="password" class="form__item" id="password" v-model="registerForm.password">
                <label for="password-confirmation">Password (confirm)</label>
                <input type="password" class="form__item" id="password-confirmation"
                    v-model="registerForm.password_confirmation">
                <div class="form__button">
                    <button type="submit" class="button button--inverse">register</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                tab: 1,
                loginForm: {
                    email: '',
                    password: ''
                },
                registerForm: {
                    name: 'kiku',
                    email: 'sample@mail',
                    password: 'password',
                    password_confirmation: 'password'
                }
            }
        },
        computed: {
            ...mapState({
                apiStatus: state => state.auth.apiStatus,
                loginErrors: state => state.auth.loginErrorMessages
            })
        },
        methods: {
            async login() {
                // authストアのloginアクションを呼び出す
                await this.$store.dispatch('auth/login', this.loginForm)

                // 問題ない場合は空になりpushされない
                if (this.apiStatus) {
                    // トップページに移動する
                    this.$router.push('/')
                }
            },
            async register() {
                // authストアのresigterアクションを呼び出す
                // $storeでstoreを呼び出せる
                // store/index.jsで Vue.use(Vuex) で宣言してるので可
                // dispatchでアクション呼び出し
                // 1引数にアクション名、呼び出し先設定で、namespace: trueとしているので
                // モージュル名＋アクション名で指定
                await this.$store.dispatch('auth/register', this.registerForm)

                // トップページに移動する
                this.$router.push('/')
            },
            async login() {
                // authストアのloginアクションを呼び出す
                await this.$store.dispatch('auth/login', this.loginForm);

                // トップページに移動する
                this.$router.push('/')
            },
            clearError() {
                this.$store.commit('auth/setLoginErrorMessages', null)
            }
        },
        // ログインページを表示するタイミング、でエラーをクリア。
        created() {
            this.clearError()
        }
    }
</script>
