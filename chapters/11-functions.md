# Functions

Defining and using functions in Python

## Function Basics

Python functions are defined using the `def` keyword:

```python
# Basic function definition
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

# Calling a function
message = greet("Alice")
print(message)  # Hello, Alice!

# Function with multiple parameters
def calculate_total(price, tax_rate, discount=0):
    """Calculate total price after tax and discount."""
    subtotal = price * (1 - discount)
    total = subtotal * (1 + tax_rate)
    return total

# Calling with all parameters
total = calculate_total(100, 0.07, 0.1)  # $96.30
```

### JavaScript Comparison

```javascript
// JavaScript function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const calculateTotal = function(price, taxRate, discount = 0) {
    const subtotal = price * (1 - discount);
    const total = subtotal * (1 + taxRate);
    return total;
};

// Arrow function
const greetArrow = (name) => `Hello, ${name}!`;
```

## Function Parameters

Python offers flexible parameter handling:

```python
# Default parameters
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))          # Hello, Alice!
print(greet("Bob", "Hi"))      # Hi, Bob!

# Named arguments (kwargs)
def create_profile(name, age, city="Unknown"):
    return {
        "name": name,
        "age": age,
        "city": city
    }
    
# You can call with named parameters in any order
profile = create_profile(age=30, name="Alice", city="New York")
print(profile)  # {'name': 'Alice', 'age': 30, 'city': 'New York'}

# Mixing positional and named arguments
# Positional arguments must come before named arguments
profile = create_profile("Bob", city="Boston", age=25)
```

### JavaScript Comparison

```javascript
// Default parameters
function greet(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// Named parameters simulation using object destructuring
function createProfile({ name, age, city = "Unknown" } = {}) {
    return {
        name,
        age,
        city
    };
}

// Call with named parameters (order doesn't matter)
const profile = createProfile({
    age: 30,
    name: "Alice",
    city: "New York"
});
```

## Variable Arguments

Python can accept variable numbers of arguments:

```python
# Variable positional arguments (*args)
def sum_all(*numbers):
    """Sum any number of arguments."""
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2))          # 3
print(sum_all(1, 2, 3, 4, 5)) # 15

# Variable keyword arguments (**kwargs)
def print_info(**kwargs):
    """Print all keyword arguments."""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, job="Developer")

# Combining different parameter types
def process_data(required, *args, default="Default", **kwargs):
    print(f"Required: {required}")
    print(f"Args: {args}")
    print(f"Default: {default}")
    print(f"Kwargs: {kwargs}")
    
process_data("must", 1, 2, 3, default="Custom", x=10, y=20)
# Required: must
# Args: (1, 2, 3)
# Default: Custom
# Kwargs: {'x': 10, 'y': 20}
```

### JavaScript Comparison

```javascript
// Rest parameters (similar to *args)
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2));           // 3
console.log(sumAll(1, 2, 3, 4, 5));  // 15

// Object parameter for kwargs pattern
function printInfo(info) {
    for (const [key, value] of Object.entries(info)) {
        console.log(`${key}: ${value}`);
    }
}

// Combining parameter types
function processData(required, ...args) {
    const options = args.pop() || {};
    const { default: defaultValue = "Default", ...kwargs } = options;
    
    console.log(`Required: ${required}`);
    console.log(`Args: ${args}`);
    console.log(`Default: ${defaultValue}`);
    console.log(`Kwargs:`, kwargs);
}
```

## Return Values

Python functions can return multiple values (technically as a tuple):

```python
# Single return value
def square(x):
    return x * x

# Multiple return values
def get_min_max(numbers):
    return min(numbers), max(numbers)
    
# Unpacking multiple return values
minimum, maximum = get_min_max([5, 3, 8, 1])
print(minimum)  # 1
print(maximum)  # 8

# Early return
def absolute_value(number):
    if number >= 0:
        return number
    return -number
```

### JavaScript Comparison

```javascript
// JavaScript can return arrays or objects for multiple values
function getMinMax(numbers) {
    return [Math.min(...numbers), Math.max(...numbers)];
}

// Destructuring assignment to unpack
const [minimum, maximum] = getMinMax([5, 3, 8, 1]);

// Or using objects
function getStats(numbers) {
    return {
        min: Math.min(...numbers),
        max: Math.max(...numbers)
    };
}

const { min, max } = getStats([5, 3, 8, 1]);
```

## First-Class Functions

Python functions are first-class citizens, just like in JavaScript:

```python
# Functions as variables
def greet(name):
    return f"Hello, {name}!"
    
greeting_func = greet
print(greeting_func("Alice"))  # Hello, Alice!

# Functions as arguments
def apply_twice(func, value):
    return func(func(value))
    
def double(x):
    return x * 2
    
print(apply_twice(double, 3))  # 12 (double applied twice: 3 → 6 → 12)

# Functions returning functions (closure)
def make_multiplier(factor):
    def multiplier(x):
        return x * factor
    return multiplier
    
double = make_multiplier(2)
triple = make_multiplier(3)
print(double(5))  # 10
print(triple(5))  # 15
```

### JavaScript Comparison

```javascript
// JavaScript has similar first-class function support
function applyTwice(func, value) {
    return func(func(value));
}

const double = x => x * 2;
console.log(applyTwice(double, 3));  // 12

// Closures
function makeMultiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const triple = makeMultiplier(3);
console.log(triple(5));  // 15
```

## Lambda Functions

Python has anonymous functions called lambda functions:

```python
# Lambda function (anonymous function)
square = lambda x: x * x
print(square(5))  # 25

# Lambda with multiple parameters
add = lambda x, y: x + y
print(add(3, 4))  # 7

# Lambda in higher-order functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Filtering with lambda
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]
```

### JavaScript Comparison

```javascript
// JavaScript arrow functions are similar to Python lambdas
const square = x => x * x;
console.log(square(5));  // 25

// With multiple parameters
const add = (x, y) => x + y;

// Using higher-order functions
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(x => x**2);
const evenNumbers = numbers.filter(x => x % 2 === 0);
```

## Function Decorators

Python has decorators for modifying or enhancing functions:

```python
# Simple decorator
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Function {func.__name__} returned: {result}")
        return result
    return wrapper

# Using decorator syntax
@log_function_call
def add(a, b):
    return a + b

# This is equivalent to:
# add = log_function_call(add)

sum_result = add(3, 5)  # Calls decorated function
# Calling function: add
# Function add returned: 8
```

### JavaScript Comparison

```javascript
// JavaScript doesn't have built-in decorator syntax yet
// But similar functionality can be implemented
function logFunctionCall(func) {
    return function(...args) {
        console.log(`Calling function: ${func.name}`);
        const result = func(...args);
        console.log(`Function ${func.name} returned: ${result}`);
        return result;
    };
}

const add = logFunctionCall(function add(a, b) {
    return a + b;
});
```

## Scope and Closures

Python follows lexical scoping rules:

```python
# Global and local scope
x = 10  # Global variable

def outer_function():
    y = 5  # Local to outer_function
    
    def inner_function():
        z = 3  # Local to inner_function
        print(x)  # Can access global variable
        print(y)  # Can access parent function variable
        print(z)  # Can access its own variable
    
    inner_function()

outer_function()

# Modifying global variables
count = 0

def increment():
    global count  # Must declare global to modify it
    count += 1
    return count

print(increment())  # 1
print(increment())  # 2
```

### JavaScript Comparison

```javascript
// JavaScript has similar scoping rules
let x = 10;  // Global variable

function outerFunction() {
    let y = 5;  // Local to outerFunction
    
    function innerFunction() {
        let z = 3;  // Local to innerFunction
        console.log(x);  // Can access global variable
        console.log(y);  // Can access parent function variable
        console.log(z);  // Can access its own variable
    }
    
    innerFunction();
}

// No need for global declaration in JavaScript
let count = 0;

function increment() {
    count += 1;  // Can modify global variables directly
    return count;
}
```

## Function Documentation

Python uses docstrings for function documentation:

```python
def calculate_area(radius):
    """
    Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle
        
    Returns:
        float: The area of the circle
        
    Examples:
        >>> calculate_area(1)
        3.141592653589793
    """
    import math
    return math.pi * radius ** 2

# Access docstring
help(calculate_area)  # Displays the docstring
print(calculate_area.__doc__)  # Another way to access docstring
```

### JavaScript Comparison

```javascript
/**
 * Calculate the area of a circle.
 * 
 * @param {number} radius - The radius of the circle
 * @returns {number} The area of the circle
 * 
 * @example
 * calculateArea(1)  // 3.141592653589793
 */
function calculateArea(radius) {
    return Math.PI * radius ** 2;
}

// Access documentation with IDEs or documentation generators
console.log(calculateArea.toString());  // View function code and comments
```

## Key Differences from JavaScript

1. **Function definition**: Python uses `def` instead of `function`.

2. **Named arguments**: Python supports named arguments directly; JavaScript simulates them with object destructuring.

3. **Multiple return values**: Python can return multiple values (as a tuple); JavaScript typically uses arrays or objects.

4. **Default parameters**: Similar in both languages.

5. **Docstrings**: Python has built-in documentation strings; JavaScript uses comments or JSDoc.

6. **Decorators**: Python has built-in decorator syntax; JavaScript implements similar patterns differently.

7. **Global variables**: Python requires `global` keyword to modify global variables within functions.

8. **Lambda functions**: Python has limited lambdas; JavaScript arrow functions are more versatile.

## Best Practices

1. **Function length**: Keep functions focused on a single task.

2. **Docstrings**: Document all non-trivial functions with docstrings.

3. **Return value consistency**: Be consistent with return values and document them.

4. **Parameter defaults**: Use default parameters for optional values.

5. **Named arguments**: Use named arguments for functions with many parameters.

6. **Pure functions**: When possible, write functions without side effects.

```python
# Good - clear parameters and return value
def calculate_discount(price, discount_percentage):
    """Calculate discount amount for a given price."""
    return price * (discount_percentage / 100)

# Good - descriptive name, single responsibility
def is_valid_username(username):
    """Check if username meets all requirements."""
    if not 3 <= len(username) <= 20:
        return False
    return all(c.isalnum() or c == '_' for c in username)
```
