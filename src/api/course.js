import request from '../utils/request'

export const getCourseList = () => {

    return request.get('/course/list')
}

export const addCourse = (data) => {

    return request.post('/course/add', data)
}

export const updateCourse = (data) => {

    return request.put('/course', data)
}

export const deleteCourse = (id) => {

    return request.delete(`/course/${id}`)
}