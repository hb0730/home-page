# home-page
>
> 源自于[imsyy/home](https://github.com/imsyy/home)的开源项目
>

![hb0730](/screenshots/main.png)

## 功能

- [x] 载入动画
- [x] 个人信息
- [x] 日期及时间
- [x] 实时天气
- [x] 时光进度条
- [x] 移动端适配

## 静态部署

```shell
# 安装pnpm
npm install -g pnpm
# 安装依赖
pnpm install
# 构建静态部署
pnpm generate
```

## 相关配置

- 相关 **站点** , **个人** , **社交** 等配置都在 `app.config.ts` 中进行配置

- 关于 **天气**,**hitokoto 一言** 等都在 `/api`目录下

## 关于图标

 1. socials 图标在 `public/images/icon` 目录下
 2. 其他图标使用的 `iconfont` 的图标库,相关文档 [nuxt-icon](https://nuxt.com/modules/icon)

## API

- [教书先生 API](https://api.oioweb.cn/doc/weather/GetWeather)
- [Hitokoto 一言](https://hitokoto.cn/)
- [小歪 API](https://api.aixiaowai.cn/)
- [樱花二次元图片API](https://www.dmoe.cc/random.php)

## 技术栈

- [Nuxt.js](https://nuxtjs.org/)
- [vue3](https://cn.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/)
- [iconfont](https://www.iconfont.cn/)

## License

[MIT](https://mit-license.org/)
