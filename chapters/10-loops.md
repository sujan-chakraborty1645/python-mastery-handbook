# Loops

Iterating in Python

## For Loops

Python's `for` loop is more like JavaScript's `for...of` loop, iterating over sequences (lists, strings, tuples, etc.).

```python
# Basic for loop
fruits = ['apple', 'banana', 'orange']
for fruit in fruits:
    print(fruit)

# Looping through strings
for char in "Python":
    print(char)
    
# Looping with index using enumerate
for i, fruit in enumerate(fruits):
    print(f"Index {i}: {fruit}")
    
# Looping over a range
for i in range(5):    # 0, 1, 2, 3, 4
    print(i)
    
# Range with start and stop
for i in range(2, 8):  # 2, 3, 4, 5, 6, 7
    print(i)
    
# Range with step
for i in range(1, 10, 2):  # 1, 3, 5, 7, 9
    print(i)
```

### JavaScript Comparison

```javascript
// JavaScript equivalents
const fruits = ['apple', 'banana', 'orange'];

// Basic loop (for...of)
for (const fruit of fruits) {
    console.log(fruit);
}

// Looping through strings
for (const char of "JavaScript") {
    console.log(char);
}

// Looping with index
fruits.forEach((fruit, i) => {
    console.log(`Index ${i}: ${fruit}`);
});

// Looping over a range
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Range with start and stop
for (let i = 2; i < 8; i++) {
    console.log(i);
}

// Range with step
for (let i = 1; i < 10; i += 2) {
    console.log(i);
}
```

## Looping Through Dictionaries

```python
# Dictionary iteration
user = {'name': 'John', 'age': 30, 'city': 'New York'}

# Loop through keys (default)
for key in user:
    print(key)

# Loop through values
for value in user.values():
    print(value)
    
# Loop through key-value pairs
for key, value in user.items():
    print(f"{key}: {value}")
```

### JavaScript Comparison

```javascript
// JavaScript object iteration
const user = {name: 'John', age: 30, city: 'New York'};

// Loop through keys
for (const key of Object.keys(user)) {
    console.log(key);
}

// Loop through values
for (const value of Object.values(user)) {
    console.log(value);
}

// Loop through key-value pairs
for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
}
```

## While Loops

```python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1
    
# Break statement
number = 0
while True:
    number += 1
    if number == 5:
        break
    print(number)  # Prints 1, 2, 3, 4
    
# Continue statement
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)      # Prints 1, 3, 5, 7, 9
```

### JavaScript Comparison

```javascript
// JavaScript while loop
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// Break statement
let number = 0;
while (true) {
    number++;
    if (number === 5) {
        break;
    }
    console.log(number);  // Prints 1, 2, 3, 4
}

// Continue statement
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(i);  // Prints 1, 3, 5, 7, 9
}
```

## Else Clause in Loops

Python has a unique feature: an `else` clause for loops that executes if the loop completes normally (without a `break`):

```python
# Loop with else clause
for i in range(5):
    print(i)
else:
    print("Loop completed successfully")  # Executes after loop completes
    
# Loop with break and else
for i in range(5):
    print(i)
    if i == 2:
        break
else:
    print("This won't execute")  # Doesn't execute because of break
```

### JavaScript Comparison

```javascript
// JavaScript has no direct equivalent
// A flag can be used to simulate this behavior
let completed = true;
for (let i = 0; i < 5; i++) {
    console.log(i);
    if (i === 2) {
        completed = false;
        break;
    }
}
if (completed) {
    console.log("Loop completed successfully");
}
```

## List Comprehensions vs Loops

List comprehensions often replace simple for loops:

```python
# Traditional loop for creating a list
squares = []
for i in range(10):
    squares.append(i ** 2)
    
# Same result with list comprehension
squares = [i ** 2 for i in range(10)]

# Conditionals in list comprehensions
even_squares = [i ** 2 for i in range(10) if i % 2 == 0]

# Nested loops in list comprehensions
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### JavaScript Comparison

```javascript
// Traditional loop
const squares = [];
for (let i = 0; i < 10; i++) {
    squares.push(i ** 2);
}

// Array methods approach
const squaresMap = Array.from({length: 10}, (_, i) => i ** 2);
const evenSquaresFilter = Array.from({length: 10}, (_, i) => i ** 2).filter(n => n % 2 === 0);

// Flattening arrays
const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const flattened = matrix.flat();  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Zipping Iterables

Python's `zip` function combines multiple iterables:

```python
# Zipping iterables
names = ['Alice', 'Bob', 'Charlie']
ages = [24, 30, 35]

for name, age in zip(names, ages):
    print(f"{name} is {age} years old")
    
# Unzipping with *
pairs = [('Alice', 24), ('Bob', 30), ('Charlie', 35)]
names, ages = zip(*pairs)  # names = ('Alice', 'Bob', 'Charlie'), ages = (24, 30, 35)
```

### JavaScript Comparison

```javascript
// Manual zipping
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [24, 30, 35];

for (let i = 0; i < Math.min(names.length, ages.length); i++) {
    console.log(`${names[i]} is ${ages[i]} years old`);
}

// Using array methods
names.forEach((name, i) => {
    if (i < ages.length) {
        console.log(`${name} is ${ages[i]} years old`);
    }
});

// Creating array of pairs
const zipped = names.map((name, i) => [name, ages[i]]);
```

## Iterators and Generators

Python has powerful iterator and generator capabilities:

```python
# Creating a generator function
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1
        
# Using a generator
for number in count_up_to(5):
    print(number)  # 1, 2, 3, 4, 5
    
# Generator expressions (like list comprehensions but lazy)
gen = (x**2 for x in range(10))  # Creates a generator, not a list
for value in gen:
    print(value)
    
# Custom iterator class
class Countdown:
    def __init__(self, start):
        self.start = start
        
    def __iter__(self):
        return self
        
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1
        
for i in Countdown(5):
    print(i)  # 5, 4, 3, 2, 1
```

### JavaScript Comparison

```javascript
// Generator function
function* countUpTo(max) {
    let count = 1;
    while (count <= max) {
        yield count;
        count++;
    }
}

// Using a generator
for (const number of countUpTo(5)) {
    console.log(number);  // 1, 2, 3, 4, 5
}

// Generator expression equivalent
function* generateSquares(n) {
    for (let i = 0; i < n; i++) {
        yield i ** 2;
    }
}

// Custom iterable
class Countdown {
    constructor(start) {
        this.start = start;
    }
    
    [Symbol.iterator]() {
        let count = this.start;
        return {
            next() {
                if (count <= 0) {
                    return { done: true };
                }
                return { value: count--, done: false };
            }
        };
    }
}
```

## Key Differences from JavaScript

1. **For loop syntax**: Python's for loop iterates over sequences, more like JavaScript's for...of.

2. **Range function**: Python has a built-in range function, while JavaScript requires array creation.

3. **Dictionary iteration**: Python offers direct methods to iterate over keys, values, or items.

4. **Loop else clause**: Python's unique else clause for loops has no JavaScript equivalent.

5. **Comprehensions**: Python's list comprehensions are more powerful and concise than JavaScript array methods.

6. **Enumerate**: Python's enumerate function provides indices, similar to JavaScript's forEach callback.

7. **Zip function**: Python's zip combines iterables elegantly.

## Best Practices

1. **Use for loops with range** when you need the index or a numeric sequence.

2. **Use for-each style loops** (`for item in items`) when you just need the elements.

3. **Use list comprehensions** for simple transformations and filtering.

4. **Use enumerate()** when you need both index and value.

5. **Use zip()** when working with multiple related sequences.

6. **Use generator expressions** for memory efficiency with large sequences.

```python
# Good - clear intentions
for user in active_users:
    send_notification(user)
    
# Better than traditional loop for creating derived lists
squared_numbers = [x**2 for x in numbers if x > 0]

# Good - when you need indices
for i, value in enumerate(values):
    if i > 0 and value < values[i-1]:
        print(f"Value decreased at position {i}")
```
