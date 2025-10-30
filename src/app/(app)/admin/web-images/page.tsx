"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/src/components/ui/button"
import {
  useGetAllWebImages,
  useCreateWebImage,
  useUpdateWebImage,
  useDeleteWebImage,
} from "@/src/services/WebImageServices"
import { WebImage } from "@/src/interfaces/WebImage/WebImage"
import {
  Image as ImageIcon,
  Edit,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { CloudinaryButton } from "@/src/components/CloudinaryButton"

export default function AdminWebImages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingImage, setEditingImage] = useState<string | null>(null)
  const [editUrl, setEditUrl] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageName, setNewImageName] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // API hooks
  const {
    data: webImagesResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllWebImages()

  const createImageMutation = useCreateWebImage()
  const updateImageMutation = useUpdateWebImage()
  const deleteImageMutation = useDeleteWebImage()

  const webImages = webImagesResponse?.data || []

  // Filter images
  const filteredImages = webImages.filter((image: WebImage) =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Initialize editing state when clicking edit
  const handleEdit = (image: WebImage) => {
    setEditingImage(image.name)
    setEditUrl(image.imageUrl)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingImage(null)
    setEditUrl("")
  }

  // Save edited image
  const handleSaveEdit = async () => {
    if (!editingImage) return

    try {
      await updateImageMutation.mutateAsync({
        name: editingImage,
        imageUrl: editUrl,
      })
      refetch()
      handleCancelEdit()
    } catch (error) {
      console.error("Error updating image:", error)
    }
  }

  // Handle delete
  const handleDelete = async (name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${name}"?`)) {
      try {
        await deleteImageMutation.mutateAsync(name)
        refetch()
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }
  }

  // Handle create new image
  const handleCreate = async () => {
    if (!newImageName || !newImageUrl) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    try {
      await createImageMutation.mutateAsync({
        name: newImageName,
        imageUrl: newImageUrl,
      })
      refetch()
      setNewImageName("")
      setNewImageUrl("")
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error creating image:", error)
    }
  }

  // Handle image upload from Cloudinary
  const handleImageUpload = (url: string) => {
    if (editingImage) {
      setEditUrl(url)
    } else {
      setNewImageUrl(url)
    }
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Quản lý Web Images</h1>
          <p className='text-white/70'>
            {isLoading ? "Đang tải..." : `${filteredImages.length} hình ảnh`}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-vibrant-pink hover:bg-vibrant-pink/80 text-white px-6 py-3 rounded-lg flex items-center space-x-2'
        >
          <ImageIcon className='w-5 h-5' />
          <span>Thêm hình ảnh mới</span>
        </button>
      </div>

      {/* Error State */}
      {isError && (
        <Card className='p-6 bg-red-500/10 backdrop-blur-md border-red-500/20'>
          <div className='flex items-center space-x-3'>
            <AlertCircle className='w-6 h-6 text-red-400' />
            <div>
              <h3 className='text-lg font-semibold text-red-400 mb-2'>
                Lỗi khi tải dữ liệu
              </h3>
              <p className='text-red-400/80 mb-4'>
                Không thể tải danh sách hình ảnh. Vui lòng thử lại.
              </p>
              <Button
                onClick={() => refetch()}
                variant='outline'
                className='text-red-400 border-red-400/20 hover:bg-red-400/10'
              >
                Thử lại
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Success Message */}
      {updateImageMutation.isSuccess && (
        <Card className='p-4 bg-green-500/10 backdrop-blur-md border-green-500/20'>
          <div className='flex items-center space-x-3'>
            <CheckCircle className='w-5 h-5 text-green-400' />
            <p className='text-green-400 font-medium'>
              Cập nhật hình ảnh thành công!
            </p>
          </div>
        </Card>
      )}

      {createImageMutation.isSuccess && (
        <Card className='p-4 bg-green-500/10 backdrop-blur-md border-green-500/20'>
          <div className='flex items-center space-x-3'>
            <CheckCircle className='w-5 h-5 text-green-400' />
            <p className='text-green-400 font-medium'>
              Thêm hình ảnh thành công!
            </p>
          </div>
        </Card>
      )}

      {/* Search */}
      <Card className='p-6 bg-white/10 backdrop-blur-md border-white/20'>
        <input
          type='text'
          placeholder='Tìm kiếm theo tên hình ảnh...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
        />
      </Card>

      {/* Images Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {isLoading ? (
          <div className='col-span-full flex items-center justify-center py-12'>
            <div className='flex items-center space-x-3'>
              <Loader2 className='w-6 h-6 animate-spin text-vibrant-pink' />
              <span className='text-white/70'>Đang tải hình ảnh...</span>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className='col-span-full flex items-center justify-center py-12'>
            <div className='text-center'>
              <ImageIcon className='w-12 h-12 text-white/40 mx-auto mb-4' />
              <h3 className='text-lg font-semibold text-white/70 mb-2'>
                Không tìm thấy hình ảnh
              </h3>
              <p className='text-white/50'>
                {searchTerm
                  ? "Thử thay đổi từ khóa tìm kiếm"
                  : "Chưa có hình ảnh nào trong hệ thống"}
              </p>
            </div>
          </div>
        ) : (
          filteredImages.map((image: WebImage) => (
            <Card
              key={image.name}
              className='p-6 bg-white/10 backdrop-blur-md border-white/20 flex flex-col'
            >
              {/* Image Preview */}
              <div className='aspect-video bg-white/5 rounded-lg mb-4 overflow-hidden'>
                {editingImage === image.name ? (
                  <div className='w-full h-full flex items-center justify-center'>
                    <input
                      type='text'
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className='w-full p-2 bg-white/10 border border-white/20 rounded text-white text-sm'
                      placeholder='Image URL'
                    />
                  </div>
                ) : (
                  <img
                    src={image.imageUrl}
                    alt={image.name}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x225?text=Image+Not+Found"
                    }}
                  />
                )}
              </div>

              {/* Image Name */}
              <h3 className='text-lg font-semibold text-white mb-4'>
                {image.name}
              </h3>

              {/* Actions */}
              {editingImage === image.name ? (
                <div className='flex space-x-2 mt-auto'>
                  <CloudinaryButton
                    onUploaded={(url) => setEditUrl(url)}
                    className='flex-1 bg-transparent'
                    text='Upload'
                  />
                  <Button
                    onClick={handleSaveEdit}
                    disabled={updateImageMutation.isPending}
                    className='flex-1 bg-green-500 hover:bg-green-600 text-white'
                  >
                    {updateImageMutation.isPending ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      <>
                        <Save className='w-4 h-4 mr-2' />
                        Lưu
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant='outline'
                    className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                  >
                    <X className='w-4 h-4' />
                  </Button>
                </div>
              ) : (
                <div className='flex space-x-2 mt-auto'>
                  <Button
                    onClick={() => handleEdit(image)}
                    variant='outline'
                    className='flex-1 text-green-400 border-green-400/20 hover:bg-green-400/10'
                  >
                    <Edit className='w-4 h-4 mr-2' />
                    Sửa
                  </Button>
                  <Button
                    onClick={() => handleDelete(image.name)}
                    variant='outline'
                    disabled={deleteImageMutation.isPending}
                    className='text-red-400 border-red-400/20 hover:bg-red-400/10'
                  >
                    {deleteImageMutation.isPending ? (
                      <Loader2 className='w-4 h-4 animate-spin' />
                    ) : (
                      "Xóa"
                    )}
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {/* New Image Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <Card className='w-full max-w-md bg-white/10 backdrop-blur-md border-white/20 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-bold text-lg text-white'>
                Thêm hình ảnh mới
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-white/70 hover:text-white'
              >
                <X className='w-5 h-5' />
              </button>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='text-white/70 text-sm mb-2 block'>
                  Tên hình ảnh
                </label>
                <input
                  type='text'
                  value={newImageName}
                  onChange={(e) => setNewImageName(e.target.value)}
                  placeholder='VD: background1'
                  className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink'
                />
              </div>
              <div>
                <label className='text-white/70 text-sm mb-2 block'>
                  URL hình ảnh
                </label>
                <input
                  type='text'
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder='https://...'
                  className='w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-vibrant-pink mb-2'
                />
                <CloudinaryButton
                  onUploaded={handleImageUpload}
                  className='w-full'
                  text='Upload từ Cloudinary'
                />
              </div>
            </div>
            <div className='flex justify-end space-x-3 mt-6'>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant='outline'
                className='text-white/70 hover:text-white border-white/20'
              >
                Hủy
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createImageMutation.isPending}
                className='bg-vibrant-pink hover:bg-vibrant-pink/80 text-white'
              >
                {createImageMutation.isPending ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin mr-2' />
                    Đang tạo...
                  </>
                ) : (
                  "Tạo mới"
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
