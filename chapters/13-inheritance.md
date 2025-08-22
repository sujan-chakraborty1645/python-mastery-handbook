# Inheritance

Extending classes in Python

## Inheritance Basics

Python supports class inheritance to create hierarchies of classes:

```python
# Base class
class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.is_running = False
    
    def start(self):
        self.is_running = True
        return f"{self.make} {self.model} started"
    
    def stop(self):
        self.is_running = False
        return f"{self.make} {self.model} stopped"
    
    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

# Derived class (inherits from Vehicle)
class Car(Vehicle):
    def __init__(self, make, model, year, fuel_type="gasoline"):
        # Call parent constructor
        super().__init__(make, model, year)
        self.fuel_type = fuel_type
        self.num_wheels = 4
    
    # Override parent method
    def start(self):
        result = super().start()  # Call parent method
        return f"{result} with {self.fuel_type} engine"

# Creating instances
vehicle = Vehicle("Generic", "Transport", 2023)
car = Car("Toyota", "Corolla", 2022, "hybrid")

print(vehicle.start())  # Generic Transport started
print(car.start())      # Toyota Corolla started with hybrid engine

# Checking inheritance
print(isinstance(car, Car))      # True
print(isinstance(car, Vehicle))  # True
print(issubclass(Car, Vehicle))  # True
```

### JavaScript Comparison

```javascript
// Base class
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        return `${this.make} ${this.model} started`;
    }
    
    stop() {
        this.isRunning = false;
        return `${this.make} ${this.model} stopped`;
    }
    
    toString() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

// Derived class
class Car extends Vehicle {
    constructor(make, model, year, fuelType = "gasoline") {
        // Call parent constructor
        super(make, model, year);
        this.fuelType = fuelType;
        this.numWheels = 4;
    }
    
    // Override parent method
    start() {
        const result = super.start();  // Call parent method
        return `${result} with ${this.fuelType} engine`;
    }
}

// Creating instances
const vehicle = new Vehicle("Generic", "Transport", 2023);
const car = new Car("Toyota", "Corolla", 2022, "hybrid");

console.log(vehicle.start());  // Generic Transport started
console.log(car.start());      // Toyota Corolla started with hybrid engine

// Checking inheritance
console.log(car instanceof Car);      // true
console.log(car instanceof Vehicle);  // true
```

## Multiple Inheritance

Python supports multiple inheritance, allowing a class to inherit from multiple base classes:

```python
# Base classes
class Engine:
    def __init__(self, power_output):
        self.power_output = power_output
    
    def start_engine(self):
        return f"Engine with {self.power_output}hp started"

class ElectricSystem:
    def __init__(self, voltage):
        self.voltage = voltage
    
    def charge(self):
        return f"Charging at {self.voltage} volts"

# Multiple inheritance
class HybridVehicle(Vehicle, Engine, ElectricSystem):
    def __init__(self, make, model, year, power_output, voltage):
        Vehicle.__init__(self, make, model, year)
        Engine.__init__(self, power_output)
        ElectricSystem.__init__(self, voltage)
    
    def start(self):
        vehicle_start = Vehicle.start(self)
        engine_start = self.start_engine()
        return f"{vehicle_start} - {engine_start}"

# Creating an instance
hybrid = HybridVehicle("Toyota", "Prius", 2022, 120, 650)
print(hybrid.start())  # Toyota Prius started - Engine with 120hp started
print(hybrid.charge())  # Charging at 650 volts

# Method Resolution Order (MRO)
print(HybridVehicle.__mro__)  # Shows the order in which Python looks for methods
```

### JavaScript Comparison

```javascript
// JavaScript doesn't support true multiple inheritance
// Simulated with mixins

// Base class
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        return `${this.make} ${this.model} started`;
    }
}

// Mixins
const EngineMixin = {
    initEngine(powerOutput) {
        this.powerOutput = powerOutput;
    },
    
    startEngine() {
        return `Engine with ${this.powerOutput}hp started`;
    }
};

const ElectricSystemMixin = {
    initElectricSystem(voltage) {
        this.voltage = voltage;
    },
    
    charge() {
        return `Charging at ${this.voltage} volts`;
    }
};

// Class with mixins
class HybridVehicle extends Vehicle {
    constructor(make, model, year, powerOutput, voltage) {
        super(make, model, year);
        this.initEngine(powerOutput);
        this.initElectricSystem(voltage);
    }
    
    start() {
        const vehicleStart = super.start();
        const engineStart = this.startEngine();
        return `${vehicleStart} - ${engineStart}`;
    }
}

// Apply mixins
Object.assign(HybridVehicle.prototype, EngineMixin, ElectricSystemMixin);
```

## Method Resolution Order (MRO)

Python uses the C3 linearization algorithm to determine method resolution order:

```python
# Diamond inheritance problem
class A:
    def method(self):
        return "A.method"

class B(A):
    def method(self):
        return "B.method"

class C(A):
    def method(self):
        return "C.method"

class D(B, C):
    pass  # No method implementation

# Using the class
d = D()
print(d.method())  # "B.method" (follows MRO)

# View method resolution order
print(D.__mro__)  
# (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
```

## Abstract Base Classes

Python provides abstract base classes for defining interfaces:

```python
from abc import ABC, abstractmethod

# Abstract base class
class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        """Calculate the shape's area."""
        pass
    
    @abstractmethod
    def calculate_perimeter(self):
        """Calculate the shape's perimeter."""
        pass
    
    # Concrete method
    def describe(self):
        return f"This shape has area {self.calculate_area()}"

# Concrete implementation
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def calculate_area(self):
        return self.width * self.height
    
    def calculate_perimeter(self):
        return 2 * (self.width + self.height)

# Another implementation
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def calculate_area(self):
        import math
        return math.pi * self.radius ** 2
    
    def calculate_perimeter(self):
        import math
        return 2 * math.pi * self.radius

# Using the classes
# shape = Shape()  # TypeError: Can't instantiate abstract class
rectangle = Rectangle(10, 5)
circle = Circle(7)

print(rectangle.calculate_area())     # 50
print(circle.calculate_area())        # ~153.94
print(rectangle.describe())           # This shape has area 50
```

### JavaScript Comparison

```javascript
// JavaScript doesn't have built-in abstract classes
// But we can simulate them

class Shape {
    constructor() {
        // Enforce abstract class
        if (new.target === Shape) {
            throw new TypeError("Cannot instantiate abstract class");
        }
    }
    
    calculateArea() {
        throw new Error("Method 'calculateArea()' must be implemented");
    }
    
    calculatePerimeter() {
        throw new Error("Method 'calculatePerimeter()' must be implemented");
    }
    
    describe() {
        return `This shape has area ${this.calculateArea()}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
    
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}

// More standard now with TypeScript:
/*
abstract class Shape {
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;
    
    describe(): string {
        return `This shape has area ${this.calculateArea()}`;
    }
}
*/
```

## Mixins and Composition

Python can implement mixins for code reuse without deep inheritance:

```python
# Mixin classes
class LoggerMixin:
    def log(self, message):
        print(f"[LOG] {message}")

class SerializableMixin:
    def to_dict(self):
        return {key: value for key, value in self.__dict__.items() 
                if not key.startswith('_')}
    
    def to_json(self):
        import json
        return json.dumps(self.to_dict())

# Using mixins with inheritance
class Product(SerializableMixin, LoggerMixin):
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def discount(self, percent):
        self.price = self.price * (1 - percent/100)
        self.log(f"Applied {percent}% discount to {self.name}")

# Using the class
product = Product("Laptop", 999.99)
product.discount(10)  # Logs: [LOG] Applied 10% discount to Laptop
print(product.to_json())  # {"name": "Laptop", "price": 899.991}
```

### JavaScript Comparison

```javascript
// JavaScript mixins
const LoggerMixin = {
    log(message) {
        console.log(`[LOG] ${message}`);
    }
};

const SerializableMixin = {
    toDict() {
        return Object.fromEntries(
            Object.entries(this)
                .filter(([key]) => !key.startsWith('_'))
        );
    },
    
    toJSON() {
        return JSON.stringify(this.toDict());
    }
};

// Using mixins
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    discount(percent) {
        this.price = this.price * (1 - percent/100);
        this.log(`Applied ${percent}% discount to ${this.name}`);
    }
}

// Apply mixins
Object.assign(Product.prototype, LoggerMixin, SerializableMixin);
```

## Property Inheritance

Properties and descriptors work with inheritance:

```python
class Person:
    def __init__(self, first_name, last_name):
        self._first_name = first_name
        self._last_name = last_name
    
    @property
    def full_name(self):
        return f"{self._first_name} {self._last_name}"
    
    @property
    def first_name(self):
        return self._first_name
        
    @first_name.setter
    def first_name(self, value):
        if not value:
            raise ValueError("First name cannot be empty")
        self._first_name = value

# Child class inherits properties
class Employee(Person):
    def __init__(self, first_name, last_name, employee_id):
        super().__init__(first_name, last_name)
        self._employee_id = employee_id
    
    @property
    def employee_id(self):
        return self._employee_id
    
    # Override property from parent
    @property
    def full_name(self):
        return f"{self._first_name} {self._last_name} (ID: {self._employee_id})"

# Using the classes
employee = Employee("John", "Doe", "E12345")
print(employee.full_name)    # John Doe (ID: E12345)
print(employee.first_name)   # John (inherited property)

employee.first_name = "Jane" # Using inherited setter
print(employee.full_name)    # Jane Doe (ID: E12345)
```

## Key Differences from JavaScript

1. **Multiple inheritance**: Python supports true multiple inheritance; JavaScript doesn't.

2. **Abstract classes**: Python has built-in support with `abc` module; JavaScript uses workarounds.

3. **Method Resolution Order**: Python has a defined algorithm (C3 linearization); JavaScript uses simple prototype chain.

4. **Super behavior**: Python's `super()` is more powerful for complex inheritance hierarchies.

5. **Mixins**: Python typically implements mixins with multiple inheritance; JavaScript uses object composition.

6. **Interfaces**: Python doesn't have a formal interface concept but uses abstract base classes; TypeScript has interfaces.

## Best Practices

1. **Prefer composition over inheritance**: When possible, use composition for code reuse.

2. **Keep inheritance hierarchies shallow**: Deep inheritance can lead to the "diamond problem" and code that's hard to maintain.

3. **Use mixins for shared behavior**: When multiple unrelated classes need the same functionality.

4. **Use abstract base classes for interfaces**: Define clear contracts for derived classes.

5. **Follow the Liskov Substitution Principle**: Derived classes should be substitutable for their base classes.

```python
# Bad - Deep inheritance hierarchy
class Animal:
    pass

class Mammal(Animal):
    pass

class Carnivore(Mammal):
    pass

class Feline(Carnivore):
    pass

class Tiger(Feline):
    pass

# Better - Composition
class Animal:
    def __init__(self, diet_type, habitat):
        self.diet = diet_type
        self.habitat = habitat

class Tiger:
    def __init__(self):
        # Composition
        self.animal_traits = Animal("carnivore", "jungle")
        self.stripe_pattern = "vertical"
        self.endangered = True
```
