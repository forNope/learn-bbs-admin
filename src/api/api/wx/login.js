import { request } from '../../utils'

export function login(code, type = 'code') {
  const req = request({
    url: `/wx/sessions/${code}`,
    method: type === 'openId' ? 'put' : 'post'
  })

  req.ok(({ id }) => localStorage.setItem('userId', id))

  return req
}
