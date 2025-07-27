import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useUserData = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {
        data: userData = null,
        isLoading,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    return {
        userData,
        isLoading,
        isError,
        error,
        refetch
    };
};

export default useUserData; 