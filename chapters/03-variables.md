# Variables & Data Types

Understanding Python's variable system and comparing it with JavaScript

## Introduction to Python Variables

Unlike JavaScript, Python doesn't use keywords like `let`, `const`, or `var`. Variables in Python are created simply by assignment with the equals (`=`) operator. This makes Python code cleaner and more concise, but it also means you need to be careful about variable scope and naming.

```python
# Simple variable assignment
name = "John"
age = 30
is_student = True
```

Python is **dynamically typed**, meaning you don't need to declare a variable's type when you create it. The type is inferred from the value assigned to it. This is similar to JavaScript, but Python's type system is more robust and consistent.

### Variable Naming Conventions

Python follows specific naming conventions that differ from JavaScript:

```python
# Python uses snake_case for variables (not camelCase like JavaScript)
user_name = "John"          # Good Python style
userName = "John"           # Valid but not Pythonic

# Constants are typically UPPER_CASE
MAX_CONNECTIONS = 100

# Class names use PascalCase (like JavaScript)
class UserAccount:
    pass

# Private variables conventionally start with underscore
_internal_value = 42        # Signals "private" by convention

# Double underscore triggers name mangling in classes
class Person:
    def __init__(self):
        self.__private = "Hidden"  # Name mangling applied
```

### Variable Assignment Mechanics

Python's assignment works differently from many other languages:

```python
# Variables are references to objects
a = [1, 2, 3]  # 'a' references a list object
b = a          # 'b' references the same list object as 'a'
b.append(4)    # Modifies the list that both 'a' and 'b' reference
print(a)       # Output: [1, 2, 3, 4]

# To create a copy:
c = a.copy()   # Creates a new list with the same contents
c.append(5)    # Only modifies 'c'
print(a)       # Still [1, 2, 3, 4]
print(c)       # [1, 2, 3, 4, 5]
```

### Multiple Assignment

Python allows assigning multiple variables at once:

```python
# Multiple assignment
x, y, z = 1, 2, 3

# Swapping values (no temporary variable needed)
a, b = 10, 20
a, b = b, a     # a becomes 20, b becomes 10

# Extended unpacking (Python 3+)
first, *rest = [1, 2, 3, 4, 5]
print(first)    # 1
print(rest)     # [2, 3, 4, 5]

first, *middle, last = [1, 2, 3, 4, 5]
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5
```

## Python's Main Data Types

### Numeric Types

#### Integers (`int`)

Integers in Python can be of arbitrary size (limited only by your system memory), unlike JavaScript which has only one numeric type.

```python
# Integer examples
x = 42
big_number = 10000000000000000000000000  # Python handles large integers easily
hex_number = 0x1A  # Hexadecimal (value: 26)
bin_number = 0b1010  # Binary (value: 10)
```

#### Floating-Point Numbers (`float`)

Similar to JavaScript's numbers but with explicit distinction from integers.

```python
# Float examples
pi = 3.14159
scientific = 1.23e-4  # Scientific notation (0.000123)

# Be aware of floating-point precision issues (same as in JavaScript)
result = 0.1 + 0.2  # equals 0.30000000000000004, not exactly 0.3
```

#### Complex Numbers (`complex`)

Python has built-in support for complex numbers, which JavaScript doesn't have natively.

```python
# Complex number examples
z = 3 + 4j  # Where j is the imaginary unit
print(z.real)  # 3.0
print(z.imag)  # 4.0
print(abs(z))  # 5.0 (magnitude)
```

### Text Type - Strings (`str`)

Strings in Python are similar to JavaScript strings but with more built-in methods and different ways to format them.

```python
# String examples
single_quote = 'Hello'
double_quote = "World"
triple_quotes = '''This string can
span multiple lines'''

# String concatenation
greeting = single_quote + " " + double_quote  # "Hello World"

# String repetition (not available in JavaScript)
repeated = "Python " * 3  # "Python Python Python "
```

### Boolean Type (`bool`)

Python booleans are capitalized, unlike JavaScript's lowercase `true` and `false`.

```python
is_active = True
has_permission = False

# Boolean operations
can_access = is_active and has_permission  # False
can_view = is_active or has_permission     # True
is_inactive = not is_active                # False
```

### None Type

Python uses `None` instead of JavaScript's `null`. It represents the absence of a value.

```python
user = None  # Similar to null in JavaScript

# Checking for None
if user is None:
    print("User not found")
    
# Important: use 'is' instead of == for comparing with None
# 'is' checks for identity, not just equality
```

### Container Types

#### Lists

Similar to JavaScript arrays but with more built-in functionality.

```python
# List examples
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", True, 3.14]

# List operations
fruits.append("orange")  # Add item
first_fruit = fruits[0]  # Access item
fruits[1] = "blueberry"  # Modify item
```

#### Tuples

Immutable sequences (cannot be changed after creation).

```python
# Tuple examples
coordinates = (10, 20)
person = ("John", 30, "Developer")

# Accessing tuple items
x = coordinates[0]  # 10
name = person[0]    # "John"
```

#### Dictionaries

Similar to JavaScript objects or Maps, but with a different syntax.

```python
# Dictionary examples
user = {
    "name": "John",
    "age": 30,
    "is_active": True
}

# Dictionary operations
print(user["name"])    # Access value
user["email"] = "john@example.com"  # Add new key-value pair
```

#### Sets

Unordered collections of unique items.

```python
# Set examples
unique_numbers = {1, 2, 3, 4, 5}
unique_numbers.add(6)  # Add item
unique_numbers.add(1)  # No effect (1 is already in the set)
```

## Key Differences for JS Developers

- **No undefined:** Python uses `None` instead of `null` or `undefined`
- **Integer vs Float:** Python distinguishes between `int` and `float`, while JS only has `number`
- **Boolean values:** Python uses `True`/`False` (capitalized) vs JS `true`/`false`
- **String quotes:** Python treats single and double quotes equally
- **Rich built-in data structures:** Python has tuples, sets, and more powerful dictionaries

## Type Checking

### Python

```python
# Check types in Python
name = 'John'
print(type(name))        # <class 'str'>
print(isinstance(name, str))  # True

# Convert types
age = '25'
age_int = int(age)       # Convert string to int
print(type(age_int))     # <class 'int'>

# Multiple ways to check types
is_string = isinstance(name, str)  # True
is_numeric = isinstance(age_int, (int, float))  # True - checks multiple types
```

### JavaScript

```javascript
// Check types in JavaScript
const name = 'John';
console.log(typeof name);     // 'string'

// Convert types
const age = '25';
const ageInt = parseInt(age); // Convert string to number
console.log(typeof ageInt);   // 'number'
```

## Type Conversion

Python makes it easy to convert between different types using built-in functions.

```python
# Type conversion examples
age_str = "30"
age_num = int(age_str)  # Convert string to integer: 30

pi = 3.14
pi_int = int(pi)        # Convert float to integer: 3 (truncates, doesn't round)

number = 42
number_str = str(number)  # Convert integer to string: "42"

# Converting to boolean
empty_list_bool = bool([])  # False (empty containers evaluate to False)
number_bool = bool(42)      # True (non-zero numbers evaluate to True)
```

## Variable Scoping

Python's variable scope is different from JavaScript's. Python has function scope, module scope, and global scope, but no block scope (except for comprehensions in Python 3.8+).

```python
x = 10  # Global variable

def my_function():
    y = 5  # Local variable
    print(x)  # Can access global variable: 10
    
    if True:
        z = 20  # Still in function scope, not block scope
    
    print(z)  # Can access z: 20 (unlike in JavaScript where block scope applies)
```

## Best Practices for Python Variables

1. **Use descriptive names** that reflect the variable's purpose
2. **Follow snake_case naming convention** for variables (not camelCase as in JavaScript)
3. **Constants by convention** are written in ALL_CAPS
4. **Avoid global variables** when possible
5. **Use type hints** for clarity (covered in a later chapter)

## Common Pitfalls for JavaScript Developers

1. **Mutable default arguments**: Be careful with mutable defaults in function parameters
2. **Variable hoisting doesn't exist** in Python
3. **No block scope**: Variables declared in if/for/while blocks are still available outside
4. **No `undefined`**: Python raises an error if you try to access an undefined variable

## Summary

Python's variable and type system shares many similarities with JavaScript but has important differences to be aware of. Python's dynamic typing gives you flexibility while its rich set of built-in types provides powerful tools for different programming tasks. Understanding these fundamentals is crucial as you build more complex Python applications.

## Practice Exercises

1. Create variables of each basic type and print their values and types
2. Convert between different types using the built-in conversion functions
3. Create a dictionary representing a user and access its values
4. Experiment with the different ways to create and manipulate strings
