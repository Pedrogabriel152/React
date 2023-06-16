import { all } from "redux-saga/effects";
import user from "./User/saga";

export default function* rootSaga(){
    return yield all([
        user,
    ])
}