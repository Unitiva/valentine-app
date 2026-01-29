#!/usr/bin/env python3
"""
Script per verificare che le parti critiche del fix siano nel Word.
"""

from pathlib import Path

# Leggi il file ARTICOLO.md (estratto dal Word)
articolo = Path("/Users/vasco/Documents/Unitiva/valentine app/valentine-app/ARTICOLO.md").read_text()

# Leggi il sorgente di QuestionCard
source = Path("/Users/vasco/Documents/Unitiva/valentine app/valentine-app/src/components/QuestionCard.jsx").read_text()

print("=" * 70)
print("VERIFICA CHIAVE: QuestionCard.jsx")
print("=" * 70)

# Verifica le parti critiche (il fix del bug)
checks = [
    ("useRef import", "useRef"),
    ("questionRef declaration", "const questionRef = useRef(question)"),
    ("hasAnsweredRef declaration", "const hasAnsweredRef = useRef(false)"),
    ("handleSelect function", "const handleSelect = useCallback"),
    ("hasAnsweredRef check", "if (hasAnsweredRef.current) return"),
    ("Early return dopo hooks", "// Early return DOPO tutti gli hooks"),
    ("questionRef.current usage", "questionRef.current"),
    ("handleTimeout con ref", "const currentQuestion = questionRef.current"),
]

print("\n📋 CONTROLLO PARTI CRITICHE (fix del bug timer):\n")

all_ok = True
for name, pattern in checks:
    in_source = pattern in source
    in_articolo = pattern in articolo
    
    if in_source and in_articolo:
        status = "✅"
    elif in_source and not in_articolo:
        status = "❌ MANCA NEL WORD"
        all_ok = False
    elif not in_source and in_articolo:
        status = "⚠️ EXTRA NEL WORD"
    else:
        status = "❓ Non trovato"
    
    print(f"  {status} {name}")

print("\n" + "=" * 70)
if all_ok:
    print("✅ TUTTE LE PARTI CRITICHE SONO PRESENTI NEL WORD!")
else:
    print("❌ CI SONO PARTI MANCANTI NEL WORD")
print("=" * 70)
