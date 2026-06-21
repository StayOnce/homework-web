import request from '../utils/request'

export const getSubmitList = () => {

    return request.get(
        '/submit/list'
    )

}