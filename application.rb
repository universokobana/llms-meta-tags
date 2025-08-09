# frozen_string_literal: true

require 'rubygems'
require 'bundler/setup'
require 'logger'
require 'kramdown'
require 'kramdown-parser-gfm'
require 'coderay'
require 'sinatra'

# Main application class
class Application < Sinatra::Base
  set :views, File.expand_path('views', __dir__)
  set :public_folder, File.expand_path('public', __dir__)

  LOG = Logger.new($stdout)
  LOG.level = Logger.const_get ENV['LOG_LEVEL'] || 'DEBUG'

  get '/LICENSE' do
    content_type 'text/plain'
    File.read('LICENSE')
  end

  # Handle routes like:
  # /          -> page=index, format=html
  # /index.md  -> page=index, format=md
  # /documentation   -> page=documentation, format=html
  # /documentation.md -> page=documentation, format=md
  get %r{/?([^/.]+)?(?:\.md)?(?:\.txt)?\/?} do |page|
    # removes leading and trailing slashes
    view = page.nil? || ['index', 'llms'].include?(page) ? 'readme' : page
    view = view.strip.sub(%r{^/|/$}, '')
    file_path = File.join("#{view.upcase}.md")
    unless File.exist?(file_path)
      LOG.error "File not found: #{file_path}"
      halt 404, 'Not Found'
    end

    # Check if request is from a bot based on User-Agent
    user_agent = request.user_agent || ''
    is_bot = user_agent.match?(/bot|crawl|spider|scrape|curl|wget|python|java|ruby|go|rust|php|node|axios|fetch|postman/i)
    format = page == 'llms' ? 'md' : request.path_info.end_with?('.md') ? 'md' : 'html'

    @page = page
    @domain = ENV.fetch('DOMAIN', request.host)
    if is_bot || format == 'md'
      content_type 'text/markdown'
      File.read(file_path)
    else
      @markdown_content = File.read(file_path)
      # Configure Kramdown with options for better HTML rendering
      @html_content = Kramdown::Document.new(
        @markdown_content,
        input: 'GFM',                    # GitHub Flavored Markdown
        syntax_highlighter: 'coderay',   # Syntax highlighting for code blocks
        syntax_highlighter_opts: {
          line_numbers: false,
          css: :style                    # Inline CSS for code highlighting
        },
        hard_wrap: false,
        auto_ids: true,                  # Generate IDs for headers
        entity_output: :as_char,         # Convert entities to characters
        smart_quotes: ['lsquo', 'rsquo', 'ldquo', 'rdquo']
      ).to_html
      @html_content.gsub!(/<a href="(.*).md">/) { |m| "<a href=\"#{$1.downcase}\">" }
      erb :layout
    end
  end
end
