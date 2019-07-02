import React from 'react';

let selectedOption = {};

class QuestionComponent extends React.Component{
   

    constructor(props) {
        super(props);
        this.state = {
            questionnaire : this.props.inputQuestionnaire,
            objOptions : {},
            status: "Answer is Incorrect",
        };
    }
    handleSubmit(){
        console.log('Perform submit action now');
        const isAlltrue = Object.values(this.state.objOptions).every(answeredOption => (answeredOption === true));
        if(isAlltrue){
            this.setState({
                status: "Answer is CORRECT"
            });
        }
    }

    handleChange(event){
        const choiceLength = Object.keys(this.state.questionnaire.choices).length;
        let option = event.target.name;
        let answer = this.toBoolean(event.target.value);
        selectedOption[option] = answer;
        this.setState({objOptions:selectedOption});
        let objOptionsLength = Object.keys(this.state.objOptions).length;
        if(objOptionsLength === choiceLength){
            this.handleSubmit();
        } 
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
                <div className="toggleRadio" key={index} onChange={this.handleChange.bind(this)}>
                    {
                        Object.keys(quChoices[option]).map((answer, i) => {               
                            return (
                                <span key={i}>
                                    <input type = "radio" name = {option} value = {quChoices[option][answer]}/>
                                    <label htmlFor="switch_left">{answer}</label>
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
            <div>
                <div>{this.state.questionnaire.question}</div>
                <p></p>  
                {this.renderChoices()} 
                <p></p>
                <div>{this.state.status}</div>    
            </div>
        );
    }
};
  
export default QuestionComponent;