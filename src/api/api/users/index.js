import { request } from '../../utils'

export function adminLogin({
  username,
  password,
  config
}) {
  return request.post('/admins/session', { username, password }, config)
}
