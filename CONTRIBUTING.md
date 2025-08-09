# Contributing to LLMs Meta Tags Standard

Thank you for your interest in contributing to the LLMs Meta Tags Standard! We welcome contributions from the community to help improve and expand this project.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion for improvement:

1. Check if the issue already exists in our [GitHub Issues](https://github.com/universokobana/llms-meta-tags/issues)
2. If not, create a new issue with a clear title and description
3. Include steps to reproduce (for bugs) or detailed explanation (for features)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Ensure all tests pass:
   ```bash
   bundle exec rspec
   ```
6. Check for linting issues:
   ```bash
   bundle exec rubocop
   ```
7. Commit your changes with a clear message:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```
8. Push to your fork and submit a pull request

## Development Setup

### Prerequisites

- Ruby 3.4.4 or higher
- Bundler

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/universokobana/llms-meta-tags.git
   cd llms-meta-tags
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   ./bin/dev
   ```

4. Run tests:
   ```bash
   bundle exec rspec
   ```

## Coding Standards

### Ruby Style Guide

We follow the Ruby community style guide with RuboCop. Before submitting:

- Run `bundle exec rubocop` to check for style violations
- Run `bundle exec rubocop -a` to auto-fix issues where possible

### Testing

- Write tests for new features or bug fixes
- Ensure all existing tests pass
- Aim for clear, descriptive test names

### Documentation

- Update relevant documentation for your changes
- Add comments for complex logic
- Update the README if adding new features

## Areas for Contribution

### Current Priorities

- **Documentation**: Improve examples and use cases
- **Internationalization**: Add support for more languages
- **Testing**: Increase test coverage
- **Performance**: Optimize content serving
- **Features**: Implement new meta tags based on community needs

### Good First Issues

Look for issues labeled `good first issue` in our GitHub repository. These are great starting points for new contributors.

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect different viewpoints and experiences

### Communication

- Use clear, concise language in issues and pull requests
- Ask questions if you're unsure about something
- Provide context for your changes
- Be patient - maintainers are volunteers

## Recognition

Contributors will be recognized in our README and release notes. We appreciate every contribution, no matter how small!

## Questions?

If you have questions about contributing, feel free to:

- Open a [GitHub Discussion](https://github.com/universokobana/llms-meta-tags/discussions)
- Ask in an issue before starting major work
- Reach out to the maintainers

Thank you for helping make the LLMs Meta Tags Standard better for everyone!