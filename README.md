# 🎨 Pixel to Pattern  - Create your perfect piece!

**Pixel to Pattern** turns your pixel art into beautiful, beginner friendly crochet patterns stitch by stitch, row by row.  
Let the creativity flow!

## 🧶 Features

### Create  
Turn any pixel drawing into a crochet-ready pattern.  
Each row lists the stitch counts per color, e.g.:
        ( sc = single crochet)
        Row 1: 28 sc (white)
        Row 2: 9 sc (white), 10 sc (yellow), 9 sc (white)
        Row 3: 8 sc (white), 10 sc (yellow), 9 sc (white)

### Read  
Browse all submitted creations and view detailed stitch by stitch patterns.

### Update *(Coming Soon!)*  
Users will soon be able to edit their own patterns directly.

### Delete  
Remove any pattern you’ve posted with one click.

### Export to PDF  
Download a printable crochet pattern PDF including:

- Pattern title
- Author & date
- Description
- Pixel color rows (stitch instructions)

Great for crocheting offline

## ⚙️ Local Setup

Follow these steps to run **Pixel to Pattern** locally:

1. **Fork and clone** this repository to your machine.  
2. In the root directory, create a `.env` file named `db.env`.  
3. **Install dependencies** in both the `server/` and `pixel2pattern/` folders:
   ```bash
   npm install
   ```
4. Navigate to `server/` and start the backend:
   ```bash
   npm run dev
   ```
5. Navigate to `pixel2pattern/`
   ```bash
     npm run dev
   ```
6. Open your browser at http://localhost:3000
7. 🎨 Get creative!

## Tech Stack
- **Frontend:** NextJs, MaterialUI
- **Backend:** Node.js, Express
- **Database:** MySQL database with Sequelize used on the backend.
- **Version:** Node 24+

## Environment Variables

This project utilizes environment variables for configuration. You need to create a `db.env` file in the root directory based on the provided variable examples listed below.

   **Required Variables:**

   *   `DB_USER`: The username for the user created to run the database.
   *   `DB_PASSWORD`: Your password used to access the database.
   *   `DB_HOST`: The IP for the virtual machine running the database.
   *   `DB_DATABASE`: name of the database you need to access.
   *   `DB_PORT`: The port number the database is running on.

Edit `db.env` and replace placeholder values with your actual configuration.
Restart your development server if it's already running (e.g., npm start).


## Deployment Process
Linked below is the documentation that was created while setting up the virtual machine for deployment.
[Click Here!](https://loving-eye-8b5.notion.site/VM-Deployment-27e101a39e1480328574fee619f042d8)


---

## 🐳 Docker Setup

```bash
# Build containers
docker compose build

# Run containers
docker compose up -d

# Stop containers
docker compose down

# View logs
docker compose logs -f
```

After running these commands, visit:

- Frontend: [http://localhost:3000](http://localhost:3000)  
- Backend: [http://localhost:3001/patterns](http://localhost:3001/patterns)

---

## 🐳 VM Deployment

```bash
ssh root@<VM_IP>
git clone https://github.com/your-username/pixel-to-pattern.git
cd pixel-to-pattern
docker compose up -d
```

Once the containers are up, the application will be accessible at:
```
http://<VM_IP>:3000
```

---

## 🌿 Environment Variables for Docker

These variables are used in the `docker-compose.yml` or `.env` file:

```
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=db
DB_DATABASE=pixel_to_pattern
DB_PORT=3306
```

✅ **Note:**  
- `DB_HOST=db` is used so the backend connects to the MySQL container through the Docker network.  
- Make sure these match your database credentials.

---

## 💾 Volume Persistence

A Docker volume is configured to persist the database data:
```yaml
volumes:
  db_data:
```

This ensures that your MySQL data is **not lost** when containers stop or restart.

To list volumes:
```bash
docker volume ls
```

To inspect:
```bash
docker volume inspect pixel-to-pattern_db_data
```


---

## 🧰 Troubleshooting

| Command                                | Purpose                                    |
|-----------------------------------------|--------------------------------------------|
| `docker compose logs -f`               | View live logs of all services             |
| `docker logs <container_name>`         | View logs for a specific container         |
| `docker exec -it <container_name> sh`  | Open a shell inside a running container   |
| `docker ps`                            | Check running containers                   |
| `docker system prune -a`               | Clean up unused images and containers ⚠️   |
| `docker compose down -v`              | Stop and remove containers **and volumes** (careful) |

If something isn’t working:
- Ensure ports **3000** (frontend) and **3001** (backend) are open.
- Check logs for DB connection issues.
- Rebuild images if code changes:
  ```bash
  docker compose up --build -d
  ```
