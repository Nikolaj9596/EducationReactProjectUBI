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
}
