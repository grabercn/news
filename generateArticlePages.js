const fs = require('fs');
const path = require('path');

/**
 * Generate a single article page using a refined HTML template.
 * We add a Google Font, container styling, header background, improved navigation,
 * and padding/margins for a clean, modern look.
 */
function generateArticlePage(article) {
  // Create a URL-friendly slug from the article title.
  let slug = article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  if (!slug) {
    slug = 'article-' + Date.now();
  }
  // Refined HTML template with inline CSS for better formatting.
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${article.shortDesc}">
  <title>${article.title}</title>
  <!-- Use a modern font from Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
    }
    header {
      background-color: #4A90E2;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    nav a {
      color: #fff;
      margin: 0 15px;
      text-decoration: none;
      font-weight: bold;
    }
    main {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    section {
      margin-bottom: 20px;
    }
    h2 {
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }
    footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9em;
      color: #777;
    }
  </style>
</head>
<body>
  <header>
    <h1>${article.title}</h1>
    <nav>
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
    </nav>
  </header>
  <main>
    <section>
      <h2>Short Description</h2>
      <p>${article.shortDesc}</p>
    </section>
    <section>
      <h2>Article</h2>
      <p>${article.article}</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2025 Wiki Site</p>
  </footer>
  
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
<!-- Article page add -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6853203533491695"
     data-ad-slot="3848103482"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    <script>
     (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    
</body>
</html>`;
  return { slug, html };
}

/**
 * Generate the main index.html page that lists all article links.
 * We improve the list styling, add a container for padding, and include a top-level ad container.
 */
function generateIndexPage(articlesInfo) {
  const linksHtml = articlesInfo.map(info => {
    return `<li>
      <a href="pages/${info.slug}.html">
        <h3>${info.title}</h3>
      </a>
    </li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Wiki Home">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
  <title>Wiki Home</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    header {
      background-color: #4A90E2;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    nav a {
      color: #fff;
      margin: 0 15px;
      text-decoration: none;
      font-weight: bold;
    }
    #ad-container {
      margin: 20px auto;
      max-width: 800px;
      text-align: center;
    }
    main {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      margin-bottom: 15px;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    li a {
      text-decoration: none;
      color: #333;
    }
    li a:hover h3 {
      color: #4A90E2;
    }
    footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9em;
      color: #777;
    }
  </style>
  <!-- Google Ads snippet placeholder -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-XXXXXXXXXXXX", 
      enable_page_level_ads: true
    });
  </script>
</head>
<body>
  <header>
    <h1>Wiki Site</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>
  <!-- Top-level ad container -->
  <div id="ad-container">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXX"
         data-ad-slot="YYYYYYYYYY"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
  <main>
    <h2>Articles</h2>
    <ul>
      ${linksHtml}
    </ul>
  </main>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
    
     <!-- Test add block -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-6853203533491695"
        data-ad-slot="6834951798"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  <footer>
    <p>&copy; 2025 Wiki Site</p>
  </footer>
</body>
</html>`;
}

// Path to the articles JSON file (assumed to be generated by your article generation process)
const articlesFilePath = path.join(__dirname, 'articles.json');

// Read the articles from articles.json
let articles = [];
try {
  const fileContent = fs.readFileSync(articlesFilePath, 'utf8');
  articles = JSON.parse(fileContent);
} catch (err) {
  console.error("Error reading articles.json:", err);
  process.exit(1);
}

// Directory for generated article pages.
const pagesDir = path.join(__dirname, 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir);
}

const articlesInfo = [];
// Generate an HTML page for each article.
articles.forEach(article => {
  const { slug, html } = generateArticlePage(article);
  const outputPath = path.join(pagesDir, `${slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  articlesInfo.push({ title: article.title, slug });
  console.log(`Generated page: ${outputPath}`);
});

// Generate the index.html page linking to each article.
const indexHtml = generateIndexPage(articlesInfo);
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');

console.log('Index and article pages generated successfully.');
