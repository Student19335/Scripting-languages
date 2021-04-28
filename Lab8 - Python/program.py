import mojeklasy

def main():
    point2Da = mojeklasy.Punkt2D(1, 5);
    point2Db = mojeklasy.Punkt2D(11, 5);
    point3D = mojeklasy.Punkt3D(1, 2, 3);

    point2Da.drukuj();

    print()
    point2Db.drukuj();

    print()
    point3D.drukuj();

    print()
    odcinek = mojeklasy.Odcinek(point2Da, point2Db);
    odcinek.licz()

if __name__ == '__main__':
    main();