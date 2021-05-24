---
title: Merge sort using Ruby
date: 2021-05-24T00:23:02.813Z
thumb_img_path: /images/sort.jpg
content_img_path: /images/sort.jpg
excerpt: In my last post, I have made an implementation of recursion in creating
  a  palindrome. And in this post we will still apply that same process of
  recursion and then using another fundamental operation called merging.
template: post
---
Photo by [Jan Antonin Kolar](https://unsplash.com/@jankolar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/sort?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

In my last post, I have made an implementation of recursion in creating a  palindrome. And in this post we will still apply that same process of recursion and then using another fundamental operation called merging.

Merge sort is one of the sorting algorithms and is based on the principle of divide and conquer.

It is a way of solving a problem by dividing it usually into two and then solving it individually, then finally those sub problems are merged into one final solution. 

Let’s start by making a method called merge_sort.

```ruby
def merge_sort(arr)
	
end
```

This method will accept a non-sorted array of numbers. The first thing that we need to do is to declare a base case. Remember declaring a base case or an end goal is a condition that when is met, the function or method will stop calling itself recursively. 

```ruby
def merge_sort(arr)
  return arr if arr.size <= 1

end
```

In here we check the size or length of the array if it is less than or equals to 1, then we return it. 

A one list is already sorted so if an array that only has one element we return that unaltered.

```ruby
def merge_sort(arr)
  return arr if arr.size <= 1

  left = merge_sort(arr[0...(arr.size/2)])
  right = merge_sort(arr[arr.size/2..arr.size])
  
end
```

The next step is to use the recursion. We call our own method  `merge_sort.`We will hold the first half of our array and assign it to a variable called `left` and the other half would go to the variable called `right.`

```ruby
arr[0...(arr.size/2)]

# the given array
[4, 1, 3, 2, 6, 3, 18, 2, 9, 7, 3, 1, 2.5, -9]

# will return this 
[4, 1, 3, 2, 6, 3, 18]
```

Given this snippet here, let’s say for example we have an array like this. `[4, 1, 3, 2, 6, 3, 18, 2, 9, 7, 3, 1, 2.5, -9]`

That will return `[4, 1, 3, 2, 6, 3, 18]`  since it will be shown as `arr(0...7)`because `arr.size/2` is equals to 7. And using `...` means we’ll exclude the 7th index of the array so it’ll return the indices from `0 to 6` .The other half of the array applies the same concept. 

```ruby
def merge_sort(arr)
  return arr if arr.size <= 1

  left = merge_sort(arr[0...(arr.size/2)])
  right = merge_sort(arr[arr.size/2..arr.size])

  merge(left, right)
end
```

The last part uses another method called `merge` where it accepts the left and right variables that we created respectively.

*In other languages like PHP, if we would like to return something we put  the keyword ‘return’ explicitly. But in Ruby, devs usually leave it out, though can still use it if it’s not the last one in your method*

[Github Ruby Guideline](https://github.com/rubocop/ruby-style-guide#no-explicit-return)

```ruby
def merge(left, right)
  new_arr = []

  new_arr << (left.first <= right.first ? left.shift : right.shift) while [left.size, right.size].min.positive?

  left.each { |i| new_arr << i } if left.size.positive?

  right.each { |i| new_arr << i } if right.size.positive?

  new_arr
end
```

The method will return a newly sorted array so we need a storage for that.

We’ll need to check if the `left` and `right` contains at least one element. We do that by using the `min` and chaining it with the `positive?` method to check if the number is greater than 0. The loop will stop if either the left or right array returns 0 because `positive?` will return false.

Then we verify if the first element of the left part is lower than the first element of the right part, if it is, we  `shift` the first element of the left array and add it to the new array. Otherwise we `shift` the right array’s first element. 

Lastly, we check the remaining arrays by adding a condition that checks if the left or right arrays still contains elements, then we simply add it into the new array. Our last statement simply returns the newly sorted array.

```ruby
def merge_sort(arr)
  return arr if arr.size <= 1

  left = merge_sort(arr[0...(arr.size/2)])
  right = merge_sort(arr[arr.size/2..arr.size])
	
  merge(left, right)
end

def merge(left, right)
  new_arr = []

  new_arr << (left.first <= right.first ? left.shift : right.shift) while [left.size, right.size].min.positive?

  left.each { |i| new_arr << i } if left.size.positive?

  right.each { |i| new_arr << i } if right.size.positive?
	
  new_arr
end
  
p merge_sort([4, 1, 3, 2, 6, 3, 18, 2, 9, 7, 3, 1, 2.5, 77, -9])

# [-9, 1, 1, 2, 2, 2.5, 3, 3, 3, 4, 6, 7, 9, 18, 77]
```

Here is the complete code and can be found in [Github](https://github.com/necrojan/recurssssion/blob/master/merge_sort.rb)