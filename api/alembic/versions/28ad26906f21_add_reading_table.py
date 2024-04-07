"""Add reading table

Revision ID: 28ad26906f21
Revises: bbd676526385
Create Date: 2024-04-06 00:05:57.170105

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from models import HashIdField
import os

# revision identifiers, used by Alembic.
revision: str = '28ad26906f21'
down_revision: Union[str, None] = 'bbd676526385'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

SALT = os.environ.get("HAS_ID_FIELD_SALT")


def upgrade() -> None:
    op.create_table('reading',
        sa.Column('id', sa.Integer(), primary_key=True, index=True, autoincrement=True),
        sa.Column('title', sa.String(), nullable=True),
        sa.Column('author', sa.String(), nullable=True),
        sa.Column('cover_image_file', sa.String(), nullable=True),
        sa.Column('file', sa.String(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
   


def downgrade() -> None:
    op.drop_table('reading')