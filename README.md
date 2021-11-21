# Paper Rock Scissor


Jag har jobbat med två alternativ i Mongoose, Node.js och express. Båda kan köras var för sig. På alternativ 2 fungerar inte POST api/games/{id}/join. Kommentera bort koden för alternativ 2 för att köra det. Kan testas på Postman.

Endpoints:

• Root: /

• POST api/games : Skapar första spelet med spelare 1 genom att ange följande i bodyn. 

  {
    "name": "Lisa"
  }  

• POST api/games/{id}/join : Spelare 1 skickar idn som returnerades i föregående endpoint till spelare 2. Ange det ID:t här. Ange följande i request bodyn.
 {
   "name": "Pelle"
 }

