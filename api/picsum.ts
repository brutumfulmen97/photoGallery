const BASE_URL = `https://picsum.photos/v2`;

export async function getList(page = 1) {
  const response = await fetch(`${BASE_URL}/list?page=${page}`);
  const photos = await response.json();
  return photos;
}

export function formatPhotoUri(id: string, width: number, height: number) {
  return `https://picsum.photos/id/${id}/${Math.floor(width)}/${Math.floor(
    height,
  )}`;
}
