// import Influx from 'influx';
const Influx = require('influx');


const schema = [
  {
    measurement: 'server',
    fields: {
      uptime: Influx.FieldType.INTEGER,
      cpu_num: Influx.FieldType.INTEGER,
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
      pid: Influx.FieldType.INTEGER,
      memory_usage: Influx.FieldType.INTEGER,
      cpu_usage: Influx.FieldType.INTEGER,
      status: Influx.FieldType.STRING
    },
    tags: [
      'app_name',
      'hostname',
      'ip'
    ]
  },
  {
    measurement: 'metadata',
    fields: {
      restart: Influx.FieldType.INTEGER,
      uptime: Influx.FieldType.FLOAT,
      exec_mode: Influx.FieldType.STRING,
      node_version: Influx.FieldType.STRING,
      unstable_restart: Influx.FieldType.INTEGER
    },
    tags: [
      'app_name',
      'hostname',
      'ip'
    ]
  },
  {
    measurement: 'metrics',
    fields: {
      loop_delay: Influx.FieldType.FLOAT,
      qps: Influx.FieldType.FLOAT,
      port: Influx.FieldType.STRING,
      http_latency: Influx.FieldType.FLOAT,
      network_download: Influx.FieldType.FLOAT,
      network_upload: Influx.FieldType.FLOAT,
      global_size: Influx.FieldType.FLOAT,
      files_count: Influx.FieldType.INTEGER
    },
    tags: [
      'app_name',
      'hostname',
      'ip'
    ]
  },
  {
    measurement: 'server_info',
    fields: {
      loadavg_0: Influx.FieldType.FLOAT,
      loadavg_1: Influx.FieldType.FLOAT,
      loadavg_2: Influx.FieldType.STRING,
      total_mem: Influx.FieldType.INTEGER,
      free_mem: Influx.FieldType.INTEGER,
      cpu_usage: Influx.FieldType.FLOAT,
      operating_system: Influx.FieldType.STRING,
      avail_disk: Influx.FieldType.FLOAT,
      used_space: Influx.FieldType.STRING,
      free_memory: Influx.FieldType.FLOAT,
      used_memory: Influx.FieldType.STRING,
      network_in: Influx.FieldType.FLOAT,
      network_out: Influx.FieldType.FLOAT,
      total_processes: Influx.FieldType.INTEGER
    },
    tags: [
      'hostname',
      'ip'
    ]
  }
];

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'mydb',
  username: 'admin',
  password: 'admin',
  schema
});

export default influx;

