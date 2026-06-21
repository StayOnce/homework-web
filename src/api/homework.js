import request from '../utils/request'

export const getHomeworkList = () => {

    return request.get(
        '/homework/list'
    )

}

export const addHomework = (data) => {

    return request.post(
        '/homework/add',
        data
    )

}

export const deleteHomework = (id) => {

    return request.delete(
        `/homework/${id}`
    )

}