CREATE TABLE IF NOT EXISTS public.users (
    id serial PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    created_at time with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.projects (
    id serial PRIMARY KEY,
    name text NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_projects_access (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    project_id integer NOT NULL,
    admin boolean NOT NULL DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES public.projects (id) ON DELETE CASCADE,
    UNIQUE (user_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.tasks (
    id serial PRIMARY KEY,
    project_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    status integer NOT NULL DEFAULT 0,
    title text NOT NULL,
    assigned_to_user integer,
    FOREIGN KEY (project_id) REFERENCES public.projects (id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to_user) REFERENCES public.users (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS public.task_comments (
    id serial PRIMARY KEY,
    task_id integer NOT NULL,
    user_id integer NOT NULL,
    comment text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    FOREIGN KEY (task_id) REFERENCES public.tasks (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES public.users (id) ON DELETE CASCADE
);