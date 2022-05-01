package com.bits.java.domain;


import com.google.cloud.Timestamp;

public class DeviceData {

    private String name;
    private String status;
    private Timestamp lastUpdatedTS;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getLastUpdatedTS() {
        return lastUpdatedTS;
    }

    public void setLastUpdatedTS(Timestamp lastUpdatedTS) {
        this.lastUpdatedTS = lastUpdatedTS;
    }


}
