import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const systemInstruction = `You are a helpful assistant for Niya Studio, an ultra-premium creative agency.
You answer questions about the agency, its services, build times, pricing, and processes.

About Niya Studio:
- We are a freelance web developer and branding expert.
- We craft premium digital experiences, showcase websites, bespoke e-commerce, and high-end SEO optimization.
- Services: Web Design, Branding, E-Commerce, Motion Design, UI/UX, Development.
- Specific Offerings: Showcase Websites, E-commerce Websites, Custom Platforms.
- Pricing: Depends on complexity. Every project gets a custom, transparent quote after a discovery call.
- Build times: About 2 weeks for a classic site, and 3-4 weeks for a complex site.
- Process: Discovery, Strategy, Design, Development, Launch.
- We use modern technologies like React, Next.js, and Sanity/WordPress/Shopify.
- We provide comprehensive training and post-launch maintenance options.
- The tone is professional, high-end, helpful, and concise.

Answer user questions accurately based on this information. If you don't know the answer, ask them to book a free discovery call or contact us directly.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      // Convert frontend messages format to Gemini format
      const formattedMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedMessages,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.5,
        }
      });

      res.json({ message: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to process chat request" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
