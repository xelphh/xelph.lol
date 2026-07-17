---
title: Building CLI Tools
date: 2024-01-10
excerpt: Learn to create command-line tools like a pro
author: Xelph
---

# Building CLI Tools

Command-line tools are powerful and versatile. Here's what you need to know.

## Why CLI Tools?

- Fast execution
- Easy automation
- No GUI overhead
- Perfect for DevOps

## Python Click Library

```python
import click

@click.command()
@click.option('--name', prompt='Your name')
def hello(name):
    click.echo(f'Hello {name}!')

if __name__ == '__main__':
    hello()
```

## C++ with argc/argv

```cpp
#include <iostream>

int main(int argc, char* argv[]) {
    for(int i = 0; i < argc; i++) {
        std::cout << argv[i] << std::endl;
    }
    return 0;
}
```

Start building tools today!
