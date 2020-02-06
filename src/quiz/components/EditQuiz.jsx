import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../app/componets/Loader';

import { handleUpdateQuestion } from '../actions';

import { BASE_URL } from '../../static';

class EditQuiz extends Component {
  state = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    category: '',
    answer: '',
    error: '',
    isLoading: true
  };

  componentDidMount = () => {
    const questionId = window.location.pathname.split('/')[2];
    const { jwt } = localStorage;

    if (jwt && questionId) {
      this.getQuiz(BASE_URL + '/quizzes/' + questionId, jwt);
    }
  };

  getQuiz = (url, token) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ ...data.quiz, isLoading: false });
        }
        if (!data.success) {
          this.setState({
            error: 'quiz not forund...'
          });
          console.log('edit quiz not found');
        }
      })
      .catch(err => {
        this.setState({
          error: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'get quiz catch err...');
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionUpdate = () => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      category
    } = this.state;
    const questionId = window.location.pathname.split('/')[2];

    const { jwt } = localStorage;
    if (jwt && question && option1 && option2 && option3 && option4 && answer) {
      const quiz = {
        ...this.state,
        category: category.toLowerCase(),
        answer: answer.toLowerCase()
      };

      const url = BASE_URL + '/quizzes/' + questionId + '/update';
      this.props.dispatch(
        handleUpdateQuestion(url, jwt, quiz, questionId, this.props.history)
      );
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
      category,
      error,
      isLoading
    } = this.state;

    return (
      <div style={{ margin: '100px 0' }}>
        {error ? <h1 className='title h4'>{error}</h1> : ''}
        <div className='container'>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='notification'>
              <div className='field'>
                <label className='label'>Question</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='question'
                    placeholder='e.g What does ISRO stands for?'
                    required
                    value={question}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'>Category</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='category'
                    value={category}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. science'
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'>Option 1</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='option1'
                    value={option1}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. Indian Space Reserch Organization'
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'>Option 2</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='option2'
                    value={option2}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. Indian Space Reserch Organization'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Option 3</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='option3'
                    value={option3}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. Indian Space Reserch Organization'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Option 4</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='option4'
                    value={option4}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. Indian Space Reserch Organization'
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Answer</label>
                <div className='control'>
                  <input
                    className='input'
                    type='text'
                    name='answer'
                    value={answer}
                    required
                    onChange={this.handleInputChange}
                    placeholder='e.g. option 1'
                  />
                </div>
              </div>

              <div className='control'>
                <button
                  className='button is-primary'
                  onClick={this.handleQuestionUpdate}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(EditQuiz);
