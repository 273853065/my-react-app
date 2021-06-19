import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import App from './App';
import store from './store';

//Prepare a component for the assertion, 
//wrap the code to be rendered and perform the update when act() is called. 
//This will bring the test closer to how React works in the browser.
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

//smoking test
it('renders without crashing', () => {
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, container);
});

it('can render and update a App', () => {
  //test render and componentDidMount
  act(() => {
    ReactDOM.render(<Provider store={store}>
      <App />
    </Provider>, container);
  });
  const input = container.querySelector('#todo_input');
  const h5 = container.querySelector('h5');
  expect(h5.textContent).toBe('There is no TODO, just add it.');

  //test input funciton
  let lastValue = input.value;
  input.value = 'testtest';
  let tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  input.dispatchEvent(new InputEvent('input', { bubbles: true }));

  expect(input.value).toBe('testtest');

  // text render and componentDidUpdate
  // act(() => {
  //   input.focus()
  //   input.dispatchEvent(new KeyboardEvent('keydown', {
  //     ctrlKey: false,
  //     metaKey: false,
  //     altKey: false,
  //     which: 13,
  //     keyCode: 13,
  //     key: 'Enter',
  //     code: 'Enter'
  //   }));
  // });
  // expect(h5.textContent).toBe('You have 1 TODO(s), please deal with.');
})
