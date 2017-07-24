export const ENV = process.env.NODE_ENV
export const isProd = ENV === 'production'

export const V = 'v1'
export const PORT = isProd ? 80 : 8000
export const SECURE = false
export const PROTOCOL = SECURE ? 'https://' : 'http://'
export const HOST = isProd ? 'dev-env.m6w3qtwm2t.us-east-1.elasticbeanstalk.com' : 'localhost' 
