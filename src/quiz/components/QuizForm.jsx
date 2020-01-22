import React, { Component } from 'react';

export default class QuizForm extends Component {
  render() {
    return (
      <div className='container'>
        <div class='notification'>
          <div class='field'>
            <label class='label'>Question</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                placeholder='e.g What does ISRO stands for?'
                required
                value=''
                onChange={() => {}}
              />
            </div>
          </div>

          <div class='field'>
            <label class='label'>Option 1</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                required
                value=''
                onChange={() => {}}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>

          <div class='field'>
            <label class='label'>Option 2</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                required
                value=''
                onChange={() => {}}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Option 3</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                required
                value=''
                onChange={() => {}}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Option 4</label>
            <div class='control'>
              <input
                class='input'
                type='text'
                required
                value=''
                onChange={() => {}}
                placeholder='e.g. Indian Space Reserch Organization'
              />
            </div>
          </div>
          <div class='field'>
            <label class='label'>Answer</label>
            <div class='control'>
              <input
                class='input'
                type='number'
                required
                // value=''
                limit='4'
                onChange={() => {}}
                placeholder='e.g. option 1'
              />
            </div>
          </div>

          <div class='control'>
            <button class='button is-primary'>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
