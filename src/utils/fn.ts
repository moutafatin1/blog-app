import type { ClassArray } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";


export const fn = (...classes : ClassArray) => {
    return twMerge(clsx(...classes))
}