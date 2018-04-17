import { combineReducers } from 'redux'
import { reducer } from 'redux-storage'
import { routerReducer as routing } from 'react-router-redux'
import twitterData from "./tweet_reducer"
import { reducer as reducerForm } from 'redux-form';

const appReducer = reducer(combineReducers({
  twitterData,
  form: reducerForm,
}))

const helloReducer = (state,action) => appReducer(state,action)

export default helloReducer

