'use client';
import { use, useEffect, useState } from 'react';
import ChapterReader from '@/components/chapter/ChapterReader';
import ErrorState from '@/components/common/ErrorState';
import chapterApi from '@/services/chapterApi';
import mangaApi from '@/services/mangaApi';
import { Spin } from 'antd';

export default function ChapterPage({ params }) {
  const { id } = use(params);
  
  const [chapter, setChapter] = useState(null);
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Get current chapter
        const chapterRes = await chapterApi.getById(id);
        const currentChapter = chapterRes.data;
        setChapter(currentChapter);

        // 2. Get manga and chapters list in parallel
        const [mangaRes, chaptersRes] = await Promise.all([
          mangaApi.getById(currentChapter.mangaId),
          chapterApi.getByMangaId(currentChapter.mangaId)
        ]);
        
        setManga(mangaRes.data);
        setChapters(chaptersRes.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  if (error || !chapter) return <ErrorState message="Không tìm thấy chương này" />;

  return <ChapterReader chapter={chapter} chapters={chapters} manga={manga} />;
}
