
import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* shelfSaga() {
    yield takeLatest('FETCH_SHELF_ITEMS', fetchShelfItems)
    yield takeLatest('ADD_SHELF_ITEM', addShelfItem)
    yield takeLatest('DELETE_SHELF_ITEM', deleteShelfItem)
    yield takeLatest('UPDATE_SHELF_ITEM', updateShelfItem)
  }

function* fetchShelfItems() {
    try{
        const shelfItems = yield axios.get('/api/shelf')
        yield put({ type: 'SET_SHELF_ITEMS', payload: shelfItems.data })

    } catch(error) {
        console.error ('Error fetching shelf items', error)
    }

}

function* addShelfItem(action) {
    try {
      yield axios.post('/api/shelf', action.payload)
      yield put({ type: 'FETCH_SHELF_ITEMS' })
    } catch (error) {
      console.error('Error adding shelf item:', error)
    }
  }

  function* deleteShelfItem(action) {
    try {
      yield axios.delete(`/api/shelf/${action.payload}`)
      yield put({ type: 'FETCH_SHELF_ITEMS' })
    } catch (error) {
      console.error('Error deleting shelf item:', error)
    }
  }

  function* updateShelfItem(action) {
    try {
      yield axios.put(`/api/shelf/${action.payload.id}`, action.payload);
      yield put({ type: 'FETCH_SHELF_ITEMS' });
    } catch (error) {
      console.error('Error updating shelf item:', error);
    }
  }


  export default shelfSaga