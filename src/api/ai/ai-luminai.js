import axios from "axios"

export default (app) => {

  async function fetchContent(content) {
    try {
      const response = await axios.get("https://api.siputzx.my.id/api/ai/deepseekr1", {
        params: {
          prompt: content,
          system: "You are a helpful assistant.",
          temperature: 0.7
        }
      })

      return response.data
    } catch (error) {
      console.error("Error fetching content from DeepSeek:", error.response?.data || error.message)
      throw error
    }
  }

  app.get("/ai/luminai", async (req, res) => {
    try {
      const { text } = req.query

      if (!text) {
        return res.status(400).json({
          status: false,
          error: "Text is required"
        })
      }

      const data = await fetchContent(text)

      res.status(200).json({
        status: true,
        result: data.result || data
      })

    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message
      })
    }
  })

}
