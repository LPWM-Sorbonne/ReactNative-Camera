<div align="center">
  <img align="center" width="200" src="https://github.com/LPWM-Sorbonne/ReactNative-Camera/blob/main/assets/icon.png" alt="ReactNative-Camera"/>
</div>

<h3 align="center">ReactNative-Camera</h3>
<p align="center">Application mobile permettant de capturer des photos avec la caméra, les stocker localement et les afficher dans une galerie intégrée avec options de suppression.</p>

<p align ="center">Ce projet a été réalisé par <b>Shanthakumar Thanus</b>, <b>Diallo Ibrahima</b> et <b>Disy Théo</b> </p>

## Description

ReactNative-Camera est une application mobile développée en **React Native** avec le framework **Expo**. Elle offre une interface simple pour accéder à la caméra du téléphone, capturer des photos, les enregistrer localement dans un répertoire dédié, puis les visualiser dans une galerie personnalisée.

## Fonctionnalités
- 📸 Capture de photos
  
- 💾 Sauvegarde locale des photos dans un dossier photos

- 🗂 Galerie d’affichage des photos enregistrées

- 🗑 Suppression de photos individuelles

- 🔄 Rafraîchissement de la galerie

- 🔁 Inversion de la caméra avant / arrière

- 💡 Activation et désactivation du flash

## Prérequis
Avant de commencer, assurez-vous d'avoir une connexion haut débit et installé les outils suivants sur votre machine :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Node.js** (version 14.0.0 ou supérieure recommandée) : [Lien du site de NodeJS](https://nodejs.org/en)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Git** : [Lien du site de Git](https://git-scm.com/downloads)

Vous pouvez vérifier leurs versions installées avec les commandes suivantes depuis votre terminal de commande :

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`node --version` -> Affiche votre version de Node.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git --version` -> Affiche votre version de Git.


## Installation

### 1. Cloner le projet
   
Ouvrez votre terminal et exécutez la commande suivante pour cloner le dépôt :

```git clone https://github.com/LPWM-Sorbonne/ReactNative-Camera/```

### 2. Accéder au répertoire
Naviguez dans le dossier du projet :

```cd ReactNative-Camera```

### 3. Installer les dépendances
Installez toutes les dépendances nécessaires au projet :

```npm install```

Cette étape peut prendre quelques minutes selon votre connexion internet.

### 4. Lancer l'application

Démarrez le serveur de développement :

```npm run start```

### 5. Accéder à l'application

Ouvrez votre simulateur et lancé le projet.

## Technologies
Ce projet utilise plusieurs technologies modernes pour créer une expérience interactive:

<table align="center"> <tbody> <tr> <td align="center"> <img width="75" src="https://reactnative.dev/img/header_logo.svg" alt="React Native" /> <p>React Native</p> </td> <td align="center"> <img width="75" src="https://www.svgrepo.com/show/353722/expo.svg" alt="Expo" /> <p>Expo</p> </td> </tr> </tbody> </table>

## Détails

- L'application a été volontairement structurée autour de deux écrans distincts : CameraScreen pour la prise de photos, et GallerieScreen pour l’affichage des images enregistrées. Ce découpage a été choisi pour facilite la compréhension générale du projet.
  
- L'accès à la caméra est une action sensible sur mobile, nécessitant une autorisation explicite de l'utilisateur. Pour gérer cela proprement, l’application demande les permissions dès le premier rendu du composant via un useEffect, en utilisant la fonction `Camera.requestCameraPermissionsAsync()`

- L'utilisation de la caméra est gérée avec une référence via useRef, ce qui permet d'appeler des méthodes comme `takePictureAsync()`. Une fois la photo capturée, celle-ci est d’abord stockée temporairement, puis déplacée manuellement dans un dossier nommé `photos/`, situé dans le répertoire local `documentDirectory`.

- L’affichage des photos se fait en lisant le contenu du dossier photos/ à l’aide de `FileSystem.readDirectoryAsync()`. Chaque image est ensuite affichée dans une grille, et l’utilisateur peut supprimer une photo en appuyant simplement dessus : l’action appelle `FileSystem.deleteAsync()` pour effacer le fichier, puis met à jour immédiatement l’état local de la galerie via `setGalerie()`. En revanche, l’ajout d’une photo ne déclenche pas automatiquement la mise à jour de la galerie. Il est donc nécessaire de cliquer manuellement sur le bouton "rafraîchir" pour forcer la récupération du contenu du dossier photos/ et voir apparaître les nouvelles images. Neanmoins cela peut être rectifié en ajoutant un déclencheur des qu'on clique sur la galerie.



## Amélioration possible

- 🗃 Organisation des photos par date ou album

- 🎨 Amélioration de l’UI

- ☁️ Rechargement des photos automatiquement.

## Licence
Ce programme est sous licence MIT.
