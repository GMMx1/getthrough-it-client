export const fget = () => {
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
