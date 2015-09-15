import test from 'ava'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import Promise from 'native-or-bluebird'

test('test #1', t => {
  const doAsyncStub = sinon.stub().returns(Promise.resolve(1))
  const module = proxyquire('./implementation', {
    './do-async': doAsyncStub
  })
  const spy = sinon.spy()
  const run = module()
  return run(spy).then(() => {
    t.is(spy.calledOnce, true)
    t.is(spy.args[0][0], 3)
  })
})

test('test #2', t => {
  const doAsyncStub = sinon.stub().returns(Promise.resolve('asd'))
  const module = proxyquire('./implementation', {
    './do-async': doAsyncStub
  })
  const spy = sinon.spy()
  const run = module()
  return run(spy).catch(err => {
    t.true(err instanceof TypeError)
    t.is(err.message, 'expected number')
  })
})

test('test #3', t => {
  const doAsyncStub = sinon.stub().returns(Promise.reject(new Error('Buck you!')))
  const module = proxyquire('./implementation', {
    './do-async': doAsyncStub
  })
  const spy = sinon.spy()
  const run = module()
  return run(spy).catch(err => {
    t.true(err instanceof Error)
    t.is(err.message, 'Buck you')
  })
})
