import React, { Component } from 'react';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class Score extends Component {
  deleteScore = id => {
    const { jwt } = localStorage;

    fetch(BASE_URL + '/users/update/score/' + id + '/delete', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'delete score....');

        if (data.success) {
          this.props.dispatch({ type: 'UPDATE_USER', payload: data });
          console.log(data, 'deleted score sucessfull......');
        } else if (!data.success) {
          console.log(data, 'deleted score failed...');
        }
      })
      .catch(err => {
        console.log(err, 'delete score catch error...');
      });
  };

  render() {
    const { user } = this.props.user;
    console.log(user, user.scores, 'score rndr...');

    const thead =
      user && user.scores.length
        ? Object.keys(user.scores[0]).filter(v => v !== '_id')
        : [];
    console.log(thead, 'thead...');

    return (
      <div className='container'>
        <div className='table-header'>
          {thead.length
            ? thead.map(title => {
                return <span key={title}>{title}</span>;
              })
            : ''}
        </div>
        <div className='table-body'>
          {user && user.scores.length ? (
            user.scores.map((score, i) => {
              return (
                <div key={score._id} className='content'>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <span style={{ margin: '0 20px' }}>{score.score}</span>

                      <span style={{ margin: '0 20px' }}>{score.category}</span>

                      <span style={{ margin: '0 20px' }}>
                        {score.date
                          ? new Date(score.date).toLocaleString()
                          : ''}
                      </span>
                    </div>

                    {/* <input
                    type='button'
                    value=''
                    style={{ background: 'transparent', border: 'none' }}
                  /> */}
                    <div>
                      <input
                        id={score._id}
                        type='button'
                        onClick={() => this.deleteScore(score._id)}
                        value='Delete'
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3
              style={{
                fontSize: '20px',
                textAlign: 'center',
                fontWeight: 'bold',
                padding: '20px 0'
              }}
            >
              No score found...
            </h3>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'score map state...');
  return state;
}

export default connect(mapStateToProps)(Score);
