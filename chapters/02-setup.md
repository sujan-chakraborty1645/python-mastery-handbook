# Setup & Installation

Get your development environment ready

## Installing Python

Unlike Node.js for JavaScript, Python comes pre-installed on most systems. However, you'll want the latest version.

### Windows

```bash
# Download from python.org
# or use winget
winget install Python.Python.3.12
```

### macOS

```bash
# Using Homebrew
brew install python@3.12
```

## Package Management: pip vs npm

### Python (pip)

```bash
# Install packages
pip install requests flask

# Install from requirements.txt
pip install -r requirements.txt

# Create virtual environment
python -m venv myenv
source myenv/bin/activate  # Linux/Mac
myenv\Scripts\activate     # Windows
```

### JavaScript (npm)

```bash
# Install packages
npm install axios express

# Install from package.json
npm install

# No virtual environment needed
```
