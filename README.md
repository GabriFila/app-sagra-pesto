## English Below

# App - Sagra del pesto
Un'app per gestire gli ordini della Sagra del Pesto di Genova 


# Struttura DB Firestore


### Portate
Ogni documento corrisponde a una [portataMenu](##portataMenu)
### Servizi
Ogni documento corrisponde a un [servizio](##servizio) nel tempo. Ogni servizio ha due sottocollezioni: ordini e ordiniLiberi 
### Ordini e OrdiniLiberi
Sotto collezione di Servizi contentente un documento per ogni [ordine](##ordine)
### Utenti
Ogni documento corrisponde a un utente dell'app e contiene info aggiuntive. Potrebbe essere utile in futuro
### ruoliUtenti
Ogni oggetto contiene una proprietà contenenete i ruoli degli utenti. Modificabili solo dal superAdmin. L'ID di ogni oggetto è 'r_${uid}'





# Strutture in codice

## servizio
``` typescript
interface IService
{
    start: Date,
    end: Date,
    totalRevenue: number,   // total revenue from
    totalCovers: number,    // total number of people
    lastOrderId : number,   // keep progressive counter for orders
    ??? menu: Menu ???,     // could be useful for long term analysis but could change durign service
}
```

## ordine
``` typescript
interface IOrder
{
    id: number,
    status: string,     // (pending, completed, cancelled)
    waiterName: string, 
    waiterId: string,   // don't know if it will like this
    table: number,
    revenue: number,
    portate: ICourse[],
}
```

## portataMenu
``` typescript
interface ICourseMenu
{
    name: string,
    kitchen: string,
    dishes: IDishMenu[]
}
```

## piattoMenu
``` typescript
interface IDishMenu
{
    name: string,
    shortName: string,
    qt: number
}
```

## portata
``` typescript
interface ICourse
{
    name: string,
    kitchen: string,
    status: string      //(waiting,prep,ready,delivered)
    dishes: IDish[]
}
```


## piatto
``` typescript
interface IDish
{
    shortName: string,
    qt: number
}
```

# Ruoli Utente 
## Admin
- modificare la quantità di cibo rimanente
- modificare il menu
- iniziare e concludere il servizio
- vedere info su incassi e ordini

## Cassiere
- creare nuovi ordini al sistema
- stampare l'ordine
- modificare ordine già fatto

## Cameriere
- associare ordine e tavolo
- impostare una portata di un ordine in stato di preparazione (mandare alle cucine) 
- concludere una portata di un ordine
- modificare un proprio ordine
- _LAST_ Ricevere modifica quando un ordine è pronto

## Cucina
- visualizza le portate degli ordini che sono in preparazione
- cambiare lo stato della portata quando è pronta (notificare smazzo e camerieri)

## Bar
- visualizza le portate degli ordini che sono in preparazione
- cambiare lo stato della portata quando è pronta (notificare smazzo e camerieri) creare nuovi ordiniLiberi
 
## Smazzo
- vedere gli ordini non assegnati
- vede 3 colonne (bar, primi, secondi), nelle colonne vede gli ordini in corso e il loro stato (preparazione, pronto)
- concludere una portata di un ordine
- recuperare vecchie portate di ordini già conclusi

# Security rules

### creazione ordine
### modifica ordine
### modifica menu
### inizio/fine servizio
### modifica ruoli utente

# Interfacce


# Cloud functions
### creazione nuovo ordine
creare una 'transazine' guardando l'id dell'ultimo ordine del servizio corrente e crearne uno nuovo con l'id incrementato di uno

### modifica ruoli utenti
Quando viene regitrato un nuovo utente, creare un nuovo record nella collezione ruoliUtenti con campo ruoli pari a []. Quando viene modificato un documento modificare le custom claims di un utente mettendole pari a quelle nella collection




# Logging


# Note 
!!! Se un cameriere ha bisogno di modificare una portata che ha già consegnato deve fare un ordine libero