import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { fetchChannelInfo, registerWoocommerceChannel } from "@/http/api";
import { useForm } from "@mantine/form";

import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "../../ui/button";
import WooCommerceChannel from "./index";
import { useEffect, useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";

interface CreateChannelProps {
    open: boolean;
    onClose: () => void;
    title: string;
    channelData: {
        name: string;
        storeUrl: string;
        deliveryUrl: string;
        webhookSecret: string;
        credentials: {
            key: string;
            secret: string;
        };
    };
    channelId: string
}

const registerWooChannel = async (WoocommerceChannelData: object) => {
    const { data } = await registerWoocommerceChannel(WoocommerceChannelData)
    return data;
}

const chanelInfoFetcher = async (channelId: string) => {
    const { data } = await fetchChannelInfo(channelId);
    return data;
}


export default function WooCommerceChannelSideBar({
    open,
    onClose,
    title,
    channelData,
    channelId
}: CreateChannelProps) {

    const [showKey, setShowKey] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["channelInfo", channelId],
        queryFn: () => chanelInfoFetcher(channelId),
        staleTime: 30 * 60 * 1000,
        enabled: false,
    });

    useEffect(() => {
        if (open && !data) {
            refetch()
        }
    }, [open, data, refetch])

    const form = useForm({
        initialValues: {
            name: channelData?.name || "", // Start phone number with 0
            storeUrl: channelData?.storeUrl || "",
            "credentials": {
                "key": channelData?.credentials.key || "",
                "secret": channelData?.credentials.secret || "",
            }
        },
        validate: {

            name: (value) =>
                value.length >= 3
                    ? null
                    : "Name must be at least 3 characters",
            storeUrl: (value) =>
                value.length > 3
                    ? null
                    : "Enter Valid URL",
            credentials: (value) =>
                value.key.length > 1 && value.secret.length > 1
                    ? null
                    : "Empty Credentials",

        },
    });

    const handleCopy = ( data : string ) => {
        navigator.clipboard.writeText( data || "");
        toast.success("🥚 Copied to clipboard");
    };

    const { mutate, isPending } = useMutation({
        mutationKey: ["registerWooChannel"],
        mutationFn: registerWooChannel,
        onSuccess: async () => {
            toast.success("User login Successfully");
            form.reset();
            onClose();
        },
        onError: () => {
            toast.error("🚫 Phone or password is incorrect!");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission

        if (form.validate().hasErrors) {
            if (form.errors.name)
                toast.error("Name must be at least 3 characters");
            if (form.errors.storeUrl)
                toast.error("Enter Valid URL");
            if (form.errors.credentials)
                toast.error("Empty Credentials");
        } else {
            mutate(form.values);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Sheet open={open} onOpenChange={onClose} >
            <SheetContent className="sm:max-w-[540px] overflow-y-auto w-[90%] border-l">
                <div className="relative flex size-full flex-col">
                    <SheetHeader>
                        <SheetTitle>{title}</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1">

                        <div >
                            {/* Amount & Account Section */}
                            <div
                                className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 text-muted-foreground font-medium truncate text-sm"
                            >
                                Your Channel Info {title} 🥚
                            </div>
                            <div className="p-5">
                                <div>
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg w-full mb-2">
                                        <input
                                            type="text"
                                            value={ import.meta.env.VITE_BACKEND_API_URL + channelData?.deliveryUrl}
                                            readOnly
                                            className="bg-transparent flex-grow outline-none text-gray-900 dark:text-gray-200"
                                        />
                                        <button onClick={() => handleCopy(import.meta.env.VITE_BACKEND_API_URL + channelData?.deliveryUrl)} className="ml-2">
                                            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg w-full">
                                        <input
                                            type="text"
                                            value={
                                                showKey
                                                    ? channelData?.webhookSecret // Full key when showKey is true
                                                    : channelData?.webhookSecret
                                                        ? `${channelData?.webhookSecret.slice(0, 10)} ************* ${channelData?.webhookSecret.slice(-4)}` // First 20 and last 4 chars when showKey is false
                                                        : ""
                                            }
                                            readOnly
                                            className="bg-transparent flex-grow outline-none text-gray-900 dark:text-gray-200"
                                        />


                                        <button onClick={() => setShowKey(!showKey)}>
                                            {showKey ? (
                                                <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            )}
                                        </button>
                                        <button onClick={() => handleCopy(channelData?.webhookSecret)} className="ml-2">
                                            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                                <WooCommerceChannel form={form} />

                            </div>

                            {/* To Section */}

                        </div>

                    </div>
                    <SheetFooter>

                        <Button type="submit" disabled={isPending} onClick={handleSubmit}
                            className="group relative inline-flex items-center justify-center whitespace-nowrap outline-none transition duration-200 ease-out focus:outline-none disabled:bg-slate-300  disabled:dark:bg-slate-900 disabled:text-text-disabled-300 disabled:ring-transparent ring-1 ring-inset h-10 gap-3 rounded-10 px-3.5 text-label-sm bg-bg-white-0 text-text-sub-600 shadow-regular-xs ring-stroke-soft-200 hover:bg-bg-weak-50 hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950 w-full font-semibold text-muted-foreground" >
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className={`${isPending ? "animate-spin" : ""} "-ml-1 remixicon flex size-5 shrink-0 items-center justify-center -mx-1"`}><path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg>
                            {isPending ? "Add Channel..." : "Create Channel"}
                        </Button>

                    </SheetFooter>

                </div>
            </SheetContent>
        </Sheet>
    );
}
