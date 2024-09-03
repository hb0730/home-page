export default function useGlobal() {
  // loading status
  const loaded = useState('loaded', () => {
    return false
  })
  const bgArray = [
    // 必应每日壁纸
    'https://api.dujin.org/bing/1920.php',
    // 二次元 高清壁纸
    'https://api.aixiaowai.cn/gqapi/gqapi.php',
    // 二次元动漫
    'https://api.aixiaowai.cn/api/api.php',
  ]
  // background image url
  const bgUrl = useState('bgUrl', () => {
    return bgArray[0]
  })

  // change background image
  const changeBgUrl = (type: number) => {
    if (type < 0 || type >= bgArray.length) {
      return
    }
    bgUrl.value = bgArray[type]
  }

  return {
    loaded,
    bgUrl,
    changeBgUrl,
  }
}
