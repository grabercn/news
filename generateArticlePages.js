const fs = require('fs');
const path = require('path');

// Function to generate a single article page using a template.
function generateArticlePage(article) {
  // Create a slug based on the article title.
  let slug = article.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  if (!slug) {
    slug = 'article-' + Date.now();
  }
  // HTML template for the article page.
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${article.shortDesc}">
  <title>${article.title}</title>
  <link rel="stylesheet" href="../styles.css">
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
</body>
</html>`;
  return { slug, html };
}

// Function to generate the main index.html linking to all article pages.
function generateIndexPage(articlesInfo) {
  const linksHtml = articlesInfo.map(info => {
    return `<li><a href="pages/${info.slug}.html">${info.title}</a></li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Wiki Home">
  <title>Wiki Home</title>
  <link rel="stylesheet" href="styles.css">
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
  </header>
  <main>
    <h2>Articles</h2>
    <ul>
      ${linksHtml}
    </ul>
  </main>
  <footer>
    <p>&copy; 2025 Wiki Site</p>
  </footer>
</body>
</html>`;
}

// Path to the articles JSON file (assumed to be generated from your article generation process)
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
// For each article, generate its HTML page and save it.
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
