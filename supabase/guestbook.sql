-- ───────────────────────────────────────────────
-- 방명록(Guestbook) 스키마
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 RUN 하세요.
-- 비밀번호는 bcrypt 해시로 저장되며, 외부에는 password가 노출되지 않습니다.
-- ───────────────────────────────────────────────

create extension if not exists pgcrypto;

-- 1) 테이블
create table if not exists public.guestbook (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  message    text not null,
  password   text not null,                 -- bcrypt 해시 저장
  created_at timestamptz not null default now()
);

-- 2) RLS 활성화 (정책 없음 → anon은 테이블 직접 접근 불가, RPC/뷰로만 동작)
alter table public.guestbook enable row level security;

-- 3) password 제외한 공개 뷰 (목록 조회용)
create or replace view public.guestbook_public as
  select id, name, message, created_at
  from public.guestbook;

grant select on public.guestbook_public to anon, authenticated;

-- 4) 작성 RPC (비밀번호를 해시해서 저장)
create or replace function public.add_guestbook(
  p_name text, p_message text, p_password text
) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if char_length(trim(coalesce(p_name, ''))) = 0
     or char_length(trim(coalesce(p_message, ''))) = 0 then
    raise exception '이름과 메시지는 필수입니다.';
  end if;
  insert into public.guestbook(name, message, password)
  values (
    left(trim(p_name), 20),
    left(trim(p_message), 500),
    crypt(p_password, gen_salt('bf'))
  );
end; $$;

grant execute on function public.add_guestbook(text, text, text) to anon, authenticated;

-- 5) 삭제 RPC (비밀번호 일치 시에만 삭제, 일치 여부 boolean 반환)
create or replace function public.delete_guestbook(
  p_id uuid, p_password text
) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
declare cnt int;
begin
  delete from public.guestbook
   where id = p_id
     and password = crypt(p_password, password);
  get diagnostics cnt = row_count;
  return cnt > 0;
end; $$;

grant execute on function public.delete_guestbook(uuid, text) to anon, authenticated;
