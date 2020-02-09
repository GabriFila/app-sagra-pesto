# App - Sagra del pesto
Di seguito la documentazione dell'app per gestire gli ordini della Sagra del Pesto di Genova. La prima parte descrive il comportamento dell'app, la seconda ne descrive il funzionamento

# Oggetti base
- servizio: sessione per pasto
- ordini: ordine normale fatto dalla cassa che deve passare attraverso cameriere -> cucina -> smazzo
- ordini istantanei: ordine fatto dal bar che viene consegnato al cliente direttamente
- portate: elementi dell'ordine elaborati da una singola cucina
- piatti: elementi di ogni portata

# Ruoli Utente 
- super admin
- admin
- cassiere
- cameriere
- bar
- primi
- secondi
- smazzo

# Compiti di ciascun ruolo
## Super admin
- modifica ruoli utente 
## Admin
- modificare la quantità di cibo rimanente
- modificare il menu
- iniziare e concludere il servizio
- vedere info su incassi e ordini
## Cassiere
- creare ordini
- stampare l'ordine
- modificare ordine già fatto
## Cameriere
- associare ordine e tavolo
- mandare una portata di un ordine in preparazione
- concludere una portata di un ordine
- modificare l'ordine
- _LAST_ Ricevere modifica quando un ordine è pronto
## Bar
- visualizzare il bere e i dolci degli ordini che sono in preparazione
- cambiare lo stato del bere e dei dolci quando sono pronti (notificare smazzo e camerieri)
- creare ordini istantanei
## Primi
- visualizzare i primi degli ordini che sono in preparazione
- cambiare lo stato dei prime quando sono pronti (notificare smazzo e camerieri) 
## Secondi
- visualizzare i secondi degli ordini che sono in preparazione
- cambiare lo stato dei secondi quando sono pronti (notificare smazzo e camerieri) 

## Smazzo
- vedere gli ordini non assegnati
- vedere gli ordini in corso e il loro stato (preparazione, pronto)
- concludere la portata di un ordine
- recuperare vecchie portate di ordini già conclusi per eventuali modifiche

# Permessi ruoli

### creazione ordine
- cassa solo ordini 'normali'
- bar solo ordini istantanei
### modifica ordini selettiva 
- cassa modifica solo portate e stato
- smazzo modifica stato
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

## Generale
Ogni interfaccia ha una top bar con:
- se loggato:
  - il nome dell'utente e il tipo di interfaccia (es: Furio-dashboard)
  - un tasto per fare il logout
  - se ruolo è smazzo
    - una sezione con gli ordini pendenti
    - un tasto cerca per modificare un ordine già fatto
  - se ruolo è cassa:
    - un tasto cerca per modificare un ordine già fatto
- se non loggato:
  - un tasto per fare il login o registrarsi

## Home
contiene i link che portano alle altre interfacce
## DashBoard
- una sezione per vedere e modificare il menu e le quantità in magazzino
- un tasto per iniziare/concludere il servizio (verde per aprilo e rosso per chiuderlo)
- una sezione per le info su ordini e incassi del servizio corrente e quelli passati
## Cassa istantanea
una sezione per ogni portata con i piatti istantanei nel menu. Ogni piatto è una riga con:
- la quantità rimanente in magazzino
- un tasto '-' per decrementare le quantità richieste dal cliente
- un tasto '+' per incrementare le quantità richieste dal cliente
## Cassa
una sezione per ogni portata con i piatti nel menu. Ogni piatto è una riga con:
- la quantità rimanente in magazzino
- un tasto '-' per decrementare le quantità richieste dal cliente
- un tasto '+' per incrementare le quantità richieste dal cliente

una sezione contente:
- il totale dell'ordine
- un tasto per  inviarlo al sistema
- un tasto per vedere il numero dell'ordine
- un tasto per stampare l'ordine

Un tasto cerca per trovare un ordine passato e modificarlo
## Cameriere
Un tasto '+' per collegare ordine-cameriere-tavolo
un tab per ogni ordine con:
- il numero dell'ordine 
- il numero del tavolo
- le portate dell'ordine, contenente:
  - un tasto per completare la portata 
  - un tasto per mandare la portata in preparazione
  - una riga per piatto della portata contente i piattie le quantità
## Cucine/bar
Una sezione ampia con tutti gli ordini in preparazione della propria cucina, ognuno con un tasto per segnarli completati

Una mini sezione con il totale dei piatti da preparare attualmente

## Smazzo
 3 colonne (bar, primi, secondi), contentti le portate degli ordini in corso e il loro stato (preparazione, pronto). Ogni portata contiene:
 - lista dei piatti
 - tasto per concludere la portata

# Logging
Loggare update degli ordini per avere dati statistici


-----

# URL interfacce

base = url di default (sagra.genova.cngei.it)
home = base
dashboard = base/dashboard
cucina primi = base/primi
cucina secondi = base/secondi
bar = base/bar
cassa = base/cassa
cassa istantanea = base/cassaBar
camerieri = base/cameriere

# Funzoni server (da eseguire in ambiente sicuro)
### creazione nuovo ordine (unica transazione)
- leggere il counter per l'id dell'ultimo ordine
- creare uno nuovo ordine con l'id incrementato di uno
- aggiornare il counter per l'id dell'ultimo ordine
- aggiornare il revenue totale del servizio
- aggiornare le quantità nello storage


### trigger dopo creazione ordine istantaneo
- aggiornare la revenue del servizio


### trigger creazione nuovo utente
- creare un nuovo record nella collezione ruoliUtenti con campo ruoli pari a []

### trigger modifica ruoli utenti
- modificare le custom claims di un utente mettendole pari a quelle nel documento


# Struttura Firestore DB

### coursesInMenu
Ogni documento corrisponde a una [portataMenu](##portataMenu)
### services
Ogni documento corrisponde a un [servizio](##servizio) nel tempo. Ogni servizio ha tre sottocollezioni: 
-  orders
-  portate
-  instantOrders

### users
Ogni documento corrisponde a un utente dell'app e contiene info aggiuntive. Potrebbe essere utile in futuro
### userRoles
Ogni oggetto contiene una proprietà contenenete i ruoli degli utenti. Modificabili solo dal superAdmin. L'ID di ogni documento è 'r_${uid}'

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
    dishes: Dish[]
}
```

## ordine
``` typescript
interface IOrder
{
    id: number,
    status: string,     // (pending, accepted, completed, cancelled)
    waiterName: string, // display name of waiter
    waiterId: string,   // id of waiter to link
    table: number,
    revenue: number,
    createdAt: Date
}
```
## portata
``` typescript
interface ICourse
{
    orderId: number,
    name: string,
    kitchen: string,
    status: string,      // (waiting,prep,ready,delivered)
    dishes: IDish[],
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
    dishes: IDishMenu[],
    isInstant: boolean
}
```

## piattoMenu
``` typescript
interface IDishMenu
{
    name: string,
    shortName: string,
    storage: number,
    price: number,
    inMenu: boolean

}
```

# Note 
Avere dati sull'evoluzione delle quantità in magazzino