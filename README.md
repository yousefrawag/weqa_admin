# Weqa Platform Project Setup

Follow the steps below to set up and run the Laravel project:

---

## **1. Clone the Project from GitHub**
1. Open Visual Studio Code and navigate to the terminal inside your desired folder.
   - Open the folder in VSCode: `File > Open Folder`.
   - Launch the terminal: `View > Terminal` or press `Ctrl + ~` (Cmd + ~ on Mac).
2. Clone the GitHub repository:
   ```bash
   git clone  https://github.com/weqa_platform.git
   ```
   > The `.` at the end ensures the project is cloned into the current folder.

---

## **2. Install Dependencies**
1. Navigate to the Laravel project directory:
   ```bash
   cd Weqa_Platform
   ```
2. Install Laravel dependencies using Composer:
   ```bash
   composer install
   ```
   > If `composer` is not installed, download it from [here](https://getcomposer.org/download/).

3. Install frontend dependencies using npm:
   ```bash
   npm install
   ```

---

## **3. Set Up Environment Variables**
1. Duplicate the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure the database connection:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=weqa_testing
   DB_USERNAME=root
   DB_PASSWORD=
   ```

---

## **4. Create the Database**
1. Open **phpMyAdmin** in your browser:
   ```
   http://localhost/phpmyadmin
   ```
2. Create a new database:
   - Name: `weqa_testing`.
   - Collation: `utf8mb4_general_ci`.

---

## **5. Migrate the Database**
1. Run the database migrations to create tables:
   ```bash
   php artisan migrate
   ```

---

## **6. Generate Application Key**
1. Generate an application key for your Laravel app:
   ```bash
   php artisan key:generate
   ```

---

## **7. Set Up Vite for Frontend**
1. Check the `vite.config.js` file. It should include the following:
   ```javascript
   import { defineConfig } from 'vite';
   import laravel from 'laravel-vite-plugin';

   export default defineConfig({
       plugins: [
           laravel([
               'resources/css/app.css',
               'resources/js/app.js',
           ]),
       ],
   });
   ```
2. Build the frontend assets:
   ```bash
   npm run dev
   ```
   > Use `npm run build` for production.

---

## **8. Start the Local Development Server**
1. Start Laravel's built-in development server:
   ```bash
   php artisan serve
   ```
2. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000
   ```

---

## **9. Optional: Configure XAMPP for Laravel**
If you want to use XAMPP's Apache server instead of `php artisan serve`:
1. Place your Laravel project in the `htdocs` folder of XAMPP:
   ```bash
   mv ~/path-to-Weqa_Platform /Applications/XAMPP/xamppfiles/htdocs/Weqa_Platform
   ```
2. Configure a virtual host for Laravel in the `httpd-vhosts.conf` file.
3. Update `.env` to match the new base URL:
   ```env
   APP_URL=http://localhost/Weqa_Platform
   ```

---

Now you’re ready to develop and run the Laravel project. Let me know if you have any questions!

---

© SAAR Agency 2024
