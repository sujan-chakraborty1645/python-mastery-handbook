# Variable Scopes and Closures

Understanding Python's scope rules and closure mechanisms - Essential knowledge for JavaScript developers

## Introduction to Python Scopes

Scope defines the region of code where a name (like a variable) is accessible. Python's scope rules differ from JavaScript's in important ways, which can be a source of confusion for JavaScript developers transitioning to Python.

## Types of Scopes in Python

Python has four main scopes:

### 1. Local Scope

Variables defined within a function:

```python
def my_function():
    local_var = 10  # Local variable
    print(local_var)  # Accessible here

my_function()
# print(local_var)  # Error! Not accessible outside the function
```

### 2. Enclosing (Nonlocal) Scope

Variables in the outer (enclosing) function of nested functions:

```python
def outer_function():
    outer_var = "I'm in the outer function"
    
    def inner_function():
        # Can access variables from the enclosing scope
        print(outer_var)
    
    inner_function()

outer_function()  # Prints: I'm in the outer function
```

### 3. Global Scope

Variables defined at the top level of a module or declared global:

```python
global_var = "I'm a global variable"

def my_function():
    print(global_var)  # Can access global variables

my_function()  # Prints: I'm a global variable
```

### 4. Built-in Scope

Pre-defined names in the built-in module (like `print`, `len`, `sum`):

```python
print(len("hello"))  # Using built-in functions len() and print()
```

## The LEGB Rule

Python resolves names using the LEGB rule - searching in Local, Enclosing, Global, and Built-in scopes, in that order.

```python
x = "global x"  # Global scope

def outer():
    x = "outer x"  # Enclosing scope
    
    def inner():
        x = "inner x"  # Local scope
        print("inner:", x)
    
    inner()  # Prints "inner: inner x" (local takes precedence)
    print("outer:", x)  # Prints "outer: outer x" (enclosing)

outer()
print("global:", x)  # Prints "global: global x" (global)
```

## Modifying Variables in Different Scopes

### Local Variables

By default, variables assigned inside a function are local:

```python
def modify_local():
    x = 10  # Creates a new local variable
    print("Inside function:", x)

x = 5  # Global variable
modify_local()  # Prints: Inside function: 10
print("Outside function:", x)  # Prints: Outside function: 5 (unchanged)
```

### Accessing Global Variables

You can access global variables from inside functions:

```python
def access_global():
    print(x)  # Just reading a global variable

x = 10
access_global()  # Prints: 10
```

### Modifying Global Variables

To modify global variables from inside a function, use the `global` keyword:

```python
def modify_global():
    global x
    x = 20  # Modifies the global variable

x = 10
print("Before:", x)  # Prints: Before: 10
modify_global()
print("After:", x)  # Prints: After: 20
```

### Nonlocal Variables

For modifying variables in an enclosing (but non-global) scope, use the `nonlocal` keyword:

```python
def outer():
    x = "outer"
    
    def inner():
        nonlocal x
        x = "modified by inner"
    
    print("Before:", x)  # Prints: Before: outer
    inner()
    print("After:", x)  # Prints: After: modified by inner

outer()
```

## Real-Life Example: Counter Factory

Here's a practical example of using closures and scopes to create a counter factory:

```python
def create_counter(start=0, step=1):
    """Create a counter function with customizable start and step values"""
    count = start - step  # Initialize count (will be incremented before first return)
    
    def counter():
        nonlocal count
        count += step
        return count
    
    return counter

# Create different counters
count_by_1 = create_counter(0, 1)
count_by_10 = create_counter(0, 10)

print(count_by_1())  # 1
print(count_by_1())  # 2
print(count_by_1())  # 3

print(count_by_10())  # 10
print(count_by_10())  # 20
print(count_by_10())  # 30

# Each counter maintains its own independent state
```

## Closures in Python

A closure is a function that "remembers" values from its enclosing lexical scope even when the outer function has finished executing.

### Basic Closure Example

```python
def greeting_factory(greeting):
    """Returns a function that combines the greeting with a name"""
    
    def greet(name):
        return f"{greeting}, {name}!"
    
    return greet

# Create specific greeting functions
say_hello = greeting_factory("Hello")
say_hi = greeting_factory("Hi")
say_hola = greeting_factory("Hola")

# Use the greeting functions
print(say_hello("Alice"))  # Hello, Alice!
print(say_hi("Bob"))       # Hi, Bob!
print(say_hola("Carlos"))  # Hola, Carlos!
```

### Closures for Data Encapsulation

Closures can provide a way to have "private" variables in Python:

```python
def create_account(initial_balance):
    """Create a bank account with deposit and withdraw functions"""
    
    balance = initial_balance  # Private variable
    
    def deposit(amount):
        nonlocal balance
        balance += amount
        return balance
    
    def withdraw(amount):
        nonlocal balance
        if amount > balance:
            raise ValueError("Insufficient funds")
        balance -= amount
        return balance
    
    def get_balance():
        return balance
    
    # Return functions that share access to the balance variable
    return {
        'deposit': deposit,
        'withdraw': withdraw,
        'balance': get_balance
    }

# Create an account
account = create_account(1000)

# Use the account functions
print(account['balance']())  # 1000
account['deposit'](500)
print(account['balance']())  # 1500
account['withdraw'](200)
print(account['balance']())  # 1300

# The 'balance' variable is not directly accessible
# print(account['balance'])  # This would print the function, not the balance value
```

## Advanced Closure Examples

### Memoization with Closures

A closure can be used to cache function results:

```python
def memoize(func):
    """Cache the results of a function to avoid recalculating"""
    cache = {}
    
    def wrapper(*args):
        if args in cache:
            print(f"Cache hit for {args}")
            return cache[args]
        
        result = func(*args)
        cache[args] = result
        return result
    
    return wrapper

# Example: Memoized Fibonacci function
@memoize
def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    print(f"Computing fibonacci({n})")
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# First call - calculates everything
print(fibonacci(6))  # Calculates all intermediate values

# Second call - reuses all cached values
print(fibonacci(6))  # Just fetches from cache
```

### Debouncing in Python

Here's how to implement a debounce function similar to JavaScript's:

```python
import time
import threading

def debounce(wait_time):
    """
    Decorator that ensures a function is only executed after wait_time seconds
    have passed without it being called.
    """
    def decorator(fn):
        timer = None
        
        def debounced(*args, **kwargs):
            nonlocal timer
            
            def call_function():
                fn(*args, **kwargs)
            
            # Cancel the previous timer if it exists
            if timer is not None:
                timer.cancel()
            
            # Set a new timer
            timer = threading.Timer(wait_time, call_function)
            timer.start()
        
        return debounced
    
    return decorator

# Example usage
@debounce(2.0)
def process_input(text):
    print(f"Processing input: {text}")

# In a real app, this might be called as the user types
process_input("a")
process_input("ab")
process_input("abc")
process_input("abcd")  # Only this one will be processed after 2 seconds

# Sleep to allow the debounced function to execute
time.sleep(3)
```

### Throttling in Python

Similar to debouncing, throttling limits the execution rate:

```python
import time

def throttle(wait_time):
    """
    Decorator that ensures a function is not called more than once every wait_time seconds.
    """
    def decorator(fn):
        last_called = 0
        
        def throttled(*args, **kwargs):
            nonlocal last_called
            current_time = time.time()
            
            # If enough time has passed since last call
            if current_time - last_called >= wait_time:
                result = fn(*args, **kwargs)
                last_called = current_time
                return result
            else:
                print(f"Function call throttled. Try again in {wait_time - (current_time - last_called):.2f} seconds")
        
        return throttled
    
    return decorator

# Example usage
@throttle(3.0)
def process_click(button_id):
    print(f"Processing click on button {button_id}")

# Simulate multiple rapid clicks
process_click("submit")  # Processed
time.sleep(1)
process_click("submit")  # Throttled
time.sleep(1)
process_click("submit")  # Throttled
time.sleep(2)
process_click("submit")  # Processed (enough time has passed)
```

## Python vs. JavaScript: Scope Differences

| Feature | Python | JavaScript (pre-ES6) | JavaScript (ES6+) |
|---------|--------|----------------------|-------------------|
| Block Scope | No block scope (except in comprehensions in Python 3.8+) | No block scope | Yes, with `let` and `const` |
| Function Scope | Yes | Yes | Yes |
| Hoisting | No hoisting | Variables and functions are hoisted | Only function declarations are hoisted, `let` and `const` are not |
| Default Visibility | Local to function | Global if not declared with `var` | Local to block if using `let`/`const` |
| Access to Outer Scope | Read by default, modify with `nonlocal` | Read and modify | Read and modify |
| Global Modifier | `global` keyword | Implicit or `window.varName` | Implicit or `window.varName` |
| Closure Support | Yes | Yes | Yes |

## Best Practices for Managing Scope

1. **Limit Global Variables**: Minimize the use of global variables to avoid namespace pollution
2. **Use Function Parameters**: Pass values as arguments rather than accessing globals
3. **Keep Functions Pure**: When possible, have functions depend only on their inputs
4. **Return Values Instead of Modifying**: Return new values instead of modifying existing ones
5. **Be Explicit with `global` and `nonlocal`**: Make it clear when you're modifying variables from outer scopes
6. **Use Classes for State**: For complex state management, consider using classes instead of closures
7. **Document Scope Dependencies**: Make it clear which outer scope variables a function uses

## Summary

Python's scope rules (LEGB) provide a predictable way to resolve variable names, but they differ from JavaScript in important ways. Understanding these differences helps avoid common bugs when transitioning between the two languages. Closures in both languages can be used for similar patterns like data encapsulation and function factories.
