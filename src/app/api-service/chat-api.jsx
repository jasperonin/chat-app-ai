export async function sendMessageToApi(message) {
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_text: message }),
      });
  
      if (!response.ok) {
        console.error("API request failed with status:", response.status);
        throw new Error("Failed to communicate with the API");
      }
  
      const data = await response.json();
      console.log("Raw API response:", data); // Log the raw response for debugging
  
      // Handle the response based on the structure you expect
      if (data.response) {
        return data.response; // If 'response' is the field, return it
      }
  
      // If response is not structured as expected
      return "Unexpected response structure from API.";
    } catch (error) {
      console.error("Error in sendMessageToApi:", error);
      return "Error while communicating with the bot.";
    }
  }
  