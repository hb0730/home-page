<script lang='ts' setup>
// const { data } = useFetch<Hitokoto>('/api/hitokoto')
import { getHitokoto } from '@/api'

const { data } = await getHitokoto()
</script>

<template>
  <div class="hitokoto_content">
    <span class="text">{{ data?.hitokoto }}</span>
    <span class="form">-&nbsp;[ {{ data?.from }} ]</span>
  </div>
</template>

<style lang='scss' scoped>
.hitokoto_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .text {
    font-size: 1.1rem;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .form {
    margin-top: 10px;
    font-weight: 700;
    align-self: flex-end;
    font-size: 1.1rem;
  }
}
</style>
