import { ShipWheel } from "lucide-react";

export const ComingSoon = () => {
    return (
        <div className="mt-48">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <ShipWheel size={80} />
                <h1 className="text-4xl font-bold leading-tight">
                    Coming Soon 👀
                </h1>
                <p className="text-center text-muted-foreground">
                    We're working on something amazing —. <br />
                    Stay tuned though!
                </p>
            </div>
        </div>
    );
};
