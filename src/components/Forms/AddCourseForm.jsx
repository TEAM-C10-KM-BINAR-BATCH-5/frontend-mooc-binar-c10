import { useEffect, useRef, useState } from "react";
import { getCategory } from "../../libs/Api-libs";
import { useRecoilState } from "recoil";
import { addCourseFormState } from "../../atom/formAtom";
import { UploadSimple } from "@phosphor-icons/react";

export default function AddCourseForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useRecoilState(addCourseFormState);
  const imagePickerRef = useRef();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData); // Simpan daftar kategori dari hasil fetch
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  return (
    <>
      {" "}
      <p className="py-5 text-costumeBlue font-bold text-2xl text-center">
        Tambah Kelas
      </p>
      <form className="w-full max-w-md xs:max-w-xs mx-auto relative">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nama
          </label>
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Masukan nama kelas"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kategori
          </label>
          <select
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.categoryId}
            onChange={handleInputChange}
            name="categoryId"
          >
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                selected={formData.categoryId == category.id ? true : false}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Instruktur
          </label>
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Masukkan nama instruktur"
            onChange={handleInputChange}
            value={formData.instructor}
            name="instructor"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Level
          </label>
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Masukan level kelas"
            onChange={handleInputChange}
            value={formData.level}
            name="level"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Harga
          </label>
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Masukan Harga kelas"
            onChange={handleInputChange}
            value={formData.price}
            name="price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <div onClick={() => imagePickerRef.current.click()}>
            <UploadSimple size={32} className="text-costumeBlue" />
            <input
              className="hidden appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              placeholder="Pilih kategori"
              onChange={handleInputChange}
              name="image"
              ref={imagePickerRef}
            />
          </div>
          {formData.image && (
            <div>
              <img src={URL.createObjectURL(formData.image)} alt="Preview" />
            </div>
          )}
        </div>
      </form>
    </>
  );
}
