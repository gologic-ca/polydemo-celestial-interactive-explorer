# Demo PolyHacks

Voici les étapes et le contenu de référence pour rapidement créer un prototype d'un WebApp avec v0, Lovable et Cursor.

On utilise v0 pour faire un mockup à partir d'un dessin. On utilise ChatGPT avec ce mockup pour créer une recette. On utilise cette recette avec Lovable pour créer un WebApp à base Typescript. On publie sur GitHub. On utilise Cursor pour ajouter des fonctionalités personalisées et du backend.

![image](https://github.com/user-attachments/assets/64862503-9503-4b3d-92b0-c1add07ca512)

## v0
### Dessin + Prompt de base
"i would like a landing page with a visualization of our solar system. include all the planets. make each planet clickable that leads to its own information page"

![image](https://github.com/user-attachments/assets/27838d45-4ece-4e05-87f6-403a94401b91)

## Prompts avancés

Demander à un chat : "create a similar prompt recipe structure for a solar system exploration website. follow the below example. ignore its contents, only use the structure. Rewrite the prompt so that it creates a solar system visualization landing page with clickable planets and a planet page component to display information about each. Refer to the attached image"
Voire Fichier dans projet "ExemplePromptAvancé"

![image](https://github.com/user-attachments/assets/95dfd2dd-626b-41d7-b082-2ecd481fec1a)

## Lovable

Vous devriez avoir des crédits de disponible, essayez de jouer avec l'outil et itérer sur le projet initial générer à partir de notre recette. 

### Recette pour lovable
Voire fichier "PromptRaffinéLovable"
Voire informations sur le projet plus bas dans le README

## Cursor

Un fork de VSCode intégré avec des outils d'IA comme .cursorrules et Composer.
https://www.cursor.com/downloads
https://cursor.directory

Clone ce repo directement dans Cursor et suivre les instructions plus bas. **Assurez vous de faire les installs nécessaires des imports**

### .cursorrules
Voire .cursorrules généré avec le stack de Lovable dans le projet ou voire le directory

### Prompts pour ajouté ChatBot et Generate Thematic AI Playlist
"add an ai chatbox component. add the chatbox to the home page with the solar system. make it so messages entered in the chatbox prompt the openai api and return the respons. use the public openai api endpoint and add a placeholder for the key"
+ ajout du clé
+ itérer sur résultats

"add a "generate playlist" button on the planet page. when the button is clicked it should prompt the openai api the same way that the chatbot.tsx fetches. the prompt message sent should be as such "Generate a themed playlist of 10 songs that relate to ${CURRENT_PLANET}. Consider the planet's characteristics, atmosphere, and mythology. Format the response as a numbered list with "Artist - Song Title" for each entry." create a component that then displays the results"

Chaque branche représente un exemple fonctionnel atteint avec juste ces requêtes et le bouton intégrer "Fix in Composer" pour des erreurs rencontrées 


# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e48ff3fe-579a-4c44-881d-d3013db31a78

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e48ff3fe-579a-4c44-881d-d3013db31a78) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e48ff3fe-579a-4c44-881d-d3013db31a78) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
