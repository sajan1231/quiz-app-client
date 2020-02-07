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
    answer: '',
    error: '',
    isLoading: true
  };

  componentDidMount = () => {
    const questionId = window.location.pathname.split('/')[2];
    const { jwt } = localStorage;

    if (jwt && questionId) {
      this.getQuiz(BASE_URL + '/questions/' + questionId, jwt);
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
          this.setState({ ...data.question, isLoading: false });
        }
        if (!data.success) {
          this.setState({
            error: 'quiz not forund...'
          });
        }
      })
      .catch(err => {
        this.setState({
          error: 'something went wrong. sorry for the trouble.'
        });
        console.log(err, 'edit question fetch catch err...');
      });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleQuestionUpdate = () => {
    const { question, option1, option2, option3, option4, answer } = this.state;
    const questionId = window.location.pathname.split('/')[2];

    const { jwt } = localStorage;
    if (
      jwt &&
      question &&
      option1 &&
      option1 !== option2 &&
      option1 !== option3 &&
      option1 !== option4 &&
      option2 &&
      option2 !== option1 &&
      option2 !== option3 &&
      option2 !== option4 &&
      option3 &&
      option3 !== option1 &&
      option3 !== option2 &&
      option3 !== option4 &&
      option4 &&
      option4 !== option1 &&
      option4 !== option2 &&
      option4 !== option3 &&
      answer &&
      (answer === 'option1' ||
        answer === 'option2' ||
        answer === 'option3' ||
        answer === 'option4')
    ) {
      const quiz = {
        ...this.state,
        answer: answer.toLowerCase()
      };

      const url = BASE_URL + '/questions/' + questionId + '/update';
      this.props.dispatch(
        handleUpdateQuestion(url, jwt, quiz, questionId, this.props.history)
      );
    } else if (
      answer !== 'option1' &&
      answer !== 'option2' &&
      answer !== 'option3' &&
      answer !== 'option4'
    ) {
      this.handleError(
        'Answer must include the one of the above options e.g option1'
      );
    } else if (
      option1 === option2 ||
      option1 === option3 ||
      option1 === option4 ||
      option2 === option1 ||
      option2 === option3 ||
      option2 === option4 ||
      option3 === option1 ||
      option3 === option2 ||
      option3 === option4 ||
      option4 === option1 ||
      option4 === option2 ||
      option4 === option3
    ) {
      this.handleError('Options must have to be qnique!');
    }
  };

  handleError = msg => {
    this.setState({ error: msg }, () =>
      setTimeout(() => this.setState({ error: '' }), 3000)
    );
  };

  render() {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      error,
      isLoading
    } = this.state;

    return (
      <div style={{ margin: '100px 0' }}>
        <div className='container'>
          {isLoading ? (
            <Loader />
          ) : (
            <div className='notification'>
              <label className='label txt-center' style={{ color: 'red' }}>
                {error ? error : ''}
              </label>
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
