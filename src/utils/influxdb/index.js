import { InfluxDB, FieldType } from 'influx';
// const Influx = require('influx');


const schema = [
  {
    measurement: 'server',
    fields: {
      name: FieldType.STRING,
      hostname: FieldType.STRING,
      ip: FieldType.STRING,
      uptime: FieldType.INTEGER,
      cpu_num: FieldType.INTEGER,
    },
    tags: [
      'name',
      'hostname',
      'ip'
    ]
  },
  {
    measurement: 'process',
    fields: {
      app_name: FieldType.STRING,
      hostname: FieldType.STRING,
      ip: FieldType.STRING,
      pm2_id: FieldType.INTEGER,
      pid: FieldType.INTEGER,
      memory_usage: FieldType.INTEGER,
      cpu_usage: FieldType.INTEGER,
      status: FieldType.STRING
    },
    tags: [
      'app_name',
      'hostname',
      'ip',
      'pm_id_tag'
    ]
  },
  {
    measurement: 'metadata',
    fields: {
      app_name: FieldType.STRING,
      hostname: FieldType.STRING,
      ip: FieldType.STRING,
      pm2_id: FieldType.INTEGER,
      restart: FieldType.INTEGER,
      uptime: FieldType.FLOAT,
      exec_mode: FieldType.STRING,
      node_version: FieldType.STRING,
      unstable_restart: FieldType.INTEGER
    },
    tags: [
      'app_name',
      'hostname',
      'ip',
      'pm_id_tag'
    ]
  },
  {
    measurement: 'metrics',
    fields: {
      app_name: FieldType.STRING,
      hostname: FieldType.STRING,
      ip: FieldType.STRING,
      pm2_id: FieldType.INTEGER,
      loop_delay: FieldType.FLOAT,
      qps: FieldType.FLOAT,
      port: FieldType.STRING,
      http_latency: FieldType.FLOAT,
      network_download: FieldType.FLOAT,
      network_upload: FieldType.FLOAT,
      global_size: FieldType.FLOAT,
      files_count: FieldType.INTEGER
    },
    tags: [
      'app_name',
      'hostname',
      'ip',
      'pm_id_tag'
    ]
  },
  {
    measurement: 'server_info',
    fields: {
      hostname: FieldType.STRING,
      ip: FieldType.STRING,
      loadavg_0: FieldType.FLOAT,
      loadavg_1: FieldType.FLOAT,
      loadavg_2: FieldType.FLOAT,
      total_mem: FieldType.INTEGER,
      free_mem: FieldType.INTEGER,
      cpu_usage: FieldType.FLOAT,
      operating_system: FieldType.STRING,
      avail_disk: FieldType.FLOAT,
      used_space: FieldType.STRING,
      free_memory: FieldType.FLOAT,
      used_memory: FieldType.STRING,
      network_in: FieldType.FLOAT,
      network_out: FieldType.FLOAT,
      total_processes: FieldType.INTEGER
    },
    tags: [
      'hostname',
      'ip'
    ]
  }
];

const client = new InfluxDB({
  host: 'localhost',
  database: 'mydb',
  username: 'admin',
  password: 'admin',
  schema
});

export default client;

