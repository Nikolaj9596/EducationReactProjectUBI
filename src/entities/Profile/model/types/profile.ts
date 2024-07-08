export interface Profile {
  phone?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  dateBirthday?: Date,
  avatar?: string
}

export interface ProfileScheme {
  data?: Profile
  form?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
}
