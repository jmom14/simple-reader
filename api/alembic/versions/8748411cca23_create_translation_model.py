"""Create translation model

Revision ID: 8748411cca23
Revises: 466860ddcae3
Create Date: 2024-05-02 04:26:30.175798

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func


# revision identifiers, used by Alembic.
revision: str = '8748411cca23'
down_revision: Union[str, None] = '466860ddcae3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('translations',
        sa.Column('id', sa.Integer(), primary_key=True, index=True, autoincrement=True, unique=True),
        sa.Column('language_from', sa.String(), nullable=False),
        sa.Column('language_from_code', sa.String(), nullable=False),
        sa.Column('language_to', sa.String(), nullable=False),
        sa.Column('language_to_code', sa.String(), nullable=False),
        sa.Column('text_from', sa.String(), nullable=False),
        sa.Column('text_to', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=func.now()),
        sa.Column('updated_at' ,sa.DateTime(timezone=True), onupdate=func.now()),
        sa.Column('reading_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['reading_id'], ['readings.id'], ),
        sa.PrimaryKeyConstraint('id') 
    )



def downgrade() -> None:
    op.drop_table('translations')

