"""Added user array for communities

Revision ID: 5adfa5fa2256
Revises: 08ece31389bc
Create Date: 2022-05-26 08:40:41.888069

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '5adfa5fa2256'
down_revision = '08ece31389bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('user_communities', postgresql.ARRAY(sa.Integer(), dimensions=1), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'user_communities')
    # ### end Alembic commands ###