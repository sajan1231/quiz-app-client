import React, { Component } from 'react';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class EditQuiz extends Component {
  state = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    category: '',
    answer: ''
  };

  componentDidMount = () => {
    const questionId = window.location.pathname.split('/')[2];
    const { jwt } = localStorage;

    if (jwt && questionId) {
      fetch(BASE_URL + '/quizzes/' + questionId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({ ...data.quiz });
          }
          if (!data.success) {
            console.log('get quiz unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'get quiz catch err...');
        });
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionUpdate = () => {
    const { question, option1, option2, option3, option4, answer } = this.state;
    const questionId = window.location.pathname.split('/')[2];

    const { jwt } = localStorage;
    if (jwt && question && option1 && option2 && option3 && option4 && answer) {
      const quiz = { ...this.state, answer: answer.toLowerCase() };

      fetch(BASE_URL + '/quizzes/' + questionId + '/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        },
        body: JSON.stringify(quiz)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.props.dispatch({
              type: 'UPDATE_QUIZ',
              payload: data.quiz
            });

            this.setState(
              {
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                category: '',
                answer: ''
              },
              () => this.props.history.push('/')
            );
          }

          if (!data.success) {
            console.log('quiz update unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'update quiz catch err...');
        });
    }
  };

  render() {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      category
    } = this.state;

    return (
      <div style={{ margin: '50px 0' }}>
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
              <label class='label'>Category</label>
              <div class='control'>
                <input
                  class='input'
                  type='text'
                  name='category'
                  value={category}
                  required
                  onChange={this.handleInputChange}
                  placeholder='e.g. science'
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
                onClick={this.handleQuestionUpdate}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EditQuiz);
