"""Create User table

Revision ID: bbd676526385
Revises: 
Create Date: 2024-03-20 19:19:36.609140

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bbd676526385'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
   op.create_table('users',
       sa.Column('id', sa.Integer(), primary_key=True, index=True, autoincrement=True),
       sa.Column('password', sa.String(), nullable=False),
       sa.Column('email', sa.String(), nullable=False, unique=True, index=True),
       sa.Column('first_name', sa.String(), nullable=True),
       sa.Column('last_name', sa.String(), nullable=True),
       sa.Column('is_disabled', sa.Boolean(), default=False),
       sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
       sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now())
   )

def downgrade() -> None:
    op.drop_table('users')
