const mockFavorites = [
  { id: 1, userId: 3, mangaId: 1, createdAt: '2026-05-01T00:00:00Z' },
  { id: 2, userId: 3, mangaId: 2, createdAt: '2026-04-15T00:00:00Z' },
  { id: 3, userId: 3, mangaId: 3, createdAt: '2026-04-20T00:00:00Z' },
  { id: 4, userId: 3, mangaId: 9, createdAt: '2025-06-10T00:00:00Z' },
  { id: 5, userId: 3, mangaId: 24, createdAt: '2026-06-01T00:00:00Z' },
  { id: 6, userId: 3, mangaId: 11, createdAt: '2026-05-10T00:00:00Z' },
  { id: 7, userId: 4, mangaId: 1, createdAt: '2026-05-05T00:00:00Z' },
  { id: 8, userId: 4, mangaId: 13, createdAt: '2026-05-12T00:00:00Z' },
  { id: 9, userId: 4, mangaId: 20, createdAt: '2025-08-20T00:00:00Z' },
  { id: 10, userId: 7, mangaId: 2, createdAt: '2026-03-10T00:00:00Z' },
  { id: 11, userId: 7, mangaId: 10, createdAt: '2026-04-01T00:00:00Z' },
  { id: 12, userId: 8, mangaId: 1, createdAt: '2026-05-15T00:00:00Z' },
  { id: 13, userId: 8, mangaId: 17, createdAt: '2026-05-20T00:00:00Z' },
];

export const getFavoritesByUserId = (userId) => {
  return mockFavorites.filter(f => f.userId === userId);
};

export const isFavorited = (userId, mangaId) => {
  return mockFavorites.some(f => f.userId === userId && f.mangaId === mangaId);
};

export default mockFavorites;
