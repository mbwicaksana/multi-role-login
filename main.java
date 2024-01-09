class mains03 {
    public static void main(String [] aa) {
        sgtg sg = new sgtg03();
        prisma03 pr = new prisma03();
        sg_Jenis();
        System.out.println(pr.Hitung(4,6));
        System.out.println(sg.Hitung(6));
        System.out.println();
        pr.Jenis();
        pr.getTinggi(10);
        System.out.println(sg.Volume());
    }
}

class sgtg03 {
    int a = 2;
    int t = 10;
    int s = 5;
    sgtg03(){}
    sgtg03(int a, int t) {
        this.a = a;
        this.t = t;
    }

    static float Hitung(int a, int t) {
        return 0.5f*a*t;
    }
    static float Hitung(int s) {
        s + s + s;
    }
    public void Jenis() {
        System.out.println("Segitiga sama kaki")
    }
}