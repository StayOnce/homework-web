import request from '../utils/request'

export const getSubmitList = () => {

    return request.get(
        '/submit/list'
    )

}

export const submitHomework = (data) => {

    return request.post(
        '/submit',
        data
    )

}