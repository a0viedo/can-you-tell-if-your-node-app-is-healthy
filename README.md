# Can you tell me if your Node app is healthy?

> _If you can’t measure it, you can’t improve it_

Here you will find some great resources to start with monitoring of Node.js applications. For a demo of a custom instrumentation using InfluxDB and Grafana you can check the [example](./example) directory.


## Talks
- [What the heck is the event loop anyway?][what-the-heck-event-loop] _by Patrick_
- [Everything You Need to Know About Node.js Event Loop][everything-event-loop-talk] _by Bert Belder_
- [Into the Loop][in-the-loop] _by Jake Archivald_
- [Node's Event Loop From the Inside Out][the-event-loop-from-the-inside-out] _by Sam Roberts_

## Blog posts
- [What you should know to really understand the Node.js Event Loop][dkhan-article] - Daniel Khan
- [The Definitive Guide for Monitoring Node.js Applications][monitor-nodejs-risingstack] - RisingStack's blog
- [Node.js Performance Monitoring - Part 3: Debugging the Event Loop][understanding-parts-of-the-event-loop] - NodeSource's blog
- [Don't Block the Event Loop (or the Worker Pool)][dont-block-the-event-loop] - nodejs.org's guides
- [Overview of Blocking vs Non-Blocking][overview-blocking-vs-non-blocking] - nodejs.org's guides
- [The Node.js Event Loop, Timers, and process.nextTick()][the-nodejs-event-loop] - nodejs.org's guides

## Packages
- [blocked][blocked]: Check if a node event loop is blocked.
- [under-pressure][under-pressure]: Measure process load with automatic handling of "Service Unavailable" plugin for Fastify.
- [overload-protection][overload-protection]: Load detection and shedding capabilities for http, express, restify, and koa
- [nodejs-dashboard][nodejs-dashboard]: Telemetry dashboard for node.js apps from the terminal
- [node-clinic][node-clinic]: Clinic diagnoses your Node.js performance issues


[monitor-nodejs-risingstack]: https://blog.risingstack.com/monitoring-nodejs-applications-nodejs-at-scale/
[dkhan-article]: https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c
[understanding-parts-of-the-event-loop]: https://nodesource.com/blog/node-js-performance-monitoring-part-3-debugging-the-event-loop/
[the-event-loop-from-the-inside-out]: https://www.youtube.com/watch?v=P9csgxBgaZ8
[everything-event-loop-talk]: https://www.youtube.com/watch?v=PNa9OMajw9w
[dont-block-the-event-loop]: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/
[overview-blocking-vs-non-blocking]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[the-nodejs-event-loop]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
[nodejs-dashboard]: https://github.com/FormidableLabs/nodejs-dashboard
[blocked]: https://github.com/tj/node-blocked#readme
[under-pressure]: https://github.com/fastify/under-pressure
[overload-protection]: https://github.com/davidmarkclements/overload-protection
[what-the-heck-event-loop]: https://www.youtube.com/watch?v=8aGhZQkoFbQ
[in-the-loop]: https://www.youtube.com/watch?v=cCOL7MC4Pl0
[node-clinic]: https://github.com/nearform/node-clinic

## License
[MIT](./LICENSE)