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
fetchArticle("🔥 You Won't Believe What This AI Just Did!");
fetchArticle("Unmasking the Future: The Robot That Outsmarted Humans!");
fetchArticle("Top Secret: The Tech Gadget That Could Change Everything!");
fetchArticle("Is This the End of Smartphones? Find Out Now!");
fetchArticle("Shocking Discovery: The Hidden World of Virtual Reality!");
fetchArticle("Tech Apocalypse? The Weird Invention That Has Everyone Talking!");
fetchArticle("Mind-Blowing: How Quantum Computers Are Already Taking Over!");
fetchArticle("The Ultimate Hack: Control Your Devices With Your Mind!");
fetchArticle("Is This the Most Advanced AI Ever? Prepare to be Amazed!");
fetchArticle("Crazy Tech Secrets: What Silicon Valley Doesn’t Want You to Know!");
fetchArticle("From Zero to Hero: How a Tiny Gadget Became a Global Sensation!");
fetchArticle("Breaking: The Mysterious Tech Trend That Will Blow Your Mind!");
fetchArticle("What Happens When Robots Dream? The Answer Will Shock You!");
fetchArticle("Bizarre But True: The Smartphone Feature You Never Knew Existed!");
fetchArticle("The Rise of the Machines: Are We Already Living in the Future?");
fetchArticle("Incredible Tech Revelation: The Gadget That Thinks for Itself!");
fetchArticle("The Unbelievable Story of a Drone That Flew Itself!");
fetchArticle("Mystery Solved: The Strange Tech Behind Everyday Miracles!");
fetchArticle("This AI Is Learning to Laugh – And It's Hilariously Brilliant!");
fetchArticle("When Tech Meets Magic: The Gadget That Defies Logic!");
fetchArticle("Astonishing Invention: The Device That Can Read Your Mind!");
fetchArticle("Shock and Awe: The Future of Tech Is Stranger Than Fiction!");
fetchArticle("The Weirdest Tech Hack Ever: You Won’t Believe What It Can Do!");
fetchArticle("Prepare for the Unexpected: The Gadget That Breaks All Rules!");
fetchArticle("Tech Gone Wild: The Hilarious Invention That’s Taking Over!");
fetchArticle("The Great Tech Mystery: What Is Really Powering Your Devices?");
fetchArticle("Bizarre Breakthrough: This AI Can Now Tell Jokes!");
fetchArticle("Insane Innovation: The Gadget That Thinks, Speaks, and Plays!");
fetchArticle("Futuristic or Fake? The Tech Trend That Has Experts Baffled!");
fetchArticle("Dare to Dream: The AI Revolution That Will Change Your Life!");
fetchArticle("Secret Tech Unveiled: How a Hidden Algorithm Controls the World!");
fetchArticle("Prepare to Be Shocked: The Weirdest App You’ve Never Heard Of!");
fetchArticle("The Future Is Here: This Gadget Might Just Save Humanity!");
fetchArticle("Crazier Than Fiction: The Invention That Predicts Your Every Move!");
fetchArticle("The Dark Side of Tech: What Big Companies Are Hiding From You!");
fetchArticle("Out of This World: The Space-Age Gadget That’s Redefining Reality!");
fetchArticle("What the Tech?! The Gadget That’s Literally Out of Control!");
fetchArticle("Shock Value: The Digital Miracle That Defies Logic!");
fetchArticle("The Most Insane Tech Trend of 2025 – And It's Just the Beginning!");
fetchArticle("Breaking News: The Invention That Could End All Work!");
fetchArticle("Is This the Future? The Device That Thinks for Itself!");
fetchArticle("Prepare for a Wild Ride: The Gadget That’s Turning Heads Worldwide!");
fetchArticle("From Sci-Fi to Reality: The Tech That Will Blow Your Mind!");
fetchArticle("Suspense in Silicon Valley: The Secret Invention You Need to See!");
fetchArticle("The Uncanny Tech That’s Hilariously Human!");
fetchArticle("What If Your Smartphone Became Self-Aware? Find Out Now!");
fetchArticle("Mind Over Matter: The Invention That Reads Your Thoughts!");
fetchArticle("You’ll Never Guess: The Tech Hack That’s Changing Everything!");
fetchArticle("Unbelievable but True: The Gadget That Does the Impossible!");
fetchArticle("The Future of Fun: How This Tech Is Redefining Entertainment!");






