---
title: Implementing an iterative and recursive method in Ruby
date: 2021-04-08T00:26:24.480Z
thumb_img_path: /images/stop.jpg
excerpt: Knowing how to implement an iterative and recursive approach is a good
  exercise to our brain.
template: post
---
Photo by [Indrajeet Choudhary](https://unsplash.com/@robin_indrajeet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/reversed?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Palindrome has always been used as an exercise in programming, and most likely students are  asked to create a method and implement an iterative and recursive approach.

A Palindrome is a word, or phrase that can be read  forward and in reverse. e.q ‘racecar’ ‘madam’. https://en.wikipedia.org/wiki/Palindrome

And we’re gonna do that here. First we take the iterative approach:

```ruby
def palindrome(str)
  reversed = ''
  length = str.length

  while length != 0
    reversed += str[length - 1]
    length -= 1
  end

  return false unless str == reversed

  true
end

puts palindrome('kayak')
# true
puts palindrome('word')
# false
```

First we created a variable reversed which will store the reversed string, and a length that will store the length of the string parameter since we’ll gonna use that more that once, it’s always better to store in a variable if you are going to use it more that once.

Then we loop and check if the length is not equals to zero and if not, we pop the last letter of the string and store it into our reversed variable, make sure to minus the length so it’ll reference the last element of the array and it won’t be out of bounds.

We return false if str is not equals to reversed and lastly return true if everything is a palindrome.

Now let’s proceed to the recursive method:

```ruby
def palindrome_recursive(str)  
  if str.length == 1 || str.length == 0
    return true
  end

  if str[0] == str[-1]
    palindrome_recursive(str[1..-2])
  else
    false
  end
end

puts palindrome_recursive('civic')
# true
puts palindrome_recursive('notachance')
# puts false
```

In making a recursive method we should always create a base case or also called an end goal. 

And in our method we do that if the length of the parameter str is 1 or 0 and we return true.

Then we check if the first and last letter of the string by indexing str\[0] and str\[-1] are the same otherwise its false, if the first and last letter are correct we call our method but this time we put str\[1..-2] so it’ll check the second index and so fort.

Mostly we can achieve a solution using the iterative approach but it’s also better to know on how to use and implement a recursive function.

Here’s also a link about recursion in Ruby.

https://www.rubyguides.com/2015/08/ruby-recursion-and-memoization/

http://ruby.bastardsbook.com/chapters/recursion/