# ProfileSync

A **MERN-based full-stack project** where users can submit their profiles and the system automatically:

- ✅ Saves data into **MongoDB**
- ✅ Appends the record into a **Google Sheet**
- ✅ Sends a formatted notification to a **Slack channel (#captureiq)**
<!-- - ✅ Creates/Updates a **HubSpot Contact** (upsert by phone) -->

Every integration attempt (success or failure) is logged into a separate `integration_events` collection for debugging and retrying later.

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/rafiq097/profilesync.git
cd profilesync
````

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your-mongo-uri
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXX/YYYY/ZZZZ
HUBSPOT_PRIVATE_APP_TOKEN=pat-xxxxxxxxxxxxxxxxxxxx
```

Run backend:

```bash
nodemon server.js
```

Server runs at **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)**

Visit **[http://localhost:5173](http://localhost:5173)** to see the website live locally.

---

## 📡 API Endpoints

### **Create User Profile**

**POST** `/api/v1/user-profiles`

#### 🔑 Request Body

```json
{
  "firstName": "Aarav",
  "lastName": "Sharma",
  "phoneNumber": "+919876543210",
  "isMarried": false
}
```

#### ✅ Success Response (`201 Created`)

```json
{
  "data": {
    "_id": "66fc39bfae8d123456789",
    "firstName": "Aarav",
    "lastName": "Sharma",
    "phoneNumber": "+919876543210",
    "isMarried": false,
    "createdAt": "2025-09-15T09:22:00.000Z"
  },
  "integrations": {
    "googleSheets": "success",
    "slack": "success",
    "hubspot": "success"
  }
}
```

#### ❌ Error Responses

* **400 Bad Request**

```json
{ "message": "All fields are required" }
```

* **500 Internal Server Error**

```json
{ "message": "Server error, try again later" }
```

---

## 🧪 Testing

You can test APIs using **Postman** or `curl`:

```bash
curl -X POST http://localhost:5000/api/v1/user-profiles \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Aarav",
    "lastName":"Sharma",
    "phoneNumber":"+919876543210",
    "isMarried":false
  }'
```

---

## 🛠️ Tech Stack

| Layer            | Tech                                                        |
| ---------------- | ----------------------------------------------------------- |
| **Frontend**     | React, TailwindCSS, react-hot-toast                         |
| **Backend**      | Node.js, Express.js                                         |
| **Database**     | MongoDB + Mongoose                                          |
| **Integrations** | Google Apps Script (Sheets), Slack Webhook, HubSpot CRM API |

---

## 🗄️ Database Collections

### **user\_profiles**

| Field       | Type    | Description                     |
| ----------- | ------- | ------------------------------- |
| firstName   | String  | Required                        |
| lastName    | String  | Required                        |
| phoneNumber | String  | `+<countrycode><number>` format |
| isMarried   | Boolean | Required                        |
| createdAt   | Date    | Auto-set                        |

### **integration\_events**

| Field       | Type     | Description                        |
| ----------- | -------- | ---------------------------------- |
| userId      | ObjectId | Ref to `user_profiles`             |
| integration | String   | `googleSheets`, `slack`, `hubspot` |
| status      | String   | `success` / `failed`               |
| message     | String   | Response or error message          |
| createdAt   | Date     | Auto-set                           |

---

## 🧩 Features

* Clean SOLID-based folder structure
* All integrations run asynchronously and return **actual status**
* Every failure is stored for later retry/debug
* Pretty UI + validations + toast notifications

---

