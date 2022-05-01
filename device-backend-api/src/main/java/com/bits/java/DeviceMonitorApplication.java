package com.bits.java;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@SpringBootApplication
public class DeviceMonitorApplication {

	public static void main(String[] args) throws IOException {

		ClassLoader classLoader = DeviceMonitorApplication.class.getClassLoader();

		File file = new File(classLoader.getResource("serviceAccountFirebase.json").getFile());

		FileInputStream fileInputStream = new FileInputStream(file.getAbsolutePath());

		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(fileInputStream))
				.build();

		FirebaseApp.initializeApp(options);


		SpringApplication.run(DeviceMonitorApplication.class, args);
	}

}
