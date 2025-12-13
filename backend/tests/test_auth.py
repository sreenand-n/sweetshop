from tests.factories import register_user, login_user

def test_register_user(client):
    res = register_user(client)
    assert res.status_code == 200
    body = res.json()
    assert body["email"] == "user@example.com"
    assert body["is_admin"] is False


def test_login_user(client):
    register_user(client)
    login_res = client.post("/api/auth/login", json={
        "email": "user@example.com",
        "password": "password"
    })
    assert login_res.status_code == 200
    body = login_res.json()
    assert "access_token" in body
    assert body["user"]["email"] == "user@example.com"


def test_protected_route_requires_token(client):
    res = client.get("/api/sweets/")
    assert res.status_code == 401
