"use client";

import { use, useEffect, useState } from "react";
import { Divider, Spin } from "antd";

import MangaDetail from "@/components/manga/MangaDetail";
import ChapterList from "@/components/manga/ChapterList";
import MangaGrid from "@/components/manga/MangaGrid";
import ErrorState from "@/components/common/ErrorState";

import mangaApi from "@/services/mangaApi";
import chapterApi from "@/services/chapterApi";

export default function MangaDetailPage({ params }) {
  const { id } = use(params);

  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [relatedManga, setRelatedManga] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [mangaRes, chapterRes, allMangaRes] = await Promise.all([
          mangaApi.getById(id),
          chapterApi.getByMangaId(id),
          mangaApi.getApproved(),
        ]);

        const mangaData = mangaRes.data;
        const chapterData = chapterRes.data || [];
        const allManga = allMangaRes.data || [];

        setManga(mangaData);

        setChapters(
          [...chapterData].sort(
            (a, b) => b.chapterNumber - a.chapterNumber
          )
        );

        setRelatedManga(
          allManga
            .filter((item) => item.id !== Number(id))
            .slice(0, 5)
        );
      } catch (err) {
        console.error("Lỗi lấy chi tiết truyện:", err);
        setError("Không tìm thấy truyện này");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !manga) {
    return <ErrorState message={error || "Không tìm thấy truyện này"} />;
  }

  return (
    <div>
      <MangaDetail manga={manga} />

      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "32px auto",
          padding: "0 var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
          <ChapterList chapters={chapters} mangaId={manga.id} />

          {relatedManga.length > 0 && (
            <>
              <Divider
                style={{
                  borderColor: "#2D2D4A",
                  margin: "40px 0 24px",
                }}
              />

              <MangaGrid
                mangas={relatedManga}
                title="Truyện Liên Quan"
                columns={5}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}