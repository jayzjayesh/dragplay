import React,{Component} from "react";


export default class Form extends React.Component{

    constructor(props){
        super();

        this.state ={
        }
    }
    
    render(){
        return(
            <div className="form-data">
                <span className="form-header">Edit {this.props.sourceid} <i className="fas fa-times fa-xs" onClick = {this.props.onclickclose}></i> </span>
                
            <form className="form-content">
            <div className="col-md-12">
          <div className="form-group">
          <label className="form-label">Text</label>
            <input type="text" className="form-control form-control-sm" id="inputText" placeholder="Enter Text" defaultValue={this.props.eleData.inputText}/>
          </div>
          <div className="form-group">
          <label className="form-label">X</label>
            <input type="text" className="form-control form-control-sm" id="inputText" placeholder="Enter Text" defaultValue = {this.props.clientX}/>
          </div>
          <div className="form-group">
          <label className="form-label">Y</label>
            <input type="text" className="form-control form-control-sm" id="inputText" placeholder="Enter Y" defaultValue = {this.props.clientY}/>
          </div>
          <div className="form-group">
          <label className="form-label">Font Size</label>
            <input type="text" className="form-control form-control-sm" id="inputText" placeholder="Enter Size" defaultValue={this.props.eleData.fontSize}/>
          </div>
          <div className="form-group">
          <label className="form-label">Font Weight</label>
            <input type="text" className="form-control form-control-sm" id="inputText" placeholder="Enter Weight" defaultValue={this.props.eleData.fontWeight}/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick = {this.props.onclick}>Submit</button>
        </form>
        
        </div>
        )
    }
}