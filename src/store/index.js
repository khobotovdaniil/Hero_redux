// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk';
// import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice';
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === "string") {
        return next({
            type: action
        })
    }
    return next(action)
};

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === "string") {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore( 
//                 combineReducers({heroes, filters}),
//                 compose(applyMiddleware(ReduxThunk, stringMiddleware),
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//                 );

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;