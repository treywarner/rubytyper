# frozen_string_literal: true

require 'sinatra/base'
require 'logger'

# App is the main application where all your logic & routing will go
class App < Sinatra::Base
  set :erb, escape_html: true
  enable :sessions

  attr_reader :logger, :groups, :typing_scores

  def initialize
    super
    @logger = Logger.new('log/app.log')
    @groups ||= begin
      groups_from_id = `id`.to_s.match(/groups=(.+)/)[1].split(',').map do |g|
        g.match(/\d+\((\w+)\)/)[1]
      end

      groups_from_id.select { |g| g.match?(/^P\w+/) }
    end
    
  end

  def title
    'SwitftType'
  end

  get '/' do
    erb :index
  end

  get '/leaderboards' do
    @typing_scores = File.foreach("#{__dir__}/typingscores").map { |line| line.split(' ')}.sort {|a,b| a[1].to_f*a[2].to_f <=> b[1].to_f*b[2].to_f}.reverse
    
    erb :leaderboards
  end

  get '/typing' do
    @typing_scores = File.foreach("#{__dir__}/typingscores").map { |line| line.split(' ')}.sort {|a,b| a[1].to_f*a[2].to_f <=> b[1].to_f*b[2].to_f}.reverse
    
    file=File.open("#{__dir__}/wordlist")
    words = file.read.split
    len = 30
    typing = Array.new(len) {words[ rand(0..words.size) ]}
    @typing_text = typing.join(' ').capitalize
    erb :typing
  end

  post '/typing' do

    name = params[:name].gsub(' ', '_')
    wpm = params[:wpm]
    acc = params[:acc]

    session[:flash] = { info: "added new score for '#{name}' for #{wpm} and #{acc}" }
    
    open("#{__dir__}/typingscores", 'a') { |f|
    f.print "\n#{name} #{wpm} #{acc}"
    }
    
    redirect(url("/leaderboards"))
  end
end