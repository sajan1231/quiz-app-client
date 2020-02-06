import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleCreateQuiz } from '../actions';

import { getQuizsets } from '../actions/actions.quizset';

import { BASE_URL } from '../../static';
import { FaSellsy } from 'react-icons/fa';

class CreateQuestion extends Component {
  state = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quizsetId: '',
    error: ''
  };

  componentDidMount = () => {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(getQuizsets(BASE_URL + '/quizsets', jwt));
    } else {
      console.log('not authorized!');
    }
  };

  handleError = value => {
    this.setState({ error: value }, () =>
      setTimeout(() => this.setState({ error: '' }), 3000)
    );
  };

  handleSetState = (name, value) => {
    this.setState({ [name]: value });
  };

  handleInputChange = e => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      quizsetId
    } = this.state;

    const { name, value } = e.target;

    if (name === 'question' && !value) {
      this.handleError('Question is required!');
    } else if (
      name === 'option1' &&
      (value === option2 || value === option3 || value === option4)
    ) {
      this.handleError('option must be qnique!');
    } else if (
      name === 'option2' &&
      (value === option1 || value === option3 || value === option4)
    ) {
      this.handleError('option must be qnique!');
    } else if (
      name === 'option3' &&
      (value === option1 || value === option2 || value === option4)
    ) {
      this.handleError('option must be qnique!');
    } else if (
      name === 'option4' &&
      (value === option1 || value === option2 || value === option3)
    ) {
      this.handleError('option must be qnique!');
    } else if (
      name === 'answer' &&
      (value !== option1 ||
        value !== option2 ||
        value !== option3 ||
        value !== option4)
    ) {
      this.handleError('answer must be one of the option field e.g option1');
    } else {
      this.setState({ error: '' });
    }
    this.handleSetState(name, value);
  };

  handleQuestionSubmit = () => {
    const { jwt } = localStorage;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      quizsetId
    } = this.state;

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
        answer === 'option4') &&
      quizsetId
    ) {
      const quiz = { ...this.state, answer: answer.toLowerCase() };
      this.props.dispatch(
        handleCreateQuiz(BASE_URL + '/questions', jwt, quiz, this.props.history)
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
      this.handleError('optinons must be unique!');
    } else if (
      answer !== 'option1' ||
      answer !== 'option2' ||
      answer !== 'option3' ||
      answer !== 'option4'
    ) {
      this.handleError('answer must be one of the above options e.g option1!');
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
      error
    } = this.state;

    const { quizsets } = this.props;
    const { isLoading } = quizsets;
    console.log(this.state);

    return (
      <div style={{ marginTop: '100px' }}>
        <div className='container'>
          {isLoading ? (
            'loading...'
          ) : quizsets && quizsets.quizsets && quizsets.quizsets.length ? (
            <>
              <div className='notification'>
                <label
                  className='label'
                  style={{ textAlign: 'center', color: 'red' }}
                >
                  {error ? error : ''}
                </label>

                <div className='select'>
                  <select
                    name='quizsetId'
                    id=''
                    onChange={this.handleInputChange}
                  >
                    {' '}
                    <option value=''>Please select a quizset</option>
                    {quizsets.quizsets.map(quizset => (
                      <option value={quizset._id} key={quizset._id}>
                        {quizset.name}
                      </option>
                    ))}
                  </select>
                </div>

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
                    onClick={this.handleQuestionSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          ) : (
            'no quizsets...'
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(CreateQuestion);
