import { createClient, SupabaseClient } from "@supabase/supabase-js";

// .env.local 에 아래 두 값을 넣으세요 (Supabase 프로젝트 Settings → API)
//   NEXT_PUBLIC_SUPABASE_URL=...
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// env가 없으면 null → 방명록 컴포넌트가 안내 문구로 폴백
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;
