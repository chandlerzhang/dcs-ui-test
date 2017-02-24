import * as F from '../utils/Func'

export async function fetch(params) {

  return F.request('./data/plist.json', {
    method: 'get'
  })
}

export async function queryUser(params) {

  return F.request('./data/tokenInfo.json', {
    method: 'get'
  })
}
