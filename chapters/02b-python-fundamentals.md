# Python Fundamentals

A comprehensive guide to the core concepts in Python programming, with easy explanations and practical examples for JavaScript developers.

## Introduction

This chapter covers all the fundamental concepts in Python that will form the foundation of your Python journey. We'll compare with JavaScript concepts where relevant to help you make connections between the two languages.

## Python Philosophy

Python follows a design philosophy emphasizing code readability and simplicity. The Python community often refers to "The Zen of Python" (accessible by typing `import this` in a Python interpreter):

```python
# Run this in your Python interpreter to see "The Zen of Python"
import this
```

Key principles include:
- **Readability counts**: Clean, readable code is preferred over clever, condensed code
- **Explicit is better than implicit**: Clear intentions are valued
- **Simple is better than complex**: Straightforward solutions are preferred
- **Flat is better than nested**: Avoid excessive indentation levels

## Basic Syntax

Python uses indentation (whitespace) to define code blocks, rather than braces like in JavaScript:

```python
# JavaScript:
# if (x > 5) {
#     console.log("x is greater than 5");
# }

# Python:
if x > 5:
    print("x is greater than 5")
```

**Important indentation rules**:
- Use consistent indentation (4 spaces is standard in Python)
- All statements within the same block must have the same indentation level
- Indentation errors will prevent your code from running

## Comments

Python supports single-line and multi-line comments:

```python
# This is a single line comment

"""
This is a multi-line comment
(actually a string literal that isn't assigned to anything)
"""

'''
You can also use single quotes for multi-line comments
'''
```

## Variables and Assignment

Variables in Python:
- Don't require declaration keywords like `var`, `let`, or `const`
- Are dynamically typed
- Follow snake_case naming convention (unlike JavaScript's camelCase)

```python
# Variable assignment
name = "John"  # A string
age = 30       # An integer
salary = 75000.50  # A float
is_active = True  # A boolean

# Multiple assignment
x, y, z = 1, 2, 3

# Swapping values (no temporary variable needed)
a, b = 10, 20
a, b = b, a  # a is now 20, b is now 10
```

### Variable Naming Rules

- Names can contain letters, numbers, and underscores
- Names cannot start with a number
- Names are case-sensitive (`name` ≠ `Name`)
- Reserved words like `if`, `while`, `for` cannot be used

```python
# Valid names
user_name = "Alice"
count123 = 42
_hidden = "This variable starts with an underscore"

# Invalid names
# 1count = 10  # Cannot start with a number
# if = "test"  # Cannot use reserved word
```

## Data Types

### 1. Numbers

Python has several numeric types:

#### Integers (`int`)

```python
# Integer examples
x = 42
negative = -7
big_num = 1000000000000000000000  # No integer size limit

# Number systems
binary = 0b1010  # Binary (value: 10)
octal = 0o17     # Octal (value: 15)
hexa = 0x1F      # Hexadecimal (value: 31)

# Integer division (returns floor division)
floor_division = 7 // 2  # Result: 3
```

#### Floating Point (`float`)

```python
# Float examples
pi = 3.14159
e = 2.71828
scientific = 1.23e-4  # Scientific notation (0.000123)

# Floating point division
result = 7 / 2  # Result: 3.5
```

#### Complex Numbers (`complex`)

```python
# Complex number examples
c1 = 3 + 4j       # 3 + 4i in mathematics
c2 = complex(3, 4)  # Same as above
```

### 2. Strings (`str`)

Python strings are immutable sequences of characters:

```python
# String creation
single_quotes = 'Hello'
double_quotes = "World"
triple_quotes = '''This string can
span multiple lines'''

# String operations
name = "Alice"
greeting = "Hello, " + name  # Concatenation
length = len(name)  # Length: 5

# String methods
upper_name = name.upper()  # "ALICE"
lower_name = name.lower()  # "alice"
replaced = name.replace("ce", "x")  # "Alix"

# String indexing and slicing
first_char = name[0]      # "A"
last_char = name[-1]      # "e"
substring = name[1:3]     # "li"
reversed_name = name[::-1]  # "ecilA"

# Formatted strings (f-strings in Python 3.6+)
age = 30
info = f"{name} is {age} years old"  # "Alice is 30 years old"

# Older formatting methods
info2 = "{} is {} years old".format(name, age)
info3 = "%s is %d years old" % (name, age)
```

### 3. Booleans (`bool`)

Python has `True` and `False` boolean values (note the capitalization):

```python
# Boolean values
is_valid = True
is_completed = False

# Boolean operations
result1 = True and False  # False
result2 = True or False   # True
result3 = not True        # False

# Type conversion to boolean
# The following values evaluate to False:
# - False, None, 0, 0.0, "", [], (), {}, set()
# Everything else evaluates to True

bool(0)      # False
bool("")     # False
bool([])     # False
bool(42)     # True
bool("text") # True
```

### 4. None Type

`None` is Python's equivalent of JavaScript's `null`:

```python
# None type
value = None

# Checking for None
if value is None:
    print("Value is None")

# Note: use 'is None' instead of '== None' for best practice
```

### 5. Collections

#### Lists

Lists are ordered, mutable collections (similar to JavaScript arrays):

```python
# List creation
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, [1, 2, 3]]

# Accessing elements
first_fruit = fruits[0]  # "apple"
nested_value = mixed[3][1]  # 2

# List methods
fruits.append("orange")     # Add to the end
fruits.insert(1, "mango")   # Insert at position 1
fruits.remove("banana")     # Remove by value
popped = fruits.pop()       # Remove and return last element
fruits.sort()               # Sort in-place
fruits.reverse()            # Reverse in-place

# List slicing
subset = fruits[1:3]    # Elements from index 1 to 2
copy_list = fruits[:]   # Create a shallow copy

# List comprehensions (powerful feature)
squares = [x**2 for x in range(10)]  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
even_nums = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
```

#### Tuples

Tuples are ordered, immutable collections:

```python
# Tuple creation
coordinates = (10, 20)
single_item = (42,)  # Note the comma for single-item tuple

# Accessing elements
x = coordinates[0]  # 10

# Tuple unpacking
x, y = coordinates  # x=10, y=20

# Common tuple uses
def get_user():
    return ("Alice", 30)  # Return multiple values

name, age = get_user()  # Unpack the returned tuple
```

#### Dictionaries

Dictionaries are key-value pairs (similar to JavaScript objects):

```python
# Dictionary creation
user = {
    "name": "Alice",
    "age": 30,
    "is_admin": False
}

# Accessing values
name = user["name"]  # "Alice"
age = user.get("age")  # 30
role = user.get("role", "user")  # Default value if key doesn't exist

# Modifying dictionaries
user["email"] = "alice@example.com"  # Add new key-value pair
user["age"] = 31  # Update existing value
del user["is_admin"]  # Remove a key-value pair

# Dictionary methods
keys = user.keys()    # All keys
values = user.values()  # All values
items = user.items()   # All (key, value) tuples

# Dictionary comprehensions
squares = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

#### Sets

Sets are unordered collections of unique elements:

```python
# Set creation
unique_numbers = {1, 2, 3, 4, 5}
duplicate_test = {1, 2, 2, 3, 3, 3}  # Results in {1, 2, 3}

# Set operations
unique_numbers.add(6)       # Add an element
unique_numbers.remove(3)    # Remove an element (raises error if not found)
unique_numbers.discard(10)  # Remove if present (no error if not found)

# Set operations
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}
union = set_a | set_b          # {1, 2, 3, 4, 5, 6}
intersection = set_a & set_b   # {3, 4}
difference = set_a - set_b     # {1, 2}
symmetric_diff = set_a ^ set_b  # {1, 2, 5, 6}

# Set comprehensions
even_set = {x for x in range(10) if x % 2 == 0}  # {0, 2, 4, 6, 8}
```

## Operators

### Arithmetic Operators

```python
a, b = 10, 3

addition = a + b        # 13
subtraction = a - b     # 7
multiplication = a * b  # 30
division = a / b        # 3.3333... (float)
floor_division = a // b # 3 (integer division)
modulus = a % b         # 1 (remainder)
exponent = a ** b       # 1000 (10 to the power of 3)
```

### Comparison Operators

```python
x, y = 5, 10

equal = x == y          # False
not_equal = x != y      # True
greater_than = x > y    # False
less_than = x < y       # True
greater_equal = x >= y  # False
less_equal = x <= y     # True
```

### Logical Operators

```python
a, b = True, False

and_result = a and b    # False
or_result = a or b      # True
not_result = not a      # False

# Short-circuit evaluation
result = None or "default"  # "default" (useful for defaults)
```

### Identity and Membership Operators

```python
# Identity operators
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(x is z)  # True (same object)
print(x is y)  # False (different objects)
print(x == y)  # True (same value)

# Membership operators
fruits = ["apple", "banana", "cherry"]
print("apple" in fruits)     # True
print("orange" not in fruits)  # True
```

## Basic Control Flow

### If-Elif-Else Statements

```python
age = 18

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")

# Ternary operator (conditional expression)
status = "adult" if age >= 18 else "minor"
```

### Loops

#### For Loops

```python
# Looping through a range
for i in range(5):  # 0, 1, 2, 3, 4
    print(i)

# Looping through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Enumerate for index and value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Looping through dictionaries
user = {"name": "Alice", "age": 30}
for key in user:
    print(f"{key}: {user[key]}")

for key, value in user.items():
    print(f"{key}: {value}")
```

#### While Loops

```python
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num == 3:
        continue  # Skip the rest of the loop for this iteration
    if num == 5:
        break     # Exit the loop
    print(num)  # Prints 1, 2, 4
```

## Functions

Functions in Python are defined using the `def` keyword:

```python
# Basic function
def greet(name):
    """This is a docstring - describes what the function does."""
    return f"Hello, {name}!"

message = greet("Alice")  # "Hello, Alice!"

# Default parameters
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

greet_with_title("Smith")  # "Hello, Mr. Smith!"
greet_with_title("Johnson", "Dr.")  # "Hello, Dr. Johnson!"

# Variable number of arguments
def sum_all(*numbers):
    """Sum all given numbers."""
    total = 0
    for num in numbers:
        total += num
    return total

sum_all(1, 2, 3, 4)  # 10

# Keyword arguments
def user_info(name, **details):
    """Create user info dictionary."""
    user_dict = {"name": name}
    user_dict.update(details)
    return user_dict

user_info("Alice", age=30, email="alice@example.com")
# {'name': 'Alice', 'age': 30, 'email': 'alice@example.com'}

# Lambda functions (anonymous functions)
square = lambda x: x**2
square(5)  # 25

# Higher-order function example
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x**2, numbers)  # Returns a map object
squared_list = list(squared)  # [1, 4, 9, 16, 25]
```

## Exception Handling

Python uses try/except blocks for error handling:

```python
# Basic try/except
try:
    result = 10 / 0  # Causes ZeroDivisionError
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Multiple exception types
try:
    num = int("not a number")  # Causes ValueError
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catching any exception
try:
    # Some code that might raise an exception
    dangerous_operation()
except Exception as e:
    print(f"An error occurred: {e}")

# Try/except/else/finally
try:
    number = int(input("Enter a number: "))
except ValueError:
    print("That's not a valid number!")
else:
    # Only runs if no exception was raised
    print(f"You entered {number}")
finally:
    # Always runs, regardless of whether an exception occurred
    print("End of operation")
```

## Modules and Imports

Python organizes code into modules (files) and packages (directories):

```python
# Importing a whole module
import math
result = math.sqrt(16)  # 4.0

# Importing specific items
from math import sqrt, pi
result = sqrt(16)  # 4.0

# Import with alias
import math as m
result = m.sqrt(16)  # 4.0

# Import all (not recommended)
from math import *
result = sqrt(16)  # 4.0

# Custom modules
# (in mymodule.py)
def greet(name):
    return f"Hello {name}"

# (in another file)
import mymodule
mymodule.greet("Alice")  # "Hello Alice"
```

## File Operations

Working with files is a common operation in Python:

```python
# Reading a file
with open("file.txt", "r") as file:
    content = file.read()  # Read entire file
    
# Reading line by line
with open("file.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes leading/trailing whitespace

# Writing to a file
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a test file.")

# Appending to a file
with open("output.txt", "a") as file:
    file.write("\nAppending more content.")
```

## List/Dictionary Comprehensions

Python offers concise ways to create lists and dictionaries:

```python
# List comprehensions
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]  # [1, 4, 9, 16, 25]

# List comprehension with condition
even_squares = [x**2 for x in numbers if x % 2 == 0]  # [4, 16]

# Nested list comprehension (create a 3x3 matrix)
matrix = [[i * 3 + j + 1 for j in range(3)] for i in range(3)]
# [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Dictionary comprehension
square_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Dictionary from two lists
keys = ["a", "b", "c"]
values = [1, 2, 3]
dict_from_lists = {k: v for k, v in zip(keys, values)}
# {'a': 1, 'b': 2, 'c': 3}
```

## Common Built-in Functions

Python has many useful built-in functions:

```python
# len() - Length of an object
len([1, 2, 3])  # 3
len("Hello")    # 5

# type() - Get the type of an object
type(42)        # <class 'int'>
type("Hello")   # <class 'str'>

# isinstance() - Check if an object is an instance of a class
isinstance(42, int)     # True
isinstance("Hello", list)  # False

# range() - Create a sequence of numbers
list(range(5))       # [0, 1, 2, 3, 4]
list(range(2, 8))    # [2, 3, 4, 5, 6, 7]
list(range(1, 10, 2))  # [1, 3, 5, 7, 9]

# sorted() - Return a sorted list
sorted([3, 1, 4, 2])  # [1, 2, 3, 4]
sorted("python")      # ['h', 'n', 'o', 'p', 't', 'y']

# filter() - Filter elements by a function
numbers = [1, 2, 3, 4, 5]
even = list(filter(lambda x: x % 2 == 0, numbers))  # [2, 4]

# map() - Apply a function to all items
doubled = list(map(lambda x: x * 2, numbers))  # [2, 4, 6, 8, 10]

# zip() - Combine multiple iterables
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
list(zip(names, ages))  # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]

# min(), max(), sum()
min(numbers)  # 1
max(numbers)  # 5
sum(numbers)  # 15
```

## String Methods

Python has a rich set of string manipulation methods:

```python
s = "   Hello, World!   "

s.strip()        # "Hello, World!" (removes leading/trailing whitespace)
s.lower()        # "   hello, world!   "
s.upper()        # "   HELLO, WORLD!   "
s.title()        # "   Hello, World!   "

"Hello".startswith("He")  # True
"Hello".endswith("lo")    # True
"Hello".find("l")         # 2 (first occurrence index)
"Hello".count("l")        # 2 (number of occurrences)
"Hello".replace("l", "L") # "HeLLo"

",".join(["A", "B", "C"])  # "A,B,C"
"A,B,C".split(",")         # ["A", "B", "C"]

# Check string properties
"hello".isalpha()    # True
"123".isdigit()      # True
"hello123".isalnum() # True
"  ".isspace()       # True
```

## Common Python Idioms and Best Practices

```python
# Use in operator for membership testing (better than explicit loops)
if name in allowed_users:
    # Process user
    
# Use enumerate for index access
fruits = ["apple", "banana", "cherry"]
for i, fruit in enumerate(fruits):
    print(f"{i+1}. {fruit}")

# Use 'is' for checking None, True, False (not ==)
if result is None:
    # Handle null case

# Use collections.defaultdict for counting/grouping
from collections import defaultdict
word_counts = defaultdict(int)
for word in words:
    word_counts[word] += 1  # No need to check if key exists

# Avoid mutable default arguments
# Bad:
def add_user(name, users=[]):  # users will be shared between calls!
    users.append(name)
    return users

# Good:
def add_user(name, users=None):
    if users is None:
        users = []
    users.append(name)
    return users
```

## Conclusion

These Python fundamentals provide a solid foundation for writing Python code. As you become more comfortable with these concepts, you'll be able to write more complex and powerful Python programs.

Remember that Python emphasizes readability and simplicity. Try to write your code in a clean and straightforward manner, following Python's philosophy of "explicit is better than implicit."

In the next chapters, we'll build on these fundamentals to explore more advanced Python concepts and techniques.
