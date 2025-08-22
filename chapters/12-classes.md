# Classes

Object-oriented programming in Python

## Class Basics

Python implements object-oriented programming with classes:

```python
# Basic class definition
class User:
    # Class variable (shared by all instances)
    user_count = 0
    
    # Constructor method
    def __init__(self, name, email):
        # Instance variables (unique to each instance)
        self.name = name
        self.email = email
        self.is_active = True
        User.user_count += 1
    
    # Instance method
    def deactivate(self):
        self.is_active = False
        
    # Another instance method
    def display_info(self):
        status = "active" if self.is_active else "inactive"
        return f"{self.name} ({self.email}) - {status}"

# Creating instances
user1 = User("Alice", "alice@example.com")
user2 = User("Bob", "bob@example.com")

# Accessing instance variables
print(user1.name)       # Alice
print(user2.email)      # bob@example.com

# Calling methods
user1.deactivate()
print(user1.is_active)  # False

# Accessing class variable
print(User.user_count)  # 2
```

### JavaScript Comparison

```javascript
// JavaScript class syntax
class User {
    // Static class property
    static userCount = 0;
    
    // Constructor
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isActive = true;
        User.userCount++;
    }
    
    // Instance methods
    deactivate() {
        this.isActive = false;
    }
    
    displayInfo() {
        const status = this.isActive ? "active" : "inactive";
        return `${this.name} (${this.email}) - ${status}`;
    }
}

// Creating instances
const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");

// Accessing instance properties and methods
console.log(user1.name);  // Alice
user1.deactivate();
console.log(user1.isActive);  // false

// Accessing static property
console.log(User.userCount);  // 2
```

## Instance and Class Methods

Python has different types of methods in a class:

```python
class MathUtils:
    # Class variable
    pi = 3.14159
    
    def __init__(self, value):
        # Instance variable
        self.value = value
    
    # Regular instance method (has access to self)
    def double(self):
        return self.value * 2
    
    # Class method (has access to the class, not instance)
    @classmethod
    def from_string(cls, value_str):
        value = float(value_str)
        return cls(value)  # Creates new instance
    
    # Static method (no access to instance or class)
    @staticmethod
    def is_positive(num):
        return num > 0

# Using instance method
calculator = MathUtils(5)
print(calculator.double())  # 10

# Using class method
calc_from_string = MathUtils.from_string("7.5")
print(calc_from_string.value)  # 7.5

# Using static method
print(MathUtils.is_positive(-3))  # False
```

### JavaScript Comparison

```javascript
class MathUtils {
    static pi = 3.14159;
    
    constructor(value) {
        this.value = value;
    }
    
    // Instance method
    double() {
        return this.value * 2;
    }
    
    // Static method (similar to Python's @classmethod and @staticmethod)
    static fromString(valueStr) {
        const value = parseFloat(valueStr);
        return new MathUtils(value);
    }
    
    static isPositive(num) {
        return num > 0;
    }
}

// Using instance method
const calculator = new MathUtils(5);
console.log(calculator.double());  // 10

// Using static methods
const calcFromString = MathUtils.fromString("7.5");
console.log(calcFromString.value);  // 7.5
console.log(MathUtils.isPositive(-3));  // false
```

## Special Methods (Dunder Methods)

Python classes can implement special methods (double underscore or "dunder" methods) for operator overloading and customizing behavior:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    # String representation (like toString in JS)
    def __str__(self):
        return f"Point({self.x}, {self.y})"
    
    # More detailed representation
    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"
    
    # Equality operator (==)
    def __eq__(self, other):
        if not isinstance(other, Point):
            return False
        return self.x == other.x and self.y == other.y
    
    # Addition operator (+)
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    
    # Length operator (len())
    def __len__(self):
        # Distance from origin (rounded)
        import math
        return round(math.sqrt(self.x**2 + self.y**2))
    
    # Make object callable
    def __call__(self, factor):
        return Point(self.x * factor, self.y * factor)

# Using special methods
p1 = Point(3, 4)
p2 = Point(2, 3)

print(str(p1))         # Point(3, 4)
print(p1 == p2)        # False
print(p1 + p2)         # Point(5, 7)
print(len(p1))         # 5 (distance from origin rounded)
p3 = p1(2)             # Calling the object as a function
print(p3)              # Point(6, 8)
```

### JavaScript Comparison

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    // String representation
    toString() {
        return `Point(${this.x}, ${this.y})`;
    }
    
    // Custom inspection (Node.js)
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return `Point(x=${this.x}, y=${this.y})`;
    }
    
    // No direct equivalent to __eq__, need to create your own method
    equals(other) {
        return other instanceof Point && this.x === other.x && this.y === other.y;
    }
    
    // No direct operator overloading in JavaScript
    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
    
    // Callable objects in JavaScript use apply/call methods
    scale(factor) {
        return new Point(this.x * factor, this.y * factor);
    }
    
    // No built-in length protocol
    distanceFromOrigin() {
        return Math.round(Math.sqrt(this.x**2 + this.y**2));
    }
}
```

## Properties and Descriptors

Python supports properties for getter/setter functionality:

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    # Getter
    @property
    def celsius(self):
        return self._celsius
    
    # Setter
    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value
    
    # Property with calculation
    @property
    def fahrenheit(self):
        return (self.celsius * 9/5) + 32
    
    # Setter for calculated property
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

# Using properties
temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0

# Using setters
temp.celsius = 30
print(temp.fahrenheit)  # 86.0

temp.fahrenheit = 68
print(temp.celsius)     # 20.0

# This will raise an error
# temp.celsius = -300  # ValueError: Temperature below absolute zero!
```

### JavaScript Comparison

```javascript
class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius;
    }
    
    // Getters and setters
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

// Using properties
const temp = new Temperature(25);
console.log(temp.celsius);     // 25
console.log(temp.fahrenheit);  // 77.0

// Using setters
temp.celsius = 30;
console.log(temp.fahrenheit);  // 86.0

temp.fahrenheit = 68;
console.log(temp.celsius);     // 20.0
```

## Private Members and Encapsulation

Python traditionally uses naming conventions for "private" attributes, but newer versions support true private attributes:

```python
# Traditional approach (name mangling)
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner      # Public attribute
        self._balance = balance  # "Protected" attribute (convention)
        self.__id = 12345        # "Private" attribute (name mangling)
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
            return True
        return False
    
    def get_balance(self):
        return self._balance

# Using the class
account = BankAccount("Alice", 1000)
print(account.owner)         # Alice
print(account.get_balance()) # 1000
print(account._balance)      # 1000 (accessible but convention says don't use it)
# print(account.__id)        # AttributeError (name mangled to _BankAccount__id)
print(account._BankAccount__id)  # 12345 (still accessible if you know the pattern)
```

### Modern Python 3.8+ Approach

```python
# Python 3.8+ (PEP 607)
from typing import final

class ModernBankAccount:
    def __init__(self, owner: str, balance: float = 0):
        self.owner = owner
        self._balance = balance  # still using convention
    
    @final  # This method can't be overridden
    def deposit(self, amount: float) -> bool:
        if amount > 0:
            self._balance += amount
            return True
        return False
```

### JavaScript Comparison

```javascript
// Modern JavaScript with private fields
class BankAccount {
    // Truly private fields (ES2019+)
    #id;
    #balance;
    
    constructor(owner, balance = 0) {
        this.owner = owner;        // Public property
        this.#balance = balance;   // Private property
        this.#id = 12345;          // Private property
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }
    
    withdraw(amount) {
        if (0 < amount && amount <= this.#balance) {
            this.#balance -= amount;
            return true;
        }
        return false;
    }
    
    getBalance() {
        return this.#balance;
    }
}

// Using the class
const account = new BankAccount("Alice", 1000);
console.log(account.owner);         // Alice
console.log(account.getBalance());  // 1000
// console.log(account.#balance);   // SyntaxError (truly private)
```

## Key Differences from JavaScript

1. **Constructor**: Python uses `__init__` method, JavaScript uses `constructor`.

2. **Self parameter**: Python methods require explicit `self` parameter; JavaScript uses implicit `this`.

3. **Static vs Class methods**: Python distinguishes between class methods and static methods; JavaScript just has static methods.

4. **Special methods**: Python has many special methods for operator overloading; JavaScript has limited support.

5. **Privacy**: Python uses naming conventions or name mangling; modern JavaScript has true private fields.

6. **Inheritance syntax**: Python uses `class Child(Parent)`; JavaScript uses `class Child extends Parent`.

7. **Method decorators**: Python uses decorators for properties; JavaScript uses `get` and `set` keywords.

## Best Practices

1. **Keep classes focused**: Follow the Single Responsibility Principle.

2. **Use properties for computed attributes**: Don't expose complex logic as regular attributes.

3. **Follow naming conventions**: Use `_single_leading_underscore` for protected attributes.

4. **Document classes**: Use docstrings to explain class purpose and methods.

5. **Favor composition over inheritance**: Prefer composing objects rather than deep inheritance hierarchies.

```python
# Good - well-encapsulated class
class Circle:
    """A class representing a circle geometry."""
    
    def __init__(self, radius):
        self._radius = radius  # Protected attribute
    
    @property
    def radius(self):
        """The circle's radius."""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def area(self):
        """Calculate the circle's area."""
        import math
        return math.pi * self._radius ** 2
    
    @property
    def diameter(self):
        """Calculate the circle's diameter."""
        return self._radius * 2
```
