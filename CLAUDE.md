# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **LLMs Meta Tags Standard** - a Ruby/Sinatra web application that demonstrates and documents a proposed set of HTML meta tags for optimizing websites for Large Language Model consumption and Generative Engine Optimization (GEO). The application intelligently serves different content formats based on User-Agent detection (markdown for bots, HTML for browsers).

## Commands

### Development
```bash
# Start development server with auto-reload
./bin/dev

# Install dependencies
bundle install

# Start production server
bundle exec puma -C config/puma.rb
```

### Testing
```bash
# Run all tests
rake

# Run specific test file
bundle exec rspec spec/application_spec.rb

# Run specific test
bundle exec rspec spec/application_spec.rb:LINE_NUMBER
```

### Linting
```bash
# Run Ruby linting
bundle exec rubocop

# Auto-fix linting issues
bundle exec rubocop -a
```

## Architecture

The application follows a **content-negotiation pattern** where the same route serves different content based on the User-Agent:

1. **Bot Detection** (`application.rb:6-23`): The `bot?` method identifies crawlers/bots via User-Agent patterns
2. **Content Serving** (`application.rb:25-38`): The root route checks if requester is a bot:
   - Bots receive raw markdown content with `text/plain` content-type
   - Browsers receive HTML rendered from markdown using Kramdown

### Key Components

- **Main Application**: `application.rb` - Single Sinatra application class with bot detection and content serving logic
- **Content Files**: `views/index.md` - Main markdown content explaining the LLMs Meta Tags Standard
- **Layout Templates**: `views/layouts/index.erb` - HTML wrapper for rendered content
- **Static Assets**: `public/` directory containing `llms.txt` (LLM-optimized content) and `style.css`
- **Tests**: `spec/application_spec.rb` - RSpec tests covering bot detection and content serving

### Content Management Pattern

The application uses a file-based content system:
1. Markdown files in `views/` are the source of truth
2. Layouts in `views/layouts/` provide HTML structure
3. The `public/llms.txt` file provides LLM-optimized content referenced by meta tags

## Ruby/Sinatra Conventions

- Uses Ruby 3.4.4 with Sinatra 3.0
- Follows standard Sinatra application structure
- Environment configuration via `RACK_ENV` (development/production)
- Puma web server configuration in `config/puma.rb`
- Test files follow RSpec conventions in `spec/` directory