# Data & Scientific Python with NumPy and Pandas

Python has become the leading language for data science, data analysis, and scientific computing. This chapter introduces NumPy and Pandas, two fundamental libraries that form the backbone of Python's data science ecosystem.

## Introduction to Scientific Python

Python's scientific ecosystem consists of several key libraries:

- **NumPy**: Provides efficient array operations and numerical computing capabilities
- **Pandas**: Offers data structures and tools for data manipulation and analysis
- **Matplotlib**: Creates static visualizations
- **SciPy**: Adds scientific algorithms for optimization, integration, interpolation, and more
- **scikit-learn**: Implements machine learning algorithms

Together, these libraries provide a powerful environment for data analysis and scientific computing that rivals specialized tools like MATLAB or R.

## NumPy: Numerical Python

NumPy is the fundamental package for scientific computing in Python. It provides:

1. A powerful N-dimensional array object
2. Sophisticated broadcasting functions
3. Tools for integrating C/C++ code
4. Linear algebra, Fourier transform, and random number capabilities

### Getting Started with NumPy

```python
# Import NumPy
import numpy as np

# Create arrays
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.zeros((3, 4))  # 3x4 array of zeros
arr3 = np.ones((2, 3, 4))  # 3D array of ones
arr4 = np.arange(0, 10, 0.5)  # Values from 0 to 10 with step 0.5
arr5 = np.linspace(0, 1, 5)  # 5 evenly spaced values from 0 to 1

print(f"1D array: {arr1}")
print(f"2D array of zeros:\n{arr2}")
print(f"Shape of 3D array: {arr3.shape}")
print(f"Range array: {arr4}")
print(f"Linearly spaced array: {arr5}")
```

### Array Properties and Operations

```python
import numpy as np

# Create a 2D array
arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Basic properties
print(f"Array:\n{arr}")
print(f"Shape: {arr.shape}")
print(f"Dimensions: {arr.ndim}")
print(f"Size: {arr.size}")
print(f"Data type: {arr.dtype}")

# Basic operations
print(f"\nSum: {arr.sum()}")
print(f"Mean: {arr.mean()}")
print(f"Max: {arr.max()}")
print(f"Min: {arr.min()}")

# Sum by axis
print(f"\nSum by rows (axis=0): {arr.sum(axis=0)}")
print(f"Sum by columns (axis=1): {arr.sum(axis=1)}")

# Reshape array
reshaped = arr.reshape(9, 1)
print(f"\nReshaped array:\n{reshaped}")

# Flatten array
flattened = arr.flatten()
print(f"\nFlattened array: {flattened}")
```

### Array Indexing and Slicing

NumPy arrays can be indexed and sliced similar to Python lists but with more capabilities:

```python
import numpy as np

# Create a 3x4 array
arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])
print(f"Original array:\n{arr}")

# Basic indexing
print(f"\nElement at (1,2): {arr[1, 2]}")

# Slicing
print(f"\nFirst row: {arr[0, :]}")
print(f"Second column: {arr[:, 1]}")
print(f"Sub-array (first 2 rows, last 2 columns):\n{arr[:2, 2:]}")

# Boolean indexing
mask = arr > 5
print(f"\nMask (elements > 5):\n{mask}")
print(f"Elements where value > 5: {arr[mask]}")

# Fancy indexing
rows = np.array([0, 2])
cols = np.array([1, 3])
print(f"\nSelected elements using fancy indexing: {arr[rows, cols]}")  # Gets elements (0,1) and (2,3)
```

### Broadcasting

Broadcasting is a powerful mechanism that allows NumPy to work with arrays of different shapes:

```python
import numpy as np

# Create arrays
arr1 = np.array([[1, 2, 3], [4, 5, 6]])  # 2x3 array
arr2 = np.array([10, 20, 30])            # 1D array

# Broadcasting
result = arr1 + arr2
print(f"Array 1:\n{arr1}")
print(f"Array 2: {arr2}")
print(f"Result of addition with broadcasting:\n{result}")

# Broadcasting with scalars
result2 = arr1 * 2
print(f"\nMultiplying by scalar:\n{result2}")

# More complex broadcasting
arr3 = np.array([[1], [2]])  # 2x1 array
result3 = arr1 + arr3
print(f"\nArray 3: {arr3}")
print(f"Result of adding a 2x3 array with a 2x1 array:\n{result3}")
```

### Universal Functions (ufuncs)

NumPy's universal functions operate element-by-element on arrays:

```python
import numpy as np

# Create an array
arr = np.array([0, np.pi/4, np.pi/2, np.pi])
print(f"Array: {arr}")

# Apply universal functions
print(f"\nSine: {np.sin(arr)}")
print(f"Cosine: {np.cos(arr)}")
print(f"Square root: {np.sqrt(np.abs(arr))}")
print(f"Exponential: {np.exp(arr)}")

# Binary ufuncs
arr1 = np.array([1, 2, 3, 4])
arr2 = np.array([5, 6, 7, 8])
print(f"\nMaximum: {np.maximum(arr1, arr2)}")
print(f"Power (arr1 ** arr2): {np.power(arr1, arr2)}")
```

### Linear Algebra with NumPy

NumPy provides functions for linear algebra operations:

```python
import numpy as np

# Create matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print(f"Matrix A:\n{A}")
print(f"Matrix B:\n{B}")

# Matrix multiplication
C1 = A @ B  # Using the @ operator (Python 3.5+)
C2 = np.dot(A, B)  # Using dot function
print(f"\nMatrix multiplication (A @ B):\n{C1}")
print(f"Matrix multiplication (np.dot(A, B)):\n{C2}")

# Matrix properties
print(f"\nDeterminant of A: {np.linalg.det(A)}")
print(f"Inverse of A:\n{np.linalg.inv(A)}")
print(f"Transpose of A:\n{A.T}")

# Eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)
print(f"\nEigenvalues of A: {eigenvalues}")
print(f"Eigenvectors of A:\n{eigenvectors}")

# Solve linear system: A * x = b
b = np.array([1, 2])
x = np.linalg.solve(A, b)
print(f"\nSolution to A * x = b: {x}")
print(f"Verification - A @ x: {A @ x}")
```

### Random Number Generation

NumPy offers extensive random number generation capabilities:

```python
import numpy as np

# Set seed for reproducibility
np.random.seed(42)

# Generate random numbers
random_integers = np.random.randint(1, 10, size=5)  # 5 random integers from 1 to 9
random_floats = np.random.random(5)  # 5 random floats between 0 and 1
random_normal = np.random.normal(loc=0, scale=1, size=5)  # 5 samples from standard normal distribution

print(f"Random integers: {random_integers}")
print(f"Random floats: {random_floats}")
print(f"Random normal: {random_normal}")

# Generate a random matrix
random_matrix = np.random.rand(3, 3)
print(f"\nRandom 3x3 matrix:\n{random_matrix}")

# Shuffle an array
arr = np.arange(10)
np.random.shuffle(arr)
print(f"\nShuffled array: {arr}")

# Random choice
choices = np.random.choice(['red', 'green', 'blue'], size=5, p=[0.6, 0.3, 0.1])
print(f"\nRandom choices with probability weights: {choices}")
```

## Pandas: Python Data Analysis

Pandas is built on NumPy and provides data structures and functions needed to manipulate structured data:

- **DataFrame**: A 2-dimensional labeled data structure similar to a spreadsheet or SQL table
- **Series**: A 1-dimensional labeled array capable of holding any data type

### Creating DataFrames

```python
import pandas as pd
import numpy as np

# Create DataFrame from a dictionary
data = {
    'Name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom'],
    'Age': [28, 32, 24, 45, 31],
    'City': ['New York', 'London', 'Paris', 'Berlin', 'Tokyo'],
    'Salary': [75000, 82000, 68000, 92000, 78000]
}

df = pd.DataFrame(data)
print("DataFrame created from dictionary:")
print(df)

# Create DataFrame from a NumPy array
array_data = np.random.rand(5, 3)
df2 = pd.DataFrame(
    array_data, 
    columns=['A', 'B', 'C'],
    index=['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5']
)
print("\nDataFrame created from NumPy array:")
print(df2)

# Create DataFrame from a CSV file
# df3 = pd.read_csv('data.csv')
```

### Basic DataFrame Operations

Now let's explore the essential operations you'll perform with DataFrames. These form the foundation of any data analysis workflow in Pandas:

```python
import pandas as pd

# Create a sample DataFrame representing employee data
data = {
    'Name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom'],
    'Age': [28, 32, 24, 45, 31],
    'City': ['New York', 'London', 'Paris', 'Berlin', 'Tokyo'],
    'Department': ['HR', 'Sales', 'IT', 'Finance', 'IT'],
    'Salary': [75000, 82000, 68000, 92000, 78000]
}

# Create the DataFrame - this is your primary data structure for analysis
df = pd.DataFrame(data)

# INSPECTING YOUR DATA
# -------------------

# View the first n rows (default is 5) - always do this first when loading data
# This helps you quickly understand what's in your dataset
print("First 2 rows:")
print(df.head(2))  # Shows only the first 2 rows
# Output:
#    Name  Age      City Department  Salary
# 0  John   28  New York         HR   75000
# 1  Emma   32    London      Sales   82000

# View the last n rows - useful for large datasets to see what's at the end
print("\nLast 2 rows:")
print(df.tail(2))  # Shows only the last 2 rows
# Output:
#    Name  Age   City Department  Salary
# 3  Lisa   45  Berlin    Finance   92000
# 4   Tom   31   Tokyo         IT   78000

# Get metadata about your DataFrame (data types, memory usage, etc.)
# This shows column names, data types, and non-null counts
print("\nDataFrame info:")
print(df.info())  # Shows DataFrame metadata
# Output:
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 5 entries, 0 to 4
# Data columns (total 5 columns):
#  #   Column      Non-Null Count  Dtype 
# ---  ------      --------------  ----- 
#  0   Name        5 non-null      object
#  1   Age         5 non-null      int64 
#  2   City        5 non-null      object
#  3   Department  5 non-null      object
#  4   Salary      5 non-null      int64 
# dtypes: int64(2), object(3)
# memory usage: 328.0+ bytes

# Get statistical summary of numerical columns
# This includes count, mean, std, min, 25%, 50%, 75%, max
print("\nSummary statistics:")
print(df.describe())  # Shows statistical summary of numerical columns
# Output:
#              Age        Salary
# count   5.000000      5.000000
# mean   32.000000  79000.000000
# std     7.874008   8944.271910
# min    24.000000  68000.000000
# 25%    28.000000  75000.000000
# 50%    31.000000  78000.000000
# 75%    32.000000  82000.000000
# max    45.000000  92000.000000

# ACCESSING DATA
# -------------

# Selecting a single column - returns a Series (1D array with labels)
# There are two syntaxes: df['column_name'] or df.column_name
print("\nAccessing the 'Name' column:")
print(df['Name'])

# Multiple columns
print("\nAccessing multiple columns:")
print(df[['Name', 'Salary']])

# Basic operations
print("\nAverage salary:", df['Salary'].mean())
print("Maximum age:", df['Age'].max())
print("Minimum salary:", df['Salary'].min())

# Adding a new column
df['Experience'] = [3, 6, 2, 10, 4]
print("\nDataFrame with new column:")
print(df)

# Applying functions to columns
df['Salary_after_bonus'] = df['Salary'] * 1.1
print("\nDataFrame with calculated column:")
print(df)
```

### Indexing and Selecting Data

```python
import pandas as pd

# Create a sample DataFrame
data = {
    'Name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom'],
    'Age': [28, 32, 24, 45, 31],
    'City': ['New York', 'London', 'Paris', 'Berlin', 'Tokyo'],
    'Department': ['HR', 'Sales', 'IT', 'Finance', 'IT'],
    'Salary': [75000, 82000, 68000, 92000, 78000]
}

df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# loc: label-based indexing
print("\nSelecting rows by label with loc:")
print(df.loc[1:3])  # rows 1, 2, 3

print("\nSelecting specific rows and columns with loc:")
print(df.loc[1:3, ['Name', 'Salary']])

# iloc: integer-based indexing
print("\nSelecting rows by position with iloc:")
print(df.iloc[1:3])  # rows 1, 2

print("\nSelecting specific positions with iloc:")
print(df.iloc[1:3, [0, 4]])  # rows 1, 2, columns 0, 4

# Boolean indexing
print("\nFiltering with boolean conditions:")
print(df[df['Age'] > 30])

print("\nComplex filtering:")
print(df[(df['Salary'] > 70000) & (df['Age'] < 40)])

# String methods for filtering
print("\nFiltering text data:")
print(df[df['City'].str.startswith('L')])

# Getting unique values
print("\nUnique departments:", df['Department'].unique())
print("Value counts for Department:")
print(df['Department'].value_counts())
```

### Handling Missing Data

```python
import pandas as pd
import numpy as np

# Create DataFrame with missing values
data = {
    'A': [1, 2, np.nan, 4, 5],
    'B': [np.nan, 2, 3, 4, 5],
    'C': [1, 2, 3, np.nan, 5],
    'D': [1, 2, 3, 4, 5]
}

df = pd.DataFrame(data)
print("DataFrame with missing values:")
print(df)

# Check for missing values
print("\nMissing values per column:")
print(df.isna().sum())

print("\nAny missing values in entire DataFrame?", df.isna().any().any())

# Drop rows with missing values
df_dropped = df.dropna()
print("\nDataFrame after dropping rows with NaN:")
print(df_dropped)

# Drop columns with missing values
df_dropped_cols = df.dropna(axis=1)
print("\nDataFrame after dropping columns with NaN:")
print(df_dropped_cols)

# Fill missing values
df_filled = df.fillna(0)  # Fill with a specific value
print("\nDataFrame after filling NaN with 0:")
print(df_filled)

df_filled_mean = df.fillna(df.mean())  # Fill with column means
print("\nDataFrame after filling NaN with column means:")
print(df_filled_mean)

# Forward fill (use previous value)
df_ffill = df.fillna(method='ffill')
print("\nDataFrame after forward fill:")
print(df_ffill)

# Backward fill (use next value)
df_bfill = df.fillna(method='bfill')
print("\nDataFrame after backward fill:")
print(df_bfill)
```

### Data Aggregation and Grouping

```python
import pandas as pd
import numpy as np

# Create a sample DataFrame
data = {
    'Name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom', 'Mike', 'Anna'],
    'Department': ['HR', 'Sales', 'IT', 'Finance', 'IT', 'HR', 'Sales'],
    'Salary': [75000, 82000, 68000, 92000, 78000, 65000, 79000],
    'Age': [28, 32, 24, 45, 31, 35, 29],
    'Experience': [3, 6, 2, 10, 4, 7, 5]
}

df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

# Grouping by a single column
print("\nGrouping by Department:")
dept_groups = df.groupby('Department')
print(dept_groups.groups)  # Dictionary mapping group name to row indices

# Calculate aggregate statistics by group
print("\nAverage salary by department:")
print(dept_groups['Salary'].mean())

print("\nMultiple statistics by department:")
print(dept_groups.agg({
    'Salary': ['mean', 'min', 'max', 'count'],
    'Age': ['mean', 'min', 'max'],
    'Experience': 'mean'
}))

# Group by multiple columns
print("\nGrouping by Department and Experience > 5:")
multi_group = df.groupby(['Department', df['Experience'] > 5])
print(multi_group['Salary'].mean())

# Using groupby with custom functions
print("\nCustom function with groupby:")
print(dept_groups.agg(lambda x: x.max() - x.min()))

# Using transformation to align result back to original DataFrame
print("\nSalary difference from department average:")
df['salary_diff'] = df['Salary'] - df.groupby('Department')['Salary'].transform('mean')
print(df)
```

### Merging, Joining, and Concatenating

```python
import pandas as pd

# Create sample DataFrames
df1 = pd.DataFrame({
    'employee_id': [1, 2, 3, 4, 5],
    'name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom'],
    'department': ['HR', 'Sales', 'IT', 'Finance', 'IT']
})

df2 = pd.DataFrame({
    'employee_id': [1, 2, 3, 6, 7],
    'salary': [75000, 82000, 68000, 92000, 78000],
    'bonus': [5000, 6000, 3000, 8000, 5500]
})

df3 = pd.DataFrame({
    'department': ['HR', 'Sales', 'IT', 'Finance', 'Marketing'],
    'location': ['New York', 'London', 'Paris', 'Berlin', 'Tokyo']
})

print("Employee data (df1):")
print(df1)
print("\nSalary data (df2):")
print(df2)
print("\nDepartment data (df3):")
print(df3)

# Concatenation (stacking DataFrames)
df_vertical = pd.concat([df1, df1], axis=0)
print("\nVertically concatenated df1:")
print(df_vertical)

df_horizontal = pd.concat([df1, df2], axis=1)
print("\nHorizontally concatenated df1 and df2 (not aligned):")
print(df_horizontal)

# Merge (like SQL join)

# Inner join
inner_merged = pd.merge(df1, df2, on='employee_id', how='inner')
print("\nInner merge on employee_id:")
print(inner_merged)

# Left join
left_merged = pd.merge(df1, df2, on='employee_id', how='left')
print("\nLeft merge on employee_id:")
print(left_merged)

# Right join
right_merged = pd.merge(df1, df2, on='employee_id', how='right')
print("\nRight merge on employee_id:")
print(right_merged)

# Outer join
outer_merged = pd.merge(df1, df2, on='employee_id', how='outer')
print("\nOuter merge on employee_id:")
print(outer_merged)

# Merge on different column names
df2_renamed = df2.rename(columns={'employee_id': 'emp_id'})
merged_diff_cols = pd.merge(df1, df2_renamed, left_on='employee_id', right_on='emp_id')
print("\nMerge on different column names:")
print(merged_diff_cols)

# Join (merge on index)
df4 = df3.set_index('department')
joined = df1.join(df4, on='department')
print("\nJoin df1 with df3 on department:")
print(joined)
```

### Reshaping and Pivoting

```python
import pandas as pd
import numpy as np

# Create a sample DataFrame
data = {
    'date': ['2023-01-01', '2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02', '2023-01-02'],
    'product': ['A', 'B', 'C', 'A', 'B', 'C'],
    'sales': [100, 150, 200, 120, 180, 220],
    'units': [10, 15, 20, 12, 18, 22]
}

df = pd.DataFrame(data)
df['date'] = pd.to_datetime(df['date'])
print("Original DataFrame:")
print(df)

# Pivot: Create a new table with specified index, columns, and values
pivot_table = df.pivot(index='date', columns='product', values='sales')
print("\nPivot Table (sales by date and product):")
print(pivot_table)

# Pivot table with aggregation
pivot_table_agg = pd.pivot_table(
    df, 
    index='date', 
    columns='product', 
    values=['sales', 'units'],
    aggfunc={'sales': np.sum, 'units': np.mean}
)
print("\nPivot Table with aggregation:")
print(pivot_table_agg)

# Stack and unstack (reshape between long and wide formats)
stacked = pivot_table.stack()
print("\nStacked pivot table:")
print(stacked)

unstacked = stacked.unstack()
print("\nUnstacked back to pivot table:")
print(unstacked)

# Melt: Convert from wide to long format
df_wide = pd.DataFrame({
    'date': ['2023-01-01', '2023-01-02', '2023-01-03'],
    'product_A': [100, 120, 130],
    'product_B': [150, 180, 190],
    'product_C': [200, 220, 230]
})
print("\nWide format DataFrame:")
print(df_wide)

df_long = pd.melt(
    df_wide, 
    id_vars=['date'],
    var_name='product',
    value_name='sales'
)
print("\nLong format DataFrame after melt:")
print(df_long)

# Wide to long
df_wide = pd.DataFrame({
    'id': [1, 2, 3],
    'weight_kg_2020': [65, 70, 75],
    'weight_kg_2021': [67, 72, 77],
    'height_cm_2020': [170, 175, 180],
    'height_cm_2021': [171, 177, 182]
})
print("\nWide format multi-variable DataFrame:")
print(df_wide)

df_long = pd.wide_to_long(
    df_wide, 
    stubnames=['weight_kg', 'height_cm'],
    i='id',
    j='year',
    sep='_',
    suffix='\d+'
)
print("\nLong format after wide_to_long:")
print(df_long)
```

### Time Series Data with Pandas

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create a time series
dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
ts = pd.Series(np.random.randn(len(dates)).cumsum(), index=dates)
print("Time Series sample:")
print(ts.head())

# Resampling - downsampling
monthly_mean = ts.resample('M').mean()
print("\nMonthly means:")
print(monthly_mean)

# Resampling - upsampling
daily_from_monthly = monthly_mean.resample('D').ffill()
print("\nDaily values filled forward from monthly means:")
print(daily_from_monthly.head())

# Time zone handling
ts_utc = ts.tz_localize('UTC')
print("\nTime series with UTC timezone:")
print(ts_utc.head())

ts_est = ts_utc.tz_convert('US/Eastern')
print("\nTime series converted to Eastern time:")
print(ts_est.head())

# Date shifting
shifted = ts.shift(periods=1)  # Shift values forward by 1 day
print("\nShifted time series:")
print(pd.concat([ts, shifted], axis=1).head())

# Rolling windows
rolling_mean = ts.rolling(window=7).mean()
print("\n7-day rolling average:")
print(pd.concat([ts, rolling_mean], axis=1).head(10))

# Expanding windows (cumulative statistics)
expanding_mean = ts.expanding().mean()
print("\nExpanding mean:")
print(pd.concat([ts, expanding_mean], axis=1).head(10))

# Time-based indexing
print("\nData for January 2023:")
print(ts['2023-01'])

print("\nData between specific dates:")
print(ts['2023-01-15':'2023-01-20'])

# Period indexing
periods = pd.period_range(start='2023-01', end='2023-12', freq='M')
period_ts = pd.Series(np.random.randn(len(periods)), index=periods)
print("\nPeriod-based time series:")
print(period_ts)

print("\nData for Q1 2023:")
print(period_ts['2023Q1'])
```

### Reading and Writing Data

```python
import pandas as pd
import numpy as np
import os

# Create a sample DataFrame
data = {
    'Name': ['John', 'Emma', 'Sam', 'Lisa', 'Tom'],
    'Age': [28, 32, 24, 45, 31],
    'City': ['New York', 'London', 'Paris', 'Berlin', 'Tokyo'],
    'Salary': [75000, 82000, 68000, 92000, 78000],
    'Date Joined': pd.date_range('2020-01-01', periods=5, freq='M')
}

df = pd.DataFrame(data)
print("Sample DataFrame:")
print(df)

# Write to CSV
df.to_csv('employees.csv', index=False)
print("\nDataFrame written to CSV")

# Read from CSV
df_read = pd.read_csv('employees.csv', parse_dates=['Date Joined'])
print("\nDataFrame read from CSV:")
print(df_read)

# Write to Excel
df.to_excel('employees.xlsx', sheet_name='Employees', index=False)
print("\nDataFrame written to Excel")

# Read from Excel
if os.path.exists('employees.xlsx'):  # Check if file was created
    df_excel = pd.read_excel('employees.xlsx', sheet_name='Employees')
    print("\nDataFrame read from Excel:")
    print(df_excel)

# Write to JSON
df.to_json('employees.json', orient='records')
print("\nDataFrame written to JSON")

# Read from JSON
df_json = pd.read_json('employees.json')
print("\nDataFrame read from JSON:")
print(df_json)

# Write to SQL (requires SQLAlchemy)
# import sqlite3
# conn = sqlite3.connect('employees.db')
# df.to_sql('employees', conn, if_exists='replace', index=False)
# print("\nDataFrame written to SQL database")

# Read from SQL
# df_sql = pd.read_sql('SELECT * FROM employees', conn)
# print("\nDataFrame read from SQL:")
# print(df_sql)
# conn.close()

# Clean up files
for file in ['employees.csv', 'employees.xlsx', 'employees.json']:
    if os.path.exists(file):
        os.remove(file)
```

### Data Visualization with Pandas

Pandas integrates with Matplotlib to provide simple data visualization:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create a sample DataFrame
dates = pd.date_range('2023-01-01', periods=100, freq='D')
df = pd.DataFrame({
    'A': np.random.randn(100).cumsum(),
    'B': np.random.randn(100).cumsum(),
    'C': np.random.randn(100).cumsum(),
    'D': np.random.randn(100).cumsum()
}, index=dates)

print("Sample DataFrame for visualization:")
print(df.head())

# Line plot
df.plot(figsize=(10, 6))
plt.title('Line Plot')
plt.ylabel('Value')
plt.grid(True)
plt.tight_layout()
# plt.show()  # Uncomment to show plot in interactive sessions

# Bar plot
df.iloc[80:90].plot.bar(figsize=(10, 6))
plt.title('Bar Plot')
plt.ylabel('Value')
plt.tight_layout()
# plt.show()

# Histogram
df['A'].plot.hist(bins=20, figsize=(10, 6))
plt.title('Histogram')
plt.tight_layout()
# plt.show()

# Box plot
df.plot.box(figsize=(10, 6))
plt.title('Box Plot')
plt.tight_layout()
# plt.show()

# Scatter plot
df.plot.scatter(x='A', y='B', figsize=(10, 6))
plt.title('Scatter Plot')
plt.tight_layout()
# plt.show()

# Pie chart
abs(df.iloc[-1]).plot.pie(figsize=(10, 6))
plt.title('Pie Chart')
plt.tight_layout()
# plt.show()

# Area plot
df.plot.area(figsize=(10, 6), alpha=0.5)
plt.title('Area Plot')
plt.tight_layout()
# plt.show()
```

## Real-World Data Analysis Example

Let's put everything together with a realistic data analysis example:

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime

# Create a dataset simulating sales data
np.random.seed(42)

# Generate dates
dates = pd.date_range(start='2022-01-01', end='2022-12-31', freq='D')

# Generate product data
products = ['Laptop', 'Phone', 'Tablet', 'Monitor', 'Keyboard']
categories = ['Electronics', 'Electronics', 'Electronics', 'Accessories', 'Accessories']
prices = {'Laptop': 1200, 'Phone': 800, 'Tablet': 400, 'Monitor': 300, 'Keyboard': 80}

# Generate sales data
n_records = 1000
sales_data = {
    'date': np.random.choice(dates, size=n_records),
    'product': np.random.choice(products, size=n_records),
    'units': np.random.randint(1, 10, size=n_records),
    'customer_id': np.random.randint(1, 101, size=n_records),
    'sales_rep_id': np.random.randint(1, 6, size=n_records),
    'region': np.random.choice(['North', 'South', 'East', 'West'], size=n_records)
}

# Create DataFrame
sales_df = pd.DataFrame(sales_data)

# Add additional columns
product_info = {product: {'category': cat, 'price': price} for product, cat, price in zip(products, categories, [prices[p] for p in products])}
sales_df['category'] = sales_df['product'].map(lambda p: product_info[p]['category'])
sales_df['unit_price'] = sales_df['product'].map(lambda p: product_info[p]['price'])
sales_df['total_price'] = sales_df['units'] * sales_df['unit_price']

print("Sales Data Sample:")
print(sales_df.head())

# Basic exploratory analysis
print("\nDataFrame info:")
print(sales_df.info())

print("\nSummary statistics:")
print(sales_df.describe())

print("\nMissing values:")
print(sales_df.isna().sum())

# Sales by product
product_sales = sales_df.groupby('product').agg({
    'units': 'sum',
    'total_price': 'sum'
}).sort_values('total_price', ascending=False)

print("\nSales by product:")
print(product_sales)

# Sales by region and category
region_category_sales = sales_df.groupby(['region', 'category']).agg({
    'total_price': 'sum'
}).unstack().fillna(0)

print("\nSales by region and category:")
print(region_category_sales)

# Time-based analysis
sales_df['date'] = pd.to_datetime(sales_df['date'])
sales_df['month'] = sales_df['date'].dt.month
sales_df['day_of_week'] = sales_df['date'].dt.day_name()

monthly_sales = sales_df.groupby('month').agg({
    'total_price': 'sum'
})

print("\nMonthly sales:")
print(monthly_sales)

day_of_week_sales = sales_df.groupby('day_of_week').agg({
    'total_price': 'sum'
})
# Sort by weekday
weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
day_of_week_sales = day_of_week_sales.reindex(weekday_order)

print("\nSales by day of week:")
print(day_of_week_sales)

# Sales trend over time
daily_sales = sales_df.groupby('date').agg({
    'total_price': 'sum'
}).reset_index()

# Rolling 7-day average
daily_sales['7d_avg'] = daily_sales['total_price'].rolling(7).mean()

print("\nDaily sales trend (first 10 days):")
print(daily_sales.head(10))

# Customer analysis
customer_purchases = sales_df.groupby('customer_id').agg({
    'total_price': 'sum',
    'product': 'count'
}).rename(columns={'product': 'num_purchases'})

print("\nTop 5 customers by purchase amount:")
print(customer_purchases.sort_values('total_price', ascending=False).head())

# Sales rep performance
sales_rep_performance = sales_df.groupby('sales_rep_id').agg({
    'total_price': 'sum',
    'customer_id': pd.Series.nunique
}).rename(columns={'customer_id': 'unique_customers'})

print("\nSales rep performance:")
print(sales_rep_performance.sort_values('total_price', ascending=False))

# Pivot table analysis
pivot = pd.pivot_table(
    sales_df,
    values='total_price',
    index=['region', 'product'],
    columns='month',
    aggfunc='sum',
    fill_value=0
)

print("\nSales pivot table (regions x products x months):")
print(pivot)

# Visualizations would typically follow here
# plt.figure(figsize=(12, 6))
# monthly_sales.plot(kind='bar')
# plt.title('Monthly Sales')
# plt.tight_layout()
# plt.show()

# Data export for reporting
# pivot.to_excel('sales_report.xlsx')
```

## Comparing Python's Data Tools with JavaScript

| Feature | Python (NumPy/Pandas) | JavaScript |
|---------|----------------------|------------|
| Data Processing | Pandas DataFrame | array.map(), filter(), reduce() |
| Array Operations | NumPy arrays | TypedArrays, Array methods |
| Data Analysis | Built-in statistical functions | Libraries like D3.js |
| Performance | Optimized C implementations | Less optimized for numerical computing |
| Visualization | Matplotlib, Seaborn | D3.js, Chart.js |
| Data Size | Handles very large datasets | Limited by browser memory |
| Learning Curve | Medium | Low for basic operations |
| Ecosystem | Rich scientific libraries | Rich web visualization libraries |

## Best Practices for Data Analysis with Python

1. **Keep raw data separate**: Never modify your original data
2. **Make analysis reproducible**: Document every step of data cleaning and transformation
3. **Chain methods efficiently**: Use method chaining when possible
4. **Vectorize operations**: Avoid loops when operating on arrays
5. **Optimize memory usage**: Use appropriate data types to reduce memory usage
6. **Handle missing data explicitly**: Be intentional about how you handle NaN values
7. **Validate results**: Cross-check your calculations
8. **Use descriptive names**: Name variables and columns clearly
9. **Comment complex logic**: Explain the reasoning behind complex transformations
10. **Visualize your results**: Always plot your data to check for patterns and outliers

## Conclusion

NumPy and Pandas provide a powerful foundation for data manipulation, analysis, and scientific computing in Python. These libraries offer efficient data structures and functions that make working with structured data much more productive than using basic Python data types.

In this chapter, we've explored:
- NumPy's array operations, broadcasting, and mathematical functions
- Pandas' DataFrames for structured data manipulation
- Data cleaning, transformation, and aggregation techniques
- Time series analysis and visualization capabilities

These tools form the backbone of Python's data science ecosystem and are essential knowledge for anyone working with data in Python. As you become more comfortable with these libraries, you'll find they dramatically increase your productivity when processing and analyzing data.

In the next chapter, we'll explore modern Python practices including code formatting, linting, type checking, and managing secrets with environment variables.
