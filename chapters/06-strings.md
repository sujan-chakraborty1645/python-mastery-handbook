# Strings in Python

Working with text in Python - A comprehensive guide for JavaScript developers

## String Basics

Python strings are similar to JavaScript strings, but with some key differences and additional functionality that make them more powerful and flexible.

### Creating Strings

Python offers multiple ways to create strings, each with its own use cases:

```python
# Single or double quotes work the same way (unlike JavaScript)
name = 'John'
message = "Hello, world!"

# Triple quotes for multiline strings
description = '''This is a
multiline string that
preserves line breaks
and formatting'''

# Or with triple double quotes
another_description = """This also works
for multiline text"""

# Raw strings ignore escape characters
file_path = r"C:\Users\name\Documents"  # Backslashes are preserved

# Bytes literals for binary data (Python 3+)
binary_data = b"Binary data with bytes"

# Unicode strings (in Python 3, all strings are Unicode by default)
unicode_text = "こんにちは"  # Japanese "Hello"
```

### String Immutability

Like JavaScript, Python strings are immutable, meaning you cannot change a string after it's created:

```python
greeting = "Hello"
greeting[0] = "J"  # Error: 'str' object does not support item assignment

# Instead, create a new string
new_greeting = "J" + greeting[1:]  # "Jello"
```

### String Concatenation and Repetition

Python offers multiple ways to combine strings:

```python
# Concatenation with + (similar to JavaScript)
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"

# String repetition with * (no direct JavaScript equivalent)
separator = "-" * 10  # "----------"
padding = " " * 4 + "indented text"  # "    indented text"

# Implicit concatenation of string literals (no + needed)
message = "This string " "is actually " "concatenated"  # "This string is actually concatenated"
```

# f-strings for string interpolation (similar to JS template literals)
greeting = f"Hello, {name}!"
age = 30
introduction = f"My name is {name} and I'm {age} years old"

# You can even include expressions in f-strings
calculation = f"5 + 10 = {5 + 10}"  # "5 + 10 = 15"
```

### String Immutability

Like JavaScript, Python strings are immutable, meaning they cannot be changed after creation. Any operation that appears to modify a string actually creates a new string:

```python
name = "John"
# name[0] = "K"  # This will raise a TypeError
name = "K" + name[1:]  # This creates a new string "Kohn"
```

## String Operations

### Concatenation and Repetition

```python
# Concatenation with +
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"

# String repetition with * (not available in JavaScript)
divider = "-" * 20  # "--------------------"
echo = "Echo! " * 3  # "Echo! Echo! Echo! "
```

### String Indexing and Slicing

Python's slicing is more powerful than JavaScript's substring methods:

```python
text = "Python for JavaScript Developers"

# Indexing (0-based, like JavaScript)
first_char = text[0]       # 'P'
last_char = text[-1]       # 's' (negative indices count from the end)

# Slicing [start:end:step] - end is exclusive
first_word = text[0:6]     # "Python" (same as text[:6])
last_word = text[-11:]     # "Developers"
every_second = text[::2]   # "Pto o aacitDvlpr" (every 2nd character)
reversed_text = text[::-1] # "srepoleveD tpircSavaJ rof nohtyP"

# Common slicing patterns
first_five = text[:5]      # First 5 characters
last_five = text[-5:]      # Last 5 characters
without_first_last = text[1:-1]  # Everything except first and last characters
```

### JavaScript Comparison

```javascript
```javascript
// JavaScript string creation
const name = 'John';
const message = "Hello, world!";

// Multiline string with template literals
const description = `This is a
multiline string that
preserves line breaks`;
```

## String Methods

Python offers many powerful built-in methods for string manipulation that make text processing tasks much easier:

### Basic String Operations

```python
text = "Hello, Python World!"

# Length
print(len(text))          # 19 (length)

# Case conversion
print(text.lower())       # "hello, python world!"
print(text.upper())       # "HELLO, PYTHON WORLD!"
print(text.title())       # "Hello, Python World!" (capitalize each word)
print(text.capitalize())  # "Hello, python world!" (only first letter)
print(text.swapcase())    # "hELLO, pYTHON wORLD!" (swap case of each letter)

# Whitespace handling
message = "  Hello World  "
print(message.strip())     # "Hello World" (remove leading/trailing whitespace)
print(message.lstrip())    # "Hello World  " (remove leading whitespace)
print(message.rstrip())    # "  Hello World" (remove trailing whitespace)

# Content replacement
print(text.replace("Python", "JavaScript"))  # "Hello, JavaScript World!"
print(text.replace("o", "0", 1))            # "Hell0, Python World!" (replace first occurrence only)
```

### Finding and Checking

```python
text = "Hello, Python World!"

# Finding content
print(text.find("Python"))      # 7 (index where found, -1 if not found)
print(text.index("Python"))     # 7 (like find, but raises ValueError if not found)
print(text.rfind("o"))          # 14 (find from right side)
print(text.count("o"))          # 2 (count occurrences)

# Checking content
print("Python" in text)         # True (membership check)
print(text.startswith("Hello")) # True
print(text.endswith("!"))       # True

# Character type checking
print("12345".isdigit())        # True
print("abcde".isalpha())        # True
print("abc123".isalnum())       # True
print("HELLO".isupper())        # True
print("hello".islower())        # True
print("Hello".istitle())        # True
print("  	
".isspace())       # True
```

### Splitting and Joining

```python
text = "Hello, Python World!"

# Splitting
words = text.split()             # ['Hello,', 'Python', 'World!']
comma_parts = text.split(",")    # ['Hello', ' Python World!']
limited_split = text.split(" ", 1)  # ['Hello,', 'Python World!'] (max 1 split)

# Multiline text
multiline = """line 1
line 2
line 3"""
lines = multiline.splitlines()   # ['line 1', 'line 2', 'line 3']

# Joining
words = ['Hello', 'Python', 'World']
new_text = " ".join(words)       # "Hello Python World"
comma_text = ", ".join(words)    # "Hello, Python, World"
```

### String Formatting

Python offers multiple ways to format strings:

```python
name = "Alice"
age = 30

# 1. f-strings (Python 3.6+) - Most modern and recommended
print(f"Name: {name}, Age: {age}")  # "Name: Alice, Age: 30"
print(f"{name:>10}")  # Right align to 10 spaces: "     Alice"
print(f"{3.14159:.2f}")  # Format as float: "3.14"

# 2. str.format() method
print("Name: {}, Age: {}".format(name, age))  # "Name: Alice, Age: 30"
print("Name: {0}, Age: {1}, Name again: {0}".format(name, age))  # Reuse arguments by position
print("Name: {name}, Age: {age}".format(name="Bob", age=25))  # Use keyword arguments

# 3. Old style % formatting (similar to C's printf)
print("Name: %s, Age: %d" % (name, age))  # "Name: Alice, Age: 30"
print("Pi: %.2f" % 3.14159)  # "Pi: 3.14"
```

## Advanced String Operations

### String Alignment and Padding

```python
text = "Python"

# Padding and alignment
print(text.center(20))      # "       Python       " (centered in 20 spaces)
print(text.ljust(15))       # "Python         " (left-justified)
print(text.rjust(15))       # "         Python" (right-justified)

# Padding with specific characters
print(text.center(20, "-"))  # "-------Python-------"
print(text.ljust(15, "*"))   # "Python*********"
print(text.rjust(15, "="))   # "=========Python"

# Zero-padding numbers (common for formatting)
number = 42
print(f"{number:05d}")      # "00042" (pad with zeros to 5 digits)
```

### String Translation and Mapping

```python
# Character translation
translation_table = str.maketrans("aeiou", "12345")
text = "Hello World"
print(text.translate(translation_table))  # "H2ll4 W4rld"

# Remove specific characters
remove_punctuation = str.maketrans("", "", ",.!?;:")
text = "Hello, World!"
print(text.translate(remove_punctuation))  # "Hello World"
```

## Practical Examples for JavaScript Developers

### Example 1: URL Parsing

```python
url = "https://example.com/products?id=1234&category=books"

# Extract protocol and domain
if "://" in url:
    protocol, rest = url.split("://", 1)
    domain = rest.split("/", 1)[0]
    print(f"Protocol: {protocol}")  # "https"
    print(f"Domain: {domain}")      # "example.com"

# Extract query parameters
if "?" in url:
    base_url, query_string = url.split("?", 1)
    print(f"Base URL: {base_url}")  # "https://example.com/products"
    
    # Parse query string (simple approach)
    params = {}
    for param in query_string.split("&"):
        if "=" in param:
            key, value = param.split("=", 1)
            params[key] = value
    
    print(f"Query parameters: {params}")  # {'id': '1234', 'category': 'books'}
```

### Example 2: Template Engine

```python
# Simple template engine
template = "Hello, {name}! Your order #{order_id} is {status}."
data = {"name": "Alice", "order_id": "12345", "status": "shipped"}

def render_template(template, data):
    result = template
    for key, value in data.items():
        placeholder = "{" + key + "}"
        result = result.replace(placeholder, str(value))
    return result

rendered = render_template(template, data)
print(rendered)  # "Hello, Alice! Your order #12345 is shipped."
```

## Python vs. JavaScript: String Handling Differences

| Feature | Python | JavaScript |
|---------|--------|------------|
| Concatenation | `"a" + "b"` | `"a" + "b"` |
| Interpolation | f-strings: `f"Name: {name}"` | Template literals: `` `Name: ${name}` `` |
| Repetition | `"a" * 3` (gives "aaa") | No direct equivalent |
| Slicing | `text[1:5]` | `text.substring(1, 5)` |
| Negative indices | `text[-1]` (last character) | No direct equivalent |
| Splitting | `text.split(" ")` | `text.split(" ")` |
| Case conversion | `text.upper()`, `text.lower()` | `text.toUpperCase()`, `text.toLowerCase()` |
| Finding | `text.find("x")` (-1 if not found) | `text.indexOf("x")` (-1 if not found) |
| Checking | `"x" in text` | `text.includes("x")` |
```

## String Methods

Python offers many built-in methods for string manipulation:

```python
text = "Hello, Python World!"

# Basic operations
print(len(text))          # 19 (length)
print(text.lower())       # hello, python world!
print(text.upper())       # HELLO, PYTHON WORLD!
print(text.title())       # Hello, Python World!
print(text.strip())       # Remove whitespace from start/end
print(text.replace("Python", "JavaScript"))  # Hello, JavaScript World!

# Finding and checking
print(text.find("Python"))      # 7 (index where found)
print("Python" in text)         # True (membership check)
print(text.startswith("Hello")) # True
print(text.endswith("!"))       # True

# Splitting and joining
words = text.split()            # ['Hello,', 'Python', 'World!']
comma_parts = text.split(",")   # ['Hello', ' Python World!']
new_text = " ".join(words)      # Hello, Python World!

# Formatting
print("Name: {}, Age: {}".format("Alice", 30))
print(f"Name: {'Bob'}, Age: {25}")  # f-string (Python 3.6+)
```

## String Slicing

Python string slicing is powerful and concise:

```python
text = "Python Programming"

# Basic slicing [start:end] (end is exclusive)
print(text[0])        # P (first character)
print(text[0:6])      # Python (from index 0 to 5)
print(text[:6])       # Python (from beginning to index 5)
print(text[7:])       # Programming (from index 7 to end)
print(text[-1])       # g (last character)
print(text[-12:])     # Programming (last 12 characters)

# Extended slicing [start:end:step]
print(text[::2])      # Pto rgamn (every second character)
print(text[::-1])     # gnimmargorP nohtyP (reversed)
```

## Strings vs. Bytes

Python distinguishes between strings and bytes, which is important for working with files and network operations:

```python
# Strings vs bytes
text_string = "Hello, world!"
text_bytes = b"Hello, world!"   # Bytes literal

# Converting between strings and bytes
bytes_from_str = text_string.encode('utf-8')
str_from_bytes = text_bytes.decode('utf-8')

print(type(text_string))  # <class 'str'>
print(type(text_bytes))   # <class 'bytes'>
```

## Key Differences from JavaScript

1. **No string character array access**: Unlike JavaScript, Python strings are not arrays of characters, though they support indexing.
   
2. **String immutability**: Like JavaScript, strings are immutable in Python.
   
3. **String formatting**: Python offers multiple ways to format strings, with f-strings being the most modern and similar to JavaScript template literals.
   
4. **Method naming**: Python uses snake_case for method names (e.g., `str.upper()`) rather than camelCase (e.g., `str.toUpperCase()`).
   
5. **String literal prefixes**: Python allows prefixes like `r"raw string"`, `f"formatted {value}"`, and `b"bytes"`.

## Advanced String Operations

```python
import re

text = "Python has 3 main versions: 2.7, 3.6, and 3.11"

# Regular expressions
matches = re.findall(r"\d+\.\d+", text)  # ['2.7', '3.6', '3.11']

# String interpolation with dictionary
data = {"name": "Alice", "age": 30}
message = "Name: %(name)s, Age: %(age)d" % data

# Advanced formatting
table = "{0:<10}|{1:^15}|{2:>10}".format("Left", "Center", "Right")
# Left      |     Center     |     Right
```
