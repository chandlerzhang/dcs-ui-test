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

export async function setEt(params) {

  console.log('params', params)
  const data = {
    isEt: params.isEt,
    plu: params.pl.uui
  }

  return F.request('./data/setEt.json', {
    method: 'get',
    data: data
  })
}
