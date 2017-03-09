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

export async function queryInfs(params) {
  return F.request('./data/queryInf.json', {
    method: 'get'
  })
}

export async function bindInf(p) {

  return F.request('./data/bindInf.json', {
    method: 'get'
  })
}

export async function unBindInf(p) {
  return F.request('./data/unBindInf.json', {
    method: 'get'
  })
}

export async function cancelCheckin(p) {

  return F.request('./data/unBindInf.json', {
    method: 'get'
  })
}

export async function setMorC(p) {

  return F.request('./data/unBindInf.json', {
    method: 'get'
  })
}

export async function fetchLogs(p) {
  return F.request('./data/logs.json', {
    method: 'get'
  })
}

export async function fetchPbs(p) {
  return F.request('./data/pbs.json', {
    method: 'get'
  })
}
