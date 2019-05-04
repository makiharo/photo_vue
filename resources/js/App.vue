<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <div class="container">
                <!--
                    Routerviewで
                    切り替わる場所の定義
                    URLが対応するHTMLを描写する
                -->
                <RouterView />
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
    import Navbar from './components/Navbar.vue'
    import Footer from './components/Footer.vue'

    export default {
        components: {
            Navbar,
            Footer
        }
    }
</script>
