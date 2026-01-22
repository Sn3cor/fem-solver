#set text(font: "New Computer Modern", size: 11pt)
#set page(paper: "a4", margin: 2cm)
#set heading(numbering: "1.")

= Problem wyjściowy
Rozważamy równanie transportu ciepła w  $Omega = [0, 2]$:
$ -k(x) u'' = 0 $
$ u'(0) + u(0) = 20 $
$ u(2) = 3 $
$ k(x) = cases(1 "dla" x in [0, 1], 2 "dla" x in (1, 2]) $

= Warunek Dirichleta
Aby sprowadzić niejednorodny warunek Dirichleta do warunku jednorodnego, stosujemy podstawienie $u = w + overline(u)$. Przyjmujemy funkcję shiftu jako:
$ overline(u) = x + 1 $
Tak, aby $overline(u)(2) = 3$, zatem: $w(2) = 0$. Pochodna shiftu wynosi $overline(u)' = 1$.
Podsumowując:
$ u = w + x + 1 $
$ u' = w' + 1 $
$ u'' = w'' $

= Warunek Robina
Korzystają z shiftu przekształcamy warunek $u'(0) + u(0) = 20$:
$ w'(0) + 1 + w(0) + 1 = 20 $
$ w'(0) + w(0) = 18 $
$ w'(0) = 18 - w(0) $

= Sformułowanie słabe
Mnożymy równanie przez funkcję testową $v: forall v in V v(2) = 0$ i całkujemy przez części:
$ integral_0^2 k(x) u' v' space dif x - [k(x) u' v]_0^2 = 0 $

Podstawiając $u = w + overline(u)$ oraz rozpisując człon brzegowy dla $x=0$ (pamiętając, że $v(2)=0$):
$ integral_0^2 k(x) w' v' space dif x + integral_0^2 k(x) v' space dif x  + k(0) w'(0) v(0) + k(0) v(0) = 0 $

Podstawiając warunek Robina do równania wariacyjnego przy $k(0)=1$:
$ integral_0^2 k(x) w' v' space dif x + integral_0^2 k(x) v' space dif x + (18 - w(0)) v(0) + v(0) = 0 $
$ integral_0^2 k(x) w' v' space dif x - w(0)v(0) = -19v(0) - integral_0^2 k(x) v' space dif x $

= Postać końcowa $B(w, v) = L(v)$

$ B(w, v) = integral_0^2 k(x) w' v' space d x - w(0) v(0) $

$ L(v) = -19 v(0) - integral_0^2 k(x) v' space d x $
