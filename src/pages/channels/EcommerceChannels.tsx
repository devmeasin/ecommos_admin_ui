
import CreateOrderDrawer from "@/components/Channel/CreateOrderDrawer";
import { Layout } from "@/components/custom/Layout";
import { Button } from "@/components/ui/button";
import { IconSettingsCode } from "@tabler/icons-react";
import { useState } from "react";

const EcommerceChannels = () => {
    const integrations = [
        {
            name: "WooCommerce",
            description: "Seamless collaboration and document management.",
            logo: "https://app.nuport.io/img/woocommerce.svg",
            alt: "Microsoft Office 365 logo",
        },
        {
            name: "Zoom",
            description: "For conducting virtual meetings and interviews.",
            logo: "https://finance-template.alignui.com/images/major-brands/zoom.svg",
            alt: "Zoom logo",
        },
        {
            name: "Slack",
            description: "For team communication and real-time collaboration.",
            logo: "https://finance-template.alignui.com/images/major-brands/dropbox.svg",
            alt: "Slack logo",
        },
        {
            name: "Trello",
            description: "For task management and project collaboration.",
            logo: "https://finance-template.alignui.com/images/major-brands/asana.svg",
            alt: "Trello logo",
        },
    ];

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Layout >
            <Layout.Body>

                <div>
                    <div>
                        <div className="flex md:flex-row md:items-center justify-between gap-2 mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold">💩 Channels</h1>
                            <Button
                                size="sm"
                                className="h-8"
                                onClick={() => setIsChecked(true)}
                            >
                                <IconSettingsCode className="h-4 w-4" />
                                Add Channel
                            </Button>
                        </div>

                        <CreateOrderDrawer open={isChecked} onClose={() => setIsChecked(!isChecked)} />
                        {/* <TransactionDetails open={isChecked} onClose={() => setIsChecked(!isChecked)} />; */}

                    </div>

                    <div>
                        <div className="flex flex-col gap-3 mt-3">
                            {integrations.map((integration, index) => (


                                <label
                                    key={index}
                                    className="relative cursor-pointer rounded-xl bg-white-0 p-4 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200"
                                >
                                    <div className="grid gap-4 sm:flex sm:items-center sm:gap-3 justify-between">

                                        <div className="flex items-center gap-3.5">
                                            <button
                                                type="button"
                                                className="group/switch block h-5 w-8 shrink-0 p-0.5 absolute right-4 top-4 md:right-36 md:top-auto"
                                                onClick={handleToggle}
                                                aria-checked={isChecked}
                                            >
                                                <div
                                                    className={`h-4 w-8 rounded-full p-0.5 transition duration-200 ease-out ${isChecked ? "bg-primary" : "bg-[#dfdddd] dark:bg-slate-600"
                                                        }`}
                                                >
                                                    <span
                                                        data-state={isChecked ? "checked" : "unchecked"}
                                                        className={`pointer-events-none relative block size-3 rounded-full border-4 border-white transition-transform duration-200 ease-out ${isChecked ? "translate-x-4" : ""
                                                            }`}
                                                        style={{
                                                            mask: "radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat",
                                                            WebkitMask:
                                                                "radial-gradient(circle farthest-side at 50% 50%, #0000 1.95px, #000 2.05px 100%) 50% 50%/100% 100% no-repeat",
                                                        }}
                                                    ></span>
                                                </div>
                                            </button>
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bg-white-0 ring-1 ring-inset ring-stroke-soft-200">
                                                <img src={integration.logo} className="size-6" alt={integration.alt} />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-label-sm font-semibold">
                                                    <span>{integration.name}</span>
                                                </div>
                                                <div className="text-paragraph-xs text-text-sub-600">{integration.description}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                className="w-full relative inline-flex items-center justify-center whitespace-nowrap outline-none ring-slate-200 hover:bg-slate-50 dark:ring-slate-500 ring-1 dark:bg-slate-900  transition duration-200 ease-out focus:outline-none disabled:pointer-events-none disabled:bg-slate-50 disabled:text-text-disabled-300 disabled:ring-transparent  ring-inset h-9 gap-3 rounded-lg px-3 text-label-sm text-text-sub-600 shadow-regular-xs ring-stroke-soft-200  hover:text-text-strong-950 hover:shadow-none hover:ring-transparent focus-visible:text-text-strong-950 focus-visible:shadow-button-important-focus focus-visible:ring-stroke-strong-950 dark:bg-dark-200 dark:text-text-sub-300 dark:ring-dark-300 dark:hover:bg-dark-300 dark:hover:text-white dark:focus-visible:ring-dark-100 dark:focus-visible:text-white dark:disabled:bg-dark-100 dark:disabled:text-dark-disabled"
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    className="remixicon flex size-5 shrink-0 items-center justify-center -mx-1"
                                                >
                                                    <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path>
                                                </svg>
                                                Manage
                                            </button>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout.Body>
        </Layout>
    );
}

export default EcommerceChannels;