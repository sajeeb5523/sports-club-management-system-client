/**
 * utility function to retry API calls with exponential backoff
 * useful for handling temporary 403 errors during role transitions
 */
export const retryApiCall = async (apiCall, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return { success: true, data: result };
    } catch (error) {
      lastError = error;
      
      // if it's a 403 error, wait and retry
      if (error.response?.status === 403 && attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
        console.log(`API call failed with 403, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // for other errors or final attempt, break the loop
      break;
    }
  }
  
  return { success: false, error: lastError };
};
