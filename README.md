# Bismillah

## Untuk Soal No.1

 - **_REST API_** adalah suatu gaya arsitektural yang didalamnya terdapat aturan-aturan tertentu untuk membuat layanan web.
 - Kegunaan _JSON_ pada _REST API_ adalah format data yang dihasilkan dari sebuah _API_ yang nantinya data _JSON_ tersebut dikonsumsi oleh si pengguna _API_.
   
---

## Setup Database Untuk Soal No.6:

- Buat Database **programmer_db**:

  ```mysql
  CREATE DATABASE `programmer_db`;
  ```

- Buat Table **users** :

  ```mysql
  CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1
  ```

- Buat Table **skills** :

  ```mysql
  CREATE TABLE `skills` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `user_id` int(11) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1
  ```

**Note : ganti file env.php.sample --> env.php, isi kredensial sesuai pengaturan database anda**

---

  ## Capture Soal No.6

  - Tampilan Awal (Belum ada data).

  ![1](hasil/1.png)

  - Menambahkan nama programmer baru.

  ![2](hasil/2.png)

  - Menambahkan skill baru
  
    ![3](hasil/3.png)
  
  - Menambahkan user dan skill baru.
  
    ![4](hasil/4.png)
  
  - Menghapus salah satu programmer.![5](hasil/5.png)
  
  - Hasil akhir setelah hapus programmer.
  
    ![6](hasil/6.png)
  
  - Untuk tampilan di Mobile.
  
    ![mobile](hasil/mobile.png)
  
        
    ---
    
    Sekian Terima kasih