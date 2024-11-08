DROP TABLE IF EXISTS public.channels;

CREATE TABLE public.channels (
  id BIGSERIAL,
  workspace_id BIGINT REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE
  public.channels ENABLE ROW LEVEL SECURITY;

CREATE INDEX channels_idx_workspace_id ON public.channels(workspace_id);