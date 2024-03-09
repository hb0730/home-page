export default defineEventHandler<Promise<Hitokoto>>(() => {
  return $fetch('https://v1.hitokoto.cn/')
})
