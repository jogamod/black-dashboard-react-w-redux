
import { setLoginSuccess } from '../../actions/login_actions';

describe('user actions', () => {
  it('should set that user is logged in successfully', () => {
    const isLoginSuccess = true
    const expectedAction = setLoginSuccess(isLoginSuccess)
    expect(setLoginSuccess(isLoginSuccess)).toEqual(expectedAction)
  })

  it('should not produce same result', () => {
    const expectedAction = setLoginSuccess(false)
    expect(setLoginSuccess(true)).not.toEqual(expectedAction)
  })

})