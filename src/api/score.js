import request from '../utils/request'

export const gradeSubmit = (data) => {
    return request.post('/score/grade', data)
}

export const getScoreList = () => {
    return request.get('/score/list')
}