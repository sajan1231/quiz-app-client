import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uuid } from 'uuidv4';

import QuizsetCard from './QuizsetCard';
import Loader from '../../app/componets/Loader';

import { handleDeleteQuizset, getQuizsets } from '../actions/actions.quizset';
import { BASE_URL } from '../../static';

class ListQuizsets extends Component {
  componentDidMount = () => {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(getQuizsets(BASE_URL + '/quizsets', jwt));
    }
  };

  deleteQuizset = id => {
    const { jwt } = localStorage;
    if (jwt && id) {
      this.props.dispatch(
        handleDeleteQuizset(BASE_URL + '/quizsets/' + id + '/delete', jwt, id)
      );
    }
  };

  render() {
    const { user, quizsets } = this.props;
    const { isLoading } = quizsets;

    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : quizsets.quizsets && quizsets.quizsets.length ? (
          <div className='container'>
            <div className='quizset-card-grid'>
              {quizsets.quizsets.map((quizset, i) => {
                return (
                  <div key={uuid()}>
                    <QuizsetCard
                      quizset={quizset}
                      user={user.user}
                      deleteQuizset={this.deleteQuizset}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className='title h4'>No Quizsets!</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ListQuizsets);
