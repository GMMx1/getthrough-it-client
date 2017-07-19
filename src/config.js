export const ENV = process.env.NODE_ENV
export const V = 'v1'
export const HOST = ENV === 'production' ? 'http://google.com' : 'http://localhost:8000' 
