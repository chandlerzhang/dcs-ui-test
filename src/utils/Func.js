// import $ from 'robe-ajax'

export function upperCase(list) {
  if (!list) return list
  const objUpper = pl=> {
    for (const k in pl) {

      const v = pl[k]
      if (pl.hasOwnProperty(k) && v) {
        if (typeof v === 'string') {
          pl[k] = v.toLocaleUpperCase()
        } else if (typeof v === 'object') {
          pl[k] = objUpper(v)
        }
      }
    }
    return pl
  }

  if (list instanceof Array) {
    for (const pl of list) {
      objUpper(pl)
    }

    return list
  } else {
    return objUpper(list)
  }
}

export function request(url, options) {
  return $.ajax({
    url: url,
    method: options.method || 'get',
    data: options.data || {},
    processData: options.method === 'get',
    dataType: 'JSON'
  }).done((data) => {
    return data
  })
}

export function getActiveCls(isActive, originCls, ele) {

  originCls = originCls || ''
  if (isActive) return originCls + ' dcs-active'
  else return originCls
}

export function indexOf(arr, obj) {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == obj) return i
  }
  return -1;
}

export function stopEvent(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
}

export function focusActive() {
  const active = $('.dcs-active')
  const selector = 'input,a,button'
  const activeIsInput = active.is(selector)
  if (activeIsInput) {
    active.focus()
  } else {
    $(selector, active).first().focus()
  }
}
