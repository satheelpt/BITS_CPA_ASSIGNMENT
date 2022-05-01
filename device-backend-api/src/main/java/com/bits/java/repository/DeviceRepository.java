package com.bits.java.repository;

import com.bits.java.domain.DeviceData;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class DeviceRepository {

    private CollectionReference collectionReference;

    public DeviceRepository(CollectionReference collectionReference) {
        this.collectionReference = collectionReference;
    }

    public List<DeviceData> readAllDeviceData() throws ExecutionException, InterruptedException {

        List<QueryDocumentSnapshot> documents = collectionReference.get().get().getDocuments();

        return documents.stream().map(doc -> doc.toObject(DeviceData.class)).collect(Collectors.toList());
    }

    public DeviceData persistDeviceData(DeviceData deviceData) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = collectionReference.document(deviceData.getName());
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        deviceData.setLastUpdatedTS(Timestamp.now());
        if (documentSnapshot.exists()) {
            documentReference.set(deviceData);
        } else {
            documentReference.create(deviceData);
        }
        return deviceData;
    }


    public String deleteDevice(String deviceName) {
        collectionReference.document(deviceName).delete();
        return deviceName + "deleted successfully";

    }
}
