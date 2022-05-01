import React, { Component } from "react";

import "antd/dist/antd.css";
import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import "./Switches.scss";

class Switches extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="switches">
        <div className="buttons-container">
          {this.props.name.toUpperCase()} :{" "}
          <Button
            style={{ background: this.props.status === "on" ? "green" : "red" }}
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={() =>
              this.props.toggleSwitch(this.props.name, this.props.status)
            }
          >
            {this.props.status}
          </Button>
        </div>
      </div>
    );
  }
}

export default Switches;
