export function useWindow() {
  const isSmallScreen = useState('isSmallScreen', () => {
    if (import.meta.client) {
      return window.innerWidth < 768
    }
    return false
  })

  const onResize = () => {
    isSmallScreen.value = window.innerWidth < 768
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })

  return {
    isSmallScreen,
    onResize,
  }
}
