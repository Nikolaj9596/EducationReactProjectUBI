import { createSelector } from "@reduxjs/toolkit";
import { CounterStateSchema } from "../../types/CounterScheme";
import { getCounter } from "../getCounter/getCounter";

export const getCounterValue = createSelector(getCounter, (conter: CounterStateSchema) => conter.value)
