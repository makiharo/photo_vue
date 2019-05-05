/**
 * クッキーの値を取得する
 * @param {String} searchKey 検索するキー
 * @returns {String} キーに対応する値
 */
export function getCookieValue(searchKey) {

    if (typeof searchKey === 'undefined') {
        return ''
    }

    let val = ''

    // document.cookieで
    // 下記の形式で取れる
    // 「name=12345;token=67890;key=abcde」
    // 分解して配列化、ループして指定のキーを探して値を取る
    document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=')
        if (key === searchKey) {
            return val = value
        }
    })

    console.log(val);

    return val
}
