"""Bokvy, veckohistorik och belöningar i den riktiga lokala appen.

Den tidigare rullvyns kontroller körs nu mot boken i JS-testet. Det
behåller veckogränser, framsteg, halva XP en gång, återupptagning,
serverstöd och omladdning, och kontrollerar även animationer och fokus.
"""
from pathlib import Path
import subprocess

if __name__ == '__main__':
    raise SystemExit(subprocess.call(['node', str(Path(__file__).with_name('uppdragsbok-vy.browser.js'))]))
