const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getQuestions = async (accessToken: string, queryParams: string): Promise<any> => {
  try {
    const url = `${apiServerUrl}/questions?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
    });
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};