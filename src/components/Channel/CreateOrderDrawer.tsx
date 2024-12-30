import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { registerWoocommerceChannel } from "@/http/api";
import { useForm } from "@mantine/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ChannelsAvailable from "./ChannelsSilder";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

interface CreateOrderDrawerProps {
  open: boolean;
  onClose: () => void;
}

const registerWooChannel = async (WoocommerceChannelData: object) => {
  const { data } = await registerWoocommerceChannel(WoocommerceChannelData)
  return data;
}


export default function CreateOrderDrawer({
  open,
  onClose,
}: CreateOrderDrawerProps) {
  const form = useForm({
    initialValues: {
      name: "", // Start phone number with 0
      storeUrl: "",
      "credentials": {
        "key": "",
        "secret": ""
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

  return (
    <Sheet open={open} onOpenChange={onClose} >
      <SheetContent className="sm:max-w-[540px] overflow-y-auto w-[90%] border-l">
        <div className="relative flex size-full flex-col">
          <SheetHeader>
            <SheetTitle>✨ Channel Connect</SheetTitle>
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
                <div className="my-5">
                  <form
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="ChannelName">
                        Channel Name
                      </Label>
                      <Input
                        className="focus-visible:ring-0"
                        id="ChannelName"
                        // placeholder="Enter Channel Name"
                        required
                        value={form.values.name}
                        onChange={(event) =>
                          form.setFieldValue(
                            "name",
                            event.currentTarget
                              .value,
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="storeUrl">
                        Store Url
                      </Label>
                      <Input
                        className="focus-visible:ring-0"
                        id="storeUrl"
                        // placeholder="Enter Store Url"
                        required
                        value={form.values.storeUrl}
                        onChange={(event) =>
                          form.setFieldValue(
                            "storeUrl",
                            event.currentTarget
                              .value,
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="woocommerce_key">
                        Woocommerce Key
                      </Label>
                      <Input
                        className="focus-visible:ring-0"
                        id="woocommerce_key"
                        // placeholder="Enter Woocommerce Key"
                        required
                        value={form.values.credentials.key}
                        onChange={(event) =>
                          form.setFieldValue(
                            "credentials.key",
                            event.currentTarget
                              .value,
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="woocommerce_secret">
                        Woocommerce Secret
                      </Label>
                      <Input
                        className="focus-visible:ring-0"
                        id="woocommerce_secret"
                        // placeholder="Enter Woocommerce Secret"
                        required
                        value={form.values.credentials.secret}
                        onChange={(event) =>
                          form.setFieldValue(
                            "credentials.secret",
                            event.currentTarget
                              .value,
                          )
                        }
                      />
                    </div>
                  </form>
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
