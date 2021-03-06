import { call, put, takeEvery } from 'redux-saga/effects';

import Routines from '../routines';

function* trigger(api, action) {
	const request = action.payload;

	try {
		yield put(Routines.getDetails.request());

		const response = yield call(api.movie.getDetails, request);

		yield put(
			Routines.getDetails.success({
				request,
				response: response.data
			})
		);
	} catch (e) {
		yield put(Routines.getDetails.failure(e));
	} finally {
		yield put(Routines.getDetails.fulfill());
	}
}

export default function*(api) {
	yield takeEvery(Routines.getDetails.TRIGGER, trigger, api);
}
