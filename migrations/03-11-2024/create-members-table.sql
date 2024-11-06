DROP TABLE IF EXISTS members;

CREATE TABLE public.members (
  "userId" BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "workspaceId" BIGINT NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("userId")
);

ALTER TABLE
  public.members ENABLE ROW LEVEL SECURITY;

CREATE INDEX members_idx_workspace_id ON public.members("workspaceId");

CREATE INDEX members_idx_workspace_id_user_id ON public.members("workspaceId", "userId");