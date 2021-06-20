import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import App from './App';
import store from './store';

//Prepare a component for the assertion, 
//wrap the code to be rendered and perform the update when act() is called. 
//This will bring the test closer to how React works in the browser.
let container = null;

beforeEach(() => {
  // Create a DOM element as the rendering target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exit
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//smoking test
it('renders without crashing', () => {
  render(<Provider store={store}>
    <App />
  </Provider>, container);
});

//component unit test
it('can render and update a App', () => {
  //test render and componentDidMount
  act(() => {
    render(<Provider store={store}>
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

  // text render and componentDidUpdate
  act(() => {
    // You need to pass {bubbles: true} in each event created to reach the React listener, 
    // because React will automatically delegate the event to root.
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
  });
  expect(input.value).toBe('testtest');

  act(() => {
    input.focus();
    input.dispatchEvent(new KeyboardEvent('keydown', {
      ctrlKey: false,
      metaKey: false,
      altKey: false,
      which: 13,
      keyCode: 13,
      key: 'Enter',
      code: 'Enter',
      bubbles: true
    }));
  });
  expect(input.value).toBe('');
});
