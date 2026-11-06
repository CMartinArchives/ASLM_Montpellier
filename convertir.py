"""Après modification du CSV : python convertir.py (Python 3, sans dépendance)."""
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
members = []
with (ROOT / 'membres.csv').open(encoding='utf-8-sig', newline='') as source:
    for r in csv.DictReader(source, delimiter=';'):
        m = dict(id=r['Identifiant'], last=r['Nom'], first=r['Prénom'],
                 section=r['Section'], seat=int(r['Fauteuil']), election=int(r['Année d’élection']),
                 sponsors=r['Parrains'], birth=r['Naissance'], birthPrecision=r['Précision naissance'],
                 death=r['Décès'], deathPrecision=r['Précision décès'], url=r['Notice'],
                 transfer=r['Transferts'], career=r['Carrière'], roles=r['Fonctions à l’Académie'])
        m['last'] = re.sub(r'\s*\(2\)$', '', m['last']).replace('Bechamp', 'Béchamp')
        m.update(start=m['election'], end=None, note='')
        # Exceptions explicites du tableur ; ne pas extraire automatiquement
        # des dates d'un texte libre qui peut décrire plusieurs événements.
        if m['section'] == 'Médecine':
            if m['last'] == 'Jaffiol':
                if m['seat'] == 12: m['end'] = 1992
                if m['seat'] == 23:
                    m['start'] = 1992
                    m['note'] = 'Entrée dans ce fauteuil fixée à 1992 d’après le transfert ; 1987 est l’année d’élection initiale.'
            if m['last'] == 'Baylet' and m['seat'] == 30:
                m['end'] = 1992
                m['note'] = 'Bascule conventionnelle en 1992 d’après la ligne du fauteuil 12 ; le texte du transfert indique « après 1992 ».'
            if m['last'] == 'Baylet' and m['seat'] == 12:
                m['note'] = 'Bascule conventionnelle en 1992 ; le texte du transfert depuis le fauteuil 30 indique « après 1992 ».'
            if m['last'] == 'Boudet':
                if m['seat'] == 30: m['end'] = 1995
                m['note'] = 'Transfert indiqué en 1995, mais la ligne du fauteuil 14 porte 1996. L’ancien siège cesse d’être attribué à cette personne en 1995 ; le nouveau commence en 1996.'
            if m['last'] == 'Béchamp' and m['seat'] == 19: m['end'] = 1863
            if m['last'] == 'Bertin-Sans' and m['seat'] == 20: m['end'] = 1896
        if m['section'] == 'Sciences' and m['last'] == 'Béchamp' and m['seat'] == 9:
            m['end'] = 1871
        members.append(m)
(ROOT / 'data.js').write_text('const MEMBERS = ' + json.dumps(members, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'{len(members)} lignes exportées dans data.js')
