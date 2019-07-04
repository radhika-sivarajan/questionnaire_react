import React from 'react';
import './App.css';
import QuestionComponent from './components/QuestionComponent';

const problem = {
  question: "An animal cell contain",
  options: {
    option1: {
      "Cell wall" : false,
      "Ribosome" : true,
    },
    option2: {
      "Cytoplasm" : true,
      "Chloroplast" : false,
    },
    option3: {
      "Lysosome" : true,
      "Plasmodesmata" : false,
    },
    option4: {
      "Cellulose" : false,
      "Mitochondria" : true
    }
  },
  answerImageURL : "https://i.imgur.com/wzQzslM.png",
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
