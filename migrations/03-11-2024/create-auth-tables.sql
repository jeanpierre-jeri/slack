DROP TABLE IF EXISTS public.sessions;

DROP TABLE IF EXISTS public.accounts;

DROP TABLE IF EXISTS public.verification_token;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
  id BIGSERIAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT,
  email TEXT,
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
  PRIMARY KEY (id)
);

ALTER TABLE
  public.users ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.verification_token (
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

ALTER TABLE
  public.verification_token ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.accounts (
  id BIGSERIAL,
  "userId" BIGINT NOT NULL REFERENCES public.users(id),
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
  PRIMARY KEY (id)
);

ALTER TABLE
  public.accounts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.sessions (
  id BIGSERIAL,
  "userId" BIGINT NOT NULL REFERENCES public.users(id),
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" TEXT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE
  public.sessions ENABLE ROW LEVEL SECURITY;