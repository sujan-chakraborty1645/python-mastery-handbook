# Dictionaries & Sets

Working with key-value pairs and unique collections in Python

## Dictionaries

Python dictionaries are similar to JavaScript objects or Maps. They store key-value pairs and provide fast lookup by key.

### Creating Dictionaries

```python
# Creating dictionaries
user = {
    'name': 'John',
    'age': 30,
    'is_active': True
}

# Alternative construction methods
scores = dict(math=95, science=88, history=75)
pairs = dict([('name', 'Alice'), ('age', 25)])
empty = {}

# Dictionary comprehension
square_map = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Creating dictionaries from sequences
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
user_ages = dict(zip(names, ages))  # {'Alice': 25, 'Bob': 30, 'Charlie': 35}

# Dictionary with default values
from collections import defaultdict
word_count = defaultdict(int)  # Default value is 0
for word in ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']:
    word_count[word] += 1
# {'apple': 3, 'banana': 2, 'orange': 1}
```

### Dictionary Keys

Unlike JavaScript objects, Python dictionary keys can be of any immutable type:

```python
valid_dict = {
    42: 'answer',           # Integer key
    3.14: 'pi',             # Float key
    True: 'boolean',        # Boolean key
    (1, 2): 'tuple',        # Tuple key (immutable)
    'name': 'string key',   # String key
    frozenset([1, 2]): 'frozen set'  # Frozen set key (immutable)
}

# Invalid keys would cause TypeError:
# invalid_dict = {[1, 2]: 'list key'}  # Lists are mutable
# The next line shows that dict objects can't be used as keys (commented to prevent execution)
# invalid_dict = {{1: 'a'}: 'dict key'}  # Dicts are mutable

# Note: For Jekyll rendering, the above line should have double braces
# but it's breaking the build, so imagine {1: 'a'} is a dict
```

### Ordered Dictionaries

Since Python 3.7, dictionaries preserve insertion order, which means items are returned in the same order they were added. This was an implementation detail in Python 3.6 and became an official language feature in 3.7.

```python
# Create a dictionary of color hex codes
colors = {
    'red': '#FF0000',     # First item
    'green': '#00FF00',   # Second item
    'blue': '#0000FF'     # Third item
}

# Iterating preserves insertion order - you'll always get red, then green, then blue
print("Iterating through dictionary preserves order:")
for color, hex_code in colors.items():
    print(f"{color}: {hex_code}")
# Prints:
# red: #FF0000
# green: #00FF00
# blue: #0000FF

# Keys, values, and items all maintain the same order
print("\nDifferent ways to iterate with the same order:")
print("Keys:", list(colors.keys()))     # ['red', 'green', 'blue']
print("Values:", list(colors.values())) # ['#FF0000', '#00FF00', '#0000FF']

# Adding new items - they appear at the end
print("\nAdding a new item:")
colors['yellow'] = '#FFFF00'
print(list(colors.keys()))  # ['red', 'green', 'blue', 'yellow']

# Updating an existing item doesn't change its position
print("\nUpdating an existing item:")
colors['green'] = '#00FF00'  # Same value, just demonstrating
print(list(colors.keys()))  # ['red', 'green', 'blue', 'yellow']

# For Python 3.6 and earlier, use OrderedDict when order matters
from collections import OrderedDict
print("\nUsing OrderedDict (for Python 3.6 and earlier):")
ordered = OrderedDict([('red', '#FF0000'), ('green', '#00FF00')])
ordered['blue'] = '#0000FF'  # Add new key-value pair
print(list(ordered.keys()))  # ['red', 'green', 'blue']

# Key difference with OrderedDict: moving an item to the end
print("\nMoving an existing key in OrderedDict:")
ordered.move_to_end('red')
print(list(ordered.keys()))  # ['green', 'blue', 'red']
```

This ordered nature makes dictionaries more predictable and useful for many applications where the order of items matters, such as configurations, step-by-step processing, etc.

### JavaScript Comparison

```javascript
// JavaScript object
const user = {
    name: 'John',
    age: 30,
    isActive: true
};

// JavaScript Map
const scores = new Map([
    ['math', 95],
    ['science', 88],
    ['history', 75]
]);

// Object.fromEntries (ES2019+)
const pairs = Object.fromEntries([['name', 'Alice'], ['age', 25]]);

// Similar to dict comprehension
const squareMap = Object.fromEntries(
    Array.from({length: 5}, (_, i) => [i, i**2])
);
```

## Dictionary Operations

```python
user = {
    'name': 'John',
    'age': 30,
    'email': 'john@example.com'
}

# Accessing values
print(user['name'])        # John
print(user.get('age'))     # 30
print(user.get('phone', 'Not found'))  # Not found (default if key doesn't exist)

# Modifying dictionaries
user['age'] = 31           # Update value
user['phone'] = '555-1234' # Add new key-value pair
user.update({'age': 32, 'city': 'New York'})  # Update multiple values

# Removing items
removed_email = user.pop('email')  # Remove and return value
del user['age']            # Remove key-value pair
last_item = user.popitem() # Remove and return last inserted item as tuple
user.clear()               # Remove all items

# Dictionary information
keys = list(user.keys())   # List of keys
values = list(user.values())  # List of values
items = list(user.items()) # List of (key, value) tuples
size = len(user)           # Number of key-value pairs
```

## Common Dictionary Patterns

```python
inventory = {
    'apple': 10,
    'banana': 5,
    'orange': 7
}

# Check for key existence
has_apple = 'apple' in inventory  # True
no_mango = 'mango' not in inventory  # True

# Set default values
inventory.setdefault('mango', 0)  # Add key with default if doesn't exist

# Merge dictionaries (Python 3.5+)
prices = {'apple': 0.5, 'banana': 0.3, 'mango': 0.8}
combined = {**inventory, **prices}  # Merge with ** unpacking

# Merge dictionaries (Python 3.9+)
combined = inventory | prices  # Using the | operator

# Dictionary view objects (dynamic views of dict contents)
keys_view = inventory.keys()  # Updates if inventory changes
values_view = inventory.values()

# Convert to dict and modify
prices_in_euros = {fruit: price * 0.85 for fruit, price in prices.items()}

# Grouped data
students = [
    {'name': 'Alice', 'grade': 'A'},
    {'name': 'Bob', 'grade': 'B'},
    {'name': 'Charlie', 'grade': 'A'}
]

# Group by grade
from collections import defaultdict
by_grade = defaultdict(list)
for student in students:
    by_grade[student['grade']].append(student['name'])
# {'A': ['Alice', 'Charlie'], 'B': ['Bob']}
```

## Counter and defaultdict

Python's `collections` module provides specialized dictionary types:

```python
from collections import defaultdict, Counter

# defaultdict - provides default values for missing keys
fruit_count = defaultdict(int)  # Default value is 0
for fruit in ['apple', 'banana', 'apple', 'orange', 'apple']:
    fruit_count[fruit] += 1  # No KeyError for new keys
print(fruit_count)  # defaultdict(<class 'int'>, {'apple': 3, 'banana': 1, 'orange': 1})

# Default factory can be any callable
grouped = defaultdict(list)
grouped['A'].append('Alice')  # Creates empty list automatically

# Counter - specialized for counting hashable objects
word_count = Counter(['apple', 'banana', 'apple', 'orange', 'apple'])
print(word_count)  # Counter({'apple': 3, 'banana': 1, 'orange': 1})

# Counter methods
print(word_count.most_common(2))  # [('apple', 3), ('banana', 1)]
print(word_count['apple'])        # 3
```

## Sets

Sets are unordered collections of unique items, similar to JavaScript's Set:

```python
# Creating sets
fruits = {'apple', 'banana', 'orange'}
numbers = set([1, 2, 3, 2, 1])  # {1, 2, 3} (duplicates removed)
empty_set = set()  # Note: {} creates an empty dict, not a set

# Set comprehensions
evens = {x for x in range(10) if x % 2 == 0}  # {0, 2, 4, 6, 8}

# Set operations
fruits.add('mango')        # Add item
fruits.remove('banana')    # Remove item (raises KeyError if not found)
fruits.discard('pear')     # Remove if present (no error if not found)
popped = fruits.pop()      # Remove and return an arbitrary element
fruits.clear()             # Remove all items
```

### Set Operations (Mathematical)

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# Set operations
union = a | b              # Union: {1, 2, 3, 4, 5, 6}
intersection = a & b       # Intersection: {3, 4}
difference = a - b         # Difference: {1, 2}
symmetric_diff = a ^ b     # Symmetric difference: {1, 2, 5, 6}

# Set methods
union = a.union(b)
intersection = a.intersection(b)
difference = a.difference(b)
symmetric_diff = a.symmetric_difference(b)

# Set comparisons
is_subset = a <= b         # Is a a subset of b? False
is_superset = a >= b       # Is a a superset of b? False
is_disjoint = a.isdisjoint({7, 8, 9})  # No elements in common? True
```

### JavaScript Comparison

```javascript
// JavaScript Set
const fruits = new Set(['apple', 'banana', 'orange']);
const numbers = new Set([1, 2, 3, 2, 1]);  // Duplicates removed

// Set operations
fruits.add('mango');       // Add item
fruits.delete('banana');   // Remove item
fruits.has('apple');       // Check existence
fruits.clear();            // Remove all items

// Set operations using array methods
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...a, ...b]);

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)));

// Difference
const difference = new Set([...a].filter(x => !b.has(x)));
```

## Key Differences from JavaScript

1. **Dictionary vs Object**: Python dictionaries are more like JavaScript Maps than objects, with more built-in methods.

2. **Keys**: Python dictionary keys can be any immutable type, while JavaScript object keys are always strings or symbols.

3. **defaultdict and Counter**: Python has specialized dictionary types that JavaScript lacks.

4. **Set operations**: Python sets support mathematical set operations with dedicated operators.

5. **Comprehensions**: Python has dictionary and set comprehensions for concise initialization.

## When to Use Each Type

- **Use dictionaries** when you need to associate values with keys for fast lookup.
- **Use sets** when you need a collection of unique items with fast membership testing.
- **Use defaultdict** when you need dictionaries with default values for new keys.
- **Use Counter** when you need to count occurrences of items.

```python
# Dictionary for key-value data
user_info = {'name': 'Alice', 'age': 30, 'email': 'alice@example.com'}

# Set for unique collection
unique_visitors = {'192.168.1.1', '10.0.0.2', '172.16.0.1'}

# defaultdict for grouping
groups = defaultdict(list)
for name, group in [('Alice', 'A'), ('Bob', 'B'), ('Charlie', 'A')]:
    groups[group].append(name)

# Counter for frequency analysis
word_count = Counter(['apple', 'banana', 'apple', 'orange', 'apple'])
```
