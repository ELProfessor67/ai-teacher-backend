import { getAudio } from "../utils/getAudio.js"


export const textToAudio = async (req, res) => {
    try {
        const text = req.query.text;
        console.log(text)
        if(!text) return res.status(401).json({
            message: "please give text",
            success: false
        })
        const arrayBuffer = await getAudio(text);
        
        res.set({
            'Content-Type': 'audio/wav', // or the appropriate MIME type
            'Content-Length': arrayBuffer.length,
        });

        res.send(arrayBuffer);
    } catch (error) {
        res.status(501).json({
            message: error.message,
            success: false
        })
    }
}