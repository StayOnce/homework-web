import request from '../utils/request'

export function getCourseList() {

    return request({

        url: '/course/list',

        method: 'get'

    })
}

export function addCourse(data) {

    return request({

        url: '/course/add',

        method: 'post',

        data

    })
}