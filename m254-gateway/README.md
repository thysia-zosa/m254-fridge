# Dart-Gateway für die Kühlschrank-App

* nimmt Anfragen aus dem Frontend (Presentation Layer) entgegen;
* startet einen Camunda-Plattform-Prozess
* füttert den Prozess mit den nötigen Informationen
* gibt das Resultat an's Frontend weiter bzw. verarbeitet das Resultat zu
  einem Mail

## API ("externe" Auslöser)

**Base URL:** `http://localhost:8087`

### Endpoints  

> **Add Food Item**
> 
> Path: `/`  
> 
> Method: _POST_
> 
> Format:  
> ```typescript
> body: {
>   id: string,
>   type: string,
>   expirationDate: string,
>   description: string
> }
> ```
>
> Example:  
> ```typescript
> body: {
>   id: "fe0659bd-91e6-482e-ab4e-847ff61f2d0a",
>   type: "milk",
>   expirationDate: "2021-12-02",
>   description: "500ml Vollmilch"
> }
> ```
> 
> Return:  
> _201 Created_
> ```typescript
> body: { }
> ```

---

> **Get Inventory**  
> 
> Path: `/`  
> 
> Method: _GET_  
> 
> Format:  
> ```typescript
> body: { }
> ```
> 
> Example:  
> ```typescript
> body: { }
> ```
> 
> Return:  
> _200 Ok_  
> ```typescript
> body: {
>   id: string,
>   type: string,
>   expirationDate: string,
>   description: string
> }[]
> ```

---

> **Update Food Item**  
> 
> Path: `/`  
> 
> Method: _PUT_  
> 
> Format:  
> ```typescript
> body: {
>   id: string,
>   type: string,
>   expirationDate: string,
>   description: string
> }
> ```
> 
> Example:  
> ```typescript
> body: {
>   id: "fe0659bd-91e6-482e-ab4e-847ff61f2d0a",
>   type: "milk",
>   expirationDate: "2021-12-02",
>   description: "500ml Vollmilch"
> }
> ```
> 
> Return:  
> _200 Ok_  
> ```typescript
> body: { }
> ```

---

> **Delete Food Item**  
> 
> Path: `/{id}`  
> 
> Method: _DELETE_  
> 
> Format:  
> ```typescript
> body: { }
> ```
> 
> Example:  
> ```typescript
> body: { }
> ```
> 
> Return:  
> _204 No Content_
> ```typescript
> body: { }
> ```

## "Interne" Auslöser

### Einkaufsliste verschicken

### Warnung bei nahendem Ablaufdatum verschicken
