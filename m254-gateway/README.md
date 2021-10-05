# Dart-Gateway für die Kühlschrank-App

* nimmt Anfragen aus dem Frontend (Presentation Layer) entgegen;
* startet einen Camunda-Plattform-Prozess
* füttert den Prozess mit den nötigen Informationen
* gibt das Resultat an's Frontend weiter bzw. verarbeitet das Resultat zu
  einem Mail

## API ("externe" Auslöser)

"http://localhost:8087/"

### Warenbestand anzeigen

GET, ohne body

### Warenbestand aktualisieren

* name: Art des Gegenstandes (z.B. "Käse")
* date: Ablaufdatum

#### Hinzufügen

POST

body: {
  "name": "",
  "date": ""
}

#### Verändern

PUT

body: {
  "id": "",
  "name": "",
  "date": ""
}

#### Wegnehmen

DELETE

body: {
  "id": "xyz"
}

## "Interne" Auslöser

### Einkaufsliste verschicken

### Warnung bei nahendem Ablaufdatum verschicken
