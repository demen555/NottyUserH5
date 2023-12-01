import JSEncrypt from "jsencrypt";

// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 公钥进行加密（后端给前端的公钥）
// 测试数据
const publicKey =
  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoZFKd5QKsXGcYa0SHVsy\n" +
  "Mmtw6ODLpi0KAX3VyYKnlFcUa3T7NSiWEvozm+Pe2KGFP/QOtxo4Psg5RzhGC9Rk\n" +
  "R15ZiaySq7uOEIPmLXFG46tItCPt3r+JS0ycCTX7QGkOX5jN/tLkuEV482anH/qi\n" +
  "bRbh9Vajh9axxxxxxxxxx2K+M7PNN0z4P8944zVN4Z0LoXnPZ9x511VMRzWyAgJU\n" +
  "700j6l1Uwx+Cw0sBY379XW8jkBTqq/wQ1RBOCbLT0jgKql+cPVJ6Exqu6sMIKtKH\n" +
  "sueLOAQh31kosj8QXvhf+21+YOkoKLXxMRyw4WD7HOBXHQZp0q6+Em4ZmpvltPhm\n" +
  "vwIDAQAB";

// 私钥进行解密
const privateKey = "";

// 加密
export function encrypt(deviceUuid) {
  const encryptor = new JSEncrypt();
  // const deviceUuid = 'h5'
  const time = Date.now().getTime();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt((deviceUuid + "&&&" + time, "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMmOSwmasoqYF8Baa1nUGGtGJP1kULQOXIONypCxB/DzQz0RZz7Rgam47k8gfCsokIBixgH17qCdL2bXTAxE5PECAwEAAQ==")); // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}