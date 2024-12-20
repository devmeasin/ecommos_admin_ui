import { ITransaction } from "@/types";
import { CloudDownload } from "lucide-react";
import React from "react";
import InvoiceComponent from "./Invoice";

interface BillingHistoryProps {
    transactions: ITransaction[];
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({
    transactions,
}) => {
    const statusStyles = {
        Successful:
            "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300",
        Failed: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300",
        Pending:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300",
    };

    return (
        <div className="p-4">
            {/* Desktop Version */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                TXN ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Purchase Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        {transactions.map((invoice, idx) => (
                            <tr
                                key={idx}
                                className="border-t border-gray-200 dark:border-gray-700"
                                id={`invoice-${invoice.transactionId}`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {invoice.transactionId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    ৳ {invoice.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {invoice.purchaseDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {invoice.packageName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[invoice.paymentStatus]}`}
                                    >
                                        {invoice.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <button className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-900">
                                        <CloudDownload className="inline mr-1" />
                                        <InvoiceComponent invoice={invoice} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Version */}
            <div className="lg:hidden space-y-4">
                {transactions.map((invoice, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                        id={`invoice-${invoice.transactionId}`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                    TXN ID: {invoice.transactionId}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {invoice.purchaseDate}
                                </p>
                            </div>
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[invoice.paymentStatus]}`}
                            >
                                {invoice.paymentStatus}
                            </span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                <p>Plan: {invoice.packageName}</p>
                                <p>Amount: ৳ {invoice.amount}</p>
                            </div>
                            <button className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-900">
                                <CloudDownload className="inline mr-1" />
                                <InvoiceComponent invoice={invoice} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
