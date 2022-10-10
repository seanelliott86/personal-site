---
title: What do we need? Alt tags! Where do we need them? Everywhere!
description: A look at the right and wrong ways to make your images accessible.
date: '2017-01-06T05:38:12.640Z'
categories: []
keywords: []
slug: >-
  /@sean-elliott/what-do-we-need-alt-tags-where-do-we-need-them-everywhere-51d66740f0c7
---

As a frontend developer each website I stumble upon is seen through the developer tools window. Looking under the hood of websites reveals so many decisions by that website’s developer.   
Some decisions amazing, some not so amazing.

Just before the end of 2016 while viewing the javascript for a site (that will remain nameless), I found a new function that blew my mind! Be aware, viewing this may cause your brain to explode just like in [Scanners](http://www.imdb.com/title/tt0081455/).

This snippet is for all those who have forgotten to add those pesky `alt` tags but still want to tick the done box for accessible images.   
So put on your solar eclipse sunglasses and brace yourself for the utterly blinding, awesome glory of the following code.

```
$('html img').each(function () {  
   if (!$(this).attr('alt')) {  
      $(this).attr('alt', '');  
   }  
});
```

Amazing right! But we have the technology, we can rebuild…

```
$('img:not(\[alt\])').each(function () {  
   $(this).attr('alt', '');  
});
```

Ahhhh that’s more better-er! Now we are only looking for `img` elements that are missing the `alt` tag. Sweeeet!

For those devs who prefer Vanilla JS you could use this.

```
var imgAlt = document.querySelectorAll('img:not(\[alt\])');  
for (var i = 0; i < imgAlt.length; i++) {  
   imgAlt\[i\].setAttribute('alt','');  
};
```

For anyone reading this that don’t do the code thing, the above scripts find all the images in a website that don’t contain the `alt` tag and loops through each of the found elements and adds the missing `alt=''`, simple right.

So what has been achieved?

*   All images now have the empty `alt=''` tag.
*   Apart from the first example, our scripts are really efficient only targeting images that are missing `alt`.
*   If your using the Vanilla JS snippet then no more jQuery dependency for you, website load time has improved 10000 percent!

### Alright thats enough sarcasm time to get to the point

Do I think you should use any of the above scripts in any project? HECK NO!

The above scripts use javascript to **_“fix”_** the missing `alt` tag accessibility issue. If the user has javascript turned off then these scripts won’t run, so no `alt` tag is added to the image. While this might not sound like a big issue, screen reader users will have to try and make sense of the image based off the file name alone. That’s never helpful especially if it’s long and nonsensical.

![Example html of img tag with long nonsensical file name… yuck!](/assets/blog/1__RQWerdkK__7mDsgAueTp6RQ.png)

Javascript is meant to enhance the experience not fix laziness/incompetence, especially when there is a simple solution... **Just write semantic html.** Using scripts like the above makes me want to scream in a high shrill voice.

![](/assets/blog/1__pVSa7z4UOMw5rAXnrCu2fQ.jpeg)

Obviously developers using those scripts either doesn’t know correct html semantics, or maybe doesn't care. But they should on both counts.

Whenever the `<img>` element is being used in your web page it is required to have `alt=''`. There are some cases where the `alt` isn't required but these are [very specific cases](https://www.joedolson.com/2015/03/are-alt-attributes-required-always/).  
As a frontend developer adding `alt` to your images should be like breathing, it all happens without you thinking about it.

The other issue these scripts highlight is the chronic application of `alt=’’` on all images. There are a wide variety of uses for image in your website and the `alt` tag’s use varies for each.

#### How to use alt attribute effectively

*   **Does your image contain text?**  
    Use the `alt` to include the text shown in the image.
*   **Is the image being used as a link or a button?**   
    Use the `alt` to describe the destination of the link or action of the button.
*   **Does the image add context to the current page?**  
    Use the `alt` to briefly describe the image.
*   **Is the image decorative?**  
    Leave the `alt` empty.

_In no way does the list above cover all the possible use cases but it’s a good place to start. I recommend checking out what the w3c has about_ [_image accessibility_](https://www.w3.org/WAI/tutorials/images/) _._

Then sometimes the frontend code you have developed is on point but the integration is letting you down, maybe the backend developer has been lazy. As a good developer it is up to you to push for top notch code to be integrated not apply some dodgy fix later on. If something as simple as an `alt` can be left out, what other html could have been replaced with non semantic mark up?

Or maybe everything is correct from the front to the back and the author isn’t utilizing the `alt` correctly. Take the time to share your knowledge and explain the purpose of the `alt` and give the author the tools on how `alt` should be used. Not everyone spends their days reading the w3c spec, but simple instructions can prove itself useful.

### Before we part ways…

Ultimately this has been about education and trying to show the right and wrong ways to achieve accessibility compliance. Its up to us all to educate as many different people from developers to authors about how to use `alt` correctly without creating a script to hack in a quick “fix”.

Have I missed something important in this article or said something that is wrong? Please comment/message me and let me know.