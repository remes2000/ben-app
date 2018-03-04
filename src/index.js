import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App';
import reducers from './reducers'

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)))

window.onkeydown = e => {
    if(e.keyCode===87)
        alert()
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
