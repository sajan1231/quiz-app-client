import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createQuizset } from '../actions/actions.quizset';

import { BASE_URL } from '../../static';

class CreateQuizset extends Component {
  state = {
    name: '',
    error: ''
  };

  handleCreateQuizset = e => {
    e.preventDefault();
    const { jwt } = localStorage;
    const { name } = this.state;
    if (jwt && name) {
      this.props.dispatch(
        createQuizset(
          BASE_URL + '/quizsets',
          jwt,
          this.state,
          this.props.history
        )
      );
      this.setState({ name: '' });
    } else if (!name) {
      this.setState({ error: 'Quizset name is required!' });
    } else if (!jwt) {
      this.setState({ error: 'Not Authorized!' });
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value.toLowerCase() });
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
              <label className='label'>Quizset name</label>
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
                onClick={this.handleCreateQuizset}
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

export default connect(mapStateToProps)(CreateQuizset);
