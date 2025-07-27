import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdminStats = () => {
    const axiosSecure = useAxiosSecure();

    // courts count
    const {
        data: courts = [],
        isLoading: courtsLoading,
        isError: courtsError,
        error: courtsErrObj,
    } = useQuery({
        queryKey: ['adminCourts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/courts');
            return res.data;
        },
    });

    // users count
    const {
        data: users = [],
        isLoading: usersLoading,
        isError: usersError,
        error: usersErrObj,
    } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const members = Array.isArray(users) ? users.filter(u => u.isMember) : [];

    return {
        courtsCount: Array.isArray(courts) ? courts.length : 0,
        usersCount: Array.isArray(users) ? users.length : 0,
        membersCount: members.length,
        loading: courtsLoading || usersLoading,
        error: courtsError || usersError,
        courtsErrObj,
        usersErrObj,
    };
};

export default useAdminStats;
