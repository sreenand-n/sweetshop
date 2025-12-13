from alembic import op
import sqlalchemy as sa


revision = "0002_create_sweets_table"
down_revision = "0001_create_users_table"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "sweets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("category", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
    )


def downgrade():
    op.drop_table("sweets")
