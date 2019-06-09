# Beskrivelse

Microservice for å tilby et API til utlånsmidler.

## Flyt/funksjoner

- Avtaler genereres og distribueres av egne roboter
- Metadata om avtalene postes til APIet
- En avtale kan være selvstendig eller en del av en annen avtale
- En avtale har en referanse til forsendelsesId hos SvarUt
- Avtalen er "evig" men referanse til forsendelsesId kan endres
- Man kan søke etter avtaler knyttet til person (uid)
- Man kan filtrere på avtaletype
- APIet serverer avtale og eventuelle deler
- APIet sjekker signaturstatus hos SvarUT ved forespørsler om avtaler og eventuelle deler
- Ved status signert lagres status så ytterligere oppslag mot SvarUt er unødvendige
- En avtale kan markeres som signert av administrator
