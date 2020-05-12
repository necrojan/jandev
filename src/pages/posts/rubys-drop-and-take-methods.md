---
title: Ruby's drop and take methods
date: 2020-05-12T12:51:31.579Z
thumb_img_path: /images/mayank-dhanawade-huf1vghhowi-unsplash.jpg
content_img_path: /images/mayank-dhanawade-huf1vghhowi-unsplash.jpg
template: post
---
Photo by [Mayank Dhanawade](https://unsplash.com/@mayank_dhanawade?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)on[Unsplash](https://unsplash.com/s/photos/drop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

I started learning Ruby a couple of months ago, I admit I really like the language. It has this ability to change any class methods and change how it works.

That ability is called **Monkey Patch**.  

I am having this exercise about monkey patching from a site that I enrolled with. And the description is to modify the Array class and implement a new method called  `my_rotate`. The idea is, the Array class should have that new method and given a number as it’s method argument  it should return a new array containing all the elements of the original array in a rotated order. If value is negative, it should rotate in the opposite direction.

```
names = ['jan', 'jamie', 'isabelle', 'dogie']

p names.my_rotate # ['jamie', 'isabelle', 'dogie', 'jan']

p names.my_rotate # ['isabelle', 'dogie', 'jan', 'jamie']
```

Here comes the ***take*** and ***drop*** methods to the rescue!

### Drop

Looking into it’s documentation it says “*Drops first n elements from array and returns the rest of the elements in an array.*“

```
a = [1, 2, 3, 4, 5, 0]
a.drop(3) #  [4, 5, 0]
```

While ***take*** does the opposite

### Take

"*Returns first n elements from the array. If a negative number is given, raises an  Argument*"

```
a = [1, 2, 3, 4, 5, 0]
a.take(3) # [1, 2, 3]
```

### Implementation

```
class Array
  def my_rotate(num = 1)
    idx = num % length

    drop(idx) + take(idx)
  end
end

names = ['jan', 'jamie', 'isabelle', 'dogie']

p names.my_rotate # ['jamie', 'isabelle', 'dogie', 'jan']

p names.my_rotate(2) # ['isabelle', 'dogie', 'jan', 'jamie']
```

Done!