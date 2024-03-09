<script lang='ts' setup>
</script>

<template>
  <div class="widget module time_module">
    <div class="clock_widget">
      <WidgetClock />
    </div>
    <div class="time_widget">
      <WidgetTime />
      <WidgetWeather />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.time_module {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  animation: fade 0.5s;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }

  .clock_widget {
    margin: 20px 0;
  }
}
</style>
