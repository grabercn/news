const fs = require('fs');

// If you want to load environment variables from a .env file locally,
// install dotenv with: npm install dotenv
// and uncomment the following line:
require('dotenv').config();

async function fetchArticle(topic) {
  // OpenAI API endpoint for chat completions
  const url = 'https://api.openai.com/v1/chat/completions';

  // Use the API key from the environment variable
  const headers = {
    "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    "Content-Type": "application/json"
  };

  // System message that strictly defines the output format.
  const systemPrompt = `You are an expert AI writing assistant. Write a creative, original, and coherent article about a given topic.
Output ONLY the article in the EXACT format below, with no extra text, disclaimers, or commentary:

Title: <Article Title>
Short Description: <A brief summary of the article>
Article: <The full article content>
Author: <who it was written by, use a random real sounding made up name>
Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Do not include any warnings, disclaimers, or additional commentary.`;

  // User message that specifies the topic.
  const userMessage = `Generate an article about "${topic}"`;

  // Create messages array for the chat completion.
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userMessage }
  ];

  // Set parameters: limit to under 250 tokens.
  const payload = {
    model: "gpt-3.5-turbo", // or use "gpt-4" if available
    messages: messages,
    max_tokens: 1000,
    temperature: 0.5,
    top_p: 0.95
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorBody;
      try {
        errorBody = await response.json();
      } catch (e) {
        errorBody = { error: response.statusText };
      }
      throw new Error(`HTTP ${response.status}: ${errorBody.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    // Extract the generated text from the first choice.
    const generatedText =
      data.choices && data.choices.length > 0
        ? data.choices[0].message.content
        : null;

    if (!generatedText) {
      throw new Error('No generated text found in the response.');
    }

    // Parse the output using regular expressions.
    const titleMatch = generatedText.match(/Title:\s*(.*?)\n/);
    const shortDescMatch = generatedText.match(/Short Description:\s*(.*?)\n/);
    const articleMatch = generatedText.match(/Article:\s*([\s\S]*)/);
    const authorMatch = generatedText.match(/Author:\s*(.*?)\n/);
    const dateMatch = generatedText.match(/Date:\s*([\s\S]*)/);


    const title = titleMatch ? titleMatch[1].trim() : null;
    const shortDesc = shortDescMatch ? shortDescMatch[1].trim() : '';
    const articleContent = articleMatch ? articleMatch[1].trim() : null;
    const author = authorMatch ? authorMatch[1].trim() : null;
    const date = dateMatch ? dateMatch[1].trim() : null;


    if (!title || !articleContent) {
      throw new Error('Parsed content is incomplete. Ensure the output follows the required format.');
    }

    const articleObj = { title, shortDesc, article: articleContent, author, date };

    // Read existing articles from articles.json, or start with an empty array.
    const filePath = 'articles.json';
    let articles = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        articles = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error parsing existing articles file, starting fresh.');
        articles = [];
      }
    }

    // Append the new article and write back to the file.
    articles.push(articleObj);
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

    console.log("Generated Article:");
    console.log(articleObj);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Error: Request timed out.');
    } else {
      console.error("Error generating article:", error.message);
    }
  }
}

// fetchArticle("TOPIC")
fetchArticle("AI Revolution: The Rise of Sentient Machines");
fetchArticle("Unbelievable: AI Predicts the Next Global Crisis");
fetchArticle("Shocking AI Discovery: Robots with Emotions?");
fetchArticle("The Future is Here: How AI is Changing Your Life");
fetchArticle("Is AI the New God? Experts Weigh In");
fetchArticle("AI vs. Human: The Ultimate Battle for Creativity");
fetchArticle("Top 10 AI Predictions That Will Blow Your Mind");
fetchArticle("Breaking: AI Writes Hit Song in 5 Minutes");
fetchArticle("The Dark Side of AI: What They Don’t Want You to Know");
fetchArticle("AI and the Apocalypse: Are We Doomed?");
fetchArticle("Insane AI Conspiracy: Is Your Smartphone Spying on You?");
fetchArticle("AI’s Role in the Next Election: Fact or Fiction?");
fetchArticle("Robots Taking Over? The Shocking Truth About AI");
fetchArticle("AI Made Me Do It: Crazy Real-life Stories");
fetchArticle("How AI is Secretly Running the Internet");
fetchArticle("Mind-Blowing AI Hacks That Will Change Your World");
fetchArticle("Can AI Fall in Love? The New Frontier of Romance");
fetchArticle("AI-Powered Fortune Telling: Will It Predict Your Future?");
fetchArticle("The AI That Became a Stand-Up Comedian");
fetchArticle("Revealed: How AI Is Cooking Up Your Favorite Recipes");
fetchArticle("The Weird World of AI Art: Beauty or Disaster?");
fetchArticle("Insider Secrets: How AI is Transforming Hollywood");
fetchArticle("Is AI the Ultimate Life Coach? Experts Debate");
fetchArticle("The Shocking Rise of AI Influencers on Social Media");
fetchArticle("AI or Alien? Unexplained Phenomena in Technology");
fetchArticle("Are AI-Generated Memes the Future of Comedy?");
fetchArticle("The AI That Outsmarted a Human in Chess... Again");
fetchArticle("Can AI Predict Your Love Life? Find Out Now");
fetchArticle("From Sci-Fi to Reality: The Most Outrageous AI Predictions");
fetchArticle("AI vs. Nature: Who Will Win the Battle?");
fetchArticle("The Unexpected Link Between AI and Ancient Mysteries");
fetchArticle("How AI is Revolutionizing Your Morning Coffee");
fetchArticle("AI and the Paranormal: Ghosts or Glitches?");
fetchArticle("Clickbait or Revolution? The Truth About AI News");
fetchArticle("Is Your AI Assistant Hiding a Secret Life?");
fetchArticle("The Funniest AI Fails: When Robots Get It Wrong");
fetchArticle("From Virtual Reality to Virtual Insanity: The AI Edition");
fetchArticle("The AI That Could Predict a Zombie Apocalypse");
fetchArticle("AI: The New Oracle? What the Future Holds");
fetchArticle("The Rise of AI Dictators: Fact or Fiction?");
fetchArticle("Unmasking the AI That Controls Your Social Media");
fetchArticle("Can AI Solve the World's Biggest Problems?");
fetchArticle("The Great AI Debate: Creativity or Calculations?");
fetchArticle("How AI is Turning Science Fiction into Fact");
fetchArticle("Outrageous AI Experiments That Will Leave You Speechless");
fetchArticle("The AI That Wrote a Bestseller Overnight");
fetchArticle("Random or Genius? The Many Faces of AI Innovation");
fetchArticle("Is AI the Ultimate Cheat Code in Life?");
fetchArticle("The Bizarre World of AI-Generated Dreams");
fetchArticle("AI Secrets Exposed: What They Don’t Tell You About Your Future");







