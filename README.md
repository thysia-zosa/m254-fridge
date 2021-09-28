# M254-Fridge

## Prozessbeschreibung

Ein Kühlschranksystem kontrolliert Ein- und Ausgänge von Waren.
Der User kann sich den Warenbestand anzeigen lassen und im System eingeben:

* wenn eine Kühlschrankware (in Stückzahl) aufgebraucht wird
  (z.B. ein Käse, ein Joghurt),
* wenn er einkauft und neue Waren hinzufügt.

Der Kühlschrank kontrolliert die Mengen und verschickt eine Meldung:

* wenn ein Warenbestand einen kritischen Wert unterschreitet,
* in regelmässigem Abstand für eine Einkaufsliste,
* wenn eine Ware bald ihr Ablaufdatum erreicht.

## Planung

Folgende Lebensmittel können registriert werden:

* Milch
* Käse
* Joghurt
* Aufschnitt
* Mayonnaise
* Konfitüre
* Essiggurken
* Salat
* Gemüse
* ...?

### Frontend

* Überblick Warenbestand
* Eingabemaske für Wareneingang
* "Eingabemaske" für Warenausgang
* Eingabemaske für Settings

### Backend

* Anbindung zur Camunda-Rest-API
* Anbindung zur MongoDB

#### Endpoints

* Waren anzeigen
* Ware hinzufügen
* Ware wegnehmen
* Ware bearbeiten
