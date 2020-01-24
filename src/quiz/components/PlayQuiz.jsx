import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from './QuizCard';
import updateScore, { incUsersTotalScore } from '../../utils/updateScore';

const BASE_URL = 'http://localhost:8000/api/v1';

class PlayQuiz extends Component {
  state = {
    questions: [],
    counter: 0,
    isAnswered: false,
    score: 0
  };

  componentDidMount = () => {
    this.fetchQuiz(BASE_URL + '/questions');
  };

  fetchQuiz = url => {
    const { jwt } = localStorage;
    if (jwt) {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.setState({ questions: data.questions });
            this.props.dispatch({
              type: 'GET_QUIZES',
              payload: data.questions.reverse()
            });
          } else {
            this.setState({ err: data.message });
          }
        })
        .catch(err => {
          console.log('fetch quiz error...');
        });
    }
  };

  dispatchUpdateUser = data => {
    if (data && data.user) {
      this.props.dispatch({ type: 'UPDATE_USER', payload: data });
    } else if (!data || !data.user) {
      return null;
    }
  };

  incrementTotalScore = async jwt => {
    let data = await incUsersTotalScore(
      BASE_URL + '/users/update/total-score',
      jwt
    );
    this.dispatchUpdateUser(data);
  };

  updateUserScore = async (score, jwt) => {
    let data = await updateScore(BASE_URL + '/users/update', jwt, score);
    this.dispatchUpdateUser(data);
  };

  handleClick = (option, question) => {
    const { questions, counter } = this.state;
    const { jwt } = localStorage;

    if (counter <= questions.length - 1) {
      if (option && option === question.answer) {
        if (option && counter < questions.length - 1) {
          document.getElementById(option).classList.add('is-success');
        }

        this.setState(
          state => {
            return {
              score: state.score + 1,
              isAnswered: !this.state.isAnswered
            };
          },
          () => {
            this.updateUserScore(this.state.score, jwt);
            this.incrementTotalScore(jwt);
          }
        );

        setTimeout(
          () =>
            this.setState(
              state => {
                return {
                  counter: state.counter + 1,
                  isAnswered: !state.isAnswered
                };
              },
              () => {
                if (option && counter < questions.length - 1) {
                  document
                    .getElementById(option)
                    .classList.remove('is-success');
                }
              }
            ),
          500
        );
        return true;
      } else {
        if (option && counter < questions.length - 1) {
          document.getElementById(option).classList.add('is-danger');
        }

        this.setState({ isAnswered: !this.state.isAnswered });
        setTimeout(
          () =>
            this.setState(
              state => {
                return {
                  counter: state.counter + 1,
                  isAnswered: !state.isAnswered
                };
              },
              () => {
                if (option && counter < questions.length - 1) {
                  document.getElementById(option).classList.remove('is-danger');
                }
              }
            ),
          500
        );
        return false;
      }
    } else {
      return null;
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 });
  };

  handleDeleteQuiz = id => {
    const { jwt } = localStorage;
    if (jwt) {
      fetch(BASE_URL + '/questions/' + id + '/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            this.props.dispatch({
              type: 'DELETE_QUIZ',
              payload: id
            });
            this.props.history.push('/');
            window.location.reload();
          }
          if (!data.success) {
            console.log(data.message, 'delete question unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'delete question catch err...');
        });
    }
  };

  render() {
    const { questions, counter, isAnswered } = this.state;
    const { user } = this.props.user;

    return (
      <div style={{ marginTop: '50px ' }}>
        {questions ? (
          <QuizCard
            question={
              counter <= questions.length - 1 ? questions[counter] : null
            }
            handleClick={this.handleClick}
            user={user}
            resetCounter={this.resetCounter}
            isAnswered={isAnswered}
            handleDeleteQuiz={this.handleDeleteQuiz}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(PlayQuiz);
