<template>
    <nav class="navbar">
        <!--
            リンクが描写されるが、
            通常のリンクと違いGETレスポンスが発生しない
            Vueのコンポーネントの切り替えに使う
        -->
        <RouterLink class="navbar__brand" to="/">
            Vuesplash
        </RouterLink>
        <div class="navbar__menu">

            <!-- ログインによる表示切り替え -->
            <div v-if="isLogin" class="navbar__item"
                @click="showForm = !showForm">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    Submit a photo
                </button>
            </div>
            <span v-if="isLogin" class="navbar__item">
                {{ username }}
            </span>
            <div v-else class="navbar__item">
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </div>

        </div>
        <PhotoForm v-model="showForm" />
    </nav>
</template>

<script>
    import PhotoForm from './PhotoForm.vue'

    export default {
        components: {
            PhotoForm
        },
        data() {
            return {
                showForm: false
            }
        },
        computed: {
            isLogin() {
                return this.$store.getters['auth/check']
            },
            username() {
                return this.$store.getters['auth/username']
            }
        }
    }
</script>
