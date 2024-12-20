import OopsComponent from "@/components/custom/Oops";
import { SearchButton } from "@/components/custom/SearchButton";
// import CourierReport from "@/components/FraudChecker";
import FraudSection from "@/components/FraudChecker/FraudSectionD2";
import TableSkeletonLoader from "@/components/FraudChecker/TableSkeletonLoader";
import { Main } from "@/components/layout/main";
import { PrimaryLoader } from "@/components/Loader";
import { getCourierData, getUserCurrentPackages } from "@/http/api";
import { fraudCheckData, IfraudCheckData } from "@/store";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const courierDataApiCall = async (customer_number: string) => {
    const { data } = await getCourierData(customer_number);
    return data;
};

const fetchUserCurrentPackage = async () => {
    const { data } = await getUserCurrentPackages();
    return data;
};

export const FraudChecker = () => {
    const { courierData, setCourierData } = fraudCheckData() as IfraudCheckData;

    const form = useForm({
        initialValues: {
            customer_number: "",
        },
        validate: {
            customer_number: (value) =>
                value.length === 11 && /^01[3-9]\d{8}$/.test(value)
                    ? null
                    : "Invalid Bangladeshi phone number, must be 11 digits starting with 01.",
        },
    });

    const { refetch } = useQuery({
        queryKey: ["userCurrentPackage"],
        queryFn: fetchUserCurrentPackage,
        enabled: true,
    });

    const { mutate, isPending, isError } = useMutation({
        mutationKey: ["courierdata"],
        mutationFn: courierDataApiCall,
        onSuccess: async (data) => {
            await refetch();
            setCourierData(data.data);
            // form.reset();
        },
        onError: () => {
            setCourierData(null);
            toast.error("Something went wrong");
        },
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Validate form before submitting
        if (form.validate().hasErrors) {
            if (form.errors.customer_number)
                toast.error("🇧🇩 phone number must be 11 digits");
        } else {
            mutate(form.values.customer_number);
        }
    };

    // Ensure courierData and totalCourierData are valid before accessing them

    return (
      <Main>
        <div className="relative w-full h-full">
            <div className="md:mt-16 lg:mt-16 flex flex-col justify-center items-center h-auto">
                <div className="flex flex-col justify-center items-center mb-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className=" text-blue-500 dark:text-white mt-5 mb-2 text-center text-xl font-bold leading-9 tracking-tight ">
                            কাস্টমারের ফোন নাম্বার লিখুনঃ 🕵️‍♂️
                        </h2>
                    </div>
                    <SearchButton
                        form={form}
                        handleSubmit={handleSubmit}
                        isDisabled={isPending}
                    />
                </div>

                {isPending && <PrimaryLoader />}

                {isPending && (
                    <div>
                        <TableSkeletonLoader />
                    </div>
                )}

                {!isPending && courierData && (
                    // <CourierReport courierData={courierData} />
                    <FraudSection courierData={courierData} />
                )}

                {isError && (
                    // <p className="mt-10 text-red-500 text-sm">
                    //     Something went wrong 🙃
                    // </p>
                    <OopsComponent />
                )}
            </div>
        </div>
                
        </Main>
    );
};
