import { UserSchema } from "../../../../entities/User";
import { CounterStateSchema } from "../../../../entities/Counter";

export interface StateScheme {
  counter: CounterStateSchema
  user: UserSchema
}
