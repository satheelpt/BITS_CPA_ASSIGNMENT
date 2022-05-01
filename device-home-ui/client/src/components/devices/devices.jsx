import React, { Component } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./devices.scss";
import home from "../images/home.jpg";

import Switches from "../switches/Switches";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8001");

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      isUpdated: false,
    };
  }

  toggleSwitch = async (name, status) => {
    let toggleStatus = status === "on" ? "off" : "on";
    let resp = await axios.post("/api/home/persist", {
      params: {
        name: name,
        status: toggleStatus,
      },
      headers: { "content-type": "application/json" },
    });

    if (resp.status === 200) {
      let deviceData = this.state.deviceList;
      Object.values(deviceData).map((device) => {
        if (device.name === name) {
          device.status = toggleStatus;
        }
      });

      this.setState({ deviceList: deviceData, isUpdated: true });
    }
  };

  componentDidMount() {
    console.log("mounted");
    axios
      .get("/api/home/all")
      .then((resp) => {
        this.setState({ deviceList: resp.data });
      })
      .catch((err) => {
        alert("Error loading devices");
      });
    client.onopen = () => {
      console.log("WebSocket2 Client Connected");
    };
    client.onmessage = (message) => {
      //const dataFromServer = JSON.parse(message.data);
      console.log(message);
    };
  }
  render() {
    return (
      <div
        className="switches-container"
        style={{
          backgroundImage: `url(${home})`,
        }}
      >
        <h1 style={{ color: "#ffc800" }}>VIRTUAL SMART HOME EMULATOR</h1>
        {this.state.deviceList !== undefined &&
          Object.values(this.state.deviceList).map((device) => {
            return (
              <Switches
                key={device.name}
                name={device.name}
                status={device.status}
                toggleSwitch={this.toggleSwitch}
              />
            );
          })}
      </div>
    );
  }
}

export default Devices;
