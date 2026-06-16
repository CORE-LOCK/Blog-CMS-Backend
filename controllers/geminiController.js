import genAI from "../config/gemini.js";

export const generateBlog = async (req, res) => {
    try {
        const { topic } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
const prompt = `
you are an seo expert blog writer. Generate a blog about this exact topic:"${topic}"
`;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        res.status(200).json({
            success: true,
            blog: responseText,
        });
    } catch (error) {
        console.error(error?.message || error);
        res.status(500).json({ success: false, error: error?.message || 'Internal server error' });
    }
};