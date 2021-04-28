import math
# Sredniki wstawiam, aby sie nie odzwyczaic (potem mam problem w innych jezykach)

class Punkt2D:
    def __init__(self, x, y):
        self.x = x;
        self.y = y;

    def drukuj(self):
        print('x = ' + str(self.x));
        print('y = ' + str(self.y));

    def zeruj(self):
        self.x = self.y = 0;

class Punkt3D(Punkt2D):
    def __init__(self, x, y, z):
        Punkt2D.__init__(self, x, y);
        self.z = z;

    def drukuj(self):
        Punkt2D.drukuj(self);
        print('z = ' + str(self.z));

    def zeruj(self):
        Punkt2D.zeruj(self);
        self.z = 0;

class Odcinek():
    def __init__(self, p1, p2):
        self.p1 = p1;
        self.p2 = p2;

    def licz(self):
        print('Dlugosc odcinka: ' + str(math.sqrt(math.pow(self.p2.x - self.p1.x, 2) + math.pow(self.p2.y - self.p1.y, 2))));

def testy():
    ### Zad. 1
    print('Punkt 2D rezultat:');
    punkt2D = Punkt2D(5, 10);
    punkt2D.drukuj();
    punkt2D.zeruj();
    print();
    punkt2D.drukuj();

    ### Zad. 2
    print('\nPunkt 3D rezultat: ');
    punkt3D = Punkt3D(1, 3, 7);
    punkt3D.drukuj();
    punkt3D.zeruj();
    print();
    punkt3D.drukuj();

    ### Zad. 3
    print('\nOdcinek rezultat (3;6) & (5;8): ')
    punkt2Da = Punkt2D(3, 6);
    punkt2Db = Punkt2D(5, 8);
    odcinek = Odcinek(punkt2Da, punkt2Db);
    odcinek.licz();

if __name__ == '__main__':
    testy();



