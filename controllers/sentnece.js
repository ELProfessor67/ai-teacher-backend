import { getAudioData } from "../utils/generateAudio.js";

const practiceSentences = [
    { text: 'The cat is fluffy.', image: '/images/cat.png' },
    { text: 'I like to play outside.', image: '/images/play.png' },
    { text: 'The sun is bright.', image: '/images/sun.png' },
    { text: 'I have a big dog.', image: '/images/dog.png' },
    { text: 'We can eat ice cream.', image: 'image5.jpg' },
    { text: 'The sky is blue.', image: '/images/sky.png' },
    { text: 'I love my family.', image: '/images/family.png' },
    { text: 'It is fun to read.', image: '/images/read.png' },
    { text: 'I can jump high!', image: '/images/jump.png' },
    { text: 'Lets go to the park.', image: '/images/park.png' }
];


export const getSentence = async (req, res) => {
    try {
      const randomIndex = Math.floor(Math.random() * practiceSentences.length);
      res.status(200).json({
        success: true,
        sentence: practiceSentences[randomIndex]
      })
    } catch (error) {
        res.status(501).json({
            message: error.message,
            success: false
        })
    }
}


export const responseGenerator = async (req,res) => {
  try {
      const text = req.body.text;
      if(text) return res.status(200).json({
        success: true
      });

      const randomIndex = Math.floor(Math.random() * practiceSentences.length);
      const responseText = `Today, I will teach you this sentence. Speak Loudly ${practiceSentences[randomIndex].text}`;
      const data = await getAudioData(responseText);
      res.status(200).json(data)

  } catch (error) {
      res.status(501).json({
          message: error.message,
          success: false
      })
  }
}