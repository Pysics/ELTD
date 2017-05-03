'use strict'

import * as types from './actionTypes'
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
    fetchTime: new Data().toLocaleString()
  }
}

function fetchFailure() {
  return {
    type: types.FETCH_ETC_DATA_FAILURE
  }
}

export function fetchData() {
  return (dispatch) => {
    dispatch(requestData())
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json => {
        dispatch(receiveData(json))
      })
      .catch(err => {
        dispatch(fetchFailure())
      })
      .done()
  }
}