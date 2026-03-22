public class Calculator {

    public double add(double a, double b) {
        return a + b;
    }

    public double subtract(double a, double b) {
        return a - b;
    }

    public double multiply(double a, double b) {
        return a * b;
    }

    public double divide(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Divisor cannot be zero");
        }
        return a / b;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();

        System.out.println("=== Simple Calculator ===");
        System.out.println("1 + 2 = " + calc.add(1, 2));
        System.out.println("10 - 3 = " + calc.subtract(10, 3));
        System.out.println("4 * 5 = " + calc.multiply(4, 5));
        System.out.println("20 / 4 = " + calc.divide(20, 4));
    }
}
