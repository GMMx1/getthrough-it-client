export const ENV = process.env.NODE_ENV
export const isProd = ENV === 'production'

export const V = 'v1'
export const PORT = isProd ? 443 : 8000
export const SECURE = isProd
export const PROTOCOL = SECURE ? 'https://' : 'http://'
export const HOST = isProd ? 'getthrough.it' : 'localhost' 
