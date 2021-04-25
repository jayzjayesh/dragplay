import React, { Component } from "react";

import Form from "./Form";

var uuid = require("uuid");

export default class MainPage extends React.Component {

    /*
    States and their use explained :
    showForm : Shows the form when element is dragged or Enter is pressed on element.
    sourceId : Gives the sourceid of element being dragged or the element where Enter is pressed.
    clientX  : Gives X co-ordinate where the element is dragged. This is updated whenever element is clicked and after dragging.
    clientY  : Gives Y co-ordinate where the element is dragged. This is updated whenever element is clicked and after dragging.
    elementX : Gives the X co-ordinate after the current element is dragged by the user.
    elementY : Gives the Y co-ordinate after the current element is dragged by the user.
    isMouseDown : Returns true if the current element has been clicked else false.
    currentElement : Returns the current element which is clicked.
    currentElements : Returns the array of elements currently created on the page.
    
    */

    constructor(props){
        super();

        this.state = {
            showForm : false,
            sourceId : null,
            clientX : 0,
            clientY : 0,
            elementX : 0,
            elementY : 0,
            isMouseDown : false,
            currentElement : {
                id : null,
                inputText : null,
                fontSize : null,
                fontWeight : null

            },
            currentElements : []
        }
          //Binding different events to the current object   
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver  = this.handleDragOver.bind(this);
        this.handleDragEnd  = this.handleDragEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickElement = this.onClickElement.bind(this);
        this.onKeyElement = this.onKeyElement.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
    }

  componentDidMount() {

    // Added dragging listeners whenever a new element is dragged on the page or moved.
    var maindiv = document.getElementById("mainpage");
    maindiv.addEventListener("dragenter", this.handleDragEnter, false);
    maindiv.addEventListener("dragover", this.handleDragOver, false);
    maindiv.addEventListener("drop", this.handleDragEnd, false);
    maindiv.addEventListener("mousemove",this.mouseMove);

    // Get current elements on the page from the local storage.
    
    var getElements = JSON.parse(localStorage.getItem('currentElements'));

    if(getElements != null){
      this.setState({currentElements : getElements});
    }

    
  }


  handleDragEnter(e) {
    e.preventDefault();
    return true;
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }

  //When the component has been dragged on the page. Show the form with the X and Y co-ordinate. Also set the source id of current element dragged.
  //If current Element is not empty make it empty as nothing is selected currently. 

  handleDragEnd(e) {
    e.preventDefault();
    //console.log("Offet X :" + e.offsetX + "Y :" + e.offsetY);
    //console.log("Client X :" + e.clientX + "Y :" + e.clientY);
    var sourceid = e.dataTransfer.getData('sourceid');

    const currElementz = {
        id : null,
        inputText : null,
        fontSize : null,
        fontWeight : null
    }

    if(!this.state.showForm){
        this.setState({showForm : true,sourceId:sourceid,clientX : e.clientX,clientY : e.clientY,currentElement : currElementz});
    }
    
  }
  //Close the form when user pressed close button
  onClickClose(e){
      this.setState({showForm:false,currentId:null,sourceId:null});
  }

  //When users presses submit create the element by the details provided by the user. 
  //Get the source id from state to know which element has to be created. If source id is label. Label will be created.

  onClick(e){
      e.preventDefault();
      var inputz = document.querySelectorAll("#inputText");

      //If user has selected an element by pressing enter update the details of the element selected.

      if(this.state.currentElement.id){

      var currArr = this.state.currentElements;


      currArr.forEach((item) => {
          if(item.id == this.state.currentElement.id){
            item.inputType = this.state.sourceId.toLowerCase();
            item.inputText = inputz[0].value;
            item.inputX = inputz[1].value;
            item.inputY = inputz[2].value;
            item.fontSize = inputz[3].value;
            item.fontWeight = inputz[4].value;
          }
      });

      //console.log(currArr);

        const currElementz = {
            id : null,
            inputText : null,
            fontSize : null,
            fontWeight : null
        }
        //Set the current elements array to local storage
        localStorage.setItem('currentElements',JSON.stringify(currArr));

        this.setState({showForm:false,currentElements:currArr,currentElement:currElementz,sourceId:null});
      }


      //If new element is being created then create the new element if no current element is selected.
      if(!this.state.currentElement.id){
        const newElement = {
            id : uuid.v4(),
            inputType : this.state.sourceId.toLowerCase(),
            inputText : inputz[0].value,
            inputX : inputz[1].value,
            inputY : inputz[2].value,
            fontSize : inputz[3].value,
            fontWeight : inputz[4].value
        }
  
  
        var newArr = ([...this.state.currentElements,newElement]);

        //Set the current elements array to local storage

        localStorage.setItem('currentElements',JSON.stringify(newArr));
  
  
        this.setState({showForm : false,currentElements : [...this.state.currentElements,newElement]});

      }
     

  }
  //Change the border of element when clicked
  onClickElement(e){
    e.preventDefault();
    e.target.style.border = "0.1em solid red";

    var currEle = {
      id : e.target.id,
      inputText : null,
      fontSize : null,
      fontWeight : null
  }

  this.setState({currentElement : currEle});


  }


  //If Delete is pressed remove the element from the state array
  //If Enter is pressed show the form and update current element in the state with element where Enter is pressed.
  onKeyElement(e){

      if(e.key === 'Delete'){
        const currid = null;
        var currarr1 = this.state.currentElements.filter((item) => {
            return item.id != e.target.id
        });
        localStorage.setItem('currentElements',JSON.stringify(currarr1));
        this.setState({currentElements : currarr1});
      }

      if(e.key === 'Enter'){

        var currarr2 = this.state.currentElements.filter((item) => {
            return item.id == e.target.id
        });

        var newEleData = {
            id : e.target.id,
            inputText : currarr2[0].inputText,
            fontSize : currarr2[0].fontSize,
            fontWeight : currarr2[0].fontWeight
        }
         this.setState({currentElement:newEleData,showForm : true,sourceId:currarr2[0].inputType,clientX:currarr2[0].inputX,clientY:currarr2[0].inputY});
      }

  }
  //When user clicks an element set the current element id with element id also update the X and Y co-ordinates in the state
  mouseDown(e){
      var mouseX = e.clientX;
      var mouseY = e.clientY;
      /*
      var currEle = {
        id : e.target.id,
        inputText : null,
        fontSize : null,
        fontWeight : null
    }*/

      this.setState({clientX : mouseX,clientY:mouseY,isMouseDown : true});

  }

  //When user stops the mouse click get the current left and top position of the element and update it in the state.

  mouseUp(e){
    var elementX = parseInt(e.target.style.left) || 0;
    var elementY = parseInt(e.target.style.top) ||  0;

    var currArr = this.state.currentElements;


    currArr.forEach((item) => {
        if(item.id == e.target.id){
          item.inputX = elementX;
          item.inputY = elementY;
        }
    });
    
    
    localStorage.setItem('currentElements',JSON.stringify(currArr));

    this.setState({isMouseDown:false,elementX : elementX,elementY : elementY,currentElements:currArr});
  }

  //Dragging only works when user clicks and selects an element.
  //When user is moving the mouse keep changing the left and top property of element being dragged.
  //When user stops the dragging and again drags the drag should start from position when element was last dragged at.
  //deltaX and deltaY gives the initial position
  //ElementX and ElementY gives the position before and after drag
  mouseMove(e){
      if(!this.state.isMouseDown){
          return;
      }

      if(this.state.currentElement.id){

        var deltaX = e.clientX - this.state.clientX;
    var deltaY =   e.clientY - this.state.clientY;

    var element = document.getElementById(this.state.currentElement.id);
    element.style.left = this.state.elementX + deltaX + 'px';
    element.style.top = this.state.elementY + deltaY + 'px';

      }
      
  }


  render() {

    //Whenever set state or intial render is called get the values from state elements array and show on the main page. 
    // If state elements array is empty nothing will be shown.
    //Show the form if the state showForm is true.

    const newElements = this.state.currentElements.map((value,index) => 
            
            value.inputType == 'button' ?
            <button type={value.inputType} id={value.id} key={value.id} className="newInput" style={{fontSize : value.fontSize+'px',fontWeight : value.fontWeight,left : value.inputX+'px',top : value.inputY+'px',position : "absolute"}} onClick = {this.onClickElement} onKeyDown={this.onKeyElement} onMouseUp={this.mouseUp} onMouseDown = {this.mouseDown}>{value.inputText}</button>        
            : value.inputType == 'input' ?
            <input type="text" defaultValue={value.inputText} id={value.id} key={value.id} readOnly className="newInput" style={{fontSize : value.fontSize+'px',fontWeight : value.fontWeight,left : value.inputX+'px',top : value.inputY+'px',position : "absolute"}} onClick = {this.onClickElement} onKeyDown={this.onKeyElement} onMouseUp={this.mouseUp} onMouseDown = {this.mouseDown}/>    
            :
            <label id={value.id} key={value.id} className="newInput" style={{fontSize : value.fontSize+'px',fontWeight : value.fontWeight,left : value.inputX+'px',top : value.inputY+'px',position : "absolute"}} onClick = {this.onClickElement} onKeyDown={this.onKeyElement} tabIndex="1" onMouseUp={this.mouseUp} onMouseDown = {this.mouseDown}>{value.inputText}</label>
    );
   

    return <div className="mainpage" id="mainpage">
        {newElements}
        {this.state.showForm ? <Form onclick = {this.onClick} sourceid={this.state.sourceId} clientX = {this.state.clientX} clientY = {this.state.clientY} onclickclose={this.onClickClose} eleData={this.state.currentElement}/> : null}
    </div>;
  }
}
