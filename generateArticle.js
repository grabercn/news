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
    max_tokens: 500,
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
fetchArticle("The Truth About Programming: What Every Developer Must Know!");
fetchArticle("AI Secrets Uncovered: Shocking Innovations Changing Coding Forever!");
fetchArticle("10 Mind-Blowing Programming Hacks That Will Transform Your Career!");
fetchArticle("The Dark Side of Code: Hidden Pitfalls You Never Knew Existed!");
fetchArticle("Revolutionize Your Workflow: How AI Is Redefining Software Development!");
fetchArticle("The Ultimate Guide to Future Tech: Coding in the Age of AI!");
fetchArticle("Is Programming Dead? The Surprising Future of Software Development!");
fetchArticle("Unlock the Hidden Power of Code: 10 Techniques That Will Blow Your Mind!");
fetchArticle("From Zero to Hero: How Cutting-Edge AI Tools Are Changing Programming!");
fetchArticle("The Shocking Truth About Modern Coding Trends – Revealed!");
fetchArticle("Secret Programming Techniques Used by the World's Top Developers!");
fetchArticle("AI on Steroids: 10 Game-Changing Innovations Every Coder Should Know!");
fetchArticle("The Future of Programming: How AI Is Disrupting the Tech Industry!");
fetchArticle("Unbelievable! This New Programming Strategy Will Leave You Speechless!");
fetchArticle("Code Like a Pro: Insane Tricks the Experts Don't Want You to Know!");
fetchArticle("The Rise of AI: 10 Revolutionary Trends That Are Reshaping Programming!");
fetchArticle("Exposed: The Untold Story Behind the World's Most Successful Coders!");
fetchArticle("Next-Gen Coding: How AI is Making Software Development 10x Faster!");
fetchArticle("Programming's Best-Kept Secrets: Discover the Tricks of the Trade!");
fetchArticle("The AI Revolution: How Cutting-Edge Technology Is Transforming Code!");
fetchArticle("Are You Ready for the Future? The Incredible Evolution of Programming!");
fetchArticle("The Hidden World of Code: What Top Developers Aren’t Telling You!");
fetchArticle("10 Unbelievable AI Innovations That Will Redefine How You Code!");
fetchArticle("Coding Catastrophes: Avoid These 10 Terrifying Mistakes Now!");
fetchArticle("The Most Exciting Programming Breakthroughs of 2025 – You Won’t Believe #7!");
fetchArticle("AI vs. Human: The Epic Battle for the Future of Software Development!");
fetchArticle("Unmasking the Future: How AI Is Transforming the Programming Landscape!");
fetchArticle("Revealed: The Programming Tricks That Will Make You a Coding Superstar!");
fetchArticle("From Obscurity to Fame: The Incredible Story of AI-Powered Code!");
fetchArticle("Insane! 10 AI Tools That Will Change the Way You Write Code!");
fetchArticle("The Coding Conspiracy: What Big Tech Doesn’t Want You to Know!");
fetchArticle("Programming Reinvented: How AI Is Making Developers More Creative!");
fetchArticle("The Ultimate AI Coding Hack: How to Write Perfect Code Every Time!");
fetchArticle("Explosive Tech News: 10 Programming Trends That Will Blow Your Mind!");
fetchArticle("How AI is Shattering Programming Limits: The Future Is Now!");
fetchArticle("The Untold Secrets of Coding: Discover What Top Developers Use Daily!");
fetchArticle("Unstoppable AI: 10 Ways Machine Learning Is Revolutionizing Code!");
fetchArticle("The Truth Behind the Hype: What Really Makes AI the Future of Programming!");
fetchArticle("Top 10 Programming Innovations That Will Change the World in 2025!");
fetchArticle("Warning: These 10 Coding Trends Could Disrupt Your Career!");
fetchArticle("The Secret Sauce of Successful Developers: AI-Powered Programming!");
fetchArticle("Mind-Blowing AI Hacks: How to Outsmart Code Like a Genius!");
fetchArticle("The Future Is Here: How AI and Programming Are Converging!");
fetchArticle("Uncover the Mysteries of Modern Code: 10 Jaw-Dropping Discoveries!");
fetchArticle("AI Breakthroughs That Will Revolutionize the Software Industry!");
fetchArticle("The Rise of No-Code & Low-Code: Are Developers Becoming Obsolete?");
fetchArticle("The Ultimate Guide to Mastering AI-Assisted Coding!");
fetchArticle("The Secret Algorithm That’s Changing Everything About Programming!");
fetchArticle("AI-Powered Programming: Hype or The Future?");
fetchArticle("The Rise of Autonomous Code: Are Developers Being Replaced?");
fetchArticle("5 AI-Powered Coding Tools That Write Better Code Than Humans!");
fetchArticle("Quantum Computing & AI: The Next Big Leap in Programming!");
fetchArticle("The Programming Trends That Will Define the Next Decade!");
fetchArticle("The Scariest AI Coding Fails That Almost Broke the Internet!");
fetchArticle("The Most Controversial Programming Languages – You Won’t Believe #3!");
fetchArticle("The Unseen Power of AI-Generated Code – Should You Trust It?");
fetchArticle("The Biggest AI Myths in Programming – Debunked!");
fetchArticle("The AI Singularity: Will Machines Code Themselves?");
fetchArticle("How the World's Smartest AI Is Writing Its Own Programming Language!");
fetchArticle("Could AI Hackers Be the Biggest Threat to Cybersecurity?");
fetchArticle("How AI Is Automating the Last Manual Jobs in Programming!");
fetchArticle("Shocking Facts About AI Ethics That Every Coder Should Know!");
fetchArticle("The Hidden Costs of Relying on AI for Software Development!");
fetchArticle("The Programming Languages That Will Be Extinct by 2030!");
fetchArticle("The AI Tools That Are Making Coding 100x Faster!");
fetchArticle("The Future of Debugging: Can AI Fix Your Code Instantly?");
fetchArticle("How Machine Learning Is Evolving Programming Without Us!");
fetchArticle("The Revolutionary AI That Can Fix Bugs Before They Happen!");
fetchArticle("Why AI Coding Assistants Might Be The Best (Or Worst) Thing Ever!");
fetchArticle("What Happens When AI Starts Designing Its Own AI?");
fetchArticle("How AI Is Creating Software That Writes Software!");
fetchArticle("How OpenAI and Google Are Battling for AI Coding Supremacy!");
fetchArticle("The AI Code War: Who Will Dominate the Future of Software?");
fetchArticle("Why AI-Powered Software Development Is the New Gold Rush!");
fetchArticle("The Crazy AI Tools That Are Generating Entire Websites in Seconds!");
fetchArticle("How AI Is Learning to Think Like a Developer!");
fetchArticle("The Most Mind-Bending AI Coding Experiments of the Year!");
fetchArticle("The Biggest Programming Revolution Since the Internet!");
fetchArticle("The AI-Powered Future of Cybersecurity – Are You Ready?");
fetchArticle("How AI Detects and Stops Security Breaches Before They Happen!");
fetchArticle("The Future of Work: Will AI Take Over Software Engineering?");
fetchArticle("Is AI-Powered Code Really Better Than Human-Written Code?");
fetchArticle("AI vs. Developers: Who Will Win the Battle for Software?");
fetchArticle("The Secret Tech Giants Don’t Want You to Know About AI and Coding!");
fetchArticle("The Most Terrifying AI Breakthroughs That Could Change the World!");
fetchArticle("How AI Could Be the Ultimate Hacker’s Weapon!");
fetchArticle("The Rise of AI-Generated Malware – Should We Be Worried?");
fetchArticle("The Wildest Predictions for AI and Programming in 2030!");
fetchArticle("What Happens When AI Develops Consciousness and Starts Coding?");
fetchArticle("How AI Is Quietly Taking Over Every Aspect of Programming!");
fetchArticle("The Insane Potential of AI-Powered Automation in Software Development!");
fetchArticle("The Programming Mistakes That Cost Companies Millions – Avoid These!");
fetchArticle("How AI Assistants Are Becoming a Developer’s Best Friend!");
fetchArticle("Why Open Source Developers Are Rushing to Integrate AI!");
fetchArticle("The Truth About AI Bias in Coding – What You Need to Know!");
fetchArticle("The Rise of AI Chatbots That Can Debug Your Code Instantly!");
fetchArticle("The Programming Superpowers You Can Unlock with AI!");
fetchArticle("The Most Terrifying AI-Generated Deepfakes – Are We Ready?");
fetchArticle("How AI-Generated Code Could Be a Blessing or a Curse!");
fetchArticle("The 10 Most Unbelievable AI Programming Stories You Need to Read!");





