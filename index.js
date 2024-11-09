import { createClient } from "@deepgram/sdk";
import fs from "fs";

const deepgram = createClient("e162a8af9703f7130dd7786d1534981c3a7ccc97");
const text = "Hello, today i will teach you this sentance.";

const getAudio = async () => {
  // STEP 1: Make a request and configure the request with options (such as model choice, audio configuration, etc.)
  const response = await deepgram.speak.request(
    { text },
    {
      model: "aura-asteria-en",
      encoding: "linear16",
      container: "wav",
    }
  );

  // STEP 2: Get the audio stream and headers from the response
  const stream = await response.getStream();
  const headers = await response.getHeaders();
  if (stream) {
    // STEP 3: Convert the stream to an audio buffer
    const buffer = await getAudioBuffer(stream);
    // STEP 4: Write the audio buffer to a file
    fs.writeFile("output.wav", buffer, (err) => {
      if (err) {
        console.error("Error writing audio to file:", err);
      } else {
        console.log("Audio file written to output.wav");
      }
    });
  } else {
    console.error("Error generating audio:", stream);
  }

  if (headers) {
    console.log("Headers:", headers);
  }
};

// Helper function to convert the stream to an audio buffer
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


const transcribeAudio = async () => {
    const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync("output.wav"),
    {
          model: "nova-2",
    }
    );
    console.log(error,result.results.channels[0].alternatives[0].transcript);
}

await getAudio();
// await transcribeAudio();