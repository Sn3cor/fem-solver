#set text(font: "New Computer Modern", size: 11pt)
#set page(paper: "a4", margin: 2cm)
#set heading(numbering: "1.")

= Initial problem
We consider the heat transfer equation on $Omega = [0, 2]$:
$ -k(x) u'' = 0 $
$ u'(0) + u(0) = 20 $
$ u(2) = 3 $
$ k(x) = cases(1 "for" x in [0, 1], 2 "for" x in (1, 2]) $

= Dirichlet condition
To reduce the non-homogeneous Dirichlet condition to a homogeneous one, we use the substitution $u = w + overline(u)$. We take the shift function as:
$ overline(u) = x + 1 $
So that $overline(u)(2) = 3$, therefore: $w(2) = 0$. The derivative of the shift is $overline(u)' = 1$.
In summary:
$ u = w + x + 1 $
$ u' = w' + 1 $
$ u'' = w'' $

= Robin condition
Using the shift, we transform the condition $u'(0) + u(0) = 20$:
$ w'(0) + 1 + w(0) + 1 = 20 $
$ w'(0) + w(0) = 18 $
$ w'(0) = 18 - w(0) $

= Weak formulation
We multiply the equation by a test function $v: forall v in V v(2) = 0$ and integrate by parts:
$ integral_0^2 k(x) u' v' space dif x - [k(x) u' v]_0^2 = 0 $

Substituting $u = w + overline(u)$ and expanding the boundary term at $x=0$ (keeping in mind that $v(2)=0$):
$ integral_0^2 k(x) w' v' space dif x + integral_0^2 k(x) v' space dif x  + k(0) w'(0) v(0) + k(0) v(0) = 0 $

Substituting the Robin condition into the variational equation with $k(0)=1$:
$ integral_0^2 k(x) w' v' space dif x + integral_0^2 k(x) v' space dif x + (18 - w(0)) v(0) + v(0) = 0 $
$ integral_0^2 k(x) w' v' space dif x - w(0)v(0) = -19v(0) - integral_0^2 k(x) v' space dif x $

= Final form $B(w, v) = L(v)$

$ B(w, v) = integral_0^2 k(x) w' v' space d x - w(0) v(0) $

$ L(v) = -19 v(0) - integral_0^2 k(x) v' space d x $
