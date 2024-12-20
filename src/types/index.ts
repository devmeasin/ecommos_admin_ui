export type TCredentails = {
    phone: string;
    password: string;
};

export type TCredentailsRegister = {
    fullName: string;
    companyName: string;
    companyWebsite: string;
    phone: string;
    email: string;
    password: string;
};

export type TVerifyOtp = {
    phone: string;
    otp: string;
};
export type TresetPassword = {
    phone: string;
    otp: string;
    newPassword: string;
};

interface Courier {
    total: number;
    delivered: number;
    returned: number;
    successRatio: string;
}

export interface CourierData {
    [key: string]: Courier;
}

export interface ItotalCourierData {
    total: number;
    delivered: number;
    returned: number;
    successRatio: string;
}

export interface ITransaction {
    packageName: string;
    transactionStatus: string;
    paymentStatus: "Successful" | "Failed" | "Pending"; // Restricting to specific values
    id: string;
    paymentID: string;
    transactionId: string;
    purchaseDate: string;
    amount: number;
    user: {
        fullName: string;
        companyName: string;
        email: string;
        phone: string;
    };
}




import type { ColumnSort, Row } from "@tanstack/react-table"

import { type DataTableConfig } from "@/config/data-table"
import { type filterSchema } from "@/lib/parsers"

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type StringKeyOf<TData> = Extract<keyof TData, string>

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
  id: StringKeyOf<TData>
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[]

export type ColumnType = DataTableConfig["columnTypes"][number]

export type FilterOperator = DataTableConfig["globalOperators"][number]

export type JoinOperator = DataTableConfig["joinOperators"][number]["value"]

export interface DataTableFilterField<TData> {
  id: StringKeyOf<TData>
  label: string
  placeholder?: string
  options?: Option[]
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType
}

export type Filter<TData> = Prettify<
  Omit<z.infer<typeof filterSchema>, "id"> & {
    id: StringKeyOf<TData>
  }
>

export interface DataTableRowAction<TData> {
  row: Row<TData>
  type: "update" | "delete"
}

export interface QueryBuilderOpts {
  where?: SQL
  orderBy?: SQL
  distinct?: boolean
  nullish?: boolean
}