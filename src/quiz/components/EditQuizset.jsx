import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateQuizset, getQuizsets } from '../actions/actions.quizset';
import { action } from '../../utils/helper';

import { BASE_URL } from '../../static';
import Loader from '../../app/componets/Loader';

class EditQuizset extends Component {
  state = {
    name: '',
    error: '',
    isLoading: true
  };

  componentDidMount = () => {
    const quizsetId = window.location.pathname.split('/')[2];

    const { jwt } = localStorage;

    if ((jwt, quizsetId)) {
      this.getQuizsets(BASE_URL + '/quizsets/' + quizsetId, jwt);
    } else if (!jwt) {
      this.setState({ error: 'Unauthorized!' });
    } else if (!quizsetId) {
      this.setState({ error: 'Quizset id not found' });
    }
  };

  getQuizsets = (url, token) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'cdm edit quizset...');
        if (data.success) {
          this.setState({ name: data.quizset.name, isLoading: false });
        }
        if (!data.success) {
          this.setState({ error: data.message, isLoading: false });
          console.log(data.message, 'delete quiz unsuccessfull...');
        }
      })
      .catch(err => {
        this.setState({ error: 'Something went wrong', isLoading: false });
        console.log(err, 'delete quiz catch err...');
      });
  };

  handleUpdateQuizset = e => {
    e.preventDefault();
    const { jwt } = localStorage;
    const { name } = this.state;
    const quizsetId = window.location.pathname.split('/')[2];

    console.log(jwt, 'jwt...');

    if (jwt && name && quizsetId) {
      this.props.dispatch(
        updateQuizset(
          BASE_URL + '/quizsets/' + quizsetId + '/update',
          jwt,
          name,
          this.props.history
        )
      );
      this.setState({ name: '' });
    } else if (!name) {
      this.handleError('Quizset name is required!');
    } else if (!jwt) {
      this.handleError('Not Authorized!');
    }
  };

  handleError = error => {
    this.setState({ error }, () =>
      setTimeout(() => this.setState({ error: ' ' }), 2000)
    );
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, error, isLoading } = this.state;

    console.log(this.props.error, 'estit err');

    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div style={{ marginTop: '100px' }}>
            <div className='container'>
              <div className='notification'>
                <label
                  className='label'
                  style={{ textAlign: 'center', color: 'red' }}
                >
                  {error || this.props.error || ''}
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
                    onClick={this.handleUpdateQuizset}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state.quizsets;

export default connect(mapStateToProps)(EditQuizset);
