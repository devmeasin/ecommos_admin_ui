import posthog from "posthog-js";

export const initPostHog = (): void => {
    posthog.init("phc_46FIFBJ49jaAHUoOX1aKyOdsDRA6N0y4em8CvZUTvrP", {
        api_host: "https://us.i.posthog.com",
        person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    });
};
