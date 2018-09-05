'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const stream = require('stream');
const blocked = require('blocked');
const pidusage = require('pidusage');
const path = require('path');

if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config({
    path: path.resolve(__dirname, '.env')
  });
}

const INFLUXDB_URL = process.env.INFLUXDB_URL;
const METRICS_DATABASE = process.env.METRICS_DB;
const REGION = process.env.REGION;

function streamify(text) {
  const s = new stream.Readable();
  s.push(text);
  s.push(null);
  return s;
}

function pushMetric(metricName, value) {
  const influxURL = new url.URL(INFLUXDB_URL);
  const options = {
    protocol: influxURL.protocol,
    host: influxURL.hostname,
    port: influxURL.port,
    path: `${influxURL.pathname}${influxURL.search}`,
    method: 'POST'
  };

  streamify(`${metricName},host=${process.pid},region=${REGION} value=${value} ${Date.now() * 1000000}\n`)
    .pipe(http.request(options)).on('error', () => {});
}

let blockedTimer;
let generalMetricsTimer;
const enableEventLoopMetric = () => {
  blockedTimer = blocked(ms => pushMetric('event_loop', ms), { threshold: 1 });
};

const clear = () => {
  clearInterval(blockedTimer);
  clearInterval(generalMetricsTimer);
};

const toggle = () => {
  if (process.debugMode === true) {
    process.debugMode = false;
    clear();
    console.log('[debug] stopped metrics collection');
  } else {
    process.debugMode = true;
    enableEventLoopMetric();
    enableGenericMetrics();
    console.log('[debug] enabled metrics collection');
  }
};

const getMaximumFileDescriptors = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('/proc/sys/fs/file-max', 'utf8', (err, maxFds) => {
      if (err) {
        return reject(err);
      }
  
      resolve(Number(maxFds));
    });
  });
};

const getOpenFileDescriptors = () => {
  return new Promise((resolve, reject) => {
    fs.readdir('/proc/self/fd', (err, list) => {
      if (err) {
        return reject(err);
      }
      // Minus 1, as this invocation created one
      resolve(list.length - 1);
    });
  });
};

const metricsInterval = process.env.METRICS_INTERVAL || 3000;
const enableGenericMetrics = () => {
  generalMetricsTimer = setInterval(() => {
    pushMetric('uptime', process.uptime());
    pushMetric('active_requests', process._getActiveRequests().length);
    pushMetric('active_handlles', process._getActiveHandles().length);
  
    const mem = process.memoryUsage();
    pushMetric('memory_rss', mem.rss);
    pushMetric('memory_heapTotal', mem.heapTotal);
    pushMetric('memory_heapUsed', mem.heapUsed);
    pushMetric('memory_external', mem.external);
  
    pidusage(process.pid, (err, stats) => {
      if (err) return err;
      pushMetric('cpu_usage', stats.cpu);
    });
  
    pushMetric('nodejs_version', `\"${process.versions.node}\"`);
    pushMetric('v8_version', `\"${process.versions.v8}\"`);
    getMaximumFileDescriptors().then(res => pushMetric('max_fds', res));
    getOpenFileDescriptors().then(res => pushMetric('open_fds', res));
  }, metricsInterval);
};

toggle();

process.on('SIGUSR2', toggle);