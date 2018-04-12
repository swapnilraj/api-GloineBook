# api-GloineBook

[Gloine](https://en.wiktionary.org/wiki/gloine)Book is a REST-based API for the Glassrooms in Hamilton.

Test the api at gb.sixth.io/v1/rooms

## Endpoint prefix:

`/v1/rooms/`

# API-endpoints:

* /all - Returns all the bookings for all the rooms.
* /getinfo - Returns the information about the current user.
* /check - Returns the booking status for a particular room.
* /book - Books a room.
* /echo - Echoes the request.

## /all
### Query Parameters:
*credentials*: Base64 Encoded credentials of the user

*startDate*: Date to check availability against

## /check
### Query Parameters:
*credentials*: Base64 Encoded credentials of the user

*room*: Number of the room to check availability against

*startDate*: Date to check availability against

## /getifo
### Query Parameters:
*credentials*: Base64 Encoded credentials of the user

## /book
### Query Parameters:
*credentials*: Base64 Encoded credentials of the user

*room*: Number of the room to book

*time*: Start time for booking

*date*: Start date for booking

*month*: Start month for booking

*year*: Start year for booking

## /echo
### Query Parameters:
Really?
