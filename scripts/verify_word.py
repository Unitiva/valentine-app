#!/usr/bin/env python3
"""
Script per verificare che il documento Word corrisponda al codice sorgente.
"""

from docx import Document
from pathlib import Path
import difflib

PROJECT_ROOT = Path(__file__).parent.parent
WORD_FILE = Path("/Users/vasco/Downloads/React web app per san valentino - AGGIORNATO.docx")


def extract_code_block(paragraphs, start_marker):
    """Estrae un blocco di codice dal documento Word."""
    in_block = False
    code_lines = []
    
    for para in paragraphs:
        text = para.text
        
        if start_marker in text:
            in_block = True
            code_lines.append(text)
            continue
        
        if in_block:
            # Fine del blocco quando troviamo una riga vuota dopo }
            if text.strip() == "" and code_lines and code_lines[-1].strip() == "}":
                break
            # O quando inizia un nuovo blocco
            if text.startswith("// src/components/") and len(code_lines) > 5:
                break
            code_lines.append(text)
    
    return "\n".join(code_lines)


def read_source_file(component_name):
    """Legge il file sorgente."""
    file_path = PROJECT_ROOT / "src" / "components" / f"{component_name}.jsx"
    if file_path.exists():
        return file_path.read_text(encoding="utf-8")
    return ""


def main():
    # Carica il documento
    doc = Document(WORD_FILE)
    
    # Componenti da verificare
    components = ["StartScreen", "SetupScreen", "QuestionCard"]
    
    print("=" * 70)
    print("VERIFICA CORRISPONDENZA CODICE: WORD vs SORGENTE")
    print("=" * 70)
    
    all_match = True
    
    for comp in components:
        print(f"\n{'='*70}")
        print(f"📄 COMPONENTE: {comp}.jsx")
        print("=" * 70)
        
        # Codice dal Word
        word_code = extract_code_block(doc.paragraphs, f"// src/components/{comp}.jsx")
        
        # Codice sorgente
        source_code = f"// src/components/{comp}.jsx\n" + read_source_file(comp)
        
        # Normalizza (rimuovi spazi extra, normalizza newline)
        word_lines = [l.strip() for l in word_code.split("\n") if l.strip()]
        source_lines = [l.strip() for l in source_code.split("\n") if l.strip()]
        
        # Confronta
        if word_lines == source_lines:
            print("✅ IDENTICO - Il codice nel Word corrisponde esattamente al sorgente!")
            print(f"   Righe confrontate: {len(source_lines)}")
        else:
            all_match = False
            # Mostra le differenze
            print("⚠️  DIFFERENZE TROVATE:")
            
            differ = difflib.unified_diff(
                source_lines[:50],
                word_lines[:50],
                fromfile='SORGENTE',
                tofile='WORD',
                lineterm=''
            )
            
            diff_count = 0
            for line in differ:
                if line.startswith('+') or line.startswith('-'):
                    if not line.startswith('+++') and not line.startswith('---'):
                        print(f"   {line[:80]}")
                        diff_count += 1
                        if diff_count > 10:
                            print("   ... (altre differenze omesse)")
                            break
            
            if diff_count == 0:
                print("✅ Nessuna differenza significativa nelle prime 50 righe")
        
        print(f"\n   Righe nel sorgente: {len(source_lines)}")
        print(f"   Righe nel Word: {len(word_lines)}")
    
    print("\n" + "=" * 70)
    if all_match:
        print("✅ VERIFICA COMPLETATA: TUTTO CORRISPONDE!")
    else:
        print("⚠️  VERIFICA COMPLETATA: CI SONO DIFFERENZE")
    print("=" * 70)


if __name__ == "__main__":
    main()
