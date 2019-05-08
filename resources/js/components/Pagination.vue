<template>
    <div class="pagination">
        <RouterLink
            v-if="! isFirstPage"
            :to="`/?page=${currentPage - 1}`"
            class="button">&laquo; prev</RouterLink>
        <RouterLink
            v-if="! isLastPage"
            :to="`/?page=${currentPage + 1}`"
            class="button">next &raquo;</RouterLink>
    </div>
</template>

<script>
    export default {
        // 現在ページ（currentPage）と
        // 総ページ数（lastPage）を props として受け取ります。
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            lastPage: {
                type: Number,
                required: true
            }
        },
        computed: {
            // 以下を実現するためのboolean
            // 「prev（前へ）」ボタンは1ページ目以外の場合に表示します。
            // 「next（次へ）」ボタンは最後のページ以外の場合に表示します。
            isFirstPage() {
                return this.currentPage === 1
            },
            isLastPage() {
                return this.currentPage === this.lastPage
            }
        }
    }
</script>
