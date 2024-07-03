export interface Profile {
  phone: string | null,
  firstName: string,
  lastName: string,
  middleName: string,
  dateBirthday: Date,
  avatar: string
}

export interface ProfileScheme {
  data?: Profile
  isLoading: boolean
  error?: string
  readonly: boolean
}
