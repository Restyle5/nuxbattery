# Brief explanation of your approach
0) USERNAME:**123** PASSWORD: **123**
1) Im using pages;
2) Components (Resuable UI template)
3) Composables (**Reusable and Centered Logic**, Grouped API, Grouped functions, e.g. user or battery)
4) Layout (Easier to arrange some of the common layout page) or use it to differentiate layout between user in the future.
5) Middleware (contain middlewares, which used to protect path from unauthenticated user)
6) Pages (contain pages)
7) Server Api (to create mock API)
8) Server Middleware (contain middlewares, which used to protect **API** path from unauthenticated user)


# Any assumptions you made

1) First of all the timing of this test is very unlucky because I have super important matter to attend, The code could be better e.g. setup database, proper JWT and server side request validation.

2) There's **no DB** mentioned in the task, therefore:
- **a)** Token is hardcoded, but in API Server (User get auth API)  
- **b)** List of batteries also have an API
- **c)** **I'm using <localStorage> to manipulate Data**, the first init on login with fetch batteries to test.It will then be store in localstorage to be manipulate afterward. 
3) Every time you logged it; it resets the data in the localStorage, **the fetching should be in List.vue or components which will be imported in the list  later on** but since there's no db, I want to make it clear that im only using local storage only for every other crud  for battery **as an alternative to db**
4) about the search filter, if you go to page 2, and search record from different page 2,3 and so on. it May looks like the filter is missing.  **BUT** it could be due to the result of the search only 2 results shown, therefore its in page 1 (you are searching from 2) This can be improved but im really out of time.

5) I put username and password as ***123*** to show that the alert component is working and can be implemented in the rest of the crud **BUT** since there's no request validation from server side ***(no db, no api)*** I just use the regular form validation  from the frontend.


# Setup instructions

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```
