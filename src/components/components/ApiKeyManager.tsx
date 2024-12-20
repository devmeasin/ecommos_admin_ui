import { addDomainforApiAccess, fetchByApiKey, generateByApiKey, removeDomainforApiAccess, self, setByApiKeyStatus } from "@/http/api";
import { IAuthStore, useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Eye, EyeOff, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { PrimaryLoader } from "./Loader";

// API calls
const fetchApiKey = async () => {
    const { data } = await fetchByApiKey();
    return data;
};

const generateApiKey = async () => {
    const { data } = await generateByApiKey();
    return data;
};

const setApiKeyStatus = async (status: boolean) => {
    await setByApiKeyStatus(status);
};

const addDomainToApiKey = async (domain: string) => {
    await addDomainforApiAccess(domain);
};

const removeDomainFromApiKey = async (domain: string) => {
    await removeDomainforApiAccess(domain);
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

const ApiKeyManager: React.FC = () => {
    const { user, setUser } = useAuthStore() as IAuthStore;
    const queryClient = useQueryClient();
    const [showKey, setShowKey] = useState(false);
    const [newDomain, setNewDomain] = useState("");

    const { data: apiKey, isLoading, isError } = useQuery({
        queryKey: ["apikey"],
        queryFn: fetchApiKey,
        staleTime: 30 * 60 * 1000,
    });

    const generateMutation = useMutation({
        mutationFn: generateApiKey,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apikey"] });
            toast.success("API key generated successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.errors?.[0]?.msg || "Failed to generate API key";
            toast.error(message);
        },
    });

    const setStatusMutation = useMutation({
        mutationFn: setApiKeyStatus,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["apikey"] });
            toast.success("API key status updated successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.errors?.[0]?.msg || "Failed to update API key status";
            toast.error(message);
        },
    });

    const { refetch } = useQuery({
        queryKey: ["self"],
        queryFn: getSelf,
        enabled: true,
    });

    const addDomainMutation = useMutation({
        mutationFn: addDomainToApiKey,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["apikey"] });
            const updatedSelfData = await refetch();
            setUser(updatedSelfData.data);
            toast.success("Domain added successfully");
            setNewDomain("");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.errors?.[0]?.msg || "Failed to add domain";
            toast.error(message);
        },
    });

    const removeDomainMutation = useMutation({
        mutationFn: removeDomainFromApiKey,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["apikey"] });
            const updatedSelfData = await refetch();
            setUser(updatedSelfData.data);
            toast.success("Domain removed successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.errors?.[0]?.msg || "Failed to remove domain";
            toast.error(message);
        },
    });

    const handleGenerate = () => {
        generateMutation.mutate();
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusMutation.mutate(event.target.checked);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey.apiSecret || "");
        toast.success("API key copied to clipboard");
    };

    const handleAddDomain = () => {
        if (newDomain.trim() === "") {
            toast.error("Domain cannot be empty");
            return;
        }
        addDomainMutation.mutate(newDomain.trim());
    };

    const handleRemoveDomain = (domain: string) => {
        removeDomainMutation.mutate(domain);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <PrimaryLoader />
            </div>
        );
    }

    if (isError) {
        return <p>Error loading API key</p>;
    }

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto mb-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                API Key Manager
            </h2>
            <div className="flex items-center space-x-2 mb-4">
                <label className="font-medium text-gray-900 dark:text-gray-200">
                    API Key:
                </label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg w-full">
                    <input
                        type={showKey ? "text" : "password"}
                        value={apiKey.apiSecret}
                        readOnly
                        className="bg-transparent flex-grow outline-none text-gray-900 dark:text-gray-200"
                    />
                    <button onClick={() => setShowKey(!showKey)}>
                        {showKey ? (
                            <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                    <button onClick={handleCopy} className="ml-2">
                        <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <label className="font-medium text-gray-900 dark:text-gray-200">
                    Enable API Key:
                </label>
                <input
                    type="checkbox"
                    checked={apiKey.apiSecretStatus}
                    className="form-checkbox h-5 w-5 text-indigo-600 dark:text-indigo-400"
                    onChange={handleStatusChange}
                />
            </div>
            <div className="mb-6">
    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Domain Management
    </h3>
    <div className="flex items-center space-x-2 mb-4">
        <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="Enter domain"
            className="border border-gray-300 rounded-lg p-3 flex-grow dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 shadow-sm dark:shadow-md"
        />
        <button
            onClick={handleAddDomain}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-5 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
            <Plus className="w-5 h-5" />
        </button>
    </div>
    {user?.allowedDomains && user?.allowedDomains.length > 0 ? (
        <ul className="space-y-3">
            {user?.allowedDomains.map((domain) => (
                <li key={domain} className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{domain}</span>
                    <button
                        onClick={() => handleRemoveDomain(domain)}
                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-gray-600 dark:text-gray-400">No domains added yet.</p>
    )}
</div>

            <button
                onClick={handleGenerate}
                className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
                {apiKey.apiSecret ? "Update API Key" : "Generate API Key"}
            </button>
        </div>
    );
};

export default ApiKeyManager;