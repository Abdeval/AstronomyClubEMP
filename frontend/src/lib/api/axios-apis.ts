
// ! get method

import { api } from "./axios-instance"

export const getApi = async (route: string, params?: any, headers?: any) => {
    return api.get(route, { params }).then(res => res.data)
}

// ! post method

export const postApi = (route: string, body: any, args?: any) => {
    return api.post(route, body, args)
}

// ! delete method

export const deleteApi = async (route: string) => {
    return api.delete(route).then(res => res.data);
}

// ! update method

export const updateApi = async (route: string, body: any) => {
    return api.put(route, body).then(res => res.data);
}