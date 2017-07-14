const fetchHelper = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET'
  }
}

export const fpost = (body) => {
  return {
    ...fetchHelper(),
    method: 'POST',
    body: JSON.stringify(body)
  }
}

export const fput = (body) => {
  return {
    ...fetchHelper(),
    method: 'PUT',
    body: JSON.stringify(body)
  }
}
