# Lists & Tuples in Python

Understanding Python's sequence data structures - A comprehensive guide for JavaScript developers

## Lists in Python

Lists in Python are ordered, mutable collections that can store items of different types. While they're similar to arrays in JavaScript, Python lists offer more built-in functionality and flexibility.

### Creating Lists

There are multiple ways to create lists in Python:

```python
# Simple list creation with square brackets
fruits = ['apple', 'banana', 'orange']
numbers = [1, 2, 3, 4, 5]
mixed = [1, 'hello', True, 3.14]  # Mixed types in the same list
nested = [1, [2, 3], [4, [5, 6]]]  # Nested lists
empty = []  # Empty list

# Using the list() constructor
chars = list('hello')  # ['h', 'e', 'l', 'l', 'o'] - splits string into characters
copy_of_fruits = list(fruits)  # Creates a shallow copy

# List comprehensions (a powerful Python feature)
# Format: [expression for item in iterable if condition]
squares = [x*x for x in range(1, 6)]  # [1, 4, 9, 16, 25]
even_numbers = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
doubled_evens = [x*2 for x in range(10) if x % 2 == 0]  # [0, 4, 8, 12, 16]

# Creating a list of specific length with the same value
zeros = [0] * 5  # [0, 0, 0, 0, 0]
repeated_list = [1, 2] * 3  # [1, 2, 1, 2, 1, 2]
```

### Basic List Operations

```python
fruits = ['apple', 'banana', 'orange', 'mango', 'kiwi']

# Accessing elements (0-indexed, like JavaScript)
first_fruit = fruits[0]  # 'apple'
last_fruit = fruits[-1]  # 'kiwi' (negative indices count from the end)

# Slicing [start:end:step] - end is exclusive
first_two = fruits[0:2]  # ['apple', 'banana']
middle_three = fruits[1:4]  # ['banana', 'orange', 'mango']
last_two = fruits[-2:]  # ['mango', 'kiwi']
every_other = fruits[::2]  # ['apple', 'orange', 'kiwi']
reversed_fruits = fruits[::-1]  # ['kiwi', 'mango', 'orange', 'banana', 'apple']

# Modifying lists
fruits[1] = 'blueberry'  # Replace an item
fruits[1:3] = ['strawberry', 'cherry']  # Replace a slice

# Getting list information
length = len(fruits)  # Number of items
contains_apple = 'apple' in fruits  # True - membership check
min_fruit = min(fruits)  # Alphabetically smallest
max_fruit = max(fruits)  # Alphabetically largest

# Finding index
orange_index = fruits.index('orange')  # Raises ValueError if not found
```

### JavaScript Comparison

```javascript
// JavaScript arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, 3.14];
const nested = [1, [2, 3], [4, [5, 6]]];
const empty = [];

// Array constructor
const chars = Array.from('hello');  // ['h', 'e', 'l', 'l', 'o']

// Array methods similar to list comprehensions
const squares = Array.from({length: 5}, (_, i) => (i+1)**2);  // [1, 4, 9, 16, 25]
const evenNumbers = [...Array(10).keys()].filter(x => x % 2 === 0);  // [0, 2, 4, 6, 8]
```

## List Methods and Operations

Python lists come with many powerful built-in methods that make them more versatile than JavaScript arrays:

### Adding and Removing Elements

```python
fruits = ['apple', 'banana', 'orange']

# Adding elements
fruits.append('mango')           # Add single item to end: ['apple', 'banana', 'orange', 'mango']
fruits.insert(1, 'strawberry')   # Insert at index: ['apple', 'strawberry', 'banana', 'orange', 'mango']
fruits.extend(['kiwi', 'grape']) # Add multiple items: ['apple', 'strawberry', 'banana', 'orange', 'mango', 'kiwi', 'grape']

# Another way to extend
more_fruits = ['pineapple', 'melon']
all_fruits = fruits + more_fruits  # Concatenation - creates new list

# Removing elements
removed = fruits.pop()           # Remove & return last item: 'grape'
removed = fruits.pop(2)          # Remove & return item at index 2: 'banana'
fruits.remove('apple')           # Remove first matching item (raises ValueError if not found)
del fruits[0]                    # Remove item at index 0
del fruits[1:3]                  # Remove slice

# Clear the list
fruits.clear()                   # Remove all items: []
```

### Sorting and Ordering

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5]
words = ['banana', 'apple', 'cherry', 'date']

# Sorting in-place
numbers.sort()                  # [1, 1, 2, 3, 4, 5, 5, 6, 9]
words.sort()                    # ['apple', 'banana', 'cherry', 'date']
words.sort(reverse=True)        # ['date', 'cherry', 'banana', 'apple']

# Sorting with custom criteria
words.sort(key=len)             # Sort by length: ['date', 'apple', 'cherry', 'banana']

# Creating a sorted copy (original unchanged)
sorted_nums = sorted(numbers)   # Returns a new sorted list
sorted_words = sorted(words, key=len, reverse=True)  # ['banana', 'cherry', 'apple', 'date']

# Reversing
numbers.reverse()               # Reverses in place
reversed_copy = list(reversed(numbers))  # Creates a new reversed list
reversed_copy = numbers[::-1]   # Another way to create reversed copy
```

### List Information and Searching

```python
numbers = [1, 2, 3, 2, 4, 2, 5]

# Counting
length = len(numbers)           # Length: 7
count_of_2 = numbers.count(2)   # Count occurrences: 3

# Finding
first_2_index = numbers.index(2)  # First occurrence index: 1
# second_2_index = numbers.index(2, first_2_index + 1)  # Find next occurrence

# Min, max, sum
min_val = min(numbers)          # Minimum value: 1
max_val = max(numbers)          # Maximum value: 5
total = sum(numbers)            # Sum of values: 17

# Check membership
is_present = 3 in numbers       # True
is_absent = 6 in numbers        # False
```

### Copying Lists

```python
original = [1, 2, [3, 4]]

# Shallow copies (nested objects share references)
copy1 = original.copy()         # Method 1
copy2 = list(original)          # Method 2
copy3 = original[:]             # Method 3

# Deep copy (for nested lists)
import copy
deep_copy = copy.deepcopy(original)  # Completely independent copy
```

## Advanced List Operations

### List Comprehensions

List comprehensions are a powerful Python feature that allows you to create lists in a concise way:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Basic comprehension
squares = [x**2 for x in numbers]  
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# With condition
even_squares = [x**2 for x in numbers if x % 2 == 0]  
# [4, 16, 36, 64, 100]

# Multiple operations
transformed = [x*2 if x % 2 == 0 else x/2 for x in numbers]
# [0.5, 4, 1.5, 8, 2.5, 12, 3.5, 16, 4.5, 20]

# Nested loops
matrix = [[1, 2], [3, 4], [5, 6]]
flattened = [item for row in matrix for item in row]  
# [1, 2, 3, 4, 5, 6]

# Creating nested lists
grid = [[x*y for x in range(1, 5)] for y in range(1, 5)]
# [[1, 2, 3, 4], [2, 4, 6, 8], [3, 6, 9, 12], [4, 8, 12, 16]]
```

### Zipping and Unzipping Lists

```python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['New York', 'London', 'Paris']

# Zip combines multiple lists into tuples
combined = list(zip(names, ages, cities))
# [('Alice', 25, 'New York'), ('Bob', 30, 'London'), ('Charlie', 35, 'Paris')]

# Unzip (unpacking)
names2, ages2, cities2 = zip(*combined)
# names2 = ('Alice', 'Bob', 'Charlie')
# ages2 = (25, 30, 35)
# cities2 = ('New York', 'London', 'Paris')
```

### List as a Stack and Queue

```python
# Using list as a stack (Last-In-First-Out)
stack = []
stack.append("Task 1")  # Push
stack.append("Task 2")
stack.append("Task 3")
last_task = stack.pop()  # Pop - returns "Task 3"

# Using list as a queue (First-In-First-Out)
# Note: using deque from collections is more efficient
from collections import deque
queue = deque(["Task 1", "Task 2"])
queue.append("Task 3")  # Enqueue
first_task = queue.popleft()  # Dequeue - returns "Task 1"
```

## Tuples in Python

Tuples are immutable sequences in Python, meaning once created, their values cannot be changed. They're similar to lists but with different use cases and some performance advantages.

### Creating Tuples

```python
# Creating tuples
coordinates = (10, 20)  # Parentheses define a tuple
person = "John", 30, "Developer"  # Parentheses are optional (tuple packing)
singleton = (42,)  # Note the comma - needed for single item tuples
empty_tuple = ()  # Empty tuple

# Tuple constructor
chars_tuple = tuple("hello")  # ('h', 'e', 'l', 'l', 'o')
list_to_tuple = tuple([1, 2, 3])  # (1, 2, 3)
```

### Accessing Tuple Elements

```python
person = ("John", 30, "Developer", "New York")

# Indexing works like lists
name = person[0]  # "John"
age = person[1]   # 30
city = person[-1]  # "New York"

# Slicing works like lists
name_job = person[0:3:2]  # ("John", "Developer")
first_two = person[:2]   # ("John", 30)

# Tuple unpacking - a powerful Python feature
name, age, job, city = person  # Unpack all values
name, age, *rest = person      # name="John", age=30, rest=["Developer", "New York"]
name, *_, city = person        # name="John", city="New York", _ captures middle values
```

### Tuple Operations and Methods

```python
coordinates = (10, 20, 30, 20)
more_coords = (40, 50)

# Tuple concatenation
all_coords = coordinates + more_coords  # (10, 20, 30, 20, 40, 50)

# Repetition
repeated = coordinates * 2  # (10, 20, 30, 20, 10, 20, 30, 20)

# Methods - tuples have few methods since they're immutable
count_of_20 = coordinates.count(20)  # 2
index_of_30 = coordinates.index(30)  # 2

# Common operations
length = len(coordinates)  # 4
min_value = min(coordinates)  # 10
max_value = max(coordinates)  # 30
sum_values = sum(coordinates)  # 80
```

### Why Use Tuples?

Tuples have several advantages over lists in certain situations:

1. **Immutability**: Tuples can't be changed after creation, making them safer for data that shouldn't change
2. **Performance**: Tuples are slightly faster than lists for iteration and lookup
3. **Dictionary keys**: Tuples can be used as dictionary keys (lists cannot)
4. **Return values**: Functions often return tuples to group multiple return values
5. **Data integrity**: Tuples signal that the data shouldn't be modified

```python
# Tuple as dictionary key
locations = {
    (40.7128, -74.0060): "New York",
    (34.0522, -118.2437): "Los Angeles"
}
print(locations[(40.7128, -74.0060)])  # "New York"

# Function returning multiple values as tuple
def get_user_info():
    return "Alice", 30, "alice@example.com"

name, age, email = get_user_info()  # Tuple unpacking
```

### Named Tuples

For more readable code, Python offers named tuples from the collections module:

```python
from collections import namedtuple

# Define a named tuple type
Person = namedtuple('Person', ['name', 'age', 'job'])

# Create instances
alice = Person(name='Alice', age=30, job='Engineer')
bob = Person('Bob', 25, 'Designer')  # Positional arguments work too

# Access by name or position
print(alice.name)  # "Alice"
print(alice[0])    # "Alice"
print(bob.job)     # "Designer"

# Convert to dictionary
alice_dict = alice._asdict()  # {'name': 'Alice', 'age': 30, 'job': 'Engineer'}

# Create a new instance with one value replaced
alice_promoted = alice._replace(job='Senior Engineer')
```

## List vs. Tuple: When to Use Which?

| Feature | List | Tuple |
|---------|------|-------|
| Mutability | Mutable (can change) | Immutable (can't change) |
| Syntax | `[1, 2, 3]` | `(1, 2, 3)` |
| Use Case | When content needs to change | When content should stay the same |
| Performance | Slightly slower | Slightly faster |
| Methods | Many (append, insert, etc.) | Few (count, index) |
| As Dict Keys | No | Yes |
| Memory Use | More | Less |

## Python vs. JavaScript: Sequence Handling

| Feature | Python | JavaScript |
|---------|--------|------------|
| Basic Collection | List `[1, 2, 3]` | Array `[1, 2, 3]` |
| Immutable Collection | Tuple `(1, 2, 3)` | No direct equivalent |
| Accessing Elements | `list[0]`, `tuple[0]` | `array[0]` |
| Add to End | `list.append(x)` | `array.push(x)` |
| Remove from End | `list.pop()` | `array.pop()` |
| Add to Beginning | `list.insert(0, x)` | `array.unshift(x)` |
| Remove from Beginning | `list.pop(0)` | `array.shift()` |
| Join Elements | `', '.join(list)` | `array.join(', ')` |
| Slicing | `list[1:3]` | `array.slice(1, 3)` |
```

## Common List Patterns

```python
numbers = [10, 5, 8, 1, 7]

# Finding min/max
min_value = min(numbers)  # 1
max_value = max(numbers)  # 10

# Sum of all items
total = sum(numbers)  # 31

# Sorting
sorted_asc = sorted(numbers)  # Returns new sorted list [1, 5, 7, 8, 10]
sorted_desc = sorted(numbers, reverse=True)  # [10, 8, 7, 5, 1]

# Check existence
has_seven = 7 in numbers  # True
no_six = 6 not in numbers  # True

# Combine lists
combined = [1, 2, 3] + [4, 5, 6]  # [1, 2, 3, 4, 5, 6]
repeated = [0] * 3  # [0, 0, 0]

# Unpacking lists
first, second, *rest = [1, 2, 3, 4, 5]
# first=1, second=2, rest=[3, 4, 5]

# Copy a list (by value, not reference)
original = [1, 2, 3]
shallow_copy = original.copy()  # or list(original) or original[:]
```

## List Comprehensions

List comprehensions are a powerful Python feature for creating lists:

```python
# Simple list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]  # [1, 4, 9, 16, 25]

# With condition
even_squares = [x**2 for x in numbers if x % 2 == 0]  # [4, 16]

# Nested comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Multiple operations
transformed = [x*2 if x % 2 == 0 else x*3 for x in numbers]  # [3, 4, 9, 8, 15]
```

## Tuples: Immutable Lists

Tuples are similar to lists but immutable (cannot be changed after creation):

```python
# Creating tuples
point = (10, 20)
rgb = (255, 0, 128)
single_item = (42,)  # Comma is required for single item tuples
empty = ()

# Tuple packing and unpacking
person = ('John', 'Doe', 35)  # Packing
first_name, last_name, age = person  # Unpacking

# Tuple methods (fewer than lists due to immutability)
count = rgb.count(0)  # 1
index = rgb.index(255)  # 0

# Tuples are faster than lists and can be used as dictionary keys
coordinates = {(0, 0): 'origin', (10, 20): 'point A'}

# Named tuples (like lightweight classes)
from collections import namedtuple
Person = namedtuple('Person', ['name', 'age', 'job'])
alice = Person('Alice', 30, 'Engineer')
print(alice.name)  # Alice
print(alice[0])    # Alice (still supports indexing)
```

## Key Differences from JavaScript Arrays

1. **Lists vs Arrays**: Python lists are more flexible than JavaScript arrays with more built-in methods.

2. **List comprehensions**: Python has powerful list comprehensions that JavaScript lacks.

3. **Slicing**: Python lists support powerful slicing operations.

4. **Tuples**: Python has tuples as immutable sequence types, which JavaScript doesn't have.

5. **Method names**: Python uses `append()` vs JavaScript's `push()`, `extend()` vs `concat()`, etc.

## When to Use Lists vs. Tuples

- **Use lists** when you need a collection of items that might change over time (mutable).
- **Use tuples** when you need an immutable collection, like coordinates, RGB values, or record-like objects.

```python
# List for collecting and processing data
user_scores = [85, 92, 78, 90, 88]
user_scores.append(95)  # Mutable - we can add scores

# Tuple for fixed data
rgb_black = (0, 0, 0)  # Immutable - RGB values shouldn't change
weekdays = ('Mon', 'Tue', 'Wed', 'Thu', 'Fri')  # Fixed set of days
```
