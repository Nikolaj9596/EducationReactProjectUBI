import { Profile, ValidateProfileError } from "../../types/profile";

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA]
  }
  const { firstName, lastName, middleName, dateBirthday } = profile
  const errors: ValidateProfileError[] = []

  if (!firstName || !lastName || !middleName) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA)
  }

  if (!dateBirthday) {
    errors.push(ValidateProfileError.INCORRECT_DATE_BIRTHDAY)
  }

  return errors
}
