// src/components/ErrorPage.tsx

import React from "react";

// Import your Lottie animation JSON file
// import NotFound from "@/components/404";
import NotFoundError from "@/features/errors/not-found-error";

const ErrorPage: React.FC = () => {
    return <NotFoundError />;
};

export default ErrorPage;
