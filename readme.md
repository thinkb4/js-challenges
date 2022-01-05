# JS Challenges

A collection of challenges for you to practice and apply what you've learned of Javascript so far. Have fun! 🎉

---

- [Projects](#projects)
- [Useful information](#useful-information)
    - [How to run the project?](#how-to-run-the-project-)
    - [Projects structure](#projects-structure)
    - [Styles compilation](#styles-compilation)

---

## Projects

1. [Clock](/1%20-%20Clock/readme.md)
2. [Rock, Paper, Scissors, Lizard, Spock](/2%20-%20Rock,%20Paper,%20Scissors,%20Lizard,%20Spock/readme.md)
3. [Photo filters](/3%20-%20Photo%20Filters/readme.md)
4. [Pixel art](/4%20-%20Pixel%20Art/readme.md)
5. [Slider](/5%20-%20Slider/readme.md)
6. [Puzzle](/6%20-%20Puzzle/readme.md)
7. [Weather](/7%20-%20Weather/readme.md)

---

## Useful information

#### How to run the project?

Our recommendation is to run the main project or any of the challenges using [Visual Studio Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

#### Projects structure

Every challenge folder has pretty much the same structure (except for some exceptions), but normally it's something like this...

    Project folder...
    └── ...
    └── js              # The Javascript files of the project
    └── scss            # The project styles configuration
    └── index.html      # The main HTML file
    └── styles.css      # The minified styles
    └── readme.md       # The readme folder including the challenge instructions
    └── ...

#### Styles compilation

All of them have an **scss** folder which includes all of the project stylesheets. In order to compile them you should be positioned on the root directory and run the following commands.

If you're using npm...

```shell
npm run sass $1
```

If you're using yarn...

```shell
yarn run sass $1
```

**$1** is the expected argument of the command which references the project you want to compile.
Eg: `yarn run sass Rock` This will compille all of the _Rock, Paper, Scissors, Lizard, Spock_ project styles.
