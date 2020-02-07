## English Below

# App - Sagra del pesto
Un'app per gestire gli ordini della Sagra del Pesto di Genova 


# Struttura DB Firestore


### Portate
Ogni documento corrisponde a una [portataMenu](##portataMenu)
### Servizi
Ogni documento corrisponde a un [servizio](##servizio) nel tempo
#### Ordini
Sotto collezione di Servizi contentente un documento per ogni [ordine](##ordine)
### Utenti
Ogni documento corrisponde a un utente dell'app e contiene info aggiuntive. Potrebbe essere utile in futuro
### ruoliUtenti
Ruoli degli utenti. Modificabili solo dal superAdmin





# Strutture dati per codice

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
    status: string, // (pending, completed, cancelled)
    waiterName: string, 
    waiterId: string,
    table: number,
    revenue: number,
    bere: ICourseOrder,
    primo: ICourseOrder,
    secondo: ICourseOrder,
    dolce: ICourseOrder
}
```

## portataMenu
``` typescript
interface ICourseMenu
{
    name: string,
    status: string //(waiting,prep,ready,delivered)
    dish: IDish[]
}
```
## portataOrdine
``` typescript
interface ICourseOrder
{
    status: string //(waiting,prep,ready,delivered)
    dish: IDish[]
}
```

# Ruoli Utente - Security rules



# Interfacce


# Funzioalità server


# Logging