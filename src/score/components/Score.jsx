import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../app/componets/Loader';
import handleDeleteScore from '../actions';
import { BASE_URL } from '../../static';

class Score extends Component {
  deleteScore = id => {
    const { jwt } = localStorage;
    this.props.dispatch(
      handleDeleteScore(BASE_URL + '/scores/' + id + '/delete', jwt, id)
    );
  };

  render() {
    const { user } = this.props;
    const { isLoading } = this.props;

    const thead =
      user && user.scores.length
        ? Object.keys(user.scores[0]).filter(v => v !== '_id')
        : [];

    return (
      <div style={{ paddingTop: '100px' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='container'>
            <div className='table-container'>
              <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                <thead>
                  <tr>
                    <th className='bold txt-capitalize'>Sr. No</th>
                    {thead.length
                      ? thead.map((title, i) => {
                          return (
                            <th key={i} className='bold txt-capitalize'>
                              {title}
                            </th>
                          );
                        })
                      : null}
                    {user &&
                    user.isAdmin &&
                    user.scores &&
                    user.scores.length ? (
                      <th className='bold txt-capitalize'>other</th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {user && user.scores.length ? (
                    user.scores.reverse().map((score, i) => {
                      return (
                        <tr key={i}>
                          <th className='bold'>{i + 1}</th>
                          <td>{score.score}</td>
                          <td className='txt-capitalize'>{score.category}</td>
                          <td>
                            {score.date
                              ? new Date(score.date).toLocaleString()
                              : null}
                          </td>
                          {user.isAdmin ? (
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
                          ) : null}
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
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(mapStateToProps)(Score);
