/**
 * utility function to refresh user-related data after payment or role changes
 * this ensures all cached user data is updated to prevent forbidden errors
 */
export const refreshUserDataAfterPayment = (queryClient, userEmail) => {
    // invalidate all user-related queries
    const queriesToInvalidate = [
        ['userData', userEmail],
        ['userRole', userEmail],
        ['paymentHistory', userEmail],
        ['bookings', userEmail],
        ['approvedBookings', userEmail]
    ];

    queriesToInvalidate.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
    });

    // also refetch user role immediately to ensure UI updates
    queryClient.refetchQueries({ queryKey: ['userRole', userEmail] });
    
    console.log('User data refreshed after payment for:', userEmail);
};
