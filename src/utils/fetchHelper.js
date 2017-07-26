import { V, PROTOCOL, HOST, PORT } from '../config'

export const fget = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  }
}

export const fpost = (body) => {
  return {
    ...fget(),
    method: 'POST',
    body: JSON.stringify(body)
  }
}

export const fput = (body) => {
  return {
    ...fget(),
    method: 'PUT',
    body: JSON.stringify(body)
  }
}


export const withHost = (url) => `${PROTOCOL}api.${HOST}${PORT ? `:${PORT}` : ''}/${V}${url}`

export const withQuery = (url, query) => {
  return `${url}?${Object.keys(query).reduce(function(a,k){a.push(k+'='+encodeURIComponent(query[k]));return a},[]).join('&')}`
}