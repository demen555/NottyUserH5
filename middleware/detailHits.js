let lastRequestTime = {};

export default function ({ $videoApi, params }) {

  const str = params.id.split('-');
  const id = str[str.length - 1];

  // 清理过期的id
  Object.keys(lastRequestTime).forEach((key) => {
    if (Date.now() - lastRequestTime[key] >= 30 * 60 * 1000) {
      delete lastRequestTime[key];
    }
  });

  if (lastRequestTime[id] && Date.now() - lastRequestTime[id] < 30 * 60 * 1000) {
    return;
  } else {
    $videoApi.requestVideoHits({ vodId: id }).then(() => {
      lastRequestTime[id] = Date.now();
      // 将最后一次请求时间保存到本地存储
      if (process.client) {
        localStorage.setItem('lastRequestTime', JSON.stringify(lastRequestTime));
      }
    });
  }
}