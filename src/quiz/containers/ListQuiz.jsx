import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from '../components/QuizCard';

import updateScore, { incUsersTotalScore } from '../../utils/updateScore';

const BASE_URL = 'http://localhost:8000/api/v1';
const { jwt } = localStorage;

class ListQuiz extends Component {
  state = {
    seletedCategory: null,
    filteredQuiz: [],
    counter: 0,
    score: 0,
    isAnswered: false
  };

  componentDidMount = () => {
    this.fetchQuiz(BASE_URL + '/questions');
    this.checkWindowReload();
  };

  fetchQuiz = url => {
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

  checkWindowReload = () => {
    if (window.performance) {
      console.info('window.performance works fine on this browser');
    }
    if (performance.navigation.type === 1) {
      console.info('This page is reloaded');
      this.updateUserScore(this.state.score, jwt);
    } else {
      console.info('This page is not reloaded');
    }
  };

  handleClick = (option, question) => {
    if (option === question.answer) {
      this.setState(
        state => {
          return {
            score: state.score + 1
            // isAnswered is used to show the right and wrong answer heighlights
            // isAnswered: !state.isAnswered
          };
        },
        () => {
          this.incrementTotalScore(jwt);
          this.updateUserScore(this.state.score, jwt);
          // setTimeout(() => {
          // let elm = document.getElementById(option);
          // if (elm) elm.classList.remove('is-danger');
          // this.setState(state => ({ isAnswered: !state.isAnswered }));
          // }, 300);
        }
      );
    } else {
      return null;
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

  handleDeleteQuiz = id => {
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

  handleQuizCategory = category => {
    if (!category || category === 'all') {
      this.setState({ filteredQuiz: [] });
    } else {
      this.setState({ seletedCategory: category }, () => {
        this.setState({
          filteredQuiz: this.props.quiz.quiz.filter(
            quiz => quiz.category === category
          )
        });
      });
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 });
  };

  render() {
    const { quiz, user } = this.props;
    const { filteredQuiz, isAnswered } = this.state;

    return (
      <div
        className=''
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <aside style={{ padding: '30px' }}>
          <ul>
            <li
              key={'all'}
              className='title is-4'
              style={{ cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => this.handleQuizCategory('all')}
            >
              All
            </li>
            {quiz && quiz.category
              ? quiz.category.map(val => {
                  return (
                    <li
                      key={val}
                      className='title is-4'
                      style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                      onClick={() => this.handleQuizCategory(val)}
                    >
                      {val}
                    </li>
                  );
                })
              : ''}
          </ul>
        </aside>
        <div className='container'>
          {filteredQuiz && filteredQuiz.length
            ? filteredQuiz.map((question, index) => {
                return (
                  <div className='container' key={index}>
                    <div className='container'>
                      <QuizCard
                        question={question}
                        handleClick={this.handleClick}
                        user={user.user}
                        handleDeleteQuiz={this.handleDeleteQuiz}
                        resetCounter={this.resetCounter}
                        isAnswered={isAnswered}
                      />
                    </div>
                  </div>
                );
              })
            : quiz && quiz.quiz && user && user.user
            ? quiz.quiz.map((question, index) => {
                return (
                  <div className='container' key={index}>
                    <div style={{ margin: '20px 0' }}>
                      <QuizCard
                        question={question}
                        handleClick={this.handleClick}
                        user={user.user}
                        handleDeleteQuiz={this.handleDeleteQuiz}
                        resetCounter={this.resetCounter}
                        isAnswered={isAnswered}
                      />
                    </div>
                  </div>
                );
              })
            : 'no quiz found...'}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ListQuiz);
