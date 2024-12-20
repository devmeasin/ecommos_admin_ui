import primaryLoaderAnimation from "@/assets/fraudloader.json";
import Lottie from "react-lottie-player";

export const PrimaryLoader = () => {
    return (
        <div>
            <Lottie
                loop
                animationData={primaryLoaderAnimation}
                play
                style={{ width: 200, height: 190, margin: "auto" }}
            />
        </div>
    );
};
