import { HOST, V } from '../config'

const withHost = (url) => `${HOST}/${V}${url}`

export default withHost