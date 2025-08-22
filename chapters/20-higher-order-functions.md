# Higher-Order Functions and Functional Programming

Mastering advanced function concepts in Python - A comprehensive guide for JavaScript developers

## Introduction to Higher-Order Functions

Higher-order functions are functions that either:
1. Take one or more functions as arguments, or
2. Return a function as their result

JavaScript developers are likely familiar with higher-order functions like `map`, `filter`, and `reduce`. Python supports similar functional programming paradigms, though with some syntactic differences.

## Functions as First-Class Citizens

In Python, functions are first-class citizens, meaning they can be:
- Assigned to variables
- Passed as arguments to other functions
- Returned from other functions
- Stored in data structures like lists or dictionaries

```python
# Assigning a function to a variable
def greet(name):
    return f"Hello, {name}!"

say_hello = greet
print(say_hello("Alice"))  # Hello, Alice!

# Storing functions in a data structure
function_list = [len, str.upper, str.lower]
for func in function_list:
    print(func("Mixed Case"))  # 10, MIXED CASE, mixed case
```

## Taking Functions as Arguments

### The `map()` Function

The `map()` function applies a given function to each item of an iterable and returns an iterator of results:

```python
# Using map() to apply a function to each item in a list
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x**2, numbers)
print(list(squared))  # [1, 4, 9, 16, 25]

# Using map with a named function
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

temperatures_c = [0, 10, 20, 30, 40]
temperatures_f = map(celsius_to_fahrenheit, temperatures_c)
print(list(temperatures_f))  # [32.0, 50.0, 68.0, 86.0, 104.0]
```

### The `filter()` Function

The `filter()` function constructs an iterator from elements of an iterable for which a function returns true:

```python
# Using filter() to get even numbers
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = filter(lambda x: x % 2 == 0, numbers)
print(list(even_numbers))  # [2, 4, 6, 8, 10]

# Using filter with a named function
def is_positive(num):
    return num > 0

values = [-2, -1, 0, 1, 2]
positive_values = filter(is_positive, values)
print(list(positive_values))  # [1, 2]
```

### The `reduce()` Function

The `reduce()` function applies a function of two arguments cumulatively to the items of a sequence:

```python
from functools import reduce

# Using reduce() to sum a list of numbers
numbers = [1, 2, 3, 4, 5]
sum_result = reduce(lambda x, y: x + y, numbers)
print(sum_result)  # 15

# Using reduce to find the maximum value
max_value = reduce(lambda x, y: x if x > y else y, numbers)
print(max_value)  # 5

# Using reduce with a named function
def multiply(x, y):
    return x * y

product = reduce(multiply, numbers)
print(product)  # 120 (factorial of 5)
```

## Real-Life Example: Data Processing Pipeline

```python
# Processing a list of customer data
customers = [
    {"name": "Alice", "age": 24, "purchases": 2500},
    {"name": "Bob", "age": 32, "purchases": 1800},
    {"name": "Charlie", "age": 45, "purchases": 5000},
    {"name": "Diana", "age": 28, "purchases": 3200},
    {"name": "Edward", "age": 22, "purchases": 800}
]

# Step 1: Filter adult customers with significant purchases
def is_valuable_customer(customer):
    return customer["age"] >= 18 and customer["purchases"] >= 2000

valuable_customers = filter(is_valuable_customer, customers)

# Step 2: Transform data to get just names and purchase amounts
def extract_name_and_purchases(customer):
    return {
        "name": customer["name"],
        "purchases": customer["purchases"]
    }

customer_purchases = map(extract_name_and_purchases, valuable_customers)

# Step 3: Calculate total purchases using reduce
def add_purchases(total, customer):
    return total + customer["purchases"]

total_valuable_purchases = reduce(add_purchases, customer_purchases, 0)

# Convert results to list for display
valuable_customer_list = list(filter(is_valuable_customer, customers))
print("Valuable customers:", valuable_customer_list)
print("Total purchases from valuable customers:", total_valuable_purchases)
```

## Returning Functions

Functions that return other functions are a key part of functional programming:

### Function Factories

```python
def power_function(exponent):
    """Returns a function that raises its argument to the given exponent"""
    def power(base):
        return base ** exponent
    
    return power

# Create specific power functions
square = power_function(2)
cube = power_function(3)
sqrt = power_function(0.5)

print(square(4))  # 16
print(cube(3))    # 27
print(sqrt(16))   # 4.0
```

### Currying

Currying is the technique of transforming a function with multiple arguments into a sequence of functions each with a single argument:

```python
def curry_add(x):
    """Returns a function that adds x to its argument"""
    def add_x(y):
        return x + y
    
    return add_x

add_5 = curry_add(5)
add_10 = curry_add(10)

print(add_5(3))   # 8
print(add_10(3))  # 13

# More complex currying example
def curry_multiply_add(x):
    def multiply_by_x(y):
        def add_z(z):
            return x * y + z
        return add_z
    return multiply_by_x

multiply_by_2_add = curry_multiply_add(2)
multiply_by_2_add_3 = multiply_by_2_add(3)
result = multiply_by_2_add_3(4)  # 2 * 3 + 4 = 10
print(result)

# Can also be called with all arguments at once
print(curry_multiply_add(2)(3)(4))  # 10
```

## Advanced Function Concepts

### Function Composition

Function composition involves applying one function to the result of another:

```python
def compose(f, g):
    """Compose two functions: f(g(x))"""
    return lambda x: f(g(x))

# Example functions
def double(x):
    return x * 2

def increment(x):
    return x + 1

# Compose the functions
double_then_increment = compose(increment, double)
increment_then_double = compose(double, increment)

print(double_then_increment(3))  # 3 * 2 + 1 = 7
print(increment_then_double(3))  # (3 + 1) * 2 = 8

# Multiple composition
def compose_multiple(*funcs):
    """Compose multiple functions from right to left"""
    def composed_function(x):
        result = x
        for func in reversed(funcs):
            result = func(result)
        return result
    
    return composed_function

# Example of multiple composition
def square(x):
    return x * x

triple_steps = compose_multiple(square, double, increment)
print(triple_steps(3))  # square(double(increment(3))) = square(double(4)) = square(8) = 64
```

### Partial Application

Partial application involves fixing a number of arguments to a function, producing another function of smaller arity:

```python
from functools import partial

def multiply(x, y):
    return x * y

# Create a new function with x fixed to 2
double = partial(multiply, 2)
print(double(4))  # 8

# More complex example
def format_string(template, name, age):
    return template.format(name=name, age=age)

# Fix the template argument
format_person = partial(format_string, "Name: {name}, Age: {age}")

# Use the partially applied function
print(format_person("Alice", 30))  # Name: Alice, Age: 30
print(format_person("Bob", 25))    # Name: Bob, Age: 25
```

## Decorators: Functions That Modify Functions

Decorators are a powerful application of higher-order functions in Python:

```python
# Basic decorator
def timing_decorator(func):
    """A decorator that prints the execution time of the decorated function"""
    import time
    
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} executed in {end_time - start_time:.6f} seconds")
        return result
    
    return wrapper

# Apply the decorator using the @ syntax
@timing_decorator
def slow_function(delay):
    """A function that simulates a slow operation"""
    import time
    time.sleep(delay)
    return "Function complete"

# Call the decorated function
slow_function(1)  # slow_function executed in 1.000123 seconds
```

### Decorators with Arguments

```python
def repeat(num_times):
    """A decorator factory that produces a decorator which runs a function num_times times"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(num_times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))  # ['Hello, World!', 'Hello, World!', 'Hello, World!']
```

## Advanced Real-Life Examples

### Implementing a Memoization Decorator

```python
def memoize(func):
    """Cache the results of function calls to avoid recalculation"""
    cache = {}
    
    def memoized(*args):
        if args in cache:
            return cache[args]
        result = func(*args)
        cache[args] = result
        return result
    
    return memoized

# Apply to a recursive function like Fibonacci
@memoize
def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Without memoization, this would be extremely slow
print(fibonacci(35))  # 9227465 (calculated efficiently)
```

### Event System with Higher-Order Functions

```python
class EventSystem:
    """Simple event system using higher-order functions"""
    
    def __init__(self):
        self.subscribers = {}
    
    def subscribe(self, event_name, callback):
        """Add a callback function to an event"""
        if event_name not in self.subscribers:
            self.subscribers[event_name] = []
        self.subscribers[event_name].append(callback)
    
    def unsubscribe(self, event_name, callback):
        """Remove a callback function from an event"""
        if event_name in self.subscribers:
            self.subscribers[event_name].remove(callback)
    
    def emit(self, event_name, *args, **kwargs):
        """Trigger an event, calling all registered callbacks"""
        if event_name in self.subscribers:
            for callback in self.subscribers[event_name]:
                callback(*args, **kwargs)

# Example usage
events = EventSystem()

def user_registered(username):
    print(f"Welcome email sent to {username}")

def log_registration(username):
    print(f"Registration logged for {username}")

# Subscribe callbacks to events
events.subscribe("user:registered", user_registered)
events.subscribe("user:registered", log_registration)

# Trigger the event
events.emit("user:registered", "alice@example.com")
```

### Validation System with Function Composition

```python
def validate_length(min_length, max_length):
    """Validates that a string is within length bounds"""
    def validator(value):
        if not min_length <= len(value) <= max_length:
            return False, f"Must be between {min_length} and {max_length} characters"
        return True, ""
    return validator

def validate_contains(required_chars):
    """Validates that a string contains required characters"""
    def validator(value):
        missing = [char for char in required_chars if char not in value]
        if missing:
            return False, f"Missing required characters: {', '.join(missing)}"
        return True, ""
    return validator

def validate_pattern(pattern, message):
    """Validates that a string matches a regex pattern"""
    import re
    def validator(value):
        if not re.match(pattern, value):
            return False, message
        return True, ""
    return validator

def combine_validators(*validators):
    """Combines multiple validators into one"""
    def combined_validator(value):
        for validator in validators:
            is_valid, error = validator(value)
            if not is_valid:
                return False, error
        return True, ""
    return combined_validator

# Example: Password validation
password_validator = combine_validators(
    validate_length(8, 20),
    validate_contains(['@', '#', '$', '%', '&', '*']),
    validate_pattern(r'.*[0-9].*', "Must contain at least one number")
)

# Test the validator
def validate_password(password):
    is_valid, error = password_validator(password)
    if is_valid:
        print("Password is valid")
    else:
        print(f"Invalid password: {error}")

validate_password("short")  # Invalid: too short
validate_password("longenough")  # Invalid: missing special chars
validate_password("longenough@")  # Invalid: missing number
validate_password("longenough@123")  # Valid
```

## Functional Programming in Python vs. JavaScript

| Concept | Python | JavaScript |
|---------|--------|------------|
| Higher-Order Functions | `map()`, `filter()`, `reduce()` (from functools) | `Array.map()`, `Array.filter()`, `Array.reduce()` |
| Anonymous Functions | `lambda x: x * 2` | `(x) => x * 2` |
| Function Assignment | `func = other_func` | `const func = otherFunc` |
| Partial Application | `from functools import partial` | Manually or libraries like Lodash |
| Currying | Manual implementation | Manual or libraries like Ramda |
| Decorators | `@decorator` syntax | Not built-in, can be simulated |
| Method Chaining | Less common | Common with array methods: `arr.map().filter()` |

## Best Practices for Functional Programming in Python

1. **Keep Functions Pure**: Avoid side effects when possible
2. **Use Immutable Data**: Prefer tuples and avoid modifying data in-place
3. **Compose Small Functions**: Build complex logic from simple functions
4. **Be Mindful of Performance**: Functional chains can create many intermediate objects
5. **Document Higher-Order Functions**: Make their purpose clear
6. **Consider Generator Expressions**: For memory-efficient functional operations
7. **Avoid Overusing `lambda`**: Named functions are often more readable
8. **Test Thoroughly**: Functional code can sometimes be harder to debug

## Summary

Higher-order functions are a powerful tool in Python, enabling functional programming patterns like those familiar to JavaScript developers. By mastering techniques like function composition, partial application, and decorators, you can write more concise, modular, and reusable Python code.
