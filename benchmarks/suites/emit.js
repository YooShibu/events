"use strict";

const { Suite } = require("benchmark");

const
    EE = require("event-emitter"),
    EE2 = require("eventemitter2"),
    EE3 = require("eventemitter3"),
    CE = require("component-emitter"),
    WE = require("wolfy87-eventemitter"),
    FE = require("@foxify/events").EventEmitter,
    Master = require("../../dist/index");

function listener() { }

const
    ee = EE(),
    ee2 = new EE2(),
    ee3 = new EE3(),
    ce = new CE,
    we = new WE(),
    fe = new FE(),
    master = new Master();

ee.on("foo", listener);
ee2.on("foo", listener);
ee3.on("foo", listener);
ce.on("foo", listener);
we.on("foo", listener);
fe.on("foo", listener);
master.on("foo", listener);

(new Suite())
    .add("event-emitter", function () {
        ee.emit("foo");
        ee.emit("foo", 1);
        ee.emit("foo", 1, 2);
        ee.emit("foo", 1, 2, 3);
    })
    .add("EventEmitter2", function () {
        ee2.emit("foo");
        ee2.emit("foo", 1);
        ee2.emit("foo", 1, 2);
        ee2.emit("foo", 1, 2, 2);
    })
    .add("EventEmitter3", function () {
        ee3.emit("foo");
        ee3.emit("foo", 1);
        ee3.emit("foo", 1, 2);
        ee3.emit("foo", 1, 2, 3);
    })
    .add("component-emitter", function () {
        ce.emit("foo");
        ce.emit("foo", 1);
        ce.emit("foo", 1, 2);
        ce.emit("foo", 1, 2, 3);
    })
    .add("wolfy87-eventemitter", function () {
        we.emit("foo");
        we.emit("foo", 1);
        we.emit("foo", 1, 2);
        we.emit("foo", 1, 2, 3);
    })
    .add("@foxify/events", function () {
        fe.emit("foo");
        fe.emit("foo", 1);
        fe.emit("foo", 1, 2);
        fe.emit("foo", 1, 2, 3);
    })
    .add("@yoshibu/events", function () {
        master.emit("foo");
        master.emit("foo", 1);
        master.emit("foo", 1, 2);
        master.emit("foo", 1, 2, 3);
    })
    .on('cycle', function cycle(e) {
        console.log(e.target.toString());
    })
    .on('complete', function completed() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });