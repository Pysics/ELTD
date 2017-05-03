'use strict'

import { call, put, takeEvery } from 'redux-saga/effects'

import * as types from '../actions/actionTypes'
import fetchUrl from '../constants/fetchUrl'

function requestData() {
  return {
    type: types.FETCH_ETC_DATA_REQUEST
  }
}

function receiveData(json) {
  return {
    type: types.FETCH_ETC_DATA_SUCCESS,
    data: json,
    // fetchTime: new Data().toLocaleString()
  }
}

function fetchFailure() {
  return {
    type: types.FETCH_ETC_DATA_FAILURE
  }
}

// function fetchUserAPI() {
//   return fetch(fetchUrl)
//   .then(res => (
//     res.json()
//   ))
//   .then(resJson => (
//     resJson
//   ))
//   .catch(err => (
//     err.message
//   ))
//   .done()
// }

const fetchAPI = {
  fetchETC () {
    // fetchUrl.etc而不是feychUrl
    return fetch(fetchUrl.etc)
    .then(response => response.json())
    .then(data => {
         return data
     })
    .catch(error => error)
  }
}

// 能运行
// function fetchAnotherWay() {
//   return fetch(fetchUrl.etc)
//   .then(res => (
//     res.json()
//   ))
//   .then(resJson => (
//     resJson
//   ))
// }

function* fetchUser() {
  try {
    const response = yield call( fetchAPI.fetchETC );

    console.log('--------');
    console.log(response);
    
    yield put( receiveData(response) );
  } catch (error) {
    yield put(fetchFailure());
  }
}

export default function* fetchEvent() {
  yield takeEvery(types.FETCH_ETC_DATA_REQUEST, fetchUser);
}