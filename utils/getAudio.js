import { createClient } from "@deepgram/sdk";
import fs from "fs";


export const getAudio = async (text) => {
 
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
 
  const response = await deepgram.speak.request(
    { text},
    {
      model: "aura-asteria-en",
      encoding: "linear16",
      container: "wav",
    }
  );

  // STEP 2: Get the audio stream and headers from the response
  const stream = await response.getStream();
  const buffer = await getAudioBuffer(stream);
  return buffer;
};


const getAudioBuffer = async (response) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};



