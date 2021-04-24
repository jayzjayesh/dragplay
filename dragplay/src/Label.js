import React, { Component } from "react";

export default class Label extends React.Component {
  componentDidMount() {
    var element = document.querySelectorAll(".page-element");

    element.forEach(item => {
        item.addEventListener("dragstart", this.dragstartHandler, false);
        item.addEventListener("dragend", this.dragendHandler, false);
        item.addEventListener(
      "dragover",
      (e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
      },
      false
    );

    });
    
  }

  dragstartHandler(ev) {
    ev.dataTransfer.setData('sourceid',ev.target.id);
  }

  dragendHandler(ev) {
    ev.preventDefault();
  }

  render() {
    return (
        <div className="sidebar-elements">
      <div className="page-element" draggable id="Label">
        <i className="fas fa-grip-vertical"></i>
        Label
      </div>
      <div className="page-element" draggable id="Input">
      <i className="fas fa-grip-vertical"></i>
      Input
    </div>
    <div className="page-element" draggable id="Button">
    <i className="fas fa-grip-vertical"></i>
    Button
  </div>
  </div>
    );
  }
}
