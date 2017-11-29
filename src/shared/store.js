import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import marketData from './reducers/marketData';
import tempAccount from './reducers/tempAccount';
import account, * as fromAccount from './reducers/account';
import app from './reducers/app';
import settings from './reducers/settings';
import seeds from './reducers/seeds';
import notifications from './reducers/notifications';
import alerts from './reducers/alerts';
import home from './reducers/home';
import { ActionTypes } from './actions/app';

const reducers = combineReducers({
    alerts,
    marketData,
    tempAccount,
    account,
    app,
    settings,
    seeds,
    notifications,
    home,
});

const rootReducer = (state, action) => {
    /* eslint-disable no-param-reassign */

    if (ActionTypes.WALLET_RESET) {
        state = undefined;
    }
    /* eslint-enable no-param-reassign */
    return reducers(state, action);
};

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        autoRehydrate(),
        typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
);

export const getTailTransactionHashesForPendingTransactions = state => {
    return fromAccount.getTailTransactionHashesForPendingTransactions(
        state.account.accountInfo,
        state.tempAccount.seedIndex,
    );
};

export const persistState = (state, config) => persistStore(state, config);

export default store;
