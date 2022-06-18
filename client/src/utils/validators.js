export const validators = {
  username: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Minimum length should be 3' },
    maxLength: { value: 20, message: 'Minimum length should be 20' }
  },
  name: {
    required: 'Name is required'
  },
  password: {
    required: 'Password is required',
    minLength: { value: 4, message: 'Minimum length should be 4' },
    maxLength: { value: 50, message: 'Minimum length should be 50' }
  }
}
