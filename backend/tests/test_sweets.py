from tests.factories import register_user, login_user, auth_header, create_sweet

def test_admin_can_create_sweet(client):
    register_user(client)
    login = login_user(client)

    token = login["access_token"]
    user_id = login["user"]["id"]

    # manually promote user to admin
    client.app.dependency_overrides = {}

    from app.core.database import SessionLocal
    from app.models.user import User

    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    user.is_admin = True
    db.commit()
    db.close()

    res = create_sweet(client, token)
    assert res.status_code == 200


def test_non_admin_cannot_create_sweet(client):
    register_user(client)
    login = login_user(client)

    token = login["access_token"]

    res = create_sweet(client, token)
    assert res.status_code == 403


def test_list_sweets(client):
    # Setup admin
    register_user(client)
    login = login_user(client)
    token = login["access_token"]

    # Promote to admin
    from app.core.database import SessionLocal
    from app.models.user import User
    db = SessionLocal()
    user = db.query(User).first()
    user.is_admin = True
    db.commit()
    db.close()

    create_sweet(client, token)

    # login as normal user
    register_user(client, email="user2@example.com")
    login2 = login_user(client, "user2@example.com", "password")
    token2 = login2["access_token"]

    res = client.get("/api/sweets/", headers=auth_header(token2))
    assert res.status_code == 200
    assert len(res.json()) >= 1


def test_search_sweets(client):
    # Setup admin
    register_user(client)
    login = login_user(client)
    token = login["access_token"]

    # Promote admin
    from app.core.database import SessionLocal
    from app.models.user import User
    db = SessionLocal()
    user = db.query(User).first()
    user.is_admin = True
    db.commit()
    db.close()

    create_sweet(client, token, {
        "name": "Chocolate Bar",
        "category": "Candy",
        "price": 50,
        "quantity": 10
    })

    res = client.get("/api/sweets/search?name=Choco",
                     headers=auth_header(token))
    assert res.status_code == 200
    assert len(res.json()) == 1
