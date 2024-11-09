
import fs from 'fs';
import { SpeechConfig, SpeechSynthesizer, SpeechSynthesisOutputFormat,ResultReason } from 'microsoft-cognitiveservices-speech-sdk';





export const getAudioData = (text) => {
    const subscriptionKey = process.env.AZURE_KEY;
    const serviceRegion = process.env.AZURE_REGION;
    return new Promise((resolve,reject) => {
        const visemes_array = [];
        const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        speechConfig.speechSynthesisOutputFormat = SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

        // Create a speech synthesizer
        const synthesizer = new SpeechSynthesizer(speechConfig, null);

        // Event handler for viseme events
        synthesizer.visemeReceived = (s, e) => {
            console.log(`Viseme ID: ${e.visemeId}, Audio offset: ${e.audioOffset / 10000} ms`);
            visemes_array.push(e)
        };


        // Event handler for synthesis completed
        synthesizer.synthesisCompleted = (s, e) => {
            if (e.result.reason === ResultReason.SynthesizingAudioCompleted) {
                console.log("Synthesis finished successfully.");
                
                // Save the audio to a file
                const buffer = Buffer.from(e.result.audioData);
                const base64 = buffer.toString('base64');
                resolve({
                    base64,
                    visemes_array
                })
                
            } else {
                console.error("Synthesis failed:", e.result.errorDetails);
                reject(e.result.errorDetails)
            }
        };


        // Synthesize speech from SSML
        const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
            <voice name="en-US-JennyNeural">${text}</voice>
        </speak>`;

        synthesizer.speakSsmlAsync(
            ssml,
            result => {
                if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                    console.log("Synthesis finished successfully.");
                } else {
                    console.error("Synthesis failed:", result.errorDetails);
                    reject(result.errorDetails)
                }
            },
            error => {
                console.error("Error:", error);
                reject(error)
            }
        );


    })
}









