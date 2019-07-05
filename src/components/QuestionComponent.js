import React from 'react';
import PropTypes from 'prop-types';

let objOptions = {};

class QuestionComponent extends React.Component{   
  constructor(props) {
    super(props);
    this.state = {
      questionnaire : this.props.inputQuestionnaire,
      selectedOptions : {},
      status: "",
      imageSrc: "",
      color: "#fd6844a3",
      lockForm: false,
    };
    this.toggleBg = this.toggleBg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({status: "Answer is Incorrect",});
  }

  toggleBg() {
    var newColor = this.state.color === "#fd6844a3" ? "#f1e583" : "#fd6844a3";
    this.setState({color : newColor});
  }
  
  handleSubmit(){
    // Check if all answers are true
    const isAllTrue = Object.values(this.state.selectedOptions).every(answeredOption => (answeredOption === true));
    
    // If all answers are true - lock the form, update background color, update image url, Show success message.
    if(isAllTrue){
      this.setState({
        status : "Answer is CORRECT",
        imageSrc : this.state.questionnaire.answerImageURL,
        lockForm : true,
        color : "#0fa597",
      });
    }
  }

  handleChange(event){
    // Change back ground color with each change of answer
    this.toggleBg();

    // Get number of given options.
    // Get  selected options and its answer value then update status  of each option.
    const optionsLength = Object.keys(this.state.questionnaire.options).length;
    let option = event.target.name;
    let answer = this.toBoolean(event.target.value);
    objOptions[option] = answer;
    this.setState({selectedOptions : objOptions});

    // If all option are selected submit the form to check the answers
    let selectedOptionsLength = Object.keys(this.state.selectedOptions).length;
    if(selectedOptionsLength === optionsLength){
        this.handleSubmit();
    } 
    console.log(this.state.selectedOptions);
  }

  // Convert any "string" to boolean (True,False)
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

  // Render all options as radio button of two choices along with the label.
  renderOptions() {   
    const quOptions = this.state.questionnaire.options;
    const allOptions = Object.keys(quOptions).map((option, index) => {
      return (
        <div key={index} className="switch" >
          {
            Object.keys(quOptions[option]).map((answer, i) => {               
              return (
                <span key={i}>
                  <input id={option +"-"+ i} 
                  className="switch-input" 
                  type = "radio" 
                  name = {option} 
                  value = {quOptions[option][answer]} 
                  onChange={this.handleChange}
                  disabled={this.state.lockForm}
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
        {allOptions}
      </form> 
    ); 
  }

  render() { 
    return (
      <div className="main-app" style={{background: this.state.color}}>
        <div className="puzzle-box">
          <div className="question"><p>{this.state.questionnaire.question}</p></div>
          {this.renderOptions()} 
          <div className="status">{this.state.status}</div>       
        </div>  
        <img alt="" src={this.state.imageSrc} width="50%"/>   
      </div>            
    );        
  }
};

// Check all props are received correctly
QuestionComponent.propTypes = {
  inputQuestionnaire: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    answerImageURL:PropTypes.string.isRequired,
  }),
};
  
export default QuestionComponent;