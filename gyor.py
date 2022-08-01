from timeit import default_timer as timer
import smbus
import time
import datetime
from widgetlords.pi_spi_din import *
from decimal import *

analog_bemenet_0 = Mod8AI(ChipEnable.CE0)  # 5 analóg bemenet
analog_bemenet_1 = Mod8AI(ChipEnable.CE1)  # 4 hőmérséklet bemenet
analog_kimenet_0 = Mod4AO(0)
digitalis_bemenet_0 = Mod8DI(ChipEnable.CE0)  # 8 digitális bemenet
digitalis_bemenet_1 = Mod8DI(ChipEnable.CE1)  # 8 digitális bemenet
digitalis_bemenet_2 = Mod8DI(ChipEnable.CE2)  # 8 digitális bemenet
digitalis_bemenet_3 = Mod8DI(ChipEnable.CE3)  # 8 digitális bemenet
digitalis_bemenet_4 = Mod8DI(ChipEnable.CE4)  # 8 digitális bemenet
# 4 digitális kimenet - P2, P4, P5, Kazan
digitalis_kimenet_0 = Mod4KO(ChipEnable.CE0, 1)
# 4 digitális kimenet - P1, P1A, P3, P6
digitalis_kimenet_1 = Mod4KO(ChipEnable.CE1, 1)
# 4 digitális kimenet - Msz5ny, Msz5z, Msz6ny, Msz6z
digitalis_kimenet_2 = Mod4KO(ChipEnable.CE2, 1)
digitalis_kimenet_3 = Mod4KO(ChipEnable.CE3, 1)  # 4 digitális kimenet

#bus= smbus.SMBus(1)

#DEVICE = 0x3f
#IODIRA = 0x00
#GPIOA = 7
#GPIOB = 6
#GPIOC = 5

#bus.write_byte_data(DEVICE, IODIRA, 0x90)

t1 = 0
t2 = 0
t3 = 0
t4 = 0


def analog_beolvasas_0():   # Első analóg beolvasás, return érték az összegük lesz eltolva

    T1_tartalyszint = analog_bemenet_0.read_single(0)
    T2_tartalyszint = analog_bemenet_0.read_single(1)
    T3_tartalyszint = analog_bemenet_0.read_single(2)
    T4_tartalyszint = analog_bemenet_0.read_single(3)
    P2_nyomas = analog_bemenet_0.read_single(4)
    P2_frekvencia_ellenorzo = analog_bemenet_0.read_single(5)

    analog_bemenet_tomb_0 = [T1_tartalyszint, T2_tartalyszint,
                             T3_tartalyszint, T4_tartalyszint, P2_nyomas, P2_frekvencia_ellenorzo]

    return analog_bemenet_tomb_0


def analog_beolvasas_1():   # Első analóg beolvasás, return érték az összegük lesz eltolva

    T1_tartaly_hom = analog_bemenet_1.read_single(0)
    T2_tartaly_hom = analog_bemenet_1.read_single(1)
    T3_tartaly_hom = analog_bemenet_1.read_single(2)
    D1_kevert_hom = analog_bemenet_1.read_single(3)

    analog_bemenet_tomb_1 = [T1_tartaly_hom,
                             T2_tartaly_hom, T3_tartaly_hom, D1_kevert_hom]

    return analog_bemenet_tomb_1


def digitalis_beolvasas_0():

    P1_uzemel = digitalis_bemenet_0.read_single(0)  # DI1
    # P1_motorvedo_hiba = digitalis_bemenet_0.read_single(1)  #DI2
    # P1_automata_mod = digitalis_bemenet_0.read_single(2)    #DI3
    P1_a_uzemel = digitalis_bemenet_0.read_single(1)  # DI4
    # P1_a_motorvedo_hiba = digitalis_bemenet_0.read_single(4)    #DI5
    # P1_a_automata_mod = digitalis_bemenet_0.read_single(5)  #DI6
    Betap_fesz_hiba = digitalis_bemenet_0.read_single(2)  # DI8
    P2_uzemel = digitalis_bemenet_0.read_single(3)  # DI10
    Szelep5_nyitva = digitalis_bemenet_0.read_single(4)  # DI41
    Szelep5_zarva = digitalis_bemenet_0.read_single(5)  # DI42
    Szelep6_nyitva = digitalis_bemenet_0.read_single(6)  # DI41
    Szelep6_zarva = digitalis_bemenet_0.read_single(7)  # DI42

    digitalis_bemenet_tomb_0 = [P1_uzemel, P1_a_uzemel, Betap_fesz_hiba, P2_uzemel,
                                Szelep5_nyitva, Szelep5_zarva, Szelep6_nyitva, Szelep6_zarva]

    return digitalis_bemenet_tomb_0


def digitalis_beolvasas_1():

    P2_motorvedo_hiba = digitalis_bemenet_1.read_single(0)  # DI11
    P2_szivattyú_hiba = digitalis_bemenet_1.read_single(1)  # DI13
    P2_automata_mod = digitalis_bemenet_1.read_single(2)  # DI14
    P3_uzemel = digitalis_bemenet_1.read_single(3)  # DI15
    P3_motorvedo_hiba = digitalis_bemenet_1.read_single(4)  # DI16
    P3_automata_mod = digitalis_bemenet_1.read_single(5)  # DI17
    P6_uzemel = digitalis_bemenet_1.read_single(6)  # DI18
    P6_motorvedo_hiba = digitalis_bemenet_1.read_single(7)  # DI19

    digitalis_bemenet_tomb_1 = [P2_motorvedo_hiba, P2_szivattyú_hiba, P2_automata_mod,
                                P3_uzemel, P3_motorvedo_hiba, P3_automata_mod, P6_uzemel, P6_motorvedo_hiba]

    return digitalis_bemenet_tomb_1


def digitalis_beolvasas_2():

    P6_automata_mod = digitalis_bemenet_2.read_single(0)  # DI20
    D1_uzemel = digitalis_bemenet_2.read_single(1)  # DI21
    D1_motorvedo_hiba = digitalis_bemenet_2.read_single(2)  # DI22
    D1_automata_mod = digitalis_bemenet_2.read_single(3)  # DI23
    P4_uzemel = digitalis_bemenet_2.read_single(4)  # DI24
    P5_uzemel = digitalis_bemenet_2.read_single(5)  # DI25
    T1_minimum_szint = digitalis_bemenet_2.read_single(6)  # DI26
    T1_maximum_szint = digitalis_bemenet_2.read_single(7)  # DI27

    digitalis_bemenet_tomb_2 = [P6_automata_mod, D1_uzemel, D1_motorvedo_hiba,
                                D1_automata_mod, P4_uzemel, P5_uzemel, T1_minimum_szint, T1_maximum_szint]

    return digitalis_bemenet_tomb_2


def digitalis_beolvasas_3():

    T1_vesz_maximum_szint = digitalis_bemenet_3.read_single(0)  # DI28
    T2_minimum_szint = digitalis_bemenet_3.read_single(1)  # DI29
    T2_maximum_szint = digitalis_bemenet_3.read_single(2)  # DI30
    T3_minimum_szint = digitalis_bemenet_3.read_single(3)  # DI31
    T3_maximum_szint = digitalis_bemenet_3.read_single(4)  # DI32
    T4_minimum_szint = digitalis_bemenet_3.read_single(5)  # DI33
    T4_maximum_szint = digitalis_bemenet_3.read_single(6)  # DI34
    K1_szint = digitalis_bemenet_3.read_single(7)  # DI35

    digitalis_bemenet_tomb_3 = [T1_vesz_maximum_szint, T2_minimum_szint, T2_maximum_szint,
                                T3_minimum_szint, T3_maximum_szint, T4_minimum_szint, T4_maximum_szint, K1_szint]

    return digitalis_bemenet_tomb_3


def digitalis_beolvasas_4():

    # IBC_minimum_szint = digitalis_bemenet_4.read_single(0)  #DI36
    # IBC_maximum_szint = digitalis_bemenet_4.read_single(1)  #DI37
    Kazan_uzemel = digitalis_bemenet_4.read_single(2)  # DI38
    Kazan_motorvedo_hiba = digitalis_bemenet_4.read_single(3)  # DI39
    Kazan_automata_mod = digitalis_bemenet_4.read_single(4)  # DI40
    # K1_szint = digitalis_bemenet_4.read_single(7)  #DI35
    bc_aramlasmero = digitalis_bemenet_4.read_single(5)
    r1_aramlasmero = digitalis_bemenet_4.read_single(6)
    kr1_aramlasmero = digitalis_bemenet_4.read_single(7)
    digitalis_bemenet_tomb_4 = [Kazan_uzemel,
                                Kazan_motorvedo_hiba, Kazan_automata_mod]

    return digitalis_bemenet_tomb_4


def T1_toltes():  # külön programban tárolni

    T1_tartalyszint = analog_bemenet_0.read_single(0)

    if T1_tartalyszint < 80:  # 80 százalékos tartályszint mellett kezdődhet a töltés
        digitalis_kimenet_1.write_single(0, 1)
        while T1_tartalyszint < 90:  # 90 százalékig a szivattyú üzemel
            T1_tartalyszint = analog_bemenet_0.read_single(0)

    return 0


def T2_urites():  # külön programban tárolni

    T2_tartalyszint = analog_bemenet_0.read_single(1)

    if T1_tartalyszint > 20:  # 20 százalékos tartályszint mellett kezdődhet az ürítés
        digitalis_kimenet_1.write_single(1, 1)
        while T1_tartalyszint > 10:  # 10 százalékig a szivattyú üzemel
            T1_tartalyszint = analog_bemenet_0.read_single(0)

    return 0


def Msz5zar_Msz6nyit():
    digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
    digitalis_kimenet_3.write_single(0, 0)
    digitalis_kimenet_3.write_single(1, 1)
    while digitalis_bemenet_tomb_0[4] != 1:
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        print("Msz5 zárás")
        time.sleep(1)
    digitalis_kimenet_3.write_single(1, 0)
    digitalis_kimenet_3.write_single(3, 0)
    digitalis_kimenet_3.write_single(2, 1)
    while digitalis_bemenet_tomb_0[7] != 1:
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        print("Msz6 nyitás")
        time.sleep(1)
    digitalis_kimenet_3.write_single(2, 0)


def Msz6zar_Msz5nyit():
    digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
    digitalis_kimenet_3.write_single(2, 0)
    digitalis_kimenet_3.write_single(3, 1)
    while digitalis_bemenet_tomb_0[6] != 1:
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        print("Msz6 zár")
        time.sleep(1)
    digitalis_kimenet_3.write_single(3, 0)
    digitalis_kimenet_3.write_single(1, 0)
    digitalis_kimenet_3.write_single(0, 1)
    while digitalis_bemenet_tomb_0[5] != 1:
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        print("Msz5 nyit")
        time.sleep(1)
    digitalis_kimenet_3.write_single(0, 0)


def alacsony_hom():
    print("Alacsony hom")
    digitalis_kimenet_0.write_single(3, 1)  # kazán indítás
    t4 = 0
    # kazán visszajelző
    Msz5zar_Msz6nyit()
    digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
    analog_kimenet_0.write_single(0, 2500)  # P2 frekvencia 30Hz
    digitalis_kimenet_0.write_single(0, 1)  # P2 indítás keringtetés
    analog_bemenet_tomb_1 = analog_beolvasas_1()

    while digitalis_bemenet_tomb_0[3] == 0:  # Ha P2 nem indul el
        print("P2 nem indul")
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        t4 = t4 + 1
        time.sleep(1)
        if t4 == 10:
            f = open('mosas', 'w')
            h = open('tisztitas', 'w')
            f.write("0")
            h.write("0")
            f.close()
            h.close()
            return
        # hiba

    # Amíg 20 foknál kisebb a hőmérséklet, addig nem változtatunk
    while analog_bemenet_tomb_1[0] < alacsony_hom_hatar:
        print("Alacsony homerseklet, határ = ", alacsony_hom_hatar)
        analog_bemenet_tomb_1 = analog_beolvasas_1()
        print("hom = ", analog_bemenet_tomb_1[0])
        print(analog_bemenet_tomb_1[3] < alacsony_hom_hatar)
        time.sleep(1)
        t4 = t4 + 1
        if t4 == 30:
            print("Tartos alacsony homerseklet")
            f = open('mosas', 'w')
            h = open('tisztitas', 'w')
            f.write("0")
            h.write("0")
            f.close()
            h.close()
            return

    digitalis_kimenet_0.write_single(0, 0)  # P2 leállítás
    print("P2 leállítás ", digitalis_bemenet_tomb_0[3])
    digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
    while digitalis_bemenet_tomb_0[3] != 0:  # P2 visszajelző ellenőrzés
        digitalis_beolvasas_0()
        print("P2 nem áll le")
        time.sleep(1)
        t4 = t4 + 1
        if t4 > 2:
            f = open('mosas', 'w')
            h = open('tisztitas', 'w')
            f.write("1")
            h.write("0")
            f.close()
            h.close()
            return
    Msz6zar_Msz5nyit()
    digitalis_kimenet_0.write_single(3, 0)


def frekvencia(bc_f_be, r1_f_be, kr1_f_be):

    bc_a = 400
    bc_b = 1
    r1_a = 56
    r1_b = 0
    kr1_a = 65
    kr1_b = 0
    bc_korrekcio = 0
    r1_korrekcio = 0
    kr1_korrekcio = 0
    bc_frekvencia = 0
    r1_frekvencia = 0
    kr1_frekvencia = 0

    bc = open('bc', 'r')
    r1 = open('r1', 'r')
    kr1 = open('kr1', 'r')
    bc_aramlas_manual = int(bc.read())
    r1_aramlas_manual = int(r1.read())
    kr1_aramlas_manual = int(kr1.read())
    bc.close()
    r1.close()
    kr1.close()

    bc_korrekcio = (bc_a - bc_aramlas_manual) * bc_b
    r1_korrekcio = (r1_a - r1_aramlas_manual) * r1_b
    kr1_korrekcio = (kr1_a - kr1_aramlas_manual) * kr1_b

    bc_frekvencia = bc_f_be + bc_korrekcio
    if bc_frekvencia > 4050:
        bc_frekvencia = 4050
    elif bc_frekvencia < 1000:
        bc_frekvencia = 1000
    r1_frekvencia = r1_f_be + r1_korrekcio
    if r1_frekvencia > 4050:
        r1_frekvencia = 4050
    elif r1_frekvencia < 1000:
        r1_frekvencia = 1000
    kr1_frekvencia = kr1_f_be + kr1_korrekcio
    if kr1_frekvencia > 4050:
        kr1_frekvencia = 4050
    elif kr1_frekvencia < 1000:
        kr1_frekvencia = 1000

    analog_kimenet_0.write_single(0, bc_frekvencia)
    analog_kimenet_0.write_single(1, r1_frekvencia)
    analog_kimenet_0.write_single(2, kr1_frekvencia)

    frekvencia_tomb = [bc_frekvencia, r1_frekvencia, kr1_frekvencia]

    return frekvencia_tomb


def T3_T4_ellenorzes():
    print("T3/T4 fuggveny")
    if digitalis_bemenet_tomb_3[4] == 1:
        # T3 maximum szint esetén P3 indítás
        digitalis_kimenet_1.write_single(2, 1)
    if digitalis_bemenet_tomb_3[6] == 1:
        # T4 maximum szint esetén P6 indítás
        digitalis_kimenet_1.write_single(3, 1)
    if digitalis_bemenet_tomb_3[3] == 1:
        # T3 minimum szint esetén P3 leállítás
        digitalis_kimenet_1.write_single(2, 0)
    if digitalis_bemenet_tomb_3[5] == 1:
        # T4 minimum szint esetén P6 leállítás
        digitalis_kimenet_1.write_single(3, 0)


t_keszenlet_ciklus = 0
t_keszenlet_ciklus_seged = 0
end_keszenlet_ciklus_ido = 0
start_keszenlet_ciklus_ido = 0
t_tisztitas_ciklus = 0
t_tisztitas_ciklus_seged = 0
end_tisztitas_ciklus_ido = 0
start_tisztitas_ciklus_ido = 0
t_tisztitas_maximum_ciklus = 0
t_tisztitas_maximum_ciklus_seged = 0
end_tisztitas_maximum_ciklus_ido = 0
start_tisztitas_maximum_ciklus_ido = 0
t_mosas_ciklus = 0
t_mosas_ciklus_seged = 0
end_mosas_ciklus_ido = 0
start_mosas_ciklus_ido = 0
t_mosas_maximum_ciklus = 0
t_mosas_maximum_ciklus_seged = 0
end_mosas_maximum_ciklus_ido = 0
start_mosas_maximum_ciklus_ido = 0
alacsony_hom_hatar = 3000
bc_f_be = 0
r1_f_be = 0
kr1_f_be = 0


f = open('mosas', 'w')
h = open('tisztitas', 'w')
f.write("0")
h.write("1")
f.close()
h.close()

f = open('mosas', 'r')
h = open('tisztitas', 'r')
mosas = int(f.read())
tisztitas = int(h.read())
f.close()
h.close()

digitalis_kimenet_1.write_single(0, 0)


def start():
    while True:
        print("Készenlét start")

        start_keszenlet_ciklus_ido = timer()
        time.sleep(5)
        Msz5zar_Msz6nyit()
        analog_bemenet_tomb_0 = analog_beolvasas_0()
        analog_bemenet_tomb_1 = analog_beolvasas_1()
        digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
        digitalis_bemenet_tomb_1 = digitalis_beolvasas_1()
        digitalis_bemenet_tomb_2 = digitalis_beolvasas_2()
        digitalis_bemenet_tomb_3 = digitalis_beolvasas_3()
        digitalis_bemenet_tomb_4 = digitalis_beolvasas_4()
        print(digitalis_bemenet_0.read_single(4))
        print("Beolvasás vége")

        if (digitalis_bemenet_tomb_0[3] == 1):  # P2 leállítás
            digitalis_kimenet_0.write_single(0, 0)

        if (digitalis_bemenet_tomb_2[4] == 1):  # P4 leállítás
            digitalis_kimenet_0.write_single(1, 0)

        if (digitalis_bemenet_tomb_2[5] == 1):  # P5 leállítás
            digitalis_kimenet_0.write_single(2, 0)

        if t_keszenlet_ciklus > 20:  # P1 leállítása keringtetés miatt óránként 10 percre
            if digitalis_bemenet_tomb_0[0] == 1:
                digitalis_kimenet_1.write_single(0, 0)
                t_keszenlet_ciklus = 0
            elif t_keszenlet_ciklus > 60:  # P1 indítása keringtetés miatt óránként 10 percre
                digitalis_kimenet_1.write_single(0, 1)
                t_keszenlet_ciklus = 0

        # Adatfeltöltés

        # kijelző parancs

        end_keszenlet_ciklus_ido = timer()
        t_keszenlet_ciklus_seged = end_keszenlet_ciklus_ido - start_keszenlet_ciklus_ido
        t_keszenlet_ciklus = t_keszenlet_ciklus + t_keszenlet_ciklus_seged
        print("Start ciklusido: ", start_keszenlet_ciklus_ido)
        print("t ciklusido: ", t_keszenlet_ciklus)
        print("t_seged ciklusido: ", t_keszenlet_ciklus_seged)
        print("end ciklusido: ", end_keszenlet_ciklus_ido)
        f = open('mosas', 'r')
        h = open('tisztitas', 'r')
        mosas = int(f.read())
        tisztitas = int(h.read())
        f.close()
        h.close()

        if tisztitas == 1:

            print("Tisztítás if start")

            print("T1: ", digitalis_bemenet_tomb_2[6], " ", digitalis_bemenet_tomb_3[0] == 1,
                  " T2: ", digitalis_bemenet_tomb_3[2])
            digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
            # T1 minimum szint
            if digitalis_bemenet_tomb_2[6] == 1 or digitalis_bemenet_tomb_3[0] == 1:
                print("T1 min-max")
                f = open('mosas', 'w')
                h = open('tisztitas', 'w')
                f.write("1")
                h.write("0")
                f.close()
                h.close()

            # T2 maximum szint
            if digitalis_bemenet_tomb_3[2] == 1 or digitalis_bemenet_tomb_3[2] == 1:
                print("T2 min-max")
                f = open('mosas', 'w')
                h = open('tisztitas', 'w')
                f.write("1")
                h.write("0")
                f.close()
                h.close()

            T3_T4_ellenorzes()
            print("T3/T4 ellenőrzés")
            digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
            print(
                "Msz6: ", digitalis_bemenet_tomb_0[7], "Msz5: ", digitalis_bemenet_tomb_0[4])

            print("Msz6 zár Msz5 nyit")
            analog_bemenet_tomb_1 = analog_beolvasas_1()
            # T1 tartály hőmérséklet kisebb 20 fok
            if analog_bemenet_tomb_1[0] < alacsony_hom_hatar:
                alacsony_hom()
                print("Mosas = ", mosas)
                print("Tisztitas = ", tisztitas)

            Msz6zar_Msz5nyit()
            frekvencia_tomb = frekvencia(4000, 2000, 2500)

            print("BC = ", frekvencia_tomb[0])

            analog_kimenet_0.write_single(
                0, frekvencia_tomb[0])  # P2 frekvencia 50Hz
            digitalis_kimenet_0.write_single(0, 1)  # P2 indítás
            # frekvencia számítás és megadás P4/P5
            analog_kimenet_0.write_single(1, frekvencia_tomb[1])
            digitalis_kimenet_0.write_single(1, 1)  # P4 indítás
            analog_kimenet_0.write_single(2, frekvencia_tomb[2])
            digitalis_kimenet_0.write_single(2, 1)  # P5 indítás
            t_tisztitas_ciklus = t_keszenlet_ciklus
            t_tisztitas_maximum_ciklus = t_keszenlet_ciklus
            t_keszenlet_ciklus = 0
            print("Tisztitás while előtt")
            f = open('mosas', 'r')
            h = open('tisztitas', 'r')
            mosas = int(f.read())
            tisztitas = int(h.read())
            f.close()
            h.close()

            while tisztitas == 1:

                print("Tisztitas")
                #print("Start ciklusido: ",start_tisztitas_ciklus_ido)
                #print("t ciklusido: ",t_tisztitas_ciklus)
                print("t_seged ciklusido: ", t_tisztitas_ciklus_seged)
                #print("end ciklusido: ",end_tisztitas_ciklus_ido)
                start_tisztitas_ciklus_ido = timer()
                start_tisztitas_maximum_ciklus_ido = timer()

                print("Tisztitas ciklus: ", t_tisztitas_ciklus)

                if t_tisztitas_ciklus > 20:  # P1 leállítása keringtetés miatt óránként 10 percre
                    if digitalis_bemenet_tomb_0[0] == 1:
                        digitalis_kimenet_1.write_single(0, 0)
                        t_tisztitas_ciklus = 0
                    elif t_tisztitas_ciklus > 60:  # P1 indítása keringtetés miatt óránként 10 percre
                        digitalis_kimenet_1.write_single(0, 1)
                        t_tisztitas_ciklus = 0

                if t_tisztitas_maximum_ciklus > 82800:  # 23 óra üzem után leállás és mosás
                    f = open('mosas', 'w')
                    h = open('tisztitas', 'w')
                    f.write("1")
                    h.write("0")
                    f.close()
                    h.close()

                analog_bemenet_tomb_0 = analog_beolvasas_0()
                analog_bemenet_tomb_1 = analog_beolvasas_1()
                digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
                digitalis_bemenet_tomb_1 = digitalis_beolvasas_1()
                digitalis_bemenet_tomb_2 = digitalis_beolvasas_2()
                digitalis_bemenet_tomb_3 = digitalis_beolvasas_3()
                digitalis_bemenet_tomb_4 = digitalis_beolvasas_4()

                # T1 minimum szint
                if digitalis_bemenet_tomb_2[6] == 1 or digitalis_bemenet_tomb_3[2] == 1:
                    f = open('mosas', 'w')
                    h = open('tisztitas', 'w')
                    f.write("1")
                    h.write("0")
                    f.close()
                    h.close()

                    # mosás indítás
                # T2 maximum szint
                if digitalis_bemenet_tomb_3[2] == 1 or digitalis_bemenet_tomb_3[2] == 1:
                    f = open('mosas', 'w')
                    h = open('tisztitas', 'w')
                    f.write("1")
                    h.write("0")
                    f.close()
                    h.close()

                # áramlásmérő beolvasás és frekvencia korrekció
                # kevert hőmérséklet 20 fok alatt
                if analog_bemenet_tomb_1[0] < alacsony_hom_hatar:
                    f = open('mosas', 'w')
                    h = open('tisztitas', 'w')
                    f.write("1")
                    h.write("0")
                    f.close()
                    h.close()

                T3_T4_ellenorzes()
                print("Frekvencia BC = ", frekvencia_tomb[0], "R1 = ",
                      frekvencia_tomb[1], "KR1 = ", frekvencia_tomb[2])
                frekvencia_tomb = frekvencia(
                    frekvencia_tomb[0], frekvencia_tomb[1], frekvencia_tomb[2])

                # adatfeltöltés
                # kijelző parancs
                f = open('mosas', 'r')
                h = open('tisztitas', 'r')
                mosas = int(f.read())
                tisztitas = int(h.read())
                f.close()
                h.close()

                if tisztitas == 0:
                    f = open('mosas', 'w')
                    f.write("1")
                    f.close()
                    f = open('mosas', 'r')
                    mosas = int(f.read())
                    f.close()
                    print("Mosas tisztitasban = ", mosas)

                time.sleep(10)
                end_tisztitas_ciklus_ido = timer()
                end_tisztitas_maximum_ciklus_ido = timer()
                t_tisztitas_ciklus_seged = (
                    end_tisztitas_ciklus_ido - start_tisztitas_ciklus_ido)
                t_tisztitas_ciklus = t_tisztitas_ciklus + t_tisztitas_ciklus_seged
                t_tisztitas_maximum_ciklus_seged = end_tisztitas_maximum_ciklus_ido - \
                    start_tisztitas_maximum_ciklus_ido
                t_tisztitas_maximum_ciklus = t_tisztitas_maximum_ciklus + \
                    t_tisztitas_maximum_ciklus_seged

        f = open('mosas', 'r')
        h = open('tisztitas', 'r')
        mosas = int(f.read())
        tisztitas = int(h.read())
        f.close()
        h.close()

        print("Mosas if elott ", mosas)

        if mosas == 1:

            # if digitalis_bemenet_tomb_2[6] == 1 or digitalis_bemenet_tomb_3[2] == 1:    #T1 minimum szint
            # break
            # if digitalis_bemenet_tomb_3[2] == 1 or digitalis_bemenet_tomb_3[2] == 1:    #T2 maximum szint
            # break

            if (digitalis_bemenet_tomb_0[0] == 1):  # P2 leállítás
                digitalis_kimenet_0.write_single(0, 0)

            if (digitalis_bemenet_tomb_2[4] == 1):  # P4 leállítás
                digitalis_kimenet_0.write_single(1, 0)

            if (digitalis_bemenet_tomb_2[5] == 1):  # P5 leállítás
                digitalis_kimenet_0.write_single(2, 0)
            time.sleep(0.5)

            Msz5zar_Msz6nyit()

            analog_kimenet_0.write_single(0, 2500)  # P2 frekvencia 30Hz
            digitalis_kimenet_0.write_single(0, 1)  # P2 indítás

            analog_kimenet_0.write_single(2, 3000)  # P5 frekvencia
            digitalis_kimenet_0.write_single(2, 1)  # P5 indítás

            t_mosas_ciklus = t_keszenlet_ciklus + t_tisztitas_ciklus
            t_mosas_maximum_ciklus = t_keszenlet_ciklus + t_tisztitas_ciklus
            f = open('mosas', 'r')
            h = open('tisztitas', 'r')
            mosas = int(f.read())
            tisztitas = int(h.read())
            f.close()
            h.close()

            while mosas == 1:
                f = open('mosas', 'r')
                h = open('tisztitas', 'r')
                mosas = int(f.read())
                tisztitas = int(h.read())
                f.close()
                h.close()

                print("Mosás start")
                start_mosas_ciklus_ido = timer()
                start_mosas_maximum_ciklus_ido = timer()
                t_mosas_ciklus_seged = end_mosas_ciklus_ido - start_mosas_ciklus_ido
                t_mosas_ciklus = t_mosas_ciklus + t_mosas_ciklus_seged
                t_mosas_maximum_ciklus_seged = end_mosas_maximum_ciklus_ido - \
                    start_mosas_maximum_ciklus_ido
                t_mosas_maximum_ciklus = t_mosas_maximum_ciklus + t_mosas_maximum_ciklus_seged

                if t_mosas_ciklus > 600:  # P1 leállítása keringtetés miatt óránként 10 percre
                    if digitalis_bemenet_tomb_0[0] == 1:
                        digitalis_kimenet_1.write_single(0, 0)
                        t_mosas_ciklus = 0
                    elif t_mosas_ciklus > 3600:  # P1 indítása keringtetés miatt óránként 10 percre
                        print("P1 keringtetés, mosás")
                        digitalis_kimenet_1.write_single(0, 1)
                        t_mosas_ciklus = 0

                if t_mosas_maximum_ciklus > 7200:
                    f = open('mosas', 'w')
                    f.write("0")
                    f.close()

                analog_bemenet_tomb_0 = analog_beolvasas_0()
                analog_bemenet_tomb_1 = analog_beolvasas_1()
                digitalis_bemenet_tomb_0 = digitalis_beolvasas_0()
                digitalis_bemenet_tomb_1 = digitalis_beolvasas_1()
                digitalis_bemenet_tomb_2 = digitalis_beolvasas_2()
                digitalis_bemenet_tomb_3 = digitalis_beolvasas_3()
                digitalis_bemenet_tomb_4 = digitalis_beolvasas_4()

                # if digitalis_bemenet_tomb_2[6] == 1 or digitalis_bemenet_tomb_3[2] == 1:    #T1 minimum szint
                #    break
                # if digitalis_bemenet_tomb_3[2] == 1 or digitalis_bemenet_tomb_3[2] == 1:    #T2 maximum szint
                #    break

                T3_T4_ellenorzes()

                # frekvencia korrekció

                # adatfeltöltés
                # kijelző parancs
                time.sleep(10)
                end_mosas_ciklus_ido = timer()
                end_mosas_maximum_ciklus_ido = timer()
