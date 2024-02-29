"""Second commit

Revision ID: 74fe4933d18e
Revises: 59f4a7d41343
Create Date: 2024-02-28 05:36:34.851313

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '74fe4933d18e'
down_revision: Union[str, None] = '59f4a7d41343'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
