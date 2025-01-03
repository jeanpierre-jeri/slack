DROP TABLE IF EXISTS public.workspaces;

CREATE TABLE workspaces (
  id BIGSERIAL,
  name TEXT NOT NULL,
  "userId" BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  "joinCode" TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE
  public.workspaces ENABLE ROW LEVEL SECURITY;

CREATE INDEX workspaces_idx_user_id ON public.workspaces("userId");