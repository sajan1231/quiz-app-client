import React, { Component } from 'react';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class QuizForm extends Component {
  state = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionSubmit = () => {
    const { question, option1, option2, option3, option4, answer } = this.state;

    const { jwt } = localStorage;
    if (jwt && question && option1 && option2 && option3 && option4 && answer) {
      const quiz = { ...this.state, answer: answer.toLowerCase() };
      console.log(quiz, 'quiz.....');

      fetch(BASE_URL + '/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        },
        body: JSON.stringify(quiz)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, 'question post data...');
          if (data.success) {
            this.props.dispatch({
              type: 'CREATE_QUIZ',
              payload: data.question
            });
          }
          if (!data.success) {
            console.log('question post unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'question post catch err...');
        });
    }
  };

  render() {
    const { question, option1, option2, option3, option4, answer } = this.state;

    return (
      <div className='container'>
        <div class='notification'>
          <div class='field'>
            <label class='label'>Question</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='question'
                placeholder='e.g What does ISRO stands for?'
                required
                value={question}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div class='field'>
            <label class='label'>Option 1</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='option1'
                value={option1}
                required
                onChange={this.handleInputChange}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>

          <div class='field'>
            <label class='label'>Option 2</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='option2'
                value={option2}
                required
                onChange={this.handleInputChange}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Option 3</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='option3'
                value={option3}
                required
                onChange={this.handleInputChange}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Option 4</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='option4'
                value={option4}
                required
                onChange={this.handleInputChange}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Answer</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                name='answer'
                value={answer}
                required
                onChange={this.handleInputChange}
                placeholder='e.g. option 1'
              />
            </div>
          </div>

          <div class='control'>
            <button
              class='button is-primary'
              onClick={this.handleQuestionSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(QuizForm);
