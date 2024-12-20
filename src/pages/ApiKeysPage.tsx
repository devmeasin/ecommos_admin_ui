import ApiKeyManager from "@/components/ApiKeyManager";
import PluginDisplayCard from "@/components/custom/PluginDisplayCard";
import wpicon from "@/assets/wpicon.png";
import shopifyicon from "@/assets/shopifyicon.png";
import { Layout } from "@/components/custom/Layout";

export const ApiKeysPage = () => {
    return (
        <Layout>
            <Layout.Body>

                <div className="h-full">
                    <div className="p-6 md:p-6 space-y-6 max-w-4xl mx-auto mb-10">
                        <ApiKeyManager />
                    </div>

                    <div className="flex justify-center p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                            <PluginDisplayCard
                                title="WordPress Plugin"
                                subtitle=" "
                                image={wpicon}
                                buttonText=" "
                                downloadLinks={[
                                    {
                                        label: "Download",
                                        url: "https://drive.google.com/drive/folders/1rxEtnwm9KqkcUVXjcxGJvTOE58UDjv4L?usp=sharing",
                                    },
                                    { label: "Watch Toturial", url: "#" },
                                ]}
                            />

                            <PluginDisplayCard
                                title="Shopify App"
                                subtitle=""
                                image={shopifyicon}
                                buttonText="COMING SOON"
                                isComingSoon
                            />
                        </div>
                    </div>
                </div>

            </Layout.Body>
        </Layout>
    );
};
