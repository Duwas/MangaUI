'use client';
import { use } from 'react';
import ChapterReader from '@/components/chapter/ChapterReader';
import ErrorState from '@/components/common/ErrorState';
import mockManga from '@/data/mockManga';
import mockChapters, { getChapterById, getChaptersByMangaId } from '@/data/mockChapters';

export default function ChapterPage({ params }) {
  const { id } = use(params);
  const chapter = getChapterById(id);
  if (!chapter) return <ErrorState message="Không tìm thấy chương này" />;

  const manga = mockManga.find(m => m.id === chapter.mangaId);
  const chapters = getChaptersByMangaId(chapter.mangaId);

  return <ChapterReader chapter={chapter} chapters={chapters} manga={manga} />;
}
