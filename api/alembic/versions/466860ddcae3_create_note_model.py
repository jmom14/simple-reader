"""Create Note model

Revision ID: 466860ddcae3
Revises: 7e6374ee9f49
Create Date: 2024-04-17 17:51:51.286227

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = '466860ddcae3'
down_revision: Union[str, None] = '7e6374ee9f49'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('notes',
        sa.Column('id', sa.Integer(), primary_key=True, index=True, autoincrement=True, unique=True),
        sa.Column('cfi', sa.String(), nullable=False),
        sa.Column('text', sa.String(), nullable=False),
        sa.Column('note', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=func.now()),
        sa.Column('updated_at' ,sa.DateTime(timezone=True), onupdate=func.now()),
        sa.Column('reading_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['reading_id'], ['readings.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('notes')
