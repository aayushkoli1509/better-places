# Better Places

A project that aims at creating a social media platform where users can share images & information about the interesting places they see and visit, built using **MERN** stack.

This project was created as a follow-along for this [Udemy Course](https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/), but just following along is boring and so, I made the following changes/improvements to it:

## Added Changes

- Used TypeScript for both React and Express
- Used Vite for the build tool instead of the webpack configuration which comes with CRA.
- Used React Router Dom v6 instead of the v5 used in the tutorial.
- Modernized Folder Structure to the typical pattern.
- Improvised the logic for the useForm hook.
- Use a monorepo architechture instead of two different projects.
- Remove body parser dependency and use the built in functions provided by Express 4.16+
- Replace uuid dependency with nanoid - a much faster, leaner and more secure unique ID generator.
- Modernized Backend to use ESModules instead of CommonJS
- Typed the mongoose schema models to ensure data integrity.
- Use Axios to fetch API data instead of built in fetch.
- Use Type Generics to properly type the custom http hook response.
- Implement changes in CSS that makes sense - (NewPlace form image size as an example)

## Screenshots

<p style = "text-align: center; margin-top: 10px">Home Page</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208680682-b9623bc4-daa3-4d3f-b85a-49fc0744dd3b.png">

<p style = "text-align: center; margin-top: 10px">My Places</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208681976-1fa0eead-8ee0-43d4-af2a-ae188033bb33.png">

<p style = "text-align: center; margin-top: 10px">Map View</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208682106-e2bdf596-8b1a-4fc0-a5e8-921d8e69d81c.png">

<p style = "text-align: center; margin-top: 10px">Edit Place</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208682155-9b0ccec5-e8ea-4842-ae33-ec441e7eb3f3.png">

<p style = "text-align: center; margin-top: 10px">Add Place</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208682348-5159b8c5-f350-44d6-9ccb-dd373633508e.png">

<p style = "text-align: center; margin-top: 10px">Login Page</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208682395-68cfc5e5-952f-4ead-a101-868112dbf84d.png">

<p style = "text-align: center; margin-top: 10px">Signup Page</p>
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/48734821/208682444-38d3ffec-a0c9-4f37-b7ad-32dfdfe3d853.png">

<div style = "display: flex; align-items: center; justify-content: space-between; margin-top: 10px">
  <div style = "display: flex; flex-direction: column; align-items: center;">
    <p>Mobile: Home Page</p>
    <img width="324" alt="image" src="https://user-images.githubusercontent.com/48734821/208682549-9996c7d3-224a-4bdf-b55c-0b767f428ba9.png">
  </div>
  <div style = "display: flex; flex-direction: column; align-items: center;">
    <p>Mobile: Sidebar</p>
    <img width="321" alt="image" src="https://user-images.githubusercontent.com/48734821/208682636-31f8da92-ae63-45ee-a81c-3bd891a7b943.png">
  </div>
</div>

<div style = "display: flex; align-items: center; justify-content: space-between; margin-top: 10px">
  <div style = "display: flex; flex-direction: column; align-items: center;">
    <p>Mobile: My Places</p>
   <img width="322" alt="image" src="https://user-images.githubusercontent.com/48734821/208682686-759fe57a-b540-4670-af13-08168ca2816b.png">
  </div>
  <div style = "display: flex; flex-direction: column; align-items: center;">
    <p>Mobile: Signup Page</p>
   
  <img width="322" alt="image" src="https://user-images.githubusercontent.com/48734821/208682782-715f63de-10be-4fa9-9178-d17a7f55031c.png">

  </div>
</div>
