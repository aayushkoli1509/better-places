## Changes added

- Used TypeScript for both React and Express
- Used Vite for the build tool instead of the webpack configuration which comes with CRA.
- Used React Router Dom v6 instead of the v5 used in the tutorial.
- Modernized Folder Structure to the typical pattern.
- Improvised the logic for the useForm hook.
- Remove body parser dependency and use the built in functions provided by Express 4.16+
- Replace uuid dependency with nanoid - a much faster, leaner and more secure unique ID generator.
- Modernized Backend to use ESModules instead of CommonJS
- Typed the mongoose schema models to ensure data integrity.
- Use Axios to fetch API data instead of built in fetch.
- Use Type Generics to properly type the custom http hook response.
