DROP TABLE IF EXISTS public.verification_token;

CREATE TABLE public.verification_token (
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
  PRIMARY KEY (identifier, token)
);

ALTER TABLE
  public.verification_token ENABLE ROW LEVEL SECURITY;

DROP TABLE IF EXISTS public.accounts;

CREATE TABLE public.accounts (
  id BIGSERIAL,
  "userId" BIGINT NOT NULL,
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

DROP TABLE IF EXISTS public.sessions;

CREATE TABLE public.sessions (
  id BIGSERIAL,
  "userId" BIGINT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" TEXT NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE
  public.sessions ENABLE ROW LEVEL SECURITY;

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

CREATE TABLE public.customers (
  id BIGINT REFERENCES public.users NOT NULL,
  stripe_customer_id text,
  PRIMARY KEY(id)
);

ALTER TABLE
  public.customers ENABLE ROW LEVEL SECURITY;

DROP TABLE IF EXISTS public.products;

CREATE TABLE public.products (
  id TEXT,
  active BOOLEAN,
  name TEXT,
  description TEXT,
  image TEXT,
  metadata JSONB,
  PRIMARY KEY(id)
);

ALTER TABLE
  public.products ENABLE ROW LEVEL SECURITY;

DROP TYPE IF EXISTS public.pricing_type;

CREATE TYPE public.pricing_type AS ENUM ('one_time', 'recurring');

DROP TYPE IF EXISTS public.pricing_plan_interval;

CREATE TYPE public.pricing_plan_interval AS ENUM ('day', 'week', 'month', 'year');

DROP TABLE IF EXISTS public.prices;

CREATE TABLE public.prices (
  id TEXT,
  product_id TEXT REFERENCES public.products NOT NULL,
  active BOOLEAN,
  description TEXT,
  unit_amount BIGINT,
  currency TEXT CHECK (CHAR_LENGTH(currency) = 3),
  type pricing_type,
  intervale pricing_plan_interval,
  interal_count INTEGER,
  trial_period_days INTEGER,
  metadata JSONB,
  PRIMARY KEY(id)
);

ALTER TABLE
  public.prices ENABLE ROW LEVEL SECURITY;

DROP TYPE IF EXISTS public.subscription_status;

CREATE TYPE subscription_status AS ENUM(
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

DROP TABLE IF EXISTS public.subscriptions;

CREATE TABLE public.subscriptions (
  id TEXT,
  user_id BIGINT REFERENCES public.users NOT NULL,
  status subscription_status,
  metadata JSONB,
  price_id TEXT REFERENCES public.prices NOT NULL,
  quantity INTEGER,
  cancel_at_period_end BOOLEAN,
  created TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancel_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trial_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  trial_end TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id)
);

ALTER TABLE
  public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE
OR REPLACE FUNCTION notify_product_changes() RETURNS TRIGGER AS $$ 
BEGIN
PERFORM pg_notify('product_changes', row_to_json(NEW)::text);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_changes_trigger
AFTER
INSERT
  OR
UPDATE
  OR DELETE ON products FOR EACH ROW EXECUTE FUNCTION notify_product_changes();