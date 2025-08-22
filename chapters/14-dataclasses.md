# Dataclasses

Modern Python data containers

## Introduction to Dataclasses

Dataclasses (introduced in Python 3.7) provide a clean way to create classes that are primarily used to store data:

```python
from dataclasses import dataclass

# Basic dataclass
@dataclass
class Point:
    x: int
    y: int

# Creating an instance
p = Point(10, 20)
print(p)  # Point(x=10, y=20)
print(p.x)  # 10
```

### Comparing to Regular Classes

Dataclasses automatically generate special methods like `__init__`, `__repr__`, and `__eq__`:

```python
# Equivalent regular class
class RegularPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"RegularPoint(x={self.x}, y={self.y})"
    
    def __eq__(self, other):
        if not isinstance(other, RegularPoint):
            return NotImplemented
        return self.x == other.x and self.y == other.y

# With dataclasses, all this code is generated for you
```

### JavaScript Comparison

```javascript
// JavaScript doesn't have direct dataclass equivalents
// But similar functionality with classes

// Regular class approach
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return `Point(x=${this.x}, y=${this.y})`;
    }
}

// TypeScript can get closer with interfaces
/*
interface Point {
    x: number;
    y: number;
}
*/
```

## Dataclass Features

Dataclasses support many customizations through parameters:

```python
from dataclasses import dataclass, field

@dataclass(frozen=True)  # Immutable dataclass
class Rectangle:
    width: int
    height: int
    
    # Calculated field
    @property
    def area(self):
        return self.width * self.height

@dataclass
class Product:
    name: str
    price: float
    # Default value
    in_stock: bool = True
    # Field with default factory
    tags: list = field(default_factory=list)
    # Field excluded from __init__
    last_updated: str = field(init=False, default="N/A")
    # Field excluded from __repr__
    internal_id: str = field(repr=False, default="unknown")

# Using dataclasses
rect = Rectangle(10, 20)
print(rect.area)  # 200
# rect.width = 15  # Error: dataclass is frozen/immutable

product = Product("Laptop", 999.99)
product.tags.append("electronics")
print(product)  # Product(name='Laptop', price=999.99, in_stock=True, tags=['electronics'], last_updated='N/A')
```

## Advanced Dataclass Features

Dataclasses provide more advanced features for complex data structures:

```python
from dataclasses import dataclass, field, asdict, astuple, replace
from typing import List, Optional

@dataclass
class Address:
    street: str
    city: str
    zip_code: str
    country: str = "USA"

@dataclass
class Person:
    name: str
    age: int
    addresses: List[Address] = field(default_factory=list)
    email: Optional[str] = None
    
    # Custom initialization logic
    def __post_init__(self):
        # Validate data after regular initialization
        if self.age < 0:
            raise ValueError("Age cannot be negative")
        self.name = self.name.title()
    
    # Custom method
    def add_address(self, address: Address):
        self.addresses.append(address)

# Using the dataclasses
home = Address("123 Main St", "Anytown", "12345")
person = Person("john doe", 30, [home])

# Convert to dict (useful for serialization)
person_dict = asdict(person)
print(person_dict)  # {'name': 'John Doe', 'age': 30, 'addresses': [{'street': '123 Main St', ...}], 'email': None}

# Convert to tuple
person_tuple = astuple(person)
print(person_tuple)  # ('John Doe', 30, [Address(street='123 Main St', ...)], None)

# Create modified copy (immutable pattern)
updated_person = replace(person, age=31, email="john@example.com")
print(updated_person.age)  # 31
print(person.age)  # 30 (original unchanged)
```

## Inheritance with Dataclasses

Dataclasses support inheritance, maintaining all dataclass features:

```python
@dataclass
class Vehicle:
    make: str
    model: str
    year: int
    
    def description(self):
        return f"{self.year} {self.make} {self.model}"

@dataclass
class Car(Vehicle):
    num_doors: int = 4
    fuel_type: str = "gasoline"
    
    def description(self):
        base_desc = super().description()
        return f"{base_desc}, {self.num_doors}-door {self.fuel_type}"

# Using inherited dataclass
car = Car("Toyota", "Corolla", 2022, fuel_type="hybrid")
print(car)  # Car(make='Toyota', model='Corolla', year=2022, num_doors=4, fuel_type='hybrid')
print(car.description())  # 2022 Toyota Corolla, 4-door hybrid
```

## Slots and Performance

For better memory efficiency and performance, dataclasses can use slots:

```python
@dataclass(slots=True)  # Python 3.10+
class Point3D:
    x: int
    y: int
    z: int = 0

# For earlier versions
@dataclass
class Point3D:
    __slots__ = ('x', 'y', 'z')  # Manually specify slots
    x: int
    y: int
    z: int = 0

# Using slots prevents dynamically adding attributes
p = Point3D(1, 2)
# p.color = "red"  # Raises AttributeError
```

## Dataclasses with Type Hints

Dataclasses work well with Python's type hinting system:

```python
from dataclasses import dataclass
from typing import List, Dict, Optional, Union, TypeVar, Generic

T = TypeVar('T')

@dataclass
class Box(Generic[T]):
    content: T
    
    def get(self) -> T:
        return self.content

@dataclass
class User:
    username: str
    email: str
    active: bool = True
    roles: List[str] = field(default_factory=list)
    preferences: Dict[str, str] = field(default_factory=dict)
    last_login: Optional[str] = None
    
    def has_role(self, role: str) -> bool:
        return role in self.roles

# Using generic dataclass
int_box = Box[int](42)
str_box = Box[str]("Hello")
print(int_box.get())  # 42
print(str_box.get())  # Hello

# Type-hinted user
user = User(
    "johndoe", 
    "john@example.com", 
    roles=["admin", "user"],
    preferences={"theme": "dark", "notifications": "all"}
)
print(user.has_role("admin"))  # True
```

## Immutability and Hashability

Making dataclasses immutable allows them to be used as dictionary keys:

```python
@dataclass(frozen=True)
class Person:
    name: str
    birth_year: int
    
    def age(self, current_year):
        return current_year - self.birth_year

# Using immutable dataclasses
people = {
    Person("Alice", 1990): "Developer",
    Person("Bob", 1985): "Manager"
}

alice = Person("Alice", 1990)
print(people[alice])  # Developer

# Attempting to modify
try:
    alice.birth_year = 1991  # This will raise FrozenInstanceError
except Exception as e:
    print(f"Error: {e}")
```

## Dataclasses Module Functions

The dataclasses module provides useful functions for working with dataclasses:

```python
from dataclasses import dataclass, is_dataclass, fields, make_dataclass

@dataclass
class Product:
    name: str
    price: float
    stock: int = 0

# Check if something is a dataclass
print(is_dataclass(Product))  # True
print(is_dataclass(Product()))  # True
print(is_dataclass("Not a dataclass"))  # False

# Get field information
for field in fields(Product):
    print(f"Field {field.name}: {field.type}, default={field.default}")

# Create a dataclass dynamically
Person = make_dataclass(
    "Person",
    [("name", str), ("age", int, field(default=0))],
    namespace={"greet": lambda self: f"Hello, {self.name}!"}
)

# Use dynamically created dataclass
p = Person("Alice", 30)
print(p)  # Person(name='Alice', age=30)
print(p.greet())  # Hello, Alice!
```

## Python 3.10+: KW_ONLY and Match Statements

Python 3.10 added more dataclass features:

```python
@dataclass(kw_only=True)  # Python 3.10+
class Config:
    host: str
    port: int = 8080
    debug: bool = False

# Must use keyword arguments
config = Config(host="localhost", debug=True)

# Pattern matching with dataclasses (Python 3.10+)
def process_shape(shape):
    match shape:
        case Point(x=0, y=0):
            return "Point at origin"
        case Point(x=x, y=y) if x == y:
            return f"Point on diagonal at {x}"
        case Rectangle(width=w, height=h) if w == h:
            return f"Square with side {w}"
        case Rectangle(width=w, height=h):
            return f"Rectangle {w}x{h}"
        case _:
            return "Unknown shape"
```

## Key Differences from JavaScript

1. **Built-in support**: Python has dataclasses built in; JavaScript requires custom implementation.

2. **Annotations**: Dataclasses use type hints; JavaScript has looser typing.

3. **Automatic methods**: Dataclasses generate common special methods automatically.

4. **Immutability**: Dataclasses support frozen instances; JavaScript needs external libraries or patterns.

5. **Helper functions**: Python has `asdict()`, `astuple()`, and `replace()` for working with dataclasses.

## Best Practices

1. **Use for data containers**: Ideal for classes that primarily store data with few behaviors.

2. **Consider immutability**: Use `frozen=True` for data that shouldn't change after creation.

3. **Add validation**: Use `__post_init__` for additional validation or data processing.

4. **Use with type hints**: Combine with Python's typing system for better IDE support.

5. **Default factories**: Use `field(default_factory=list)` for mutable defaults.

```python
# Good - immutable data class with validation
@dataclass(frozen=True)
class UserId:
    value: str
    
    def __post_init__(self):
        # We can use object.__setattr__ even with frozen=True during __post_init__
        if not self.value or not isinstance(self.value, str):
            object.__setattr__(self, "value", str(uuid.uuid4()))
    
    @property
    def short_id(self):
        return self.value[:8]

# Good - complex object with defaults
@dataclass
class ServerConfig:
    hostname: str
    port: int = 8000
    workers: int = 4
    debug: bool = False
    allowed_ips: List[str] = field(default_factory=list)
    timeouts: Dict[str, int] = field(
        default_factory=lambda: {"connect": 5, "read": 30}
    )
```
