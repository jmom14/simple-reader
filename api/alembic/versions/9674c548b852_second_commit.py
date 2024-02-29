"""Second commit

Revision ID: 9674c548b852
Revises: 74fe4933d18e
Create Date: 2024-02-28 05:37:27.324877

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9674c548b852'
down_revision: Union[str, None] = '74fe4933d18e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
