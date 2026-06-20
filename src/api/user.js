import request from '../utils/request'

export function getTeacherList() {

    return request({

        url: '/auth/teacher/list',

        method: 'get'

    })

}