import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizsetCard from './QuizsetCard';
import Loader from '../../app/componets/Loader';

import { handleDeleteQuizset, getQuizsets } from '../actions/actions.quizset';

import { BASE_URL } from '../../static';

class ListQuizsets extends Component {
  componentDidMount = () => {
    const { jwt } = localStorage;
    if (jwt) {
      this.props.dispatch(getQuizsets(BASE_URL + '/quizsets', jwt));
    } else {
      console.log('not authorized!');
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
    console.log(isLoading, 'isLoading...', quizsets, 'list quizsets rndr...');

    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : quizsets.quizsets && quizsets.quizsets.length ? (
          <div className='container'>
            <div className='quizset-card-grid'>
              {quizsets.quizsets.map(quizset => {
                return (
                  <div key={quizset._id}>
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
