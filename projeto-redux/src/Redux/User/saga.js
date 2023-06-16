import { all, takeEvery, takeLatest, call, put } from "redux-saga/effects";
import { fetchUsersSuccess, fetchUsersFailed } from "./slice";
import axios from "axios";

// API USERS: https:/jsonplaceholder.typicode.com/users/

function* fetchUsers(){
    try{
        const response = yield call(axios.get, "https:/jsonplaceholder.typicode.com/users/");
        yield put(fetchUsersSuccess(response.data))

    }catch(error){
        yield put(fetchUsersFailed(error.message))
    }
}

export default all([
    takeLatest("user/fetchUsers", fetchUsers)
]);