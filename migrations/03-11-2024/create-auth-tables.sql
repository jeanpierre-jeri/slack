CREATE OR REPLACE FUNCTION generate_random_animal_name() RETURNS TEXT AS $$
DECLARE
  animals TEXT[] := ARRAY[
    'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox', 'Eagle', 'Hawk', 'Panther', 'Falcon', 'Shark',
    'Jaguar', 'Cobra', 'Leopard', 'Raven', 'Buffalo', 'Viper', 'Otter', 'Raccoon', 'Moose', 'Stallion',
    'Cheetah', 'Puma', 'Falcon', 'Gazelle', 'Heron', 'Bison', 'Ibis', 'Mustang', 'Phoenix', 'Griffin',
    'Dragon', 'Orca', 'Python', 'Cougar', 'Rhino', 'Beaver', 'Salmon', 'Lynx', 'Condor', 'Mamba',
    'Osprey', 'Pelican', 'Jackal', 'Scorpion', 'Crane', 'Falcon', 'Kestrel', 'Dingo', 'Gorilla', 'Hyena'
  ];
  first_animal TEXT;
  second_animal TEXT;
BEGIN
  first_animal := animals[(random() * array_length(animals, 1) + 1)::int];
  second_animal := animals[(random() * array_length(animals, 1) + 1)::int];
  
  WHILE first_animal = second_animal LOOP
    second_animal := animals[(random() * array_length(animals, 1) + 1)::int];
  END LOOP;
  
  RETURN first_animal || ' ' || second_animal;
END;
$$ LANGUAGE plpgsql;

DROP TABLE IF EXISTS public.sessions;

DROP TABLE IF EXISTS public.accounts;

DROP TABLE IF EXISTS public.verification_token;

DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
  id BIGSERIAL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT DEFAULT generate_random_animal_name(),
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