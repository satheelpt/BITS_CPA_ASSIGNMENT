package com.bits.java.config;

import com.bits.java.config.properties.FirebaseProperties;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

    private final FirebaseProperties firebaseProperties;

    public FirebaseConfig(FirebaseProperties firebaseProperties) {
        this.firebaseProperties = firebaseProperties;
    }

    @Bean
    public CollectionReference collectionReference(){
        Firestore firestore = FirestoreClient.getFirestore();
        return firestore.collection(firebaseProperties.getCollectionId());
    }

    @Bean
    public Firestore firestore(){
       return FirestoreClient.getFirestore();
    }
}
