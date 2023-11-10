export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum MESSAGES {
  USER_ALREADY_EXIST = 'Username/Email is already in use',
  USER_REGISTER_SUCCESS = 'User Registered successfully',
  INCORRECT_EMAIL = 'Incorrect Email/Password',
  INCORRECT_PASSWORD = 'Incorrect Email/password',
  USER_LOGIN_SUCCESS = 'User Logged in successfully',
  USER_LOGOUT = 'User logged out successfully'
}
