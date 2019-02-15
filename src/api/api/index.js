import * as resourceApi from './resources'
import * as wxApi from './wx'
import * as userApi from './users'
import * as statApi from './stat'

export default {
  ...resourceApi,
  ...userApi,
  ...wxApi,
  ...statApi
}
