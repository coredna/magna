
# What is Magna
Magna works as a tree where you can put together the functionality of your webpage like lego blocks. Instead of 
having functionality tied to specific modules you can add functionality to pages based on functionality required 
using plugins.
 
Rather than having a method on a Blog object to submit a comment form, you can have an abstract plugin that will 
submit any form with ajax and handle it's response, this code can be shared throughout your application reducing the 
amount of code you need to write and more importantly read and maintain.

The tree is bound together by Promise's so if you need to do something asynchronously you can delay the tree with any
 request you need. The tree will pass a message down to every node where you can easily decide which nodes should 
 initialize.

``` 
                             Node
                             Root
                        /           \
                   Predicate      Predicate
                   /blog          /catalogue
                    /                  \
                 Import              Import
                 #blog              #catalogue
                 /                         \
             Module                       Module
              Blog                       Catalogue
              /                        /           \
          Module                   Plugin            Plugin
           Post                   AddToCart    ExpressionOfInterest
       /           \
   Plugin        Plugin
   Comment       Search                          
```
