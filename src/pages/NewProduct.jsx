import React, { useState } from 'react';
import { addNewProduct } from '../api/firebase';
import { uploadImage } from '../api/uploader';
import Button from '../components/ui/Button';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

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
    setIsUploading(true);
    uploadImage(file)//
    .then((url) => {
      addNewProduct(product, url)
      .then(()=>{
        setSuccess('성공적으로 제품이 추가되었습니다.');
        setTimeout(()=> {
            setSuccess(null);
        }, 4000);
      });
    })
    .finally(() => setIsUploading(false));
  };

  return (
    <section>
      <header>
        <h2>새로운 제품 등록</h2>
        {success && <p>✅{success}</p>}
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
        <Button 
            text={isUploading? '업로드중...' : '제품 등록하기'} 
            disabled={isUploading}
        />
      </form>
    </section>
  );
}
