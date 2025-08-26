import Image from 'next/image';
import { Anecdote } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface AnecdoteCardProps {
  anecdote: Anecdote;
}

export default function AnecdoteCard({ anecdote }: AnecdoteCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <time className="text-sm text-gray-500">{formatDate(anecdote.date)}</time>
          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
            {anecdote.badge}
          </span>
        </div>
        
        <p className="text-gray-700 mb-4">{anecdote.content}</p>
        
        {anecdote.photos && anecdote.photos.map((photo, index) => (
          <figure key={index} className="mb-4">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
        
        {anecdote.video && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={anecdote.video.url}
              className="w-full h-full"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {anecdote.video.caption}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}