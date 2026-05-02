===================================
Executing Behavior: createBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {}
Checking if participant exists
Post Behavior Worldstate: { basket: [] }

===================================
Executing Behavior: acceptName
===================================
Please provide a value for name: sample
Behavior Arguments: { name: 'sample' }
Pre behavior Worldstate: { basket: [] }
Checking if participant exists
Participant named "name" has length 6 which is greater than the minimum length of 1
Post Behavior Worldstate: { basket: [], name: 'sample' }

===================================
Executing Behavior: createBook
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], name: 'sample' }
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [], book: { name: 'sample' } }

===================================
Executing Behavior: addBookToBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], book: { name: 'sample' } }
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [ { name: 'sample' } ] }

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
Checking if participant exists
Error executing line "getFromPos basket 0 book": Index 0 out of bounds for "basket".