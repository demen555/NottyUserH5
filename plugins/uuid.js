// plugins/uuid-plugin.js
import { v4 as uuidv4 } from 'uuid';

export default (context, inject) => {
  // 生成 UUID
  const uuid = uuidv4();
  // 将 UUID 注入到应用的上下文中
  context.$uuid = uuid;
  // 将 UUID 注入到 Vue 实例中，以便在组件中使用
  inject('uuid', uuid);
};
