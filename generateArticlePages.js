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
  <meta name="google-site-verification" content="sKW7J47k_ZTMFQb3F858OgHLRVikjHJjwhyhAvtyehg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${article.shortDesc}">
  
  <!-- SEO Meta Tags -->
  <meta name="title" content="🔥 ${article.title} - Must Read!">
  <meta name="description" content="${article.shortDesc} - Click to discover more!">
  <meta name="keywords" content="${article.title.replace(/\s+/g, ', ')}, trending, latest news, must-read, viral">
  <meta name="author" content="Wiki Site">
  <meta name="robots" content="index, follow">

  <!-- Open Graph Meta Tags for Social Media -->
  <meta property="og:title" content="🔥 ${article.title} - Must Read!">
  <meta property="og:description" content="${article.shortDesc} - You won’t believe this!">
  <meta property="og:image" content="https://grabercn.github.io/wiki/preview/${article.slug}.jpg">
  <meta property="og:url" content="https://grabercn.github.io/wiki/pages/${article.slug}.html">
  <meta property="og:type" content="article">

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="🔥 ${article.title} - Must Read!">
  <meta name="twitter:description" content="${article.shortDesc} - You won’t believe this!">
  <meta name="twitter:image" content="https://grabercn.github.io/wiki/preview/${article.slug}.jpg">
  <meta name="twitter:url" content="https://grabercn.github.io/wiki/pages/${article.slug}.html">
  <title>Reading ${article.title}</title>
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
  <script>
    function setEmojiFavicon(emoji) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Set the font and alignment so the emoji is centered
      ctx.font = '64px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw the emoji in the center of the canvas
      ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

      // Convert canvas to a data URL and set it as the favicon
      const faviconUrl = canvas.toDataURL('image/png');
      let faviconLink = document.querySelector("link[rel*='icon']");

      // If a favicon already exists, remove it; otherwise, create a new one.
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = faviconUrl;
    }

    // Example: Set the favicon to a fire emoji
    setEmojiFavicon("📰");
  </script>
</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X95PT0X4WC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-X95PT0X4WC');
</script>

<body>
  <header>
    <h1>📰Ultimate Wiki - Article</h1>
    <h4>${article.title}</h4>
    <nav>
      <a href="../index.html">Home</a>
      <a href="../about.html">About</a>
    </nav>
  </header>

  <!-- Top ad for article page -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6853203533491695"
       data-ad-slot="3848103482"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

  <main>

    <!-- Social Share Buttons -->
    <div class="social-share">
      <ul>
        <li><button id="share-facebook">Share on Facebook</button></li>
        <li><button id="share-twitter">Share on X (Twitter)</button></li>
        <li><button id="share-linkedin">Share on LinkedIn</button></li>
      </ul>
    </div>

    <script>
      (function() {
        // Use the current page URL and title (ensure you’re serving over HTTP/HTTPS, not file://)
        var pageUrl   = encodeURIComponent(window.location.href);
        var pageTitle = encodeURIComponent(document.title);

        // Facebook share button click
        document.getElementById('share-facebook').addEventListener('click', function() {
          var fbUrl = "https://www.facebook.com/sharer/sharer.php?u=" + pageUrl;
          window.open(fbUrl, 'fbshare', 'width=600,height=400');
        });

        // Twitter (X) share button click
        document.getElementById('share-twitter').addEventListener('click', function() {
          var twitterUrl = "https://twitter.com/intent/tweet?text=" + pageTitle + "&url=" + pageUrl;
          window.open(twitterUrl, 'twshare', 'width=600,height=400');
        });

        // LinkedIn share button click
        document.getElementById('share-linkedin').addEventListener('click', function() {
          var linkedInUrl = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl + "&title=" + pageTitle;
          window.open(linkedInUrl, 'lishare', 'width=600,height=400');
        });
      })();
    </script>

    <style>
      .social-share ul {
        list-style: none;
        padding: 0;
        margin: 20px 0;
        display: flex;
        gap: 10px;
      }
      .social-share li {
        margin: 0;
      }
      .social-share button {
        cursor: pointer;
        background: #eee;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        color: #333;
        transition: background 0.3s;
      }
      .social-share button:hover {
        background: #ddd;
      }
      .article-meta {
        margin: 20px 0;
        font-size: 0.9em;
        color: #555;
        text-align: center;
      }
      .article-meta .author {
        font-weight: bold;
        color: #333;
      }
      .article-meta .date {
        font-style: italic;
      }
    </style>

    <!-- Article Meta Information -->
    <section class="article-meta">
        <p>
          Written by <span class="author">${article.author}</span> on <span class="date">${article.date}</span>
        </p>
      </section>
    <section>

    <section>
      <h2>Article</h2>
      <p>${article.article}</p>
    </section>
  </main>
    
  <!-- Bottom ad for article page -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6853203533491695"
       data-ad-slot="8058811235"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

  <footer>
    <p>&copy; 2025 Ultimate Wiki</p>
  </footer>
</body>
</html>`;
  return { slug, html };
}

/**
 * Generate the main index.html page that lists all article links.
 * Improved styling for the list and container.
 */
function generateIndexPage(articlesInfo) {
  const linksHtml = articlesInfo.map(info => {
    return `
      <div class="article-card">
        <a href="pages/${info.slug}.html">
          <h3>${info.title}</h3>
        </a>
        <p class="description">${info.shortDesc}</p>
      </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <meta name="title" content="🔥 Ultimate Wiki - Explore Trending Articles!">
  <meta name="description" content="Discover the latest and most fascinating articles on a wide range of topics. Stay informed, stay entertained!">
  <meta name="keywords" content="wiki, trending articles, latest news, must-read, viral, knowledge, facts">
  <meta name="author" content="Wiki Site">
  <meta name="robots" content="index, follow">

  <!-- Open Graph Meta Tags for Social Media -->
  <meta property="og:title" content="🔥 Ultimate Wiki - Explore Trending Articles!">
  <meta property="og:description" content="Discover the latest and most fascinating articles. Stay informed, stay entertained!">
  <meta property="og:image" content="https://grabercn.github.io/wiki/preview/home.jpg">
  <meta property="og:url" content="https://grabercn.github.io/wiki/index.html">
  <meta property="og:type" content="website">

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="🔥 Ultimate Wiki - Explore Trending Articles!">
  <meta name="twitter:description" content="Discover the latest and most fascinating articles. Stay informed, stay entertained!">
  <meta name="twitter:image" content="https://grabercn.github.io/wiki/preview/home.jpg">
  <meta name="twitter:url" content="https://grabercn.github.io/wiki/index.html">

  <title>Ultimate Wiki - Explore Trending Articles!</title>
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
    main {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    .article-card {
      background-color: #fff;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .article-card:hover {
      transform: translateY(-5px);
    }
    .article-card h3 {
      margin: 0 0 10px 0;
      font-size: 1.4em;
      font-weight: bold;
      color: #333;
    }
    .article-card .description {
      margin: 0;
      font-size: 1em;
      color: #555;
    }
    footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9em;
      color: #777;
    }
  </style>
  <script>
    function setEmojiFavicon(emoji) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Set the font and alignment so the emoji is centered
      ctx.font = '64px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw the emoji in the center of the canvas
      ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

      // Convert canvas to a data URL and set it as the favicon
      const faviconUrl = canvas.toDataURL('image/png');
      let faviconLink = document.querySelector("link[rel*='icon']");

      // If a favicon already exists, remove it; otherwise, create a new one.
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = faviconUrl;
    }

    // Example: Set the favicon to a fire emoji
    setEmojiFavicon("🔥");
  </script>
</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X95PT0X4WC"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-X95PT0X4WC');
</script>

<body>
  <header>
    <h1>🔥Ultimate Wiki - Explore Trending Articles</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>
  <!-- Top-level ad container -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-6853203533491695"
       data-ad-slot="9755036286"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
  
  <main>
    <h2>Articles</h2>
      ${linksHtml}
  </main>
  <!-- Index page bottom ad -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6853203533491695"
     crossorigin="anonymous"></script>
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
    <p>&copy; 2025 Ultimate Wiki</p>
  </footer>
</body>
</html>`;
}

// Function to generate a sitemap.xml file that includes all pages.
function generateSitemap(articlesInfo) {
  // Base URL for your site – update this with your actual base URL.
  const baseUrl = 'https://grabercn.github.io/wiki';
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add the index page.
  sitemapXml += `  <url>\n    <loc>${baseUrl}/index.html</loc>\n  </url>\n`;

  // Add each article page.
  articlesInfo.forEach(info => {
    sitemapXml += `  <url>\n    <loc>${baseUrl}/pages/${info.slug}.html</loc>\n  </url>\n`;
  });

  sitemapXml += `</urlset>\n`;
  return sitemapXml;
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

// Generate the sitemap.xml file.
const sitemapXml = generateSitemap(articlesInfo);
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');

console.log('Index, article pages, and sitemap.xml generated successfully.');
