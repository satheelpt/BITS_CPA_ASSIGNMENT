package com.bits.java.controller;


import com.bits.java.domain.DeviceData;
import com.bits.java.exception.ValidationException;
import com.bits.java.service.DeviceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("/persist")
    public ResponseEntity<DeviceData> persistDeviceData(@RequestBody DeviceData deviceData) {

        if (null == deviceData) {
            throw new ValidationException("Input Cannot be null");
        }

        return new ResponseEntity<>(deviceService.persistDeviceData(deviceData), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<DeviceData>> getAllDevices() {

        return new ResponseEntity<>(deviceService.getAllDevices(), HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<String> deleteDevice(@RequestParam("deviceName") String deviceName) {

        if (!StringUtils.hasText(deviceName)) {
            throw new ValidationException("Input Cannot be null/empty");
        }
        return new ResponseEntity<>(deviceService.deleteDevice(deviceName), HttpStatus.OK);
    }
}
