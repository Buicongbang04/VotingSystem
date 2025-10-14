"use client"

import React, { useState } from "react"
import { Button } from "./button"
import { toast } from "sonner"
import {
  X,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  title?: string
  description?: string
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  shareUrl,
  title = "Chia sẻ",
  description = "Chia sẻ với bạn bè",
}) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success("Đã sao chép link!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("Không thể sao chép link")
    }
  }

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)

    let shareUrl_platform = ""

    switch (platform) {
      case "facebook":
        shareUrl_platform = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case "twitter":
        shareUrl_platform = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
        break
      case "linkedin":
        shareUrl_platform = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case "telegram":
        shareUrl_platform = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        break
      default:
        return
    }

    window.open(shareUrl_platform, "_blank", "width=600,height=400")
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-2xl p-6 mx-4 max-w-md w-full shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-600'>{description}</p>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='h-8 w-8 p-0 hover:bg-gray-100'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>

        {/* Share URL Display */}
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Link chia sẻ:
          </label>
          <div className='flex items-center space-x-2 p-3 bg-gray-50 rounded-lg'>
            <input
              type='text'
              value={shareUrl}
              readOnly
              className='flex-1 text-sm text-gray-600 bg-transparent border-none outline-none'
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={handleCopyLink}
              className={`h-8 px-3 ${
                copied
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "hover:bg-gray-200"
              }`}
            >
              <Copy className='h-4 w-4 mr-1' />
              {copied ? "Đã copy" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-700'>
            Chia sẻ trên mạng xã hội:
          </h4>
          <div className='grid grid-cols-2 gap-3'>
            <Button
              variant='outline'
              onClick={() => handleSocialShare("facebook")}
              className='flex items-center justify-center space-x-2 h-12 hover:bg-blue-50 hover:border-blue-300'
            >
              <Facebook className='h-5 w-5 text-blue-600' />
              <span className='text-sm'>Facebook</span>
            </Button>

            <Button
              variant='outline'
              onClick={() => handleSocialShare("twitter")}
              className='flex items-center justify-center space-x-2 h-12 hover:bg-sky-50 hover:border-sky-300'
            >
              <Twitter className='h-5 w-5 text-sky-500' />
              <span className='text-sm'>Twitter</span>
            </Button>

            <Button
              variant='outline'
              onClick={() => handleSocialShare("linkedin")}
              className='flex items-center justify-center space-x-2 h-12 hover:bg-blue-50 hover:border-blue-300'
            >
              <Linkedin className='h-5 w-5 text-blue-700' />
              <span className='text-sm'>LinkedIn</span>
            </Button>

            <Button
              variant='outline'
              onClick={() => handleSocialShare("telegram")}
              className='flex items-center justify-center space-x-2 h-12 hover:bg-blue-50 hover:border-blue-300'
            >
              <MessageCircle className='h-5 w-5 text-blue-500' />
              <span className='text-sm'>Telegram</span>
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <div className='mt-6 pt-4 border-t'>
          <Button
            onClick={onClose}
            className='w-full bg-gradient-to-r from-[#65002F] to-[#F54BAF] text-white hover:opacity-90'
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
