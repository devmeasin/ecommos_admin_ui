import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const WooCommerceChannel = ({form }: {form: any}) => {

    return (
        <div>
            <div className="mt-3">
                <form
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
    )
}

export default WooCommerceChannel;