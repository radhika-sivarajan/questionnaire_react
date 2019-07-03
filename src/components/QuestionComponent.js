import React from 'react';
import PropTypes from 'prop-types';

let selectedOption = {};

class QuestionComponent extends React.Component{   
  constructor(props) {
    super(props);
    this.state = {
      questionnaire : this.props.inputQuestionnaire,
      objOptions : {},
      status: "Answer is Incorrect",
      imageSrc: "",
      color: "#fd6844a3",
    };
    this.toggleBg = this.toggleBg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleBg() {
    var newColor = this.state.color === "#fd6844a3" ? "#4caf508c" : "#fd6844a3";
    this.setState({color: newColor});
  }
  
  handleSubmit(){
    const isAlltrue = Object.values(this.state.objOptions).every(answeredOption => (answeredOption === true));
    if(isAlltrue){
      this.setState({
        status: "Answer is CORRECT",
        imageSrc: this.state.questionnaire.answerImageURL
      });
    }
  }

  handleChange(event){
    this.toggleBg();
    const choiceLength = Object.keys(this.state.questionnaire.choices).length;
    let option = event.target.name;
    let answer = this.toBoolean(event.target.value);
    selectedOption[option] = answer;
    this.setState({objOptions:selectedOption});

    let objOptionsLength = Object.keys(this.state.objOptions).length;
    if(objOptionsLength === choiceLength){
        this.handleSubmit();
    } 
    console.log(this.state.objOptions);
  }

  toBoolean(value){
    if (typeof(value) === 'string'){
      value = value.trim().toLowerCase();
    }
    switch(value){
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default: 
        return false;
    }
  }

  renderChoices() {   
    const quChoices = this.state.questionnaire.choices;
    const allChoices = Object.keys(quChoices).map((option, index) => {
      return (
        <div key={index} className="switch" >
          {
            Object.keys(quChoices[option]).map((answer, i) => {               
              return (
                <span key={i}>
                  <input id={option +"-"+ i} 
                  className="switch-input" 
                  type = "radio" 
                  name = {option} 
                  value = {quChoices[option][answer]} 
                  onChange={this.handleChange}
                  />
                  <label className={"label"+ i}  htmlFor={option +"-"+ i} >{answer}</label>
                </span>  
              )    
            })
          }
        </div> 
      ); 
    });
    return (
      <form>
        {allChoices}
      </form> 
    ); 
  }

  render() { 
    return (
      <div className="main-app" style={{background: this.state.color}}>
        <div className="puzzle-box">
          <div className="question"><p>{this.state.questionnaire.question}</p></div>
          {this.renderChoices()} 
          <div className="status">{this.state.status}</div>       
        </div>  
        <img src={this.state.imageSrc} width="50%"/>  
      </div>            
    );        
  }
};

QuestionComponent.propTypes = {
  inputQuestionnaire: PropTypes.object.isRequired,
};
  
export default QuestionComponent;