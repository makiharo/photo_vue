<script>
    import { OK } from '../util'
    import Photo from '../components/Photo.vue'

    export default {
        components: {/* 中略 */ },
        data: {/* 中略 */ },
        methods: {
            async fetchPhotos() {
                const response = await axios.get('/api/photos')

                if (response.status !== OK) {
                    this.$store.commit('error/setCode', response.status)
                    return false
                }

                this.photos = response.data.data
            }
        },
        // $route を監視してページが切り替わったときに fetchPhotos が実行
        watch: {
            $route: {
                async handler() {
                    await this.fetchPhotos()
                },
                // trueでコンポーネントが生成されたタイミングでも実行
                immediate: true
            }
        }
    }
</script>
