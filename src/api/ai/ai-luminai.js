import axios from "axios"
import { createApiKeyMiddleware } from "../../middleware/apikey.js"

export default (app) => {

  async function fetchContent(content) {
    try {
      // 🔥 NEW: API PUTER (free, no API key)
      const response = await axios.post(
        "https://api.puter.com/v2/ai/chat",
        {
          model: "lumi-1", // model gratis pengganti gemini
          messages: [
            { role: "user", content }
          ]
        },
        { headers: { "Content-Type": "application/json" } }
      )

      return {
        result: response.data?.output || "Tidak ada output."
      }

    } catch (error) {
      console.error("Error fetching content from Puter AI:", error)
      throw error
    }
  }

  app.get("/ai/luminai", createApiKeyMiddleware(), async (req, res) => {
    try {
      const { text } = req.query
      if (!text) {
        return res.status(400).json({ status: false, error: "Text is required" })
      }

      const { result } = await fetchContent(text)

      res.status(200).json({
        status: true,
        result,
      })
    } catch (error) {
      res.status(500).json({ status: false, error: error.message })
    }
  })
    }
