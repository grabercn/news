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

    const title = titleMatch ? titleMatch[1].trim() : null;
    const shortDesc = shortDescMatch ? shortDescMatch[1].trim() : '';
    const articleContent = articleMatch ? articleMatch[1].trim() : null;

    if (!title || !articleContent) {
      throw new Error('Parsed content is incomplete. Ensure the output follows the required format.');
    }

    const articleObj = { title, shortDesc, article: articleContent };

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







