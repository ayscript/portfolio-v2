"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

interface ImageUploadProps {
  initialImage?: string;
  onImageUploaded: (url: string) => void;
  folder?: string;
}

export function ImageUpload({
  initialImage,
  onImageUploaded,
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      let downloadURL = "";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      fetch("https://api.cloudinary.com/v1_1/dgetbfevu/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          downloadURL = data.secure_url;
          setImage(downloadURL);
          onImageUploaded(downloadURL);
        })
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage(null);
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {image ? (
        <div className="relative w-full aspect-square max-w-[200px] mx-auto">
          <Image
            src={image || "/placeholder.svg"}
            alt="Uploaded image"
            fill
            className="object-cover rounded-full"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-zinc-700 rounded-full w-[200px] h-[200px] mx-auto flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors"
        >
          <Upload className="h-10 w-10 text-zinc-500 mb-2" />
          <p className="text-zinc-500 text-sm text-center">
            Click to upload image
            <br />
            <span className="text-xs">JPG, PNG, GIF</span>
          </p>
        </div>
      )}

      {uploading && (
        <div className="text-center text-sm text-zinc-400">Uploading...</div>
      )}

      {!image && !uploading && (
        <Button
          type="button"
          variant="outline"
          onClick={triggerFileInput}
          className="w-full border-zinc-700"
        >
          Select Image
        </Button>
      )}
    </div>
  );
}
