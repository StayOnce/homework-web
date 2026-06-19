import request from '../utils/request'

export function getCourseList() {

    return request({

        url: '/course/list',

        method: 'get'

    })
}