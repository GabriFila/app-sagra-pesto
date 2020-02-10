# App - Sagra del pesto
Di seguito la documentazione dell'app per gestire gli ordini della Sagra del Pesto di Genova. La prima parte descrive il comportamento dell'app, la seconda ne descrive il funzionamento.

# Indice
- [Parte I - comportamento](#parte-i---comportamento)
  - [Nozioni base](#nozioni-base)
  - [Ruoli utente](#ruoli-utente)
  - [Compiti dei ruoli](#compiti-dei-ruoli)
  - [Permessi dei ruoli](#permessi-dei-ruoli)
  - [Interfacce](#interfacce)
  - [Logging](#logging)
- [Parte II - funzionamento](#parte-ii---funzionamento)
  - [URLs](#urls)
  - [Codice interfacce](#codice-interfacce)
  - [Funzioni server](#funzoni-server)
  - [Collezioni DB Firestore](#collezioni-db-firestore)
  - [Security rules](#security-rules)
  - [Strutture in codice](#strutture-in-codice)

# Parte I - Comportamento
## Nozioni base
- servizio: sessione di pasto (pranzo, cena)
- ordini: ordine normale fatto dalla cassa che deve passare attraverso cameriere -> cucina -> smazzo
- ordini istantanei: ordine fatto dal bar che viene consegnato al cliente direttamente
- portate: elementi dell'ordine elaborati da una singola cucina
- piatti: elementi di ogni portata

## Ruoli Utente 
- Super Admin
- Admin
- Cassiere
- Cameriere
- Bar
- Primi
- Secondi
- Smazzo

## Compiti dei ruoli
#### Super admin
- modifica ruoli utente 
#### Admin
- modificare la quantità di cibo rimanente
- modificare il menu
- iniziare e concludere il servizio
- vedere info su incassi e ordini
#### Cassiere
- creare l'ordine
- stampare l'ordine
- modificare un ordine già creato
#### Cameriere
- associare ordine e tavolo
- mandare una portata di un ordine in preparazione
- concludere una portata di un ordine
- modificare l'ordine
- _LAST_ ricevere modifica quando un ordine è pronto
#### Bar
- visualizzare il bere e i dolci degli ordini che sono in preparazione
- cambiare lo stato del bere e dei dolci quando sono pronti (notificare smazzo e camerieri)
- creare ordini istantanei
#### Primi
- visualizzare i primi degli ordini che sono in preparazione
- cambiare lo stato dei primi quando sono pronti (notificare smazzo e camerieri)
#### Secondi
- visualizzare i secondi degli ordini che sono in preparazione
- cambiare lo stato dei secondi quando sono pronti (notificare smazzo e camerieri)

#### Smazzo
- vedere gli ordini non collegati a cemerieri
- vedere gli ordini in corso e il loro stato (preparazione, pronto)
- concludere una portata di un ordine
- recuperare vecchie portate di ordini già conclusi per eventuali modifiche

## Permessi dei ruoli

#### creazione ordine
- cassa solo ordini 'normali'
- bar solo ordini istantanei
#### modifica ordini selettiva 
- cassa modifica solo portate e stato
- smazzo modifica stato
- cameriere modifica solo suoi ordini
- bar modifica solo portate di bere e dolci
- cucina primi modifica solo portate di primi
- secondi modifica solo portate di secondi
#### modifica menu
- admin
#### inizio/fine servizio
- admin
#### modifica ruoli utente
-  superAdmin

## Interfacce

Ogni interfaccia ha una top bar con:
- se loggato:
  - il nome dell'utente e il tipo di interfaccia (es: Furio-dashboard)
  - un tasto per fare il logout
  - se ruolo è 'smazzo'
    - una sezione con gli ordini pendenti
    - un tasto cerca per visualizzare un ordine già fatto
  - se ruolo è cassa:
    - un tasto cerca per modificare un ordine già fatto
- se non loggato:
  - un tasto per fare il login o registrarsi

#### Home
Contiene i link che portano alle altre interfacce
#### DashBoard
una sezione per:
 - modificare il menu
 - modificare le quantità in magazzino
 - aggiungere e modificare piatti

Un tasto per iniziare/concludere il servizio (verde per aprilo e rosso per chiuderlo)

Una sezione per le info su ordini e incassi del servizio corrente e i totali passati
#### Cassa istantanea
Una sezione per ogni portata con i piatti istantanei nel menu. Ogni piatto è una riga con:
- la quantità rimanente in magazzino
- un numero per indicare la quantità richiesta dal cliente
- un tasto '-' per decrementare le quantità richieste dal cliente
- un tasto '+' per incrementare le quantità richieste dal cliente
#### Cassa
Una sezione per ogni portata con i piatti nel menu. Ogni piatto è una riga con:
- la quantità rimanente in magazzino
- un numero per indicare la quantità richiesta dal cliente
- un tasto '-' per decrementare le quantità richieste dal cliente
- un tasto '+' per incrementare le quantità richieste dal cliente

Una sezione contente:
- il totale dell'ordine
- un tasto per inviarlo al sistema
- una box per vedere il numero dell'ordine
- un tasto per stampare l'ordine
#### Cameriere
Un tasto '+' per collegare ordine-cameriere-tavolo

Un tab per ogni ordine con:
- il numero dell'ordine 
- il numero del tavolo
- le portate dell'ordine, contenente:
  - un tasto per completare la portata 
  - un tasto per mandare la portata in preparazione
  - una riga per piatto della portata contente i piattie le quantità
#### Cucine/bar
Una sezione ampia con tutti gli ordini in preparazione della propria cucina, ognuno con un tasto per segnarli completati

Una mini sezione con il totale dei piatti da preparare attualmente

#### Smazzo
 3 colonne (bar, primi, secondi), contentti le portate degli ordini in corso e il loro stato (preparazione, pronto). Ogni portata contiene:
 - lista dei piatti
 - tasto per concludere la portata

## Logging
Loggare l'evoluzioni degli ordini per avere dati statistici

# Parte II - Funzionamento
## URLs

base = url di default (es sagra.genova.cngei.it)
- home = base
- login = base/login
- dashboard = base/admin
- cucina primi = base/primi
- cucina secondi = base/secondi
- bar = base/bar
- cassa = base/cassa
- cassa istantanea = base/cassaBar
- camerieri = base/cameriere

## Codice interfacce

Components:
- [App](#App)
- [PrivateRoute](#PrivateRoute)
- [AppBar](#AppBar)
  - [PendingOrders](#PendingOrders)
  - SearchButton
- [LoginPage](#LoginPage)
- [AdminPanel](#AdminPanel)
  - [Storage](#Storage)
    - [StorageCourse](#StorageCourse)
      - [StorageDish](#StorageDish) 
      - [AddDishButton](#AddDishButton) 
  - [ServiceStarter](#ServiceStarter) 
  - [ServiceInfo](#ServiceInfo)


#### App
- [ ] material UI theme builder
- [ ] CSS Baseline
- [ ] appbar
- [ ] router with all PrivateRoutes for pages except for login
- [ ] state is equal to userLoggedIn
- [ ] in useEffect setup onetime listener for firebase.auth() to change loggeIn state


#### PrivateRoute
``` typescript
const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
```
#### Appbar
``` typescript
if (generalState.userLoggedIn)
  // show name, role
  // show logout button
  if 'userCustomClaims.smazzo' // show also search and pending orders
  else if 'userCustomClaims.cassa' // show also cerca
```
#### PendingOrders
- [ ] setup firebase snapshot on orders Collection where state='pending'
- [ ] render if there are more
- [ ] a div containing the id of each order

#### LoginPage
- [ ] notLoggedIn messagge
- [ ] Login button
- [ ] Register button

#### AdminPanel

#### Storage
- setup listener for storage collection
- map courses of storage to StorageCouse
- useReducer actions:
  - EDIT_DISH
  - ADD_DISH
- StorageStateContext = state part of reducer
- StorageDispatchContext 

#### StorageCourse
- map dishes in storageCourse to StorageDish
- _LAST_ plus button to add dish


#### AuthStateContext
```typescript
 {
  userLoggedin: boolean
}
```

#### AuthDispatchContext
```typescript
 {
  signUp: () => signUp(),
  signIn: () => signIn(),
  signOut: () => signOut(),
}
```

## Funzoni server
#### creazione nuovo ordine (unica transazione)
- [ ] leggere il counter per l'id dell'ultimo ordine
- [ ] creare uno nuovo ordine con l'id incrementato di uno
- [ ] aggiornare il counter per l'id dell'ultimo ordine
- [ ] aggiornare il revenue totale del servizio
- [ ] aggiornare le quantità nello storage


#### trigger dopo creazione ordine istantaneo
- aggiornare la revenue del servizio


#### trigger creazione nuovo utente
- creare un nuovo record nella collezione ruoliUtenti con campo ruoli pari a []

#### trigger modifica ruoli utenti
- modificare le custom claims di un utente mettendole pari a quelle nel documento


## Collezioni DB Firestore

#### storage
Un documento con tutto lo storage
#### services
Ogni documento corrisponde a un [servizio](##servizio) nel tempo. Ogni servizio ha tre sottocollezioni: 
-  orders
-  portate
-  instantOrders

#### users
Ogni documento corrisponde a un utente dell'app e contiene info aggiuntive. Potrebbe essere utile in futuro
#### userRoles
Ogni oggetto contiene una proprietà contenenete i ruoli degli utenti. Modificabili solo dal superAdmin. L'ID di ogni documento è 'r_${uid}'

## Security rules


## Strutture in codice

#### servizio
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

#### ordine istantaneo
``` typescript
interface IInstantOrder
{
    revenue: number,
    dishes: Dish[]
}
```

#### ordine
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
#### portata
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

#### piatto
``` typescript
interface IDish
{
  shortName: string,
  qt: number
}
```
#### storage
``` typescript
interface IStorage
{
  storage : ICourseMenu[]
}
```

#### portataMenu
``` typescript
interface ICourseMenu
{
  name: string,
  kitchen: string,
  dishes: IDishMenu[],
  isInstant: boolean
}
```

#### piattoMenu
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

## Note 
Avere dati sull'evoluzione delle quantità in magazzino



## Stima costi per letture/scritture ordine

#### Condizioni e ipotesi
- Prezzi: 0,06/100000r & 0,18/100000w
- n = # portate per ordine ~ 4
- c = # casse collegate ~ 2
- a = # cucine per stessa portata  ~ 1,3
- b smazzi collegati ~ 1
- il cameriere conclude l'ordine, non lo smazzo

#### creazione: c+2 r & n+3 w
|  qt   | tipo  | desc                                                   |
| :---: | :---: | ------------------------------------------------------ |
|   1   |   r   | service/current per sapere lastOrderID                 |
|   1   |   w   | service/current per aggiornare lastOrderID e prezzo    |
|   1   |   w   | in service/current/orders per creare un nuovo ordine   |
|   n   |   w   | in service/current/courses per creare le nuove portate |
|   1   |   w   | per aggiornare le quantità in storage                  |
|   c   |   r   | per aggiornare le quantità sulle UI della cassa        |
|   1   |   r   | per aggiornare l'ordine pendente allo smazzo           |


#### legame cameriere: n+2 r & 1 w     
|  qt   | tipo  | desc                                    |
| :---: | :---: | --------------------------------------- |
|   1   |   r   | per collegamento cameriere ordine       |
|   1   |   r   | per rimozione ordine pendente da smazzo |
|   1   |   w   | per collegamento cameriere ordine       |
|   n   |   r   | per visualizzare le portate dell'ordine |


#### ciclo per ordine: n(2a+3b) r & 3n w
#### ciclo singola portata: 2a+3b r & 3 w 
|    qt     | tipo  | desc                      |
| :-------: | :---: | ------------------------- |
| cameriere |       |
|     1     |   w   | cambio stato wait->prep   |
|     1     |   r   | cambio stato prep->ready  |
|     1     |   w   | cambio stato ready->compl |
|  cucina   |       |
|     a     |   r   | cambio stato wait->prep   |
|     1     |   w   | cambio stato prep->ready  |
|   (a-1)   |   r   | cambio stato prep->ready  |
|  smazzo   |       |
|     b     |   r   | cambio stato wait->prep   |
|     b     |   r   | cambio stato prep->ready  |
|     b     |   r   | cambio stato ready->compl |



#### totale
| qt           |       r        |   w   |
| :----------- | :------------: | :---: |
| creazione    |      c+2       |  n+3  |
| collegamento |      n+2       |   1   |
| ciclo        |    n(2a+3b)    |  3n   |
| totale       | n(1+2a+3b)+c+4 | 4n+4  |

#### caso reale: 
n=4 a=2 b=1 c=2 => 38r &  20w

4000 ordini = 152000 r & 80000 w ~ €0.09 & €0.27
#### caso limite assurdo
ipotesi: 400 r/ordine - 400 w/ordine

4000 ordini = 1600000 r - 1600000 w -> $0,96 + $2,56
