import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuizCard from '../components/QuizCard';
import updateScore, { incUsersTotalScore } from '../../utils/updateScore';

const BASE_URL = 'http://localhost:8000/api/v1';

class ListQuiz extends Component {
  state = {
    seletedCategory: 'all',
    filteredQuiz: [],
    counter: 0,
    score: 0,
    isAnswered: false
  };

  componentDidMount = () => {
    this.fetchQuiz(BASE_URL + '/quizzes');
    // this.checkWindowReload();
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

  // function to check if the browser window is reloaded or not
  // checkWindowReload = () => {
  //   const { jwt } = localStorage;
  //   if (window.performance) {
  //     console.info('window.performance works fine on this browser');
  //   }
  //   if (performance.navigation.type === 1) {
  //     console.info('This page is reloaded');
  //     this.updateUserScore(this.state.score, jwt);
  //   } else {
  //     console.info('This page is not reloaded');
  //   }
  // };

  handleClick = (option, quiz) => {
    const { jwt } = localStorage;

    if (option === quiz.answer) {
      this.setState(
        state => {
          return {
            score: state.score + 1
          };
        },
        () => {
          this.incrementTotalScore(jwt);
          this.handleScroll();

          setTimeout(() => {
            let elm = document.getElementById(option);
            if (elm) elm.classList.remove('is-danger');
          }, 300);
        }
      );
    } else {
      this.handleScroll();
      return null;
    }
  };

  dispatchUpdateUser = data => {
    if (data && data.user) {
      this.props.dispatch({
        type: 'UPDATE_USER',
        payload: {
          ...data,
          currentScore: this.state.score
        }
      });
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
    let data = await updateScore(BASE_URL + '/users/update/score', jwt, score);
    this.dispatchUpdateUser(data);
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

  quizCategoryFilter = (category, id) => {
    // TODO: write logic to
    // if (!category && id) {
    //   this.setState({ seletedCategory: category }, () => {
    //     this.setState({
    //       filteredQuiz: this.props.quiz.quiz.filter(quiz => quiz._id !== id)
    //     });
    //   });
    // } else

    if (!category || category === 'all') {
      this.setState({ filteredQuiz: [] });
    } else {
      this.setState(
        state => ({ seletedCategory: category, score: 0 }),
        () => {
          this.setState({
            filteredQuiz: this.props.quiz.quiz.filter(
              quiz => quiz.category === category
            )
          });
          this.props.dispatch({
            type: 'UPDATE_CURRENT_SCORE',
            payload: this.state.score
          });
        }
      );
    }
  };

  resetCounter = () => {
    this.setState({ counter: 0, score: 0 });
  };

  handleSubmitScore = () => {
    const { jwt } = localStorage;
    const { score, seletedCategory } = this.state;

    if (score) {
      this.updateUserScore({ score, category: seletedCategory }, jwt);
      this.resetCounter();
      window.scroll('scrollY', 0);
    }
  };

  handleScroll = () => {
    var height = document.querySelector('.notification').clientHeight;
    window.scroll('scrollY', window.scrollY + height + 40);
  };

  footer = () => {
    return (
      <div className='notification'>
        <div className='container'>
          <div className='notification is-light is-success'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <button className='button is-text'>
                <h3 className='title is-3'>Quiz end...!</h3>
              </button>
              <div>
                <button
                  className='button is-warning'
                  onClick={() => {
                    this.handleSubmitScore();
                  }}
                >
                  Submit score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
            {quiz && quiz.category
              ? quiz.category.map(val => {
                  return (
                    <li
                      key={val}
                      className='title is-5'
                      style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                      onClick={() => this.quizCategoryFilter(val)}
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
            ? filteredQuiz.map((quiz, index) => {
                return (
                  <div className='container' key={index}>
                    <div className='container'>
                      <div style={{ margin: '40px 0' }}>
                        <QuizCard
                          quiz={quiz}
                          handleClick={this.handleClick}
                          user={user.user}
                          handleDeleteQuiz={this.handleDeleteQuiz}
                          resetCounter={this.resetCounter}
                          isAnswered={isAnswered}
                          quizCategoryFilter={this.quizCategoryFilter}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            : quiz && quiz.quiz && user && user.user
            ? quiz.quiz.map((question, index) => {
                return (
                  <div className='container' key={index}>
                    <div style={{ margin: '40px 0' }}>
                      <QuizCard
                        quiz={question}
                        handleClick={this.handleClick}
                        user={user.user}
                        handleDeleteQuiz={this.handleDeleteQuiz}
                        resetCounter={this.resetCounter}
                        isAnswered={isAnswered}
                        quizCategoryFilter={this.quizCategoryFilter}
                      />
                    </div>
                  </div>
                );
              })
            : 'no quiz found...'}
          {this.footer()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ListQuiz);
