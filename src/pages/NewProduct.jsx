import React, { useState } from 'react';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const [product, setProduct] = useState();
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제품의 사진을 Cloudinary에 업로드하고 URL을 획득
    // Firebase에 새로운 제품을 추가함
  };

  return (
    <section>
      <header>
        <h1>새로운 제품 등록</h1>
      </header>
      {file && <img src={URL.createObjectURL(file)} alt='local file' />}
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          placeholder='No File Chosen'
          accept='image/*'
          name='file'
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='title'
          placeholder='제품명'
          value={product.title ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='number'
          name='price'
          placeholder='가격'
          value={product.price ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='category'
          placeholder='카테고리'
          value={product.category ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='description'
          placeholder='제품 설명'
          value={product.description ?? ''}
          required
          onChange={handleChange}
        />
        <input
          type='text'
          name='options'
          placeholder='옵션들(콤마(,)로 구분)'
          value={product.options ?? ''}
          required
          onChange={handleChange}
        />
        <Button text={'제품 등록하기'} />
      </form>
    </section>
  );
}
