# Asset Management

-   Before starting the project, it is necessary to install some packages/libraries:

    ### In the root Directory:
    
       **1- Run in backend:**

         composer install
        
      **2- Copy .env.example into .env and configure database credentials**

      **3- Set the encryption key by executing:**

         php artisan key:generate

       **4- Run migrations:**

         php artisan migrate
         
      **5- Add Categories and Brands to local Database:**
      
        php artisan db:seed --class=CategoryBrandSeeder
        
      **6- Add Roles to local Database:**
      
        php artisan db:seed --class=RoleSeeder
         
       **7- Add Admin user to local Database:**
       
        php artisan db:seed --class=DatabaseSeeder

      **8- Add Supplier to local Database:**

         php artisan db:seed --class=SuppliersTableSeeder


       **9- Add Models to local Database:**

          php artisan db:seed --class=ModelSeeder

      **10- Add Entity to local Database:**

         php artisan db:seed --class=EntitySeeder

      **11- Add Units to local Database:**

         php artisan db:seed --class=UnitSeeder

       **12- Start local server by executing:**

         php artisan serve
        
        

    ### Open new Terminal and go to **react** folder directory:
    
     **13- Copy react/.env.example into .env and adjust the VITE_API_BASE_URL parameter**

     **14- Run:**

        npm install

     **15- Install library for Scan feature:**

         npm i quagga


      **16- Install Chart for graphics on Dashboard**

         npm install --save chart.js react-chartjs-2
     ______________________________________________________

         npm install chart.js

      
      **17- Import  csv library**

         npm i react-papaparse
      


       **18- Run:**

        npm i react-router-dom
      ______________________________________________________

        npm i axios
      ______________________________________________________

         npm run dev
         

     **19- Login information:**
     
        email: admin@gmail.com
        password: Admin@277
    
     ### **For pagination style install the follow commands in react folder:**

        npm install -D tailwindcss postcss autoprefixer
     ______________________________________________________

        npx tailwindcss init -p
     ______________________________________________________

        npm install flowbite flowbite-react

      ______________________________________________________
        
        npm i mdb-react-ui-kit

      ______________________________________________________
        npm i react-bootstrap


-   Link to the document with all the documentation developed for the project so far:
    > https://snspt-my.sharepoint.com/:w:/g/personal/andre_ferreira_hb_min-saude_pt/EaPPFEDaia1Eqkbc_J05rZ8BWTfoXG6505iV5Qu2XWF4qQ?e=hgIZ96
