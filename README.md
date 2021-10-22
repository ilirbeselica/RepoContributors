# Angular Contributors List #

Live version can be found here : [http://161.97.81.17:9090/](http://161.97.81.17:9090/)

Project is separated on two sides:

### Backend ###

Backend is running on Nodejs (http server with express and database MongoDb);
Due to Github Api Rate limitations it was neccesary to create my own API endpoint to scrape and fetch requested data.
There was around 3000 contributors to all Angular repositories.
By ulitizing octokit library and using Github personal token, I scrapped all data regarding contributors and pushed them to MongoDB for later use.
Purpose of Contributor API route it is to show contributors as requested (sorted, count, single user data etc...)


### Frontend ###

Frontend it is simple, it is build in React with Bootstrap framework.
It fetched data from backend server and renders data as requested (sorted, user details).
