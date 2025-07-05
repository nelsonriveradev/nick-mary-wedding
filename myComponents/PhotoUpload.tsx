"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon, SendIcon } from "lucide-react";

export default function PhotoUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
    } catch (error) {}
  }
  return (
    <div className="w-2/3 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Share a Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="photo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CameraIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload a photo
                    </p>
                  </div>
                )}
                <Input
                  name="photo"
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="">
              <label htmlFor="caption" className="text-lg font-semibold">
                Caption
              </label>
              <Textarea required name="caption" />
            </div>
            <div className="mx-auto w-1/2">
              <Button className="w-full text-md">
                Upload{" "}
                <span>
                  <SendIcon />
                </span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
