# Express + Sequelize + TypeScript Example
### Description
A simple express.js project that utilizes TypeScript and Sequelize as ORM.  
This was made to practice initializing models manually over dynamically loading the models and then calling a custom associate function to establish their relationships.  

I did it this way to ensure type-safety when accessing the models; with TypeScript especially.. loading models dynamically can cause type issues, and there will be no way to know what functions, and models are available when performing a dynamic load in index.
