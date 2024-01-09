// Import library yang dibutuhkan
import java.util.Scanner;

// Definisikan class abstrak Shape
public abstract class Shape {

    // Definisikan atribut
    protected double p1;
    protected double p2;

    // Definisikan method abstrak untuk menghitung luas
    public abstract double getArea();

    // Definisikan constructor
    public Shape(double p1, double p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

// Definisikan class persegi yang mengimplementasikan class abstrak Shape
public class Persegi extends Shape {

    // Definisikan constructor
    public Persegi(double p1, double p2) {
        super(p1, p2);
    }

    // Definisikan method getArea untuk menghitung luas persegi
    @Override
    public double getArea() {
        return p1 * p2;
    }
}

// Definisikan class lingkaran yang mengimplementasikan class abstrak Shape
public class Lingkaran extends Shape {

    // Definisikan constructor
    public Lingkaran(double p1, double p2) {
        super(p1, p2);
    }

    // Definisikan method getArea untuk menghitung luas lingkaran
    @Override
    public double getArea() {
        return Math.PI * p1 * p1;
    }
}

// Definisikan class main
public class Main {

    // Definisikan variabel scanner
    static Scanner scanner = new Scanner(System.in);

    // Definisikan method main
    public static void main(String[] args) {

        // Menerima input dari user
        System.out.print("Masukkan panjang sisi persegi: ");
        double p1 = scanner.nextDouble();

        // Menerima input dari user
        System.out.print("Masukkan lebar sisi persegi: ");
        double p2 = scanner.nextDouble();

        // Membuat objek persegi
        Persegi persegi = new Persegi(p1, p2);

        // Menampilkan luas persegi
        System.out.println("Luas persegi adalah: " + persegi.getArea());

        // Menerima input dari user
        System.out.print("Masukkan jari-jari lingkaran: ");
        double r = scanner.nextDouble();

        // Membuat objek lingkaran
        Lingkaran lingkaran = new Lingkaran(r, r);

        // Menampilkan luas lingkaran
        System.out.println("Luas lingkaran adalah: " + lingkaran.getArea());
    }
}
