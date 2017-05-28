import { InfluxDB, FieldType } from 'influx';
// const Influx = require('influx');


const schema = [
  {
    measurement: 'server',
    fields: {
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
      pid: FieldType.INTEGER,
      memory_usage: FieldType.INTEGER,
      cpu_usage: FieldType.INTEGER,
      status: FieldType.STRING
    },
    tags: [
      'app_name',
      'hostname',
      'ip',
      'pm_id'
    ]
  },
  {
    measurement: 'metadata',
    fields: {
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
      'pm_id'
    ]
  },
  {
    measurement: 'metrics',
    fields: {
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
      'pm_id'
    ]
  },
  {
    measurement: 'server_info',
    fields: {
      loadavg_0: FieldType.FLOAT,
      loadavg_1: FieldType.FLOAT,
      loadavg_2: FieldType.STRING,
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

