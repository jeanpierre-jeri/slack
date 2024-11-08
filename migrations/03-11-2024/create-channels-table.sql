DROP TABLE IF EXISTS public.channels;

CREATE TABLE public.channels (
  workspace_id BIGINT REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (workspace_id)
);

ALTER TABLE
  public.channels ENABLE ROW LEVEL SECURITY;