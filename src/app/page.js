"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addVideo, getAllVideos, deleteVideo } from "@/lib/db";


export default function Home() {
  const [videos, setVideos] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const saved = await getAllVideos();
    const withUrls = saved.map(v => ({
      ...v,
      url: URL.createObjectURL(v.file),
    }));
    setVideos(withUrls);
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await addVideo(file);
    loadVideos();
  }
  if (!mounted) return null; 
  return (
    <div className="p-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className='cursor-pointer'>Upload Video</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader >
            <SheetTitle className='cursor-pointer'>Upload Videos</SheetTitle>
          </SheetHeader>
          <div className="mt-6 m-5 cursor-pointer space-y-4">
            <Input
              type="file"
              accept="video/*"
              multiple
              onChange={handleUpload}
              className="cursor-pointer"
            />
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-center text-2xl font-bold">Video Gallery</h1>
      {videos.length ?
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {videos.map((video) => (
            <div key={video.id}>
              <video width="300" controls className="w-full rounded-lg shadow-lg hover:animate- cursor-pointer">
                <source src={video.url} type="video/mp4" />
              </video>
            </div>
          ))}
        </div> : <div className="text-center mt-5 ">Please upload the video</div>}
    </div>
  );
}
