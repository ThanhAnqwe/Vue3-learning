// src/services/candidateService.js

const BASE_URL = 'http://localhost:3001/candidates';

// ── GET danh sách có phân trang + tìm kiếm ──────────────
export const getCandidates = async ({ page = 1, limit = 15, search = '' } = {}) => {
  const params = new URLSearchParams({
    _page: page,
    _per_page: limit,   // json-server v1 dùng _per_page thay vì _limit
  });

  if (search.trim()) {
    params.append('q', search.trim());
  }

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error('Lỗi khi tải danh sách ứng viên');


  const json  = await response.json();
  const data  = json.data  ?? json;
  const total = json.items ?? data.length; 

  return { data, total };
};

// ── POST thêm mới ────────────────────────────────────────
export const createCandidate = async (candidate) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) throw new Error('Lỗi khi thêm ứng viên');
  return response.json();
};

// ── PUT sửa ─────────────────────────────────────────────
export const updateCandidate = async (id, candidate) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) throw new Error('Lỗi khi cập nhật ứng viên');
  return response.json();
};

// ── DELETE xóa ──────────────────────────────────────────
export const deleteCandidate = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });

  if (!response.ok) throw new Error('Lỗi khi xóa ứng viên');
};