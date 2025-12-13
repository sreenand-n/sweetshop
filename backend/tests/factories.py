def register_user(client, email="user@example.com", password="password"):
    return client.post("/api/auth/register", json={
        "email": email,
        "password": password
    })

def login_user(client, email="user@example.com", password="password"):
    res = client.post("/api/auth/login", json={
        "email": email,
        "password": password
    })
    return res.json()

def auth_header(token):
    return {"Authorization": f"Bearer {token}"}

def create_sweet(client, token, data=None):
    if data is None:
        data = {
            "name": "Ladoo",
            "category": "Indian",
            "price": 10.0,
            "quantity": 20
        }

    return client.post("/api/sweets/", json=data, headers=auth_header(token))
