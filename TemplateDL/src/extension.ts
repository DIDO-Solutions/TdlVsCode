// example of how a ts file looks like
// Define a class
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}

// Create an instance of the class
let greeter = new Greeter("world");

// Call the method and log the result
console.log(greeter.greet()); // Output: Hello, world
