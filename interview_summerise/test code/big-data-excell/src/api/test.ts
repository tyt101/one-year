import request from '@/utils/request';

export function test(params: unknown) {
  return request.get('/api', { params });
}

export function testPost(data: unknown) {
  return request.post('/api', data);
}
