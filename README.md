
#   ReNew-and-ReLove MarketPlace application

Renew and ReLove is a marketplace application built using the MERN stack. It allows users to sell their refurbished products by listing them on the platform. Users can upload product images using Multer and store them securely in the cloud with Cloudinary integration.

Buyers can place bids on the listed products, and users have the option to communicate with the admin for any queries or assistance. The admin has the authority to approve or reject the listed products and can manage user accounts, including blocking or unblocking users. The admin also receives notifications whenever a new bid is placed.

Renew and ReLove aims to provide a seamless marketplace experience, encouraging the reuse and resale of refurbished items. The MERN stack ensures a robust and scalable application, while the integration of Multer and Cloudinary simplifies image handling and storage.
## Screenshots

![screenshot (4)](https://github.com/Nihitv101/ReNew-and-ReLove/assets/122816401/262ecc33-4fc4-4775-bfbb-a9c1708747b8)


![screen1](https://github.com/Nihitv101/ReNew-and-ReLove/assets/122816401/30db1677-22a8-44b5-8182-4d94f2bac23c)
![screen2](https://github.com/Nihitv101/ReNew-and-ReLove/assets/122816401/32315e91-fb91-486d-9dfa-70f98b2eb477)
![screen3](https://github.com/Nihitv101/ReNew-and-ReLove/assets/122816401/d1cb3e13-f7a7-40bf-b314-0bec45c3935e)
![screen4](https://github.com/Nihitv101/ReNew-and-ReLove/assets/122816401/b76ec503-de42-40a9-800a-dfedb359a324)

## Features

## For Users:

- Sell Refurbished Products: Users can list their refurbished products for sale on the platform.
- Place Bids: Users can place bids on products they are interested in purchasing.
- Contact Admin: Users can communicate with the admin for queries or assistance.
- User Notifications: Users receive notifications for bid updates and important information.
- Image Upload: Users can upload product images using Multer, which facilitates image handling on the server side.
- Cloudinary Integration: Uploaded product images are stored in the cloud using Cloudinary, ensuring efficient and scalable image 
management.
## For Admin:

- Approve/Reject Products: Admin can review and approve or reject products listed by users.
- Bid Notifications: Admin receives notifications whenever a new bid is placed on a product.
- Manage Users: Admin can block or unblock user accounts based on their status.
- Image Management: Admin can view and manage product images uploaded by users.
- Admin Notifications: Admin receives notifications for important events such as new bids and user inquiries.
## Tech Stack

**Client:** React, Redux, TailwindCSS, AntD

**Server:** Node, Express, cloudinary


## Hosted/Deployed

https://renewmarketplace.onrender.com
## Test users

This project contains admin and normal user functionality
- user(seller) : email : messi123@gmail.com  password : messi123 
- admin() : email : nihitv@gmail.com password : nihitv30
## Environment Variables

- PORT=5000 
- MONGO_URL=<yourmongourl> 
- JWT_SECRET = <yourSecret>


## Installation

Install my-project with npm

```bash
  cd server and npm install
  // come to client directory 
  cd client
  npm install
```


    
## Run Locally

Clone the project

Run frontend only

```bash
  cd client
  npm start
```

Start the server

```bash
  npm run start
```

