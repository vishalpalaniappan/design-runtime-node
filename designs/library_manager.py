import copy


def b_acceptName():
    name = input("Enter Book Name: ")
    p_arg_name = name
    p_post_name = name
    return name

def b_getChoice():
    selectedOption = input("(a)dd or (g)et:")
    p_arg_selectedOption = selectedOption
    p_post_selectedOption = selectedOption
    return selectedOption

def b_createBook(name):
    p_pre_name = name
    book = {"name": name}
    p_post_book = book
    return book

def b_createBasket():
    basket = []
    p_post_basket = basket
    return basket

def b_addBookToBasket(book, basket):
    p_pre_book = book
    p_pre_basket = basket
    basket.insert(0, book)
    p_post_basket = basket
    return basket

def b_getBookFromBasket(basket):
    p_pre_basket = basket
    book = basket.pop(0)
    p_post_book = book
    p_post_basket = basket
    return book

def b_getFirstLetterOfBookName(book):
    p_pre_book = book
    firstLetter = book["name"][0]
    p_post_firstLetter = firstLetter
    return firstLetter  

if __name__ == "__main__":
    
    print("")
    print("========================")
    print( "Welcome to the library ")
    print(("========================"))

    # create basket
    basket = b_createBasket()

    while True:

        selectedOption = b_getChoice()

        if selectedOption == "a":
            # accept book
            name = b_acceptName()
            book = b_createBook(name)
            basket = b_addBookToBasket(book, basket)
        elif selectedOption == "g":
            # Get book from basket, get first letter
            book = b_getBookFromBasket(basket)
            firstLetter = b_getFirstLetterOfBookName(book)
            print("Book name had the first letter:", firstLetter)
        else:
            break
    