import { V, PROTOCOL, HOST, PORT } from '../config'

const withHost = (url) => `${PROTOCOL}${HOST}:${PORT}/${V}${url}`

export default withHost