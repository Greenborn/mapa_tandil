import create from '../helpers/request'
const request = create(import.meta.env.VITE_API_URL, false)

export function get_reclamo(id) {
    return request({ url: '/reclamo?id=' + id, method: 'get' })
}

export function get_reclamos() {
    return request({ url: '/reclamos', method: 'get' })
}

export function new_reclamo(datos) {
    return request({ url: '/reclamo', method: 'post', data: datos })
}
