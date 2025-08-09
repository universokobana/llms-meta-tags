# frozen_string_literal: true

ENV['RACK_ENV'] ||= 'test'

require 'rubygems'
require 'bundler'
Bundler.setup(:default, :test)
require 'sinatra'
require 'rspec'
require 'pry'
require 'rack/test'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
# Dir[File.join(File.dirname(__FILE__), 'support/**/*.rb')].sort.each { |f| require f }

require File.join(File.dirname(__FILE__), '../application')
