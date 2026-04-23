import axios from "axios";

export default (app) => {

  async function fetchDeepseek(prompt) {
    try {
      const response = await axios.get("https://api.siputzx.my.id/api/ai/deepseekr1", {
        params: {
          prompt: prompt,
          system: "You are a helpful assistant.",
          temperature: 0.7
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error("DeepSeek Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch from DeepSeek");
    }
  }

  app.get("/ai/deepseek", async (req, res) => {
    try {
      const { text } = req.query;

      if (!text) {
        return res.status(400).json({
          status: false,
          error: "Parameter 'text' wajib diisi"
        });
      }

      const data = await fetchDeepseek(text);

      res.status(200).json({
        status: true,
        result: data.result || data
      });

    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      });
    }
  });

};
