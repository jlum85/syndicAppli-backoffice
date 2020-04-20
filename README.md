This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# BackOffice SyndicAppli

- Site Responsive réalisé en React.
- Seuls les utilisateurs qui ont un profil Syndic ou Admin peuvent se connecter au BackOffice.
- Un utilisateur Admin peut créer ou supprimer un Syndic.
- Un utilisateur menbre d'un syndic peut :
  - Modifier les informations du Syndic ( adresse, ville, tél, ...)
  - Ajouter , modifier ou supprimer des biens ( adresse , clé analytique, ... )
  - Ajouter , modifier ou supprimer des propriétaires ( adresse , lots , clé analytique , tantième , ... )
  - Importer les données d'un propriétaire via drag and drop ou en sléectionnant un fichier .CSV

## dependencies

    "axios": "^0.19.0",
    "js-cookie": "^2.2.1",
    "react": "^16.12.0",
    "react-csv-reader": "^2.0.2",
    "react-dom": "^16.12.0",
    "react-router-dom": "^5.1.2",

## containers

    login.js : écran de connexion , API : "/user/loginadm"

    SyndicScreen.js : Syndic courant pour un profil Syndic ou liste des Syndic pour un profil admin

<img src="https://user-images.githubusercontent.com/58396632/73757898-32a4fb80-476a-11ea-928a-e7cca845fd96.png" alt="SyndicScreen.js" width="800" height="300"/>

    PropertyScreen : liste des immeubles , API : "/property"

<img src="https://user-images.githubusercontent.com/58396632/73758804-63396500-476b-11ea-8d70-7e33db12554b.png" alt="SyndicScreen.js" width="800" height="600"/>

    OwnerScreen : liste des copropriétaires , API : "/owner/syndic?property_id=" + id de l'immeuble
    Affichage en mode CARD ( component : CardOwner.js )

<img src="https://user-images.githubusercontent.com/58396632/73759270-fe323f00-476b-11ea-96cb-332065ca7c3e.png" alt="SyndicScreen.js" width="800" height="600"/>

    Affichage en mode liste: Répartition des lots ( component : ListOwner.js )

<img src="https://user-images.githubusercontent.com/58396632/73760432-9846b700-476d-11ea-9f18-f6aa8b25ca19.png" alt="SyndicScreen.js" width="800" height="600"/>

    Répartition des tantièmes par clé analytique et import de données en drag & drop ( component : ListPivotOwner.js )

<img src="https://user-images.githubusercontent.com/58396632/73760954-684be380-476e-11ea-8b7c-670ac6f51b6e.png" alt="SyndicScreen.js" width="1000" height="600"/>
