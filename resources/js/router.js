import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

// ストアの追加
import store from './store'


// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList
    },
    {
        path: '/500',
        component: SystemError
    },
    {
        path: '/login',
        component: Login,
        // beforeEnter は定義されたルートにアクセスされて
        // ページコンポーネントが切り替わる直前に呼び出される関数
        // to アクセス先
        // from アクセス元
        // next 移動先、空だと制御なしでそのまま動作、引数を入れるとそこに強制移動
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }
    },
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    // シャープがなくなる
    mode: 'history',
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router
