# Conditionals in Python

Understanding control flow structures and Boolean logic in Python

## Introduction to Python Conditionals

Python's control flow relies heavily on indentation rather than braces or keywords like JavaScript. This design choice makes Python code cleaner and more readable, but requires careful attention to whitespace.

## Basic Conditional Statements

### If Statement

The most basic conditional statement:

```python
# Basic if statement
age = 20
if age >= 18:
    print("You are an adult")
    # This entire indented block executes if condition is True
    print("You can vote")
    
# Multiple statements in a single block
if age >= 21:
    print("You are an adult")
    print("You can vote")
    print("You can also drink legally in the US")
```

### If-Else Statement

For binary decisions:

```python
# if-else statement
age = 16
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
    
# More complex example
temperature = 75
if temperature > 80:
    print("It's hot outside")
    print("Consider wearing light clothes")
else:
    print("It's not too hot today")
    print("A light jacket might be appropriate")
```

### If-Elif-Else Chain

For multiple conditions:

```python
# if-elif-else (multiple conditions)
age = 15

if age < 13:
    print("Child")
elif age < 18:
    print("Teenager")
elif age < 65:
    print("Adult")
else:
    print("Senior")
    
# Multiple elif blocks
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
    
print(f"Your grade is {grade}")
```

## Nested Conditionals

You can nest conditional statements inside each other:

```python
has_ticket = True
bag_size = 25  # in inches

if has_ticket:
    print("You have a ticket. Proceeding to bag check.")
    
    if bag_size <= 22:
        print("Your bag is within carry-on size limits. You may board.")
    else:
        print("Your bag exceeds the size limit. It must be checked.")
else:
    print("You need to purchase a ticket first.")
```

## Boolean Operations

Python has three boolean operators: `and`, `or`, and `not`. These are used to combine or negate conditions.

### And, Or, Not

```python
# Using 'and' - both conditions must be True
age = 25
income = 50000
if age > 18 and income >= 40000:
    print("You qualify for the loan")

# Using 'or' - at least one condition must be True
if age < 18 or income >= 100000:
    print("You get a discount")
    
# Using 'not' - negates a condition
is_weekend = False
if not is_weekend:
    print("It's a workday")
```

### Complex Conditions

You can combine multiple Boolean operators, but make sure to use parentheses for clarity:

```python
has_license = True
is_insured = True
blood_alcohol = 0.04
speed = 65
speed_limit = 70

# Complex condition with multiple Boolean operators
if (has_license and is_insured) and (blood_alcohol < 0.05 and speed <= speed_limit):
    print("You're driving legally")
else:
    print("You're in violation of traffic laws")
```

## Truthy and Falsey Values

In Python, any object can be tested for truth value. The following values are considered False:

- `False` - the boolean value
- `None` - Python's null equivalent 
- `0` - the integer zero
- `0.0` - the float zero
- `""` - empty string
- `[]` - empty list
- `()` - empty tuple
- `{}` - empty dict
- `set()` - empty set

Everything else is considered `True`.

```python
# Examples of truthy/falsey checks
name = ""
if name:  # Empty string is falsey
    print("Hello, " + name)
else:
    print("Name is empty")
    
items = []
if items:  # Empty list is falsey
    print("You have items in your cart")
else:
    print("Your cart is empty")
    
number = 0
if number:  # Zero is falsey
    print("You entered: " + str(number))
else:
    print("You entered zero or left it blank")
```

## Conditional Expressions (Ternary Operator)

Python's version of the ternary operator uses a different syntax than JavaScript:

```python
# JavaScript ternary: condition ? valueIfTrue : valueIfFalse
# Python conditional expression: valueIfTrue if condition else valueIfFalse

age = 20
status = "adult" if age >= 18 else "minor"

# More examples
message = "Eligible" if age >= 21 else "Not eligible"
price = 10 if is_weekend else 8
greeting = "Good morning" if hour < 12 else "Good afternoon" if hour < 18 else "Good evening"
```

## Comparing Python and JavaScript Conditionals

| Feature | Python | JavaScript |
|---------|--------|------------|
| Basic If | `if condition:` <br> `    code` | `if (condition) {` <br> `    code` <br> `}` |
| If-Else | `if condition:` <br> `    code1` <br> `else:` <br> `    code2` | `if (condition) {` <br> `    code1` <br> `} else {` <br> `    code2` <br> `}` |
| Multiple Conditions | `if c1:` <br> `    code1` <br> `elif c2:` <br> `    code2` <br> `else:` <br> `    code3` | `if (c1) {` <br> `    code1` <br> `} else if (c2) {` <br> `    code2` <br> `} else {` <br> `    code3` <br> `}` |
| Boolean AND | `and` | `&&` |
| Boolean OR | `or` | `\|\|` |
| Boolean NOT | `not` | `!` |
| Ternary | `x if condition else y` | `condition ? x : y` |
| Equality | `==` (value equality) | `==` (loose), `===` (strict) |
| Null Check | `if x is None:` | `if (x === null)` |

### JavaScript Comparison

```javascript
### JavaScript Comparison

```javascript
// Basic if statement in JavaScript
const age = 20;
if (age >= 18) {
    console.log("You are an adult");
}

// if-else statement
if (age >= 18) {
    console.log("You are an adult");
} else {
    console.log("You are a minor");
}

// Multiple conditions (if-else if-else)
if (age < 13) {
    console.log("Child");
} else if (age < 18) {
    console.log("Teenager");
} else if (age < 65) {
    console.log("Adult");
} else {
    console.log("Senior");
}
```

## Identity vs. Equality Operators

Python has both `==` (equality) and `is` (identity) operators:

```python
# == checks if values are the same
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)  # True - same values

# 'is' checks if objects are the same in memory
print(a is b)  # False - different objects in memory

# Use 'is' for None checks
value = None
if value is None:  # Preferred over value == None
    print("Value is None")
    
# Special case for singletons like None, True, False
if value is not None:
    print("Value has data")
```

## Practical Examples

### User Authentication

```python
def check_access(username, password, is_admin=False):
    if not username or not password:
        return "Both username and password are required"
    
    if username == "admin" and password == "secure123":
        if is_admin:
            return "Full administrative access granted"
        else:
            return "Regular admin access granted"
    elif username == "user" and password == "user123":
        return "User access granted"
    else:
        return "Invalid credentials"
```

### Form Validation

```python
def validate_form(email, password, confirm_password):
    errors = []
    
    # Check email
    if not email:
        errors.append("Email is required")
    elif "@" not in email or "." not in email:
        errors.append("Email format is invalid")
    
    # Check password
    if not password:
        errors.append("Password is required")
    elif len(password) < 8:
        errors.append("Password must be at least 8 characters")
    elif password != confirm_password:
        errors.append("Passwords do not match")
    
    # Return results
    if errors:
        return False, errors
    else:
        return True, ["Form is valid"]
```

## Best Practices

1. **Use Parentheses for Clarity**: When combining multiple boolean operations, use parentheses
2. **Keep Conditions Simple**: Break complex conditionals into simpler statements
3. **Use Descriptive Variable Names**: Make boolean conditions self-explanatory
4. **Avoid Nested Conditionals**: Try to flatten deeply nested if statements
5. **Use 'is' for None Checks**: Prefer `if x is None` over `if x == None`
6. **Avoid Double Negatives**: They make code harder to understand
7. **Consider Early Returns**: For complex functions, return early to reduce nesting
```

## Conditional Expressions (Ternary Operator)

Python has a different syntax for the ternary operator:

```python
# Python conditional expression (ternary)
age = 20
status = "adult" if age >= 18 else "minor"

# Nested conditional expression
category = "child" if age < 13 else ("teenager" if age < 18 else "adult")
```

### JavaScript Comparison

```javascript
// JavaScript ternary operator
const age = 20;
const status = age >= 18 ? "adult" : "minor";

// Nested ternary
const category = age < 13 ? "child" : age < 18 ? "teenager" : "adult";
```

## Truthy and Falsy Values

Python has its own rules for what values are considered True or False in a boolean context:

```python
# Falsy values in Python
if not None:        # True - None is falsy
if not False:       # True - False is falsy
if not 0:           # True - Zero is falsy
if not "":          # True - Empty string is falsy
if not []:          # True - Empty list is falsy
if not {}:          # True - Empty dict is falsy
if not ():          # True - Empty tuple is falsy
if not set():       # True - Empty set is falsy

# Truthy values
if True:            # True
if 42:              # True - Non-zero numbers are truthy
if "hello":         # True - Non-empty strings are truthy
if [1, 2, 3]:       # True - Non-empty lists are truthy
if {'a': 1}:        # True - Non-empty dicts are truthy
```

### JavaScript Comparison

```javascript
// JavaScript truthy/falsy values have similarities and differences
if (!null)          // True - null is falsy
if (!undefined)     // True - undefined is falsy (Python has no undefined)
if (!false)         // True - false is falsy
if (!0)             // True - 0 is falsy
if (!"")            // True - Empty string is falsy
if (![])            // False - Empty array is truthy (different from Python!)
if (!{})            // False - Empty object is truthy (different from Python!)
```

## Logical Operators

Python uses `and`, `or`, and `not` instead of `&&`, `||`, and `!`:

```python
# Logical operators
x = 5
y = 10

if x > 0 and y > 0:
    print("Both are positive")
    
if x > 0 or y < 0:
    print("At least one is positive")
    
if not (x > y):
    print("x is not greater than y")
```

### JavaScript Comparison

```javascript
// JavaScript logical operators
const x = 5;
const y = 10;

if (x > 0 && y > 0) {
    console.log("Both are positive");
}

if (x > 0 || y < 0) {
    console.log("At least one is positive");
}

if (!(x > y)) {
    console.log("x is not greater than y");
}
```

## Short-Circuit Evaluation

Like JavaScript, Python uses short-circuit evaluation for logical operators:

```python
# Short-circuit evaluation
x = None
y = "Hello"

# If x is falsy, return x, otherwise return y
result = x and y    # None (x is falsy, so return x without evaluating y)

# If x is truthy, return x, otherwise return y
result = x or y     # "Hello" (x is falsy, so return y)

# Common patterns
default_value = 10
user_value = None
value_to_use = user_value or default_value  # 10 (uses default if user_value is falsy)
```

### JavaScript Comparison

```javascript
// JavaScript short-circuit evaluation
const x = null;
const y = "Hello";

// Similar behavior to Python
const result1 = x && y;    // null
const result2 = x || y;    // "Hello"

// Common pattern
const defaultValue = 10;
const userValue = null;
const valueToUse = userValue || defaultValue;  // 10
```

## Membership and Identity Tests

Python has special operators for membership and identity testing:

```python
# Membership testing (in, not in)
fruits = ['apple', 'banana', 'orange']
if 'apple' in fruits:
    print("We have apples")
    
if 'grape' not in fruits:
    print("We don't have grapes")
    
# Identity testing (is, is not)
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True (same values)
print(a is b)  # False (different objects)
print(a is c)  # True (same object)
print(a is not b)  # True
```

### JavaScript Comparison

```javascript
// JavaScript equivalents
const fruits = ['apple', 'banana', 'orange'];
if (fruits.includes('apple')) {
    console.log("We have apples");
}

if (!fruits.includes('grape')) {
    console.log("We don't have grapes");
}

// Identity comparison
const a = [1, 2, 3];
const b = [1, 2, 3];
const c = a;

console.log(JSON.stringify(a) === JSON.stringify(b));  // True (same values)
console.log(a === b);  // False (different objects)
console.log(a === c);  // True (same object)
console.log(a !== b);  // True
```

## Pattern Matching (Python 3.10+)

Python 3.10 introduced structural pattern matching, similar to switch statements in other languages but more powerful:

```python
# Structural pattern matching (Python 3.10+)
def process_command(command):
    match command.split():
        case ["quit"]:
            return "Exiting program"
        case ["load", filename]:
            return f"Loading file: {filename}"
        case ["save", filename]:
            return f"Saving file: {filename}"
        case ["search", *keywords] if keywords:
            return f"Searching for: {', '.join(keywords)}"
        case _:
            return "Unknown command"

print(process_command("quit"))                # Exiting program
print(process_command("load data.txt"))       # Loading file: data.txt
print(process_command("search python book"))  # Searching for: python, book
```

### JavaScript Comparison

```javascript
// JavaScript switch statement is more limited
function processCommand(command) {
    const parts = command.split(' ');
    const action = parts[0];
    
    switch (action) {
        case 'quit':
            return "Exiting program";
        case 'load':
            return `Loading file: ${parts[1]}`;
        case 'save':
            return `Saving file: ${parts[1]}`;
        case 'search':
            const keywords = parts.slice(1);
            return `Searching for: ${keywords.join(', ')}`;
        default:
            return "Unknown command";
    }
}
```

## Key Differences from JavaScript

1. **Syntax**: Python uses indentation and words (`and`, `or`, `not`) instead of symbols (`&&`, `||`, `!`).

2. **Conditional expression**: Python's ternary operator has a different syntax: `value_if_true if condition else value_if_false`.

3. **Truthy/falsy values**: Empty containers (`[]`, `{}`, `()`) are falsy in Python, but truthy in JavaScript.

4. **Membership testing**: Python has built-in `in` and `not in` operators.

5. **Pattern matching**: Python 3.10+ has powerful pattern matching that goes beyond JavaScript's switch statements.

## Best Practices

1. **Use meaningful conditions**: Make conditions readable and meaningful.

2. **Avoid deeply nested conditions**: Consider refactoring with early returns or separate functions.

3. **Use is/is not for None**: For checking `None`, use `if x is None:` rather than `if x == None:`.

4. **Be careful with empty containers**: Remember that empty containers are falsy in Python.

```python
# Good
if user is None:
    print("No user found")

# Less good (but works)
if not user:
    print("No user found")  # Triggers for None, empty lists, empty dicts, etc.
```
