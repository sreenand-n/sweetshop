from tests.factories import register_user, login_user, create_sweet, auth_header

def promote_to_admin(user_id):
    from app.core.database import SessionLocal
    from app.models.user import User
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    user.is_admin = True
    db.commit()
    db.close()

def test_purchase_reduces_quantity(client):
    register_user(client)
    login = login_user(client)
    token = login["access_token"]
    user_id = login["user"]["id"]

    promote_to_admin(user_id)
    sweet = create_sweet(client, token).json()

    sweet_id = sweet["id"]

    # purchase as normal user
    register_user(client, email="buyer@example.com")
    login2 = login_user(client, "buyer@example.com", "password")
    token2 = login2["access_token"]

    res = client.post(f"/api/sweets/{sweet_id}/purchase",
                      headers=auth_header(token2))

    assert res.status_code == 200
    assert res.json()["quantity"] == sweet["quantity"] - 1


def test_restock_increases_quantity(client):
    register_user(client)
    login = login_user(client)
    token = login["access_token"]
    user_id = login["user"]["id"]

    promote_to_admin(user_id)

    sweet = create_sweet(client, token).json()
    sweet_id = sweet["id"]

    res = client.post(
        f"/api/sweets/{sweet_id}/restock?amount=5",
        headers=auth_header(token)
    )

    assert res.status_code == 200
    assert res.json()["quantity"] == sweet["quantity"] + 5
