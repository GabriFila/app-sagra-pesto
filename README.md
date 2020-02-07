## English Below

# App - Sagra del pesto
Un'app per gestire gli ordini della Sagra del Pesto di Genova 


# Ruoli Utente 
- admin
- cassiere
- cameriere
- bar
- primi
- secondi
- smazzo

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
## Bar
- visualizza il bere e i dolci degli ordini che sono in preparazione
- cambiare lo stato del bere e dei dolci quando sono pronti (notificare smazzo e camerieri) creare nuovi OrdiniIstantanei
## Primi
- visualizza i primi degli ordini che sono in preparazione
- cambiare lo stato del primo quando è pronto (notificare smazzo e camerieri) 
## Secondi
- visualizza i secondi degli ordini che sono in preparazione
- cambiare lo stato del secondo quando è pronto (notificare smazzo e camerieri) 

## Smazzo
- vedere gli ordini non assegnati
- vede 3 colonne (bar, primi, secondi), nelle colonne vede gli ordini in corso e il loro stato (preparazione, pronto)
- concludere una portata di un ordine
- recuperare vecchie portate di ordini già conclusi

# Permessi ruoli

### creazione ordine
- cassa solo ordini 'normali'
- bar solo ordini istantanei
### modifica ordini selettiva 
- cassa modifica tutto
- cameriere modiica solo suoi ordini
- bar modifica solo la parte bar
- cucina primi modifica solo la parte primi
- secondi modifica solo la parte secondi
### modifica menu
- admin
### inizio/fine servizio
- admin
### modifica ruoli utente
-  superAdmin

# Interfacce


# Funzoni server - da eseguire in ambiente 'sicuro'
### creazione nuovo ordine
creare una 'transazine' guardando l'id dell'ultimo ordine del servizio corrente e crearne uno nuovo con l'id incrementato di uno

### modifica ruoli utenti
Quando viene regitrato un nuovo utente, creare un nuovo record nella collezione ruoliUtenti con campo ruoli pari a []. Quando viene modificato un documento modificare le custom claims di un utente mettendole pari a quelle nella collection


# Logging
Loggare update degli ordini per avere dati statistici

# Struttura DB Firestore

### courses
Ogni documento corrisponde a una [portataMenu](##portataMenu)
### services
Ogni documento corrisponde a un [servizio](##servizio) nel tempo. Ogni servizio ha due sottocollezioni: ordini e OrdiniIstantanei 
- #### orders
   Sotto collezione di services contentente un documento per ogni [ordine](##ordine)
- #### instantOrders
    Sotto collezione di services contentente un documento per ogni [ordine istantaneo](##ordine)

### users
Ogni documento corrisponde a un utente dell'app e contiene info aggiuntive. Potrebbe essere utile in futuro
### userRoles
Ogni oggetto contiene una proprietà contenenete i ruoli degli utenti. Modificabili solo dal superAdmin. L'ID di ogni oggetto è 'r_${uid}'

# Security rules


# Strutture in codice

## servizio
``` typescript
interface IService
{
    start: Date,
    end: Date,
    totalRevenue: number,   
    totalCovers: number,    // total number of people
    lastOrderId : number,   // progressive counter for orders
    ??? menu: Menu ???,     // could be useful for long term analysis but could change durign service
}
```

## ordine istantaneo
``` typescript
interface IInstantOrder
{
    revenue: number,
    courses: ICourse[],
}
```

## ordine
``` typescript
interface IOrder
{
    id: number,
    status: string,     // (pending, completed, cancelled)
    waiterName: string, // display name of waiter
    waiterId: string,   // id of waiter to link
    table: number,
    revenue: number,
    courses: ICourse[],
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

# Note 
