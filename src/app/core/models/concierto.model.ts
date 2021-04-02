
export interface ConciertoModel {
    agotado:  boolean;
    artistas: string[];
    comuna:   Comuna;
    fecha:    number | string;
    idFirebase: string;
    imagen:   string;
    nombre:   string;
    precio:   Precio;
    recinto:  Recinto;
}

export enum Comuna {
    Santiago = "Santiago",
    Ñuñoa = "Ñuñoa",
}

export interface Precio {
    moneda: Moneda;
    monto:  number;
}

export enum Moneda {
    Clp = "CLP",
    Usd = "USD",
}

export enum Recinto {
    ClubHípico = "Club Hípico",
    EstadioNacional = "Estadio Nacional",
    MovistarArena = "Movistar Arena",
    ParqueOHiggins = "Parque O'higgins",
    PuntoticketArena = "Puntoticket Arena",
    TeatroCaupolicán = "Teatro Caupolicán",
}