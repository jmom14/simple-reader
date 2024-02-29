"""Create user table

Revision ID: 85e097aac027
Revises: 61560478720b
Create Date: 2024-02-29 15:25:08.271934

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '85e097aac027'
down_revision: Union[str, None] = '61560478720b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('username', sa.String(20), nullable=False),
        sa.Column('email', sa.String(50), nullable=False),
        sa.Column('first_name', sa.String(50), nullable=True),
        sa.Column('last_name', sa.String(50), nullable=True),
        sa.Column('is_disabled', sa.Boolean()),
    )


def downgrade() -> None:
    op.drop_table('users')
