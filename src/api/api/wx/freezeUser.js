import { request } from '../../utils'

/**
 * 冻结用户
 * @param {string} id - 要冻结的用户id
 * @param {timestamp} time - 时间戳,要冻结的截止日期,默认为当前时间加上7天
 * @return {httpEventCollector}
 */
export function freezeUser({
  id,
  freezeTime,
  reason,
  config
}) {
  return request.delete(`/users/${id}`, { params: { freezeTime, reason }}, config)
}
