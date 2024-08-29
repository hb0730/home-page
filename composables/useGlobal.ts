export default function useGlobal() {
  // loading status
  const loaded = useState('loaded', () => {
    return false
  })
  const changeBgUrl = (type: number) => {
    if (type === 0) {
      // 必应每日壁纸
      return 'https://api.dujin.org/bing/1920.php'
    }
    else if (type === 1) {
      // 二次元 高清壁纸
      return 'https://api.aixiaowai.cn/gqapi/gqapi.php'
    }
    else if (type === 2) {
      // 二次元动漫
      return 'https://api.aixiaowai.cn/api/api.php'
    }
  }

  // background image url
  const bgUrl = useState('bgUrl', () => {
    return changeBgUrl(0)
  })

  return {
    loaded,
    bgUrl,
    changeBgUrl,
  }
}
