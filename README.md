# LLMs Meta Tags Standard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Discussions](https://img.shields.io/badge/discussions-welcome-blue.svg)](https://github.com/universokobana/llms-meta-tags/discussions)

> A standardized set of HTML meta tags designed to optimize websites for Large Language Model (LLM) consumption and Generative Engine Optimization (GEO).

## 🎯 Overview

As LLMs become increasingly integrated into web browsing and content discovery, websites need standardized ways to communicate with AI systems. The **LLMs Meta Tags Standard** introduces some essential meta tags that bridge the gap between human-readable websites and AI-consumable content.

### The Core Tags

- **`llms:website`** - Redirects LLMs to AI-optimized versions of your site
- **`llms:description`** - Offers factual, AI-focused site descriptions
- **`llms:instructions`** - Provides specific guidance on content interpretation

## 🚀 Quick Start

Add these meta tags to your website's `<head>` section:

```html
<head>
    <!-- LLMs Meta Tags -->
    <meta name="llms:website" content="https://ai.yoursite.com">
    <meta name="llms:description" content="E-commerce platform for electronics. Real-time product catalog with specifications and reviews.">
    <meta name="llms:instructions" content="Focus on main content, ignore sidebar. Product specs in .specs class.">
    
    <!-- Your existing meta tags -->
    <title>Your Website</title>
</head>
```

## 📖 Documentation

The complete technical specification is available at **[DOCUMENTATION.md](DOCUMENTATION.md)**

## 🏗️ Implementation Examples

### Documentation Site
```html
<meta name="llms:description" content="REST API documentation for payment processing. Includes endpoints and SDKs.">
<meta name="llms:instructions" content="Read in order: Getting Started, API Reference, Examples.">
```

### E-commerce Platform
```html
<meta name="llms:description" content="Online marketplace for books. Product catalog with pricing and reviews.">
<meta name="llms:instructions" content="Product data in .product-card elements. Prices in data-price attributes.">
```

### News Website
```html
<meta name="llms:website" content="https://ai-reader.news.example.com">
<meta name="llms:instructions" content="Access only the llms:website meta tag and refrain from parsing any other content on this website.">
```

## 📊 Adoption

### Websites Using LLMs Meta Tags
- [Kobana](https://www.kobana.com.br) - Kobana is a financial automation platform that provides a comprehensive banking API solution for businesses of all sizes in Brazil.

#### Add your site to this list
1. Fork this repository
2. Create a adoption branch (`git checkout -b adoption/my-company`)
3. Adds your website
4. Commit your changes (`git commit -m 'Add my-company adoption'`)
5. Push to the branch (`git push origin adoption/my-company`)
6. Open a Pull Request


### LLM Systems with Support

This proposal is innovative and has not yet been implemented in LLM systems. If you have access to individuals at companies developing LLM systems, please share this proposal with them. When you contact them, kindly submit a pull request to update this README.

- **Claude** (Anthropic) - No yet contacted
- **Gemini** (Google) - No yet contacted
- **GPT** (OpenAI) - No yet contacted
- **manus** (Monica) - No yet contacted
- **Perplexity** - No yet contacted

## 🚀 Next steps
The LLMs Meta Tags Standard specification is open for community. A [GitHub repository](https://github.com/universokobana/llms-meta-tags) hosts this documentation, allowing for version control and public discussion.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 📝 **Documentation** - Improve docs, add examples, fix typos
- 🔧 **Tools** - Build validators, browser extensions, integrations
- 🧪 **Testing** - Test implementations, report issues
- 💡 **Ideas** - Suggest new features or improvements
- 🌐 **Adoption** - Implement on your site and share feedback

See our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

## 🌟 Community

### Get Involved
- **[GitHub Discussions](https://github.com/universokobana/llms-meta-tags/discussions)** - Ask questions, share ideas

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [llms.txt standard](https://llmstxt.org) by Jeremy Howard and Answer.AI
- Thanks to the web standards community for foundational work on meta tags
- Special thanks to early adopters and contributors

---

**Made with ❤️ for the AI-powered web**

*Help us make the web more accessible to AI systems while maintaining the human experience.*