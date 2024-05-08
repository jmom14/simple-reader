"""Update password to be null

Revision ID: eca5d344406c
Revises: 8748411cca23
Create Date: 2024-05-05 02:22:46.830422

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'eca5d344406c'
down_revision: Union[str, None] = '8748411cca23'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE public.users ALTER COLUMN password DROP NOT NULL")


def downgrade() -> None:
    op.execute("ALTER TABLE public.users ALTER COLUMN password SET NOT NULL")
