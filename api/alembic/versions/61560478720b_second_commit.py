"""Second commit

Revision ID: 61560478720b
Revises: 9674c548b852
Create Date: 2024-02-28 15:02:41.189261

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '61560478720b'
down_revision: Union[str, None] = '9674c548b852'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
