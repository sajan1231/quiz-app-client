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
    category: '',
    quizsetId: ''
  };

  componentDidMount = () => {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(getQuizsets(BASE_URL + '/quizsets', jwt));
    } else {
      console.log('not authorized!');
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
      category,
      quizsetId
    } = this.state;

    if (
      jwt &&
      question &&
      option1 &&
      option2 &&
      option3 &&
      option4 &&
      answer &&
      category &&
      quizsetId
    ) {
      const quiz = { ...this.state, answer: answer.toLowerCase() };
      this.props.dispatch(
        handleCreateQuiz(BASE_URL + '/questions', jwt, quiz, this.props.history)
      );
    }
  };

  // handleSelectChange = e => {
  //   const { name, value } = e.target;
  //   console.log(name, value, 'handleSelectChange...');
  // };

  render() {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      category,
      errorMsg,
      successMsg
    } = this.state;

    console.log(this.state, 'state', this.props, 'create questions rndr...');
    const { quizsets } = this.props;
    const { isLoading } = quizsets;
    console.log(isLoading, quizsets, quizsets.length, 'quizsets.length...');

    return (
      <div style={{ marginTop: '100px' }}>
        <div className='container'>
          {isLoading ? (
            'loading...'
          ) : quizsets && quizsets.quizsets && quizsets.quizsets.length ? (
            <>
              <div className='notification'>
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

                <label className='label' style={{ textAlign: 'center' }}>
                  {successMsg || errorMsg || ''}
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
                  <label className='label'>Category</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      name='category'
                      placeholder='e.g science'
                      required
                      value={category}
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
