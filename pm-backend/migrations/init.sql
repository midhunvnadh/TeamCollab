CREATE TABLE IF NOT EXISTS public.users (
    id serial NOT NULL PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_projects_access (
    id serial NOT NULL PRIMARY KEY,
    user_id integer NULL,
    project_id integer NULL,
    admin boolean NOT NULL DEFAULT false
);
  
CREATE TABLE IF NOT EXISTS public.tasks (
    id serial NOT NULL PRIMARY KEY,
    project_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    status integer NOT NULL DEFAULT 0,
    title text NOT NULL,
    assigned_to_user integer NULL
);

CREATE TABLE IF NOT EXISTS public.projects (
    id serial NOT NULL PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);