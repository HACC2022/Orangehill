import http from "../http-common"

export default class URLDataService {
    static async get(short) {
        console.log("here")
        return await http.get(`/${short}`)
    }

    static async create(data) {
        return (await http.post('/', data, {params: data}))
    }
}