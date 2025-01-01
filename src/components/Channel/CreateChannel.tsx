import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { registerWoocommerceChannel } from "@/http/api";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ChannelsAvailable from "./ChannelsSilder";

interface CreateChannelProps {
  open: boolean;
  onClose: () => void;
  platform: keyof typeof platformConfigs; // Use platform keys
}

const registerChannel = async (channelData: object) => {
  // API call to register the channel
  return await registerWoocommerceChannel(channelData);
};

export default function CreateChannel({
  open,
  onClose,
  platform,
}: CreateChannelProps) {
  const config = platformConfigs[platform]; // Get the platform configuration dynamically

  const form = useForm({
    initialValues: {
      name: "",
      storeUrl: "",
      credentials: {
        key: "",
        secret: "",
      },
    },
    validate: {
      name: (value) => (value.length >= 3 ? null : "Name must be at least 3 characters"),
      storeUrl: (value) => (value.length > 3 ? null : "Enter Valid URL"),
      credentials: (value) =>
        value.key.length > 1 && value.secret.length > 1 ? null : "Empty Credentials",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerChannel,
    onSuccess: () => {
      toast.success(`${config.title} Channel Registered Successfully!`);
      form.reset();
      onClose();
    },
    onError: () => {
      toast.error("Failed to register the channel!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validate().hasErrors) {
      Object.values(form.errors).forEach((error) => toast.error(error || ""));
    } else {
      mutate(form.values);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto w-[90%] border-l">
        <div className="relative flex size-full flex-col">
          <SheetHeader>
            <SheetTitle>{`Add ${config.title} Channel ✨`}</SheetTitle>
          </SheetHeader>

          <div className="flex-1">

            <div >
              {/* Amount & Account Section */}
              <div
                className="relative flex w-full items-center bg-bg-weak-50 px-5 py-1.5 text-muted-foreground font-medium truncate text-sm"
              >
                Fill Your Channel Info 🙈
              </div>
              <div className="p-5">
                <div>
                  <ChannelsAvailable />
                </div>

                {/* <WooCommerceChannel form={form} data={form.values} /> */}

                <div className="mt-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="mb-4">
                      <Label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </Label>
                      <Input
                        type={field.type}
                        id={field.name}
                        autoComplete="off"
                        placeholder={field.placeholder}
                        className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        {...form.getInputProps(field.name)}
                      />
                    </div>
                  ))}
                </div>

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


const platformConfigs = {
  wooCommerce: {
    title: "Woo",
    fields: [
      { name: "name", label: "Channel Name", type: "text", placeholder: "Enter Channel Name" },
      { name: "storeUrl", label: "Store URL", type: "url", placeholder: "https://yourstore.com" },
      { name: "credentials.key", label: "API Key", type: "text", placeholder: "Enter API Key" },
      { name: "credentials.secret", label: "API Secret", type: "text", placeholder: "Enter API Secret" },
    ],
  },
  shopify: {
    title: "Shopify",
    fields: [
      { name: "name", label: "Channel Name", type: "text", placeholder: "Enter Channel Name" },
      { name: "storeUrl", label: "Store URL", type: "url", placeholder: "https://yourstore.myshopify.com" },
      { name: "credentials.key", label: "API Key", type: "text", placeholder: "Enter API Key" },
      { name: "credentials.secret", label: "API Secret", type: "text", placeholder: "Enter API Secret" },
    ],
  },
  daraz: {
    title: "Daraz",
    fields: [
      { name: "name", label: "Channel Name", type: "text", placeholder: "Enter Channel Name" },
      { name: "credentials.key", label: "Access Token", type: "text", placeholder: "Enter Access Token" },
    ],
  },
};
