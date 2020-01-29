import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from './QuizCard';
import updateScore, { incUsersTotalScore } from '../../utils/updateScore';

const BASE_URL = 'http://localhost:8000/api/v1';

class PlayQuiz extends Component {
  state = {
    quizzes: [],
    counter: 0,
    isAnswered: false,
    score: 0
  };

  componentDidMount = () => {
    this.fetchQuizzes(BASE_URL + '/quizzes');
  };

  fetchQuizzes = url => {
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
            this.setState({ quizzes: data.quizzes });
            this.props.dispatch({
              type: 'GET_QUIZES',
              payload: data.quizzes.reverse()
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
    if (data)
      this.dispatchUpdateUser({ ...data, currentScore: this.state.score });
  };

  updateUserScore = async (score, jwt) => {
    let data = await updateScore(BASE_URL + '/users/update/score', jwt, score);
    this.dispatchUpdateUser(data);
  };

  // new handleclick
  //
  // handleClick = (option, quiz) => {
  //   const { quizzes, counter } = this.state;
  //   const { jwt } = localStorage;

  //   if (counter <= quizzes.length - 1) {
  //     if (quiz && option && option === quiz.answer) {
  //       if (option && counter < quizzes.length - 1) {
  //         document.getElementById(quiz._id).classList.add('is-success');
  //         // document.getElementById(quiz._id).style.pointerEvents = 'none';
  //       }

  //       this.setState(
  //         state => {
  //           return {
  //             score: state.score + 1,
  //             isAnswered: !this.state.isAnswered
  //           };
  //         },
  //         () => {
  //           // this.updateUserScore(this.state.score, jwt);

  //           this.incrementTotalScore(jwt);
  //         }
  //       );

  //       setTimeout(
  //         () =>
  //           this.setState(
  //             state => {
  //               return {
  //                 counter: state.counter + 1,
  //                 isAnswered: !state.isAnswered
  //               };
  //             },
  //             () => {
  //               console.log(this, 'check 12');
  //               if (this.quiz && option && counter < quizzes.length - 1) {
  //                 document
  //                   .getElementById(this.quiz._id)
  //                   .classList.remove('is-success');
  //               }
  //             }
  //           ),
  //         2000
  //       );
  //       return true;
  //     } else {
  //       if (this.quiz && option && counter < quizzes.length - 1) {
  //         document.getElementById(this.quiz._id).classList.add('is-danger');
  //         // document.getElementById(this.quiz._id).style.pointerEvents = 'none';
  //         // document.getElementById(quiz._id).classList.add('disable');
  //       }

  //       this.setState({ isAnswered: !this.state.isAnswered });

  //       setTimeout(
  //         () =>
  //           this.setState(
  //             state => {
  //               return {
  //                 counter: state.counter + 1,
  //                 isAnswered: !state.isAnswered
  //               };
  //             },
  //             () => {
  //               if (option && counter < quizzes.length - 1) {
  //                 // document
  //                 //   .getElementById(this.quiz._id)
  //                 //   .classList.remove('is-danger');
  //               }
  //             }
  //           ),
  //         2000
  //       );
  //       return false;
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  // first handle click
  handleClick = (option, question) => {
    const { jwt } = localStorage;
    const { quizzes, counter } = this.state;

    if (counter <= quizzes.length - 1) {
      if (option && option === question.answer) {
        if (option && counter < quizzes.length - 1) {
          document.getElementById(question._id).classList.add('is-success');
        }

        this.setState(
          state => {
            return {
              score: state.score + 1,
              isAnswered: !this.state.isAnswered
            };
          },
          () => {
            this.incrementTotalScore(jwt);
          }
        );

        setTimeout(
          () =>
            this.setState(state => {
              return {
                counter: state.counter + 1,
                isAnswered: !state.isAnswered
              };
            }),
          500
        );
        return true;
      } else {
        if (option && counter < quizzes.length - 1) {
          document.getElementById(question._id).classList.add('is-danger');
        }

        this.setState({ isAnswered: !this.state.isAnswered });
        setTimeout(
          () =>
            this.setState(state => {
              return {
                counter: state.counter + 1,
                isAnswered: !state.isAnswered
              };
            }),
          500
        );
        return false;
      }
    } else {
      return null;
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 }, () => {
      this.props.dispatch({
        type: 'UPDATE_CURRENT_SCORE',
        payload: this.state.score
      });
    });
  };

  handleDeleteQuiz = id => {
    const { jwt } = localStorage;

    if (jwt) {
      fetch(BASE_URL + '/quizzes/' + id + '/delete', {
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
            console.log(data.message, 'delete quiz unsuccessfull...');
          }
        })
        .catch(err => {
          console.log(err, 'delete quiz catch err...');
        });
    }
  };

  handleSubmitScore = () => {
    const { jwt } = localStorage;
    const { score } = this.state;

    this.updateUserScore({ score, category: 'all' }, jwt);
    this.resetCounter();
  };

  render() {
    const { quizzes, counter, isAnswered } = this.state;
    const { user } = this.props.user;

    return (
      <div style={{ marginTop: '100px ' }}>
        {quizzes && quizzes.length ? (
          <QuizCard
            quiz={counter <= quizzes.length - 1 ? quizzes[counter] : null}
            handleClick={this.handleClick}
            user={user}
            resetCounter={this.resetCounter}
            isAnswered={isAnswered}
            handleDeleteQuiz={this.handleDeleteQuiz}
            submitScore={this.handleSubmitScore}
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
