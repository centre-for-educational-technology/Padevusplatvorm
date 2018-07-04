import {applyMiddleware, compose, createStore} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import storage from 'redux-persist/es/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const config = {
	key: 'root',
	storage
};

const reducer = persistReducer(config, rootReducer);

const initialize = () => {
	const middlewares = [reduxImmutableStateInvariant(), thunk];
	let store = createStore(reducer, compose(applyMiddleware(...middlewares)));
	let persistor = persistStore(store);
	return {persistor, store};
};

export default initialize();
