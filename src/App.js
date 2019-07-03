import React from 'react';
import './App.css';
import QuestionComponent from './components/QuestionComponent';

const problem = {
  question: "An animal cell contain",
  choices: {
    option1: {
      "Cell wall" : true,
      "Ribosome" : false,
    },
    option2: {
      "Cytoplasm" : true,
      "Chloroplast" : false,
    },
    option3: {
      "Partially permeable membrane" : true,
      "Impermeable membrane" : false,
    },
    option4: {
      "Cellulose" : false,
      "Mitochondria" : true
    }
  },
  answerImageURL : "",
};

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = problem;
  }
  render() {   
    return (
      <div className="App">
          <QuestionComponent inputQuestionnaire={this.state}/>
      </div>
    );
  }
};

export default App;
