// src/services/candidateService.js

const BASE_URL = 'http://localhost:3001/candidates';

// GET + paging
export const getCandidates = async ({ page = 1, limit = 15, search = '' } = {}) => {
  const params = new URLSearchParams({
    _page: page,
    _per_page: limit,
  });
  // console.log(search);
  

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) throw new Error('Lỗi khi tải danh sách ứng viên');


  const json  = await response.json();
  let data  = json.data  ?? json;
  let total = json.items ?? data.length; 

   if (search.trim()) {
    data = data.filter(c =>
      c.fullName?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }
  return { data, total };
};

// Post 
export const createCandidate = async (candidate) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) throw new Error('Lỗi khi thêm ứng viên');
  return response.json();
};

// PUT
export const updateCandidate = async (id, candidate) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidate),
  });

  if (!response.ok) throw new Error('Lỗi khi cập nhật ứng viên');
  return response.json();
};

// DELETE
export const deleteCandidate = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });

  if (!response.ok) throw new Error('Lỗi khi xóa ứng viên');
};