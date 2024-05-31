# 9103_majorProject README file
IDEA9103 Creative Coding R Smits
- rsmi0219
- 540529951

## How to interact
**Click on the big circles to change their colour. 

Do you notice anything else by hovering your mouse from one circle to another?
The background circles change their colours too. How do different colours influence each other? And how do they influence you?**

## Approach

> User Input

I wanted to create an user interaction where you are able to influence the users perception of the colours of the artwork. I therefore made the colours change, where my groupmembers chose to change the size from the circles, the shapes or their position.

Inspired by Olafur Eliasson, particularly his work ["Room for One Colour"](https://olafureliasson.net/artwork/room-for-one-colour-1997/), I've been playing with the dynamic interplay of turning colors on and off in my artwork. Eliasson's work, known for its immersive exploration of monochromatic light in environments, reveals the influence that colours have on our experiences. By isolating specific hues, Eliasson shows how colours can dominate and influence each other. Looking at colour theory, we know that colours are perceived not in isolation but in relation to each other. This relational perception can significantly influence how we experience an artwork.

I wanted ["this"](https://www.artsy.net/artwork/pacita-abad-wheels-of-fortune) super colourful artwork of to be able to be perceived in different ways. Since also in our research for the group work the bright colours stood out. 

I eventually chose to do this in three ways:

1. Always having random colour combinations for the small dots
2. Changing the Nested circles in random colours all the time
3. Clicking the big circles to change their colour


To do so I used several online tutorials: 

>Click function for if a Big circle is clicked to change colours:
    I used the coding train video for this code:
  https://www.youtube.com/watch?v=DEHsr4XicN8&lc=Ugg7r6_9i0CEnHgCoAEC&ab_channel=TheCodingTrain

>For creating an array with colours this tutorial was inspiration:
  https://happycoding.io/tutorials/p5js/images/image-palette

 



### Implementation

![Result](Images/My%20work.gif)

The colour changes are different for the circles: 

-**Background circles:** These colours are not animated, but different every time
-**Big circles:** click to change colours to R,G,B,white or black as defined in palette
-**Nested circles:** change random colours during framerate
-**Small circles:** I changed the colours when hovering over the image as also done in my week 10 quiz

For the big circles I chose the primary colours and black and white to have the most contrast. 


The getPaletteColor function is designed to find the closest color from a predefined palette to a given color. However eventually I chose that I wanted to be able to just switch between the different RGB and black & white, so I used the palette just as a way to acces this array of colours.

In our group code I changed the array of the Nested circles to each individual circle to be able to choose which circle I wanted animated & made the other circles white and black for contrast and a bit more tranquility in the whole piece.

I also needed a lower frameRate because otherwise it was not pleasant to look at. Therefore I used:
https://p5js.org/reference/#/p5/frameRate 



