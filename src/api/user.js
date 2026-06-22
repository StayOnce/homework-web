import request from '../utils/request'

export function getTeacherList() {

    return request({

        url: '/auth/teacher/list',

        method: 'get'

    })

}

export const getUserList = () => {
    return request.get('/user/list')
}

export const addUser = (data) => {
    return request.post('/user/add', data)
}

export const updateUser = (data) => {
    return request.put('/user/update', data)
}

export const deleteUser = (id) => {
    return request.delete(`/user/${id}`)
}

export const getStudentList = () => {
    return request.get('/user/student/list')
}