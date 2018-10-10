/**
 * 概率执行
 * @param config 配置
 * example:
 * {
 *    2: 'http code: 500',
 *    8: 'http code: 400',
 *    90: 'http code: 200',
 * }
 *
 * todo:
 * 1. 概率外的默认操作
 */

interface IConfig {
  [propName: string]: any;
}

export function probability(config: IConfig) {
  const arr = Object.keys(config)
    .map((item) => Number(item.replace(/%/g, '')))
    .sort((a, b) => b - a);

  let random = Math.floor(Math.random() * 100);
  random = random < 1 ? 1 : random;

  // console.log(arr, random);

  let current = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (random > current && random <= arr[i] + current) {
      // console.log('bingo', arr[i]);
      return config[arr[i]];
    }
    current = arr[i] + current;
  }
}

export function sleep(ttl) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ttl);
  });
}
