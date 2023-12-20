export default function ({ route, redirect, app }) {
  const currentLocale = app.i18n.locale
  // 如果路由不匹配任何页面，重定向到当前语言的首页
  if (route.matched.length == 0) {
    redirect(`/${currentLocale}/home`)
  }
}