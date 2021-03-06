import { baseUrl } from '../settings/api.js';

const fetchCurrentProduct = async (id, setCurrentProduct) => {
  const url = `${baseUrl}/products/${id}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    setCurrentProduct(result);
  } catch (error) {
    console.log(error);
  }
};

export default fetchCurrentProduct;
