Right now, execution of design2 fails because I am only providing a path to
get the book from the basket after getting the first letter of book name, so
it tries to get a book from an empty basket. 

Snippet from execution is provided below (full execution in execution.md)

===================================
Executing Behavior: getBookFromBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [ { name: 'sample' } ] }
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [], book: { name: 'sample' } }

===================================
Executing Behavior: getFirstLetterOfBookName
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], book: { name: 'sample' } }
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [], firstLetter: 's' }

===================================
Executing Behavior: getBookFromBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], firstLetter: 's' }

So at this point it fails because basket is empty and it can't get book from index 0.

Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], firstLetter: 's' }
Checking if participant exists
Error executing line "getFromPos basket 0 book": Index 0 out of bounds for "basket".


Anyway, I am in the processes of updatingthe design so that it provides an option to either
accept a book or to get a book from the basket and display the first letter of the name
(also removes book from basket). In this case, there is an input from the environment called
choice which will determine the behavior that is valid. 

Regardless, it is pretty cool to see, this is a design being executed and the engine is performing
the necessary transformations as defined in the design.
