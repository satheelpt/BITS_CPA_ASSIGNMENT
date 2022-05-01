# BITS_CPA_ASSIGNMENT

## Implementation Model of POC
The Proof of concept (POC) is implemented with two application sections: User interface
and Emulated Smart home to test the actions of device control.
This demonstrates the uses cases of User login with authentication, Device status View and
device control (with closed loop feedback).
#### 1. User interface App

● This web interface facilitates users to login and view the home page.
● Users can view the status of devices at home (Emulated).
● Also users can control the devices (Switch ON/OFF).
● User app will get updated only when the device confirms the action
happened.
● Control and feedback is a fully closed loop process userpage will update only
after the feedback from the device.
#### 2. Emulated Smart Home App

● This application is a virtually emulated smart home developed for POC.
● All the user actions on device control will reflect here and the corresponding
Pub-Sub feedback will be provided.

## Source code & Outputs Paths
Google Drive (Demo video & document) :
https://drive.google.com/drive/folders/1bhRVxduOa9HKRnG5_tRYG0Jh1xr-BQz8

Source code (Git path) :
https://drive.google.com/drive/folders/1bhRVxduOa9HKRnG5_tRYG0Jh1xr-BQz8
