import { request } from '../../utils'

/**
 * 同意协议
 * @param {string} id - 用户id,默认为自身id
 * @return {httpEventCollector}
 */
export function agreeProtocol({
  id = localStorage.getItem('userId'),
  config
}) {
  return request.put(`/users/${id}/protocol`, undefined, config)
}
