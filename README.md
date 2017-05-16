# 需求分析

## schedule

1. 启动时，拉取mongodb中存储的监控server数据。

2. 然后利用node异步特点。拉取每个server的hosts中配置的地址的服务进程数据。

3. 将拉取到的server数据，通过以配置的server的name为名字的socket room中广播出去。

## socket

1. 所有socket链接时，自动加入以server name为名字的房间中。


### schdule 结构

* loader: read server data from mongodb

* scheduler

* poller: poll server status via http request

* analyzer: analyze server status data

* dispatcher: dispatch status data to socket room