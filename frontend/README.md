# Frontend Section of My ADSO Project

Hi there, let's go and take a look...


## Run from scratch the project 

Folllow the next steps to run the project localy:

```sh
  git clone https://github.com/CristianLopez3/FRONTEND-ADSO-PROJECT.git
```
* Enter in the project and run the next commands

```sh
  npm install 
```

* At the end in your terminal, making sure that you are in the project run the next command:

```sh
  npm run dev
```

*Now you can see the project running in the next url http://localhost:5174*

>[!IMPORTANT]
> You must be install at least node 18 and npm 10.3

### Tailwindcss configuration
```sh
  npm i -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```

### Run server

```sh
  npm run dev
  npm run dev -- --host
```

### React Router

```sh
  npm i -save react-router-dom
  npm i -save react-router
  npm i --save @types/react-router-dom
  npm i --save @types/react-router
```

### resources links

* [Icons Library](https://www.figma.com/file/UkuS2YG7c56R5h9tlyWGEn/20%2C000%2B-Ultimate-Icon-Library-(Community)?type=design&mode=design&t=wNS2JETNUD3BoIn0-0)
* [Components Examples](https://merakiui.com/components)
* [Restaurant designs](https://dribbble.com/shots/18979770-Restaurant-Website)
* [Restaurant Reference](https://the1894lodge.com/)
* [Teddy Tutorials](https://www.youtube.com/watch?v=ZEB3VCbXQHA&ab_channel=TeddySmith)
* [Tailwind Gradient Generator](https://tailwindcomponents.com/gradient-generator/)
* [Spring](https://spring.io/guides/tutorials/react-and-spring-data-rest)
* [Spring Structure](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.structuring-your-code)
* [React + Spring](https://www.youtube.com/watch?v=mgbEz23qZP0&list=PLZdfbI_OZWAMvhSl32tFcD6M9x_Pqtkwb)
* [React + tailwind components](https://tw-elements.com/docs/standard/components/cards/)
* [Tailwind ocomponents example](https://tailwindcomponents.com/component/tailwind-css-404-page-not-found)

## Firebase

In this project I'm using firebase to make transactions with files in firebase storage...

```sh
  npm i firebase
```

[firebase console](https://console.firebase.google.com/project/menueasy-f7860/storage/menueasy-f7860.appspot.com/files?fb_utm_campaign=latam-CO-all-es-dr-SKWS-all-all-trial-b-dr-1707800-LUAC0020206&fb_utm_content=text-ad-none-any-DEV_c-CRE_654650680938-ADGP_Hybrid%20%7C%20SKWS%20-%20BRO%20%7C%20Txt_Compute-Firebase-KWID_43700076085059655-kwd-308670941208&fb_utm_medium=cpc&fb_utm_source=google&fb_utm_term=KW_firebase-ST_Firebase)

### Important TODO's

* Testing Login
* Implementing auth with JWT and spring boot
* Implementing booking feature
* Make a simple report