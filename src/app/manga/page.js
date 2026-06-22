"use client";

import { useEffect, useMemo, useState } from "react";
import { Row, Col, Select, Input, Pagination, Spin } from "antd";
import MangaCard from "@/components/manga/MangaCard";
import mockCategories from "@/data/mockCategories";
import mangaApi from "@/services/mangaApi";
import styles from "./page.module.css";

export default function MangaListPage() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [page, setPage] = useState(1);

  const pageSize = 12;

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await mangaApi.getApproved();
        setMangas(res.data || []);
      } catch (error) {
        console.error("Lỗi lấy danh sách truyện:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  const filtered = useMemo(() => {
    let result = [...mangas];

    if (search) {
      result = result.filter((m) =>
        m.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((m) =>
        m.categories?.some((c) => {
          if (typeof c === "number") return c === categoryFilter;
          return c?.id === categoryFilter || c?.name === mockCategories.find(mc => mc.id === categoryFilter)?.name;
        })
      );
    }

    if (statusFilter) {
      result = result.filter((m) => m.status === statusFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "updatedAt") {
        return (
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
        );
      }

      if (sortBy === "views") {
        return (b.views || 0) - (a.views || 0);
      }

      if (sortBy === "rating") {
        return (b.averageRating || 0) - (a.averageRating || 0);
      }

      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      return 0;
    });

    return result;
  }, [mangas, search, categoryFilter, statusFilter, sortBy]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [search, categoryFilter, statusFilter, sortBy]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container} style={{ textAlign: "center", padding: "80px 0" }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Danh Sách Truyện</h1>

        <div className={styles.filters}>
          <Input.Search
            placeholder="Tìm kiếm truyện..."
            allowClear
            onSearch={setSearch}
            onChange={(e) => !e.target.value && setSearch("")}
            style={{ width: 280 }}
            size="large"
          />

          <Select
            placeholder="Thể loại"
            allowClear
            value={categoryFilter}
            onChange={setCategoryFilter}
            style={{ width: 160 }}
            size="large"
            options={mockCategories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />

          <Select
            placeholder="Trạng thái"
            allowClear
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 160 }}
            size="large"
            options={[
              { value: "ONGOING", label: "Đang tiến hành" },
              { value: "COMPLETED", label: "Hoàn thành" },
              { value: "HIATUS", label: "Tạm ngưng" },
            ]}
          />

          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 160 }}
            size="large"
            options={[
              { value: "updatedAt", label: "Mới cập nhật" },
              { value: "views", label: "Lượt xem" },
              { value: "rating", label: "Đánh giá" },
              { value: "title", label: "Tên A-Z" },
            ]}
          />
        </div>

        <p className={styles.resultCount}>
          Tìm thấy <strong>{filtered.length}</strong> truyện
        </p>

        <Row gutter={[16, 16]}>
          {paged.map((manga) => (
            <Col key={manga.id} xs={12} sm={8} md={6} lg={4}>
              <MangaCard manga={manga} />
            </Col>
          ))}
        </Row>

        {filtered.length > pageSize && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Pagination
              current={page}
              total={filtered.length}
              pageSize={pageSize}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}