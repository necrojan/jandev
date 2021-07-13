---
title: Custom Enumerables
date: 2021-07-13T10:28:54.268Z
thumb_img_path: /images/loop.jpg
content_img_path: /images/loop.jpg
excerpt: "Ruby is so awesome it allows developers to modify or add new methods
  to  Some of its class or module, like the Enumerable module.  "
template: post
---
Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/loop?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Ruby is so awesome it allows developers to modify or add new methods to 
Some of its class or module, like the Enumerable module.  

```ruby
module Enumerable
  def my_each
    i = 0
    while i < length
      yield(self[i])
      i += 1
    end
  end
end
```

We declare a method under the Enumerable module so we can call it like this.

```ruby
[1, 4, 2, 56].my_each { |item| puts item }
# Output
# 1
# 4
# 2 
# 56
```

The `length` inside the method represents the size of the array. Based on the above example we can also say `self.length`  but we can simply omit that. Inside our loop is a call to `yield` which basically will call the block, `self[i]` represents the elements of each of the array.