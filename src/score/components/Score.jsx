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
      <div style={{ marginTop: '100px' }}>
        <div className='container'>
          <div className='table-container'>
            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
              <thead>
                <tr>
                  <th></th>
                  {thead.length
                    ? thead.map((title, i) => {
                        return <th key={i}>{title}</th>;
                      })
                    : ''}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user && user.scores.length ? (
                  user.scores.map((score, i) => {
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{score.score}</td>
                        <td>{score.category}</td>
                        <td>
                          {score.date
                            ? new Date(score.date).toLocaleString()
                            : ''}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            id={score._id}
                            className='button is-small'
                            style={{
                              background: 'transparent',
                              border: 'none'
                            }}
                            type='button'
                            onClick={() => this.deleteScore(score._id)}
                            value='Delete'
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No score found...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
