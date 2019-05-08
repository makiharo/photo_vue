<template>
    <div class="photo">
        <figure class="photo__wrapper">
            <img
                class="photo__image photo__image--portrait"
                :src="item.url"
                :alt="`Photo by ${item.owner.name}`">
        </figure>
        <!-- マウスオーバーすると表示される -->
        <RouterLink
            class="photo__overlay"
            :to="`/photos/${item.id}`"
            :title="`View the photo by ${item.owner.name}`">
            <div class="photo__controls">
                <!-- いいねボタン -->
                <button
                    class="photo__action photo__action--like"
                    title="Like photo">
                    <i class="icon ion-md-heart"></i>12
                </button>
                <!--
                    ダウンロードリンク、GETリクエスト
                    リンクは、詳細ページの上に乗ってるので、
                    バブリングを防ぐためにclick.stopを入れる
                 -->
                <a
                    class="photo__action"
                    title="Download photo"
                    @click.stop
                    :href="`/photos/${item.id}/download`">
                    <i class="icon ion-md-arrow-round-down"></i>
                </a>
                <!-- 投稿者名 -->
                <div class="photo__username">
                    {{ item.owner.name }}
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
