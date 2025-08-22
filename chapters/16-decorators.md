# Decorators

Understanding and using Python decorators

## Introduction to Decorators

Decorators are a powerful feature in Python that modify the behavior of functions or classes:

```python
# Basic decorator
def simple_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

# Using the decorator
@simple_decorator
def say_hello():
    print("Hello!")

# Call the decorated function
say_hello()
# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.
```

### What's Happening Behind the Scenes

The `@decorator` syntax is equivalent to:

```python
def say_hello():
    print("Hello!")

# This is what happens behind the scenes
say_hello = simple_decorator(say_hello)
```

### JavaScript Comparison

```javascript
// JavaScript doesn't have built-in decorators yet (proposal stage)
// But they can be simulated with higher-order functions

function simpleDecorator(func) {
    return function() {
        console.log("Something is happening before the function is called.");
        func();
        console.log("Something is happening after the function is called.");
    };
}

function sayHello() {
    console.log("Hello!");
}

// Apply decorator manually
const decoratedSayHello = simpleDecorator(sayHello);
decoratedSayHello();
```

## Decorators with Arguments

Decorators can accept arguments from the functions they wrap:

```python
# Decorator for functions with arguments
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_function_call
def add(a, b):
    return a + b

@log_function_call
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Using the decorated functions
result = add(3, 5)     # Logs call and result
message = greet("Alice", greeting="Hi")  # Logs call and result
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
function logFunctionCall(func) {
    return function(...args) {
        const kwargs = {}; // JavaScript doesn't have direct kwargs equivalent
        console.log(`Calling ${func.name} with args: ${args}`);
        const result = func(...args);
        console.log(`${func.name} returned: ${result}`);
        return result;
    };
}

const add = logFunctionCall(function add(a, b) {
    return a + b;
});

const greet = logFunctionCall(function greet(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
});
```

## Decorators with Parameters

We can create decorators that accept their own parameters:

```python
# Decorator with parameters
def repeat(n=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

# Using the parameterized decorator
@repeat(3)
def say_message(message):
    print(message)
    return message

# Call the decorated function
say_message("Hello!")  # Prints "Hello!" three times
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
function repeat(n = 1) {
    return function(func) {
        return function(...args) {
            let result;
            for (let i = 0; i < n; i++) {
                result = func(...args);
            }
            return result;
        };
    };
}

// Manual application (since JS decorators aren't standard yet)
function sayMessage(message) {
    console.log(message);
    return message;
}

const repeatThree = repeat(3);
const decoratedSayMessage = repeatThree(sayMessage);
decoratedSayMessage("Hello!");  // Prints "Hello!" three times
```

## Preserving Function Metadata

When using decorators, function metadata like name and docstrings are lost. The `functools.wraps` decorator fixes this:

```python
import functools

def log_function_call(func):
    @functools.wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@log_function_call
def calculate_area(radius):
    """Calculate the area of a circle."""
    import math
    return math.pi * radius ** 2

# Function metadata is preserved
print(calculate_area.__name__)  # "calculate_area" (not "wrapper")
print(calculate_area.__doc__)   # "Calculate the area of a circle."
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
function logFunctionCall(func) {
    function wrapper(...args) {
        console.log(`Calling ${func.name}`);
        const result = func(...args);
        console.log(`${func.name} returned: ${result}`);
        return result;
    }
    
    // Preserve metadata
    Object.defineProperty(wrapper, 'name', { value: func.name });
    wrapper.toString = () => func.toString();
    return wrapper;
}

function calculateArea(radius) {
    /**
     * Calculate the area of a circle.
     */
    return Math.PI * radius ** 2;
}

const decoratedCalculateArea = logFunctionCall(calculateArea);
console.log(decoratedCalculateArea.name);  // "calculateArea"
```

## Class Decorators

Decorators can also be applied to classes:

```python
# Class decorator
def add_greeting(cls):
    cls.greet = lambda self: f"Hello, I'm {self.name}!"
    return cls

# Using the class decorator
@add_greeting
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Using the decorated class
person = Person("Alice", 30)
print(person.greet())  # "Hello, I'm Alice!"
```

### JavaScript Comparison

```javascript
// JavaScript equivalent
function addGreeting(Class) {
    Class.prototype.greet = function() {
        return `Hello, I'm ${this.name}!`;
    };
    return Class;
}

// Manual application
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

// Apply decorator
const DecoratedPerson = addGreeting(Person);
const person = new DecoratedPerson("Alice", 30);
console.log(person.greet());  // "Hello, I'm Alice!"
```

## Method Decorators

Decorators are commonly used with class methods:

```python
# Method decorators
class MathOperations:
    def __init__(self, value):
        self.value = value
    
    @log_function_call  # Using our decorator from earlier
    def square(self):
        return self.value ** 2
    
    @staticmethod
    @log_function_call
    def add(a, b):
        return a + b
    
    @classmethod
    @log_function_call
    def from_string(cls, value_str):
        try:
            value = float(value_str)
            return cls(value)
        except ValueError:
            return None

# Using the decorated methods
math = MathOperations(5)
math.square()  # Logs the call and result
MathOperations.add(3, 4)  # Logs the call and result
MathOperations.from_string("10.5")  # Logs the call and result
```

## Property Decorators

Python's `@property` decorator creates getters and setters:

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Get the current temperature in Celsius."""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get the current temperature in Fahrenheit."""
        return (self.celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Using the property decorators
temp = Temperature()
temp.celsius = 25
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0
temp.fahrenheit = 68
print(temp.celsius)     # 20.0
```

### JavaScript Comparison

```javascript
// JavaScript getters and setters
class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius;
    }
    
    get celsius() {
        return this._celsius;
    }
    
    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Temperature below absolute zero!");
        }
        this._celsius = value;
    }
    
    get fahrenheit() {
        return (this.celsius * 9/5) + 32;
    }
    
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }
}

// Using getters and setters
const temp = new Temperature();
temp.celsius = 25;
console.log(temp.celsius);     // 25
console.log(temp.fahrenheit);  // 77.0
temp.fahrenheit = 68;
console.log(temp.celsius);     // 20.0
```

## Common Built-in Decorators

Python provides several built-in decorators:

```python
class Example:
    def __init__(self, value):
        self._value = value
    
    # Getter property
    @property
    def value(self):
        return self._value
    
    # Static method (no access to instance)
    @staticmethod
    def static_function():
        return "I am static"
    
    # Class method (access to class, not instance)
    @classmethod
    def class_function(cls):
        return f"I belong to {cls.__name__}"
    
    # Abstract method (requires implementation in subclass)
    # from abc import abstractmethod
    # @abstractmethod
    # def must_implement(self):
    #     pass
```

## Practical Decorator Examples

Here are some practical examples of decorators:

### 1. Timing Decorator

```python
import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds to run")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()  # "slow_function took 1.0012 seconds to run"
```

### 2. Caching Decorator (Memoization)

```python
import functools

def memoize(func):
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Convert kwargs to frozenset for hashability
        key = (args, frozenset(kwargs.items()))
        
        if key not in cache:
            cache[key] = func(*args, **kwargs)
        
        return cache[key]
    
    return wrapper

@memoize
def fibonacci(n):
    print(f"Computing fibonacci({n})")
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # Prints "Computing fibonacci(x)" only for new values
```

### 3. Validation Decorator

```python
import functools

def validate_types(*types):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # Skip self/cls argument for methods
            start_idx = 1 if len(args) > 0 and hasattr(args[0], func.__name__) else 0
            
            # Check types of positional arguments
            for i, (arg, expected_type) in enumerate(zip(args[start_idx:], types)):
                if not isinstance(arg, expected_type):
                    raise TypeError(f"Argument {i} should be {expected_type.__name__}, got {type(arg).__name__}")
            
            return func(*args, **kwargs)
        return wrapper
    return decorator

class MathUtil:
    @validate_types(int, int)
    def add(self, a, b):
        return a + b

math = MathUtil()
print(math.add(5, 10))  # 15
# print(math.add("5", 10))  # TypeError: Argument 0 should be int, got str
```

### 4. Retry Decorator

```python
import functools
import time
import random

def retry(attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            
            for attempt in range(1, attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    print(f"Attempt {attempt}/{attempts} failed: {e}")
                    last_exception = e
                    if attempt < attempts:
                        time.sleep(delay)
            
            raise last_exception
        return wrapper
    return decorator

@retry(attempts=3, delay=0.5)
def unstable_function():
    if random.random() < 0.7:  # 70% chance to fail
        raise ConnectionError("Network error")
    return "Success!"

try:
    result = unstable_function()
    print(result)
except ConnectionError:
    print("Function ultimately failed after retries")
```

## Creating Advanced Decorators

Let's create some more advanced decorators:

### Class Decorator with Parameters

```python
def add_methods(**methods):
    def decorator(cls):
        for name, method in methods.items():
            setattr(cls, name, method)
        return cls
    return decorator

# Helper methods for our decorator
def bark(self):
    return f"{self.name} says Woof!"

def fetch(self, item):
    return f"{self.name} fetched the {item}"

@add_methods(bark=bark, fetch=fetch)
class Dog:
    def __init__(self, name):
        self.name = name

dog = Dog("Rex")
print(dog.bark())       # Rex says Woof!
print(dog.fetch("ball"))  # Rex fetched the ball
```

### Decorator with State

```python
def counter(func):
    # State stored in the decorator
    func.calls = 0
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        func.calls += 1
        return func(*args, **kwargs)
    
    # Add a method to the function to get call count
    wrapper.get_calls = lambda: func.calls
    
    return wrapper

@counter
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!
print(greet("Bob"))    # Hello, Bob!
print(f"Function was called {greet.get_calls()} times")  # Function was called 2 times
```

## Key Differences from JavaScript

1. **Native Support**: Python has built-in decorator syntax; JavaScript is still in the proposal stage.

2. **Function Decorators**: Python decorators are typically functions that return wrapped functions.

3. **Method Decorators**: Python has special decorators like `@property`, `@staticmethod`, and `@classmethod`.

4. **Metadata**: Python's `functools.wraps` preserves function metadata.

5. **Class Decorators**: Python supports both function and class decorators.

## Best Practices

1. **Use `functools.wraps`**: Preserve the original function's metadata.

2. **Keep Decorators Simple**: Decorators should focus on a single responsibility.

3. **Handle Exceptions**: Make sure decorators handle exceptions properly.

4. **Document Decorators**: Clearly document what your decorators do.

5. **Consider Side Effects**: Be careful with stateful decorators.

```python
# Good - well-documented decorator with proper wrapping
def logged(func):
    """
    A decorator that logs function calls with their arguments and results.
    
    Args:
        func: The function to be decorated
        
    Returns:
        A wrapped function that logs calls and results
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        arg_str = ', '.join([repr(arg) for arg in args] + 
                           [f"{k}={v!r}" for k, v in kwargs.items()])
        print(f"Calling {func.__name__}({arg_str})")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result!r}")
        return result
    return wrapper
```
