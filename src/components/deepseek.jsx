import { useEffect } from "react";

function Deepseek() {
  async function fetchData() {
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
            "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            messages: [
              {
                role: "user",
                content: "What is the meaning of life?",
              },
            ],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content || "No response";
      console.log("Response from Deepseek:", text);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Deepseek</h1>
      <p className="text-lg text-gray-700">
        This is a placeholder for the Deepseek component.
      </p>
    </div>
  );
}
export default Deepseek;
