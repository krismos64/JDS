"use client";

import { useState } from 'react';
import { Score } from '@/lib/types';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ScoreTableProps {
  scores: Score[];
}

type SortKey = 'date' | 'game' | 'coco' | 'stacy' | 'fab' | 'chris';
type SortOrder = 'asc' | 'desc';

export default function ScoreTable({ scores }: ScoreTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedScores = [...scores].sort((a, b) => {
    let aVal: any = a[sortKey as keyof Score];
    let bVal: any = b[sortKey as keyof Score];

    if (sortKey === 'coco' || sortKey === 'stacy' || sortKey === 'fab' || sortKey === 'chris') {
      aVal = a.scores[sortKey];
      bVal = b.scores[sortKey];
    }

    if (sortKey === 'date') {
      const [dayA, monthA, yearA] = aVal.split('/');
      const [dayB, monthB, yearB] = bVal.split('/');
      aVal = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
      bVal = new Date(`${yearB}-${monthB}-${dayB}`).getTime();
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return null;
    return sortOrder === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded-xl">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-primary to-secondary text-white">
            <th 
              onClick={() => handleSort('date')}
              className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Date <SortIcon column="date" />
            </th>
            <th 
              onClick={() => handleSort('game')}
              className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Jeu <SortIcon column="game" />
            </th>
            <th 
              onClick={() => handleSort('coco')}
              className="px-6 py-4 text-center font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Coco <SortIcon column="coco" />
            </th>
            <th 
              onClick={() => handleSort('stacy')}
              className="px-6 py-4 text-center font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Stacy <SortIcon column="stacy" />
            </th>
            <th 
              onClick={() => handleSort('fab')}
              className="px-6 py-4 text-center font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Fab <SortIcon column="fab" />
            </th>
            <th 
              onClick={() => handleSort('chris')}
              className="px-6 py-4 text-center font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            >
              Chris <SortIcon column="chris" />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, index) => {
            const scores = [
              score.scores.coco,
              score.scores.stacy,
              score.scores.fab,
              score.scores.chris
            ];
            
            const numericScores = scores
              .map(s => typeof s === 'string' ? parseFloat(s.split(' ')[0]) : s)
              .filter(s => !isNaN(s as number));
            
            const minScore = Math.min(...numericScores as number[]);
            const maxScore = Math.max(...numericScores as number[]);

            return (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm">{score.date}</td>
                <td className="px-6 py-4 font-medium">{score.game}</td>
                <td className={`px-6 py-4 text-center ${score.scores.coco === minScore ? 'text-green-600 font-bold' : ''} ${score.scores.coco === maxScore ? 'text-red-600' : ''}`}>
                  {score.scores.coco}
                </td>
                <td className={`px-6 py-4 text-center ${score.scores.stacy === minScore ? 'text-green-600 font-bold' : ''} ${score.scores.stacy === maxScore ? 'text-red-600' : ''}`}>
                  {score.scores.stacy}
                </td>
                <td className={`px-6 py-4 text-center ${score.scores.fab === minScore ? 'text-green-600 font-bold' : ''} ${score.scores.fab === maxScore ? 'text-red-600' : ''}`}>
                  {score.scores.fab}
                </td>
                <td className={`px-6 py-4 text-center ${score.scores.chris === minScore ? 'text-green-600 font-bold' : ''} ${score.scores.chris === maxScore ? 'text-red-600' : ''}`}>
                  {score.scores.chris}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}