
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// ルート定義のインポート
import router from './router';

// ストアをインポート
import store from './store';

// ルートコンポーネントのインポート
import App from './App.vue';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// アプリ起動時、Vue インスタンス生成前に
//  currentUser アクション呼び出します。
const createApp = async () => {
    await store.dispatch('auth/currentUser')
    new Vue({
        el: '#app',
        // ルーティングの読み込み
        router,
        store,
        // ルートコンポーネントの使用宣言
        components: { App },
        // ルートコンポーネントの描写
        template: '<App />'
    })
}

createApp()

