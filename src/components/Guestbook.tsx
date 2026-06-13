"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { containsBadWord } from "@/lib/badwords";

type Entry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  // 작성 폼
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 삭제 UI
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePw, setDeletePw] = useState("");

  // 더보기 (5개씩)
  const PAGE = 5;
  const [visible, setVisible] = useState(PAGE);

  // 관리자 모드 (?admin 으로 접속 시)
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPw, setAdminPw] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.has("admin"));
  }, []);

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("guestbook_public")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setEntries(data as Entry[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async () => {
    if (!supabase) return;
    if (!name.trim() || !message.trim()) {
      alert("이름과 메시지를 입력해 주세요.");
      return;
    }
    if (password.length !== 4) {
      alert("삭제용 비밀번호 4자리를 입력해 주세요.");
      return;
    }
    if (containsBadWord(name) || containsBadWord(message)) {
      alert("부적절한 표현이 포함되어 있어요. 따뜻한 말로 남겨주세요 🙂");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.rpc("add_guestbook", {
      p_name: name.trim(),
      p_message: message.trim(),
      p_password: password,
    });
    setSubmitting(false);
    if (error) {
      alert("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setName("");
    setMessage("");
    setPassword("");
    load();
  };

  const confirmDelete = async (id: string) => {
    if (!supabase) return;
    if (deletePw.length !== 4) {
      alert("비밀번호 4자리를 입력해 주세요.");
      return;
    }
    const { data, error } = await supabase.rpc("delete_guestbook", {
      p_id: id,
      p_password: deletePw,
    });
    if (error) {
      alert("삭제 중 오류가 발생했어요.");
      return;
    }
    if (data === true) {
      setDeletingId(null);
      setDeletePw("");
      load();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const adminDelete = async (id: string) => {
    if (!supabase) return;
    if (!adminPw) {
      alert("관리자 비밀번호를 입력해 주세요.");
      return;
    }
    if (!confirm("이 글을 삭제할까요?")) return;
    const { data, error } = await supabase.rpc("admin_delete_guestbook", {
      p_id: id,
      p_admin_pw: adminPw,
    });
    if (error) {
      alert("삭제 중 오류가 발생했어요.");
      return;
    }
    if (data === true) {
      load();
    } else {
      alert("관리자 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <section className="flex flex-col gap-6 px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-xs tracking-[0.35em] text-point">GUESTBOOK</p>
        <h2 className="text-lg font-medium text-ink">방명록</h2>
        <p className="text-sm leading-relaxed text-ink/70">
          따뜻한 축하의 한마디를 남겨주세요.
        </p>
      </div>

      {!supabase ? (
        <p className="rounded-xl bg-white/60 px-4 py-6 text-center text-sm text-ink/60">
          방명록 설정이 필요합니다. (Supabase 환경변수 미설정)
        </p>
      ) : (
        <>
          {/* 관리자 모드 바 (?admin 접속 시에만) */}
          {isAdmin && (
            <div className="flex items-center gap-2 rounded-xl border border-point/40 bg-point/5 p-3">
              <span className="shrink-0 text-xs font-medium text-point">
                관리자
              </span>
              <input
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
                type="password"
                placeholder="관리자 비밀번호"
                className="min-w-0 flex-1 rounded-md border border-ink/15 bg-white px-3 py-1.5 text-sm outline-none focus:border-point"
              />
            </div>
          )}

          {/* 작성 폼 */}
          <div className="flex flex-col gap-2 rounded-xl border border-ink/10 bg-white/60 p-4">
            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="이름"
                className="w-1/2 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-point"
              />
              <input
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                inputMode="numeric"
                maxLength={4}
                placeholder="비밀번호 4자리"
                className="w-1/2 rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-point"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder="축하 메시지를 남겨주세요."
              className="resize-none rounded-md border border-ink/15 bg-white px-3 py-2 text-sm outline-none focus:border-point"
            />
            <button
              onClick={submit}
              disabled={submitting}
              className="rounded-md bg-point py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {submitting ? "등록 중..." : "축하 메시지 남기기"}
            </button>
          </div>

          {/* 목록 */}
          <div className="flex flex-col gap-3">
            {loading ? (
              <p className="py-6 text-center text-sm text-ink/50">불러오는 중...</p>
            ) : entries.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink/50">
                첫 번째 축하 메시지를 남겨주세요.
              </p>
            ) : (
              entries.slice(0, visible).map((e) => (
                <div
                  key={e.id}
                  className="rounded-xl border border-ink/10 bg-white/60 p-4"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">{e.name}</span>
                    <span className="text-xs text-ink/50">
                      {formatDate(e.created_at)}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap break-keep text-[13px] leading-relaxed text-ink/80">
                    {e.message}
                  </p>

                  {deletingId === e.id ? (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        value={deletePw}
                        onChange={(ev) =>
                          setDeletePw(
                            ev.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="비밀번호 4자리"
                        className="w-32 rounded-md border border-ink/15 bg-white px-2 py-1 text-xs outline-none focus:border-point"
                      />
                      <button
                        onClick={() => confirmDelete(e.id)}
                        className="rounded-md bg-point px-2.5 py-1 text-xs text-white"
                      >
                        확인
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(null);
                          setDeletePw("");
                        }}
                        className="rounded-md border border-ink/20 px-2.5 py-1 text-xs text-ink/60"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-3">
                      <button
                        onClick={() => {
                          setDeletingId(e.id);
                          setDeletePw("");
                        }}
                        className="text-xs text-ink/40 underline"
                      >
                        삭제
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => adminDelete(e.id)}
                          className="text-xs text-rose-500 underline"
                        >
                          관리자 삭제
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}

            {/* 더보기 (5개씩) */}
            {entries.length > visible && (
              <button
                onClick={() => setVisible((v) => v + PAGE)}
                className="mx-auto mt-1 rounded-full border border-point/40 px-5 py-2 text-xs text-point"
              >
                더보기 ({entries.length - visible})
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
