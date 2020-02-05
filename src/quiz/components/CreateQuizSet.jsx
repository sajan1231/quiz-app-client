import React, { Component } from 'react';
import { createQuizSet } from '../actions/index';
import { connect } from 'react-redux';

import { BASE_URL } from '../../static';

class CreateQuizSet extends Component {
  state = {
    name: ''
  };

  handleCreateQuizSet = e => {
    e.preventDefault();
    const { jwt } = localStorage;
    const { name } = this.state;
    if (jwt && name) {
      this.props.dispatch(
        createQuizSet(
          BASE_URL + '/quiz-sets',
          jwt,
          this.state,
          this.props.history
        )
      );
    } else {
      this.setState({ error: 'required field is missing' });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateQuizSet}>
          <input
            type='text'
            name='category'
            value={this.state.category}
            placeholder='e.g science'
          />
          <button>Create</button>
        </form>
      </div>
    );
  }
}

export default connect()(CreateQuizSet);
