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

export const getCourseStudents = (courseId) => {
    return request.get(`/course/${courseId}/students`)
}

export const addCourseStudent = (courseId, studentId) => {
    return request.post(`/course/${courseId}/students?studentId=${studentId}`)
}

export const removeCourseStudent = (courseId, studentId) => {
    return request.delete(`/course/${courseId}/students/${studentId}`)
}

export const getStudentList = () => {
    return request.get('/user/student/list')
}

export const getUnassignedStudents = (courseId) => {
    return request.get(`/course/${courseId}/students/unassigned`)
}