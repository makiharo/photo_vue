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
            <div class="navbar__item">
                <button class="button">
                    <i class="icon ion-md-add"></i>
                    Submit a photo
                </button>
            </div>
            <span class="navbar__item">
                username
            </span>
            <div class="navbar__item">
                <RouterLink class="button button--link" to="/login">
                    Login / Register
                </RouterLink>
            </div>
        </div>
    </nav>
</template>
