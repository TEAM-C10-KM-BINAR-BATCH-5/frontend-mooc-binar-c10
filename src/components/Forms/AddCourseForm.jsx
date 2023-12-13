import { useEffect, useRef, useState } from "react"
import { getCategory } from "../../libs/api"
import { useRecoilState } from "recoil"
import { addCourseFormState } from "../../atom/formAtom"
import { PencilSimpleLine, UploadSimple } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

export default function AddCourseForm() {
	const [categories, setCategories] = useState([])
	const [formData, setFormData] = useRecoilState(addCourseFormState)
	const imagePickerRef = useRef()

	useEffect(() => {
		async function fetchCategories() {
			try {
				const categoryData = await getCategory()
				setCategories(categoryData) // Simpan daftar kategori dari hasil fetch
			} catch (error) {
				console.error("Error fetching categories:", error)
			}
		}
		fetchCategories()
	}, [])

	const handleInputChange = (e) => {
		const { name, value, files } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		if (files) {
			setFormData((prev) => ({
				...prev,
				[name]: files[0],
			}))
		}
	}

	return (
		<AnimatePresence>
			<motion.div initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: -100 }}>
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
							Deskripsi
						</label>
						<textarea
							className="appearance-none border rounded-lg w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
							type="text"
							placeholder="Masukan deskripsi kelas"
							name="about"
							onChange={handleInputChange}
							value={formData.about}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Tujuan
						</label>
						<input
							className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Masukan tujuan kelas"
							name="objective"
							onChange={handleInputChange}
							value={formData.objective}
						/>
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
							Link Telegram
						</label>
						<input
							className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Masukan link telegram kelas"
							name="telegramLink"
							onChange={handleInputChange}
							value={formData.telegramLink}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Onboarding
						</label>
						<input
							className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Masukan pnboarding"
							name="onboarding"
							onChange={handleInputChange}
							value={formData.onboarding}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Level
						</label>
						<select
							className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={formData.level}
							onChange={handleInputChange}
							name="level"
						>
							<option value="">Pilih level</option>
							<option
								value="Beginner"
								selected={formData.level == "Beginner" ? true : false}
							>
								Beginner
							</option>
							<option
								value="Intermediate"
								selected={formData.level == "Intermediate" ? true : false}
							>
								Intermediate
							</option>
							<option
								value="Advance"
								selected={formData.level == "Advance" ? true : false}
							>
								Advance
							</option>
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Harga
						</label>
						<input
							className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							placeholder="Masukan Harga kelas"
							min={0}
							onChange={handleInputChange}
							value={formData.price}
							onWheel={(e) => e.target.blur()}
							name="price"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Image
						</label>
						{formData.image && (
							<div>
								<img src={URL.createObjectURL(formData.image)} alt="Preview" />
							</div>
						)}
						<div
							onClick={() => imagePickerRef.current.click()}
							className="cursor-pointer"
						>
							<div className="flex flex-row gap-2 w-fit rounded-lg mt-2 items-center p-3 border-2 text-costumeBlue border-costumeBlue text-sm">
								{!formData.image ? (
									<>
										<UploadSimple size={22} className="text-costumeBlue" />
										Upload Gambar
									</>
								) : (
									<>
										<PencilSimpleLine size={22} className="text-costumeBlue" />
										Edit Gambar
									</>
								)}
							</div>

							<input
								className="hidden appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="file"
								placeholder="Pilih kategori"
								onChange={handleInputChange}
								name="image"
								ref={imagePickerRef}
								accept="image/*"
							/>
						</div>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	)
}
