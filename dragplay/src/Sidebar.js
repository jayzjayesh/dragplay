import React, { Component } from "react";
import Label from "./Label";

export default class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title" draggable="true">
          Blocks
        </h1>
        <Label />
      </div>
    );
  }
}
