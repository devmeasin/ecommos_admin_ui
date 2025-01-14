// import primaryLoaderAnimation from "@/assets/fraudloader.json";
// import Lottie from "react-lottie-player";
import primaryLoaderAnimation2 from "@/assets/spinner.svg"


export const PrimaryLoader = () => {
    return (
        <div>
            {/* <Lottie
                loop
                animationData={primaryLoaderAnimation}
                play
                style={{ width: 200, height: 190, margin: "auto" }}
            /> */}
            <div className="flex items-center justify-center ">
                <img src={primaryLoaderAnimation2} alt="loader" />
            </div>
        </div>
    );
};
