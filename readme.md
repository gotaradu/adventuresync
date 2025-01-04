# Adventure Sync

1) A Spring-Boot backend application developed to interact with Strava API.
2) A React frontend application developed to interact with the backend for displaying data about the logged in user.

##Purpose
Viewing your activities displayed on a single map is a paid feature of Strava 

##
Features
1) Login using Strava account.
2) Displaying all the activities of the logged in user on Leaflet map

## Description
The login is done according to the login diagram.
![image](https://github.com/gotaradu/adventuresync/blob/main/loginFlow.drawio.png)

The tokens from Strava are stored to database and a new jwt is created which is also stored. 

Ativities are handled only when accessing /activities page, loading and displaying data on the fly.

The functionality can be tested without logging in, with mock data I provided from my own activities.


### Home Page
![image](https://github.com/user-attachments/assets/0ae433da-3497-4b68-8267-d9435c020968)
![image](https://github.com/user-attachments/assets/2ca2ff17-f933-4d7c-80f4-b82b5e139b09)



### Activities Page
![image](https://github.com/user-attachments/assets/3b562dc6-d787-4ed7-9701-5bfd5c67b928)
![image](https://github.com/user-attachments/assets/6175d931-0489-48fd-a1e1-58e7dee15f69)

![image](https://github.com/user-attachments/assets/b1426b22-b192-4ff0-a46b-2b25e6f7971a)


### Single Activity Page 
![image](https://github.com/user-attachments/assets/b8421f9a-7c12-45a7-8791-5a2eef527b8a)
![image](https://github.com/user-attachments/assets/e7829a83-0280-4b75-b443-28efdb33e32a)
![image](https://github.com/user-attachments/assets/814a2780-7d17-4fa0-9f73-1490bb48d51b)


### All Stats
![image](https://github.com/user-attachments/assets/0aea5190-f7f5-45e9-bb7a-bc77d396c707)
![image](https://github.com/user-attachments/assets/cbc879f2-a8a9-4392-b233-cda62feb1ba9)

# Video
[Demo video](https://i.imgur.com/gU9m6iH.mp4)
