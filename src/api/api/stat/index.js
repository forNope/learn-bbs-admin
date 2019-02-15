import { request } from '../../utils'

export function getStat({
  type,
  config
}) {
  return request.get(`/stat/${type}`, config)
}
