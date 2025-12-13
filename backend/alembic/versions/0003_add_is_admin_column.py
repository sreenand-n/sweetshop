from alembic import op
import sqlalchemy as sa


revision = "0003_add_is_admin_column"
down_revision = "0002_create_sweets_table"
branch_labels = None
depends_on = None


def upgrade():
    pass  # already included in migration 0001


def downgrade():
    pass
