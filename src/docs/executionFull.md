===================================
Executing Behavior: createBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {}
Checking if participant exists
Post Behavior Worldstate: { basket: [] }

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: a
Behavior Arguments: { selectedOption: 'a' }
Pre behavior Worldstate: { basket: [] }
Checking if participant exists
Post Behavior Worldstate: { basket: [], selectedOption: 'a' }

===================================
Executing Behavior: acceptName
===================================
Please provide a value for name: sample
Behavior Arguments: { name: 'sample' }
Pre behavior Worldstate: { basket: [], selectedOption: 'a' }
Checking for keys and values in require primitive
Checking if participant exists
Participant named "name" has length 6 which is greater than the minimum length of 1
Post Behavior Worldstate: { basket: [], selectedOption: 'a', name: 'sample' }

===================================
Executing Behavior: createBook
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], selectedOption: 'a', name: 'sample' }
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [], selectedOption: 'a', book: { name: 'sample' } }

===================================
Executing Behavior: addBookToBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [], selectedOption: 'a', book: { name: 'sample' } }
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a' }

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: a
Behavior Arguments: { selectedOption: 'a' }
Pre behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a' }
Checking if participant exists
Post Behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a' }

===================================
Executing Behavior: acceptName
===================================
Please provide a value for name: time
Behavior Arguments: { name: 'time' }
Pre behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a' }
Checking for keys and values in require primitive
Checking if participant exists
Participant named "name" has length 4 which is greater than the minimum length of 1
Post Behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a', name: 'time' }

===================================
Executing Behavior: createBook
===================================
Behavior Arguments: {}
Pre behavior Worldstate: { basket: [ { name: 'sample' } ], selectedOption: 'a', name: 'time' }
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'a',
  book: { name: 'time' }
}

===================================
Executing Behavior: addBookToBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'a',
  book: { name: 'time' }
}
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: a
Behavior Arguments: { selectedOption: 'a' }
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}

===================================
Executing Behavior: acceptName
===================================
Please provide a value for name: print
Behavior Arguments: { name: 'print' }
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}
Checking for keys and values in require primitive
Checking if participant exists
Participant named "name" has length 5 which is greater than the minimum length of 1
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a',
  name: 'print'
}

===================================
Executing Behavior: createBook
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a',
  name: 'print'
}
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a',
  book: { name: 'print' }
}

===================================
Executing Behavior: addBookToBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a',
  book: { name: 'print' }
}
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'print' }, { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: g
Behavior Arguments: { selectedOption: 'g' }
Pre behavior Worldstate: {
  basket: [ { name: 'print' }, { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'a'
}
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'print' }, { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g'
}

===================================
Executing Behavior: getBookFromBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'print' }, { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g'
}
Checking for keys and values in require primitive
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  book: { name: 'print' }
}

===================================
Executing Behavior: getFirstLetterOfBookName
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  book: { name: 'print' }
}
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p'
}

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: g
Behavior Arguments: { selectedOption: 'g' }
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p'
}
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p'
}

===================================
Executing Behavior: getBookFromBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'time' }, { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p'
}
Checking for keys and values in require primitive
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p',
  book: { name: 'time' }
}

===================================
Executing Behavior: getFirstLetterOfBookName
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 'p',
  book: { name: 'time' }
}
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 't'
}

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: g
Behavior Arguments: { selectedOption: 'g' }
Pre behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 't'
}
Checking if participant exists
Post Behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 't'
}

===================================
Executing Behavior: getBookFromBasket
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [ { name: 'sample' } ],
  selectedOption: 'g',
  firstLetter: 't'
}
Checking for keys and values in require primitive
Checking if participant exists
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: {
  basket: [],
  selectedOption: 'g',
  firstLetter: 't',
  book: { name: 'sample' }
}

===================================
Executing Behavior: getFirstLetterOfBookName
===================================
Behavior Arguments: {}
Pre behavior Worldstate: {
  basket: [],
  selectedOption: 'g',
  firstLetter: 't',
  book: { name: 'sample' }
}
Checking if participant exists
Checking if participant exists
Post Behavior Worldstate: { basket: [], selectedOption: 'g', firstLetter: 's' }

===================================
Executing Behavior: getChoice
===================================
Please provide a value for selectedOption: q
Behavior Arguments: { selectedOption: 'q' }
Pre behavior Worldstate: { basket: [], selectedOption: 'g', firstLetter: 's' }
Checking if participant exists
Post Behavior Worldstate: { basket: [], selectedOption: 'q', firstLetter: 's' }
Execution complete. Terminating program.