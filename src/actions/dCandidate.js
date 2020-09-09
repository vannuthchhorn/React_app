  
import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

// get data from database
export const fetchAll = () => dispatch => {
    api.dCandidate().fetchAll()
        .then(response => {
            // console.log(response);
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

// alert success after created data
export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dCandidate().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

// alert success after updated data
export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dCandidate().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

// alert success after delete data
export const Delete = (id, onSuccess) => dispatch => {
    api.dCandidate().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}