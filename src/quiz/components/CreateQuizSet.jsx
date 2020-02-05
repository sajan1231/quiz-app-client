import React, { Component } from 'react';
import { createQuizSet } from '../actions/index';
import { connect } from 'react-redux';

import { BASE_URL } from '../../static';

class CreateQuizSet extends Component {
  state = {
    name: '',
    error: ''
  };

  handleCreateQuizSet = e => {
    e.preventDefault();
    const { jwt } = localStorage;
    const { name } = this.state;
    if (jwt && name) {
      this.props.dispatch(
        createQuizSet(
          BASE_URL + '/quizsets',
          jwt,
          this.state,
          this.props.history
        )
      );
    } else if (!name) {
      this.setState({ error: 'Quizset name is required!' });
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, error } = this.state;

    return (
      <div style={{ marginTop: '100px' }}>
        <div className='container'>
          <div className='notification'>
            <label className='label' style={{ textAlign: 'center' }}>
              {error || ''}
            </label>

            <div className='field'>
              <label className='label'>Answer</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  name='name'
                  value={name}
                  required
                  onChange={this.handleInputChange}
                  placeholder='e.g. science'
                />
              </div>
            </div>

            <div className='control'>
              <button
                className='button is-primary'
                onClick={this.handleCreateQuizSet}
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

function mapStateToProps(state) {
  console.log(state, 'create quizset map state...');
  return state;
}

export default connect(mapStateToProps)(CreateQuizSet);
