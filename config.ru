# frozen_string_literal: true

require 'rack-canonical-host'
require 'rack/ssl-enforcer'
require './application'

use Rack::CanonicalHost, ENV['CANONICAL_HOST'] if ENV['CANONICAL_HOST']
use Rack::SslEnforcer if production?

run Application
