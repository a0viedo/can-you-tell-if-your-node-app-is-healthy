#!/bin/bash

docker network create nodejs-metrics > /dev/null
echo 'Initializing InfluxDB...'
docker run -d -p 8086:8086 --net nodejs-metrics --name nodejs-influx-metrics influxdb > /dev/null
# wait for Influx's HTTP API to be ready
sleep .5
echo 'Creating database...'
curl -XPOST 'http://localhost:8086/query' --data-urlencode 'q=CREATE DATABASE "mydb"' &> /dev/null
echo 'Initializing Grafana...'
docker run -d --name=nodejs-grafana-metrics -v $PWD/grafana/config.ini:/etc/grafana/config.ini -v $PWD/grafana/provisioning:/etc/grafana/provisioning -v $PWD/grafana/dashboards:/var/lib/grafana/dashboards --net nodejs-metrics -p 3000:3000 grafana/grafana > /dev/null

echo 'Configuration is done! Make sure you run `npm link` in this directory and `npm link metrics` in the directory of your app'