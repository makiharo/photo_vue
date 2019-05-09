import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'
import PhotoDetail from './pages/PhotoDetail.vue'
import NotFound from './pages/errors/NotFound.vue'

// ストアの追加
import store from './store'


// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList,
        /**
         * <PhotoList> コンポーネントにクエリパラメータ
         * page の値が、page という props として渡される
         */
        props: route => {
            const page = route.query.page
            // 整数と解釈されない値は「1」と見なして返す
            return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
        }
    },
    {
        path: '/photos/:id',
        component: PhotoDetail,
        props: true
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
    {
        path: '/photos/:id',
        component: PhotoDetail,
        props: true
    },
    {
        path: '*',
        component: NotFound
    }
]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    // シャープがなくなる
    mode: 'history',
    // ページ遷移した時に見える位置の初期位置を決める
    // 以下はスクロールそのままにせず、遷移で初期化する設定
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router
