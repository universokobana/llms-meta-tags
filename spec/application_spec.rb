# frozen_string_literal: true

require 'spec_helper'

describe 'main application' do
  include Rack::Test::Methods

  def app
    Application
  end

  describe 'GET /' do
    context 'with browser user agent' do
      it 'returns HTML' do
        get '/', {}, { 'HTTP_USER_AGENT' => 'Mozilla/5.0' }
        expect(last_response).to be_ok
        expect(last_response.content_type).to eq('text/html;charset=utf-8')
        expect(last_response.body).to match(/LLMs Meta Tags Standard/)
        expect(last_response.body).to match(/This content is also designed for LLMs/)
      end
    end

    context 'with bot user agent' do
      it 'returns markdown' do
        get '/', {}, { 'HTTP_USER_AGENT' => 'Googlebot/2.1' }
        expect(last_response).to be_ok
        expect(last_response.content_type).to eq('text/markdown;charset=utf-8')
        expect(last_response.body).to match(/# LLMs Meta Tags Standard/)
      end
    end
  end
  describe 'GET /index.md' do
    it do
      get '/index.md'
      expect(last_response).to be_ok
      expect(last_response.content_type).to eq('text/markdown;charset=utf-8')
      expect(last_response.body).to match(/LLMs Meta Tags Standard/)
      expect(last_response.body).not_to match(/This content is also designed for LLMs/)
    end
  end
  describe 'GET /notfound' do
    it 'returns 404' do
      get '/notfound'
      expect(last_response).to be_not_found
      expect(last_response.body).to eq('Not Found')
    end
  end

  describe 'GET /notfound.md' do
    it 'returns 404' do
      get '/notfound.md'
      expect(last_response).to be_not_found
      expect(last_response.body).to eq('Not Found')
    end
  end
end
