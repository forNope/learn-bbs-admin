import { request } from '../../utils'

/**
 * 获取用户信息
 * @param {string} id - 要获取信息的用户id,默认为自身id
 * @return {httpEventCollector}
 */
export function getUser({ id = localStorage.getItem('userId'), config }) {
  return request.get(`/users/${id}`, config)
}
