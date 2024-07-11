export enum ValidateProfileError {
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_DATE_BIRTHDAY = 'INCORRECT_DATE_BIRTHDAY',
  NO_DATA = 'NO_DATA',
  SERVER_ERROR = 'SERVER_ERROR'
}

export interface Profile {
  phone?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  dateBirthday?: string,
  avatar?: string
}

export interface ProfileScheme {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
  validateErrors?: ValidateProfileError[]
}
