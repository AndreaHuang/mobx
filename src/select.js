import React,{Component} from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Model} from "./model.js";
export default class Select extends Component{

 constructor(props,context){
 	super(props,context);
 	//this.state={selection:this.props.values[0]}
 	//this.var=observable({selection:this.props.values[0]});
 	this.state = observable(new Model());
 }

render(){
	return (
      <ul onKeyDown={this.onKeyDown} tabIndex={0}>
        {this.props.values.map(value =>
          <li
            className={value === this.state.selection ? 'selected' : ''}
            key={value}
            onClick={() => this.onSelect(value)}
          >
            {value}
          </li> 
        )}  
      </ul>
    )
  	
  }
  onSelect(value) {
    //this.setState({selection : value});
    this.state.selection=value;
    this.fireOnSelect()
  }

  onKeyDown = (e) => {
    const {values} = this.props
    const idx = values.indexOf(this.state.selection)
    if (e.keyCode === 38 && idx > 0) { /* up */
      this.state.selection = values[idx - 1]
    } else if (e.keyCode === 40 && idx < values.length -1) { /* down */
      this.state.selection = values[idx + 1]
    }
    this.fireOnSelect()
  }
   
  fireOnSelect() {
    if (typeof this.props.onSelectFun === "function")
      this.props.onSelectFun(this.state.selection) /* solved! */
  }
}



