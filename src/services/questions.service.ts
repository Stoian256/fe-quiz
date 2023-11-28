const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getQuestions = async (accessToken: string): Promise<any> => {
  try {
    
    
    // const tagsArray: Tag[] = [];
    const itemsPerPage = 10; // Replace with the required number of items per page
    const pageIndex = 0; // Replace with the required page index
    // const tagsArray = []; // Replace with the required tags (comma-separated if multiple)
    const difficulties = "easy"; // Replace with the required tags (comma-separated if multiple)

    const queryParams = new URLSearchParams({
      itemsPerPage: itemsPerPage.toString(),
      pageIndex: pageIndex.toString(),
      difficulties: difficulties
      // tags: JSON.stringify(tagsArray)
    });

    const url = `${apiServerUrl}/questions?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        // body: JSON.stringify(dataToSend)
    });
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle the error here
    console.error('Error fetching questions:', error);
    // You might want to throw the error further or handle it differently based on your use case
    throw error;
  }
};