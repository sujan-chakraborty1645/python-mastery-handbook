# Object-Oriented Programming in Python

A comprehensive guide to OOP concepts and implementation with practical examples for JavaScript developers

## Introduction to Object-Oriented Programming

Imagine you're building a game with different characters. Each character needs a name, health points, abilities, and can perform actions like move, attack, and defend. Without object-oriented programming, you'd need to track all these details separately using multiple variables and functions.

Object-Oriented Programming (OOP) lets us organize our code to match how we think about real-world things. It's like creating a digital version of objects from the real world:

- A **car** has **properties** (color, make, model) and can perform **actions** (accelerate, brake)
- A **user account** has **properties** (username, email, password) and can perform **actions** (login, logout)
- A **shopping cart** has **properties** (items, total price) and can perform **actions** (add item, checkout)

In Python, OOP gives us a way to bundle related data and functions together into a single unit called an **object**. This makes our code more organized, reusable, and easier to understand.

### Why Use OOP? A Real-World Example

Let's say you're building a food delivery app. Without OOP, tracking all the information might look like:

```python
# Without OOP - everything is separate
user_names = ["Alice", "Bob"]
user_addresses = ["123 Main St", "456 Oak Ave"]
user_payment_methods = [["Credit Card", "PayPal"], ["Credit Card"]]

restaurant_names = ["Pasta Place", "Burger Joint"]
restaurant_menus = [{"Spaghetti": 12.99, "Lasagna": 14.99}, {"Cheeseburger": 8.99, "Fries": 3.99}]
restaurant_ratings = [4.5, 3.8]

# Functions that have to be careful about which list and index to use
def place_order(user_idx, restaurant_idx, items):
    print(f"{user_names[user_idx]} ordered {items} from {restaurant_names[restaurant_idx]}")
```

With OOP, each entity becomes a coherent unit:

```python
# With OOP - everything is organized
class User:
    def __init__(self, name, address):
        self.name = name
        self.address = address
        self.payment_methods = []
    
    def add_payment_method(self, method):
        self.payment_methods.append(method)
    
    def place_order(self, restaurant, items):
        print(f"{self.name} ordered {items} from {restaurant.name}")

class Restaurant:
    def __init__(self, name):
        self.name = name
        self.menu = {}
        self.rating = 0
    
    def add_menu_item(self, item, price):
        self.menu[item] = price
```

For JavaScript developers, Python's OOP system will feel both familiar and different. While both languages support object-oriented concepts, Python's implementation is more formalized, with explicit class definitions and inheritance models.

## Classes and Objects: The Foundation

### Understanding Classes

Think of a class as a blueprint or template. Just like an architect's blueprint isn't the actual house but contains the plans for building one, a class isn't the actual object but contains the plans for creating one.

In real-world terms:
- If "Car" is a class, then "my Honda Civic" is an object (or instance) of that class
- If "User" is a class, then "John's account" is an object of that class

A class defines:
1. What **data** the object will contain (attributes)
2. What **actions** the object can perform (methods)

Let's use a real-world example of a Car class:

```python
class Car:
    """A simple class representing a car"""
    
    def __init__(self, make, model, year):
        """Initialize car attributes"""
        self.make = make
        self.model = model
        self.year = year
        self.odometer_reading = 0
        
    def get_descriptive_name(self):
        """Return a neatly formatted descriptive name"""
        long_name = f"{self.year} {self.make} {self.model}"
        return long_name.title()
    
    def read_odometer(self):
        """Print the car's mileage"""
        print(f"This car has {self.odometer_reading} miles on it.")
        
    def update_odometer(self, mileage):
        """
        Set the odometer reading to the given value.
        Reject the change if it attempts to roll the odometer back.
        """
        if mileage >= self.odometer_reading:
            self.odometer_reading = mileage
        else:
            print("You can't roll back an odometer!")
```

Let's break down this code line by line:

1. `class Car:` - This line declares a new class named Car. Just like we use `function` to define a function, we use `class` to define a class in Python.

2. `def __init__(self, make, model, year):` - This is a special method (called a constructor) that runs automatically when we create a new Car object. 
   - The `self` parameter refers to the object being created
   - The other parameters (`make`, `model`, `year`) are values we need to provide when creating a car

3. The lines inside `__init__` set up the initial attributes:
   - `self.make = make` stores the car's make (like Toyota or Honda)
   - `self.model = model` stores the car's model (like Corolla or Civic)
   - `self.year = year` stores the manufacturing year
   - `self.odometer_reading = 0` sets the initial mileage to 0

4. `def get_descriptive_name(self):` - This is a method that returns a formatted string describing the car. Methods are just functions that belong to a class.

5. `def read_odometer(self):` - This method prints the current mileage.

6. `def update_odometer(self, mileage):` - This method updates the mileage but has validation logic to prevent "rolling back" the odometer (which would be fraudulent in real life).

### Creating and Using Objects

Once you've defined a class, you can create instances (objects) from it. Think of it like using the blueprint to build an actual house:

```python
# Create a car instance
my_car = Car('toyota', 'corolla', 2022)
print(my_car.get_descriptive_name())  # Output: 2022 Toyota Corolla

# Access and modify attributes
my_car.read_odometer()  # Output: This car has 0 miles on it.
my_car.update_odometer(23500)
my_car.read_odometer()  # Output: This car has 23500 miles on it.
```

Here's what's happening in this example:

1. `my_car = Car('toyota', 'corolla', 2022)` creates a new Car object:
   - We're passing 'toyota' as the make, 'corolla' as the model, and 2022 as the year
   - Python automatically calls the `__init__` method to set up the new object
   - The new car object is stored in the variable `my_car`

2. `my_car.get_descriptive_name()` calls the method we defined to get a formatted description of the car.

3. `my_car.read_odometer()` calls the method to display the current mileage (initially 0).

4. `my_car.update_odometer(23500)` calls our method to change the mileage to 23,500.

5. `my_car.read_odometer()` shows the updated mileage.

The power here is that we can create as many car objects as we want:

```python
# Create multiple cars from the same class blueprint
my_car = Car('toyota', 'corolla', 2022)
your_car = Car('honda', 'civic', 2021)
rental_car = Car('ford', 'mustang', 2023)

# Each car is a separate object with its own data
print(my_car.get_descriptive_name())   # 2022 Toyota Corolla
print(your_car.get_descriptive_name()) # 2021 Honda Civic
print(rental_car.get_descriptive_name()) # 2023 Ford Mustang

# Changing one car doesn't affect the others
my_car.update_odometer(10000)
my_car.read_odometer()    # This car has 10000 miles on it.
your_car.read_odometer()  # This car has 0 miles on it. (unchanged)
```

### Real-Life Example: E-commerce Product System

Now let's see how OOP can solve real-world problems by building a simple e-commerce product management system. Imagine you're creating an online store and need to track products, inventory, reviews, and pricing.

```python
class Product:
    """A class representing an e-commerce product"""
    
    def __init__(self, name, price, category, stock=0):
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock
        self.reviews = []
        self.rating = 0
        self.is_active = True
        
    def add_stock(self, quantity):
        """Add stock to the product inventory"""
        if quantity > 0:
            self.stock += quantity
            print(f"Added {quantity} items. New stock: {self.stock}")
            return True
        return False
    
    def remove_stock(self, quantity):
        """Remove stock when purchases are made"""
        if 0 < quantity <= self.stock:
            self.stock -= quantity
            print(f"Removed {quantity} items. Remaining stock: {self.stock}")
            
            # Automatically deactivate product if out of stock
            if self.stock == 0:
                self.is_active = False
                print(f"Product {self.name} is now out of stock and deactivated.")
            return True
        else:
            print("Invalid quantity or insufficient stock!")
            return False
    
    def add_review(self, user, rating, comment=""):
        """Add a customer review and update average rating"""
        if not 1 <= rating <= 5:
            print("Rating must be between 1 and 5")
            return False
        
        self.reviews.append({"user": user, "rating": rating, "comment": comment})
        
        # Recalculate average rating
        total = sum(review["rating"] for review in self.reviews)
        self.rating = total / len(self.reviews)
        
        print(f"Review added. New average rating: {self.rating:.1f}")
        return True
    
    def apply_discount(self, percentage):
        """Apply a discount to the product"""
        if 0 < percentage < 100:
            discount_amount = self.price * (percentage / 100)
            self.price -= discount_amount
            print(f"Applied {percentage}% discount. New price: ${self.price:.2f}")
            return True
        else:
            print("Invalid discount percentage")
            return False
    
    def __str__(self):
        """String representation of the product"""
        status = "Active" if self.is_active else "Inactive"
        return f"{self.name} - ${self.price:.2f} - {self.category} - {status} - Rating: {self.rating:.1f}/5.0"
```

Let's understand what's happening in this e-commerce example:

1. **Class Definition**: We define a `Product` class that represents items we sell in our online store.

2. **Constructor Method** (`__init__`): When creating a new product, we set its initial properties:
   - Basic details like name, price, and category
   - Initial stock quantity (defaults to 0 if not specified)
   - An empty list for storing reviews
   - Default rating of 0
   - Active status (available for purchase)

3. **Inventory Management Methods**:
   - `add_stock()`: Increases product inventory (like when we receive a shipment)
   - `remove_stock()`: Decreases inventory when items are sold
   - The product automatically becomes "inactive" when stock reaches zero

4. **Customer Feedback Method**:
   - `add_review()`: Stores customer reviews and recalculates the average rating
   - Validates that ratings are between 1 and 5 stars

5. **Pricing Method**:
   - `apply_discount()`: Calculates and applies a percentage discount
   - Includes validation to prevent invalid discount values

6. **String Representation** (`__str__`):
   - Provides a human-readable description of the product when printed

Here's how we would use this class in our e-commerce application:

```python
# Create a new product (our store just got MacBook Pro laptops in stock)
laptop = Product("MacBook Pro", 1299.99, "Electronics", 10)
print(laptop)  # MacBook Pro - $1299.99 - Electronics - Active - Rating: 0.0/5.0

# We received more inventory from our supplier
laptop.add_stock(5)  # Added 5 items. New stock: 15

# A customer purchased 2 laptops
laptop.remove_stock(2)  # Removed 2 items. Remaining stock: 13

# Customers leave reviews after their purchase
laptop.add_review("Alex", 4, "Great laptop, but expensive")  # Review added. New average rating: 4.0
laptop.add_review("Taylor", 5, "Best laptop I've ever owned")  # Review added. New average rating: 4.5

# We decide to run a sale on MacBooks
laptop.apply_discount(10)  # Applied 10% discount. New price: $1169.99

# Check the current product status after all these changes
print(laptop)  # MacBook Pro - $1169.99 - Electronics - Active - Rating: 4.5/5.0
```

Notice how our Product class bundles together all the data and behaviors that a product should have. Without OOP, we'd need separate variables for each product property and separate functions for each action, making the code much harder to maintain.

This is the real power of OOP - it lets us model things in our code the same way we think about them in the real world. Each product is a self-contained unit with its own properties and behaviors.
```

## Special Methods (Magic Methods)

Python has special powers hidden in its classes! These are called "magic methods" or "dunder methods" (dunder = double underscore), and they let you customize how your objects behave with Python's built-in operations.

Think of magic methods as a way to teach your objects how to respond to common Python operations:

- Want to make your object work with the `print()` function? Use `__str__`
- Want to use your object with the `len()` function? Use `__len__`  
- Want to compare your objects with `==`? Use `__eq__`

### Real-World Example: Creating a Book Class

Let's create a Book class that acts like a real book. We'll use magic methods to make our Book objects behave naturally in Python:

```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
        self.current_page = 1
    
    # Makes print(book) show something meaningful
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    # How the book appears in the debugger or when using repr()
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', {self.pages})"
    
    # Makes len(book) return the number of pages
    def __len__(self):
        return self.pages
    
    # Determines if the book is considered "truthy" in if statements
    def __bool__(self):
        # A book with 0 pages is considered False
        return self.pages > 0
    
    # Makes book1 == book2 compare titles and authors
    def __eq__(self, other):
        if not isinstance(other, Book):
            return False
        return (self.title == other.title and 
                self.author == other.author)
    
    # Support for "with" statement (like opening a file)
    def __enter__(self):
        print(f"Opening {self.title}...")
        return self
    
    # Closing part of the "with" statement
    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"Closing {self.title}.")
        
    # Support for using the book in a for loop
    def __iter__(self):
        return self
    
    # Get the next page when iterating
    def __next__(self):
        if self.current_page <= self.pages:
            page_content = f"Reading page {self.current_page} of {self.title}"
            self.current_page += 1
            return page_content
        else:
            self.current_page = 1  # Reset for next time
            raise StopIteration


# Let's see these magic methods in action!

book = Book('Python Mastery', 'John Smith', 350)
empty_book = Book('Empty Journal', 'No Author', 0)  # A book with 0 pages

# 1. String Representation
# When we print the book, Python calls __str__ behind the scenes
print(book)  # Output: Python Mastery by John Smith

# When we need the "official" representation, Python calls __repr__
print(repr(book))  # Output: Book('Python Mastery', 'John Smith', 350)
# This is useful for debugging or recreating the object

# 2. Using with Built-in Functions
# The len() function calls our __len__ method
print(f"This book has {len(book)} pages")  # Output: This book has 350 pages

# 3. Truth Value Testing
# In if statements, Python calls __bool__ to determine if an object is "truthy"
if book:
    print("The book exists and has pages")  # This will print
    
if not empty_book:
    print("This book is empty")  # This will print because empty_book has 0 pages

# 4. Object Comparison
# The == operator calls our __eq__ method
book2 = Book('Python Mastery', 'John Smith', 300)  # Different page count!
book3 = Book('JavaScript Basics', 'John Smith', 350)  # Different title!

print(book == book2)  # True - our __eq__ only compares title and author
print(book == book3)  # False - different title
print(book == "Not a book")  # False - different type

# 5. Context Manager (with statement)
# Similar to how we use "with open()" for files
with book as b:
    print(f"I'm reading {b.title} inside a with block")
# Output:
# Opening Python Mastery...
# I'm reading Python Mastery inside a with block
# Closing Python Mastery.
# (Python automatically calls __enter__ at the start and __exit__ at the end)

# 6. Iteration
# This uses both __iter__ and __next__ to let us read the book page by page
print("\nLet's read the first 3 pages:")
pages_read = 0
for page_content in book:
    print(page_content)
    pages_read += 1
    if pages_read >= 3:  # Just read first 3 pages
        break
# Output:
# Let's read the first 3 pages:
# Reading page 1 of Python Mastery
# Reading page 2 of Python Mastery
# Reading page 3 of Python Mastery

print("\nThe amazing thing is that we're using our Book object with normal Python syntax!")
print("These magic methods let our custom objects behave like built-in Python types.")
# ...
# Reading page 5 of Python Mastery
```

## Inheritance and Polymorphism

### Inheritance: Creating Object Hierarchies

Imagine you're designing a vehicle simulation program. You have cars, motorcycles, trucks, and boats. They share many common features (they all have a make, model, and year), but they also have unique characteristics (cars have doors, motorcycles can do wheelies, etc.).

Instead of repeating the common code in each class, inheritance lets one class "inherit" the properties and behaviors of another class. This follows the real-world model where objects can be classified in hierarchies (a car IS A vehicle, a motorcycle IS A vehicle).

**Inheritance is like saying: "This new thing is a type of that existing thing, but with some additions or changes."**

Let's build a vehicle hierarchy to see how this works:

```python
# Parent class (also called base class or superclass)
class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.is_running = False
    
    def start_engine(self):
        self.is_running = True
        print(f"The {self.make} {self.model}'s engine is now running.")
    
    def stop_engine(self):
        self.is_running = False
        print(f"The {self.make} {self.model}'s engine is now off.")
    
    def get_info(self):
        return f"{self.year} {self.make} {self.model}"


# Child class (also called derived class or subclass)
class Car(Vehicle):
    def __init__(self, make, model, year, fuel_type="Gasoline"):
        # Call the parent class's __init__ method first
        super().__init__(make, model, year)
        
        # Then add car-specific attributes
        self.fuel_type = fuel_type
        self.doors = 4
        self.wheels = 4
    
    # Override (replace) a parent method with a car-specific version
    def get_info(self):
        basic_info = super().get_info()  # Call the parent version first
        return f"{basic_info} - {self.fuel_type} - {self.doors} doors"
    
    # Add new methods specific to cars
    def honk(self):
        print("Beep! Beep!")


# Another child class with different properties
class Motorcycle(Vehicle):
    def __init__(self, make, model, year, has_sidecar=False):
        super().__init__(make, model, year)
        self.has_sidecar = has_sidecar
        self.wheels = 2 if not has_sidecar else 3
    
    def get_info(self):
        basic_info = super().get_info()
        sidecar_info = "with sidecar" if self.has_sidecar else "no sidecar"
        return f"{basic_info} - {sidecar_info} - {self.wheels} wheels"
    
    def wheelie(self):
        if not self.has_sidecar:
            print("Performing a wheelie! Be careful!")
        else:
            print("Cannot perform a wheelie with a sidecar!")
```

Let's break down what's happening here:

1. We start with a `Vehicle` class that has the common attributes and methods all vehicles share.

2. The `Car` class inherits from Vehicle using `class Car(Vehicle):` syntax:
   - It inherits all attributes and methods from Vehicle
   - It adds car-specific attributes like `fuel_type` and `doors`
   - It overrides the `get_info` method to include car-specific details
   - It adds a new method `honk` that only cars have

3. The `Motorcycle` class also inherits from Vehicle:
   - It adds motorcycle-specific attributes like `has_sidecar`
   - It has its own version of `get_info`
   - It adds a unique method `wheelie` that only motorcycles have

4. Both child classes use `super()` to call the parent class's methods when needed.

Now let's see inheritance in action:

```python
# Let's create some vehicles!
tesla = Car("Tesla", "Model S", 2023, "Electric")
harley = Motorcycle("Harley-Davidson", "Street Glide", 2022)

print("\n--- Using inherited methods ---")
# Both cars and motorcycles inherit the start_engine method from Vehicle
tesla.start_engine()    # Output: The Tesla Model S's engine is now running.
harley.start_engine()   # Output: The Harley-Davidson Street Glide's engine is now running.

print("\n--- Using overridden methods ---")
# Both classes customize the get_info method with their own versions
print(f"Car info: {tesla.get_info()}")     
# Output: Car info: 2023 Tesla Model S - Electric - 4 doors

print(f"Motorcycle info: {harley.get_info()}")  
# Output: Motorcycle info: 2022 Harley-Davidson Street Glide - no sidecar - 2 wheels

print("\n--- Using class-specific methods ---")
# Only Car objects have the honk method
tesla.honk()            # Output: Beep! Beep!

# Only Motorcycle objects have the wheelie method
harley.wheelie()        # Output: Performing a wheelie! Be careful!

# This demonstrates the power of inheritance:
print("\n--- The benefits of inheritance ---")
print("1. Code reuse: Both vehicles can start and stop their engines using the same code")
print("2. Specialization: Each vehicle type can add its own unique features")
print("3. Polymorphism: We can treat different vehicle types in similar ways")
```

The beauty of inheritance is that it mimics how we naturally categorize things in the real world. Just as a car and a motorcycle are both types of vehicles in real life, our Car and Motorcycle classes both inherit from the Vehicle class in our code.
```

### Multi-level Inheritance

```python
# Grandparent class
class Device:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.powered_on = False
    
    def power_toggle(self):
        self.powered_on = not self.powered_on
        status = "on" if self.powered_on else "off"
        print(f"Device is now {status}")
    
    def get_specs(self):
        return f"{self.brand} {self.model}"


# Parent class
class Computer(Device):
    def __init__(self, brand, model, cpu, ram_gb):
        super().__init__(brand, model)
        self.cpu = cpu
        self.ram_gb = ram_gb
        self.software = []
    
    def install_software(self, software_name):
        if self.powered_on:
            self.software.append(software_name)
            print(f"Installed {software_name}")
        else:
            print("Cannot install software. Computer is powered off.")
    
    def get_specs(self):
        basic_specs = super().get_specs()
        return f"{basic_specs} - CPU: {self.cpu} - RAM: {self.ram_gb}GB"


# Child class
class Laptop(Computer):
    def __init__(self, brand, model, cpu, ram_gb, weight_kg, battery_hours):
        super().__init__(brand, model, cpu, ram_gb)
        self.weight_kg = weight_kg
        self.battery_hours = battery_hours
        self.is_lid_open = False
    
    def open_lid(self):
        self.is_lid_open = True
        print("Laptop lid opened")
    
    def close_lid(self):
        self.is_lid_open = False
        print("Laptop lid closed. Entering sleep mode.")
        
    def get_specs(self):
        computer_specs = super().get_specs()
        return f"{computer_specs} - Weight: {self.weight_kg}kg - Battery: {self.battery_hours}hrs"


# Create and use multi-level inheritance
macbook = Laptop("Apple", "MacBook Pro", "M2", 16, 1.4, 10)

# Use methods from all levels
macbook.power_toggle()  # From Device: Device is now on
macbook.install_software("VS Code")  # From Computer: Installed VS Code
macbook.open_lid()  # From Laptop: Laptop lid opened
print(macbook.get_specs())  # Uses overridden method from all levels
# Output: Apple MacBook Pro - CPU: M2 - RAM: 16GB - Weight: 1.4kg - Battery: 10hrs
```

### Polymorphism: "Many Forms, One Interface"

Polymorphism is a fancy word for a simple but powerful idea: **different objects can respond to the same method call in their own way**.

Think of it like this: When you press the power button on a TV, computer, or phone, they all respond to the same action (pressing power), but each device does something different. This is polymorphism in the real world.

In code, polymorphism allows us to:
1. Write flexible functions that work with different object types
2. Create consistent interfaces across different classes
3. Process collections of different objects in the same way

Let's see a practical example with different shapes. We want to calculate the area and perimeter of circles, rectangles, and triangles:

```python
# Base class defining a common interface for all shapes
class Shape:
    def area(self):
        """Calculate area of the shape"""
        # This is a placeholder that subclasses will override
        pass
    
    def perimeter(self):
        """Calculate perimeter of the shape"""
        # This is a placeholder that subclasses will override
        pass
    
    def describe(self):
        """Return description of the shape"""
        return "This is a generic shape"


# Now let's create specific shape classes that implement this interface
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2  # Area = πr²
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius  # Circumference = 2πr
    
    def describe(self):
        return f"Circle with radius {self.radius}"


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height  # Area = width × height
    
    def perimeter(self):
        return 2 * (self.width + self.height)  # Perimeter = 2(width + height)
    
    def describe(self):
        return f"Rectangle with width {self.width} and height {self.height}"


class Triangle(Shape):
    def __init__(self, a, b, c):
        # a, b, c are the lengths of the three sides
        self.a = a
        self.b = b
        self.c = c
    
    def area(self):
        # Heron's formula for area of a triangle
        s = (self.a + self.b + self.c) / 2  # Semi-perimeter
        return (s * (s - self.a) * (s - self.b) * (s - self.c)) ** 0.5
    
    def perimeter(self):
        return self.a + self.b + self.c  # Sum of all sides
    
    def describe(self):
        return f"Triangle with sides {self.a}, {self.b}, and {self.c}"


# Now let's demonstrate polymorphism in action
def print_shape_info(shape):
    """
    This function works with ANY class that inherits from Shape
    and implements the required methods - demonstrating polymorphism
    
    This is the power of polymorphism - the function doesn't need to know
    what specific type of shape it's working with. It only needs to know
    that the object has the methods defined in the Shape interface.
    """
    print(f"Description: {shape.describe()}")
    print(f"Area: {shape.area():.2f}")
    print(f"Perimeter: {shape.perimeter():.2f}")
    print()


# Create different shapes - notice how we create objects of different classes
shapes = [
    Circle(5),           # A circle with radius 5
    Rectangle(4, 6),     # A rectangle with width 4 and height 6
    Triangle(3, 4, 5)    # A triangle with sides 3, 4, and 5
]

# Process all shapes using the same function
# This is polymorphism in action - the same function works with different types
for shape in shapes:
    print_shape_info(shape)  # The function works regardless of the specific shape type

"""
Output:
Description: Circle with radius 5
Area: 78.54
Perimeter: 31.42

Description: Rectangle with width 4 and height 6
Area: 24.00
Perimeter: 20.00

Description: Triangle with sides 3, 4, and 5
Area: 6.00
Perimeter: 12.00
"""

# Real-world benefit: If we create a new shape class like Hexagon that follows 
# the Shape interface, the print_shape_info function will work with it too, 
# without requiring any changes to the function itself!
```

## Advanced Concepts

### Multiple Inheritance

Python supports multiple inheritance, where a class can inherit from more than one parent class:

```python
class Employee:
    def __init__(self, name, employee_id):
        self.name = name
        self.employee_id = employee_id
    
    def check_in(self):
        print(f"Employee {self.name} checked in.")
    
    def check_out(self):
        print(f"Employee {self.name} checked out.")
    
    def get_id(self):
        return f"Employee ID: {self.employee_id}"


class Engineer:
    def __init__(self, specialization):
        self.specialization = specialization
    
    def solve_problem(self):
        print(f"Solving a problem using {self.specialization} skills.")
    
    def get_specialization(self):
        return f"Specialization: {self.specialization}"
        
# Unlike languages like Java that only support single inheritance,
# Python allows a class to inherit from multiple parent classes


class SoftwareEngineer(Employee, Engineer):
    """
    This class demonstrates multiple inheritance by inheriting from both Employee and Engineer
    
    Think of it as: a SoftwareEngineer IS-A Employee AND IS-A Engineer
    This allows it to have all the attributes and behaviors of both parent classes
    """
    def __init__(self, name, employee_id, specialization, programming_language):
        # We need to initialize both parent classes
        Employee.__init__(self, name, employee_id)
        Engineer.__init__(self, specialization)
        
        # Add attributes specific to SoftwareEngineer
        self.programming_language = programming_language
    
    def write_code(self):
        print(f"Writing code in {self.programming_language}.")
    
    def get_details(self):
        # Access methods from both parent classes - this is the power of multiple inheritance
        return f"{self.get_id()}, {self.get_specialization()}, Language: {self.programming_language}"


# Let's see multiple inheritance in action with a real-world example
dev = SoftwareEngineer("Alice Smith", "E12345", "Backend", "Python")

# We can use methods that come from the Employee class
dev.check_in()  # Output: Employee Alice Smith checked in.

# We can use methods that come from the Engineer class
dev.solve_problem()  # Output: Solving a problem using Backend skills.

# And we can use methods specific to SoftwareEngineer
dev.write_code()  # Output: Writing code in Python.

# This method combines features from both parent classes - showing the power of multiple inheritance
print(dev.get_details())  # Output: Employee ID: E12345, Specialization: Backend, Language: Python

# Real-world benefit: Multiple inheritance allows us to build complex classes that
# combine behaviors from different parent classes, creating more reusable and
# modular code
```

### Method Resolution Order (MRO)

When using multiple inheritance, Python follows a specific order called Method Resolution Order (MRO) to resolve method calls:

```python
class A:
    def show(self):
        print("This is method from A")
    
    def hello(self):
        print("Hello from A")


class B(A):
    # This class inherits from A, but overrides the show method
    def show(self):
        print("This is method from B")


class C(A):
    def show(self):
        print("This is method from C")


class D(B, C):
    """
    This class inherits from both B and C.
    The order of inheritance is important! Python will look for methods
    in the order of inheritance (left to right).
    """
    pass  # No new methods defined here, just inheriting from B and C


class E(C, B):
    """
    This class also inherits from both B and C but in the opposite order.
    This will affect the Method Resolution Order (MRO).
    """
    pass


# Python's MRO follows the C3 linearization algorithm
# We can see the actual method resolution order using the mro() method
print("Class D's Method Resolution Order:")
print(D.mro())
# Output: [<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]
# This means Python will look for methods in D first, then B, then C, then A, then object

print("\nClass E's Method Resolution Order:")
print(E.mro())
# Output: [<class '__main__.E'>, <class '__main__.C'>, <class '__main__.B'>, <class '__main__.A'>, <class 'object'>]
# Notice the different order! Here C comes before B

# Let's demonstrate how method resolution works in practice
print("\nDemonstrating method resolution with class D:")
d = D()
d.show()  # Output: "This is method from B" (B comes before C in D's MRO)
d.hello() # Output: "Hello from A" (method is found in class A)

print("\nDemonstrating method resolution with class E:")
e = E()
e.show()  # Output: "This is method from C" (C comes before B in E's MRO)
e.hello() # Output: "Hello from A" (same as before, method is found in class A)

# Real-world takeaway: The order of inheritance matters in Python!
# Be careful when designing class hierarchies with multiple inheritance
```

### Real-Life Example: E-Commerce System

Now let's build a more complete e-commerce system using OOP principles. This example will demonstrate how OOP concepts can be applied to model a real-world application:

```python
from abc import ABC, abstractmethod  # We'll use abstract classes
from datetime import datetime


class User:
    """
    Represents a user in the e-commerce system
    
    This is a base class that handles user information and account status
    """
    def __init__(self, user_id, name, email):
        self.user_id = user_id  # Unique identifier for the user
        self.name = name        # User's full name
        self.email = email      # User's email address
        self.is_active = True   # Flag to track if account is active
        self.created_at = datetime.now()  # Timestamp when account was created
    
    def __str__(self):
        # String representation of the user for debugging and display
        return f"User: {self.name} ({self.email})"
    
    def deactivate(self):
        # Method to deactivate a user account
        self.is_active = False
        print(f"User {self.name} has been deactivated.")
    
    def reactivate(self):
        # Method to reactivate a user account
        self.is_active = True
        print(f"User {self.name} has been reactivated.")


class Address:
    """
    Represents a physical address
    
    This class is used for both shipping and billing addresses
    """
    def __init__(self, street, city, state, postal_code, country):
        # Store all components of an address
        self.street = street
        self.city = city
        self.state = state
        self.postal_code = postal_code
        self.country = country
    
    def __str__(self):
        # String representation of the address
        return f"{self.street}, {self.city}, {self.state} {self.postal_code}, {self.country}"
    
    def get_shipping_label(self, recipient_name):
        """
        Creates a formatted shipping label for this address
        
        This shows how a class can provide different representations
        of its data depending on the context
        """
        return f"{recipient_name}\n{self.street}\n{self.city}, {self.state} {self.postal_code}\n{self.country}"


class Customer(User):
    """
    Represents a customer in the e-commerce system
    
    Inherits from User and adds customer-specific functionality
    This demonstrates inheritance - a Customer IS-A User with additional features
    """
    def __init__(self, user_id, name, email):
        # Initialize the parent class first
        super().__init__(user_id, name, email)
        
        # Add customer-specific attributes
        self.addresses = []               # List to store customer addresses
        self.default_address_index = None # Index of default address in the list
        self.cart = ShoppingCart()        # Each customer has their own shopping cart
        self.orders = []                  # List to store customer orders
    
    def add_address(self, address):
        """Add a new address to the customer's address book"""
        self.addresses.append(address)
        
        # If this is the first address, make it the default
        if len(self.addresses) == 1:
            self.default_address_index = 0
            
        return len(self.addresses) - 1  # Return the index of the added address
    
    def set_default_address(self, address_index):
        """Set which address should be the default for shipping"""
        # Validate that the address index exists
        if 0 <= address_index < len(self.addresses):
            self.default_address_index = address_index
            return True
        return False
    
    def get_default_address(self):
        """Get the customer's default address"""
        if self.default_address_index is not None:
            return self.addresses[self.default_address_index]
        return None
    
    def add_to_cart(self, product, quantity=1):
        """
        Add a product to the customer's shopping cart
        
        This method delegates to the cart object - demonstrating composition
        and separation of concerns
        """
        return self.cart.add_item(product, quantity)
    
    def remove_from_cart(self, product_id):
        """Remove a product from the customer's shopping cart"""
        return self.cart.remove_item(product_id)
    
    def checkout(self, payment_method, shipping_address=None):
        """
        Process checkout and create an order
        
        This shows how a complex operation can be broken down into steps,
        with validation at each stage
        """
        # Validate the cart isn't empty
        if not self.cart.items:
            print("Cannot checkout with an empty cart.")
            return None
        
        # Use provided address or default address
        address = shipping_address or self.get_default_address()
        if not address:
            print("No shipping address provided.")
            return None
        
        # Create a new order with a copy of the cart items
        # We use .copy() to ensure the cart and order have separate copies
        order = Order(self, self.cart.items.copy(), payment_method, address)
        self.orders.append(order)
        
        # Clear the cart after successful order creation
        self.cart.clear()
        print(f"Order #{order.order_id} placed successfully!")
        return order


class ShoppingCart:
    """
    Represents a shopping cart that holds products
    
    This class demonstrates composition - a Customer HAS-A ShoppingCart,
    rather than inheriting from it
    """
    def __init__(self):
        # Using a dictionary for O(1) lookups by product_id
        # Each entry contains the product object and quantity
        self.items = {}  # product_id -> {"product": product, "quantity": quantity}
    
    def add_item(self, product, quantity=1):
        """
        Add a product to the cart
        
        Includes validation to check product availability and stock levels
        """
        # First validate that the product can be added
        if not product.is_active or product.stock < quantity:
            print(f"Cannot add {product.name}. Product unavailable or insufficient stock.")
            return False
        
        # Update existing item quantity or add new item
        if product.id in self.items:
            # If product already in cart, increase quantity
            self.items[product.id]["quantity"] += quantity
        else:
            # If this is a new product in the cart
            self.items[product.id] = {"product": product, "quantity": quantity}
        
        print(f"Added {quantity} x {product.name} to cart.")
        return True
    
    def remove_item(self, product_id):
        """
        Remove a product completely from the cart
        """
        if product_id in self.items:
            product_name = self.items[product_id]["product"].name
            # Use del to remove the dictionary entry
            del self.items[product_id]
            print(f"Removed {product_name} from cart.")
            return True
        return False
    
    def update_quantity(self, product_id, quantity):
        """
        Update the quantity of an existing product in the cart
        """
        if product_id in self.items:
            # Handle special case: removing item if quantity <= 0
            if quantity <= 0:
                return self.remove_item(product_id)
            
            # Get the product and check if we have enough stock
            product = self.items[product_id]["product"]
            if product.stock < quantity:
                print(f"Cannot update {product.name}. Insufficient stock.")
                return False
            
            # Update the quantity
            self.items[product_id]["quantity"] = quantity
            print(f"Updated {product.name} quantity to {quantity}.")
            return True
        return False
    
    def clear(self):
        """
        Clear all items from the cart (e.g., after checkout)
        """
        self.items = {}  # Create a new empty dictionary
        print("Cart has been cleared.")
    
    def get_total(self):
        """
        Calculate the total price of all items in the cart
        """
        total = 0
        # Iterate through all items and sum up (price × quantity)
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            total += product.price * quantity
        return total
    
    def __str__(self):
        """
        String representation of the cart - useful for displaying to the user
        """
        if not self.items:
            return "Shopping Cart: Empty"
        
        result = "Shopping Cart:\n"
        # Format each item with its details
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            subtotal = product.price * quantity
            result += f"  {quantity} x {product.name} (${product.price:.2f} each) = ${subtotal:.2f}\n"
        
        result += f"Total: ${self.get_total():.2f}"
        return result


class Product:
    next_id = 1  # Class variable to generate product IDs
    
    def __init__(self, name, price, category, stock=0):
        self.id = Product.next_id
        Product.next_id += 1
        
        self.name = name
        self.price = price
        self.category = category
        self.stock = stock
        self.reviews = []
        self.rating = 0
        self.is_active = True
    
    def add_stock(self, quantity):
        if quantity > 0:
            self.stock += quantity
            print(f"Added {quantity} items. New stock: {self.stock}")
            return True
        return False
    
    def remove_stock(self, quantity):
        if 0 < quantity <= self.stock:
            self.stock -= quantity
            print(f"Removed {quantity} items. Remaining stock: {self.stock}")
            
            # Automatically deactivate product if out of stock
            if self.stock == 0:
                self.is_active = False
                print(f"Product {self.name} is now out of stock and deactivated.")
            return True
        else:
            print("Invalid quantity or insufficient stock!")
            return False
    
    def add_review(self, user, rating, comment=""):
        if not 1 <= rating <= 5:
            print("Rating must be between 1 and 5")
            return False
        
        self.reviews.append({"user": user, "rating": rating, "comment": comment})
        
        # Recalculate average rating
        total = sum(review["rating"] for review in self.reviews)
        self.rating = total / len(self.reviews)
        
        print(f"Review added. New average rating: {self.rating:.1f}")
        return True
    
    def __str__(self):
        status = "Active" if self.is_active else "Inactive"
        return f"{self.name} - ${self.price:.2f} - {self.category} - {status} - Rating: {self.rating:.1f}/5.0"


class PaymentMethod(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass
    
    @abstractmethod
    def get_description(self):
        pass


class CreditCard(PaymentMethod):
    def __init__(self, card_number, expiration_date, cvv):
        # In a real system, you'd never store full credit card details
        self.last_four = card_number[-4:]
        self.expiration_date = expiration_date
        # Store CVV securely (we'll just pretend here)
    
    def process_payment(self, amount):
        # In a real system, this would connect to a payment gateway
        print(f"Processing ${amount:.2f} payment via Credit Card ending in {self.last_four}")
        return True  # Assume success for this example
    
    def get_description(self):
        return f"Credit Card ending in {self.last_four}"


class PayPal(PaymentMethod):
    def __init__(self, email):
        self.email = email
    
    def process_payment(self, amount):
        # In a real system, this would connect to PayPal API
        print(f"Processing ${amount:.2f} payment via PayPal account {self.email}")
        return True  # Assume success for this example
    
    def get_description(self):
        return f"PayPal ({self.email})"


class Order:
    next_id = 10001  # Class variable to generate order IDs
    
    def __init__(self, customer, items, payment_method, shipping_address):
        self.order_id = Order.next_id
        Order.next_id += 1
        
        self.customer = customer
        self.items = items
        self.payment_method = payment_method
        self.shipping_address = shipping_address
        self.order_date = datetime.now()
        self.status = "Pending"
        
        # Calculate totals
        self.subtotal = self._calculate_subtotal()
        self.tax = self.subtotal * 0.08  # Assuming 8% tax
        self.shipping_cost = 5.99  # Flat rate shipping
        self.total = self.subtotal + self.tax + self.shipping_cost
        
        # Process payment and update product inventory
        self._process_order()
    
    def _calculate_subtotal(self):
        subtotal = 0
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            subtotal += product.price * quantity
        return subtotal
    
    def _process_order(self):
        # Process payment
        payment_success = self.payment_method.process_payment(self.total)
        
        if payment_success:
            # Update inventory
            for item_data in self.items.values():
                product = item_data["product"]
                quantity = item_data["quantity"]
                product.remove_stock(quantity)
            
            self.status = "Confirmed"
        else:
            self.status = "Payment Failed"
    
    def cancel(self):
        if self.status == "Confirmed":
            self.status = "Cancelled"
            
            # Restore inventory
            for item_data in self.items.values():
                product = item_data["product"]
                quantity = item_data["quantity"]
                product.add_stock(quantity)
            
            print(f"Order #{self.order_id} has been cancelled.")
            return True
        else:
            print(f"Cannot cancel order in {self.status} state.")
            return False
    
    def get_receipt(self):
        receipt = f"ORDER #{self.order_id}\n"
        receipt += f"Date: {self.order_date.strftime('%Y-%m-%d %H:%M')}\n"
        receipt += f"Status: {self.status}\n\n"
        receipt += f"Customer: {self.customer.name}\n"
        receipt += f"Shipping Address: {self.shipping_address}\n"
        receipt += f"Payment Method: {self.payment_method.get_description()}\n\n"
        receipt += "ITEMS:\n"
        
        for item_data in self.items.values():
            product = item_data["product"]
            quantity = item_data["quantity"]
            subtotal = product.price * quantity
            receipt += f"  {quantity} x {product.name} (${product.price:.2f} each) = ${subtotal:.2f}\n"
        
        receipt += f"\nSubtotal: ${self.subtotal:.2f}\n"
        receipt += f"Tax (8%): ${self.tax:.2f}\n"
        receipt += f"Shipping: ${self.shipping_cost:.2f}\n"
        receipt += f"TOTAL: ${self.total:.2f}\n"
        
        return receipt
    
    def __str__(self):
        return f"Order #{self.order_id} - {self.status} - ${self.total:.2f}"


# Demonstration of the e-commerce system
if __name__ == "__main__":
    # Create products
    laptop = Product("MacBook Pro", 1299.99, "Electronics", 10)
    headphones = Product("Sony WH-1000XM4", 349.99, "Electronics", 15)
    tshirt = Product("Cotton T-Shirt", 19.99, "Clothing", 50)
    
    # Create a customer
    alice = Customer("U1001", "Alice Johnson", "alice@example.com")
    
    # Add addresses
    home_address = Address("123 Main St", "Portland", "OR", "97201", "USA")
    work_address = Address("456 Business Ave", "Portland", "OR", "97204", "USA")
    
    alice.add_address(home_address)
    alice.add_address(work_address)
    alice.set_default_address(0)  # Set home address as default
    
    # Add items to cart
    alice.add_to_cart(laptop)
    alice.add_to_cart(headphones, 2)
    
    # View cart
    print(alice.cart)
    
    # Create payment method
    credit_card = CreditCard("4111111111111111", "12/25", "123")
    
    # Checkout
    order = alice.checkout(credit_card)
    
    # Print receipt
    if order:
        print("\nRECEIPT")
        print("=" * 40)
        print(order.get_receipt())
```

### Property Decorators

Property decorators provide a clean way to implement getters, setters, and deleters:

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
            raise ValueError("Temperature below absolute zero is not possible")
        self._celsius = value
    
    # Getter for a computed property
    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32
    
    # Setter for a computed property
    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9
    
    # Getter for another computed property
    @property
    def kelvin(self):
        return self._celsius + 273.15
    
    # Setter for another computed property
    @kelvin.setter
    def kelvin(self, value):
        self.celsius = value - 273.15


# Using the Temperature class
temp = Temperature()
print(f"Initial temperature: {temp.celsius}°C, {temp.fahrenheit}°F, {temp.kelvin}K")

# Set the temperature using Celsius
temp.celsius = 25
print(f"After setting Celsius: {temp.celsius}°C, {temp.fahrenheit}°F, {temp.kelvin}K")

# Set the temperature using Fahrenheit
temp.fahrenheit = 68
print(f"After setting Fahrenheit: {temp.celsius}°C, {temp.fahrenheit}°F, {temp.kelvin}K")

# Set the temperature using Kelvin
temp.kelvin = 300
print(f"After setting Kelvin: {temp.celsius}°C, {temp.fahrenheit}°F, {temp.kelvin}K")

# Try to set an impossible temperature
try:
    temp.celsius = -300  # Below absolute zero
except ValueError as e:
    print(f"Error: {e}")
```

## OOP Design Patterns in Python

### Singleton Pattern

```python
class DatabaseConnection:
    _instance = None
    
    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # Initialize the instance
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self, host='localhost', port=5432, username='admin', password='admin'):
        # Only initialize once
        if self._initialized:
            return
        
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.connection = None
        self._initialized = True
    
    def connect(self):
        if self.connection is None:
            print(f"Connecting to database at {self.host}:{self.port} as {self.username}")
            # In a real implementation, this would create an actual database connection
            self.connection = f"Connection to {self.host}:{self.port}"
        return self.connection
    
    def disconnect(self):
        if self.connection:
            print("Disconnecting from database")
            self.connection = None
    
    def execute_query(self, query):
        if not self.connection:
            self.connect()
        print(f"Executing query: {query}")
        # In a real implementation, this would execute the query on the connection
        return f"Result of {query}"


# Using the Singleton pattern
db1 = DatabaseConnection()
db1.connect()

db2 = DatabaseConnection(host='127.0.0.1')  # Different arguments won't create a new instance
print(f"db1 host: {db1.host}")  # Still 'localhost'
print(f"db2 host: {db2.host}")  # Also 'localhost'
print(f"Are db1 and db2 the same object? {db1 is db2}")  # True
```

### Factory Pattern

```python
# Abstract base class
class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
    
    def get_description(self):
        return f"{self.year} {self.make} {self.model}"


class Car(Vehicle):
    def __init__(self, make, model, year, doors=4):
        super().__init__(make, model, year)
        self.doors = doors
        self.vehicle_type = "Car"
    
    def get_description(self):
        return f"{super().get_description()}, {self.doors} doors"


class Motorcycle(Vehicle):
    def __init__(self, make, model, year, engine_size):
        super().__init__(make, model, year)
        self.engine_size = engine_size
        self.vehicle_type = "Motorcycle"
    
    def get_description(self):
        return f"{super().get_description()}, {self.engine_size}cc engine"


class Truck(Vehicle):
    def __init__(self, make, model, year, payload_capacity):
        super().__init__(make, model, year)
        self.payload_capacity = payload_capacity
        self.vehicle_type = "Truck"
    
    def get_description(self):
        return f"{super().get_description()}, {self.payload_capacity} lbs capacity"


# Factory class
class VehicleFactory:
    @staticmethod
    def create_vehicle(vehicle_type, make, model, year, **kwargs):
        if vehicle_type.lower() == 'car':
            return Car(make, model, year, kwargs.get('doors', 4))
        elif vehicle_type.lower() == 'motorcycle':
            return Motorcycle(make, model, year, kwargs.get('engine_size', 500))
        elif vehicle_type.lower() == 'truck':
            return Truck(make, model, year, kwargs.get('payload_capacity', 5000))
        else:
            raise ValueError(f"Unknown vehicle type: {vehicle_type}")


# Using the Factory pattern
factory = VehicleFactory()

vehicles = [
    factory.create_vehicle('car', 'Honda', 'Civic', 2023),
    factory.create_vehicle('motorcycle', 'Harley-Davidson', 'Sportster', 2022, engine_size=883),
    factory.create_vehicle('truck', 'Ford', 'F-150', 2023, payload_capacity=8000)
]

for vehicle in vehicles:
    print(f"Type: {vehicle.vehicle_type}, Description: {vehicle.get_description()}")
```

### Observer Pattern

```python
class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)
    
    def detach(self, observer):
        try:
            self._observers.remove(observer)
        except ValueError:
            pass
    
    def notify(self, *args, **kwargs):
        for observer in self._observers:
            observer.update(self, *args, **kwargs)


class StockMarket(Subject):
    def __init__(self):
        super().__init__()
        self._stocks = {}  # symbol -> price
    
    def add_stock(self, symbol, price):
        self._stocks[symbol] = price
    
    def update_stock(self, symbol, price):
        if symbol in self._stocks:
            old_price = self._stocks[symbol]
            self._stocks[symbol] = price
            self.notify(symbol=symbol, old_price=old_price, new_price=price)
            return True
        return False
    
    def get_stock_price(self, symbol):
        return self._stocks.get(symbol)


class Observer:
    def update(self, subject, *args, **kwargs):
        pass


class StockAnalyst(Observer):
    def __init__(self, name):
        self.name = name
    
    def update(self, subject, *args, **kwargs):
        symbol = kwargs.get('symbol')
        old_price = kwargs.get('old_price')
        new_price = kwargs.get('new_price')
        
        percent_change = ((new_price - old_price) / old_price) * 100
        direction = "up" if percent_change > 0 else "down"
        
        print(f"Analyst {self.name}: {symbol} has gone {direction} by {abs(percent_change):.2f}%")


class StockTrader(Observer):
    def __init__(self, name, threshold=5.0):
        self.name = name
        self.threshold = threshold  # Percentage change that triggers a trade
        self.positions = {}  # symbol -> quantity
    
    def buy(self, symbol, quantity):
        if symbol in self.positions:
            self.positions[symbol] += quantity
        else:
            self.positions[symbol] = quantity
        print(f"Trader {self.name}: BOUGHT {quantity} shares of {symbol}")
    
    def sell(self, symbol, quantity):
        if symbol not in self.positions or self.positions[symbol] < quantity:
            print(f"Trader {self.name}: Cannot sell {quantity} shares of {symbol} (insufficient position)")
            return
        
        self.positions[symbol] -= quantity
        if self.positions[symbol] == 0:
            del self.positions[symbol]
        print(f"Trader {self.name}: SOLD {quantity} shares of {symbol}")
    
    def update(self, subject, *args, **kwargs):
        symbol = kwargs.get('symbol')
        old_price = kwargs.get('old_price')
        new_price = kwargs.get('new_price')
        
        percent_change = ((new_price - old_price) / old_price) * 100
        
        # Trading strategy: Buy on significant dips, sell on significant gains
        if percent_change <= -self.threshold:
            # Stock has dropped significantly - buy opportunity
            self.buy(symbol, 100)
        elif percent_change >= self.threshold:
            # Stock has risen significantly - sell opportunity
            if symbol in self.positions:
                self.sell(symbol, min(self.positions[symbol], 50))


# Using the Observer pattern
market = StockMarket()
market.add_stock('AAPL', 150.00)
market.add_stock('GOOG', 2800.00)
market.add_stock('MSFT', 300.00)

analyst1 = StockAnalyst("Sarah")
analyst2 = StockAnalyst("Michael")
trader1 = StockTrader("John", threshold=3.0)
trader2 = StockTrader("Emma", threshold=5.0)

market.attach(analyst1)
market.attach(analyst2)
market.attach(trader1)
market.attach(trader2)

# Update stock prices and observe reactions
market.update_stock('AAPL', 156.00)  # +4%
market.update_stock('GOOG', 2660.00)  # -5%
market.update_stock('MSFT', 315.00)  # +5%
```

## Python's OOP vs. JavaScript's OOP

For JavaScript developers, here's a comparison of OOP features:

| Feature | Python | JavaScript |
|---------|--------|------------|
| Class Definition | `class MyClass:` | `class MyClass {` |
| Constructor | `def __init__(self):` | `constructor() {` |
| Instance Methods | `def method(self):` | `method() {` |
| Static Methods | `@staticmethod` decorator | `static method() {` |
| Class Methods | `@classmethod` decorator | N/A (use static) |
| Property Access | `obj.property` | `obj.property` |
| Private Properties | Naming convention `_private` | `#private` (newer JS) |
| Inheritance | `class Child(Parent):` | `class Child extends Parent {` |
| Super Call | `super().__init__()` | `super()` |
| Multiple Inheritance | Supported directly | Not directly supported |
| Mixins | Supported via multiple inheritance | Supported via composition |
| Property Decorators | `@property` | Getters/setters |
| Magic Methods | `__str__`, `__len__`, etc. | Limited special methods |

## Best Practices for OOP in Python

1. **Follow the Single Responsibility Principle**: Each class should have only one reason to change.

2. **Use Inheritance Sparingly**: Prefer composition over inheritance when possible.

3. **Make Use of Python's Duck Typing**: Focus on behavior rather than class types.

4. **Be Consistent with Method Names**: Follow naming conventions like `snake_case` for methods.

5. **Encapsulate Implementation Details**: Use the `_` prefix for "private" attributes (by convention).

6. **Document Your Classes**: Use docstrings to explain the purpose and usage of your classes.

7. **Use Properties Instead of Getters/Setters**: Python's `@property` decorator provides a clean syntax.

8. **Use Abstract Base Classes for Interfaces**: Define common interfaces with the `abc` module.

9. **Be Careful with Multiple Inheritance**: Understand the Method Resolution Order (MRO).

10. **Follow the Liskov Substitution Principle**: Derived classes should be substitutable for their base classes.

## Summary

Object-Oriented Programming in Python provides a powerful way to structure code, model real-world concepts, and build complex systems. With its comprehensive support for classes, inheritance, polymorphism, and advanced features like descriptors and metaclasses, Python offers a flexible and robust OOP experience.

For JavaScript developers, Python's OOP system provides a more formalized structure while maintaining many familiar concepts. By mastering these patterns and techniques, you'll be able to write cleaner, more maintainable Python code that effectively solves real-world problems.

Remember that OOP is just one tool in your programming toolkit. Python also excels at procedural and functional programming styles, and the best Python code often combines elements of all three paradigms.
