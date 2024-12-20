import { motion } from "framer-motion";

const TableSkeletonLoader = () => {
    const shimmerEffect = {
        start: { x: "-100%" },
        end: { x: "100%" },
    };

    return (
        <div className="p-4 w-96 md:w-[650px] h-auto mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Title Bar */}
            <div className="mb-6 flex items-center justify-center">
                <div className="mt-4 h-4 w-3/5 bg-gray-300 dark:bg-gray-600 rounded relative overflow-hidden ">
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        variants={shimmerEffect}
                        initial="start"
                        animate="end"
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* Header Row */}
            <div className="flex justify-between items-center mb-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-3 w-1/3 mr-1 bg-gray-300 dark:bg-gray-600 rounded relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            variants={shimmerEffect}
                            initial="start"
                            animate="end"
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center"
                    >
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="h-3 w-1/5 mr-1 bg-gray-300 dark:bg-gray-600 rounded relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                                    variants={shimmerEffect}
                                    initial="start"
                                    animate="end"
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-6">
                <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded relative overflow-hidden mx-auto">
                    <motion.div
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        variants={shimmerEffect}
                        initial="start"
                        animate="end"
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TableSkeletonLoader;
