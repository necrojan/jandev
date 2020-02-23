---
title: My first Ruby gem is useless
subtitle: ''
date: 2020-02-23T11:44:35.058Z
thumb_img_path: /images/Screen Shot 2020-02-23 at 10.05.12 PM.png
template: post
---
I fell in love with Ruby after trying it for the first time. It was like a breath of fresh air. I am a PHP developer, I use PHP for my day to day work, so Ruby's syntax looks really neat for me. As well as Ruby is a pure object oriented language so I am amazed when I saw something like 

```ruby
2.class
```

I also believe that in order for a developer to learn the language you must get your hands dirty with it. So I decided to build a gem in Ruby.

We will build something like this

![](/images/Screen Shot 2020-02-23 at 7.53.23 PM.png "watcher")

It is a web scraping tool that gives us information about the latest or recent episodes of Demon Slayer manga. 

Lets get started.

First you must have the bundler installed 

```
 gem install bundler
```

Then run the name of the gem like 

```
bundle gem ds_watcher
```

The bundler will generate a folder name called ds_watcher and it will generate a bunch of files and folders for us.

Basically I won't explain each thing that it generates, we will just focus on the code that we will be building. But here's a good article explaining that in [medium](https://medium.com/@SunnyB/my-first-ruby-gem-part-2-a-look-under-the-hood-efe4a68ba42).

Under the Gemfile we must add Nokogiri. It's a gem that will help us to scrap data from a site.

```shell
gem 'nokogiri', '~> 1.10', '>= 1.10.7'
```

After adding it run `bundler install` It might give us a validation error on our .gemspec file so we need to comment out these three lines of code

```ruby
  # spec.metadata["homepage_uri"] = spec.homepage
  # spec.metadata["source_code_uri"] = "TODO: Put your gem's public repo URL here."
  # spec.metadata["changelog_uri"] = "TODO: Put your gem's CHANGELOG.md URL here."
```

And we also need to add a correct url under the  `spec.homepage` , after that let's jump in the lib folder where we have the  `ds_watcher.rb` file.

```ruby
require "ds_watcher/version"

module DsWatcher
  class Error < StandardError; end
  # Your code goes here...
end
```

Under the Module DsWatcher we will create a class called Watcher, we also create two attribute reader as you can see on the code, Also we initialize the link that we are going to scrap and set that in the url property and lastly we set the text into an empty array.

```ruby
class Watcher
    attr_reader :doc, :url

    def initialize
      @url = 'https://www.viz.com/shonenjump/chapters/demon-slayer-kimetsu-no-yaiba'
      @doc = Nokogiri::HTML(open(url))
      @text = []
    end
end
```

Next let's create a method helper that returns true or false based on the chapter variable.

```ruby
def coming_soon?
  chapter = doc.css('div.type-center.type-sm.line-caption.pad-y-rg.pad-y-md--lg.type-rg--lg:contains("New chapter")')
  return false unless chapter

  true
end
```

The doc variable is a getter method which is a [Nokogiri document](https://nokogiri.org/tutorials/parsing_an_html_xml_document.html). It does have a css method where we pass a string of css classes, and we check if it does contain a text called "New Chapter".  Now we are going to use it in our new_chapter method.

```ruby
def new_chapter
  if coming_soon?
    coming_soon = doc.css('div.type-center.type-sm.line-caption.pad-y-rg.pad-y-md--lg.type-rg--lg').text.strip!
    @text << coming_soon
  else
    @text << 'Here are some few chapters to re-read: '
    @text.join("\n")

    @text + recent_chapters
  end
end
```

It basically checks if the coming_soon returns true, if it is true it stores the text "New chapter coming in 8 days!", if it is false we store the text then concatenate the recent chapters so we get a list of recent chapters.

Lastly we have the recent_chapters method along with the get_link helper method

```ruby
def recent_chapters
  doc.css('a.o_chapter-container.disp-bl.color-off-black.hover-off-black.hover-bg-lighter-gray.flex').each do |chapter|
    date_published = chapter.css('.pad-y-0.pad-r-0.pad-r-rg--sm').text
    chapter_no = chapter.css('.disp-id.mar-r-sm').text
    link = get_link(chapter.attribute('href').value)
    @text << date_published
    @text << chapter_no
    @text << link
    @text.join("\n")
  end
  @text
end

def get_link(text)
  if text.include? 'join to read'
    'Visit https://www.viz.com/shonenjump/chapters/demon-slayer-kimetsu-no-yaiba to join and read.'
  else
    'https://viz.com' + text
  end
end
```

We loop into each chapter and get the published date, chapter number and the link of each chapter then we store it into the @text array then we use the join method.

For the get link method, we pass a text string parameter which is the url of the chapter

we check if it does include  "join to read", since on this site that we are scraping, it only allows a non registered user to see only the recent three chapters. If that text is found we provide the link to the user where he needs to register,

otherwise we return the link of the chapter.

This is a command line tool so we must create a file that will run all these code. Create a watcher file with no extension. 

Here is the complete code of the watcher file.

```ruby
#!/usr/bin/env ruby

require 'ds_watcher'
require 'optparse'

w = DsWatcher::Watcher.new

option_parser = OptionParser.new do |opt|
  opt.banner = "Usage: option_parser COMMAND [OPTIONS]"
  opt.separator ""
  opt.separator "Commands"
  opt.separator "  newest: Get the newest chapter"
  opt.separator ""
  opt.separator "  recent: Get the recent chapters"
  opt.separator "Options"

  opt.on("-h", "--help", "help") do
    puts option_parser
  end
end

option_parser.parse!

case ARGV[0]
when "newest"
  puts w.new_chapter
when "recent"
  puts w.recent_chapters
else
  puts option_parser
end
```

We added `#!/usr/bin/env ruby` on top so it can be an executable file. We then require the class that we create earlier along with the [OptionParser](https://ruby-doc.org/stdlib-2.7.0/libdoc/optparse/rdoc/OptionParser.html). Here's a good [article](http://rubylearning.com/blog/2011/01/03/how-do-i-make-a-command-line-tool-in-ruby/) in using that class. 

Today we created a simple gem in Ruby, this might be useless and very basic for others, but to me it was a good chance to get my hands dirty and help me improve my knowledge in writing Ruby applications.

Here is the [link](https://github.com/necrojan/ds_watcher) on the repo.
