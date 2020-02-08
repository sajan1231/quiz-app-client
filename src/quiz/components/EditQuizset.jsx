import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../app/componets/Loader';

import { updateQuizset } from '../actions/actions.quizset';
import { BASE_URL } from '../../static';

class EditQuizset extends Component {
  constructor(props) {
    super(props);
    this.quizsetId = window.location.pathname.split('/')[2];

    this.quizset = this.props.quizsets.reduce((acc, quizset) => {
      if (quizset._id === this.quizsetId) {
        acc = quizset;
        return acc;
      }
    }, {});

    console.log(this.quizsetId, this.quizset, 'costructor quizset...');

    // this.state = {
    //   name: this.quizset && this.quizset.name ? this.quizset.name : '',
    //   error: '',
    //   isLoading: false
    // };

    this.state = {
      name: '',
      error: '',
      isLoading: false
    };

    // this.input = React.createRef();
  }

  componentDidMount = () => {
    const quizsetId = window.location.pathname.split('/')[2];
    const { jwt } = localStorage;
    // const { quizsets } = this.props;

    // if (jwt && quizsetId && !quizsets|| !quizsets.length) {
    if (jwt && quizsetId) {
      this.getQuizset(BASE_URL + '/quizsets/' + quizsetId, jwt);
    } else if (!jwt || !quizsetId) {
      this.props.history.push('/');
    }
  };

  getQuizset = (url, token) => {
    this.setState({ isLoading: true });

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
          this.setState({ name: data.quizset.name, isLoading: false });
        }
        if (!data.success) {
          this.setState({ error: data.message, isLoading: false });
        }
      })
      .catch(err => {
        this.setState({ error: 'Something went wrong', isLoading: false });
        console.log(err, 'get quiz editQuizset catch err...');
      });
  };

  handleUpdateQuizset = e => {
    e.preventDefault();
    const { jwt } = localStorage;
    const { name } = this.state;
    const quizsetId = window.location.pathname.split('/')[2];

    if (jwt && name && quizsetId) {
      this.props.dispatch(
        updateQuizset(
          BASE_URL + '/quizsets/' + quizsetId + '/update',
          jwt,
          name,
          quizsetId,
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
    const loading = this.props.isLoading;

    // const quizset = this.props.quizsets.reduce((acc, quizset) => {
    //   if (quizset._id === this.quizsetId) {
    //     acc = quizset;
    //     return acc;
    //   }
    // }, {});

    // console.log(quizset, 'rndr quizset...');

    return (
      <div>
        {isLoading || loading ? (
          <Loader />
        ) : (
          <div style={{ paddingTop: '100px' }}>
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

                    {/* <input
                      className='input'
                      type='text'
                      name='name'
                      // value={name}
                      defaultValue={quizset.name}
                      ref={this.input}
                      required
                      onChange={this.handleInputChange}
                      placeholder='e.g. science'
                    /> */}
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
