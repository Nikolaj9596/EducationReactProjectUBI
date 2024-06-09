import { UserSchema } from "../../../../entities/User";
import { CounterStateSchema } from "../../../../entities/Counter";
import { LoginSchema } from "../../../../features/AuthByUserName";

export interface StateScheme {
  counter: CounterStateSchema
  user: UserSchema
  loginForm: LoginSchema
}
