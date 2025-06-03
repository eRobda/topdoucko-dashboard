export interface Zak {
  id_zaka: number;
  jmeno: string;
  prijmeni: string;
  email: string;
  telefon: string;
  balicek: string;
  predmety: string;
  cena_za_hodinu: number;
}

export interface NovyZak {
  id: number;
  balicek: string;
  email: string;
  jmeno_zaka: string;
  prijmeni_zaka: string;
  jmeno_rodice: string;
  prijmeni_rodice: string;
  predmety: string;
  telefon_rodice: string;
  stav_platby: string;
  stav: string;
  doplnujici_informace: string;
  casove_moznosti: string;
  termin_prvni_hodiny: string;
  pocet_hodin_k_zakoupeni: string;
  typ_vyuky: string;
  telefon_zaka: string;
  email_zaka: string;
}

export interface Prijem {
  id: number;
  nazev: string;
  popis: string;
  cena: number;
  datum_prijeti: string;
  typ: string;
}

export interface Referal {
  id: number;
  user_id: string;
  referal_url: string;
  is_active: string;
  link_usage: number;
  registered_users: number;
}

export interface SvistBot {
  id: number;
  type: string;
  qty: number;
  month: string;
  year: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  jmeno: string;
  prijmeni: string;
  cislo_bankovniho_uctu: string;
  adresa: string;
  telefon: string;
}

export interface Vydaj {
  id: number;
  nazev: string;
  popis: string;
  cena: number;
  datum_zaplaceni: string;
  typ: string;
}

export interface ZaciHodina {
  id: number;
  id_zaka: number;
  id_lektora: number;
  predmet: string;
  zacatek_hodiny: string;
  konec_hodiny: string;
  datum: string;
  typ_hodiny: string;
  tema_hodiny: string;
  poznamka_hodiny: string;
}

export interface ZamestnanecPravo {
  id_prava: number;
  id_zamestnance: number;
  nazev_prava: string;
} 