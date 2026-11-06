# Les fauteuils de l’Académie de Montpellier

Une exploration chronologique des membres de l’Académie des sciences et lettres de Montpellier, à travers la succession des titulaires de ses fauteuils depuis 1847.

Ce projet s’inscrit dans une recherche sur les réseaux de médecins et de professeurs de médecine à Montpellier. Il permet de replacer leurs parcours dans un environnement savant plus large, aux côtés des membres des sections Sciences et Lettres.

## Explorer l’Académie

Un curseur permet de choisir une année et un filtre de sélectionner une section. Chaque fauteuil ouvre une fiche nominative regroupant les informations disponibles sur son titulaire et un lien vers sa notice sur le site de l’Académie.

La disposition des fauteuils est schématique : elle ne reproduit aucune salle réelle.

## Sources et données

Le corpus provient de l’[annuaire et des notices de l’Académie des sciences et lettres de Montpellier](https://www.ac-sciences-lettres-montpellier.fr/academie/membres). Sa version initiale comporte 763 lignes couvrant les élections de 1847 à 2026. Une même personne peut apparaître plusieurs fois lorsqu’elle change de fauteuil.

Les informations biographiques sont plus développées pour la section Médecine : dates de naissance et de décès, parrains, carrière et fonctions à l’Académie. Une information absente ne signifie pas que l’événement ou la relation n’a pas existé.

Le fichier [membres.csv](membres.csv) constitue la source des données du site. Les dates sont conservées sous la forme AAAA-MM-JJ, ou AAAA lorsque seule l’année est connue. Les précisions disponibles sont indiquées séparément. Le corpus reste ouvert aux corrections et aux enrichissements.

## Méthode de reconstitution

Pour chaque fauteuil d’une section, la visualisation retient la dernière année d’entrée connue antérieure ou égale à l’année choisie. L’année d’élection d’un successeur marque le changement de titulaire dans l’affichage.

Cette convention ne restitue pas toutes les vacances, démissions ou passages à l’honorariat. Un nom peut rester affiché après un décès jusqu’à l’élection suivante ; la fiche le signale lorsque la date est renseignée. La mention « Non renseigné » ne constitue pas une vacance attestée.

Les transferts documentés font l’objet d’ajustements explicites. Les divergences de dates sont expliquées dans les fiches. Lorsque plusieurs personnes partagent la même année d’entrée dans un fauteuil, leurs noms apparaissent ensemble sans imposer un ordre non documenté.

## Fonctionnement et mises à jour

Le site utilise HTML, CSS et JavaScript, sans framework. Chaque modification enregistrée sur la branche principale du dépôt (main ou master) déclenche un workflow GitHub Actions : les données sont régénérées depuis membres.csv, puis le site est publié sur GitHub Pages.

Le fichier data.js est recalculé lors de la publication, sans commit supplémentaire dans le dépôt. Il ne nécessite aucune modification manuelle. Le classeur Excel est une copie de référence ; il n’alimente pas automatiquement le site.

Pour une consultation locale après modification du CSV, exécuter python3 convertir.py puis ouvrir index.html. Le convertisseur utilise uniquement la bibliothèque standard de Python 3.

## Contribuer

Les corrections peuvent être proposées par une issue ou une pull request, en précisant la personne concernée, le fauteuil, la modification et une source vérifiable. Les modifications du CSV doivent conserver les en-têtes, l’encodage UTF-8 et le séparateur point-virgule.

Ce projet de recherche est indépendant de l’Académie des sciences et lettres de Montpellier et ne constitue pas son site officiel.
