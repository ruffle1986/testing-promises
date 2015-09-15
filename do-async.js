import Promise from 'native-or-bluebird'

export default function doAsync(incr) {
  return new Promise(resolve => {
    resolve(incr)
  })
}
