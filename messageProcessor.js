/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

const GroveSensor = require('./groveSensor.js');
const SimulatedSensor = require('./simulatedSensor.js');

function MessageProcessor(option) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  this.sensor = option.simulatedData ? new SimulatedSensor() : new GroveSensor(option.sensorPin);
  this.deviceId = option.deviceId;
  this.temperatureAlert = option.temperatureAlert;
}

MessageProcessor.prototype.getMessage = function (messageId, cb) {
  this.sensor.read((err, data) => {
    if (err) {
      console.log('[Sensor] Read data failed: ' + err.message);
      return;
    }

    cb(JSON.stringify({
      messageId: messageId,
      deviceId: this.deviceId,
      temperature: data.temperature
    }), data.temperature > this.temperatureAlert);
  });
}

module.exports = MessageProcessor;
