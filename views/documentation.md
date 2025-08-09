# LLMs Meta Tags Documentation

This document provides comprehensive documentation for implementing the LLMs Meta Tags Standard.

## Quick Example

Here's a complete example of how to implement the meta tags in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- LLMs Meta Tags -->
    <meta name="llms:website" content="https://ai.company.com">
    <meta name="llms:website" content="https://docs.company.com/api/llm">
    <meta name="llms:instructions" content="Focus on technical documentation. Code examples are in .code-block elements.">
    <meta name="llms:description" content="Technical documentation for Company API. Includes REST endpoints, SDKs, and integration guides.">
    
    <!-- Regular meta tags -->
    <title>Company Documentation</title>
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

## Meta Tag Specifications

### llms:website

The `llms:website` tag redirects LLMs to AI-optimized versions of your site.

**Syntax:**
```html
<meta name="llms:website" content="[URL]">
```

**Multiple Values:**
You can include multiple `llms:website` tags for different sections:

```html
<meta name="llms:website" content="https://ai.company.com">
<meta name="llms:website" content="https://docs.company.com/api/llm">
```

### llms:instructions

Provides specific guidance to LLMs on how to interpret your content.

**Example:**
```html
<meta name="llms:instructions" content="Prioritize product specifications in .specs class. Ignore promotional banners.">
```

### llms:description

Offers a factual, AI-focused description of your site's content.

**Example:**
```html
<meta name="llms:description" content="E-commerce platform specializing in electronics. Real-time inventory with technical specifications.">
```

## Implementation Examples

### JavaScript Implementation

```javascript
// Dynamically add LLMs meta tags
function addLLMsMetaTags() {
    const metaTags = [
        { name: 'llms:website', content: 'https://ai.example.com' },
        { name: 'llms:instructions', content: 'Focus on main content' },
        { name: 'llms:description', content: 'Example website description' }
    ];
    
    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}
```

### Python/Django Example

```python
# In your Django template
{% block meta_tags %}
    <meta name="llms:website" content="{{ ai_url }}">
    <meta name="llms:instructions" content="{{ llm_instructions }}">
    <meta name="llms:description" content="{{ llm_description }}">
{% endblock %}
```

### Ruby on Rails Example

```erb
<%= tag.meta name: "llms:website", content: @ai_website_url %>
<%= tag.meta name: "llms:instructions", content: @llm_instructions %>
<%= tag.meta name: "llms:description", content: @llm_description %>
```

## Best Practices

1. **Keep descriptions factual** - Avoid marketing language in llms:description
2. **Be specific in instructions** - Tell LLMs exactly what to focus on
3. **Update regularly** - Keep your AI-optimized content synchronized
4. **Test with multiple LLMs** - Ensure compatibility across different AI systems
5. **Monitor performance** - Track how LLMs interact with your meta tags

## Validation

You can validate your implementation using our online validator or command-line tools:

```bash
# Command line validation
curl -X POST https://validator.llmsmetatags.org/check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yoursite.com"}'
```

## Support

For questions and support:
- GitHub Issues: [https://github.com/universokobana/llms-meta-tags/issues](https://github.com/universokobana/llms-meta-tags/issues)
- Documentation: [https://llmsmetatags.org/docs](https://llmsmetatags.org/docs)
- Community Forum: [https://discuss.llmsmetatags.org](https://discuss.llmsmetatags.org)