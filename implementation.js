import doAsync from './do-async'

export default () => (dispatch, incr = 1) => {
  return doAsync(incr)
    .then(val => {
      if (typeof val !== 'number') {
        throw new TypeError('expected number')
      }
      return val + incr
    })
    .then(val => val + incr)
    .then(val => {
      dispatch(val)
    })
    .catch(err => {
      dispatch(err)
    })
}
