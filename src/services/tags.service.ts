const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getTags = async (
  accessToken: string,
  tag:
    | {
        prefix: string;
        excludedTags: string[];
      }
    | {}
): Promise<any> => {
  try {
    const response = await fetch(`${apiServerUrl}tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(tag)
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      if (response.status === 400) {
        errorMessage = "Bad request. Please check your data and try again.";
      } else if (response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    console.error("Failed request details:", {
      url: `${apiServerUrl}/tags`,
      method: "POST",
      body: tag,
      error
    });
    throw error;
  }
};

export const getTopTags = async (accessToken: string): Promise<any> => {
  try {
    // change endpoint here

    const response = await fetch(`${apiServerUrl}tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      if (response.status === 400) {
        errorMessage = "Bad request. Please check your data and try again.";
      } else if (response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);

    throw error;
  }
};
