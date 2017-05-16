export default {
  schema: {
    name: { type: String, unique: true }, // 基本上以服务的名字命名, unique会自动为name字段创建索引
    hosts: { type: Array }, // server hosts
    weight: { type: Number }, // 权重
    _status: { type: Number, default: 1 } // 0: 隐藏 1: 显示
  },
  name: 'Server',
  collection: 'server'
  // index: [
  //   {
  //     field: { name: 1 },
  //     options: null
  //   },
  //   {
  //     field: { hosts: 1 },
  //     options: null
  //   },
  //   {
  //     field: { name: 1, weight: 1 },
  //     options: null
  //   }
  // ]
};
