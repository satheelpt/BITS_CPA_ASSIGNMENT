package com.bits.java.service;

import com.bits.java.domain.DeviceData;
import com.bits.java.exception.FatalException;
import com.bits.java.pubsub.PubSubService;
import com.bits.java.repository.DeviceRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DeviceService {

    private final DeviceRepository repository;
    private PubSubService pubSubService;

    public DeviceService(DeviceRepository repository,  PubSubService pubSubService) {
        this.repository = repository;
        this.pubSubService = pubSubService;
    }

    public DeviceData persistDeviceData(DeviceData deviceData) {
        try {
            DeviceData result = repository.persistDeviceData(deviceData);
            pubSubService.publishMessage(deviceData);
            return result;
        } catch (Exception e) {
            throw new FatalException("Exception occurred while persisting data into firebase ", e);
        }
    }

    public String deleteDevice(String deviceName) {
        try {
            return repository.deleteDevice(deviceName);
        } catch (Exception e) {
            throw new FatalException("Exception occurred while deleting device in firebase ", e);
        }
    }


    public List<DeviceData> getAllDevices() {
        try {
            return repository.readAllDeviceData();
        } catch (Exception e) {
            throw new FatalException("Exception occurred while deleting device in firebase ", e);
        }
    }
}
